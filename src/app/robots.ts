import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://haiticityportal.com'; // Replace with production URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/unauthorized/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
