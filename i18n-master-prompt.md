# Master-prompt: component naar i18n omzetten

Plak dit blok + de code van één component/sectie in een nieuwe Claude-sessie.

---

Je zet een React/Next.js component om naar het i18n-systeem van dit project. Lees eerst `lib/i18n/translations.ts` en `lib/i18n/LanguageContext.tsx` in de repo om de bestaande structuur en stijl te volgen — sluit aan op wat er al staat, verzin geen nieuwe helper-functies.

**Beschikbare API:**
- `const { t, tRaw } = useLanguage();` (uit `lib/i18n/LanguageContext.tsx`)
- `t('sectie.key')` → string. Gebruik voor losse teksten (headings, paragrafen, labels, button-tekst, placeholders, alt-teksten, aria-labels).
- `tRaw<TypeHier[]>('sectie.items')` → array/object. Gebruik **alleen** als de hele array puur tekst bevat (geen icons, geen React-componenten, geen hrefs).

**Regels voor arrays met niet-vertaalbare velden (icon, href, kleur, volgorde):**
- Splits het: de config (icon/href/id) blijft als plain array/object in het component staan. Alleen de tekstvelden gaan naar `translations.ts`, onder een stabiele `id` per item (nooit array-index).
- Patroon:
  ```tsx
  const cardConfig = [
    { id: 'consultancy', icon: Briefcase, href: '/contact' },
    { id: 'marketing', icon: Target, href: '/contact' },
  ];
  // render:
  {cardConfig.map(c => (
    <Card key={c.id} icon={c.icon} href={c.href}
      title={t(`services.items.${c.id}.title`)}
      desc={t(`services.items.${c.id}.desc`)}
      bullets={tRaw<string[]>(`services.items.${c.id}.bullets`)} />
  ))}
  ```
- Puur-tekst arrays (bv. FAQ q/a zonder icons) mogen wél volledig als array in `translations.ts` staan en met `tRaw<Item[]>('sectie.items')` in één keer opgehaald worden.

**Wat je moet opleveren, in deze volgorde:**

1. **Analyse** — een lijst van alle hardcoded Nederlandse strings in de component: JSX-tekst, `placeholder`, `alt`, `aria-label`, `title`-attributen, tekst in geneste arrays/objecten. Sla generieke UI-symbolen (bv. "→", cijfers, merknamen, technische labels als "Next.js") over.
2. **Voorgestelde keys** — voor elke string: een `sectie.subsectie.key` pad. Sectie = component-naam of `id` van de omliggende `<section>` in kebab/camelCase. Hergebruik bestaande secties (`nav`, `hero`, `languageSelector`, `guarantees`, `faq`) als de tekst daar logisch bij hoort — verzin geen dubbele sectie voor iets dat al bestaat.
3. **Diff voor `translations.ts`** — de nieuwe keys, in zowel `nl` als `en`, **toe te voegen** aan de bestaande structuur (niet de hele file herschrijven, alleen de nieuwe blokken tonen zodat ik ze kan plakken). Voor `en`: een normale, natuurlijke Engelse vertaling — geen letterlijke woord-voor-woordvertaling.
4. **Herschreven component** — volledige component-code met:
   - `"use client"` bovenaan als dat nog niet zo was (nodig voor `useLanguage()`),
   - `import { useLanguage } from '.../lib/i18n/LanguageContext';` (pas het relatieve pad aan op de map-diepte van dit bestand),
   - `const { t, tRaw } = useLanguage();` — laat `tRaw` weg als je hem niet gebruikt,
   - alle hardcoded strings vervangen door `t()`/`tRaw()` calls,
   - **verder niets aangepast**: geen refactors, geen herstructurering van JSX, geen andere styling-wijzigingen. Alleen tekst-extractie.

**Harde grenzen:**
- Raak geen `console.log`/foutmeldingen aan die alleen developers zien (die hoeven niet vertaald).
- Raak geen technische strings aan die geen UI-tekst zijn (API-routes, CSS-classnamen, data-attributen, env-vars).
- Als een string ambigu is (bv. een getal met eenheid, een merknaam), laat 'm staan en meld dat expliciet in de analyse in plaats van te gokken.
- Verander geen bestaande keys die al in `translations.ts` staan — alleen toevoegen.
