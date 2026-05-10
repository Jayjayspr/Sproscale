import React from 'react';
import { ArrowLeft, ArrowRight, Quote, Zap, TrendingDown, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waarom jouw WordPress site klanten kost (en wat Vercel-snelheid oplevert)',
  description: 'Een trage WordPress site kost je dagelijks leads. Ontdek waarom vakbedrijven overstappen naar Next.js op Vercel en wat website snelheid concreet oplevert aan omzet.',
  keywords: ['website snelheid vakbedrijven', 'WordPress vs Next.js', 'Vercel hosting Nederland', 'snelle website MKB', 'website laten maken Eindhoven', 'Core Web Vitals'],
  alternates: { canonical: 'https://sproscale.com/insights/wordpress-vs-vercel' },
  openGraph: {
    title: 'Waarom jouw WordPress site klanten kost (en wat Vercel-snelheid oplevert)',
    description: 'Een trage site kost je dagelijks leads. Zo helpt Sproscale vakbedrijven overstappen naar razendsnel Next.js.',
    url: 'https://sproscale.com/insights/wordpress-vs-vercel',
    type: 'article',
    publishedTime: '2026-05-04',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/wordpress-vs-vercel.png', width: 1200, height: 630 }],
  },
};

export default function WordpressVsVercelInsight() {
  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/insights" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Terug naar Insights
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest">
              Insights • Web & Performance
            </div>
            <span className="text-xs text-stone-400 font-light">4 Mei 2026 · 5 min leestijd</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            Waarom jouw WordPress site in 2026 klanten kost (en wat Vercel-snelheid oplevert)
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            53% van de mobiele bezoekers verlaat een pagina die langer dan 3 seconden laadt. Jouw concurrent laadt in 0,8 seconden. Reken maar uit.
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/wordpress-vs-vercel.png"
            alt="Website snelheid WordPress vs Vercel visualisatie"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De digitale brochure die niemand leest</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Stel: een potentiële klant zoekt op Google naar een hovenier in zijn regio. Hij klikt op jouw link. De pagina laadt. En laadt. Drie seconden gaan voorbij. Hij drukt op de terugknop en klikt op de concurrent.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Dit is geen hypothetisch scenario — <strong>Google-onderzoek toont aan dat 53% van de mobiele bezoekers afhaakt bij een laadtijd boven de 3 seconden.</strong> De gemiddelde WordPress-site in Nederland laadt in 4,2 seconden. De gemiddelde Next.js-site op Vercel: onder de 1 seconde.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Voor een vakbedrijf met 200 websitebezoekers per maand betekent dat concreet: meer dan 100 potentiële leads die je website verlaten nog voordat ze jouw diensten hebben gezien. Niet omdat je product niet goed is. Maar omdat de technologie je in de steek laat.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Wat WordPress je niet vertelt</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            WordPress werd gebouwd in 2003 — voor een internet dat niet bestond uit mobiele gebruikers, Core Web Vitals en AI-gedreven zoekalgoritmes. Het platform is sindsdien uitgegroeid tot een gelaagd systeem van plugins, databases en server-requests die elke pagina opbouwen terwijl de bezoeker wacht.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {[
              { icon: <TrendingDown className="w-5 h-5" />, title: 'Trage laadtijd', text: 'Elke plugin voegt server-requests toe. Meer plugins = langzamere site.' },
              { icon: <AlertTriangle className="w-5 h-5" />, title: 'Slechte Core Web Vitals', text: 'Google straft trage sites af in de zoekresultaten. Minder zichtbaarheid, minder leads.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Geen Edge-voordeel', text: 'WordPress draait op één server. Vercel serveert vanuit 100+ locaties wereldwijd.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Next.js en Vercel: de infrastructuur die grote merken gebruiken</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Next.js is het framework achter de websites van Airbnb, TikTok en de New York Times. Vercel is de hosting-infrastructuur die pagina&apos;s serveert vanuit Edge-locaties wereldwijd — wat betekent dat een bezoeker in Eindhoven de pagina ontvangt van een server die letterlijk om de hoek staat, niet van een datacenter in Amsterdam dat eerst nog een database moet raadplegen.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Het resultaat: <strong>laadtijden onder de 1 seconde, perfecte Core Web Vitals scores, en een Google die je site structureel hoger rankt</strong> dan de trage WordPress-concurrent naast je.
          </p>

          {/* Sproscale Perspective */}
          <div className="my-16 p-8 md:p-10 bg-stone-900 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-stone-800 rounded-full blur-[60px] opacity-60 -mr-10 -mt-10" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">Sproscale Perspectief</p>
              <h3 className="text-2xl font-serif text-white mb-4 leading-tight">Wij bouwen geen websites. Wij bouwen leadmachines.</h3>
              <p className="text-stone-300 font-light leading-relaxed mb-6">
                Elke Sproscale-website wordt gebouwd op Next.js en gedeployed op Vercel — standaard. Geen discussie over hosting, geen plugin-spaghetti, geen database-vertraging. Onze sites scoren structureel 95+ op Google PageSpeed en laden in onder de 1 seconde op mobiel.
              </p>
              <p className="text-stone-300 font-light leading-relaxed">
                Bovenop de snelheid integreren wij AI-chatwidgets die bezoekers 24/7 omzetten in leads — ook buiten kantooruren. Voor vakbedrijven die niet de hele dag achter hun telefoon kunnen zitten, is dat het verschil tussen een gemiste kans en een nieuwe klant.
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Wat snelheid concreet oplevert</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Snelheid is geen technisch hobbyisme. Het is directe omzet. Amazon berekende ooit dat elke 100 milliseconden vertraging 1% omzetverlies kostte. Voor een vakbedrijf met een gemiddelde orderwaarde van € 2.500 en 10 websiteleads per maand, betekent het verschil tussen een 4-seconden en een 1-seconden site al snel meerdere duizenden euro&apos;s per jaar.
          </p>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;Jouw website is niet je visitekaartje. Het is je beste — en meest onderbetaalde — verkoper.&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De checklist: hoe scoort jouw site?</h2>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            <li className="text-base font-light"><strong>Laadtijd op mobiel.</strong> Test op <em>pagespeed.web.dev</em>. Alles boven 2,5 seconden kost je leads.</li>
            <li className="text-base font-light"><strong>Core Web Vitals.</strong> LCP, FID en CLS zijn de drie signalen waarmee Google jouw positie bepaalt. Scoort jouw site rood? Dan rank je onder je concurrent.</li>
            <li className="text-base font-light"><strong>Mobiele conversie.</strong> Heeft jouw site een duidelijke call-to-action boven de vouw op mobiel? Zo niet, verlies je de helft van je bezoekers direct.</li>
            <li className="text-base font-light"><strong>24/7 leadcapture.</strong> Kan een bezoeker om 22:00 uur zijn vraag stellen en een reactie verwachten? Een AI-chatwidget doet dit automatisch.</li>
          </ol>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-4 font-medium">Gratis · Vrijblijvend · 15 minuten</p>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">Ontdek wat jouw website nu kost aan gemiste leads</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">Wij doen een gratis snelheidsaudit van jouw huidige site en laten zien hoeveel leads je maandelijks misloopt — inclusief een concept hoe het beter kan.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Vraag een gratis snelheidsaudit aan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
