"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Zap, BrainCircuit, Database, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 }
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-16 font-sans text-stone-900">
      {/* Page Hero (The Mission) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div {...fadeInUp}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-stone-900 mb-6">
            De Architectuur <br className="hidden md:block" />
            <span className="text-stone-500 italic">achter Groei.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            SPROSCALE is ontstaan vanuit een duidelijke noodzaak: de behoefte aan technisch superieure leadgeneratie en razendsnelle websites. Wij bouwen digitale ecosystemen die niet alleen visueel overtuigen, maar technisch excelleren.
          </p>
        </motion.div>
      </section>

      {/* The "Why" (Grijze Sectie) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div {...fadeInUp} className="bg-stone-100 rounded-3xl p-8 md:p-12 text-center border border-stone-200">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-6">De kloof dichten</h2>
          <p className="text-stone-600 leading-relaxed text-base md:text-lg font-light">
            Standaard marketingbureaus focussen zich vaak uitsluitend op de buitenkant. Wij focussen op de motor. Zonder een ijzersterk technisch fundament is elke marketingcampagne dweilen met de kraan open. Door high-end development te combineren met conversiegerichte strategieën, overbruggen wij de kloof tussen pure technische performance en meetbaar commercieel resultaat.
          </p>
        </motion.div>
      </section>

      {/* Core Expertise (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">Onze <span className="text-stone-500 italic">Expertise.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.7 }} className="bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-500">
                <Zap className="w-7 h-7 text-stone-900 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-3">Performance First</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Gebouwd op Next.js en Vercel. Wij garanderen razendsnelle laadtijden en een vlekkeloze gebruikerservaring die uw conversieratio direct verhogen.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.7 }} className="bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-500">
                <BrainCircuit className="w-7 h-7 text-stone-900 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-3">AI Intelligence</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Aangedreven door Gemini 1.5 Pro. We verrijken leads automatisch en implementeren slimme workflows die uw sales team wekelijks uren besparen.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3, duration: 0.7 }} className="bg-white rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-500">
                <Database className="w-7 h-7 text-stone-900 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-3">Scalable Data</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Robuuste data-architectuur met Supabase. Een veilig, betrouwbaar en schaalbaar fundament dat moeiteloos meegroeit met uw zakelijke ambities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder/Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div {...fadeInUp} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="flex flex-col md:grid md:grid-cols-2">
            {/* Image Container with Antigravity styling */}
            <div className="p-8 pb-0 md:p-0 flex items-start md:items-stretch h-full">
              <div className="relative w-[45%] aspect-square md:w-full md:aspect-auto md:h-full overflow-hidden rounded-full md:rounded-none shadow-sm md:shadow-none -translate-y-2 md:translate-y-0 bg-stone-200">
                <Image
                  src="/jay-sprock.webp"
                  alt="Jay Sprock - SPROSCALE Vision"
                  width={400}
                  height={400}
                  priority={true}
                  className="rounded-full aspect-square object-cover shadow-md transform -translate-y-2 w-32 h-32 md:w-full md:h-full md:rounded-none md:shadow-none md:transform-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 mt-4 md:mt-0">Visie op Automatisering</h2>
              <div className="space-y-6">
                <p className="text-stone-600 font-light leading-relaxed">
                  "Vakbedrijven hebben goud in handen: echte expertise en vakmanschap. Toch zien we dat ze te veel tijd en marge verliezen aan handmatig werk, verouderde systemen en inefficiënte acquisitie."
                </p>
                <p className="text-stone-600 font-light leading-relaxed">
                  "Mijn visie met SPROSCALE is simpel maar doeltreffend: we automatiseren het volledige proces van klik tot klant. Door de nieuwste webtechnologieën en AI te combineren, creëren we een schaalbare machine. Zodat u zich weer kunt focussen op waar u het beste in bent: uw vak."
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-stone-100">
                <p className="font-bold text-stone-900 mb-1">Oprichter SPROSCALE</p>
                <p className="text-sm text-stone-500 font-medium tracking-wide">Lead Architect & Strateeg</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div {...fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Klaar om uw groei te automatiseren?</h2>
          <p className="text-stone-600 font-light mb-8 max-w-2xl mx-auto">
            Ontdek wat een technische, datagedreven aanpak voor uw bedrijf kan betekenen. Plan direct een vrijblijvend strategiegesprek in.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-medium px-8 py-4 rounded-md transition-all duration-300 shadow-md text-lg group"
          >
            Plan een kennismaking
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
