/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
    },
    trailingSlash: true,
    basePath: '/personal',
};

export default nextConfig;
