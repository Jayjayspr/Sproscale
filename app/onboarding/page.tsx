"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Target, 
  Rocket, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  ShieldCheck,
  Zap,
  ExternalLink,
  Monitor,
  Bot,
  Layers,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

// Step indicators component - Dynamically adjusted
const StepIndicator = ({ currentStep, totalSteps, steps }: { currentStep: number, totalSteps: number, steps: any[] }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto mb-12 px-4">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center relative">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: currentStep >= idx + 1 ? '#1c1917' : '#f5f5f4',
                color: currentStep >= idx + 1 ? '#ffffff' : '#a8a29e',
                borderColor: currentStep >= idx + 1 ? '#1c1917' : '#e7e5e4',
              }}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 shadow-sm"
            >
              {currentStep > idx + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </motion.div>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 hidden sm:block ${currentStep >= idx + 1 ? 'text-stone-900' : 'text-stone-400'}`}>
              {step.name}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="flex-1 h-[2px] bg-stone-200 mx-2 sm:mx-4 -mt-6">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: currentStep > idx + 1 ? '100%' : '0%' }}
                className="h-full bg-stone-900"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    // Step 1
    company_name: '',
    kvk_number: '',
    btw_number: '',
    billing_address: '',
    email: '',
    // Step 2
    selected_service: 'Alleen Website',
    // Step 3 (Conditional)
    meta_access: false,
    google_access: false,
    linkedin_access: false,
    // Step 4
    deadline: '',
    remarks: '',
  });

  const SPROSCALE_META_ID = "336879895232145";

  const showMetaStep = useMemo(() => {
    return formData.selected_service === 'Marketing & Ads' || formData.selected_service === 'Full Service (Alles)';
  }, [formData.selected_service]);

  // Dynamic steps list
  const activeSteps = useMemo(() => {
    const steps = [
      { id: 'bedrijf', name: 'Bedrijf', icon: Building2 },
      { id: 'services', name: 'Services', icon: Layers },
    ];
    
    if (showMetaStep) {
      steps.push({ id: 'meta', name: 'Connecties', icon: Target });
    }
    
    steps.push({ id: 'project', name: 'Project', icon: Rocket });
    return steps;
  }, [showMetaStep]);

  const totalSteps = activeSteps.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(SPROSCALE_META_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextStep = () => setCurrentStepIdx((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setCurrentStepIdx((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStepIdx < totalSteps) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Supabase (using the newly created 'clients' table)
      const { error: supabaseError } = await supabase
<<<<<<< HEAD
        .from('clients')
=======
        .from('clients') // Back to clients table
>>>>>>> 02659d9 (Final cleanup and domain fixes)
        .insert([{
          company_name: formData.company_name,
          email: formData.email,
          kvk_number: formData.kvk_number,
          btw_number: formData.btw_number,
          billing_address: formData.billing_address,
          selected_service: formData.selected_service,
          meta_access: formData.meta_access,
          google_access: formData.google_access,
          linkedin_access: formData.linkedin_access,
          deadline: formData.deadline,
          remarks: formData.remarks,
<<<<<<< HEAD
=======
          // Mapping exactly to the SQL columns specified by the user
>>>>>>> 02659d9 (Final cleanup and domain fixes)
        }]);

      if (supabaseError) throw supabaseError;

      // 2. Send emails
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      router.push('/onboarding/thanks');
    } catch (error) {
      console.error('Error:', error);
      alert('Fout bij verzenden naar de clients tabel. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepId = activeSteps[currentStepIdx - 1]?.id;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-200/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-200/50 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-stone-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-900/10 via-stone-900 to-stone-900/10"></div>

          <div className="text-center mb-10 mt-4">
            <h1 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
              Sproscale <span className="text-stone-500 italic">Onboarding</span>
            </h1>
            <p className="text-stone-500 font-light mt-4 text-sm md:text-base">
              Laten we je project configureren voor succes.
            </p>
          </div>

          <StepIndicator currentStep={currentStepIdx} totalSteps={totalSteps} steps={activeSteps} />

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {currentStepId === 'bedrijf' && (
                <motion.div
                  key="bedrijf"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif italic text-stone-800 border-l-2 border-stone-900 pl-4 mb-6">Stap 1: Bedrijfsgegevens</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Bedrijfsnaam</label>
                      <input type="text" required value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 font-light" placeholder="Naam B.V." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">KVK Nummer</label>
                      <input type="text" required value={formData.kvk_number} onChange={(e) => setFormData({...formData, kvk_number: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 font-light" placeholder="8 cijfers" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">BTW Nummer</label>
                      <input type="text" required value={formData.btw_number} onChange={(e) => setFormData({...formData, btw_number: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 font-light" placeholder="NL..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Zakelijk E-mail</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 font-light" placeholder="naam@bedrijf.nl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Factuuradres</label>
                    <textarea required value={formData.billing_address} onChange={(e) => setFormData({...formData, billing_address: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 font-light h-24 resize-none" placeholder="Adresgegevens..." />
                  </div>
                </motion.div>
              )}

              {currentStepId === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif italic text-stone-800 border-l-2 border-stone-900 pl-4 mb-6">Stap 2: Services Selectie</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'Alleen Website', icon: Monitor, color: 'text-stone-500' },
                      { id: 'Marketing & Ads', icon: Target, color: 'text-stone-900' },
                      { id: 'AI Automations', icon: Bot, color: 'text-stone-700' },
                      { id: 'Full Service (Alles)', icon: Rocket, color: 'text-stone-900' },
                    ].map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setFormData({...formData, selected_service: service.id})}
                        className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-4 group ${
                          formData.selected_service === service.id 
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xl scale-[1.02]' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        <div className={`p-3 rounded-xl w-fit transition-colors ${formData.selected_service === service.id ? 'bg-white/10' : 'bg-stone-100'}`}>
                          <service.icon className={`w-6 h-6 ${formData.selected_service === service.id ? 'text-white' : 'text-stone-600'}`} />
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{service.id}</p>
                          <p className={`text-[10px] uppercase tracking-widest mt-1 opacity-60 ${formData.selected_service === service.id ? 'text-stone-300' : 'text-stone-400'}`}>
                            {service.id === 'Full Service (Alles)' ? 'Aanbevolen' : 'Pakket'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStepId === 'meta' && (
                <motion.div
                  key="meta"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif italic text-stone-800 border-l-2 border-stone-900 pl-4 mb-6">Stap 3: Marketing & AI Koppeling</h3>
                  <div className="bg-[#111111] text-white p-6 rounded-2xl shadow-inner relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-5 h-5" />
                      <h4 className="text-sm font-bold uppercase tracking-widest">Meta Business Suite</h4>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400 uppercase tracking-tighter">Partner ID</span>
                        <span className="font-mono text-lg">{SPROSCALE_META_ID}</span>
                      </div>
                      <button type="button" onClick={handleCopy} className="p-2.5 bg-white text-stone-900 rounded-lg">
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-stone-400 text-xs italic">Voeg Sproscale toe als Partner voor Ads en Pixel toegang.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 'meta_access', label: 'Meta Partner toegang', icon: ShieldCheck },
                      { id: 'google_access', label: 'Google Ads toegang', icon: Zap },
                      { id: 'linkedin_access', label: 'LinkedIn Ads (Optioneel)', icon: ExternalLink },
                    ].map((access) => (
                      <label key={access.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${formData[access.id as keyof typeof formData] ? 'bg-stone-100 border-stone-900' : 'bg-white border-stone-200'}`}>
                        <div className="flex items-center gap-3">
                          <access.icon className="w-5 h-5 text-stone-900" />
                          <span className="text-sm font-medium">{access.label}</span>
                        </div>
                        <input type="checkbox" checked={formData[access.id as keyof typeof formData] as boolean} onChange={(e) => setFormData({...formData, [access.id]: e.target.checked})} className="w-5 h-5 accent-stone-900" />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStepId === 'project' && (
                <motion.div
                  key="project"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-serif italic text-stone-800 border-l-2 border-stone-900 pl-4 mb-6">Laatste Stap: Project Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Gewenste Deadline
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Eventuele Opmerkingen
                    </label>
                    <textarea
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 outline-none bg-stone-50 transition-all font-light h-32 resize-none"
                      placeholder="Heb je specifieke wensen of vragen?"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-4">
                    <Zap className="w-5 h-5 text-amber-600 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-amber-900">Klaar voor lancering.</p>
                      <p className="text-xs text-amber-800/80 leading-relaxed font-light">Na verzenden nemen we direct contact op voor de technische kick-off.</p>
                    </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 pt-4">
              {currentStepIdx > 1 && (
                <button type="button" onClick={prevStep} className="flex-1 px-6 py-4 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all font-medium flex items-center justify-center gap-2 group">
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1" /> Vorige
                </button>
              )}
              <button type="submit" disabled={isSubmitting} className={`flex-[2] px-6 py-4 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-all font-medium flex items-center justify-center gap-2 group shadow-xl ${isSubmitting ? 'opacity-70' : ''}`}>
                {isSubmitting ? (
                  <><Rocket className="w-5 h-5 animate-bounce" /> Bezig met lanceren...</>
                ) : (
                  <>{currentStepIdx === totalSteps ? 'Afronden & Verzenden' : 'Volgende stap'}<ChevronRight className="w-4 h-4 group-hover:translate-x-1" /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
