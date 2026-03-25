"use client";

import React from 'react';
import { ArrowRight, ArrowDown, CheckCircle2, TrendingUp, Mail, User, Building, MessageSquare, Briefcase, Target, Monitor, Bot } from 'lucide-react';
import { motion } from 'motion/react';

export default function SproscaleLandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-xl tracking-tight text-stone-900">SPROSCALE</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#diensten" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Diensten</a>
            <a href="#reviews" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Reviews</a>
            <a href="#contact" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 overflow-hidden relative flex flex-col items-center text-center">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-stone-200/50 rounded-full blur-[120px] pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-800 text-sm font-medium mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-stone-900 animate-pulse"></span>
              B2B Growth Agency
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-stone-900 leading-[1.05] tracking-tight mb-8">
              Schaal uw bedrijf <br className="hidden md:block" />
              <span className="text-stone-500 italic">gekwalificeerd</span> op.
            </h1>
            
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl leading-relaxed font-light">
              Wij combineren strategische consultancy, high-end webdesign, marketing en AI-automations om uw bedrijf duurzaam te laten groeien.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
              <a href="#contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-medium px-8 py-4 rounded-full transition-all duration-300 group shadow-md text-lg">
                Neem contact op
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#diensten" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white hover:bg-stone-50 hover:scale-105 text-stone-900 border border-stone-200 font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-sm text-lg">
                Bekijk diensten
              </a>
            </div>
            
            {/* Dashboard/Visual mockup below */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-20 w-full max-w-5xl relative"
            >
              <div className="aspect-auto md:aspect-[16/9] bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden relative flex items-center justify-center p-8 md:p-12 group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,25,23,0.03)_0%,transparent_100%)]"></div>
                 
                 {/* Sales Funnel UI */}
                 <div className="relative w-full max-w-2xl flex flex-col items-center gap-3 md:gap-4 z-10">
                    
                    {/* Layer 1: Traffic */}
                    <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 md:p-6 flex items-center justify-between relative transition-transform duration-500 hover:scale-[1.02] shadow-sm">
                       <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center shadow-sm hidden sm:flex">
                           <Monitor className="w-5 h-5 text-stone-600" />
                         </div>
                         <div className="text-left">
                           <p className="text-sm md:text-base font-bold text-stone-900">Website Traffic</p>
                           <p className="text-xs text-stone-500">Organisch & Paid</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-lg md:text-xl font-black text-stone-900">12.500</p>
                         <p className="text-xs text-stone-500 font-medium">Bezoekers</p>
                       </div>
                    </div>

                    <ArrowDown className="w-5 h-5 text-stone-300" />

                    {/* Layer 2: Leads */}
                    <div className="w-[90%] md:w-[85%] bg-stone-100 border border-stone-200 rounded-xl p-4 md:p-6 flex items-center justify-between relative transition-transform duration-500 hover:scale-[1.02] shadow-sm">
                       <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center shadow-sm hidden sm:flex">
                           <Target className="w-5 h-5 text-stone-700" />
                         </div>
                         <div className="text-left">
                           <p className="text-sm md:text-base font-bold text-stone-900">Gekwalificeerde Leads</p>
                           <p className="text-xs text-stone-600">B2B Prospects</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-lg md:text-xl font-black text-stone-900">850</p>
                         <p className="text-xs text-stone-600 font-medium">6.8% Conv.</p>
                       </div>
                    </div>

                    <ArrowDown className="w-5 h-5 text-stone-400" />

                    {/* Layer 3: Calls */}
                    <div className="w-[80%] md:w-[70%] bg-stone-200 border border-stone-300 rounded-xl p-4 md:p-6 flex items-center justify-between relative transition-transform duration-500 hover:scale-[1.02] shadow-sm">
                       <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center shadow-sm hidden sm:flex">
                           <MessageSquare className="w-5 h-5 text-stone-800" />
                         </div>
                         <div className="text-left">
                           <p className="text-sm md:text-base font-bold text-stone-900">Sales Calls</p>
                           <p className="text-xs text-stone-700">Ingepland</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-lg md:text-xl font-black text-stone-900">142</p>
                         <p className="text-xs text-stone-700 font-medium">16.7% Conv.</p>
                       </div>
                    </div>

                    <ArrowDown className="w-5 h-5 text-stone-500" />

                    {/* Layer 4: Customers */}
                    <div className="w-[70%] md:w-[55%] bg-stone-900 border border-stone-800 rounded-xl p-4 md:p-6 flex items-center justify-between relative transition-transform duration-500 hover:scale-[1.05] shadow-xl">
                       <div className="flex items-center gap-3 md:gap-4">
                         <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center shadow-inner hidden sm:flex">
                           <Briefcase className="w-5 h-5 text-white" />
                         </div>
                         <div className="text-left">
                           <p className="text-sm md:text-base font-bold text-white">Nieuwe Klanten</p>
                           <p className="text-xs text-stone-400">Gesloten Deals</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-xl md:text-2xl font-black text-white">38</p>
                         <p className="text-xs text-green-400 font-medium">+24% MRR</p>
                       </div>
                       
                       {/* Floating badge for extra flair */}
                       <div className="absolute -right-4 md:-right-12 -top-4 md:-top-6 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-stone-200 shadow-lg flex items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-xs font-bold text-stone-900">ROI 450%</span>
                       </div>
                    </div>

                 </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Specialty (Four Pillars) */}
        <section id="diensten" className="py-24 bg-stone-100 border-y border-stone-200">
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
                <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Onze Diensten — 01</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 tracking-tight">
                Onze <span className="text-stone-500 italic">Specialiteiten.</span>
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl font-light leading-relaxed">Een integrale aanpak voor uw online succes. Wij bieden de expertise die nodig is om uw bedrijf naar het volgende niveau te tillen.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1: Consultancy */}
              <div className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                    <Briefcase className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-stone-900 mb-4">Consultancy</h3>
                  <p className="text-stone-600 leading-relaxed mb-8 font-light">
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
              <div className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                    <Target className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-stone-900 mb-4">Marketing</h3>
                  <p className="text-stone-600 leading-relaxed mb-8 font-light">
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
              <div className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                    <Monitor className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-stone-900 mb-4">Web Design & Development</h3>
                  <p className="text-stone-600 leading-relaxed mb-8 font-light">
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
              <div className="bg-white rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 group border border-stone-200 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                    <Bot className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl font-serif text-stone-900 mb-4">AI Automations</h3>
                  <p className="text-stone-600 leading-relaxed mb-8 font-light">
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

        {/* Reviews (Social Proof) */}
        <section id="reviews" className="py-24 bg-stone-50">
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
                <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Reviews — 02</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-stone-900 mb-8 tracking-tight">
                Bewezen <span className="text-stone-500 italic">Resultaat.</span>
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl font-light leading-relaxed">Wat onze partners zeggen over de samenwerking met SPROSCALE.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Pieter van der Berg", role: "CEO", company: "TechFlow Solutions", quote: "Sinds de lancering van ons nieuwe platform zien we 30% meer gekwalificeerde aanvragen in slechts 3 maanden." },
                { name: "Sarah de Vries", role: "Marketing Director", company: "Innovate B2B", quote: "De leadgeneratie systemen van SPROSCALE hebben onze sales cycle met weken verkort. Top kwaliteit leads." },
                { name: "Johan Klaassen", role: "Founder", company: "DataSync", quote: "Eindelijk een bureau dat snapt dat een website moet verkopen. De technische optimalisatie is ongekend." }
              ].map((review, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-stone-200 flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-2">
                  <div className="flex-grow">
                    <div className="flex text-stone-800 mb-6 gap-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
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

        {/* Contact (Lead Capture) */}
        <section id="contact" className="py-24 bg-stone-100 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-stone-200/50 rounded-full blur-[100px] pointer-events-none"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl relative overflow-hidden">
              
              <div className="text-left mb-10 mt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-stone-900"></div>
                  <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Contact — 03</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 tracking-tight">
                  Klaar om te <span className="text-stone-500 italic">schalen?</span>
                </h2>
                <p className="text-stone-600 text-xl font-light leading-relaxed">Laat uw gegevens achter en wij nemen binnen 24 uur contact op voor een vrijblijvend strategiegesprek.</p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-stone-400"/> Naam
                    </label>
                    <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="Uw volledige naam" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-stone-400"/> Zakelijk E-mail
                    </label>
                    <input type="email" className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="naam@bedrijf.nl" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-stone-400"/> Bedrijf
                  </label>
                  <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400" placeholder="Bedrijfsnaam" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-stone-400"/> Uw Groeiuitdaging
                  </label>
                  <textarea rows={4} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400 resize-none" placeholder="Waar loopt u momenteel tegenaan in uw acquisitie?"></textarea>
                </div>
                
                <button type="button" className="w-full bg-stone-900 hover:bg-stone-800 hover:scale-[1.02] text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg mt-8 shadow-md">
                  Vraag Een Strategiegesprek Aan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl tracking-tight text-white">SPROSCALE</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
              <a href="#diensten" className="hover:text-white transition-colors">Diensten</a>
              <a href="#reviews" className="hover:text-white transition-colors">Over Ons</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 SPROSCALE - Architecting Growth Systems</p>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/50 border border-stone-700">
              <span className="w-2 h-2 rounded-full bg-stone-300 animate-pulse"></span>
              <span className="text-stone-300">Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
