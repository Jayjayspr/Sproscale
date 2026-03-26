import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'SPROSCALE | Architecting Growth Systems',
  description: 'High-performance websites en gekwalificeerde leadgeneratie voor B2B en MKB.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl" className={`scroll-smooth scroll-pt-20 ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-stone-50 text-stone-900 selection:bg-stone-200" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
