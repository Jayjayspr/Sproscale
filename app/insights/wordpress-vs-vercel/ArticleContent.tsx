"use client";

import { ArrowLeft, ArrowRight, Quote, Zap, TrendingDown, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../lib/i18n/LanguageContext';

const featureConfig = [
  { id: 'slowLoad', icon: <TrendingDown className="w-5 h-5" /> },
  { id: 'badVitals', icon: <AlertTriangle className="w-5 h-5" /> },
  { id: 'noEdge', icon: <Zap className="w-5 h-5" /> },
];

export default function ArticleContent() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/insights" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {t('common.backToInsights')}
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest">
              {t('insightsArticles.wordpressVsVercel.badgeLabel')}
            </div>
            <span className="text-xs text-stone-400 font-light">{t('insightsArticles.wordpressVsVercel.meta')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.articles.wordpressVsVercel.title')}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {t('insightsArticles.wordpressVsVercel.lead')}
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/wordpress-vs-vercel.png"
            alt={t('insightsArticles.wordpressVsVercel.imageAlt')}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.wordpressVsVercel.sections.brochure.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.wordpressVsVercel.sections.brochure.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.wordpressVsVercel.sections.brochure.p2Pre')}<strong>{t('insightsArticles.wordpressVsVercel.sections.brochure.p2Bold')}</strong>{t('insightsArticles.wordpressVsVercel.sections.brochure.p2Post')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.wordpressVsVercel.sections.brochure.p3')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.wordpressVsVercel.sections.whatWpDoesntTell.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            {t('insightsArticles.wordpressVsVercel.sections.whatWpDoesntTell.text')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {featureConfig.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{t(`insightsArticles.wordpressVsVercel.features.${item.id}.title`)}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{t(`insightsArticles.wordpressVsVercel.features.${item.id}.text`)}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.wordpressVsVercel.sections.nextVercel.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.wordpressVsVercel.sections.nextVercel.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.wordpressVsVercel.sections.nextVercel.p2Pre')}<strong>{t('insightsArticles.wordpressVsVercel.sections.nextVercel.p2Bold')}</strong>{t('insightsArticles.wordpressVsVercel.sections.nextVercel.p2Post')}
          </p>

          {/* Sproscale Perspective */}
          <div className="my-16 p-8 md:p-10 bg-stone-900 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-[60px] opacity-60 -mr-10 -mt-10" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">{t('insightsArticles.wordpressVsVercel.perspective.label')}</p>
              <h3 className="text-2xl font-serif text-white mb-4 leading-tight">{t('insightsArticles.wordpressVsVercel.perspective.heading')}</h3>
              <p className="text-stone-300 font-light leading-relaxed mb-6">
                {t('insightsArticles.wordpressVsVercel.perspective.p1')}
              </p>
              <p className="text-stone-300 font-light leading-relaxed">
                {t('insightsArticles.wordpressVsVercel.perspective.p2')}
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.wordpressVsVercel.speedValueHeading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            {t('insightsArticles.wordpressVsVercel.speedValueText')}
          </p>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;{t('insightsArticles.wordpressVsVercel.quote')}&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.wordpressVsVercel.checklistHeading')}</h2>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            <li className="text-base font-light"><strong>{t('insightsArticles.wordpressVsVercel.checklist.loadTime.label')}</strong> {t('insightsArticles.wordpressVsVercel.checklist.loadTime.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.wordpressVsVercel.checklist.coreWebVitals.label')}</strong> {t('insightsArticles.wordpressVsVercel.checklist.coreWebVitals.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.wordpressVsVercel.checklist.mobileConversion.label')}</strong> {t('insightsArticles.wordpressVsVercel.checklist.mobileConversion.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.wordpressVsVercel.checklist.leadCapture.label')}</strong> {t('insightsArticles.wordpressVsVercel.checklist.leadCapture.text')}</li>
          </ol>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-4 font-medium">{t('insightsArticles.wordpressVsVercel.cta.badge')}</p>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t('insightsArticles.wordpressVsVercel.cta.heading')}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t('insightsArticles.wordpressVsVercel.cta.body')}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t('insightsArticles.wordpressVsVercel.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
