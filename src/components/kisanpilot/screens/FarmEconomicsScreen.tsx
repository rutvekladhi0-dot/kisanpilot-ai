'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface LedgerEntry {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

const STORAGE_KEY = 'kp_ledger';

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

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function loadEntries(): LedgerEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  return [];
}

export default function FarmEconomicsScreen() {
  const { t } = useApp();
  const [entries, setEntries] = useState<LedgerEntry[]>(loadEntries);

  const totalIncome = useMemo(() => entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0), [entries]);
  const totalExpense = useMemo(() => entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0), [entries]);
  const netReturn = totalIncome - totalExpense;

  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    entries.forEach(e => {
      const label = e.category;
      if (!map[label]) map[label] = 0;
      map[label] += e.amount;
    });
    return Object.entries(map).map(([cat, amt]) => ({
      category: cat,
      amount: amt,
    })).sort((a, b) => b.amount - a.amount);
  }, [entries]);

  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((m, i) => {
      const monthEntries = entries.filter(e => {
        const month = new Date(e.date).getMonth();
        return month === i;
      });
      return {
        name: m,
        Income: monthEntries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0),
        Expense: monthEntries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0),
      };
    });
  }, [entries]);

  const maxCategoryAmount = categoryBreakdown.length > 0 ? Math.max(...categoryBreakdown.map(c => c.amount)) : 1;

  const getCategoryLabel = (key: string): string => {
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
  };

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📊</span>
            <h1 className="text-lg font-bold text-green-800">{t.farmEconomics}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.farmEconomicsDesc}</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-green-200 shadow-sm p-4"
          >
            <p className="text-xs text-gray-500 mb-1">{t.totalEarned}</p>
            <p className="text-xl font-bold text-green-600">{formatINR(totalIncome)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-white border border-red-200 shadow-sm p-4"
          >
            <p className="text-xs text-gray-500 mb-1">{t.totalSpend}</p>
            <p className="text-xl font-bold text-red-600">{formatINR(totalExpense)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-2xl bg-white border shadow-sm p-4 ${netReturn >= 0 ? 'border-green-200' : 'border-red-200'}`}
          >
            <p className="text-xs text-gray-500 mb-1">{t.netReturn}</p>
            <p className={`text-xl font-bold ${netReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatINR(netReturn)}</p>
          </motion.div>
        </div>

        {/* Income vs Expense Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
        >
          <h2 className="text-base font-semibold text-green-800 mb-4">{t.incomeVsExpense}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatINR(value)} />
                <Bar dataKey="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5"
        >
          <h2 className="text-base font-semibold text-green-800 mb-4">{t.categoryBreakdown}</h2>
          {categoryBreakdown.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No data available</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {categoryBreakdown.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">{getCategoryLabel(item.category)}</span>
                    <span className="text-gray-600 font-semibold">{formatINR(item.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                      style={{ width: `${Math.max(2, (item.amount / maxCategoryAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </PageWrapper>
  );
}
