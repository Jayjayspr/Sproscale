import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { verifyAdminRequest } from '../../../lib/verifyAdminRequest';

const PIPELINE_STATUSES = [
  'LEAD_RECEIVED',
  'AUDIT_PHASE',
  'CONSULTATION',
  'PROPOSAL_SENT',
  'PROJECT_ACTIVE',
  'CLOSED',
];

// Filtert bekende test-/crawl-inzendingen (bijv. Playwright visual-regression
// runs die het publieke contactformulier automatisch invullen) uit het CRM-overzicht.
const TEST_PATTERNS = [/@example\.com$/i, /playwright/i, /verbindingstest/i];

function isTestLead(lead: { name?: string | null; email?: string | null }) {
  return TEST_PATTERNS.some((pattern) => pattern.test(lead.name ?? '') || pattern.test(lead.email ?? ''));
}

export async function GET(request: Request) {
  const user = await verifyAdminRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Serverconfiguratie ontbreekt' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const view = searchParams.get('view'); // 'archived' toont gearchiveerde leads, anders alleen actieve

  if (id) {
    const { data, error } = await supabaseAdmin.from('leads').select('*').eq('id', id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ lead: data });
  }

  let query = supabaseAdmin.from('leads').select('*');
  query = view === 'archived' ? query.not('archived_at', 'is', null) : query.is('archived_at', null);

  const { data, error } = await query.order(
    view === 'archived' ? 'archived_at' : 'last_interaction',
    { ascending: false }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // De test-/crawl-filter is alleen relevant voor de actieve pipeline — in het
  // archief mag je ook gearchiveerde testleads terugzien als je dat wilt.
  const leads = view === 'archived' ? (data ?? []) : (data ?? []).filter((lead) => !isTestLead(lead));
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const user = await verifyAdminRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Serverconfiguratie ontbreekt' }, { status: 500 });
  }

  const body = await request.json();
  const { name, email, company, message, pipeline_status, ai_notes } = body;

  if (!name || !email) {
    return NextResponse.json({ error: 'name en email zijn verplicht' }, { status: 400 });
  }

  if (pipeline_status && !PIPELINE_STATUSES.includes(pipeline_status)) {
    return NextResponse.json({ error: 'Ongeldige pipeline_status' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert([{
      name,
      email,
      company: company ?? null,
      message: message ?? null,
      pipeline_status: pipeline_status ?? 'LEAD_RECEIVED',
      ai_notes: ai_notes ?? null,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const user = await verifyAdminRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Serverconfiguratie ontbreekt' }, { status: 500 });
  }

  const body = await request.json();
  const { id, pipeline_status, ai_notes, name, email, company, archived_at } = body;

  if (!id) return NextResponse.json({ error: 'id is verplicht' }, { status: 400 });

  if (pipeline_status && !PIPELINE_STATUSES.includes(pipeline_status)) {
    return NextResponse.json({ error: 'Ongeldige pipeline_status' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (pipeline_status !== undefined) updates.pipeline_status = pipeline_status;
  if (ai_notes !== undefined) updates.ai_notes = ai_notes;
  if (name !== undefined) updates.name = name;
  if (email !== undefined) updates.email = email;
  if (company !== undefined) updates.company = company;
  if (archived_at !== undefined) updates.archived_at = archived_at; // ISO-string om te archiveren, null om te herstellen

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Geen velden om bij te werken' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}
