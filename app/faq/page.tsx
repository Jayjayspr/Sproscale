import type { Metadata } from 'next';
import { translations } from '../../lib/i18n/translations';
import FaqContent from './FaqContent';

const content = translations.nl.faqPage;

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: 'https://sproscale.com/faq' },
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
    url: 'https://sproscale.com/faq',
    type: 'website',
  },
};

// Strikte FAQPage schema: alle vraag/antwoord-paren uit alle categorieën in één
// mainEntity-lijst, zoals Google's Rich Results vereisen.
const allQuestions = Object.values(content.categories).flatMap((category) => category.items);

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allQuestions.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FaqContent />
    </>
  );
}
