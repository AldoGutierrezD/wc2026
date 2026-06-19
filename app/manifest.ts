import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'WC 2026 Quiniela',
        short_name: 'WC26',
        start_url: '/',
        display: 'standalone',
        background_color: '#b9e253',
        theme_color: '#b9e253',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    };
}
