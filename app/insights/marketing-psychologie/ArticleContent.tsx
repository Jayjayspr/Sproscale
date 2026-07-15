"use client";

import { ArrowLeft, ArrowRight, Quote, Users, Target, Gift } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../../lib/i18n/LanguageContext';

export default function ArticleContent() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-900 text-xs font-bold uppercase tracking-widest border border-stone-200">
              {t('insightsArticles.marketingPsychologie.badgeLabel')}
            </span>
            <span className="text-stone-400 text-xs font-medium">{t('insightsArticles.marketingPsychologie.meta')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t('insightsIndex.articles.marketingPsychologie.title')}
          </h1>

          <p className="text-xl md:text-2xl text-stone-500 leading-relaxed font-light italic mb-10">
            {t('insightsArticles.marketingPsychologie.lead')}
          </p>
        </header>

        {/* Featured Image Area */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden group shadow-xl bg-stone-100">
          <Image
            src="/images/insights/marketing-psychologie-conversie.webp"
            alt={t('insightsIndex.articles.marketingPsychologie.alt')}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.marketingPsychologie.introPre')}<strong>Sproscale</strong>{t('insightsArticles.marketingPsychologie.introPost')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight flex items-center gap-3">
            <Users className="w-6 h-6 text-stone-900" />
            {t('insightsArticles.marketingPsychologie.sections.socialProof.title')}
          </h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.marketingPsychologie.sections.socialProof.text')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight flex items-center gap-3">
            <Target className="w-6 h-6 text-stone-900" />
            {t('insightsArticles.marketingPsychologie.sections.choiceParadox.title')}
          </h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.marketingPsychologie.sections.choiceParadox.text')}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight flex items-center gap-3">
            <Gift className="w-6 h-6 text-stone-900" />
            {t('insightsArticles.marketingPsychologie.sections.reciprocity.title')}
          </h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.marketingPsychologie.sections.reciprocity.text')}
          </p>

          {/* Styled Quote Block */}
          <div className="border-l-4 border-stone-900 pl-8 my-16 italic text-xl text-stone-700 bg-stone-50 py-10 rounded-r-3xl pr-8 relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-12 h-12 text-stone-100" />
            <p className="relative z-10 font-serif leading-relaxed">
              &quot;{t('insightsArticles.marketingPsychologie.quote')}&quot;
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('insightsArticles.marketingPsychologie.closingHeading')}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            {t('insightsArticles.marketingPsychologie.closingText')}
          </p>
        </div>

        {/* CTA Card - Minimalist DARK layout */}
        <section className="mt-24 pt-16 border-t border-stone-100">
          <div className="bg-stone-900 p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden shadow-2xl">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-30 -ml-32 -mb-32"></div>

            <div className="relative z-10 max-w-xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">{t('insightsArticles.marketingPsychologie.cta.heading')}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg">{t('insightsArticles.marketingPsychologie.cta.body')}</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-bold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-lg text-lg"
              >
                {t('insightsArticles.marketingPsychologie.cta.button')}
                <ArrowRight className="w-5 h-5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
