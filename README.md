<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/31c21e38-bcfa-4c8e-860c-852d4a05a008

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the required variables in [.env.local](.env.local) — see [.env.example](.env.example) for the full list (Supabase, Resend, Gemini)
3. Run the app:
   `npm run dev`

## Admin CRM

Naast de publieke site bevat dit project een intern CRM voor leadbeheer, alleen bereikbaar voor het admin-account via `/login`.

- **`/admin`** — real-time inbox van alle inkomende leads (contactformulier)
- **`/admin/crm`** — Kanban-board om leads door de pipeline te slepen (`Lead Ontvangen` → `Audit Fase` → `Consult` → `Voorstel Verzonden` → `Project Actief` → `Afgerond`), plus een Archief-tabblad voor gearchiveerde (soft-deleted) leads
- **`/admin/crm/[id]`** — leaddetail met notities en een "Genereer AI-samenvatting"-knop die op basis van de notities een groeistrategie formuleert via Gemini

**Setup:**
1. Voeg `SUPABASE_SERVICE_ROLE_KEY` en `GEMINI_API_KEY` toe aan `.env.local` (zie [.env.example](.env.example) voor uitleg en waar je ze vindt)
2. Voer de SQL-migraties in [`supabase/migrations/`](supabase/migrations/) handmatig uit in de Supabase SQL Editor — ze breiden de bestaande `leads`-tabel uit met de CRM-velden (pipeline-status, bedrijf, notities, archivering)
3. Zorg dat er een Supabase Auth-gebruiker bestaat (Authentication → Users in het Supabase Dashboard) om mee in te loggen op `/login`
