"use client";

import { ArrowLeft, ArrowRight, Quote, Layers, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../lib/i18n/LanguageContext';

const featureConfig = [
  { id: 'autoriteit', icon: <Layers className="w-5 h-5" /> },
  { id: 'intentie', icon: <Target className="w-5 h-5" /> },
  { id: 'rendement', icon: <TrendingUp className="w-5 h-5" /> },
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
              {t('insightsArticles.seoVoorMkb.badgeLabel')}
            </div>
            <span className="text-xs text-stone-400 font-light">{t('insightsArticles.seoVoorMkb.meta')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.articles.seoVoorMkb.title')}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {t('insightsArticles.seoVoorMkb.lead')}
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/seo-voor-mkb.svg"
            alt={t('insightsIndex.articles.seoVoorMkb.alt')}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.introPre')}<strong>{t('insightsArticles.seoVoorMkb.introHighlight')}</strong>{t('insightsArticles.seoVoorMkb.introPost')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.seoVoorMkb.sections.probleem.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.sections.probleem.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.sections.probleem.p2')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.seoVoorMkb.sections.oplossing.heading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.sections.oplossing.p1')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.sections.oplossing.p2Pre')}
            <Link href="/diensten/website-bouwen" className="text-stone-900 font-semibold underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              {t('insightsArticles.seoVoorMkb.sections.oplossing.p2LinkWebsite')}
            </Link>
            {t('insightsArticles.seoVoorMkb.sections.oplossing.p2Mid')}
            <Link href="/diensten/seo-optimalisatie" className="text-stone-900 font-semibold underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors">
              {t('insightsArticles.seoVoorMkb.sections.oplossing.p2LinkSeo')}
            </Link>
            {t('insightsArticles.seoVoorMkb.sections.oplossing.p2Post')}
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.sections.oplossing.p3')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {featureConfig.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{t(`insightsArticles.seoVoorMkb.features.${item.id}.title`)}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{t(`insightsArticles.seoVoorMkb.features.${item.id}.text`)}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;{t('insightsArticles.seoVoorMkb.quote')}&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.seoVoorMkb.closingHeading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.seoVoorMkb.closingText')}
          </p>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t('insightsArticles.seoVoorMkb.cta.heading')}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t('insightsArticles.seoVoorMkb.cta.body')}</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t('insightsArticles.seoVoorMkb.cta.button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
