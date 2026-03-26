"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone, User, Building, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Column: Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-stone-900"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Contact — 04</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-stone-900 mb-8 tracking-tight leading-[1.1]">
              Laten we <br/>
              <span className="text-stone-500 italic">praten.</span>
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed mb-12 max-w-md">
              Klaar om uw bedrijf gekwalificeerd op te schalen? Neem contact met ons op voor een vrijblijvend strategiegesprek.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <Mail className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">E-mail</h3>
                  <p className="text-stone-600 font-light">hello@sproscale.nl</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <Phone className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Telefoon</h3>
                  <p className="text-stone-600 font-light">+31 (0)20 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 shrink-0">
                  <MapPin className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Kantoor</h3>
                  <p className="text-stone-600 font-light">Zuidas 123<br/>1082 AB Amsterdam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl relative overflow-hidden">
            <h3 className="text-3xl font-serif text-stone-900 mb-8">Stuur een bericht</h3>
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
                <textarea rows={5} className="w-full px-4 py-3.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all bg-stone-50 text-stone-900 placeholder:text-stone-400 resize-none" placeholder="Waar loopt u momenteel tegenaan in uw acquisitie?"></textarea>
              </div>
              
              <button type="button" className="w-full bg-stone-900 hover:bg-stone-800 hover:scale-[1.02] text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-lg mt-8 shadow-md">
                Verstuur Bericht
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
