import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/onboarding/thanks'],
      },
    ],
    sitemap: 'https://sproscale.com/sitemap.xml',
    host: 'https://sproscale.com',
  }
}
