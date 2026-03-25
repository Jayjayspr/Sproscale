import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SPROSCALE | Architecting Growth Systems',
  description: 'High-performance websites en gekwalificeerde leadgeneratie voor B2B en MKB.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl" className={`${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
