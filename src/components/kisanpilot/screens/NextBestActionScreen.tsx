'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

interface ActionItem {
  priority: number;
  action: string;
  reason: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

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

export default function NextBestActionScreen() {
  const { t } = useApp();

  const actions: ActionItem[] = [
    {
      priority: 1,
      action: t.action1,
      reason: t.action1Reason,
      icon: '💧',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      priority: 2,
      action: t.action2,
      reason: t.action2Reason,
      icon: '🧪',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      priority: 3,
      action: t.action3,
      reason: t.action3Reason,
      icon: '🐛',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">⚡</span>
            <h1 className="text-lg font-bold text-green-800">{t.nextBestAction}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.nextBestActionDesc}</p>

        {/* Weather Context Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-blue-50 border border-blue-200 p-4 flex items-center gap-3"
        >
          <span className="text-2xl">🌤️</span>
          <div>
            <h3 className="text-sm font-semibold text-blue-800">{t.weatherContext}</h3>
            <p className="text-xs text-blue-600">32°C, Partly Cloudy | Rain expected Thursday | Humidity: 65%</p>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="space-y-4">
          {actions.map((item, idx) => (
            <motion.div
              key={item.priority}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-2xl ${item.bgColor} border ${item.borderColor} shadow-sm p-5`}
            >
              <div className="flex items-start gap-4">
                {/* Priority Badge */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${item.bgColor} border-2 ${item.borderColor} flex items-center justify-center`}>
                    <span className={`text-xl font-bold ${item.color}`}>{item.priority}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className={`text-sm font-semibold ${item.color}`}>{t.priorityAction} #{item.priority}</h3>
                  </div>
                  <p className={`text-base font-semibold ${item.color} mb-2`}>{item.action}</p>
                  <div className="rounded-xl bg-white/70 border border-white p-3">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">📌 {t.reason}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.reason}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}
