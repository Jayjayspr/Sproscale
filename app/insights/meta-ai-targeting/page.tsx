import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: "Stoppen met Targeten: Waarom Meta's AI beter verkoopt dan jouw marketeer",
  description: "Handmatige interesse-targeting is achterhaald. In 2026 wint wie Meta's AI voedt met de juiste data, creaties en CRM-signalen. De Sproscale strategie uitgelegd.",
  keywords: ['Meta Ads automatisering', 'Advantage+ targeting', 'broad targeting Facebook', 'Meta Ads MKB', 'ROAS verbeteren', 'Meta Ads bureau Nederland'],
  alternates: { canonical: 'https://sproscale.com/insights/meta-ai-targeting' },
  openGraph: {
    title: "Stoppen met Targeten: Waarom Meta's AI beter verkoopt dan jouw marketeer",
    description: "Handmatige interesse-targeting is dood. Zo voedt Sproscale Meta's AI voor maximale ROAS.",
    url: 'https://sproscale.com/insights/meta-ai-targeting',
    type: 'article',
    publishedTime: '2026-05-03',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/meta-ai-targeting.webp.png.png', width: 1200, height: 630 }],
  },
};

export default function MetaAITargetingInsight() {
  return <ArticleContent />;
}
