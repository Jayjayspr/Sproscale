"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Zap, BrainCircuit, Database, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const expertiseConfig = [
  { id: 'performance', icon: Zap },
  { id: 'aiIntelligence', icon: BrainCircuit },
  { id: 'scalableData', icon: Database },
];

export default function AboutPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 }
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-16 font-sans text-stone-900">
      {/* Page Hero (The Mission) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div {...fadeInUp}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-stone-900 mb-6">
            {t('overOnsPage.heroTitleLine1')} <br className="hidden md:block" />
            <span className="text-stone-500 italic">{t('overOnsPage.heroTitleHighlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            {t('overOnsPage.heroSubtitle')}
          </p>
        </motion.div>
      </section>

      {/* The "Why" (Grijze Sectie) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div {...fadeInUp} className="bg-stone-100 rounded-3xl p-8 md:p-12 text-center border border-stone-200">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-6">{t('overOnsPage.gapHeading')}</h2>
          <p className="text-stone-600 leading-relaxed text-base md:text-lg font-light">
            {t('overOnsPage.gapBody')}
          </p>
        </motion.div>
      </section>

      {/* Core Expertise (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">{t('overOnsPage.expertiseHeadingPre')} <span className="text-stone-500 italic">{t('overOnsPage.expertiseHeadingHighlight')}</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertiseConfig.map((item, i) => (
            <motion.div key={item.id} {...fadeInUp} transition={{ delay: 0.1 * (i + 1), duration: 0.7 }} className="bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-500">
                  <item.icon className="w-7 h-7 text-stone-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-serif text-stone-900 mb-3">{t(`overOnsPage.expertise.${item.id}.title`)}</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  {t(`overOnsPage.expertise.${item.id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder/Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Image Container with Antigravity styling */}
            <div className="p-8 pb-0 md:p-12 lg:p-16 flex items-start h-full">
              <div className="relative">
                <Image
                  src="/jay-sprock.webp"
                  alt={t('overOnsPage.founderImageAlt')}
                  width={400}
                  height={400}
                  priority={true}
                  className="rounded-full aspect-square object-cover shadow-md transform -translate-y-2 w-32 h-32 md:w-48 md:h-48"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 mt-4 md:mt-0">{t('overOnsPage.founderHeading')}</h2>
              <div className="space-y-6">
                <p className="text-stone-600 font-light leading-relaxed">
                  {t('overOnsPage.founderQuote1')}
                </p>
                <p className="text-stone-600 font-light leading-relaxed">
                  {t('overOnsPage.founderQuote2')}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="font-bold text-stone-900 mb-1">{t('overOnsPage.founderName')}</p>
                <p className="text-sm text-stone-500 font-medium tracking-wide">{t('overOnsPage.founderRole')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div {...fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">{t('overOnsPage.ctaHeading')}</h2>
          <p className="text-stone-600 font-light mb-8 max-w-2xl mx-auto">
            {t('overOnsPage.ctaBody')}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-md text-lg group"
          >
            {t('hero.ctaPrimary')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
