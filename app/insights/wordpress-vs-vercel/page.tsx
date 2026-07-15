import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Waarom jouw WordPress site klanten kost (en wat Vercel-snelheid oplevert)',
  description: 'Een trage WordPress site kost je dagelijks leads. Ontdek waarom vakbedrijven overstappen naar Next.js op Vercel en wat website snelheid concreet oplevert aan omzet.',
  keywords: ['website snelheid vakbedrijven', 'WordPress vs Next.js', 'Vercel hosting Nederland', 'snelle website MKB', 'website laten maken Eindhoven', 'Core Web Vitals'],
  alternates: { canonical: 'https://sproscale.com/insights/wordpress-vs-vercel' },
  openGraph: {
    title: 'Waarom jouw WordPress site klanten kost (en wat Vercel-snelheid oplevert)',
    description: 'Een trage site kost je dagelijks leads. Zo helpt Sproscale vakbedrijven overstappen naar razendsnel Next.js.',
    url: 'https://sproscale.com/insights/wordpress-vs-vercel',
    type: 'article',
    publishedTime: '2026-05-04',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/wordpress-vs-vercel.png', width: 1200, height: 630 }],
  },
};

export default function WordpressVsVercelInsight() {
  return <ArticleContent />;
}
