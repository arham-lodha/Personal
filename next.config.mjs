/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    reactStrictMode: true,
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
    },
    trailingSlash: true,
    // If you are deploying to https://arham-lodha.github.io/Blog/, 
    // uncomment the line below:
    // basePath: '/Blog',
};

export default nextConfig;
