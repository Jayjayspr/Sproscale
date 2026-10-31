"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../lib/i18n/LanguageContext';
import { branches, getService } from '../../../lib/navigation';
import ServiceLeadForm from '../../../components/ServiceLeadForm';

export default function HubContent({ serviceSlug }: { serviceSlug: string }) {
  const { t } = useLanguage();
  const service = getService(serviceSlug);
  if (!service) return null;

  const h = `servicesHub.${service.translationKey}`;
  const serviceLabel = t(`megaMenu.services.${service.translationKey}.label`);

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            {t(`${h}.h1`)}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            {t(`${h}.lead`)}
          </p>
        </header>

        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            {t(`${h}.introPre`)}<strong>{t(`${h}.introHighlight`)}</strong>{t(`${h}.introPost`)}
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t(`${h}.sections.probleem.heading`)}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">{t(`${h}.sections.probleem.p1`)}</p>
          <p className="text-stone-700 leading-relaxed mb-8">{t(`${h}.sections.probleem.p2`)}</p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t(`${h}.sections.oplossing.heading`)}</h2>
          <p className="text-stone-700 leading-relaxed mb-8">{t(`${h}.sections.oplossing.p1`)}</p>

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

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">{t(`${h}.stepsHeading`)}</h2>
          <p className="text-stone-700 leading-relaxed mb-6">{t(`${h}.stepsIntro`)}</p>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            {['a', 'b', 'c'].map((id) => (
              <li key={id} className="text-base font-light">
                <strong>{t(`${h}.steps.${id}.label`)}</strong> {t(`${h}.steps.${id}.text`)}
              </li>
            ))}
          </ol>
        </div>

        {/* Silo: links naar alle niche-pagina's voor deze dienst */}
        <section className="mt-16 pt-16 border-t border-stone-200">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3 tracking-tight">{t(`${h}.siloHeading`)}</h2>
          <p className="text-stone-600 leading-relaxed mb-8 font-light">{t(`${h}.siloIntro`)}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {branches.map((branch) => (
              <Link
                key={branch.slug}
                href={`/diensten/${serviceSlug}/${branch.slug}`}
                className="flex items-center justify-between gap-2 bg-white rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 hover:text-white hover:border-transparent hover:bg-linear-to-r hover:from-glow-from hover:to-glow-to hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {t(`megaMenu.branches.${branch.translationKey}.label`)}
                <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-16">
          <ServiceLeadForm serviceSlug={serviceSlug} serviceLabel={serviceLabel} />
        </div>

        <section className="mt-16 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">{t(`${h}.cta.heading`)}</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">{t(`${h}.cta.body`)}</p>
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
