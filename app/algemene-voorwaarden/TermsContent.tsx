"use client";

import { useLanguage } from '../../lib/i18n/LanguageContext';

type Definition = { term: string; def: string };

export default function TermsContent() {
  const { t, tRaw, language } = useLanguage();
  const definitions = tRaw<Definition[]>('termsPage.s1.definitions');

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-8">
          {t('termsPage.title')}
        </h1>

        <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-stone-600">
          <p className="text-sm text-stone-500 mb-12">{t('termsPage.lastUpdatedLabel')} {new Date().toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US')}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s1.heading')}</h2>
            <p className="mb-4">
              {t('termsPage.s1.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {definitions.map((d, i) => (
                <li key={i}><strong className="text-stone-900 font-medium">{d.term}</strong> {d.def}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s2.heading')}</h2>
            <p className="mb-4">{t('termsPage.s2.p1')}</p>
            <p className="mb-4">{t('termsPage.s2.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s3.heading')}</h2>
            <p className="mb-4">{t('termsPage.s3.body')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s4.heading')}</h2>
            <p className="mb-4">{t('termsPage.s4.p1')}</p>
            <p className="mb-4">{t('termsPage.s4.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s5.heading')}</h2>
            <p className="mb-4">{t('termsPage.s5.p1')}</p>
            <p className="mb-4">{t('termsPage.s5.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s6.heading')}</h2>
            <p className="mb-4">{t('termsPage.s6.p1')}</p>
            <p className="mb-4">{t('termsPage.s6.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s7.heading')}</h2>
            <p className="mb-4">{t('termsPage.s7.body')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s8.heading')}</h2>
            <p className="mb-4">{t('termsPage.s8.p1')}</p>
            <p className="mb-4">{t('termsPage.s8.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s9.heading')}</h2>
            <p className="mb-4">{t('termsPage.s9.p1')}</p>
            <p className="mb-4">{t('termsPage.s9.p2')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s10.heading')}</h2>
            <p className="mb-4">{t('termsPage.s10.body')}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('termsPage.s11.heading')}</h2>
            <p className="mb-4">{t('termsPage.s11.body')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
