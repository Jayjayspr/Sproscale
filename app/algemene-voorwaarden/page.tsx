import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | SPROSCALE',
  description: 'Lees de algemene voorwaarden van SPROSCALE voor het gebruik van onze diensten.',
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-32 pb-24 font-sans text-stone-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-stone-900 mb-8">
          Algemene Voorwaarden
        </h1>

        <div className="prose prose-stone prose-lg max-w-none font-light leading-relaxed text-stone-600">
          <p className="text-sm text-stone-500 mb-12">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}</p>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">1. Definities</h2>
            <p className="mb-4">
              In deze algemene voorwaarden worden de volgende begrippen gehanteerd:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-stone-900 font-medium">SPROSCALE:</strong> de besloten vennootschap SPROSCALE, ingeschreven bij de Kamer van Koophandel, gevestigd in Nederland.</li>
              <li><strong className="text-stone-900 font-medium">Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met SPROSCALE.</li>
              <li><strong className="text-stone-900 font-medium">Diensten:</strong> alle door SPROSCALE aangeboden werkzaamheden, waaronder maar niet beperkt tot consultancy, webdevelopment, marketing en AI-automatiseringen.</li>
              <li><strong className="text-stone-900 font-medium">Overeenkomst:</strong> iedere schriftelijke of digitale afspraak tussen SPROSCALE en de opdrachtgever.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">2. Toepasselijkheid</h2>
            <p className="mb-4">
              Deze algemene voorwaarden zijn van toepassing op alle offertes, aanbiedingen en overeenkomsten tussen SPROSCALE en opdrachtgever, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.
            </p>
            <p className="mb-4">
              Eventuele inkoop- of andere voorwaarden van de opdrachtgever worden uitdrukkelijk van de hand gewezen, tenzij SPROSCALE deze schriftelijk heeft aanvaard.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">3. Offertes en totstandkoming overeenkomst</h2>
            <p className="mb-4">
              Alle offertes van SPROSCALE zijn vrijblijvend en geldig gedurende 30 dagen na dagtekening, tenzij anders vermeld. Een overeenkomst komt tot stand op het moment dat SPROSCALE een schriftelijke of digitale bevestiging heeft gestuurd, dan wel een begin heeft gemaakt met de uitvoering van de werkzaamheden.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">4. Uitvoering van de diensten</h2>
            <p className="mb-4">
              SPROSCALE zal de diensten naar beste inzicht en vermogen uitvoeren, overeenkomstig de eisen van goed vakmanschap. SPROSCALE heeft een inspanningsverplichting, geen resultaatverplichting, tenzij uitdrukkelijk een resultaat schriftelijk is overeengekomen.
            </p>
            <p className="mb-4">
              Opdrachtgever is verplicht alle informatie en medewerking te verstrekken die SPROSCALE redelijkerwijs nodig heeft voor een correcte uitvoering van de opdracht. Vertraging als gevolg van het niet tijdig aanleveren van informatie is voor rekening en risico van de opdrachtgever.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">5. Tarieven en betaling</h2>
            <p className="mb-4">
              Alle tarieven zijn exclusief btw, tenzij uitdrukkelijk anders vermeld. Facturering vindt plaats conform de overeengekomen betalingstermijnen. De standaard betalingstermijn bedraagt 14 dagen na factuurdatum.
            </p>
            <p className="mb-4">
              Bij niet-tijdige betaling is de opdrachtgever van rechtswege in verzuim en is SPROSCALE gerechtigd de werkzaamheden op te schorten totdat volledige betaling heeft plaatsgevonden. Over het openstaande bedrag is de wettelijke handelsrente verschuldigd.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">6. Intellectueel eigendom</h2>
            <p className="mb-4">
              Alle door SPROSCALE ontwikkelde werken, waaronder websites, software, content, ontwerpen en AI-systemen, zijn en blijven eigendom van de opdrachtgever zodra volledige betaling heeft plaatsgevonden, tenzij uitdrukkelijk schriftelijk anders overeengekomen.
            </p>
            <p className="mb-4">
              SPROSCALE behoudt het recht de ontwikkelde werken te gebruiken voor promotionele doeleinden (zoals portfolio), tenzij de opdrachtgever hier schriftelijk bezwaar tegen maakt.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">7. Geheimhouding</h2>
            <p className="mb-4">
              Beide partijen verplichten zich tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar ontvangen. Informatie geldt als vertrouwelijk als dit door de andere partij is medegedeeld of als dit uit de aard van de informatie voortvloeit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">8. Aansprakelijkheid</h2>
            <p className="mb-4">
              De aansprakelijkheid van SPROSCALE is beperkt tot het bedrag dat door de opdrachtgever in de betreffende opdracht is betaald, met een maximum van het bedrag dat door de aansprakelijkheidsverzekering van SPROSCALE wordt uitbetaald.
            </p>
            <p className="mb-4">
              SPROSCALE is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">9. Opzegging en ontbinding</h2>
            <p className="mb-4">
              Opdrachtgever kan de overeenkomst te allen tijde schriftelijk opzeggen met inachtneming van een opzegtermijn van 30 dagen. Reeds verrichte werkzaamheden worden gefactureerd op basis van de werkelijk bestede uren of het overeengekomen tarief.
            </p>
            <p className="mb-4">
              SPROSCALE is gerechtigd de overeenkomst te ontbinden indien de opdrachtgever zijn verplichtingen niet nakomt, surséance van betaling of faillissement aanvraagt.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">10. Toepasselijk recht en geschillen</h2>
            <p className="mb-4">
              Op alle overeenkomsten tussen SPROSCALE en opdrachtgever is Nederlands recht van toepassing. Geschillen worden bij voorkeur in onderling overleg opgelost. Indien dit niet mogelijk is, worden geschillen voorgelegd aan de bevoegde rechter in het arrondissement waar SPROSCALE is gevestigd.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">11. Contact</h2>
            <p className="mb-4">
              Heeft u vragen over deze algemene voorwaarden? Neem dan contact op via de contactgegevens op onze website of stuur een e-mail naar info@sproscale.nl.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
