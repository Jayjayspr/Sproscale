"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, User, Building, MessageSquare, Briefcase, Target, Monitor, Bot, ChevronDown, Loader2, Database, ShieldCheck, Zap, Wallet, Clock, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import HeroSection from '../components/hero/HeroSection';
import { useLanguage } from '../lib/i18n/LanguageContext';

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'Vercel'];

const painPointConfig = [
  { id: 'followUp', n: '01' },
  { id: 'lowInquiries', n: '02' },
  { id: 'noTimeForGrowth', n: '03' },
];

const serviceConfig = [
  { id: 'consultancy', icon: Briefcase },
  { id: 'marketing', icon: Target },
  { id: 'webDesign', icon: Monitor },
  { id: 'aiAutomations', icon: Bot },
];

const supabaseFeatureConfig = [
  { id: 'realtimeSync', icon: Database },
  { id: 'secureBackend', icon: ShieldCheck },
  { id: 'seamlessIntegration', icon: Zap },
];

const processConfig = [
  { id: 'analysis' },
  { id: 'buildIntegration' },
  { id: 'optimization' },
];

const reviewConfig = [
  { id: 'techflow', name: 'Pieter van der Berg', company: 'TechFlow Solutions' },
  { id: 'innovate', name: 'Sarah de Vries', company: 'Innovate B2B' },
  { id: 'datasync', name: 'Johan Klaassen', company: 'DataSync' },
];

// Patroon A: alleen de niet-vertaalbare delen (icon, volgorde, stabiele id) blijven
// hier staan. Titel/beschrijving komen via t(`guarantees.items.${id}.title`).
const guaranteeConfig = [
  { id: 'vastePrijs', icon: Wallet },
  { id: 'live6Weken', icon: Clock },
  { id: 'eigendom', icon: Lock },
];

type FaqItem = { q: string; a: string };

