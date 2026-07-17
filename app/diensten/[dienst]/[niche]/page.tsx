import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { branches, services, getBranch, getService } from '../../../../lib/navigation';
import { translations } from '../../../../lib/i18n/translations';
import { getNicheContentOverride, getNicheReviews, getNicheCases } from '../../../../lib/serviceContent';
import NicheContent from './NicheContent';

type HubContentEntry = { metaTitle: string };
type BranchLabelEntry = { label: string };

export function generateStaticParams() {
  return services.flatMap((service) =>
    branches.map((branch) => ({ dienst: service.slug, niche: branch.slug }))
  );
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, value), template);
}

export async function generateMetadata({ params }: { params: Promise<{ dienst: string; niche: string }> }): Promise<Metadata> {
  const { dienst, niche } = await params;
  const service = getService(dienst);
  const branch = getBranch(niche);
  if (!service || !branch) return {};

  const serviceLabel = (translations.nl.megaMenu.services as Record<string, BranchLabelEntry>)[service.translationKey].label;
  const branchLabel = (translations.nl.megaMenu.branches as Record<string, BranchLabelEntry>)[branch.translationKey].label;
  const hubContent = (translations.nl.servicesHub as Record<string, HubContentEntry>)[service.translationKey];

  const title = fillTemplate(translations.nl.nichePages.h1Template, { service: serviceLabel, niche: branchLabel });
  const description = `${title}. ${hubContent.metaTitle} specifiek voor ${branchLabel.toLowerCase()}, door Sproscale.`;
  const canonical = `https://sproscale.com/diensten/${dienst}/${niche}`;

  const override = await getNicheContentOverride(dienst, niche);
  const hasUniqueContent = !!override?.intro_override;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: 'website' },
    robots: hasUniqueContent ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function NicheServicePage({ params }: { params: Promise<{ dienst: string; niche: string }> }) {
  const { dienst, niche } = await params;
  const service = getService(dienst);
  const branch = getBranch(niche);
  if (!service || !branch) notFound();

  const [override, reviews, cases] = await Promise.all([
    getNicheContentOverride(dienst, niche),
    getNicheReviews(dienst, niche),
    getNicheCases(dienst, niche),
  ]);

  const serviceLabel = (translations.nl.megaMenu.services as Record<string, BranchLabelEntry>)[service.translationKey].label;
  const branchLabel = (translations.nl.megaMenu.branches as Record<string, BranchLabelEntry>)[branch.translationKey].label;
  const title = fillTemplate(translations.nl.nichePages.h1Template, { service: serviceLabel, niche: branchLabel });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    serviceType: serviceLabel,
    provider: { '@type': 'Organization', '@id': 'https://sproscale.com/#organization', name: 'Sproscale' },
    areaServed: { '@type': 'Country', name: 'Netherlands' },
    audience: { '@type': 'Audience', audienceType: branchLabel },
    url: `https://sproscale.com/diensten/${dienst}/${niche}`,
    ...(reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NicheContent serviceSlug={dienst} nicheSlug={niche} override={override} reviews={reviews} cases={cases} />
    </>
  );
}
