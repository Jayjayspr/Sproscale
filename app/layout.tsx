import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'SPROSCALE | Meer B2B Leads & Voorspelbare Groei',
  description: 'Sproscale helpt B2B-bedrijven en het MKB met hoogwaardige acquisitie-systemen en websites die converteren. Schaal uw leadgeneratie vandaag nog.',
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
      </body>
    </html>
  );
}