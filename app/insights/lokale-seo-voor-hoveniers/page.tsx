import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Lokale SEO voor Hoveniers: Meer Klanten Vinden',
  description: 'Ontdek hoe lokale SEO voor hoveniers zorgt voor meer aanvragen. Praktische tips voor Google Bedrijfsprofiel, recensies en vindbaarheid.',
  keywords: ['lokale SEO voor hoveniers', 'tuinaanleg vindbaarheid', 'hovenier Eindhoven', 'tuinontwerper inhuren', 'meer klanten voor hoveniers'],
  alternates: { canonical: 'https://sproscale.com/insights/lokale-seo-voor-hoveniers' },
  openGraph: {
    title: 'Lokale SEO voor Hoveniers: Meer Klanten Vinden',
    description: 'Een prachtige tuin aanleggen is niet genoeg als niemand je website vindt. Zo helpt Sproscale hoveniers structureel meer aanvragen binnenhalen.',
    url: 'https://sproscale.com/insights/lokale-seo-voor-hoveniers',
    type: 'article',
    publishedTime: '2026-07-15',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/lokale-seo-hoveniers.svg', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Lokale SEO voor Hoveniers: Zo Vinden Klanten Je Eindelijk Terug',
  description: 'Ontdek hoe lokale SEO voor hoveniers zorgt voor meer aanvragen. Praktische tips voor Google Bedrijfsprofiel, recensies en vindbaarheid.',
  image: 'https://sproscale.com/images/insights/lokale-seo-hoveniers.svg',
  datePublished: '2026-07-15',
  dateModified: '2026-07-15',
  author: { '@type': 'Person', name: 'Jay van Sproscale' },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://sproscale.com/#organization',
    name: 'Sproscale',
    logo: { '@type': 'ImageObject', url: 'https://sproscale.com/sproscale-emblem.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://sproscale.com/insights/lokale-seo-voor-hoveniers' },
  keywords: 'lokale SEO voor hoveniers, tuinaanleg vindbaarheid, hovenier Eindhoven, tuinontwerper inhuren, meer klanten voor hoveniers',
  inLanguage: 'nl-NL',
};

export default function LokaleSeoHoveniersInsight() {
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
