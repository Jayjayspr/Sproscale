"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LanguageSelector from './LanguageSelector';
import MegaMenu from './MegaMenu';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { branches, services } from '../lib/navigation';
import { contactInfo } from '../lib/contact';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpenService, setMobileOpenService] = useState<string | null>(null);
  const { t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: t('nav.werkwijze'), href: '/#werkwijze' },
    { name: t('nav.overOns'), href: '/over-ons' },
    { name: t('nav.insights'), href: '/insights' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (href: string) => !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Aankondigingsbalk: sterkste belofte, klapt in zodra er gescrold wordt */}
      <div
        className={`overflow-hidden bg-stone-950 text-white transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}
        aria-hidden={isScrolled}
      >
        <Link
          href="/garantie"
          tabIndex={isScrolled ? -1 : 0}
          className="group flex h-9 items-center justify-center gap-2 px-4 text-xs font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-glow-from to-glow-to shrink-0"></span>
          <span className="truncate">{t('nav.announcement')}</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-stone-400 group-hover:text-white transition-colors">
            {t('nav.announcementCta')}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Hoofdbalk: transparant bovenaan, zwevende afgeronde balk na scrollen */}
      {/* Zelfde breedte als de paginacontainers: max-w-7xl met px-4 sm:px-6 lg:px-8 */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'pt-3' : ''}`}>
        <div
          className={`flex justify-between items-center transition-all duration-300 border ${
            isScrolled
              ? 'h-16 px-4 sm:px-6 rounded-2xl bg-white/85 backdrop-blur-md border-stone-200 shadow-lg shadow-stone-900/5'
              : 'h-20 px-0 border-transparent'
          }`}
        >
          <Link href="/" className="flex items-center gap-2 group shrink-0">
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <MegaMenu />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative text-xs font-semibold tracking-wider uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:rounded-full after:bg-linear-to-r after:from-glow-from after:to-glow-to after:transition-all ${
                  isActive(link.href) ? 'text-stone-950 after:w-full' : 'text-stone-950 hover:text-stone-600 after:w-0 hover:after:w-full'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Rechterkant: taal, telefoon, CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSelector />
            <a
              href={contactInfo.phoneHref}
              aria-label={t('nav.callAria')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-950 hover:text-stone-600 transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              <span className="hidden xl:inline">{contactInfo.phoneDisplay}</span>
            </a>
            <Link
              href="/afspraak"
              className="inline-flex items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-glow-from/20"
            >
              {t('nav.ctaShort')}
            </Link>
          </div>

          {/* Mobiel/tablet: taal, bellen, menu toggle */}
          <div className="flex lg:hidden items-center gap-1">
            <LanguageSelector />
            <a href={contactInfo.phoneHref} aria-label={t('nav.callAria')} className="p-2 text-stone-950">
              <Phone className="w-5 h-5" />
            </a>
            <button
              className="p-2 text-stone-950"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('nav.toggleMenu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-50 border-b border-stone-200 overflow-hidden absolute top-full left-0 w-full z-40 shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <div className="flex flex-col px-4 py-8 gap-1">
              <p className="px-2 text-[10px] font-bold uppercase tracking-eyebrow text-stone-400 mb-1">
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
                        onClick={closeMenu}
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
                                onClick={closeMenu}
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
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`px-2 py-3 text-sm font-semibold tracking-wider uppercase transition-colors ${isActive(link.href) ? 'text-glow-from' : 'text-stone-950 hover:text-stone-600'}`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={contactInfo.phoneHref}
                className="px-2 py-3 inline-flex items-center gap-2 text-sm font-semibold text-stone-950"
              >
                <Phone className="w-4 h-4" /> {contactInfo.phoneDisplay}
              </a>
              <Link
                href="/afspraak"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 text-white text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-md mx-auto mt-4"
              >
                {t('nav.ctaShort')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
