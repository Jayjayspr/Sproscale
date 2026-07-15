import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Waarom jouw AI-chatbot klanten wegjaagt op mobiel',
  description: 'Een AI-chatbot zonder mobiele UX kost je conversies. Leer hoe het jumping keyboard probleem bezoekers wegjaagt en hoe mobile-first design dit oplost.',
  keywords: ['AI chatbot mobiel', 'chatbot UX', 'mobiele website optimalisatie', 'chatbot conversie', 'mobile-first design'],
  alternates: { canonical: 'https://sproscale.com/insights/mobiele-chatbot-ux' },
  openGraph: {
    title: 'Waarom jouw AI-chatbot klanten wegjaagt op mobiel',
    description: 'Het jumping keyboard probleem kost je dagelijks leads. Zo lost Sproscale dit op met mobile-first design.',
    url: 'https://sproscale.com/insights/mobiele-chatbot-ux',
    type: 'article',
    publishedTime: '2026-05-03',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/mobiele-chatbot-ux.webp.png', width: 1200, height: 630 }],
  },
};

export default function MobieleCharacterUXInsight() {
  return <ArticleContent />;
}
