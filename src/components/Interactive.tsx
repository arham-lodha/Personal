'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Registry of interactive components
const DemoRegistry: Record<string, React.ComponentType<any>> = {
    'hello-world-demo': dynamic(() => import('./demos/HelloWorldDemo')),
};

export function Interactive({ id, ...props }: { id: string;[key: string]: any }) {
    const Component = DemoRegistry[id];

    if (!Component) {
        return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
                Interactive component <code>{id}</code> not found.
            </div>
        );
    }

    return (
        <div className="my-8 w-full border border-gray-100 rounded overflow-hidden">
            <Suspense fallback={<div>Loading interaction...</div>}>
                <Component {...props} />
            </Suspense>
        </div>
    );
}
