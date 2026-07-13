"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Hero3DLoader from './Hero3DLoader';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink pt-44 pb-24 md:pt-56 md:pb-40 min-h-[90vh] flex flex-col items-center text-center">
      {/* 3D visual, full-bleed behind content. Not pointer-events-none: the
          canvas needs to receive pointer moves across the whole hero for the
          parallax glow effect. */}
      <div className="absolute inset-0">
        <Hero3DLoader />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 42%, transparent 0%, rgba(8,8,11,0.55) 38%, var(--color-ink) 68%)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-linear-to-r from-glow-from to-glow-to animate-pulse"></span>
          AI-gedreven groei
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-6 md:mb-8 [filter:drop-shadow(0_4px_24px_rgba(0,0,0,0.85))]">
          Versnel uw bedrijfsgroei met <br className="hidden md:block" />
          <span className="bg-linear-to-r from-glow-from to-glow-to bg-clip-text text-transparent">AI-automatisering</span>.
        </h1>

        <p className="text-base md:text-xl text-stone-400 mb-10 md:mb-12 max-w-2xl leading-relaxed font-light px-4 md:px-0">
          Wij bouwen de AI-systemen, websites en marketinginfrastructuur die uw bedrijf structureel laten opschalen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <Link
            href="/afspraak"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 hover:scale-105 text-white font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 group shadow-lg shadow-glow-from/20 text-base sm:text-lg"
          >
            Plan een kennismaking
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#diensten"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 hover:scale-105 text-white border border-white/15 font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-base sm:text-lg backdrop-blur-sm"
          >
            Bekijk diensten
          </a>
        </div>
      </motion.div>
    </section>
  );
}
