"use client";

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AfspraakPage() {
  useEffect(() => {
    const existingScript = document.getElementById('calendly-script');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.id = 'calendly-script';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('calendly-script');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>

        <div className="bg-white rounded-[2rem] p-6 md:p-12 border border-stone-200 shadow-xl relative overflow-hidden transition-all duration-500 min-h-[750px] flex flex-col items-center">
          <div className="text-center mb-6 w-full">
            <h1 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tight">
              Kies uw moment.
            </h1>
          </div>

          <div
            className="calendly-inline-widget w-full"
            data-url="https://calendly.com/jay-sprock00/30min?text_color=0f172a&primary_color=000000&hide_gdpr_banner=1"
            style={{ minWidth: "320px", height: "700px" }}
          ></div>

        </div>
      </motion.div>
    </main>
  );
}
