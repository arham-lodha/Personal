'use client';
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

interface PostSummary {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    excerpt?: string;
}

interface SearchProps {
    posts: PostSummary[];
}

export function Search({ posts }: SearchProps) {
    const [query, setQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const fuse = useMemo(() => {
        return new Fuse(posts, {
            keys: ['title', 'tags', 'excerpt'],
            threshold: 0.3,
        });
    }, [posts]);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        let results = posts;

        if (selectedTag) {
            results = results.filter(p => p.tags.includes(selectedTag));
        }

        if (query) {
            const fuseResults = fuse.search(query);
            const searchSlugs = new Set(fuseResults.map(r => r.item.slug));
            results = results.filter(p => searchSlugs.has(p.slug));
        }

        return results;
    }, [posts, query, selectedTag, fuse]);

    return (
        <div className="w-full">
            <div className="mb-12 border-b-2 border-dotted border-gray-400 pb-8">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search posts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`tag-filter-btn ${selectedTag === null ? 'active' : ''}`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`tag-filter-btn ${selectedTag === tag ? 'active' : ''}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-10">
                {filteredPosts.map((post) => (
                    <article key={post.slug} className="group border-2 border-dashed border-black shadow-none px-4 pt-2">
                        <Link href={`/blog/${post.slug}`} className="blog-post-item">
                            <div className="blog-post-header">
                                <div className="blog-post-title">
                                    {post.title}
                                </div>
                                <div className="blog-post-date">
                                    {new Date(post.date).toLocaleDateString('en-GB')}
                                </div>
                            </div>

                            {post.excerpt && (
                                <div className="ml-6">
                                    <p className="blog-post-excerpt">
                                        {post.excerpt}
                                    </p>

                                    <div className="preview-tag-list mt-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="preview-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
