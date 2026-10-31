"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import MeshGradientBackground from './MeshGradientBackground';
import { useLanguage } from '../../lib/i18n/LanguageContext';

// Tijdelijk het portret van de oprichter. Zodra de liggende bureaufoto er is,
// wordt dit een full-bleed achtergrond (tekst blijft links staan).
const HERO_PORTRAIT = '/jay_sprock.png';

export default function HeroSection() {
  const { t, tRaw } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-violet-50 via-blue-50 to-white pt-36 pb-20 md:pt-44 md:pb-28 lg:min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <MeshGradientBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 45%, transparent 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.85) 85%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Tekst links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-linear-to-r from-glow-from to-glow-to animate-pulse"></span>
            {t('hero.badge')}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-medium text-gray-900 leading-[1.08] tracking-tight mb-6 md:mb-8">
            {t('hero.titleLine1')} <br className="hidden md:block" />
            <span className="bg-linear-to-r from-glow-from to-glow-to bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>.
          </h1>

          <p className="text-base md:text-xl text-gray-600 mb-10 md:mb-12 max-w-xl leading-relaxed font-light">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
            <Link
              href="/afspraak"
              className="inline-flex justify-center items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 group shadow-lg shadow-glow-from/20 text-base sm:text-lg"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#diensten"
              className="inline-flex justify-center items-center gap-2 bg-white hover:bg-gray-50 hover:scale-105 text-gray-900 border border-gray-200 font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-base sm:text-lg"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <ul className="mt-8 md:mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {tRaw<string[]>('hero.trust').map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-glow-to" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Foto rechts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5 relative w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none"
        >
          {/* Zachte merkgloed achter de foto */}
          <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-glow-from/25 to-glow-to/25 blur-3xl" aria-hidden="true" />

          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/60 shadow-2xl shadow-stone-900/10 bg-stone-200">
            <Image
              src={HERO_PORTRAIT}
              alt={t('hero.imageAlt')}
              fill
              priority
              sizes="(max-width: 1024px) 448px, 40vw"
              className="object-cover object-[50%_15%]"
            />
          </div>

          {/* Naamkaartje: benadrukt direct contact met de maker */}
          <div className="absolute -bottom-5 left-4 sm:-left-6 bg-white/90 backdrop-blur-md border border-stone-200 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-stone-900 leading-tight">Jay Sprock</p>
              <p className="text-xs text-stone-500">{t('hero.founderRole')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
