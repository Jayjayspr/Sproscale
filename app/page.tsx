"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowDown, CheckCircle2, TrendingUp, Mail, User, Building, MessageSquare, Briefcase, Target, Monitor, Bot, ChevronDown, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function SproscaleLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijf: '',
    uitdaging: ''
  });
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);
    
    try {
      const { error } = await supabase.from('leads').insert([
        {
          name: formData.naam,
          email: formData.email,
          message: `Bedrijf: ${formData.bedrijf} - Uitdaging: ${formData.uitdaging}`
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
    } catch (error) {
      console.error('Fout bij opslaan:', error);
      alert('Er ging iets mis bij het verzenden. Probeer het later opnieuw.');
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-32 overflow-hidden relative flex flex-col items-center text-center bg-white">
        {/* Living High-Contrast Mesh Gradient / Waves Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Light Zinc Core Blobs */}
          <motion.div
            animate={{
              x: [0, 150, 0],
              y: [0, -100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-zinc-100/40 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-zinc-200/50 rounded-full blur-[100px]"
          />
          
          {/* Dark Zinc 'Living' Waves (Low Opacity, High Blur) */}
          <motion.div
            animate={{
              x: [0, 200, 0],
              y: [0, 150, 0],
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] left-[5%] w-[50%] h-[50%] bg-zinc-800 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, -200, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-zinc-700 rounded-full blur-[130px]"
          />

          {/* Depth Fade Overlay */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-stone-200 text-stone-800 text-sm font-medium mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-stone-900 animate-pulse"></span>
            Intelligent Opschalen
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-stone-900 leading-[1.1] md:leading-[1.05] tracking-tight mb-6 md:mb-8">
            Schaal uw bedrijf <br className="hidden md:block" />
            <span className="text-stone-500 italic">gekwalificeerd</span> op.
          </h1>

          <p className="text-base md:text-xl text-stone-600 mb-8 md:mb-10 max-w-2xl leading-relaxed font-light px-4 md:px-0">
            Wij combineren strategische consultancy, high-end webdesign, marketing en AI-automations om uw bedrijf duurzaam te laten groeien.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link href="/afspraak" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-md transition-all duration-300 group shadow-md text-base sm:text-lg">
              Plan een kennismaking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#diensten" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-stone-50 hover:scale-105 text-stone-900 border border-stone-200 font-medium px-6 py-3.5 sm:px-8 sm:py-4 rounded-md transition-all duration-300 shadow-sm text-base sm:text-lg">
              Bekijk diensten
            </a>
          </div>
        </motion.div>
      </section>

      {/* Our Specialty (Four Pillars) */}
      <section id="diensten" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-stone-100 border-y border-stone-200">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-left mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Onze Diensten</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif text-stone-900 mb-6 md:mb-8 tracking-tight">
              Onze <span className="text-stone-500 italic">Specialiteiten.</span>
            </h2>
            <p className="text-base md:text-xl text-stone-600 max-w-3xl font-light leading-relaxed">Een integrale aanpak voor uw online succes. Wij bieden de expertise die nodig is om uw bedrijf naar het volgende niveau te tillen.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Card 1: Consultancy */}
            <div className="bg-white rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3 md:mb-4">Consultancy</h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6 md:mb-8 font-light">
                  Datagedreven advies en strategische planning om uw bedrijfsprocessen te optimaliseren en schaalbare groei te realiseren.
                </p>
                <ul className="space-y-4">
                  {['Strategische Planning', 'Procesoptimalisatie', 'Data Analyse'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2: Marketing */}
            <div className="bg-white rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <Target className="w-7 h-7 md:w-8 md:h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3 md:mb-4">Marketing</h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6 md:mb-8 font-light">
                  Doelgerichte campagnes, SEO en leadgeneratie systemen die uw ideale B2B klanten aantrekken en converteren.
                </p>
                <ul className="space-y-4">
                  {['Growth Marketing', 'B2B Leadgeneratie', 'Meta & Google Ads'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 3: Web Design & Development */}
            <div className="bg-white rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <Monitor className="w-7 h-7 md:w-8 md:h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3 md:mb-4">Web Design & Development</h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6 md:mb-8 font-light">
                  High-performance, op maat gemaakte websites en applicaties die uw merk versterken en naadloos functioneren.
                </p>
                <ul className="space-y-4">
                  {['Next.js & React', 'Conversie-gericht Design', 'Razendsnelle Laadtijden'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 4: AI Automations */}
            <div className="bg-white rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <Bot className="w-7 h-7 md:w-8 md:h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-3 md:mb-4">AI Automations</h3>
                <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6 md:mb-8 font-light">
                  Slimme AI-integraties en automatiseringen die repetitieve taken overnemen, efficiëntie verhogen en uw team tijd besparen.
                </p>
                <ul className="space-y-4">
                  {['Workflow Automatisering', 'AI Chatbots & Assistenten', 'CRM Integraties'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-stone-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Hoe het werkt (Process) / Over ons */}
      <section id="over-ons" className="pt-32 pb-16 md:pt-40 md:pb-32 bg-[#111111] text-stone-300">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">
            <div className="text-left">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="w-12 h-[1px] bg-stone-600"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">Hoe het werkt</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight tracking-tight">
                Van strategie <br className="hidden md:block" />
                tot <span className="text-stone-400 italic">implementatie.</span>
              </h2>
            </div>
            <div className="lg:pt-32">
              <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed max-w-sm">
                Een no-nonsense aanpak waarbij we jouw de technische executie volledig uit handen nemen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="border-t border-stone-800 pt-8">
                <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase mb-4">Analyse & Strategie</h3>
                <p className="text-stone-400 font-light leading-relaxed text-sm md:text-base">
                  We brengen in kaart waar de bottlenecks in je huidige proces zitten en welke systemen (ads, web, AI) de grootste impact maken.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="border-t border-stone-800 pt-8">
                <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase mb-4">Bouw & Integratie</h3>
                <p className="text-stone-400 font-light leading-relaxed text-sm md:text-base">
                  We ontwikkelen de website, configureren de AI-systemen en zetten de campagnes op. Alles getest en naadloos verbonden.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="border-t border-stone-800 pt-8">
                <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase mb-4">Optimalisatie & Groei</h3>
                <p className="text-stone-400 font-light leading-relaxed text-sm md:text-base">
                  Na de lancering sturen we op keiharde data. We schalen wat werkt, tweaken de AI en zorgen for een continue stroom aan leads.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reviews (Social Proof) */}
      <section id="over-ons" className="py-16 md:py-24 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-left mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Reviews</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif text-stone-900 mb-6 md:mb-8 tracking-tight">
              Bewezen <span className="text-stone-500 italic">Resultaat.</span>
            </h2>
            <p className="text-base md:text-xl text-stone-600 max-w-3xl font-light leading-relaxed">Wat onze partners zeggen over de samenwerking met SPROSCALE.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Pieter van der Berg", role: "CEO", company: "TechFlow Solutions", quote: "Sinds de lancering van ons nieuwe platform zien we 30% meer gekwalificeerde aanvragen in slechts 3 maanden." },
              { name: "Sarah de Vries", role: "Marketing Director", company: "Innovate B2B", quote: "De leadgeneratie systemen van SPROSCALE hebben onze sales cycle met weken verkort. Top kwaliteit leads." },
              { name: "Johan Klaassen", role: "Founder", company: "DataSync", quote: "Eindelijk een bureau dat snapt dat een website moet verkopen. De technische optimalisatie is ongekend." }
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-2">
                <div className="flex-grow">
                  <div className="flex text-stone-800 mb-6 gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">"{review.quote}"</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">{review.name}</p>
                    <p className="text-stone-500 text-sm">{review.role}, {review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pt-32 pb-16 md:pt-40 md:pb-32 bg-[#111111]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-stone-600"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Vragen</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              Veelgestelde <span className="text-stone-400 italic">Vragen.</span>
            </h2>
          </div>

          <div className="border border-stone-800 rounded-sm divide-y divide-stone-800 bg-transparent">
            {[
              { q: "Wat als ik al een website heb?", a: "Dan optimaliseren we deze of bouwen we een nieuwe, afhankelijk van de huidige prestaties en uw doelen." },
              { q: "Hoe snel reageert de AI op nieuwe leads?", a: "Onze AI-systemen reageren doorgaans binnen 5 minuten, 24/7, om de kans op conversie te maximiseren." },
              { q: "Zijn er maandelijkse kosten?", a: "Ja, we werken met transparante maandelijkse retainers voor doorlopende optimalisatie, hosting en AI-gebruik." },
              { q: "Voor wie is SPROSCALE bedoeld?", a: "Voor ambitieuze B2B en MKB bedrijven die klaar zijn om serieus te schalen en bereid zijn te investeren in kwaliteit." }
            ].map((faq, index) => (
              <div key={index} className="group">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-serif italic text-stone-300 text-lg md:text-xl">{faq.q}</span>
                  <div className="w-8 h-8 border border-stone-700 flex items-center justify-center rounded-sm text-stone-400 group-hover:bg-stone-800 transition-colors shrink-0 ml-4">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 md:px-8 pb-8 text-stone-400 font-light text-sm md:text-base">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact (Lead Capture) */}
      <section id="contact" className="pt-32 pb-16 md:pt-40 md:pb-24 bg-stone-100 relative overflow-hidden scroll-mt-0">
        {/* Subtle background glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-stone-200/50 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="bg-white rounded-3xl p-6 md:p-12 border border-stone-200 shadow-xl relative overflow-hidden">

            <div className="text-left mb-8 md:mb-10 mt-2 md:mt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-stone-900"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Contact</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-serif text-stone-900 mb-4 md:mb-6 tracking-tight">
                Klaar om te <span className="text-stone-500 italic">schalen?</span>
              </h2>
              <p className="text-stone-600 text-base md:text-xl font-light leading-relaxed">Laat uw gegevens achter en wij nemen binnen 24 uur contact op voor een vrijblijvend strategiegesprek.</p>
            </div>

            {!isFormSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-stone-400" /> Naam
                    </label>
                    <input type="text" required value={formData.naam} onChange={e => setFormData({ ...formData, naam: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="Uw volledige naam" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-stone-400" /> Zakelijk E-mail
                    </label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="naam@bedrijf.nl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-stone-400" /> Bedrijf
                  </label>
                  <input type="text" required value={formData.bedrijf} onChange={e => setFormData({ ...formData, bedrijf: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="Bedrijfsnaam" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-stone-400" /> Uw Groeiuitdaging
                  </label>
                  <textarea rows={4} required value={formData.uitdaging} onChange={e => setFormData({ ...formData, uitdaging: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400 resize-none" placeholder="Waar loopt u momenteel tegenaan in uw acquisitie?"></textarea>
                </div>

                <button type="submit" disabled={isFormLoading} className="w-full bg-stone-900 hover:bg-stone-800 disabled:bg-stone-500 hover:scale-[1.02] disabled:scale-100 text-white font-semibold py-3 sm:py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base mt-4 sm:mt-8 shadow-md">
                  {isFormLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      Vraag Een Strategiegesprek Aan
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 md:py-20 flex flex-col items-center justify-center text-center space-y-6 bg-stone-50 rounded-2xl border border-stone-200"
              >
                <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight">
                  <span className="italic text-stone-500">Bedankt!</span>
                </h3>
                <p className="text-lg md:text-xl text-stone-600 max-w-lg font-serif italic py-4">
                  Wij hebben uw aanvraag ontvangen en nemen binnen 24 uur contact op.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
