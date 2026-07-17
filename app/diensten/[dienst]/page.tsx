import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getService } from '../../../lib/navigation';
import { translations } from '../../../lib/i18n/translations';
import HubContent from './HubContent';

type HubContentEntry = {
  metaTitle: string;
  metaDescription: string;
};

export function generateStaticParams() {
  return services.map((service) => ({ dienst: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ dienst: string }> }): Promise<Metadata> {
  const { dienst } = await params;
  const service = getService(dienst);
  if (!service) return {};

  const content = (translations.nl.servicesHub as Record<string, HubContentEntry>)[service.translationKey];
  const canonical = `https://sproscale.com/diensten/${dienst}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical },
    openGraph: { title: content.metaTitle, description: content.metaDescription, url: canonical, type: 'website' },
  };
}

export default async function ServiceHubPage({ params }: { params: Promise<{ dienst: string }> }) {
  const { dienst } = await params;
  const service = getService(dienst);
  if (!service) notFound();

  const content = (translations.nl.servicesHub as Record<string, HubContentEntry>)[service.translationKey];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.metaTitle,
    description: content.metaDescription,
    serviceType: content.metaTitle,
    provider: { '@type': 'Organization', '@id': 'https://sproscale.com/#organization', name: 'Sproscale' },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    url: `https://sproscale.com/diensten/${dienst}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HubContent serviceSlug={dienst} />
    </>
  );
}
