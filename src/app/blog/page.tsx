import { getAllPosts } from '@/lib/posts';
import { Search } from '@/components/Search';
import Link from 'next/link';

export const metadata = {
    title: 'Blog - Arham Lodha',
    description: 'Writing on mathematics, code, and more.',
};

export default function BlogIndex() {
    const posts = getAllPosts();

    const postsForSearch = posts.map(p => ({
        slug: p.slug,
        title: p.title,
        date: p.date,
        tags: p.tags,
        excerpt: p.excerpt
    }));

    return (
        <main className="layout-wrapper">
            <div className="mb-8">
                <h1 className="page-header-writing">Writing</h1>
                <p className="text-lg">
                    A collection of notes, articles, and explorations.
                </p>
            </div>

            <Search posts={postsForSearch} />
        </main>
    );
}
