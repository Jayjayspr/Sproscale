"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Loader2, ShieldAlert, LogOut } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // 1. Controleer of de gebruiker is ingelogd
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        router.replace('/login');
        return;
      }

      // 2. Fetch Leads als geautoriseerd
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
        
      console.log('Leads opgehaald:', data);

      if (error) {
        console.error('Error fetching leads:', error);
        setErrorMsg(error.message);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();

    // Ontvang realtime database signalen indien ingelogd
    const channel = supabase
      .channel('realtime leads')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'leads' },
        (payload) => {
          console.log('Nieuwe lead ontvangen!', payload.new);
          // Voeg nieuwe lead toe aan de top van de lijst
          setLeads((currentLeads) => [payload.new as Lead, ...currentLeads]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen z-50 bg-stone-50 flex flex-col gap-4 items-center justify-center relative">
        <Loader2 className="w-8 h-8 text-stone-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 py-12 px-4 sm:px-6 lg:px-8 font-sans z-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-stone-950 uppercase mb-2">Sproscale</h1>
            <p className="text-stone-500 mt-2 text-sm md:text-base font-medium">Real-time overzicht van alle binnengekomen leads.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
            <div className="bg-white border border-stone-200 rounded-full px-4 py-2 text-sm text-stone-600 flex items-center gap-2 shadow-sm font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.3)]"></span>
              Live Verbinding
            </div>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace('/login');
              }}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 bg-stone-950 text-white hover:bg-stone-800 shadow-md active:scale-95"
            >
              Log uit
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs md:text-sm uppercase tracking-[0.1em] border-b border-stone-200 font-bold">
                  <th className="px-6 py-6">Datum</th>
                  <th className="px-6 py-6">Naam</th>
                  <th className="px-6 py-6">Email</th>
                  <th className="px-6 py-6">Bericht</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {errorMsg ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                        <span className="text-red-600 font-bold text-lg">Fout bij ophalen van database</span>
                        <span className="text-stone-500 max-w-lg break-words font-medium">{errorMsg}</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-stone-400 italic font-medium">
                      Geen data gevonden...
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-6 py-6 whitespace-nowrap text-xs text-stone-400 font-bold group-hover:text-stone-600 transition-colors">
                        {new Intl.DateTimeFormat('nl-NL', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(lead.created_at))}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap font-bold text-stone-900 text-base">
                        {lead.name}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-stone-900 font-semibold">
                        <a href={`mailto:${lead.email}`} className="hover:text-stone-600 transition-colors border-b border-stone-200 pb-1">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-6 text-sm text-stone-600 max-w-sm whitespace-pre-wrap leading-relaxed font-medium">
                        {lead.message || <span className="text-stone-300 italic">Geen bericht achtergelaten</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
