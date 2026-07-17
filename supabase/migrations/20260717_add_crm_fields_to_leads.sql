-- CRM-uitbreiding voor de bestaande `leads` tabel.
-- Voer dit handmatig uit in de Supabase SQL editor (er is geen Supabase CLI-project in deze repo).

do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_pipeline_status') then
    create type lead_pipeline_status as enum (
      'LEAD_RECEIVED',
      'AUDIT_PHASE',
      'CONSULTATION',
      'PROPOSAL_SENT',
      'PROJECT_ACTIVE',
      'CLOSED'
    );
  end if;
end $$;

alter table leads
  add column if not exists company text,
  add column if not exists pipeline_status lead_pipeline_status not null default 'LEAD_RECEIVED',
  add column if not exists last_interaction timestamptz not null default now(),
  add column if not exists ai_notes text,
  add column if not exists ai_summary text;

-- last_interaction automatisch bijwerken zodra een lead wordt gewijzigd (status, notities, etc.)
create or replace function set_leads_last_interaction()
returns trigger as $$
begin
  new.last_interaction = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_leads_last_interaction on leads;
create trigger trg_leads_last_interaction
before update on leads
for each row execute function set_leads_last_interaction();
