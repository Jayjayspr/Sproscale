"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ChatWidget from './ChatWidget';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/admin';

  return (
    <>
      <Header />
      {children}
      {!isAuthPage && <Footer />}
      <CookieBanner />
      <ChatWidget />
    </>
  );
}
