/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'us-west-2.graphassets.com', // Add your image host here
                port: '', // Leave empty for default ports
                pathname: '/**', // Allow all paths
            },
        ],
    },
};

export default nextConfig;