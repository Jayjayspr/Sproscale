'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import type { InsightConfig } from '../../lib/insights';

export default function InsightCard({ article }: { article: InsightConfig }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="group bg-white rounded-3xl p-8 border border-stone-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6 bg-stone-100">
        <Image
          src={article.image}
          alt={t(`insightsIndex.articles.${article.slug}.alt`)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={article.unoptimized}
        />
      </div>

      <div className="flex-grow">
        <span className="text-[10px] font-bold uppercase tracking-eyebrow text-stone-400 mb-4 block">{t(`insightsIndex.articles.${article.slug}.date`)}</span>
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
  );
}
