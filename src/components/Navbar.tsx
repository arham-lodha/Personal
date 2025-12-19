'use client';
import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="layout-wrapper flex gap-6 pt-8 pb-4 mb-8 text-lg font-bold uppercase tracking-wide border-b-2 border-black">
            <Link href="/" className="no-underline hover:underline">Home</Link>
            <Link href="/blog" className="no-underline hover:underline">Blog</Link>
        </nav>
    );
}
