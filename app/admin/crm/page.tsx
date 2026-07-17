"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import { Loader2, ShieldAlert, LogOut, Plus, X, Building2, Mail, ArrowUpRight, LayoutGrid, Table2, Archive, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

type View = 'pipeline' | 'archive';

const COLUMNS: { status: PipelineStatus; label: string; dot: string }[] = [
  { status: 'LEAD_RECEIVED', label: 'Lead Ontvangen', dot: 'bg-stone-400' },
  { status: 'AUDIT_PHASE', label: 'Audit Fase', dot: 'bg-sky-500' },
  { status: 'CONSULTATION', label: 'Consult', dot: 'bg-amber-500' },
  { status: 'PROPOSAL_SENT', label: 'Voorstel Verzonden', dot: 'bg-violet-500' },
  { status: 'PROJECT_ACTIVE', label: 'Project Actief', dot: 'bg-emerald-500' },
  { status: 'CLOSED', label: 'Afgerond', dot: 'bg-stone-900' },
];

const emptyForm = { name: '', email: '', company: '', message: '' };

export default function CrmKanbanPage() {
  const router = useRouter();

  const [view, setView] = useState<View>('pipeline');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<PipelineStatus | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [savingLead, setSavingLead] = useState(false);

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

  const fetchLeads = useCallback(async (targetView: View) => {
    try {
      const res = await authedFetch(`/api/leads${targetView === 'archive' ? '?view=archived' : ''}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Onbekende fout');
      setLeads(json.leads || []);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Fout bij ophalen van leads');
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }
      setLoading(true);
      await fetchLeads(view);
    };
    checkAuthAndFetch();
  }, [router, fetchLeads, view]);

  const handleDrop = async (status: PipelineStatus) => {
    setDragOverStatus(null);
    const id = draggedId;
    setDraggedId(null);
    if (!id) return;

    const current = leads.find((l) => l.id === id);
    if (!current || current.pipeline_status === status) return;

    // Optimistische update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, pipeline_status: status } : l)));

    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pipeline_status: status }),
      });
      if (!res.ok) throw new Error('Status bijwerken mislukt');
    } catch {
      // Rollback bij fout
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, pipeline_status: current.pipeline_status } : l)));
      setErrorMsg('Status bijwerken mislukt — wijziging teruggedraaid.');
    }
  };

  const handleArchive = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, archived_at: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Archiveren mislukt');
    } catch {
      setErrorMsg('Archiveren mislukt.');
      fetchLeads(view);
    }
  };

  const handleRestore = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    try {
      const res = await authedFetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, archived_at: null }),
      });
      if (!res.ok) throw new Error('Herstellen mislukt');
    } catch {
      setErrorMsg('Herstellen mislukt.');
      fetchLeads(view);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSavingLead(true);
    try {
      const res = await authedFetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Aanmaken mislukt');
      setLeads((prev) => [json.lead, ...prev]);
      setFormData(emptyForm);
      setShowNewLeadModal(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Aanmaken van lead mislukt');
    } finally {
      setSavingLead(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-stone-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-stone-950 uppercase mb-2">CRM</h1>
            <p className="text-stone-500 mt-2 text-sm md:text-base font-medium">
              {view === 'pipeline' ? 'Sleep leads tussen fases om de pipeline-status bij te werken.' : 'Gearchiveerde leads — sta niet meer in de actieve pipeline.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-sm"
            >
              <Table2 className="w-4 h-4" />
              Inbox
            </Link>
            {view === 'pipeline' && (
              <button
                onClick={() => setShowNewLeadModal(true)}
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 bg-stone-950 text-white hover:bg-stone-800 shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Nieuwe lead
              </button>
            )}
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace('/login');
              }}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-sm"
            >
              Log uit
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setView('pipeline')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              view === 'pipeline' ? 'bg-stone-950 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:text-stone-900'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setView('archive')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 ${
              view === 'archive' ? 'bg-stone-950 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:text-stone-900'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            Archief
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            {errorMsg}
          </div>
        )}

        {/* Kanban board */}
        {view === 'pipeline' && (
          <div className="grid grid-flow-col auto-cols-[280px] sm:auto-cols-[300px] gap-5 overflow-x-auto pb-6">
            {COLUMNS.map((col) => {
              const columnLeads = leads.filter((l) => l.pipeline_status === col.status);
              const isDragOver = dragOverStatus === col.status;
              return (
                <div
                  key={col.status}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverStatus(col.status);
                  }}
                  onDragLeave={() => setDragOverStatus((s) => (s === col.status ? null : s))}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(col.status);
                  }}
                  className={`flex flex-col rounded-3xl border transition-colors ${
                    isDragOver ? 'border-stone-400 bg-stone-100' : 'border-stone-200 bg-stone-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between px-4 py-4 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                      <h2 className="text-xs font-bold uppercase tracking-widest text-stone-700">{col.label}</h2>
                    </div>
                    <span className="text-xs font-bold text-stone-400 bg-white border border-stone-200 rounded-full w-6 h-6 flex items-center justify-center">
                      {columnLeads.length}
                    </span>
                  </div>

                  <div className="flex-1 p-3 space-y-3 min-h-[120px]">
                    <AnimatePresence initial={false}>
                      {columnLeads.map((lead) => (
                        <motion.div
                          key={lead.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          draggable
                          onDragStart={(e) => {
                            setDraggedId(lead.id);
                            (e as unknown as React.DragEvent).dataTransfer.setData('text/plain', lead.id);
                          }}
                          onDragEnd={() => setDraggedId(null)}
                          className={`group/card relative bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing ${
                            draggedId === lead.id ? 'opacity-40' : ''
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleArchive(lead.id);
                            }}
                            title="Archiveren"
                            className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center text-stone-300 hover:text-stone-900 hover:bg-stone-100 transition-colors opacity-0 group-hover/card:opacity-100"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                          <Link href={`/admin/crm/${lead.id}`} className="block group pr-6">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-stone-600 transition-colors">
                                {lead.name}
                              </h3>
                              <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-600 transition-colors shrink-0 mt-0.5" />
                            </div>
                            {lead.company && (
                              <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1.5 font-medium">
                                <Building2 className="w-3 h-3 shrink-0" />
                                {lead.company}
                              </p>
                            )}
                            <p className="text-xs text-stone-400 flex items-center gap-1.5 font-medium truncate">
                              <Mail className="w-3 h-3 shrink-0" />
                              {lead.email}
                            </p>
                            <p className="text-[10px] text-stone-300 mt-3 font-bold uppercase tracking-wider">
                              {new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: 'short' }).format(new Date(lead.last_interaction))}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {columnLeads.length === 0 && (
                      <div className="text-center text-stone-300 text-xs italic font-medium py-8">Geen leads</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Archief */}
        {view === 'archive' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence initial={false}>
              {leads.map((lead) => (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/admin/crm/${lead.id}`} className="min-w-0 flex-1 group">
                      <h3 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-stone-600 transition-colors truncate">
                        {lead.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleRestore(lead.id)}
                      title="Herstellen naar pipeline"
                      className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {lead.company && (
                    <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1.5 font-medium">
                      <Building2 className="w-3 h-3 shrink-0" />
                      {lead.company}
                    </p>
                  )}
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 font-medium truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    {lead.email}
                  </p>
                  <p className="text-[10px] text-stone-300 mt-3 font-bold uppercase tracking-wider">
                    Gearchiveerd op {new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(lead.archived_at!))}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {leads.length === 0 && (
              <div className="col-span-full text-center text-stone-300 text-sm italic font-medium py-16">Geen gearchiveerde leads</div>
            )}
          </div>
        )}
      </div>

      {/* Nieuwe lead modal */}
      <AnimatePresence>
        {showNewLeadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewLeadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-950 tracking-tight">Nieuwe lead</h2>
                <button onClick={() => setShowNewLeadModal(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateLead} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1 mb-1.5 block">Naam</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1 mb-1.5 block">E-mail</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1 mb-1.5 block">Bedrijf</label>
                  <input
                    value={formData.company}
                    onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1 mb-1.5 block">Notitie</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-stone-900 outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingLead}
                  className="w-full bg-stone-950 hover:bg-stone-800 disabled:bg-stone-200 text-white disabled:text-stone-400 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {savingLead ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <LayoutGrid className="w-4 h-4" />
                      Toevoegen aan pipeline
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
