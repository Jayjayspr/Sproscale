"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, User, Building, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../lib/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijf: '',
    uitdaging: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.naam,
          email: formData.email,
          message: `Bedrijf: ${formData.bedrijf} | Uitdaging: ${formData.uitdaging}`
        }
      ]);

      if (error) throw error;
      
      // Send email notification via Resend
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.naam,
          email: formData.email,
          bedrijf: formData.bedrijf,
          message: formData.uitdaging
        }),
      }).catch(err => console.error('Email error:', err));
      
      setIsFormSubmitted(true);
      setFormData({ naam: '', email: '', bedrijf: '', uitdaging: '' });
    } catch (error: any) {
      console.error('Fout bij opslaan:', error.message);
      alert(t('contactPage.errorPrefix') + error.message);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Linker Kolom: Contact Informatie */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('contactPage.eyebrow')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-stone-900 mb-8 tracking-tight leading-[1.1]">
              {t('contactPage.headingLine1')} <br />
              <span className="text-stone-500 italic">{t('contactPage.headingHighlight')}</span>
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed mb-12 max-w-md">
              {t('contactPage.subheading')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <Mail className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">{t('contactPage.info.email')}</h3>
                  <p className="text-stone-600 font-light">info@sproscale.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <Phone className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">{t('contactPage.info.phone')}</h3>
                  <p className="text-stone-600 font-light">+31 6 58761348</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <MapPin className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">{t('contactPage.info.office')}</h3>
                  <p className="text-stone-600 font-light">Strijp-S, Eindhoven</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechter Kolom: Het Formulier */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl relative overflow-hidden">
            {isFormSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-serif text-stone-900 mb-4">{t('contactPage.thanksHeading')}</h3>
                <p className="text-stone-600 mb-8 max-w-xs mx-auto">{t('contactPage.thanksBody')}</p>
                <button
                  onClick={() => setIsFormSubmitted(false)}
                  className="text-stone-900 font-bold border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors"
                >
                  {t('contactPage.sendAnother')}
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-3xl font-serif text-stone-900 mb-8">{t('contactPage.formHeading')}</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.naam}
                        onChange={(e) => setFormData({ ...formData, naam: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-stone-900 focus:ring-0 transition-all text-stone-900 placeholder:text-stone-400"
                        placeholder={t('contactForm.placeholders.name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-stone-900 focus:ring-0 transition-all text-stone-900 placeholder:text-stone-400"
                        placeholder={t('contactForm.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Building className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.company')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.bedrijf}
                      onChange={(e) => setFormData({ ...formData, bedrijf: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-stone-900 focus:ring-0 transition-all text-stone-900 placeholder:text-stone-400"
                      placeholder={t('contactForm.placeholders.company')}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.challenge')}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.uitdaging}
                      onChange={(e) => setFormData({ ...formData, uitdaging: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-stone-900 focus:ring-0 transition-all text-stone-900 placeholder:text-stone-400 resize-none"
                      placeholder={t('contactPage.challengePlaceholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isFormLoading}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg mt-8 shadow-md disabled:bg-stone-300"
                  >
                    {isFormLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {t('contactPage.submit')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}