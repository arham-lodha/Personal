import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// Directories
const CACHE_DIR = path.join(process.cwd(), 'public/latex-cache');
const TEMP_DIR = path.join(process.cwd(), '.latex-temp');
const PREAMBLE_DIR = path.join(process.cwd(), 'content/preambles');

// Ensure directories exist
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

export async function compileLatex(code: string, subject: string = 'general'): Promise<string | null> {
    // 1. Load Preamble
    let preamble = '';
    const subjectPreamblePath = path.join(PREAMBLE_DIR, `${subject}.tex`);
    const generalPreamblePath = path.join(PREAMBLE_DIR, 'general.tex');

    try {
        if (fs.existsSync(subjectPreamblePath)) {
            preamble += fs.readFileSync(subjectPreamblePath, 'utf-8');
        }
        // Always load general preamble if it exists and we're not already using it (or append it?)
        // Usually usage is: general + specific.
        // User said "Have a general preamble... But also a preambles for different subjects"
        // So we probably want both.
        if (subject !== 'general' && fs.existsSync(generalPreamblePath)) {
            const general = fs.readFileSync(generalPreamblePath, 'utf-8');
            preamble = general + '\n' + preamble;
        } else if (subject === 'general' && fs.existsSync(generalPreamblePath)) {
            preamble = fs.readFileSync(generalPreamblePath, 'utf-8');
        }
    } catch (e) {
        console.warn(`Error loading preamble for ${subject}:`, e);
    }

    // 2. Construct LaTeX Document
    // We use standalone to get a tight bounding box around the content
    const fullLatex = `
\\def\\pgfsysdriver{pgfsys-dvisvgm.def}
\\documentclass[tikz, border=10pt]{standalone}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath, amssymb, amsthm}
${preamble}
\\begin{document}
${code}
\\end{document}
  `;

    // 3. Compute Hash
    const hash = createHash('md5').update(fullLatex).digest('hex');
    const svgFilename = `${hash}.svg`;
    const svgPath = path.join(CACHE_DIR, svgFilename);
    const publicPath = `/latex-cache/${svgFilename}`;

    // 4. Check Cache
    if (fs.existsSync(svgPath)) {
        return fs.readFileSync(svgPath, 'utf-8');
    }

    // 5. Compile
    const texPath = path.join(TEMP_DIR, `${hash}.tex`);
    const dviPath = path.join(TEMP_DIR, `${hash}.dvi`);

    try {
        fs.writeFileSync(texPath, fullLatex);

        // Run latex (generates DVI)
        // -interaction=nonstopmode prevents hanging on errors
        await execPromise(`latex -interaction=nonstopmode -output-directory="${TEMP_DIR}" "${texPath}"`);

        // Run dvisvgm
        // --no-fonts: convert text to paths (ensures rendering without font files)
        // --optimize: optimize SVG
        // --scale=2.2: Scale up for screen readability (LaTeX pt vs Screen px)
        // note: removed --pdf since we are using DVI now
        await execPromise(`dvisvgm --scale=2.2 --no-fonts --optimize --output="${svgPath}" "${dviPath}"`);

        return fs.readFileSync(svgPath, 'utf-8');
    } catch (error) {
        console.error(`LaTeX compilation error for ${hash}:`, error);
        // You might read the log file here if you want to debug
        return null;
    }
}
