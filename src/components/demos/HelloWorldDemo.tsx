'use client';
import { useState } from 'react';

export default function HelloWorldDemo() {
    const [count, setCount] = useState(0);
    return (
        <div className="p-8 bg-blue-50 text-center font-sans">
            <h3 className="text-lg font-bold mb-4">Interactive Demo Component</h3>
            <p className="mb-4">This is a client-side React component embedded in the MDX post.</p>
            <p className="mb-4 text-2xl font-mono">{count}</p>
            <button
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded hover:bg-blue-700 transition"
            >
                Increment
            </button>
        </div>
    )
}
