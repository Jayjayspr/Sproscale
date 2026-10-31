"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { branches, services } from '@/lib/navigation';
import { contactInfo } from '@/lib/contact';

const companyLinks = [
  { id: 'overOns', href: '/over-ons' },
  { id: 'werkwijze', href: '/#werkwijze' },
  { id: 'garantie', href: '/garantie' },
  { id: 'faq', href: '/faq' },
  { id: 'insights', href: '/insights' },
  { id: 'contact', href: '/contact' },
];

const legalLinks = [
  { id: 'privacy', href: '/privacy' },
  { id: 'terms', href: '/algemene-voorwaarden' },
];

const socialLinks = [
  { id: 'linkedin', href: contactInfo.linkedin, icon: Linkedin },
  { id: 'instagram', href: contactInfo.instagram, icon: Instagram },
];

// Pagina's die zelf al een contactformulier hebben: daar geen dubbele CTA in de footer.
const PAGES_WITH_OWN_CTA = ['/', '/contact', '/afspraak'];

const headingClass = 'text-white font-bold text-xs uppercase tracking-[0.2em] mb-6';
const linkClass = 'text-stone-400 hover:text-white transition-colors font-light text-sm';

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const showCta = !PAGES_WITH_OWN_CTA.includes(pathname);

  return (
    <footer className="bg-[#111111] text-stone-400 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA-blok */}
        {showCta && (
        <div className="py-16 md:py-20 border-b border-stone-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-medium text-white tracking-tight mb-4">
              {t('footer.ctaHeading')}
            </h2>
            <p className="text-base md:text-lg text-stone-400 font-light leading-relaxed">{t('footer.ctaBody')}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/afspraak"
              className="inline-flex justify-center items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 text-white font-semibold px-6 py-3.5 rounded-full transition-all duration-300 group shadow-lg shadow-glow-from/20"
            >
              {t('footer.ctaButton')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={contactInfo.phoneHref}
              className="inline-flex justify-center items-center gap-2 border border-stone-700 hover:border-stone-500 text-white font-semibold px-6 py-3.5 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              {contactInfo.phoneDisplay}
            </a>
          </div>
        </div>
        )}

        {/* Kolommen */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Merk + contact */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="relative w-6 h-6 transition-all duration-300 group-hover:scale-110">
                <Image src="/sproscale-emblem-white.png" alt={t('footer.logoAlt')} fill className="object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white uppercase">SPROSCALE</span>
            </Link>
            <p className="text-sm font-light leading-relaxed text-stone-400 max-w-xs mb-8">{t('footer.tagline')}</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={contactInfo.phoneHref} className="inline-flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-stone-500" /> {contactInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-stone-500" /> {contactInfo.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-3">
                <MapPin className="w-4 h-4 text-stone-500" /> {t('footer.location')}
              </li>
            </ul>
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`footer.legal.${social.id}`)}
                  className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Diensten */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>{t('footer.servicesHeading')}</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/diensten/${service.slug}`} className={linkClass}>
                    {t(`megaMenu.services.${service.translationKey}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches → website-bouwen nichepagina's (interne links voor SEO) */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>{t('footer.branchesHeading')}</h3>
            <ul className="space-y-3">
              {branches.map((branch) => (
                <li key={branch.slug}>
                  <Link href={`/diensten/website-bouwen/${branch.slug}`} className={linkClass}>
                    {t(`megaMenu.branches.${branch.translationKey}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>{t('footer.companyHeading')}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className={linkClass}>
                    {t(`nav.${link.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Onderbalk — extra ruimte onderin op mobiel voor de vaste belbalk */}
        <div className="pt-8 pb-28 lg:pb-10 border-t border-stone-800 flex flex-col md:flex-row justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
            <p>© {new Date().getFullYear()} {t('footer.copyrightText')}</p>
            <p>KvK {contactInfo.kvk}</p>
            <p>{t('footer.areaServed')}</p>
          </div>
          <nav className="flex gap-6">
            {legalLinks.map((link) => (
              <Link key={link.id} href={link.href} className="hover:text-white transition-colors">
                {t(`footer.legal.${link.id}`)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
