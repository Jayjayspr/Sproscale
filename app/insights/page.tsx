'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const insightsConfig = [
  { slug: 'dataGedrevenOndernemen', href: '/insights/data-gedreven-ondernemen-2026', image: '/images/insights/data-gedreven-ondernemen-2026.svg', unoptimized: true },
  { slug: 'lokaleSeoHoveniers', href: '/insights/lokale-seo-voor-hoveniers', image: '/images/insights/lokale-seo-hoveniers.svg', unoptimized: true },
  { slug: 'aiAutomatisering', href: '/insights/ai-automatisering', image: '/images/insights/ai-automatisering-growth.webp' },
  { slug: 'marketingPsychologie', href: '/insights/marketing-psychologie', image: '/images/insights/marketing-psychologie-conversie.webp' },
  { slug: 'mobieleChatbotUx', href: '/insights/mobiele-chatbot-ux', image: '/images/insights/mobiele-chatbot-ux.webp.png' },
  { slug: 'wordpressVsVercel', href: '/insights/wordpress-vs-vercel', image: '/images/insights/wordpress-vs-vercel.png' },
  { slug: 'metaAiTargeting', href: '/insights/meta-ai-targeting', image: '/images/insights/meta-ai-targeting.webp.png.png' },
];

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
            <div className="w-12 h-[1px] bg-stone-900"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('insightsIndex.eyebrow')}</span>
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
            <motion.div
              key={article.slug}
              {...fadeInUp}
              className="group bg-white rounded-3xl p-8 border border-stone-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6 bg-stone-100">
                <Image
                  src={article.image}
                  alt={t(`insightsIndex.articles.${article.slug}.alt`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-7xl): 50vw, 33vw"
                  unoptimized={article.unoptimized}
                />
              </div>

              <div className="flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block">{t(`insightsIndex.articles.${article.slug}.date`)}</span>
                <h3 className="text-2xl font-serif text-stone-900 mb-4 leading-tight group-hover:text-stone-600 transition-colors">
                  {t(`insightsIndex.articles.${article.slug}.title`)}
                </h3>
                <p className="text-stone-600 font-light leading-relaxed mb-8 text-sm md:text-base">
                  {t(`insightsIndex.articles.${article.slug}.excerpt`)}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center mt-auto">
                <Link href={article.href} className="inline-flex items-center gap-2 text-stone-900 font-bold text-sm group/link">
                  {t('insightsIndex.readMore')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
