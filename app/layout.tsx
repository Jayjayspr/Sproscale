import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sproscale.com'),
  title: {
    default: 'Sproscale | AI Automatisering, Web Development & Marketing',
    template: '%s | Sproscale',
  },
  description: 'Sproscale combineert AI automatisering met hoogwaardig Web Development en resultaatgerichte Marketing. Wij bouwen de systemen die jouw bedrijf laten schalen en processen versnellen.',
  keywords: ['AI Automatisering', 'Web Development', 'Marketing', 'Sproscale', 'Bedrijfsefficiëntie', 'Automatisering voor MKB', 'leadgeneratie', 'Next.js bureau', 'AI chatbot MKB'],
  authors: [{ name: 'Sproscale', url: 'https://sproscale.com' }],
  creator: 'Sproscale',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://sproscale.com',
    siteName: 'Sproscale',
    title: 'Sproscale | AI Automatisering, Web Development & Marketing',
    description: 'Wij bouwen de systemen die jouw bedrijf laten schalen — high-end websites, AI-automatisering en resultaatgerichte marketing.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sproscale – Schaal gekwalificeerd op' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sproscale | AI Automatisering & Web Development',
    description: 'Wij bouwen de systemen die jouw bedrijf laten schalen.',
    images: ['/og-image.png'],
    creator: '@sproscale',
  },
  icons: {
    icon: '/sproscale-emblem.png',
    apple: '/sproscale-emblem.png',
  },
  alternates: {
    canonical: 'https://sproscale.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`scroll-smooth scroll-pt-20 ${inter.variable} ${playfair.variable}`}>
      <body
        className="font-sans antialiased bg-stone-50 text-stone-900 selection:bg-stone-200"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Sproscale',
            url: 'https://sproscale.com',
            logo: 'https://sproscale.com/sproscale-emblem.png',
            description: 'AI Automatisering, Web Development en Marketing voor groeiende bedrijven.',
            address: { '@type': 'PostalAddress', addressLocality: 'Eindhoven', addressRegion: 'Noord-Brabant', addressCountry: 'NL' },
            contactPoint: { '@type': 'ContactPoint', telephone: '+31-6-58761348', contactType: 'customer service', availableLanguage: 'Dutch' },
            sameAs: ['https://www.linkedin.com/company/sproscale', 'https://www.instagram.com/sproscale'],
            areaServed: 'NL',
            serviceType: ['AI Automatisering', 'Web Development', 'Lead Generatie', 'Marketing Automatisering'],
          })}}
        />
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
