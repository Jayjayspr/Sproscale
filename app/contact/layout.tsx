import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Sproscale voor een gratis strategiegesprek over AI-automatisering, web development of marketing. Wij reageren binnen 24 uur.',
  alternates: { canonical: 'https://sproscale.com/contact' },
  openGraph: {
    title: 'Contact | Sproscale',
    description: 'Plan een gratis strategiegesprek. Wij helpen MKB-bedrijven schalen via AI, high-end websites en resultaatgerichte marketing.',
    url: 'https://sproscale.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
