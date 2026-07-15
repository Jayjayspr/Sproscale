import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'AI-automatisering: De Unfair Advantage voor Groeiende Bedrijven in 2026',
  description: 'Leer hoe AI-automatisering MKB-bedrijven helpt schalen: van geautomatiseerde leadgen tot 24/7 klantenservice. Ontdek de Sproscale aanpak.',
  keywords: ['AI automatisering MKB', 'workflow automatisering', 'AI chatbot bedrijf', 'leadgeneratie automatisering', 'Sproscale'],
  alternates: { canonical: 'https://sproscale.com/insights/ai-automatisering' },
  openGraph: {
    title: 'AI-automatisering: De Unfair Advantage voor Groeiende Bedrijven in 2026',
    description: 'Leer hoe AI-automatisering MKB-bedrijven helpt schalen: van geautomatiseerde leadgen tot 24/7 klantenservice.',
    url: 'https://sproscale.com/insights/ai-automatisering',
    type: 'article',
    publishedTime: '2026-03-30',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/ai-automatisering-growth.webp', width: 1200, height: 630 }],
  },
};

export default function AIAutomationInsight() {
  return <ArticleContent />;
}
