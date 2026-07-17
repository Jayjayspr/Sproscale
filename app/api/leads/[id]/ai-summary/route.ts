import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getSupabaseAdmin } from '../../../../../lib/supabaseAdmin';
import { verifyAdminRequest } from '../../../../../lib/verifyAdminRequest';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await verifyAdminRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Serverconfiguratie ontbreekt' }, { status: 500 });
  }

  const { id } = await params;

  const { data: lead, error: fetchError } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !lead) {
    return NextResponse.json({ error: 'Lead niet gevonden' }, { status: 404 });
  }

  if (!lead.ai_notes || !lead.ai_notes.trim()) {
    return NextResponse.json({ error: 'Voeg eerst notities toe voordat je een samenvatting genereert.' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY ontbreekt in de serveromgeving.' }, { status: 500 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Je bent de strategisch adviseur van Sproscale, een Nederlands bureau voor AI-automatisering, web development en marketing voor groeiende MKB-bedrijven. Sproscale biedt: Website Bouwen (Next.js), Meta & Google Ads, AI Chatbot & Automatisering, en Consultancy.

Op basis van de volgende interne notities over een lead, formuleer een korte, concrete groeistrategie (max 120 woorden, in het Nederlands) die aangeeft welke Sproscale-diensten het meest relevant zijn en waarom. Schrijf direct en ondernemend, geen vage taal, geen inleidende zin.

Leadgegevens:
- Naam: ${lead.name}
- Bedrijf: ${lead.company ?? 'onbekend'}
- Pipeline status: ${lead.pipeline_status}

Notities:
"""
${lead.ai_notes}
"""`,
    });

    const summary = response.text?.trim();
    if (!summary) {
      return NextResponse.json({ error: 'Geen samenvatting ontvangen van Gemini.' }, { status: 502 });
    }

    const { data: updated, error: updateError } = await supabaseAdmin
      .from('leads')
      .update({ ai_summary: summary })
      .eq('id', id)
      .select()
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ lead: updated });
  } catch (err) {
    console.error('Gemini AI-samenvatting fout:', err);
    return NextResponse.json({ error: 'AI-samenvatting genereren mislukt.' }, { status: 500 });
  }
}
