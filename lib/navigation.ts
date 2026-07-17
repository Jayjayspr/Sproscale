// Centrale configuratie voor het mega-menu en de dienst-centrische routing:
// /diensten/[dienst] (hub) en /diensten/[dienst]/[niche] (niche-specifiek).
// Nieuwe branche of dienst toevoegen? Voeg 'm hier toe — menu en routing pikken
// 'm automatisch op. Content per niche voeg je toe via de Supabase Table Editor
// (tabellen: service_niche_content, service_niche_reviews, service_niche_cases).

export interface Branch {
  slug: string;
  translationKey: string; // sleutel onder megaMenu.branches.<key> in translations.ts
}

export interface Service {
  slug: string;
  translationKey: string; // sleutel onder megaMenu.services.<key> / servicesHub.<key> in translations.ts
}

export const branches: Branch[] = [
  { slug: 'hoveniers', translationKey: 'hoveniers' },
  { slug: 'tegelzetters', translationKey: 'tegelzetters' },
  { slug: 'vloerenleggers', translationKey: 'vloerenleggers' },
  { slug: 'dakdekkers', translationKey: 'dakdekkers' },
  { slug: 'aannemers', translationKey: 'aannemers' },
  { slug: 'installateurs', translationKey: 'installateurs' },
  { slug: 'schilders', translationKey: 'schilders' },
  { slug: 'klusbedrijven', translationKey: 'klusbedrijven' },
  { slug: 'kozijnspecialisten', translationKey: 'kozijnspecialisten' },
];

export const services: Service[] = [
  { slug: 'website-bouwen', translationKey: 'websiteBouwen' },
  { slug: 'seo-optimalisatie', translationKey: 'seoOptimalisatie' },
  { slug: 'google-meta-ads', translationKey: 'googleMetaAds' },
  { slug: 'ai-automations', translationKey: 'aiAutomations' },
  { slug: 'review-beheer', translationKey: 'reviewBeheer' },
];

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
