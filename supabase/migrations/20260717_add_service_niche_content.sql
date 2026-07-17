-- Dienst-centrische content-architectuur: per (service, niche) combinatie kun je
-- optioneel unieke tekst-overrides, reviews en cases toevoegen. Zonder override valt
-- een niche-pagina terug op de generieke hub-content (code) — en blijft 'noindex'
-- totdat er hier echte content voor die combinatie staat.
--
-- Beheer: rechtstreeks via de Supabase Table Editor. Geen adminscherm nodig — voeg een
-- rij toe en de bijbehorende /diensten/[dienst]/[niche] pagina activeert automatisch.
--
-- Voer dit handmatig uit in de Supabase SQL Editor.

create table if not exists service_niche_content (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  niche_slug text not null,
  intro_override text,     -- vervangt de generieke intro-alinea voor deze combinatie
  problem_override text,   -- vervangt de generieke 'waarom'-sectie
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_slug, niche_slug)
);

create table if not exists service_niche_reviews (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  niche_slug text not null,
  author_name text not null,
  company text,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists service_niche_cases (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  niche_slug text not null,
  title text not null,
  description text not null,
  result_stat text,        -- bv. "+40% meer aanvragen"
  image_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_sn_content_lookup on service_niche_content (service_slug, niche_slug);
create index if not exists idx_sn_reviews_lookup on service_niche_reviews (service_slug, niche_slug);
create index if not exists idx_sn_cases_lookup on service_niche_cases (service_slug, niche_slug);

-- Publieke, alleen-lezen content: RLS aan, met een open SELECT-policy voor iedereen.
-- Er zijn bewust geen insert/update/delete-policies voor de anon-rol — content
-- wijzigen kan alleen via de Supabase Table Editor (project-eigenaar), niet via de site.
alter table service_niche_content enable row level security;
alter table service_niche_reviews enable row level security;
alter table service_niche_cases enable row level security;

drop policy if exists "Public read service_niche_content" on service_niche_content;
create policy "Public read service_niche_content" on service_niche_content for select using (true);

drop policy if exists "Public read service_niche_reviews" on service_niche_reviews;
create policy "Public read service_niche_reviews" on service_niche_reviews for select using (true);

drop policy if exists "Public read service_niche_cases" on service_niche_cases;
create policy "Public read service_niche_cases" on service_niche_cases for select using (true);

-- Lead-herkomst: welke dienst/niche-pagina leverde deze lead op (voor het
-- geïntegreerde leadformulier op de nieuwe /diensten/*-pagina's).
alter table leads
  add column if not exists source_service text,
  add column if not exists source_niche text;
