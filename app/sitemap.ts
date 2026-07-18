import { MetadataRoute } from 'next'
import { supabase } from '../lib/supabase'
import { services, branches } from '../lib/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sproscale.com'

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl,                                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/over-ons`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/garantie`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/faq`,                                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/afspraak`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contact`,                            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/onboarding`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/insights`,                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/insights/ai-automatisering`,         lastModified: new Date('2026-03-30'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/marketing-psychologie`,     lastModified: new Date('2026-03-31'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/mobiele-chatbot-ux`,        lastModified: new Date('2026-05-03'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/meta-ai-targeting`,         lastModified: new Date('2026-05-03'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/wordpress-vs-vercel`,       lastModified: new Date('2026-05-04'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/lokale-seo-voor-hoveniers`, lastModified: new Date('2026-07-15'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights/data-gedreven-ondernemen-2026`, lastModified: new Date('2026-07-17'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`,                            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/algemene-voorwaarden`,               lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // Dienst-hubs zijn altijd volledig, uniek geïndexeerd.
  const hubEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/diensten/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // Niche-pagina's: alleen opnemen zodra er een echte database-override bestaat
  // (anders staan ze op noindex en horen ze niet in de sitemap).
  let nicheEntries: MetadataRoute.Sitemap = []
  const { data: overrides } = await supabase
    .from('service_niche_content')
    .select('service_slug, niche_slug, updated_at')
    .not('intro_override', 'is', null)

  if (overrides) {
    const validServiceSlugs = new Set(services.map((s) => s.slug))
    const validNicheSlugs = new Set(branches.map((b) => b.slug))

    nicheEntries = overrides
      .filter((row) => validServiceSlugs.has(row.service_slug) && validNicheSlugs.has(row.niche_slug))
      .map((row) => ({
        url: `${baseUrl}/diensten/${row.service_slug}/${row.niche_slug}`,
        lastModified: row.updated_at ? new Date(row.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      }))
  }

  return [...staticEntries, ...hubEntries, ...nicheEntries]
}
