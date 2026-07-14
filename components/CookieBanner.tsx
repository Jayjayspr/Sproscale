"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:w-[420px] z-[100] bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-5 sm:p-6"
        >
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            Wij gebruiken cookies voor een optimale ervaring. Lees ons{' '}
            <Link href="/privacy" className="text-stone-900 font-medium underline underline-offset-2 hover:text-stone-600 transition-colors">
              privacybeleid
            </Link>.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Accepteren
            </button>
            <button
              onClick={handleDecline}
              className="text-sm font-medium text-stone-500 hover:text-stone-900 underline underline-offset-2 transition-colors"
            >
              Weigeren
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
