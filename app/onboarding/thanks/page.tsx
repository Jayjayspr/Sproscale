"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Rocket, ArrowRight, Zap, Target, Star } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingThanksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial gradients to give "Anti Gravity" feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-stone-900/30 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[150px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-500 scale-150"></div>
            <div className="w-24 h-24 bg-white text-stone-900 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] relative">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            {/* Orbiting element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] pointer-events-none"
            >
              <div className="absolute top-0 right-0 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-6xl font-serif tracking-tight mb-6"
        >
          Successvol <span className="text-stone-400 italic">geïnitieerd.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl md:text-2xl text-stone-400 font-light mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Welkom bij de toekomst van marketing. <br className="hidden md:block" />
          <span className="text-white">We spreken je snel!</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Zap, label: "AI Config", detail: "Direct actief" },
            { icon: Target, label: "Ads Review", detail: "Binnen 24u" },
            { icon: Star, label: "VIP Support", detail: "Prioriteit" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm group hover:bg-white/10 transition-colors">
              <item.icon className="w-6 h-6 text-stone-500 mb-3 mx-auto group-hover:text-white transition-colors" />
              <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">{item.label}</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-tighter">{item.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-stone-900 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
          >
            Terug naar Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle brand mark */}
      <div className="absolute bottom-10 left-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 vertical-writing pointer-events-none hidden md:block">
        SPROSCALE SYSTEM v0.1.0
      </div>
    </div>
  );
}
