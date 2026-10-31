"use client";

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { contactInfo } from '../lib/contact';

// Vaste actiebalk onderin op mobiel/tablet: bellen of direct een gesprek plannen.
// De footer heeft extra padding onderin zodat deze balk niets afdekt.
export default function MobileCallBar() {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-t border-stone-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={contactInfo.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white py-3 text-sm font-semibold text-stone-950"
        >
          <Phone className="w-4 h-4" />
          {t('nav.call')}
        </a>
        <Link
          href="/afspraak"
          className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-glow-from to-glow-to py-3 text-sm font-semibold text-white shadow-md"
        >
          {t('nav.ctaShort')}
        </Link>
      </div>
    </div>
  );
}
