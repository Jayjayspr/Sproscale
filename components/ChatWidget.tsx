"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('• ')) {
      const inner = line.slice(2);
      return (
        <li key={i} className="flex gap-2 items-baseline">
          <span className="mt-1 w-1 h-1 rounded-full bg-current shrink-0 opacity-50" />
          <span>{formatInline(inner)}</span>
        </li>
      );
    }
    if (line.trim() === '') return <br key={i} />;
    return <p key={i}>{formatInline(line)}</p>;
  });
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
      : part
  );
}

// Sproscale kennisbank — wordt later vervangen door /api/chat (Claude SDK)
const SPROSCALE_CONTEXT: { keywords: string[]; answer: string }[] = [
  // --- Bedrijf ---
  {
    keywords: ['wie zijn jullie', 'wat doen jullie', 'wat is sproscale', 'over sproscale', 'vertel meer', 'vertel iets'],
    answer:
      'Sproscale is een agency die bedrijven helpt schalen via high-end websites, lead generatie en marketing automatisering. Wij bouwen de systemen die jouw bedrijf laten groeien — professioneel en resultaatgericht.',
  },
  {
    keywords: ['diensten', 'wat bieden jullie', 'wat kunnen jullie', 'aanbod', 'services', 'wat maken jullie'],
    answer:
      'Wij bieden vier kerndiensten:\n\n• **Web Design** — High-end Next.js websites.\n• **Marketing** — Meta & Google Ads beheer.\n• **AI Automations** — Chatbots & workflow automatisering.\n• **Consultancy** — Strategisch advies voor schalen.\n\nWil je meer weten over een specifieke dienst?',
  },

  // --- Website kosten ---
  {
    keywords: ['kosten website', 'prijs website', 'wat kost een website', 'hoeveel kost een website', 'website bouwen kosten', 'website laten maken'],
    answer:
      'Een high-end website bij Sproscale begint bij **€ 999**.\n\n• Gebouwd met **Next.js** — razendsnel en schaalbaar.\n• Op maat ontworpen, gericht op conversie.\n• Inclusief mobiele optimalisatie.\n\nZal ik een afspraak voor je inplannen om de details te bespreken?',
  },

  // --- Marketing / Ads kosten ---
  {
    keywords: ['kosten marketing', 'prijs ads', 'wat kost adverteren', 'hoeveel kost meta ads', 'google ads kosten', 'prijs campagne', 'advertentie kosten'],
    answer:
      'Meta & Google Ads beheer bij Sproscale begint bij **€ 499 per maand** (exclusief advertentiebudget).\n\n• Volledig beheer van je campagnes.\n• Gefocust op **gekwalificeerde leads**, niet alleen bereik.\n• Maandelijkse rapportage.\n\nZal ik een afspraak voor je inplannen om de details te bespreken?',
  },

  // --- AI / Chatbot kosten ---
  {
    keywords: ['kosten chatbot', 'prijs ai', 'wat kost een chatbot', 'hoeveel kost automatisering', 'ai chatbot kosten', 'workflow kosten', 'automatisering kosten'],
    answer:
      'Een custom AI chatbot of workflow automatisering begint bij **€ 249** (eenmalig).\n\n• Volledig op maat voor jouw bedrijf.\n• Gekoppeld aan je eigen kennisbank of CRM.\n• Zoals de chatbot die je nu gebruikt!\n\nZal ik een afspraak voor je inplannen om de details te bespreken?',
  },

  // --- Consultancy kosten ---
  {
    keywords: ['kosten consultancy', 'prijs advies', 'wat kost een gesprek', 'strategiegesprek kosten', 'advies kosten'],
    answer:
      'Strategisch advies en consultancy is **op aanvraag** — het eerste gesprek is altijd **gratis en vrijblijvend**.\n\nTijdens dat gesprek kijken we samen naar jouw situatie en wat de beste aanpak is om te schalen.\n\nZal ik een afspraak voor je inplannen?',
  },

  // --- Algemene prijsvraag ---
  {
    keywords: ['prijs', 'kosten', 'wat kost', 'hoeveel', 'offerte', 'tarief', 'tarieven', 'investering', 'budget'],
    answer:
      'Onze diensten en tarieven:\n\n• **Web Design** — High-end Next.js websites. Vanaf **€ 999**.\n• **Marketing** — Meta & Google Ads beheer. Vanaf **€ 499 /mnd**.\n• **AI Automations** — Custom chatbots & workflow automatisering. Vanaf **€ 249**.\n• **Consultancy** — Strategisch advies voor schalen. **Op aanvraag** (eerste gesprek gratis).\n\nZal ik een afspraak voor je inplannen om de details te bespreken?',
  },

  // --- Specifieke diensten ---
  {
    keywords: ['website', 'next.js', 'webdesign', 'webdevelopment', 'web', 'landingspagina', 'landing page'],
    answer:
      'Onze websites worden gebouwd met **Next.js** — snel, schaalbaar en modern. We ontwerpen op maat, gericht op conversie en merkuitstraling.\n\nBeginprijs: **€ 999**. Vul het contactformulier in voor een vrijblijvend gesprek.',
  },
  {
    keywords: ['onboarding', 'klantinstroom', 'automatisering', 'automatiseren', 'systeem', 'workflow'],
    answer:
      'Met onze onboarding systemen automatiseer je de volledige klantinstroom — van eerste contact tot actieve klant. Minder handmatig werk, meer schaalbaarheid.\n\nNeem contact op via het formulier voor een gratis strategiegesprek.',
  },
  {
    keywords: ['leads', 'lead generatie', 'advertenties', 'ads', 'meta', 'google', 'marketing', 'campagne'],
    answer:
      'We zetten gerichte campagnes op via **Meta en Google Ads**, volledig gefocust op ROI. Geen vaag bereik, maar gekwalificeerde leads die converteren.\n\nBeginprijs: **€ 499 /mnd** (excl. advertentiebudget). Stuur een bericht via het contactformulier.',
  },
  {
    keywords: ['chatbot', 'ai automations', 'automatisering', 'bot', 'integratie', 'crm'],
    answer:
      'We bouwen custom AI chatbots en workflow automatiseringen — zoals de chatbot die je nu gebruikt.\n\nBeginprijs: **€ 249** (eenmalig). Interesse? Vul het contactformulier in.',
  },

  // --- Levertijd / planning ---
  {
    keywords: ['hoe lang duurt', 'levertijd', 'wanneer klaar', 'doorlooptijd', 'planning', 'timeline'],
    answer:
      'Dit hangt af van het project:\n\n• **Website** — gemiddeld 2 tot 4 weken.\n• **AI Chatbot** — gemiddeld 1 tot 2 weken.\n• **Ads campagne** — live binnen 5 werkdagen.\n\nWil je een concrete planning? Vul het contactformulier in en we bespreken het.',
  },

  // --- Ervaring / referenties ---
  {
    keywords: ['ervaring', 'referenties', 'portfolio', 'voorbeelden', 'klanten', 'cases', 'resultaten'],
    answer:
      'Sproscale werkt met B2B bedrijven die serieus willen schalen. We focussen op meetbare resultaten — niet op mooie praatjes.\n\nVoor concrete voorbeelden en cases kun je het beste even contact opnemen via het formulier op de pagina.',
  },

  // --- Verschil met anderen ---
  {
    keywords: ['waarom sproscale', 'verschil', 'beter dan', 'waarom jullie', 'onderscheid', 'uniek'],
    answer:
      'Wij combineren drie dingen die de meeste bureaus los aanbieden:\n\n• **High-end design** — geen templates, alles op maat.\n• **AI & Automatisering** — we bouwen systemen die blijven werken.\n• **Performance marketing** — gefocust op ROI, niet bereik.\n\nKort gezegd: wij bouwen de motor én zorgen voor de brandstof.',
  },

  // --- Contact / afspraak ---
  {
    keywords: ['contact', 'afspraak', 'gesprek', 'bereiken', 'bellen', 'mailen', 'inplannen'],
    answer:
      'Je kunt ons bereiken via het **contactformulier op de pagina**. Een strategiegesprek is altijd gratis en vrijblijvend. We reageren binnen 24 uur.',
  },
  {
    keywords: ['gratis', 'vrijblijvend', 'kennismaking', 'eerste gesprek'],
    answer:
      'Ja, het eerste strategiegesprek met Sproscale is altijd **gratis en vrijblijvend**. Vul het contactformulier in op de pagina en we nemen snel contact op.',
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
                  <ul className="space-y-1">{renderContent(msg.content)}</ul>
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
