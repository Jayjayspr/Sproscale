"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../../lib/supabase';
import { Loader2, ShieldAlert, ArrowLeft, Sparkles, Building2, Mail, Clock, Save, Archive, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

type PipelineStatus = 'LEAD_RECEIVED' | 'AUDIT_PHASE' | 'CONSULTATION' | 'PROPOSAL_SENT' | 'PROJECT_ACTIVE' | 'CLOSED';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  pipeline_status: PipelineStatus;
  last_interaction: string;
  ai_notes: string | null;
  ai_summary: string | null;
  archived_at: string | null;
  created_at: string;
}

const STATUS_OPTIONS: { status: PipelineStatus; label: string }[] = [
  { status: 'LEAD_RECEIVED', label: 'Lead Ontvangen' },
  { status: 'AUDIT_PHASE', label: 'Audit Fase' },
  { status: 'CONSULTATION', label: 'Consult' },
  { status: 'PROPOSAL_SENT', label: 'Voorstel Verzonden' },
  { status: 'PROJECT_ACTIVE', label: 'Project Actief' },
  { status: 'CLOSED', label: 'Afgerond' },
];

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingArchive, setSavingArchive] = useState(false);

  const authedFetch = useCallback(async (input: string, init?: RequestInit) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace('/login');
      throw new Error('Niet ingelogd');
    }
    return fetch(input, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  }, [router]);

  const fetchLead = useCallback(async () => {
    try {
      const res = await authedFetch(`/api/leads?id=${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Lead niet gevonden');
      setLead(json.lead);
      setNotesDraft(json.lead.ai_notes || '');
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Fout bij ophalen van lead');
    } finally {
      setLoading(false);
    }
  }, [authedFetch, id]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      if (id) await fetchLead();
    };
    checkAuthAndFetch();
  }, [router, fetchLead, id]);

  const handleToggleArchive = async () => {
    if (!lead) return;
    setSavingArchive(true);
    const wasArchived = !!lead.archived_at;
    const nextValue = wasArchived ? null : new Date().toISOString();
    setLead({ ...lead, archived_at: nextValue });
    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, archived_at: nextValue }),
      });
      if (!res.ok) throw new Error(wasArchived ? 'Herstellen mislukt' : 'Archiveren mislukt');
    } catch (err) {
      setLead((l) => (l ? { ...l, archived_at: wasArchived ? lead.archived_at : null } : l));
      setErrorMsg(err instanceof Error ? err.message : 'Bijwerken mislukt');
    } finally {
      setSavingArchive(false);
    }
  };

  const handleStatusChange = async (status: PipelineStatus) => {
    if (!lead) return;
    setSavingStatus(true);
    const previous = lead.pipeline_status;
    setLead({ ...lead, pipeline_status: status });
    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, pipeline_status: status }),
      });
      if (!res.ok) throw new Error('Status bijwerken mislukt');
    } catch {
      setLead((l) => (l ? { ...l, pipeline_status: previous } : l));
      setErrorMsg('Status bijwerken mislukt.');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!lead) return;
    setSavingNotes(true);
    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lead.id, ai_notes: notesDraft }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Opslaan mislukt');
      setLead(json.lead);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Notities opslaan mislukt');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!lead) return;
    setGeneratingSummary(true);
    setErrorMsg(null);
    try {
      // Zorg dat de laatst getypte notities eerst zijn opgeslagen
      if (notesDraft !== lead.ai_notes) {
        await authedFetch('/api/leads', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: lead.id, ai_notes: notesDraft }),
        });
      }
      const res = await authedFetch(`/api/leads/${lead.id}/ai-summary`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'AI-samenvatting genereren mislukt');
      setLead(json.lead);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'AI-samenvatting genereren mislukt');
    } finally {
      setGeneratingSummary(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-stone-900 animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <ShieldAlert className="w-10 h-10 text-red-500" />
        <p className="text-stone-600 font-medium">{errorMsg || 'Lead niet gevonden.'}</p>
        <Link href="/admin/crm" className="text-sm font-bold text-stone-900 underline">Terug naar CRM</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/crm"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-8 text-sm font-bold group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Terug naar CRM
        </Link>

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Header card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold tracking-tight text-stone-950">{lead.name}</h1>
                {lead.archived_at && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 border border-stone-200 rounded-full px-3 py-1">
                    Gearchiveerd
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                {lead.company && (
                  <p className="text-sm text-stone-500 flex items-center gap-2 font-medium">
                    <Building2 className="w-4 h-4" /> {lead.company}
                  </p>
                )}
                <p className="text-sm text-stone-500 flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${lead.email}`} className="hover:text-stone-900 transition-colors">{lead.email}</a>
                </p>
                <p className="text-sm text-stone-400 flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4" />
                  Laatste interactie: {new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(lead.last_interaction))}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-56">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-2 block">Pipeline status</label>
              <select
                value={lead.pipeline_status}
                disabled={savingStatus}
                onChange={(e) => handleStatusChange(e.target.value as PipelineStatus)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none transition-all disabled:opacity-50"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.status} value={opt.status}>{opt.label}</option>
                ))}
              </select>

              <button
                onClick={handleToggleArchive}
                disabled={savingArchive}
                className="w-full mt-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-50 transition-colors py-2"
              >
                {savingArchive ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : lead.archived_at ? (
                  <RotateCcw className="w-3.5 h-3.5" />
                ) : (
                  <Archive className="w-3.5 h-3.5" />
                )}
                {lead.archived_at ? 'Herstellen naar pipeline' : 'Archiveren'}
              </button>
            </div>
          </div>

          {lead.message && (
            <div className="mt-6 pt-6 border-t border-stone-100">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Oorspronkelijk bericht</p>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}
        </div>

        {/* AI Notes */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-950 tracking-tight">Notities</h2>
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes || notesDraft === (lead.ai_notes || '')}
              className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors flex items-center gap-1.5"
            >
              {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Opslaan
            </button>
          </div>
          <textarea
            rows={6}
            value={notesDraft}
            onChange={(e) => setNotesDraft(e.target.value)}
            placeholder="Interne notities over deze lead — pijnpunten, budget, context van gesprekken..."
            className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all resize-none placeholder:text-stone-400"
          />
        </div>

        {/* AI Summary */}
        <div className="bg-stone-950 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[80px] opacity-50 -mr-20 -mt-20" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Groeistrategie</p>
                <h2 className="text-lg font-bold text-white tracking-tight">AI-samenvatting</h2>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={generatingSummary || !notesDraft.trim()}
                className="px-5 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 bg-white text-stone-950 hover:bg-stone-100 disabled:bg-stone-700 disabled:text-stone-400 shadow-md active:scale-95 shrink-0"
              >
                {generatingSummary ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Genereer AI-samenvatting
              </button>
            </div>

            {lead.ai_summary ? (
              <motion.p
                key={lead.ai_summary}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-stone-200 leading-relaxed font-light whitespace-pre-wrap"
              >
                {lead.ai_summary}
              </motion.p>
            ) : (
              <p className="text-stone-500 italic text-sm">
                {notesDraft.trim() ? 'Nog geen samenvatting gegenereerd.' : 'Voeg eerst notities toe om een samenvatting te genereren.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
