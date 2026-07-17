import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Data-gedreven Ondernemen in 2026: Stop met Gokken',
  description: 'Marketingbudget verhogen op onderbuikgevoel is duur. Ontdek hoe GA4 conversie-paden en klantwaarde blootlegt, en met welke stappen je MKB data-gedreven wordt.',
  keywords: ['data-gedreven marketing', 'GA4 voor MKB', 'Google Analytics 4', 'conversie-paden', 'klantwaarde', 'marketingbudget optimaliseren'],
  alternates: { canonical: 'https://sproscale.com/insights/data-gedreven-ondernemen-2026' },
  openGraph: {
    title: 'Data-gedreven Ondernemen in 2026: Hoe Je Stopt met Gokken op Marketing',
    description: 'Weet je echt wat werkt, of denk je het alleen? Zo laat GA4 zien waar je marketingbudget wél en niet rendeert.',
    url: 'https://sproscale.com/insights/data-gedreven-ondernemen-2026',
    type: 'article',
    publishedTime: '2026-07-17',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/data-gedreven-ondernemen-2026.svg', width: 1200, height: 630 }],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Data-gedreven ondernemen in 2026: Hoe je stopt met gokken op marketing',
    description: 'Marketingbudget verhogen op onderbuikgevoel is duur. Ontdek hoe GA4 conversie-paden en klantwaarde blootlegt, en met welke stappen je MKB data-gedreven wordt.',
    image: 'https://sproscale.com/images/insights/data-gedreven-ondernemen-2026.svg',
    datePublished: '2026-07-17',
    dateModified: '2026-07-17',
    author: { '@type': 'Person', name: 'Jay van Sproscale' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://sproscale.com/#organization',
      name: 'Sproscale',
      logo: { '@type': 'ImageObject', url: 'https://sproscale.com/sproscale-emblem.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://sproscale.com/insights/data-gedreven-ondernemen-2026' },
    keywords: 'data-gedreven marketing, GA4 voor MKB, Google Analytics 4, conversie-paden, klantwaarde',
    inLanguage: 'nl-NL',
    about: { '@type': 'Service', name: 'Data-analyse & GA4 Consultancy' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Data-analyse & GA4 Consultancy',
    serviceType: 'Marketing Analytics Consulting',
    description: 'Inrichting van Google Analytics 4, conversie-tracking en datagedreven advertentiestrategie voor groeiende MKB-bedrijven.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://sproscale.com/#organization',
      name: 'Sproscale',
    },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    url: 'https://sproscale.com/insights/data-gedreven-ondernemen-2026',
  },
];

export default function DataGedrevenOndernemenInsight() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleContent />
    </>
  );
}