export default function SproscaleLandingPage() {
  const { t, tRaw } = useLanguage();
  const faqs = tRaw<FaqItem[]>('faq.items');
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bedrijf: '',
    uitdaging: '',
    website: '', // honeypot — onzichtbaar voor mensen, vangt geautomatiseerde form-fillers (crawlers, visual-test tools)
  });
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: alleen bots/crawlers vullen dit onzichtbare veld in.
    // Doe alsof het gelukt is zonder iets op te slaan of te versturen.
    if (formData.website) {
      setIsFormSubmitted(true);
      return;
    }

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
      alert(t('contactForm.errorAlert'));
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Tech stack showcase */}
      <section className="py-8 md:py-10 bg-white border-b border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">{t('techStack.heading')}</span>
        </div>
        <div
          className="relative w-full overflow-hidden flex justify-center"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex w-max items-center gap-16 whitespace-nowrap animate-marquee">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="text-sm font-medium text-stone-500">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Herken je dit? (pain points) */}
      <section className="py-20 md:py-28 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-left mb-12 md:mb-16 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('painPoints.eyebrow')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-stone-900 tracking-tight">
              {t('painPoints.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {painPointConfig.map((point) => (
              <div key={point.id} className="border-t border-stone-300 pt-6">
                <span className="text-xs font-bold tracking-[0.15em] text-stone-400">{point.n}</span>
                <p className="mt-4 text-lg md:text-xl text-stone-800 font-light leading-snug">{t(`painPoints.items.${point.id}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Specialty (Four Pillars) */}
      <section id="diensten" className="pt-28 pb-20 md:pt-48 md:pb-32 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-left mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('services.eyebrow')}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-medium text-stone-900 mb-6 md:mb-8 tracking-tight">
              {t('services.heading')}
            </h2>
            <p className="text-base md:text-xl text-stone-600 max-w-3xl font-light leading-relaxed">{t('services.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {serviceConfig.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group border border-stone-200 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-linear-to-br group-hover:from-glow-from group-hover:to-glow-to transition-colors duration-500">
                    <service.icon className="w-7 h-7 md:w-8 md:h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-stone-900 mb-4">{t(`services.items.${service.id}.title`)}</h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-8 font-light">
                    {t(`services.items.${service.id}.desc`)}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {tRaw<string[]>(`services.items.${service.id}.bullets`).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-stone-700">
                        <CheckCircle2 className="w-5 h-5 text-stone-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="inline-block bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1.5 rounded-full">{t(`services.items.${service.id}.price`)}</span>
                    <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 border border-stone-900 px-4 py-2 rounded-xl hover:bg-linear-to-r hover:from-glow-from hover:to-glow-to hover:border-transparent hover:text-white transition-all duration-300">
                      {t('services.ctaLabel')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Supabase Integratie */}
      <section id="supabase" className="py-20 md:py-32 bg-stone-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 md:p-16">
            <div className="text-left mb-12 md:mb-16 max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-stone-900"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('supabase.eyebrow')}</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-stone-900 mb-6 tracking-tight">
                {t('supabase.heading')}
              </h2>
              <p className="text-base md:text-xl text-stone-600 font-light leading-relaxed">
                {t('supabase.subheading')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {supabaseFeatureConfig.map((feature) => (
                <div key={feature.id}>
                  <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-stone-900" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-stone-900 mb-2">{t(`supabase.items.${feature.id}.title`)}</h3>
                  <p className="text-sm text-stone-600 font-light leading-relaxed">{t(`supabase.items.${feature.id}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Hoe het werkt (Process) / Over ons */}
      <section id="over-ons" className="pt-28 pb-20 md:pt-48 md:pb-32 bg-ink text-stone-300">
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
                <span className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase">{t('process.eyebrow')}</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-medium text-white leading-tight tracking-tight">
                {t('process.heading')}
              </h2>
            </div>
            <div className="lg:pt-32">
              <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed max-w-sm">
                {t('process.subheading')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {processConfig.map((step) => (
              <div key={step.id} className="relative">
                <div className="border-t border-stone-800 pt-8">
                  <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase mb-4">{t(`process.items.${step.id}.title`)}</h3>
                  <p className="text-stone-400 font-light leading-relaxed text-sm md:text-base">
                    {t(`process.items.${step.id}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Reviews (Social Proof) */}
      <section id="over-ons" className="py-20 md:py-32 bg-stone-50">
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
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('reviews.eyebrow')}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-medium text-stone-900 mb-6 md:mb-8 tracking-tight">
              {t('reviews.heading')}
            </h2>
            <p className="text-base md:text-xl text-stone-600 max-w-3xl font-light leading-relaxed">{t('reviews.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {reviewConfig.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-2">
                <div className="flex-grow">
                  <div className="flex text-stone-800 mb-6 gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">"{t(`reviews.items.${review.id}.quote`)}"</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">{review.name}</p>
                    <p className="text-stone-500 text-sm">{t(`reviews.items.${review.id}.role`)}, {review.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Garanties (risk reversal) */}
      <section className="py-20 md:py-28 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-left mb-12 md:mb-16 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('guarantees.eyebrow')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-stone-900 tracking-tight">
              {t('guarantees.heading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {guaranteeConfig.map((g) => (
              <div key={g.id} className="bg-stone-50 rounded-3xl p-6 md:p-8 border border-stone-200">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <g.icon className="w-6 h-6 text-stone-900" />
                </div>
                <h3 className="font-display text-lg font-medium text-stone-900 mb-2">{t(`guarantees.items.${g.id}.title`)}</h3>
                <p className="text-sm text-stone-600 font-light leading-relaxed">{t(`guarantees.items.${g.id}.desc`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="pt-28 pb-20 md:pt-48 md:pb-32 bg-ink">
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
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">{t('faq.eyebrow')}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight">
              {t('faq.heading')}
            </h2>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          <div className="border border-stone-800 rounded-sm divide-y divide-stone-800 bg-transparent">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-white/5"
                >
                  <span className="font-display text-stone-200 text-lg md:text-xl">{faq.q}</span>
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
      <section id="contact" className="pt-28 pb-20 md:pt-48 md:pb-32 bg-stone-50 relative overflow-hidden scroll-mt-0">
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
                <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">{t('nav.contact')}</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-stone-900 mb-4 md:mb-6 tracking-tight">
                {t('contactForm.heading')}
              </h2>
              <p className="text-stone-600 text-base md:text-xl font-light leading-relaxed">{t('contactForm.subheading')}</p>
            </div>

            {!isFormSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                {/* Honeypot: display:none zorgt dat Playwright-achtige tools (die .fill() vereist zichtbaarheid)
                    dit veld niet kunnen invullen, terwijl echte gebruikers het nooit zien. */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.name')}
                    </label>
                    <input type="text" required value={formData.naam} onChange={e => setFormData({ ...formData, naam: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-glow-to focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder={t('contactForm.placeholders.name')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.email')}
                    </label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-glow-to focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder={t('contactForm.placeholders.email')} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.company')}
                  </label>
                  <input type="text" required value={formData.bedrijf} onChange={e => setFormData({ ...formData, bedrijf: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-glow-to focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder={t('contactForm.placeholders.company')} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-stone-400" /> {t('contactForm.labels.challenge')}
                  </label>
                  <textarea rows={4} required value={formData.uitdaging} onChange={e => setFormData({ ...formData, uitdaging: e.target.value })} className="w-full px-4 py-3.5 rounded-md border border-stone-200 focus:ring-2 focus:ring-glow-to focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400 resize-none" placeholder={t('contactForm.placeholders.challenge')}></textarea>
                </div>

                <button type="submit" disabled={isFormLoading} className="w-full bg-linear-to-r from-glow-from to-glow-to hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 text-white font-semibold py-3 sm:py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base mt-4 sm:mt-8 shadow-md">
                  {isFormLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contactForm.sending')}
                    </>
                  ) : (
                    <>
                      {t('contactForm.submit')}
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
                <div className="w-16 h-16 bg-linear-to-r from-glow-from to-glow-to text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-medium text-stone-900 tracking-tight">
                  {t('contactForm.thanksHeading')}
                </h3>
                <p className="text-lg md:text-xl text-stone-600 max-w-lg font-light py-4">
                  {t('contactForm.thanksBody')}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
