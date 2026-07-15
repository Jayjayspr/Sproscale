"use client";

import { useLanguage } from '../../lib/i18n/LanguageContext';

type RightItem = { label: string; text: string };

export default function PrivacyContent() {
  const { t, tRaw, language } = useLanguage();
  const items = tRaw<string[]>('privacyPage.s2.items');
  const rights = tRaw<RightItem[]>('privacyPage.s4.rights');

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-8">
          {t('privacyPage.title')}
        </h1>

        <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-stone-600">
          <p className="text-sm text-stone-500 mb-12">{t('privacyPage.lastUpdatedLabel')} {new Date().toLocaleDateString(language === 'nl' ? 'nl-NL' : 'en-US')}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('privacyPage.s1.heading')}</h2>
            <p className="mb-4">
              {t('privacyPage.s1.body')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('privacyPage.s2.heading')}</h2>
            <p className="mb-4">
              {t('privacyPage.s2.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('privacyPage.s3.heading')}</h2>
            <p className="mb-4">
              {t('privacyPage.s3.intro')}
            </p>

            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">{t('privacyPage.s3.whatHeading')}</h3>
            <p className="mb-4">
              {t('privacyPage.s3.whatBody')}
            </p>

            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">{t('privacyPage.s3.whichHeading')}</h3>
            <ul className="list-disc pl-6 space-y-4 mb-4">
              <li>
                <strong className="text-stone-900 font-medium">{t('privacyPage.s3.necessary.label')}</strong>
                <br />{t('privacyPage.s3.necessary.textPre')}<code>cookieConsent</code>{t('privacyPage.s3.necessary.textPost')}
              </li>
              <li>
                <strong className="text-stone-900 font-medium">{t('privacyPage.s3.analytics.label')}</strong>
                <br />{t('privacyPage.s3.analytics.text')}
              </li>
              <li>
                <strong className="text-stone-900 font-medium">{t('privacyPage.s3.marketing.label')}</strong>
                <br />{t('privacyPage.s3.marketing.text')}
              </li>
            </ul>

            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">{t('privacyPage.s3.manageHeading')}</h3>
            <p className="mb-4">
              {t('privacyPage.s3.manageBody')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('privacyPage.s4.heading')}</h2>
            <p className="mb-4">
              {t('privacyPage.s4.intro')}
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {rights.map((right, i) => (
                <li key={i}><strong>{right.label}</strong> {right.text}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">{t('privacyPage.s5.heading')}</h2>
            <p className="mb-4">
              {t('privacyPage.s5.body')}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
