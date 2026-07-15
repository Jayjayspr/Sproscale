"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Language } from './translations';

const STORAGE_KEY = 'sproscale-language';
const DEFAULT_LANGUAGE: Language = 'nl';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Haalt een vertaalde string op via een 'sectie.key' pad, bv. t('hero.titleLine1'). Valt terug op het pad zelf als de key ontbreekt. */
  t: (path: string) => string;
  /** Haalt een niet-string vertaling op (array/object), bv. tRaw<Faq[]>('faq.items'). Gebruik voor lijsten en geneste structuren. */
  tRaw: <T = unknown>(path: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'nl' || stored === 'en') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (path: string): string => {
      const value = resolvePath(translations[language], path);
      return typeof value === 'string' ? value : path;
    },
    [language]
  );

  const tRaw = useCallback(
    <T,>(path: string): T => resolvePath(translations[language], path) as T,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tRaw }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage moet binnen een <LanguageProvider> gebruikt worden');
  }
  return context;
}
