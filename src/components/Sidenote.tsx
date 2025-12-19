import React from 'react';

interface SidenoteProps {
    children: React.ReactNode;
}

// Global counter reset should be in the parent article CSS
export function Sidenote({ children }: SidenoteProps) {
    // We use React.useId() for stable server/client IDs
    const id = React.useId();

    return (
        <span className="sidenote-wrapper">
            <label htmlFor={id} className="margin-toggle s-number"></label>
            <span className="sidenote">{children}</span>
        </span>
    );
}
