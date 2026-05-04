import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Afspraak inplannen',
  description: 'Plan een gratis en vrijblijvend strategiegesprek met Sproscale. Ontdek hoe AI-automatisering en high-end web development jouw bedrijf laten groeien.',
  alternates: { canonical: 'https://sproscale.com/afspraak' },
  openGraph: {
    title: 'Afspraak inplannen | Sproscale',
    description: 'Plan een gratis strategiegesprek en ontdek hoe Sproscale jouw bedrijf laat schalen.',
    url: 'https://sproscale.com/afspraak',
  },
};

export default function AfspraakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
