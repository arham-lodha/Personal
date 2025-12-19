'use client';
import { useEffect, useState } from 'react';

export function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.mdx-content h2, .mdx-content h3'));
        const mapped = elements.map((el) => ({
            id: el.id,
            text: el.textContent ? el.textContent.replace(/^##?#? /, '') : '',
            level: Number(el.tagName.substring(1)),
        }));
        setHeadings(mapped);
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-box">
            <span className="toc-label">TABLE OF CONTENTS</span>
            <ul className="space-y-1 list-none p-0 m-0">
                {headings.map((h) => (
                    <li
                        key={h.id}
                        style={{ marginLeft: (h.level - 2) * 20 }}
                        className="text-sm"
                    >
                        <a
                            href={`#${h.id}`}
                            className="no-underline hover:underline"
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
