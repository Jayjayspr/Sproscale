import type { Metadata } from 'next';
import { Inter, Playfair_Display, Geist } from 'next/font/google';
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

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sproscale.com'),
  title: {
    default: 'Sproscale | AI Automatisering, Web Development & Marketing',
    template: '%s | Sproscale',
  },
  description: 'Sproscale combineert AI automatisering met hoogwaardig Web Development en resultaatgerichte Marketing. Wij bouwen de systemen die jouw bedrijf laten schalen en processen versnellen.',
  keywords: ['AI Automatisering', 'Web Development', 'Marketing bureau Eindhoven', 'Sproscale', 'Bedrijfsefficiëntie', 'Automatisering voor MKB', 'leadgeneratie', 'Next.js bureau Nederland', 'AI chatbot MKB', 'website laten maken Eindhoven', 'Meta Ads bureau', 'Google Ads bureau Nederland', 'workflow automatisering', 'high-end website bouwen'],
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
    <html lang="nl" className={`scroll-smooth scroll-pt-20 ${inter.variable} ${playfair.variable} ${geist.variable}`}>
      <body
        className="font-sans antialiased bg-stone-50 text-stone-900 selection:bg-stone-200"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://sproscale.com/#organization',
              name: 'Sproscale',
              url: 'https://sproscale.com',
              logo: { '@type': 'ImageObject', url: 'https://sproscale.com/sproscale-emblem.png' },
              description: 'AI Automatisering, Web Development en Marketing voor groeiende MKB-bedrijven in Nederland.',
              address: { '@type': 'PostalAddress', streetAddress: 'Strijp-S', addressLocality: 'Eindhoven', addressRegion: 'Noord-Brabant', postalCode: '5617', addressCountry: 'NL' },
              contactPoint: { '@type': 'ContactPoint', telephone: '+31-6-58761348', email: 'info@sproscale.com', contactType: 'customer service', availableLanguage: 'Dutch' },
              sameAs: ['https://www.linkedin.com/company/sproscale', 'https://www.instagram.com/sproscale'],
              areaServed: { '@type': 'Country', name: 'Netherlands' },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Sproscale Diensten',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Bouwen', description: 'High-end Next.js websites vanaf €999' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta & Google Ads', description: 'Lead generatie via betaalde advertenties vanaf €499/mnd' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Chatbot & Automatisering', description: 'Custom AI chatbots en workflow automatisering vanaf €249' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Consultancy', description: 'Strategisch advies voor schaalbare groei' } },
                ],
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://sproscale.com/#website',
              url: 'https://sproscale.com',
              name: 'Sproscale',
              description: 'AI Automatisering, Web Development en Marketing voor groeiende bedrijven.',
              publisher: { '@id': 'https://sproscale.com/#organization' },
              inLanguage: 'nl-NL',
            },
          ])}}
        />
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
