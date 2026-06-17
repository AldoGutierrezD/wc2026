import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'r2.thesportsdb.com',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: 'crests.football-data.org',
            port: '',
            pathname: '/**'
        }
        ]
    }
};

export default nextConfig;
