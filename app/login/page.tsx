"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Loader2, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Ongeldige inloggegevens. Controleer uw e-mail en wachtwoord.");
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-200/50 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-stone-950 uppercase mb-6">Sproscale</h1>
          <div className="w-12 h-[1px] bg-stone-300 mb-4"></div>
          <p className="text-stone-500 font-bold tracking-widest text-xs uppercase">Beheer Login</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-xl space-y-8">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm text-center"
            >
              {errorMsg}
            </motion.div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl pl-12 pr-4 py-4 text-stone-900 outline-none transition-all placeholder:text-stone-400"
                  placeholder="uw@email.nl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-widest ml-1">Wachtwoord</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-stone-900 focus:ring-0 rounded-xl pl-12 pr-4 py-4 text-stone-900 outline-none transition-all placeholder:text-stone-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-950 hover:bg-stone-800 disabled:bg-stone-200 text-white disabled:text-stone-400 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            ) : (
              <>
                <span className="tracking-widest uppercase text-sm">Inloggen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-stone-400 text-[10px] tracking-widest uppercase font-bold">Sproscale © {new Date().getFullYear()} — Systeemtoegang</p>
        </div>
      </motion.div>
    </div>
  );
}
