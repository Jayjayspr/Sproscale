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
  title: 'Sproscale | AI Automatisering, Web Development & Marketing voor Groei',
  description: 'Sproscale combineert AI automatisering met hoogwaardig Web Development en resultaatgerichte Marketing. Wij bouwen de systemen die jouw bedrijf laten schalen en processen versnellen.',
  keywords: ['AI Automatisering', 'Web Development', 'Marketing', 'Sproscale', 'Bedrijfsefficiëntie', 'Automatisering voor MKB'],
  icons: {
    icon: '/sproscale-logo-transparent.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`scroll-smooth scroll-pt-20 ${inter.variable} ${playfair.variable}`}>
      <body
        className="font-sans antialiased bg-stone-50 text-stone-900 selection:bg-stone-200"
        suppressHydrationWarning
      >
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
