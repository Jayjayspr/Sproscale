"use client";

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { Language } from '../lib/i18n/translations';

const OPTIONS: { code: Language; labelKey: 'nl' | 'en' }[] = [
  { code: 'nl', labelKey: 'nl' },
  { code: 'en', labelKey: 'en' },
];

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase text-stone-950 hover:bg-stone-100 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{language}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="listbox"
            className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {OPTIONS.map((option) => {
              const isActive = option.code === language;
              return (
                <button
                  key={option.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(option.code)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-stone-950 hover:bg-stone-50 transition-colors"
                >
                  <span className={isActive ? 'font-medium' : 'font-normal text-stone-600'}>
                    {t(`languageSelector.${option.labelKey}`)}
                  </span>
                  {isActive && <Check className="w-4 h-4 text-stone-950" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
