"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const navLinks = [
  { id: 'home', href: '/' },
  { id: 'overOns', href: '/over-ons' },
  { id: 'insights', href: '/insights' },
  { id: 'diensten', href: '/#diensten' },
  { id: 'garantie', href: '/garantie' },
];

const legalLinks = [
  { id: 'privacy', href: '/privacy' },
  { id: 'terms', href: '/algemene-voorwaarden' },
  { id: 'linkedin', href: 'https://www.linkedin.com/in/jay-sprock-b91150209/' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111111] text-stone-400 py-20 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Column 1: Navigatie */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 px-[2px]">{t('footer.navHeading')}</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.id} href={link.href} className="text-stone-400 hover:text-white transition-colors font-light text-base">
                  {t(`nav.${link.id}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Juridisch & Sociaal */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-2 px-[2px]">{t('footer.legalHeading')}</h4>
            <nav className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-stone-400 hover:text-white transition-colors font-light text-base"
                  {...(link.id === 'linkedin' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {t(`footer.legal.${link.id}`)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-6 h-6 transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/sproscale-emblem-white.png"
                  alt={t('footer.logoAlt')}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white uppercase">SPROSCALE</span>
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-stone-600">
            © {new Date().getFullYear()} {t('footer.copyrightText')}
          </p>
        </div>
      </div>
    </footer>
  );
}