import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Waarom de Beste Website Waardeloos Is Zonder SEO',
  description: 'Een prachtige website zonder SEO voor MKB is een winkel in een donker steegje. Ontdek waarom online vindbaarheid het verschil maakt.',
  keywords: ['SEO voor MKB', 'online vindbaarheid', 'website zonder SEO', 'zoekmachineoptimalisatie MKB', 'autoriteitsstructuur SEO'],
  alternates: { canonical: 'https://sproscale.com/insights/seo-voor-mkb' },
  openGraph: {
    title: 'Waarom de Beste Website ter Wereld Waardeloos Is zonder SEO',
    description: 'Duizenden euro\'s in een mooie website gestoken, maar nul aanvragen? Zo zorgt SEO voor MKB ervoor dat klanten je eindelijk vinden.',
    url: 'https://sproscale.com/insights/seo-voor-mkb',
    type: 'article',
    publishedTime: '2026-07-18',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/seo-voor-mkb.svg', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Waarom de Beste Website ter Wereld Waardeloos Is zonder SEO',
  description: 'Een prachtige website zonder SEO voor MKB is een winkel in een donker steegje. Ontdek waarom online vindbaarheid het verschil maakt.',
  image: 'https://sproscale.com/images/insights/seo-voor-mkb.svg',
  datePublished: '2026-07-18',
  dateModified: '2026-07-18',
  author: { '@type': 'Person', name: 'Jay van Sproscale' },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://sproscale.com/#organization',
    name: 'Sproscale',
    logo: { '@type': 'ImageObject', url: 'https://sproscale.com/sproscale-emblem.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://sproscale.com/insights/seo-voor-mkb' },
  keywords: 'SEO voor MKB, online vindbaarheid, website zonder SEO, zoekmachineoptimalisatie MKB',
  inLanguage: 'nl-NL',
};

export default function SeoVoorMkbInsight() {
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
