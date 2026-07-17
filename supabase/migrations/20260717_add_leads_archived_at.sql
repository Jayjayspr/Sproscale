-- Soft-delete ondersteuning voor leads: archiveren i.p.v. permanent verwijderen.
-- Voer dit handmatig uit in de Supabase SQL editor.

alter table leads
  add column if not exists archived_at timestamptz;

create index if not exists idx_leads_archived_at on leads (archived_at);
