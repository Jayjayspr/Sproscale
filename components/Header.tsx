"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LanguageSelector from './LanguageSelector';
import MegaMenu from './MegaMenu';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { branches, services } from '../lib/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpenService, setMobileOpenService] = useState<string | null>(null);
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
    { name: t('nav.overOns'), href: '/over-ons' },
    { name: t('nav.faq'), href: '/faq' },
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
          <MegaMenu />
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
            className="md:hidden bg-stone-50 border-b border-stone-200 overflow-hidden absolute top-20 left-0 w-full z-40 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col px-4 py-8 gap-1">
              <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                {t('nav.diensten')}
              </p>
              {/* Genest accordion: elke dienst klapt open naar zijn branches (filter/onderverdeling) */}
              {services.map((service) => {
                const isOpen = mobileOpenService === service.slug;
                return (
                  <div key={service.slug}>
                    <div className="flex items-center">
                      <Link
                        href={`/diensten/${service.slug}`}
                        onClick={(e) => handleLinkClick(e, '')}
                        className="flex-1 text-left px-2 py-3 text-sm font-semibold text-stone-950"
                      >
                        {t(`megaMenu.services.${service.translationKey}.label`)}
                      </Link>
                      <button
                        onClick={() => setMobileOpenService(isOpen ? null : service.slug)}
                        aria-expanded={isOpen}
                        aria-label={t(`megaMenu.services.${service.translationKey}.label`)}
                        className="p-3 text-stone-400"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-1 pb-3 pl-4">
                            {branches.map((branch) => (
                              <Link
                                key={branch.slug}
                                href={`/diensten/${service.slug}/${branch.slug}`}
                                onClick={(e) => handleLinkClick(e, '')}
                                className="text-xs font-medium text-stone-500 hover:text-stone-950 transition-colors py-1.5"
                              >
                                {t(`megaMenu.branches.${branch.translationKey}.label`)}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="h-px bg-stone-200 my-3" />

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-2 py-3 text-sm font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/afspraak"
                onClick={(e) => handleLinkClick(e, '/afspraak')}
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 text-white text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-md mx-auto mt-4"
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
