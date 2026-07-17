"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../../../lib/i18n/LanguageContext';
import { getBranch, getService } from '../../../../lib/navigation';
import ServiceLeadForm from '../../../../components/ServiceLeadForm';
import type { NicheContentOverride, NicheReview, NicheCase } from '../../../../lib/serviceContent';

interface NicheContentProps {
  serviceSlug: string;
  nicheSlug: string;
  override: NicheContentOverride | null;
  reviews: NicheReview[];
  cases: NicheCase[];
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), template);
}

export default function NicheContent({ serviceSlug, nicheSlug, override, reviews, cases }: NicheContentProps) {
  const { t } = useLanguage();
  const service = getService(serviceSlug);
  const branch = getBranch(nicheSlug);
  if (!service || !branch) return null;

  const h = `servicesHub.${service.translationKey}`;
  const serviceLabel = t(`megaMenu.services.${service.translationKey}.label`);
  const branchLabel = t(`megaMenu.branches.${branch.translationKey}.label`);
  const vars = { service: serviceLabel, niche: branchLabel };

  const title = fillTemplate(t('nichePages.h1Template'), vars);
  const intro = override?.intro_override || fillTemplate(t('nichePages.introTemplate'), vars);
  const problemHeading = fillTemplate(t('nichePages.problemHeadingTemplate'), vars);
  const problemText = override?.problem_override || fillTemplate(t('nichePages.problemTemplate'), vars);
  const ctaBody = fillTemplate(t('nichePages.ctaBodyTemplate'), vars);

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/diensten/${serviceSlug}`}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {fillTemplate(t('nichePages.backToHub'), vars)}
        </Link>

        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8">
            {fillTemplate(t('nichePages.badgeTemplate'), vars)}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {intro}
          </p>
        </header>

        <div className="prose prose-stone prose-lg max-w-none">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{problemHeading}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">{problemText}</p>

          {/* Features: overgeërfd van de hub-dienst */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {['a', 'b', 'c'].map((id) => (
              <div key={id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{t(`${h}.features.${id}.title`)}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{t(`${h}.features.${id}.text`)}</p>
              </div>
            ))}
          </div>

          {/* Cases: uit de database, alleen tonen als er content is */}
          {cases.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('nichePages.casesHeading')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {cases.map((c) => (
                  <div key={c.id} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                    {c.result_stat && (
                      <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wide mb-3">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {c.result_stat}
                      </div>
                    )}
                    <h4 className="font-bold text-stone-900 mb-2">{c.title}</h4>
                    <p className="text-stone-600 text-sm font-light leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Reviews: uit de database, alleen tonen als er content is */}
          {reviews.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t('nichePages.reviewsHeading')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}`} />
                      ))}
                    </div>
                    <p className="text-stone-700 text-sm font-light leading-relaxed mb-3 italic">&quot;{r.quote}&quot;</p>
                    <p className="text-xs font-bold text-stone-900">{r.author_name}{r.company ? ` — ${r.company}` : ''}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t(`${h}.stepsHeading`)}</h2>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            {['a', 'b', 'c'].map((id) => (
              <li key={id} className="text-base font-light">
                <strong>{t(`${h}.steps.${id}.label`)}</strong> {t(`${h}.steps.${id}.text`)}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
          <ServiceLeadForm serviceSlug={serviceSlug} serviceLabel={serviceLabel} nicheSlug={nicheSlug} nicheLabel={branchLabel} />
        </div>

        <section className="mt-16 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t(`${h}.cta.heading`)}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{ctaBody}</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {t(`${h}.cta.button`)}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
