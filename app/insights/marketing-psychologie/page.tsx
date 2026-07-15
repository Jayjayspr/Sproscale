import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'De Psychologie van Conversie: Waarom Marketing faalt zonder Emotie',
  description: 'Ontdek hoe psychologische principes zoals social proof en wederkerigheid gecombineerd met AI-automatisering leiden tot hogere conversie voor MKB-bedrijven.',
  keywords: ['conversie optimalisatie', 'marketing psychologie', 'social proof marketing', 'B2B leadgeneratie', 'marketing automatisering'],
  alternates: { canonical: 'https://sproscale.com/insights/marketing-psychologie' },
  openGraph: {
    title: 'De Psychologie van Conversie: Waarom Marketing faalt zonder Emotie',
    description: 'Hoe psychologische principes gecombineerd met AI leiden tot hogere conversie voor groeiende bedrijven.',
    url: 'https://sproscale.com/insights/marketing-psychologie',
    type: 'article',
    publishedTime: '2026-03-31',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/marketing-psychologie-conversie.webp', width: 1200, height: 630 }],
  },
};

export default function MarketingPsychologyArticle() {
  return <ArticleContent />;
}
