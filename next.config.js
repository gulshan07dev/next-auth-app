/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',  
            },
        ],
        domains: ['res.cloudinary.com']
    }
}

module.exports = nextConfig
