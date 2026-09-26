'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';
import type { Translations } from '@/lib/i18n';

interface LedgerEntry {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

const STORAGE_KEY = 'kp_ledger';

const demoEntries: LedgerEntry[] = [
  { id: 1, type: 'income', category: 'catCropSale', amount: 15000, description: 'Sold wheat at local mandi', date: '2025-01-15' },
  { id: 2, type: 'expense', category: 'catFertilizer', amount: 3200, description: 'NPK fertilizer for Rabi season', date: '2025-01-10' },
  { id: 3, type: 'expense', category: 'catLabour', amount: 5000, description: 'Harvesting labour charges', date: '2025-01-14' },
  { id: 4, type: 'income', category: 'catCropSale', amount: 8500, description: 'Sold onion at market', date: '2025-01-18' },
];

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function BackButton({ target, label }: { target: string; label: string }) {
  const { navigate } = useApp();
  return (
    <button onClick={() => navigate(target as any)} className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-green-50">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      {label}
    </button>
  );
}

const categoryOptions = ['catLabour', 'catFertilizer', 'catSeeds', 'catPesticides', 'catIrrigation', 'catTransport', 'catCropSale', 'catOther'] as const;

function getCategoryLabel(key: string, t: Translations): string {
  const map: Record<string, string> = {
    catLabour: t.catLabour,
    catFertilizer: t.catFertilizer,
    catSeeds: t.catSeeds,
    catPesticides: t.catPesticides,
    catIrrigation: t.catIrrigation,
    catTransport: t.catTransport,
    catCropSale: t.catCropSale,
    catOther: t.catOther,
  };
  return map[key] || key;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

interface VoiceParseResult {
  amount: string;
  type: 'income' | 'expense';
  description: string;
  category: string;
}

function parseVoiceCommand(text: string): VoiceParseResult {
  // Remove ₹ symbol if present
  const cleaned = text.replace(/[₹\s]/g, ' ').trim();

  // Extract the first number found (digits only)
  const numberMatch = cleaned.match(/\d+/);
  const amountStr = numberMatch ? numberMatch[0] : '0';

  // Remove the number (and ₹) from text to build description
  let description = text.replace(/[₹]/g, '').replace(/\d+/, '').trim();
  // Remove leading/trailing whitespace and common filler words
  description = description.replace(/^(rupees|rupaye|rs)\s*/i, '').trim();

  // Detect income vs expense
  const expenseKeywords = ['gives', 'given', 'paid', 'kharcha', 'खर्च', 'de diya', 'dediye', 'bheja', 'for', 'ke liye', 'wages', 'cost', 'spend', 'spent', 'bought', 'kharida', 'kharid', 'to labour', 'to workers', 'diya', 'deta', 'deti', 'debit', 'expense'];
  const incomeKeywords = ['received', 'mil gaya', 'mila', 'milne', 'earned', 'sold', 'sale', 'becha', 'bech', 'income', 'aya', 'aaya', 'from mandi', 'from market', 'credit', 'profit', 'mila mandi', 'milne ka', 'paise aaye', 'paisa aaya', 'fasal bechi', 'crop sold'];

  const lowerText = text.toLowerCase();
  let type: 'income' | 'expense' = 'expense'; // default to expense

  let incomeMatched = false;
  let expenseMatched = false;

  for (const kw of incomeKeywords) {
    if (lowerText.includes(kw.toLowerCase())) {
      incomeMatched = true;
      break;
    }
  }
  for (const kw of expenseKeywords) {
    if (lowerText.includes(kw.toLowerCase())) {
      expenseMatched = true;
      break;
    }
  }

  if (incomeMatched && !expenseMatched) {
    type = 'income';
  }

  // Detect category
  const categoryMap: [RegExp, string][] = [
    [/\b(labour|workers|mazdoor|मजदूर|kamjar|कामगार)\b/i, 'catLabour'],
    [/\b(fertilizer|khad|खाद|npk|urea|यूरिया|dap)\b/i, 'catFertilizer'],
    [/\b(seeds|beej|बीज|बियाणे)\b/i, 'catSeeds'],
    [/\b(pesticide|spray|dawai|दवाई|कीटनाशक)\b/i, 'catPesticides'],
    [/\b(water|irrigation|paani|पानी|सिंचाई|motor|pump|boring)\b/i, 'catIrrigation'],
    [/\b(transport|gaadi|गाड़ी|truck|रोड)\b/i, 'catTransport'],
    [/\b(crop|sale|mandi|market|sold|fasal|फसल|becha|bech|cotton|wheat|onion|rice|sugarcane|soybean)\b/i, 'catCropSale'],
  ];

  let category = 'catOther';
  for (const [pattern, cat] of categoryMap) {
    if (pattern.test(text)) {
      category = cat;
      break;
    }
  }

  // If type is income and category is still catOther but we detected sale/market/mandi, use catCropSale
  if (type === 'income' && category === 'catOther') {
    category = 'catCropSale';
  }

  return { amount: amountStr, type, description, category };
}

function loadEntries(): LedgerEntry[] {
  if (typeof window === 'undefined') return demoEntries;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoEntries));
  return demoEntries;
}

