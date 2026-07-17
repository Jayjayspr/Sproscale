"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Globe, Search, Megaphone, Bot, Star,
  ArrowRight, ChevronDown, ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { branches, services } from '../lib/navigation';

const serviceIcons: Record<string, React.ReactNode> = {
  'website-bouwen': <Globe className="w-4 h-4" />,
  'seo-optimalisatie': <Search className="w-4 h-4" />,
  'google-meta-ads': <Megaphone className="w-4 h-4" />,
  'ai-automations': <Bot className="w-4 h-4" />,
  'review-beheer': <Star className="w-4 h-4" />,
};

export default function MegaMenu() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState(services[0].slug);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-stone-950 hover:text-stone-600 transition-colors"
      >
        {t('nav.diensten')}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/*
        Altijd in de DOM (niet conditioneel gemount) zodat elke link — inclusief
        alle dienst x branche sub-lijsten — crawlbaar is voor zoekmachines.
        Zichtbaarheid/interactie wordt puur via animate-state geregeld.
      */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 8, pointerEvents: 'none' }}
        transition={{ duration: 0.15 }}
        aria-hidden={!isOpen}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[min(90vw,720px)] bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-[220px_1fr]">
          {/* Diensten: primaire ingang */}
          <div className="bg-stone-50 border-r border-stone-200 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3 px-2">
              {t('megaMenu.dienstenLabel')}
            </p>
            <ul>
              {services.map((service) => (
                <li key={service.slug} onMouseEnter={() => setActiveService(service.slug)}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    onClick={() => setIsOpen(false)}
                    onFocus={() => setActiveService(service.slug)}
                    className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl transition-colors text-sm font-bold ${
                      activeService === service.slug ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:bg-white/60'
                    }`}
                  >
                    <span className={activeService === service.slug ? 'text-stone-900' : 'text-stone-400'}>
                      {serviceIcons[service.slug]}
                    </span>
                    <span className="flex-1">{t(`megaMenu.services.${service.translationKey}.label`)}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-opacity ${activeService === service.slug ? 'opacity-100' : 'opacity-0'}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches: onderverdeling/filter van de actieve dienst */}
          <div className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
              {t('megaMenu.branchesLabel')}
            </p>
            {services.map((service) => (
              <ul
                key={service.slug}
                className={`grid grid-cols-2 gap-1 ${activeService === service.slug ? '' : 'hidden'}`}
              >
                {branches.map((branch) => (
                  <li key={branch.slug}>
                    <Link
                      href={`/diensten/${service.slug}/${branch.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                    >
                      {t(`megaMenu.branches.${branch.translationKey}.label`)}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="bg-stone-50 border-t border-stone-200 px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-stone-900">{t('megaMenu.ctaHeading')}</p>
            <p className="text-xs text-stone-500 font-medium">{t('megaMenu.ctaBody')}</p>
          </div>
          <Link
            href="/afspraak"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-2 bg-stone-950 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors shrink-0"
          >
            {t('megaMenu.ctaButton')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
