import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights & Deep Dives',
  description: 'Ontdek de visie van Sproscale op AI-automatisering, web performance en digitale marketing. Praktische inzichten voor MKB-bedrijven die willen schalen.',
  alternates: { canonical: 'https://sproscale.com/insights' },
  openGraph: {
    title: 'Insights & Deep Dives | Sproscale',
    description: 'Praktische inzichten over AI-automatisering, Next.js web performance en marketing voor groeiende MKB-bedrijven.',
    url: 'https://sproscale.com/insights',
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
