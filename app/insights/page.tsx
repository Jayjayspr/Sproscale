'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { insightsConfig } from '../../lib/insights';
import InsightCard from '../../components/insights/InsightCard';

export default function InsightsPage() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-stone-900"></div>
            <span className="text-xs font-bold tracking-eyebrow text-stone-500 uppercase">{t('insightsIndex.eyebrow')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.05] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.headingPre')} <span className="text-stone-400 italic">{t('insightsIndex.headingHighlight')}</span>
          </h1>
          <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
            {t('insightsIndex.subheading')}
          </p>
        </motion.div>
      </section>

      {/* Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightsConfig.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
