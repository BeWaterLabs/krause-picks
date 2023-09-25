/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "cdn.nba.com",
            },
            {
                protocol: "https",
                hostname: "content.sportslogos.net",
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
            },
        ],
    },
};

module.exports = nextConfig;
