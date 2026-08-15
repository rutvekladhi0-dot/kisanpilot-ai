'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

const crops = ['Wheat', 'Cotton', 'Soybean', 'Rice', 'Sugarcane', 'Onion'];

type SimCrop = {
  crop: string;
  investment: string;
  yieldVal: string;
  price: string;
};

const defaultCrop: SimCrop = {
  crop: '',
  investment: '',
  yieldVal: '',
  price: '',
};

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

export default function SimulatorScreen() {
  const { t } = useApp();
  const [cropA, setCropA] = useState<SimCrop>({ ...defaultCrop, crop: 'Wheat' });
  const [cropB, setCropB] = useState<SimCrop>({ ...defaultCrop, crop: 'Cotton' });
  const [result, setResult] = useState<{ revenueA: number; profitA: number; revenueB: number; profitB: number } | null>(null);

  const handleSimulate = () => {
    const yieldA = parseFloat(cropA.yieldVal) || 0;
    const priceA = parseFloat(cropA.price) || 0;
    const investA = parseFloat(cropA.investment) || 0;
    const revenueA = yieldA * priceA;
    const profitA = revenueA - investA;

    const yieldB = parseFloat(cropB.yieldVal) || 0;
    const priceB = parseFloat(cropB.price) || 0;
    const investB = parseFloat(cropB.investment) || 0;
    const revenueB = yieldB * priceB;
    const profitB = revenueB - investB;

    setResult({ revenueA, profitA, revenueB, profitB });
  };

  const betterCrop = result
    ? result.profitA >= result.profitB
      ? cropA.crop || t.cropA
      : cropB.crop || t.cropB
    : null;

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🔬</span>
            <h1 className="text-lg font-bold text-green-800">{t.whatIfSimulator}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.whatIfDesc}</p>

        <h2 className="text-base font-semibold text-green-800">{t.compareCrops}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="text-sm font-semibold text-green-800 text-center">{t.cropA}</h3>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.selectCropA}</label>
                <select
                  value={cropA.crop}
                  onChange={(e) => setCropA({ ...cropA, crop: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {crops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.investmentPerAcre} (₹)</label>
                <input
                  type="number"
                  value={cropA.investment}
                  onChange={(e) => setCropA({ ...cropA, investment: e.target.value })}
                  placeholder="e.g. 15000"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.expectedYield} (qtl)</label>
                <input
                  type="number"
                  value={cropA.yieldVal}
                  onChange={(e) => setCropA({ ...cropA, yieldVal: e.target.value })}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.marketPricePer} (₹)</label>
                <input
                  type="number"
                  value={cropA.price}
                  onChange={(e) => setCropA({ ...cropA, price: e.target.value })}
                  placeholder="e.g. 2200"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3">
              <h3 className="text-sm font-semibold text-green-800 text-center">{t.cropB}</h3>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.selectCropB}</label>
                <select
                  value={cropB.crop}
                  onChange={(e) => setCropB({ ...cropB, crop: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {crops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.investmentPerAcre} (₹)</label>
                <input
                  type="number"
                  value={cropB.investment}
                  onChange={(e) => setCropB({ ...cropB, investment: e.target.value })}
                  placeholder="e.g. 20000"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.expectedYield} (qtl)</label>
                <input
                  type="number"
                  value={cropB.yieldVal}
                  onChange={(e) => setCropB({ ...cropB, yieldVal: e.target.value })}
                  placeholder="e.g. 8"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.marketPricePer} (₹)</label>
                <input
                  type="number"
                  value={cropB.price}
                  onChange={(e) => setCropB({ ...cropB, price: e.target.value })}
                  placeholder="e.g. 6500"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={handleSimulate}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          {t.simulate}
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
                <h3 className="text-sm font-semibold text-green-800">{t.cropA}: {cropA.crop || '—'}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.estimatedCost}</span>
                  <span className="font-medium text-gray-800">{formatINR(parseFloat(cropA.investment) || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium text-green-600">{formatINR(result.revenueA)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{t.estimatedProfit}</span>
                  <span className={`font-bold text-lg ${result.profitA >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatINR(result.profitA)}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-3">
                <h3 className="text-sm font-semibold text-green-800">{t.cropB}: {cropB.crop || '—'}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t.estimatedCost}</span>
                  <span className="font-medium text-gray-800">{formatINR(parseFloat(cropB.investment) || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Revenue</span>
                  <span className="font-medium text-green-600">{formatINR(result.revenueB)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{t.estimatedProfit}</span>
                  <span className={`font-bold text-lg ${result.profitB >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatINR(result.profitB)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-1">💡 {t.recommendation}</h3>
              <p className="text-sm text-green-700">
                Based on your analysis, <strong>{betterCrop}</strong> offers higher estimated returns.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </PageWrapper>
  );
}
