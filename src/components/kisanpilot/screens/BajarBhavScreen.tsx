'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

interface MarketCommodity {
  name: string;
  min: number;
  max: number;
  modal: number;
  trend: 'up' | 'down' | 'stable';
  source: string;
  date: string;
}

const mockData: MarketCommodity[] = [
  { name: 'Wheat', min: 2275, max: 2480, modal: 2380, trend: 'up', source: 'APMC Nanded', date: '2025-01-20' },
  { name: 'Onion', min: 800, max: 1350, modal: 1100, trend: 'down', source: 'Lasalgaon Mandi', date: '2025-01-20' },
  { name: 'Cotton', min: 6200, max: 6800, modal: 6550, trend: 'up', source: 'Rajkot Mandi', date: '2025-01-20' },
  { name: 'Soybean', min: 4400, max: 4900, modal: 4650, trend: 'stable', source: 'Latur APMC', date: '2025-01-20' },
  { name: 'Sugarcane', min: 305, max: 350, modal: 330, trend: 'stable', source: 'Kolhapur Mandi', date: '2025-01-20' },
  { name: 'Rice (Paddy)', min: 2050, max: 2350, modal: 2200, trend: 'up', source: 'Karnal Mandi', date: '2025-01-20' },
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

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default function BajarBhavScreen() {
  const { t } = useApp();
  const [selectedCommodity, setSelectedCommodity] = useState(0);
  const [transportCost, setTransportCost] = useState('');
  const [netReturn, setNetReturn] = useState<number | null>(null);

  const handleCalculate = () => {
    const cost = parseFloat(transportCost) || 0;
    const modal = mockData[selectedCommodity].modal;
    setNetReturn(modal - cost);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <span className="text-green-500 text-lg">▲</span>;
    if (trend === 'down') return <span className="text-red-500 text-lg">▼</span>;
    return <span className="text-gray-400 text-lg">●</span>;
  };

  const getTrendLabel = (trend: string) => {
    if (trend === 'up') return t.trendingUp;
    if (trend === 'down') return t.trendingDown;
    return t.stable;
  };

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🏪</span>
            <h1 className="text-lg font-bold text-green-800">{t.bajarBhav}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.bajarBhavDesc}</p>

        {/* Market Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50 text-green-800">
                  <th className="text-left px-4 py-3 font-semibold">{t.commodity}</th>
                  <th className="text-right px-3 py-3 font-semibold">{t.minPrice}</th>
                  <th className="text-right px-3 py-3 font-semibold">{t.maxPrice}</th>
                  <th className="text-right px-3 py-3 font-semibold">{t.modalPrice}</th>
                  <th className="text-center px-3 py-3 font-semibold">{t.priceTrend}</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item, idx) => (
                  <tr key={item.name} className={`border-t border-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="text-right px-3 py-3 text-gray-600">{formatINR(item.min)}</td>
                    <td className="text-right px-3 py-3 text-gray-600">{formatINR(item.max)}</td>
                    <td className="text-right px-3 py-3 font-semibold text-gray-800">{formatINR(item.modal)}</td>
                    <td className="text-center px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="text-xs text-gray-500">{getTrendLabel(item.trend)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap justify-between text-xs text-gray-400">
            <span>{t.priceSource}: {mockData[0].source}</span>
            <span>{t.lastUpdated}: {mockData[0].date}</span>
          </div>
        </motion.div>

        {/* Net Return Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4"
        >
          <h2 className="text-base font-semibold text-green-800">{t.estNetReturn}</h2>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.commodity}</label>
            <select
              value={selectedCommodity}
              onChange={(e) => { setSelectedCommodity(Number(e.target.value)); setNetReturn(null); }}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {mockData.map((item, idx) => (
                <option key={item.name} value={idx}>{item.name} — {t.modalPrice}: {formatINR(item.modal)}/qtl</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t.transportCost} (₹/qtl)</label>
            <input
              type="number"
              value={transportCost}
              onChange={(e) => { setTransportCost(e.target.value); setNetReturn(null); }}
              placeholder="e.g. 150"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            {t.calculateReturn}
          </button>

          {netReturn !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-xl p-4 text-center ${netReturn >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
            >
              <p className="text-sm text-gray-500 mb-1">{t.estNetReturn}</p>
              <p className={`text-2xl font-bold ${netReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatINR(netReturn)}/qtl</p>
              <p className="text-xs text-gray-400 mt-1">{t.modalPrice}: {formatINR(mockData[selectedCommodity].modal)} − {t.transportCost}: {formatINR(parseFloat(transportCost) || 0)}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Market Advice */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">⚠️ {t.marketAdvice}</p>
        </div>
      </main>
    </PageWrapper>
  );
}
