"use client";

import { useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n/LanguageContext';

interface ServiceLeadFormProps {
  serviceSlug: string;
  serviceLabel: string;
  nicheSlug?: string;
  nicheLabel?: string;
}

export default function ServiceLeadForm({ serviceSlug, serviceLabel, nicheSlug, nicheLabel }: ServiceLeadFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message || null,
          // Verborgen herkomstvelden: welke dienst/niche-pagina leverde deze lead op.
          source_service: serviceSlug,
          source_niche: nicheSlug ?? null,
        },
      ]);

      if (dbError) throw dbError;

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          bedrijf: formData.company,
          message: `[${serviceLabel}${nicheLabel ? ` • ${nicheLabel}` : ''}] ${formData.message}`,
        }),
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm flex flex-col items-center text-center gap-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        <p className="text-stone-700 font-medium">{t('nichePages.formSuccess')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-stone-950 tracking-tight mb-2">{t('nichePages.formHeading')}</h3>

      {/* Verborgen herkomstvelden */}
      <input type="hidden" name="source_service" value={serviceSlug} />
      <input type="hidden" name="source_niche" value={nicheSlug ?? ''} />

      <input
        required
        placeholder={t('nichePages.formNamePlaceholder')}
        value={formData.name}
        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
        className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
      />
      <input
        required
        type="email"
        placeholder={t('nichePages.formEmailPlaceholder')}
        value={formData.email}
        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
        className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
      />
      <input
        placeholder={t('nichePages.formCompanyPlaceholder')}
        value={formData.company}
        onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))}
        className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all"
      />
      <textarea
        rows={3}
        placeholder={t('nichePages.formMessagePlaceholder')}
        value={formData.message}
        onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
        className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all resize-none"
      />

      {error && <p className="text-sm text-red-600">{t('nichePages.formError')}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-stone-950 hover:bg-stone-800 disabled:bg-stone-200 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <>
            {t('nichePages.formSubmit')}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
