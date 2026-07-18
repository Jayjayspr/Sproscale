"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Wallet, Clock, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../lib/i18n/LanguageContext';

type FaqItem = { q: string; a: string };

const promiseConfig = [
  { id: 'vastePrijs', icon: Wallet },
  { id: 'speedGarantie', icon: Clock },
  { id: 'eigendom', icon: Lock },
];

export default function GuaranteeContent() {
  const { t, tRaw } = useLanguage();
  const faqs = tRaw<FaqItem[]>('garantiePage.faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCta(window.scrollY > 480);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 bg-white border-b border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8">
            {t('garantiePage.badge')}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-8">
            {t('garantiePage.h1')}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-light max-w-2xl mx-auto">
            {t('garantiePage.lead')}
          </p>
        </motion.div>
      </section>

      {/* Onze beloftes */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight mb-4">
              {t('garantiePage.promisesHeading')}
            </h2>
            <p className="text-stone-600 font-light">{t('garantiePage.promisesIntro')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promiseConfig.map((promise) => (
              <div key={promise.id} className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6">
                  <promise.icon className="w-6 h-6 text-stone-900" />
                </div>
                <h3 className="font-display text-xl font-medium text-stone-900 mb-3 leading-snug">
                  {t(`garantiePage.promises.${promise.id}.title`)}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-light">
                  {t(`garantiePage.promises.${promise.id}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat als het tegenzit? */}
      <section className="py-16 md:py-20 bg-white border-y border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight mb-6">
            {t('garantiePage.whatIfHeading')}
          </h2>
          <p className="text-stone-600 leading-relaxed font-light text-lg">
            {t('garantiePage.whatIfText')}
          </p>
        </div>
      </section>

      {/* Transparantie */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight mb-6">
            {t('garantiePage.transparencyHeading')}
          </h2>
          <p className="text-stone-600 leading-relaxed font-light text-lg">
            {t('garantiePage.transparencyText')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight mb-10 text-center">
            {t('garantiePage.faqHeading')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-stone-900">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-5 text-sm text-stone-600 leading-relaxed font-light">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slot-CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 p-10 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20" />
            <div className="relative z-10">
              <h3 className="font-display text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                {t('garantiePage.ctaHeading')}
              </h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t('garantiePage.ctaBody')}</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white px-10 py-5 rounded-full font-semibold transition-all duration-300 shadow-xl"
              >
                {t('garantiePage.ctaButton')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA bar */}
      <motion.div
        initial={false}
        animate={showStickyCta ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pointer-events-none"
        style={{ pointerEvents: showStickyCta ? 'auto' : 'none' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <p className="hidden sm:block text-sm font-semibold text-stone-900 truncate">{t('garantiePage.h1')}</p>
          <Link
            href="/afspraak"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 shrink-0"
          >
            {t('garantiePage.ctaButton')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