export default function VoiceKhataScreen() {
  const { t, navigate, lang } = useApp();
  const [entries, setEntries] = useState<LedgerEntry[]>(loadEntries);
  const [entryType, setEntryType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState<string>(categoryOptions[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Voice input states
  type VoiceState = 'idle' | 'listening' | 'processing' | 'error';
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceErrorText, setVoiceErrorText] = useState('');
  const [voiceParseResult, setVoiceParseResult] = useState<string | null>(null);
  const [amountFlash, setAmountFlash] = useState(false);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);

  // Auto-clear voice parse result after 4 seconds
  useEffect(() => {
    if (voiceParseResult) {
      const timer = setTimeout(() => setVoiceParseResult(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [voiceParseResult]);

  // Auto-clear amount flash after 1 second
  useEffect(() => {
    if (amountFlash) {
      const timer = setTimeout(() => setAmountFlash(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [amountFlash]);

  const totalIncome = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
  const netProfit = totalIncome - totalExpense;

  const handleSave = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || !description.trim()) return;

    const newEntry: LedgerEntry = {
      id: Date.now(),
      type: entryType,
      category,
      amount: amt,
      description: description.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setAmount('');
    setDescription('');
  };

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setVoiceState('error');
      setVoiceErrorText(t.voiceError);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceState('listening');
      setVoiceErrorText('');
    };

    recognition.onresult = (event: any) => {
      setVoiceState('processing');
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim()) {
        // Smart voice parsing
        const parsed = parseVoiceCommand(transcript.trim());
        setAmount(parsed.amount);
        setEntryType(parsed.type);
        setCategory(parsed.category);
        setDescription(parsed.description);
        // Set parse result display
        const typeLabel = parsed.type === 'income' ? t.incomeLabel : t.expenseLabel;
        const catLabel = getCategoryLabel(parsed.category, t);
        setVoiceParseResult(`✅ ₹${parsed.amount} · ${typeLabel} · ${catLabel}`);
        // Flash the amount field
        setAmountFlash(true);
      } else {
        setVoiceState('error');
        setVoiceErrorText(t.couldNotHear);
        return;
      }
      setVoiceState('idle');
    };

    recognition.onerror = (event: any) => {
      setVoiceState('error');
      if (event.error === 'no-speech') {
        setVoiceErrorText(t.couldNotHear);
      } else {
        setVoiceErrorText(t.voiceError);
      }
    };

    recognition.onend = () => {
      if (voiceState === 'listening') {
        setVoiceState('idle');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [lang, t, voiceState]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState('idle');
  }, []);

  const toggleListening = useCallback(() => {
    if (voiceState === 'listening' || voiceState === 'processing') {
      stopListening();
    } else {
      startListening();
    }
  }, [voiceState, startListening, stopListening]);

  const handleDelete = (id: number) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📖</span>
            <h1 className="text-lg font-bold text-green-800">{t.voiceKhata}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.voiceKhataDesc}</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-green-100 shadow-sm p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{t.totalIncome}</p>
            <p className="text-lg font-bold text-green-600">{formatINR(totalIncome)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-white border border-red-100 shadow-sm p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{t.totalExpense}</p>
            <p className="text-lg font-bold text-red-600">{formatINR(totalExpense)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl bg-white border shadow-sm p-4 text-center ${netProfit >= 0 ? 'border-green-100' : 'border-red-100'}`}
          >
            <p className="text-xs text-gray-500 mb-1">{t.netProfit}</p>
            <p className={`text-lg font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatINR(netProfit)}</p>
          </motion.div>
        </div>

        {/* Add Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4"
        >
          <h2 className="text-base font-semibold text-green-800">{t.addEntry}</h2>

          {/* Type Toggle */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.entryType}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setEntryType('income')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${entryType === 'income' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t.incomeLabel}
              </button>
              <button
                onClick={() => setEntryType('expense')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${entryType === 'expense' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t.expenseLabel}
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.category}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{getCategoryLabel(cat, t)}</option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.amount} (₹)</label>
            <motion.input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              animate={amountFlash ? { boxShadow: ['0 0 0 0 rgba(34,197,94,0)', '0 0 0 6px rgba(34,197,94,0.3)', '0 0 0 0 rgba(34,197,94,0)'] } : {}}
              transition={{ duration: 0.6 }}
              className={`w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors ${amountFlash ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.description}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Sold wheat at mandi"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              {t.saveEntry}
            </button>

            {/* Microphone Button with Smart Voice Badge */}
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <button
                  onClick={toggleListening}
                  disabled={voiceState === 'processing'}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    voiceState === 'listening'
                      ? 'bg-red-500 text-white'
                      : voiceState === 'error'
                      ? 'bg-red-100 text-red-500 border-2 border-red-300'
                      : voiceState === 'processing'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-50 text-green-600 border-2 border-green-200 hover:bg-green-100 hover:border-green-300'
                  }`}
                  aria-label={voiceState === 'listening' ? t.listening : t.tapToSpeak}
                >
                  {voiceState === 'listening' && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-red-400"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 relative z-10"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </button>
                {/* Smart Voice Badge */}
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none">
                  ✨ AI
                </span>
              </div>
              <span className="text-[10px] text-gray-400 leading-tight text-center max-w-[80px]">
                {voiceState === 'idle' && t.speakNow}
                {voiceState === 'listening' && t.voiceDetected}
                {voiceState === 'processing' && '...'}
                {voiceState === 'error' && voiceErrorText}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Smart Voice Parse Result Indicator */}
        {voiceParseResult && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm px-4 py-3 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-green-700">Smart Voice</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-green-600">{voiceParseResult}</span>
            </div>
          </motion.div>
        )}

        {/* Entry List */}
        <div>
          <h2 className="text-base font-semibold text-green-800 mb-3">{t.recentEntries}</h2>
          {entries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">{t.noEntries}</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 shadow-sm p-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${entry.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {entry.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{entry.description}</p>
                    <p className="text-xs text-gray-400">{getCategoryLabel(entry.category, t)} · {entry.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {entry.type === 'income' ? '+' : '-'}{formatINR(entry.amount)}
                    </p>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {t.deleteEntry}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </PageWrapper>
  );
}
