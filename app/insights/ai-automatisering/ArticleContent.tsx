"use client";

import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../lib/i18n/LanguageContext';

export default function ArticleContent() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t('common.backToInsights')}
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8">
            {t('insightsArticles.aiAutomatisering.badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.articles.aiAutomatisering.title')}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {t('insightsArticles.aiAutomatisering.lead')}
          </p>
        </header>

        {/* Featured Image Area */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden group shadow-xl bg-stone-100">
          <Image
            src="/images/insights/ai-automatisering-growth.webp"
            alt={t('insightsIndex.articles.aiAutomatisering.alt')}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.aiAutomatisering.introPre')}<strong>Sproscale</strong>{t('insightsArticles.aiAutomatisering.introPost')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.aiAutomatisering.sections.outreach.title')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.aiAutomatisering.sections.outreach.text')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.aiAutomatisering.sections.agent.title')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.aiAutomatisering.sections.agent.text')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.aiAutomatisering.sections.efficiency.title')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.aiAutomatisering.sections.efficiency.text')}
          </p>

          {/* Styled Quote Block */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;{t('insightsArticles.aiAutomatisering.quote')}&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.aiAutomatisering.implementationHeading')}</h2>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12 uppercase tracking-wide font-medium text-xs">
            <li className="text-base font-light"><strong>{t('insightsArticles.aiAutomatisering.steps.identify.label')}</strong> {t('insightsArticles.aiAutomatisering.steps.identify.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.aiAutomatisering.steps.buildBase.label')}</strong> {t('insightsArticles.aiAutomatisering.steps.buildBase.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.aiAutomatisering.steps.scaleUp.label')}</strong> {t('insightsArticles.aiAutomatisering.steps.scaleUp.text')}</li>
          </ol>
        </div>

        {/* Footer / CTA Section */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            {/* Abstract background blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t('insightsArticles.aiAutomatisering.cta.heading')}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t('insightsArticles.aiAutomatisering.cta.body')}</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t('insightsArticles.aiAutomatisering.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
