import { compileLatex } from '@/lib/latex';

interface LatexProps {
    code?: string;
    children?: any;
    subject?: string;
    caption?: string;
    width?: string;
}

export async function Latex({ code, children, subject = 'general', caption, width }: LatexProps) {
    let content = code || '';
    if (!content && children) {
        if (typeof children === 'string') content = children;
        else if (Array.isArray(children)) content = children.map(c => String(c)).join('');
        else if (typeof children === 'object' && children.props && children.props.children) content = String(children.props.children); // Simple handling for nesting
        else content = String(children);
    }

    if (!content) return null;

    // Trim whitespace
    const trimmed = content.trim();

    const svgContent = await compileLatex(trimmed, subject);

    if (!svgContent) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 font-mono text-sm rounded">
                <strong>LaTeX Rendering Error</strong>
                <pre className="mt-2 whitespace-pre-wrap text-xs">{trimmed.slice(0, 100)}...</pre>
            </div>
        );
    }

    return (
        <figure className="my-8 flex flex-col items-center justify-center w-full md:w-[70%]">
            <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="latex-svg-container"
                style={{
                    maxWidth: width || '100%',
                    width: width || 'auto'
                }}
            />
            {caption && (
                <figcaption className="mt-3 text-sm text-gray-600 font-serif italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
