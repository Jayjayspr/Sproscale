"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Sproscale kennisbank — wordt later vervangen door /api/chat (Claude SDK)
const SPROSCALE_CONTEXT: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['wie zijn jullie', 'wat doen jullie', 'wat is sproscale', 'over sproscale', 'vertel meer'],
    answer:
      'Sproscale is een agency die bedrijven helpt schalen via high-end websites, lead generatie en marketing automatisering. Wij bouwen de systemen die jouw bedrijf laten groeien — professioneel en resultaatgericht.',
  },
  {
    keywords: ['diensten', 'wat bieden jullie', 'wat kunnen jullie', 'aanbod', 'services'],
    answer:
      'Wij bieden drie kerndiensten:\n\n1. **Website Bouw** — Razendsnel en modern, gebouwd met Next.js.\n2. **Onboarding Systemen** — Automatiseer je klantinstroom van A tot Z.\n3. **Lead Generatie & Marketing** — Meta & Google Ads gericht op echte ROI.\n\nWil je meer weten over een specifieke dienst?',
  },
  {
    keywords: ['website', 'next.js', 'webdesign', 'webdevelopment', 'web'],
    answer:
      'Onze websites worden gebouwd met Next.js — snel, schaalbaar en modern. We ontwerpen op maat, gericht op conversie en merkuitstraling. Interesse? Vul het contactformulier op de pagina in voor een vrijblijvend gesprek.',
  },
  {
    keywords: ['onboarding', 'klantinstroom', 'automatisering', 'automatiseren', 'systeem'],
    answer:
      'Met onze onboarding systemen automatiseer je de volledige klantinstroom — van eerste contact tot actieve klant. Minder handmatig werk, meer schaalbaarheid. Neem contact op via het formulier op de pagina voor een gratis strategiegesprek.',
  },
  {
    keywords: ['leads', 'lead generatie', 'advertenties', 'ads', 'meta', 'google', 'marketing'],
    answer:
      'We zetten gerichte campagnes op via Meta en Google Ads, volledig gefocust op ROI. Geen vaag bereik, maar gekwalificeerde leads die converteren. Wil je weten wat dit voor jouw bedrijf kan betekenen? Stuur een bericht via het contactformulier.',
  },
  {
    keywords: ['prijs', 'kosten', 'wat kost', 'offerte', 'tarief', 'investering'],
    answer:
      'Onze starttarieven:\n\n• Website — vanaf €999\n• Meta Ads — vanaf €499/maand\n• AI Chatbot — vanaf €249\n\nWil je een offerte op maat? Vul het contactformulier in op de pagina en we komen snel bij je terug.',
  },
  {
    keywords: ['contact', 'afspraak', 'gesprek', 'bereiken', 'bellen', 'mailen', 'strategie'],
    answer:
      'Je kunt ons bereiken via het contactformulier op de pagina. Een strategiegesprek is altijd gratis en vrijblijvend. We reageren binnen 24 uur.',
  },
  {
    keywords: ['gratis', 'vrijblijvend', 'kennismaking'],
    answer:
      'Ja, een strategiegesprek met Sproscale is altijd gratis en vrijblijvend. Vul het contactformulier in op de pagina en we nemen snel contact op.',
  },
];

const FALLBACK_REPLY =
  'Goeie vraag! Voor een specifiek antwoord kun je het beste het contactformulier op de pagina invullen — dan neemt Jay persoonlijk contact met je op. Een strategiegesprek is altijd gratis.';

async function sendMessage(messages: Message[]): Promise<string> {
  // TODO: vervang door echte Claude SDK koppeling:
  // const res = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messages }),
  // });
  // const data = await res.json();
  // return data.reply;

  const lastUserMessage = messages.filter((m) => m.role === 'user').at(-1)?.content ?? '';
  const normalized = lastUserMessage.toLowerCase();

  await new Promise((resolve) => setTimeout(resolve, 500));

  const match = SPROSCALE_CONTEXT.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw))
  );

  return match?.answer ?? FALLBACK_REPLY;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hallo met Jay van Sproscale. Hoe kan ik je vandaag helpen?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await sendMessage(updatedMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Er is iets misgegaan. Probeer het opnieuw.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat venster */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-stone-900 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">Sproscale AI</p>
                <p className="text-stone-400 text-xs">Altijd beschikbaar</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white transition-colors"
              aria-label="Sluit chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Berichten */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 bg-stone-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-stone-900 text-white rounded-br-sm'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <Loader2 className="w-4 h-4 text-stone-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-stone-200 bg-white flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Stel een vraag..."
              disabled={isLoading}
              className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 outline-none focus:border-stone-900 transition-colors text-stone-900 placeholder:text-stone-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 bg-stone-900 hover:bg-stone-700 disabled:bg-stone-300 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
              aria-label="Verstuur bericht"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle knop */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-stone-900 hover:bg-stone-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        aria-label={isOpen ? 'Sluit chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
