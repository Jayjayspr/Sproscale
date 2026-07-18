"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../lib/i18n/LanguageContext';

type FaqItem = { q: string; a: string };

const categoryConfig = [
  { id: 'traject' },
  { id: 'techniek' },
  { id: 'investering' },
];

export default function FaqContent() {
  const { t, tRaw } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 bg-white border-b border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8">
            {t('faqPage.badge')}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-8">
            {t('faqPage.h1')}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-2xl mx-auto">
            {t('faqPage.lead')}
          </p>
        </motion.div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">{t('faqPage.tocHeading')}</p>
          <nav className="flex flex-wrap gap-3">
            {categoryConfig.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-full px-4 py-2.5 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
              >
                {t(`faqPage.categories.${cat.id}.label`)}
                <ArrowDown className="w-3.5 h-3.5 text-stone-400" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Categorieën */}
      {categoryConfig.map((cat, catIndex) => {
        const items = tRaw<FaqItem[]>(`faqPage.categories.${cat.id}.items`);
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-16 md:py-20 scroll-mt-24 ${catIndex % 2 === 1 ? 'bg-white border-y border-stone-100' : ''}`}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight mb-10">
                {t(`faqPage.categories.${cat.id}.label`)}
              </h2>

              <div className="space-y-4 mb-10">
                {items.map((item, index) => {
                  const key = `${cat.id}-${index}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-semibold text-stone-900">{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="px-6 pb-5 text-sm text-stone-600 leading-relaxed font-light">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtiele, actiegerichte link per categorie */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors group"
              >
                {t('faqPage.ctaText')} <span className="underline underline-offset-4">{t('faqPage.ctaLinkText')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </section>
        );
      })}

      {/* Slot-CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 p-10 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                {t('faqPage.ctaText')} {t('faqPage.ctaLinkText')}
              </h3>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white px-10 py-5 rounded-full font-semibold transition-all duration-300 shadow-xl mt-6"
              >
                {t('faqPage.ctaLinkText')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
