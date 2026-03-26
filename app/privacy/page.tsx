import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy- & Cookiebeleid | SPROSCALE',
  description: 'Lees meer over hoe wij omgaan met uw privacy en welke cookies wij gebruiken.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-8">
          Privacy- & Cookiebeleid
        </h1>
        
        <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-stone-600">
          <p className="text-sm text-stone-500 mb-12">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}</p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">1. Inleiding</h2>
            <p className="mb-4">
              Bij SPROSCALE hechten wij grote waarde aan uw privacy. In dit privacy- en cookiebeleid leggen wij uit welke persoonsgegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft. Wij verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">2. Gegevens die wij verzamelen</h2>
            <p className="mb-4">
              Wij verzamelen gegevens die u vrijwillig aan ons verstrekt, bijvoorbeeld wanneer u contact met ons opneemt via het formulier op onze website of wanneer u een strategiegesprek plant. Dit omvat onder andere:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Uw voor- en achternaam</li>
              <li>Zakelijk e-mailadres</li>
              <li>Bedrijfsnaam</li>
              <li>Inhoud van uw bericht of uitdaging</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">3. Cookiebeleid</h2>
            <p className="mb-4">
              Onze website maakt gebruik van cookies en vergelijkbare technologieën om de functionaliteit en prestaties van de website te verbeteren, en om u een optimale gebruikerservaring te bieden.
            </p>
            
            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">Wat zijn cookies?</h3>
            <p className="mb-4">
              Cookies zijn kleine tekstbestanden die op uw apparaat (computer, tablet, smartphone) worden geplaatst wanneer u onze website bezoekt. Ze zorgen ervoor dat de website goed werkt en onthouden uw voorkeuren.
            </p>
            
            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">Welke cookies gebruiken wij?</h3>
            <ul className="list-disc pl-6 space-y-4 mb-4">
              <li>
                <strong className="text-stone-900 font-medium">Noodzakelijke cookies:</strong> 
                <br />Deze zijn essentieel voor het correct functioneren van de website. Ze onthouden bijvoorbeeld of u de cookiebanner heeft geaccepteerd of geweigerd (zoals de <code>cookieConsent</code> cookie). Voor deze cookies is geen toestemming vereist.
              </li>
              <li>
                <strong className="text-stone-900 font-medium">Analytische cookies:</strong> 
                <br />Wij gebruiken deze cookies om inzicht te krijgen in hoe bezoekers onze website gebruiken (bijv. via Google Analytics of vergelijkbare tools), zodat we de gebruikerservaring kunnen optimaliseren. Deze gegevens worden zoveel mogelijk geanonimiseerd verwerkt.
              </li>
              <li>
                <strong className="text-stone-900 font-medium">Marketing cookies:</strong> 
                <br />Deze cookies worden gebruikt om bezoekers over verschillende websites te volgen, met als doel advertenties te tonen die relevant en boeiend zijn voor de individuele gebruiker. Deze worden alleen geplaatst als u hiervoor toestemming geeft.
              </li>
            </ul>

            <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">Cookies beheren of verwijderen</h3>
            <p className="mb-4">
              U kunt uw browser zo instellen dat cookies worden geweigerd of dat u een waarschuwing krijgt wanneer er cookies worden geplaatst. Houd er rekening mee dat sommige delen van de website mogelijk niet correct functioneren als u cookies weigert.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">4. Uw rechten</h2>
            <p className="mb-4">
              Onder de AVG heeft u diverse rechten met betrekking tot uw persoonsgegevens:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Recht op inzage:</strong> U mag ons vragen welke persoonsgegevens wij van u verwerken.</li>
              <li><strong>Recht op rectificatie:</strong> Kloppen uw gegevens niet? Dan kunt u ons vragen deze te wijzigen.</li>
              <li><strong>Recht op verwijdering:</strong> U kunt ons vragen uw persoonsgegevens te verwijderen (het 'recht om vergeten te worden').</li>
              <li><strong>Recht op bezwaar:</strong> U kunt bezwaar maken tegen het gebruik van uw gegevens.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">5. Contact</h2>
            <p className="mb-4">
              Heeft u vragen over ons privacy- of cookiebeleid, of wilt u gebruikmaken van uw rechten? Neem dan contact met ons op via de contactgegevens op onze website of stuur een e-mail naar info@sproscale.nl.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
