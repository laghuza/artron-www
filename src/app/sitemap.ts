import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.artron.ge';
  const routes = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/b2b-agreement',
    '/delete-account',
  ];
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'monthly') as 'daily' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        ka: `${baseUrl}${route}`,
        en: `${baseUrl}${route}?lang=en`,
        ru: `${baseUrl}${route}?lang=ru`,
      },
    },
  }));
}
