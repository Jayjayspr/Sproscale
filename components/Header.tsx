"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.diensten'), href: '/#diensten' },
    { name: t('nav.overOns'), href: '/over-ons' },
    { name: t('nav.faq'), href: '/#faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 h-20 flex items-center ${isScrolled ? 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200 shadow-sm' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/sproscale-emblem.png"
                alt={t('footer.logoAlt')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase text-stone-950">SPROSCALE</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xs font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <LanguageSelector />
          <Link
            href="/afspraak"
            className="inline-flex items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-glow-from/20"
          >
            {t('hero.ctaPrimary')}
          </Link>
        </nav>

        {/* Mobile: taal + menu toggle */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageSelector />
          <button
            className="p-2 text-stone-950"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('nav.toggleMenu')}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-50 border-b border-stone-200 overflow-hidden absolute top-20 left-0 w-full z-40 shadow-xl"
          >
            <div className="flex flex-col px-4 py-8 gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/afspraak"
                onClick={(e) => handleLinkClick(e, '/afspraak')}
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 text-white text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-md mx-auto"
              >
                {t('hero.ctaPrimary')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
