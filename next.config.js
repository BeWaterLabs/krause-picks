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
            {
                protocol: "https",
                hostname: "mavs.wpenginepowered.com",
            },
            {
                protocol: "https",
                hostname: "static.www.nfl.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
            },
        ],
    },
};

module.exports = nextConfig;
