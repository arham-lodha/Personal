import type { Metadata } from 'next';
import './globals.css';
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-mono'
});

export const metadata: Metadata = {
    title: 'Personal Blog',
    description: 'Mathematics, Code, and more.',
};

import { Navbar } from '@/components/Navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${spaceMono.variable} font-mono antialiased`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
