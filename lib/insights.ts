// Eén bron voor alle Insights-artikelen, gedeeld door /insights en de homepage-teaser.
// Volgorde = nieuwste eerst: de homepage toont de eerste 3, dus een nieuw artikel
// bovenaan toevoegen. Titel/excerpt/datum/alt komen via t(`insightsIndex.articles.${slug}.*`).
export type InsightConfig = {
  slug: string;
  href: string;
  image: string;
  unoptimized?: boolean;
};

export const insightsConfig: InsightConfig[] = [
  { slug: 'seoVoorMkb', href: '/insights/seo-voor-mkb', image: '/images/insights/seo-voor-mkb.svg', unoptimized: true },
  { slug: 'dataGedrevenOndernemen', href: '/insights/data-gedreven-ondernemen-2026', image: '/images/insights/data-gedreven-ondernemen-2026.svg', unoptimized: true },
  { slug: 'lokaleSeoHoveniers', href: '/insights/lokale-seo-voor-hoveniers', image: '/images/insights/lokale-seo-hoveniers.svg', unoptimized: true },
  { slug: 'aiAutomatisering', href: '/insights/ai-automatisering', image: '/images/insights/ai-automatisering-growth.webp' },
  { slug: 'marketingPsychologie', href: '/insights/marketing-psychologie', image: '/images/insights/marketing-psychologie-conversie.webp' },
  { slug: 'mobieleChatbotUx', href: '/insights/mobiele-chatbot-ux', image: '/images/insights/mobiele-chatbot-ux.webp.png' },
  { slug: 'wordpressVsVercel', href: '/insights/wordpress-vs-vercel', image: '/images/insights/wordpress-vs-vercel.png' },
  { slug: 'metaAiTargeting', href: '/insights/meta-ai-targeting', image: '/images/insights/meta-ai-targeting.webp.png.png' },
];
