import React from 'react';
import { ArrowLeft, ArrowRight, Quote, Smartphone, MousePointer, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Waarom jouw AI-chatbot klanten wegjaagt op mobiel',
  description: 'Een AI-chatbot zonder mobiele UX kost je conversies. Leer hoe het jumping keyboard probleem bezoekers wegjaagt en hoe mobile-first design dit oplost.',
  keywords: ['AI chatbot mobiel', 'chatbot UX', 'mobiele website optimalisatie', 'chatbot conversie', 'mobile-first design'],
  alternates: { canonical: 'https://sproscale.com/insights/mobiele-chatbot-ux' },
  openGraph: {
    title: 'Waarom jouw AI-chatbot klanten wegjaagt op mobiel',
    description: 'Het jumping keyboard probleem kost je dagelijks leads. Zo lost Sproscale dit op met mobile-first design.',
    url: 'https://sproscale.com/insights/mobiele-chatbot-ux',
    type: 'article',
    publishedTime: '2026-05-03',
    authors: ['Jay van Sproscale'],
    images: [{ url: '/images/insights/mobiele-chatbot-ux.webp.png', width: 1200, height: 630 }],
  },
};

export default function MobieleCharacterUXInsight() {
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
              Insights • UX & AI
            </div>
            <span className="text-xs text-stone-400 font-light">3 Mei 2026 · 4 min leestijd</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-stone-900 mb-8">
            De onzichtbare drempel: Waarom jouw chatbot klanten wegjaagt
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed font-light italic border-l-2 border-stone-200 pl-6">
            Een AI-chatbot die het toetsenbord laat opspringen voordat de gebruiker ook maar één woord heeft gelezen, is geen tool — het is een obstakel.
          </p>
        </header>

        {/* Hero visual */}
        <div className="w-full aspect-[21/9] rounded-[2rem] mb-16 border border-stone-100 relative overflow-hidden shadow-xl bg-stone-100">
          <Image
            src="/images/insights/mobiele-chatbot-ux.webp.png"
            alt="Mobiele chatbot UX illustratie"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-stone prose-lg max-w-none">

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Het probleem dat niemand bespreekt</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Stel: een potentiële klant bezoekt jouw website op zijn telefoon. Hij scrolt langs je diensten en ziet rechtsonder een chatknop. Interesse. Hij tikt erop.
            En dan springt het toetsenbord omhoog. Niet omdat hij wil typen — gewoon omdat de chatbot dat besloten heeft. De welkomstboodschap? Weggedrukt. De helft van het chatvenster? Onzichtbaar. De gebruiker? Weg.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Dit is geen randgeval. Dit is wat er dagelijks gebeurt op tientallen websites van MKB-bedrijven die wél in AI hebben geïnvesteerd, maar niet hebben nagedacht over hoe die AI <em>aankomt</em> bij hun klant.
          </p>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De illusie van &apos;even een chatbot erbij zetten&apos;</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            De meeste chatbot-implementaties zijn gebouwd vanuit een bureaustoel, niet vanuit de vingers van een gebruiker op een telefoon. Het gevolg: bots die technisch werken, maar gebruikers frustreren. En een gefrustreerde gebruiker converteert niet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
            {[
              { icon: <Smartphone className="w-5 h-5" />, title: 'Autofocus op mobiel', text: 'Toetsenbord springt omhoog vóór de gebruiker iets heeft gelezen.' },
              { icon: <MousePointer className="w-5 h-5" />, title: 'Geen scroll-management', text: 'Gebruiker moet zelf omlaag scrollen om het antwoord te zien.' },
              { icon: <Zap className="w-5 h-5" />, title: 'Geen laad-feedback', text: 'Bot reageert na stilte — heeft hij het wel ontvangen?' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center mb-3 text-stone-600">{item.icon}</div>
                <h4 className="font-semibold text-stone-900 text-sm mb-1">{item.title}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">Wat de mobiele gebruiker écht verwacht</h2>
          <p className="text-stone-700 leading-relaxed mb-8">
            Mobiele gebruikers zijn geen geduldige lezers. Ze scannen, tikken, verwachten directe feedback en haken af bij de minste wrijving. Wanneer iemand op jouw chatknop tikt, verwacht hij een vriendelijke begroeting die hij kan <strong>lezen</strong>, een vertrouwde interface, en de ruimte om zelf te beslissen wanneer hij begint te typen.
          </p>
          <p className="text-stone-700 leading-relaxed mb-8">
            Het moment dat je die verwachting doorbreekt, is het moment dat je hem verliest.
          </p>

          {/* Quote */}
          <div className="relative my-16 p-10 bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden group">
            <Quote className="absolute -top-4 -left-4 w-24 h-24 text-stone-50 opacity-50 transition-transform group-hover:scale-110 duration-700" />
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif italic text-stone-800 leading-snug">
              &quot;Een slechte chatbot-ervaring doet meer dan de gebruiker wegjagen — het beschadigt je merk.&quot;
            </blockquote>
            <div className="mt-6 w-12 h-1 bg-stone-900 rounded-full"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-12 mb-6 tracking-tight">De Sproscale visie: automatisering moet wrijving wegnemen</h2>
          <p className="text-stone-700 leading-relaxed mb-6">
            Bij Sproscale bouwen we chatbots mobile-first. Concreet betekent dat:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-stone-700 mb-12">
            <li className="text-base font-light"><strong>Geen autofocus op mobiel.</strong> We detecteren via code of iemand een muis of touchscreen gebruikt. Op touchscreen opent de chat rustig — de gebruiker leest eerst, typt als hij klaar is.</li>
            <li className="text-base font-light"><strong>Scroll-management.</strong> Na elk nieuw bericht scrollt het venster automatisch mee. Geen handmatig omlaag scrollen.</li>
            <li className="text-base font-light"><strong>Visuele feedback.</strong> Een subtiele laadspinner geeft aan dat de bot aan het &apos;denken&apos; is. Geen stilte, geen twijfel.</li>
          </ol>

          <p className="text-stone-700 leading-relaxed mb-8">
            Dit klinkt als details. Dat zijn het ook. Maar het zijn precies de details die het verschil maken tussen een chatbot die converteert en één die irriteert.
          </p>
        </div>

        {/* CTA */}
        <section className="mt-24 pt-16 border-t border-stone-200">
          <div className="bg-stone-900 p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -ml-20 -mb-20 transition-transform group-hover:scale-125 duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 tracking-tight leading-tight">Is jouw website klaar voor mobiele bezoekers?</h3>
              <p className="mb-10 text-stone-400 font-light text-lg max-w-lg mx-auto">Wij doen een gratis scan van je chatbot, formulieren en mobiele UX. Geen verkooppraatje — gewoon een eerlijk rapport.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-stone-900 px-10 py-5 rounded-full font-semibold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Vraag een gratis scan aan
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
