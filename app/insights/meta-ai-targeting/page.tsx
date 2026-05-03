import React from 'react';
import { ArrowLeft, ArrowRight, Quote, TrendingUp, Target, Database } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stoppen met Targeten: Waarom Meta\'s AI in 2026 beter verkoopt dan jouw beste Marketeer | Sproscale',
  description: 'Handmatige interesse-targeting is dood. In 2026 wint wie de AI van Meta voedt met de juiste data en creaties. Dit is hoe je dat doet.',
};

export default function MetaAITargetingInsight() {
  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Terug naar Insights
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest">
              Insights • Marketing & AI
            </div>
            <span className="text-xs text-stone-400 font-light">3 Mei 2026 · 6 min leestijd</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            Stoppen met Targeten: Waarom Meta&apos;s AI in 2026 beter verkoopt dan jouw beste Marketeer
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            Handmatige interesse-targeting is achterhaald. Wie nu niet automatiseert, betaalt in 2026 de hoofdprijs per klik.
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/meta-ai-targeting.webp.png.png"
            alt="Meta AI targeting visualisatie"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De dood van de interesse-targeting</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Er was een tijd dat je als adverteerder op Meta precies kon aangeven wie je wilde bereiken. Mannen, 35–50, geïnteresseerd in &apos;tuinieren&apos;, wonend in Noord-Brabant. Je bouwde je doelgroep op als een puzzel. Je was de strateeg. Het algoritme was de postbode.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Die tijd is voorbij. Adverteerders die bleven vertrouwen op gedetailleerde interesse-targeting zagen hun kosten per lead stijgen terwijl hun bereik daalde. Ondertussen boekten degenen die overstapten op <strong>Broad Targeting</strong> — geen interesses, geen enge demografieën — consistent betere resultaten. Meer volume, lagere CPM, hogere ROAS.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Het algoritme als je nieuwe media manager</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Het algoritme van Meta beschikt over informatie die geen enkele menselijke marketeer ooit zal hebben. Het weet wie er gisteravond om 23:14 een vergelijkbaar product heeft bekeken. Het weet wie er over twee weken klaar is om te kopen, nog voordat die persoon het zelf weet.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Elke handmatige beperking die je aanbrengt — een leeftijdsgrens hier, een interessecategorie daar — is een kooi die je om het algoritme bouwt. <strong>Broad Targeting is het tegenovergestelde van lui adverteren. Het is het intelligentste wat je kunt doen.</strong>
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Waarom creatie de nieuwe targeting is</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Als demografieën niet meer de variabele zijn, wat dan wel? De creatie. In 2026 is je advertentie niet langer een boodschap aan een doelgroep — het is een signaal aan het algoritme.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {[
              { icon: <Target className="w-5 h-5" />, title: 'Variatie is brandstof', text: 'Meerdere creaties geven het algoritme meer signalen. Één advertentie is een gok. Zes is een leerstrategie.' },
              { icon: <TrendingUp className="w-5 h-5" />, title: 'De eerste 3 seconden', text: 'Een directe openingszin vertelt het algoritme meteen wie jouw klant is.' },
              { icon: <Database className="w-5 h-5" />, title: 'Authenticiteit wint', text: 'Het algoritme meet reactie, geen esthetiek. Eerlijk converteert beter dan gepolijst.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;Algoritmische efficiëntie is simpelweg de vraag of jouw systemen slimmer werken dan die van je concurrent.&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De Sproscale strategie: de AI voeden, niet besturen</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Automatisering werkt alleen zo goed als de data die je erin stopt. Bij Sproscale bouwen we het systeem eromheen:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            <li className="text-base font-light"><strong>CRM-koppeling via Conversions API.</strong> Elke gewonnen klant gaat terug naar het algoritme als positief signaal. Meta leert wie er daadwerkelijk koopt — niet alleen wie er klikt.</li>
            <li className="text-base font-light"><strong>Creatie-roulatie op autopiloot.</strong> Nieuwe advertentievariaties worden automatisch aangeboden zodra bestaande ads verzadigen. De leercurve blijft actief.</li>
            <li className="text-base font-light"><strong>Signaalversterking via first-party data.</strong> E-maillijsten, websitebezoekers, video-kijkers — allemaal aangeboden als calibratie-input voor het algoritme.</li>
          </ol>

          <p className="text-stone-700 leading-relaxed mb-8">
            Het resultaat is een <strong>Groeimachine</strong>: een systeem dat zichzelf optimaliseert, elke dag een klein beetje slimmer wordt, en de ROAS structureel verhoogt zonder dat er een marketeer handmatig knoppen hoeft te draaien.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Wie niet automatiseert, betaalt de hoofdprijs</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Grote merken met uitgebreide datastructuren en professionele creatieteams geven het algoritme elke dag meer om mee te werken. Hun systemen leren sneller. Hun kosten per acquisitie dalen terwijl die van hun concurrenten stijgen. Voor MKB-bedrijven betekent dit dat handmatig adverteren steeds duurder wordt — niet als straf, maar als de prijs van stilstaan terwijl de markt vooruitloopt.
          </p>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">Klaar om jouw advertentiesysteem te laten groeien?</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">Wij analyseren jouw huidige Meta-setup en laten zien waar je geld verliest. Gratis, zonder verkooppraatje.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Vraag een gratis analyse aan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
