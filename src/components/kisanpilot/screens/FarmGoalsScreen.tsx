'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

const STORAGE_KEY = 'kp_goal';

interface GoalData {
  target: number;
  earned: number;
}

const defaultGoal: GoalData = {
  target: 50000,
  earned: 22000,
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

function loadGoal(): GoalData {
  if (typeof window === 'undefined') return defaultGoal;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultGoal));
  return defaultGoal;
}

export default function FarmGoalsScreen() {
  const { t } = useApp();
  const [goal, setGoal] = useState<GoalData>(loadGoal);
  const [editing, setEditing] = useState(false);
  const [goalInput, setGoalInput] = useState('');
  const [earnedInput, setEarnedInput] = useState('');

  const percentage = goal.target > 0 ? Math.min(100, Math.round((goal.earned / goal.target) * 100)) : 0;
  const remaining = Math.max(0, goal.target - goal.earned);
  const isOnTrack = percentage >= 40;

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleSave = () => {
    const newTarget = parseFloat(goalInput) || goal.target;
    const newEarned = parseFloat(earnedInput) || goal.earned;
    const updated: GoalData = { target: newTarget, earned: newEarned };
    setGoal(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(false);
  };

  const startEdit = () => {
    setGoalInput(String(goal.target));
    setEarnedInput(String(goal.earned));
    setEditing(true);
  };

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🎯</span>
            <h1 className="text-lg font-bold text-green-800">{t.farmGoals}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.farmGoalsDesc}</p>

        {/* Circular Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <div className="relative w-56 h-56">
            <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={isOnTrack ? '#22c55e' : '#f59e0b'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${isOnTrack ? 'text-green-600' : 'text-amber-600'}`}>{percentage}%</span>
              <span className="text-xs text-gray-500 mt-1">{t.currentProgress}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{t.seasonalTarget}</p>
            <p className="text-lg font-bold text-gray-800">{formatINR(goal.target)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-white border border-green-100 shadow-sm p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{t.currentProgress}</p>
            <p className="text-lg font-bold text-green-600">{formatINR(goal.earned)}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">{t.remainingAmount}</p>
            <p className="text-lg font-bold text-amber-600">{formatINR(remaining)}</p>
          </motion.div>
        </div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`rounded-2xl p-4 text-center text-sm ${isOnTrack ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}
        >
          {isOnTrack ? `✅ ${t.onTrackMsg}` : `⚠️ ${t.behindMsg}`}
        </motion.div>

        {/* Edit Goal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 space-y-4"
        >
          {!editing ? (
            <button
              onClick={startEdit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              {t.editGoal}
            </button>
          ) : (
            <>
              <h2 className="text-base font-semibold text-green-800">{t.setGoal}</h2>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">{t.goalAmount}</label>
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Current Earned (₹)</label>
                <input
                  type="number"
                  value={earnedInput}
                  onChange={(e) => setEarnedInput(e.target.value)}
                  placeholder="e.g. 22000"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  {t.saveChanges}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </PageWrapper>
  );
}
