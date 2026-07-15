"use client";

import { ArrowLeft, ArrowRight, Quote, TrendingUp, Target, Database } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../lib/i18n/LanguageContext';

const featureConfig = [
  { id: 'variation', icon: <Target className="w-5 h-5" /> },
  { id: 'firstSeconds', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'authenticity', icon: <Database className="w-5 h-5" /> },
];

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
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest">
              {t('insightsArticles.metaAiTargeting.badgeLabel')}
            </div>
            <span className="text-xs text-stone-400 font-light">{t('insightsArticles.metaAiTargeting.meta')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.articles.metaAiTargeting.title')}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {t('insightsArticles.metaAiTargeting.lead')}
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/meta-ai-targeting.webp.png.png"
            alt={t('insightsArticles.metaAiTargeting.imageAlt')}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.metaAiTargeting.sections.deathOfTargeting.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.sections.deathOfTargeting.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.sections.deathOfTargeting.p2Pre')}<strong>{t('insightsArticles.metaAiTargeting.sections.deathOfTargeting.p2Bold')}</strong>{t('insightsArticles.metaAiTargeting.sections.deathOfTargeting.p2Post')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.metaAiTargeting.sections.algorithmManager.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.sections.algorithmManager.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.sections.algorithmManager.p2Pre')}<strong>{t('insightsArticles.metaAiTargeting.sections.algorithmManager.p2Bold')}</strong>
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.metaAiTargeting.sections.creativeIsTargeting.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            {t('insightsArticles.metaAiTargeting.sections.creativeIsTargeting.text')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {featureConfig.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{t(`insightsArticles.metaAiTargeting.features.${item.id}.title`)}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{t(`insightsArticles.metaAiTargeting.features.${item.id}.text`)}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;{t('insightsArticles.metaAiTargeting.quote')}&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.metaAiTargeting.strategyHeading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            {t('insightsArticles.metaAiTargeting.strategyIntro')}
          </p>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            <li className="text-base font-light"><strong>{t('insightsArticles.metaAiTargeting.steps.crm.label')}</strong> {t('insightsArticles.metaAiTargeting.steps.crm.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.metaAiTargeting.steps.creativeRotation.label')}</strong> {t('insightsArticles.metaAiTargeting.steps.creativeRotation.text')}</li>
            <li className="text-base font-light"><strong>{t('insightsArticles.metaAiTargeting.steps.signalBoost.label')}</strong> {t('insightsArticles.metaAiTargeting.steps.signalBoost.text')}</li>
          </ol>

          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.resultPre')}<strong>{t('insightsArticles.metaAiTargeting.resultBold')}</strong>{t('insightsArticles.metaAiTargeting.resultPost')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.metaAiTargeting.closingHeading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.metaAiTargeting.closingText')}
          </p>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t('insightsArticles.metaAiTargeting.cta.heading')}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t('insightsArticles.metaAiTargeting.cta.body')}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t('insightsArticles.metaAiTargeting.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
