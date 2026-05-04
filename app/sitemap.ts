import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sproscale.com'

  return [
    { url: baseUrl,                                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/over-ons`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/afspraak`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`,                            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/onboarding`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/insights`,                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/insights/ai-automatisering`,         lastModified: new Date('2026-03-30'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/marketing-psychologie`,     lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/mobiele-chatbot-ux`,        lastModified: new Date('2026-05-03'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/meta-ai-targeting`,         lastModified: new Date('2026-05-03'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/wordpress-vs-vercel`,       lastModified: new Date('2026-05-04'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`,                            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/algemene-voorwaarden`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
