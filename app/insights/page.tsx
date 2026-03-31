'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const insights = [
  {
    id: 1,
    title: "Waarom AI-automatisering de 'Unfair Advantage' is voor Groeiende Bedrijven in 2026",
    excerpt: "Stel je voor: een medewerker die nooit slaapt, geen fouten maakt en exact weet wat je klanten nodig hebben. Ontdek hoe AI de ruggengraat van je business wordt.",
    href: "/insights/ai-automatisering",
    date: "30 Maart 2026",
    image: "/images/insights/ai-automatisering-growth.webp",
    alt: "Abstracte visualisatie van AI-gedreven groei"
  },
  {
    id: 2,
    title: "De Psychologie van Conversie: Waarom je Marketing in 2026 faalt zonder Emotie",
    excerpt: "Veel bedrijven maken de fout om alleen op functies en specs te focussen. Leer hoe je psychologische principes combineert met automatisering voor maximale groei.",
    href: "/insights/marketing-psychologie",
    date: "31 Maart 2026",
    image: "/images/insights/marketing-psychologie-conversie.webp",
    alt: "De balans tussen data en emotie in conversie"
  }
];

export default function InsightsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-stone-900"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Kennisbank</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.05] tracking-tight text-stone-900 mb-8">
            Insights <span className="text-stone-400 italic">& Deep Dives.</span>
          </h1>
          <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
            Wij delen onze visie op de digitale transformatie. Ontdek hoe u techniek en AI kunt inzetten om een onverslaanbare groeimachine te bouwen.
          </p>
        </motion.div>
      </section>

      {/* Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((article) => (
            <motion.div
              key={article.id}
              {...fadeInUp}
              className="group bg-white rounded-3xl p-8 border border-stone-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6 bg-stone-100">
                <Image
                  src={article.image}
                  alt={article.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-7xl): 50vw, 33vw"
                />
              </div>

              <div className="flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block">{article.date}</span>
                <h3 className="text-2xl font-serif text-stone-900 mb-4 leading-tight group-hover:text-stone-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-stone-600 font-light leading-relaxed mb-8 text-sm md:text-base">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center mt-auto">
                <Link href={article.href} className="inline-flex items-center gap-2 text-stone-900 font-bold text-sm group/link">
                  Lees meer
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
