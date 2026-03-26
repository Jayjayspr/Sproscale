"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:w-[400px] z-[100] bg-white border border-stone-200 shadow-2xl rounded-2xl p-6"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-serif text-xl font-medium text-stone-900">Cookiebeleid</h3>
            <button 
              onClick={handleDecline} 
              className="text-stone-400 hover:text-stone-900 transition-colors p-1"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
            Wij gebruiken cookies om uw ervaring te verbeteren, websitestatistieken te analyseren en onze diensten te optimaliseren. Lees meer in ons{' '}
            <Link href="/privacy" className="text-stone-900 font-medium underline underline-offset-2 hover:text-stone-600 transition-colors">
              privacybeleid
            </Link>.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Accepteren
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-stone-50 hover:bg-stone-100 text-stone-900 text-sm font-medium py-2.5 rounded-lg transition-colors border border-stone-200"
            >
              Weigeren
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
