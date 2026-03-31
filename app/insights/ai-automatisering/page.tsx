import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-automatisering: De Unfair Advantage in 2026 | Sproscale Insights',
  description: 'Leer hoe Sproscale AI-automatisering inzet voor hyper-growth, van geautomatiseerde leadgen tot operationele efficiëntie.',
};

export default function AIAutomationInsight() {
  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest mb-8">
            Insights • AI & Automatisering
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            Waarom AI-automatisering de &apos;Unfair Advantage&apos; is voor Groeiende Bedrijven in 2026
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            Stel je voor: een medewerker die nooit slaapt, geen fouten maakt en exact weet wat je klanten nodig hebben. Dat is de belofte van AI-automatisering.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">
          <p className="text-lg text-stone-700 leading-relaxed mb-8">
            In 2026 is AI veranderd van een experiment naar de ruggengraat van moderne bedrijfsvoering. Bij <strong>Sproscale</strong> zien we drie gebieden waar AI-automatisering het verschil maakt tussen overleven en domineren:
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">1. Hyper-gepersonaliseerde Outreach</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            AI analyseert nu websites van leads en schrijft openingszinnen die zó specifiek zijn, dat ze niet van menselijk te onderscheiden zijn. Geen koude acquisitie meer, maar warme connecties op schaal.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">2. De 24/7 Intelligent Agent</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Klanten verwachten direct antwoord. Onze AI-agenten beantwoorden complexe vragen en plannen afspraken in je agenda terwijl jij je focust op de strategie.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">3. Operationele Efficiëntie</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Van automatische facturatie in Moneybird tot het omzetten van meetings in actiepunten in Trello. We kopen tijd terug door de randzaken te elimineren.
          </p>

          {/* Styled Quote Block */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;De vraag is niet óf AI je werk gaat veranderen, maar hoe snel jij AI leert gebruiken om je werk beter te doen.&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Strategische Implementatie</h2>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12 uppercase tracking-wide font-medium text-xs">
            <li className="text-base font-light"><strong>Identificeer frictie:</strong> Welke repetitieve taak remt je groei?</li>
            <li className="text-base font-light"><strong>Bouw de basis:</strong> Integreer CRM met automatiseringstools.</li>
            <li className="text-base font-light"><strong>Schaal op:</strong> Optimaliseer en herhaal.</li>
          </ol>
        </div>

        {/* Footer / CTA Section */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            {/* Abstract background blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">Klaar voor de volgende stap?</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">Ontdek hoe wij deze systemen voor jouw business bouwen.</p>
              <Link
                href="/afspraak"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Plan een Insights Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
