import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Sproscale is een AI-automatisering en web development agency gevestigd in Eindhoven. Wij helpen MKB-bedrijven schalen met slimme systemen en resultaatgerichte marketing.',
  alternates: { canonical: 'https://sproscale.com/over-ons' },
  openGraph: {
    title: 'Over Sproscale | AI Automatisering & Web Development Bureau Eindhoven',
    description: 'Leer wie wij zijn en hoe wij MKB-bedrijven helpen schalen via AI, high-end websites en marketing automatisering.',
    url: 'https://sproscale.com/over-ons',
  },
};

export default function OverOnsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
