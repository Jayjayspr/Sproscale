import type { Metadata } from 'next';
import { translations } from '../../lib/i18n/translations';
import GuaranteeContent from './GuaranteeContent';

const content = translations.nl.garantiePage;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: 'https://sproscale.com/garantie' },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: 'https://sproscale.com/garantie',
    type: 'website',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function GarantiePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <GuaranteeContent />
    </>
  );
}
