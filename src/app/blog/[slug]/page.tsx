import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Latex } from '@/components/Latex';
import { Sidenote } from '@/components/Sidenote';
import { Interactive } from '@/components/Interactive';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/TableOfContents';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const components = {
        Latex,
        Sidenote,
        Interactive,
    };

    return (
        <article className="layout-wrapper" style={{ counterReset: 'sidenote-counter' }}>
            <header className="mb-8 w-full md:w-[70%]">
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <div className="text-gray-500 font-serif italic mb-4">
                    {new Date(post.date).toLocaleDateString()} &middot; {post.tags.join(', ')}
                </div>
                {post.excerpt && <p className="text-xl text-gray-700">{post.excerpt}</p>}
            </header>

            <TableOfContents />

            {/* Content */}
            <div className="mdx-content">
                <MDXRemote
                    source={post.content}
                    components={components}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkMath],
                            rehypePlugins: [
                                rehypeKatex,
                                rehypeSlug,
                                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                                [rehypePrettyCode, { theme: 'solarized-light' }]
                            ],
                        },
                    }}
                />
            </div>

            <div className="mt-16 pt-8 border-t w-[70%]">
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                    &larr; Back to Home
                </Link>
            </div>
        </article>
    );
}
