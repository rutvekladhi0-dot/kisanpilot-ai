'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskIndicator {
  key: string;
  label: string;
  icon: string;
  level: RiskLevel;
  value: number;
  advice: string;
}

const riskIndicators: Omit<RiskIndicator, 'label'>[] = [
  {
    key: 'rainRisk',
    icon: '🌧️',
    level: 'medium',
    value: 55,
    advice: 'Moderate rain expected this week. Plan irrigation accordingly and avoid overwatering.',
  },
  {
    key: 'waterStressRisk',
    icon: '💧',
    level: 'low',
    value: 25,
    advice: 'Soil moisture levels are adequate. No immediate water stress detected.',
  },
  {
    key: 'diseaseRisk',
    icon: '🦠',
    level: 'high',
    value: 78,
    advice: 'High humidity expected. Monitor crops closely for fungal disease signs.',
  },
  {
    key: 'heatRisk',
    icon: '🌡️',
    level: 'low',
    value: 20,
    advice: 'Temperature is within normal range for this season.',
  },
  {
    key: 'costRisk',
    icon: '💰',
    level: 'medium',
    value: 50,
    advice: 'Input costs are slightly elevated. Compare prices across suppliers.',
  },
  {
    key: 'insuranceReady',
    icon: '🛡️',
    level: 'low',
    value: 15,
    advice: 'PMFBY enrollment period is open. Consider enrolling for crop insurance.',
  },
];

const levelColors: Record<RiskLevel, { bg: string; text: string; border: string; ring: string }> = {
  low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', ring: 'bg-green-500' },
  medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', ring: 'bg-yellow-500' },
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', ring: 'bg-red-500' },
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

function CircularProgress({ value, level }: { value: number; level: RiskLevel }) {
  const colors = levelColors[level];
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={radius} fill="none"
          className={colors.ring}
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${colors.text}`}>{value}%</span>
      </div>
    </div>
  );
}

function getLevelLabel(level: RiskLevel, t: { low: string; medium: string; high: string }): string {
  if (level === 'low') return t.low;
  if (level === 'medium') return t.medium;
  return t.high;
}

export default function RiskRadarScreen() {
  const { t } = useApp();

  const getLabel = (key: string): string => {
    const map: Record<string, string> = {
      rainRisk: t.rainRisk,
      waterStressRisk: t.waterStressRisk,
      diseaseRisk: t.diseaseRisk,
      heatRisk: t.heatRisk,
      costRisk: t.costRisk,
      insuranceReady: t.insuranceReady,
    };
    return map[key] || key;
  };

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📡</span>
            <h1 className="text-lg font-bold text-green-800">{t.riskRadar}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.riskRadarDesc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {riskIndicators.map((item, idx) => {
            const colors = levelColors[item.level];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl ${colors.bg} border ${colors.border} shadow-sm p-4 flex gap-4 items-start`}
              >
                <CircularProgress value={item.value} level={item.level} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className={`text-sm font-semibold ${colors.text}`}>{getLabel(item.key)}</h3>
                  </div>
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border} mb-2`}>
                    {getLevelLabel(item.level, t)}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.advice}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Risk Advice Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-green-50 border border-green-200 p-5"
        >
          <h2 className="text-base font-semibold text-green-800 mb-2">💡 {t.riskAdvice}</h2>
          <p className="text-sm text-green-700 leading-relaxed">
            Disease risk is high this week due to expected humidity. Schedule a preventive spray and check drainage. Insurance enrollment is recommended before the deadline.
          </p>
        </motion.div>
      </main>
    </PageWrapper>
  );
}
