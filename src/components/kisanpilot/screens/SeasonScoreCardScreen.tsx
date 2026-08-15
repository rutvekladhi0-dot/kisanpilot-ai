'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

// ============================================================
// Helpers
// ============================================================

function getRatingLabel(score: number, t: any): string {
  return score >= 80
    ? t.excellent
    : score >= 70
      ? t.good
      : score >= 55
        ? t.average
        : t.needsImprovement;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 70) return '#f59e0b';
  return '#ef4444';
}

function getScoreBarBg(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 70) return 'bg-amber-500';
  return 'bg-red-500';
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-red-600';
}

function getCurrentSeason(t: any): string {
  const month = new Date().getMonth(); // 0=Jan
  // Kharif: Jun-Sep (5-8), Rabi: Oct-Mar (9-2)
  return month >= 3 && month <= 8 ? t.kharifSeason : t.rabiSeason;
}

// ============================================================
// Mock Data
// ============================================================

const metrics = [
  { key: 'cropHealth', icon: '🌱', defaultLabel: 'Crop Health' },
  { key: 'irrigation', icon: '💧', defaultLabel: 'Irrigation' },
  { key: 'pestManagement', icon: '🐛', defaultLabel: 'Pest Management' },
  { key: 'soilHealth', icon: '🧪', defaultLabel: 'Soil Health' },
  { key: 'profitability', icon: '💰', defaultLabel: 'Profitability' },
  { key: 'timelyActions', icon: '⏰', defaultLabel: 'Timely Actions' },
] as const;

const scores: Record<string, number> = {
  cropHealth: 82,
  irrigation: 75,
  pestManagement: 70,
  soilHealth: 68,
  profitability: 85,
  timelyActions: 80,
};

const overallScore = 78;

const highlights = [
  'Timely fertilizer application boosted yield',
  'Effective pest control in first 45 days',
  'Drip irrigation reduced water usage by 30%',
];

const alerts = [
  'Soil pH needs monitoring',
  'Plan second fertilizer dose soon',
];

// ============================================================
// Sub-Components
// ============================================================

function BackButton({ label }: { label: string }) {
  const { navigate } = useApp();
  return (
    <button
      onClick={() => navigate('dashboard')}
      className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </button>
  );
}

// ============================================================
// Main Component
// ============================================================

export default function SeasonScoreCardScreen() {
  const { t } = useApp();

  const labelMap: Record<string, string> = {
    cropHealth: t.cropHealthScore,
    irrigation: t.irrigationScore,
    pestManagement: t.pestManagementScore,
    soilHealth: t.soilHealthScore,
    profitability: t.profitScore,
    timelyActions: t.timelyActionsScore,
  };

  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;
  const overallColor = getScoreColor(overallScore);

  const currentSeason = getCurrentSeason(t);

  const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🏆</span>
            <h1 className="text-lg font-bold text-green-800">{t.seasonScoreCard}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6 pb-8">
        {/* Description */}
        <p className="text-sm text-gray-500 text-center">{t.seasonScoreCardDesc}</p>

        {/* Current Season Badge */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.05 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-1.5 text-sm font-medium text-green-700">
            🌾 {t.currentSeason}: <strong>{currentSeason}</strong>
          </span>
        </motion.div>

        {/* Overall Score Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
          className="flex justify-center"
        >
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="14"
              />
              {/* Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={overallColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className={`text-5xl font-extrabold ${getScoreTextColor(overallScore)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {overallScore}
              </motion.span>
              <span className="text-xs text-gray-400 mt-1">{t.scoreOutOf}</span>
              <span className="text-sm font-semibold text-gray-600 mt-0.5">{t.overallScore}</span>
            </div>
          </div>
        </motion.div>

        {/* Overall Rating Label */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <span
            className={`inline-block rounded-full px-5 py-1.5 text-sm font-bold text-white ${
              overallScore >= 80
                ? 'bg-green-500'
                : overallScore >= 70
                  ? 'bg-amber-500'
                  : 'bg-red-500'
            }`}
          >
            {getRatingLabel(overallScore, t)}
          </span>
        </motion.div>

        {/* Season Performance Title */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <h2 className="text-base font-bold text-green-800 flex items-center gap-2">
            📊 {t.seasonBreakdown}
          </h2>
        </motion.div>

        {/* Score Metrics Grid */}
        <div className="space-y-3">
          {metrics.map((m, idx) => {
            const score = scores[m.key];
            const color = getScoreColor(score);
            const barBg = getScoreBarBg(score);
            const textColor = getScoreTextColor(score);
            const rating = getRatingLabel(score, t);

            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.07 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{m.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {labelMap[m.key] || m.defaultLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${textColor}`}>{score}</span>
                    <span className="text-xs text-gray-400">{t.scoreOutOf}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className={`h-full rounded-full ${barBg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 + idx * 0.07 }}
                  />
                </div>

                <div className="flex justify-end">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      score >= 80
                        ? 'bg-green-50 text-green-700'
                        : score >= 70
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {rating}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Season Highlights */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl shadow-sm border border-green-100 p-5"
        >
          <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 mb-3">
            ✅ {t.seasonHighlights}
          </h3>
          <ul className="space-y-2.5">
            {highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                className="flex items-start gap-2.5 text-sm text-gray-700"
              >
                <span className="mt-0.5 text-green-500 text-base">•</span>
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Season Alerts */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5"
        >
          <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-3">
            ⚠️ {t.seasonAlerts}
          </h3>
          <ul className="space-y-2.5">
            {alerts.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                className="flex items-start gap-2.5 text-sm text-gray-700"
              >
                <span className="mt-0.5 text-amber-500 text-base">•</span>
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Season Tip */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5"
        >
          <h3 className="text-sm font-bold text-green-800 flex items-center gap-2 mb-2">
            💡 {t.seasonTip}
          </h3>
          <p className="text-sm text-green-700 leading-relaxed">
            Focus on improving soil health this season — consider adding organic compost and getting a soil test done before the next sowing cycle. Healthy soil is the foundation of high yields.
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
