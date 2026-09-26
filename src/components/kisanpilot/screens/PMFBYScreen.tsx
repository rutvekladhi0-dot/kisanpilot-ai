'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

interface Scheme {
  id: string;
  title: string;
  icon: string;
  description: string;
  eligibility: string[];
  documents: string[];
  deadlines: string;
}

const schemes: Scheme[] = [
  {
    id: 'pmfby',
    title: 'pmfbyTitle',
    icon: '🌾',
    description: 'pmfbyDesc2',
    eligibility: [
      'All farmers including sharecroppers and tenant cultivators',
      'Crops: Food crops, oilseeds, annual horticultural crops',
      'Must enroll during the notified season',
      'Bank account linked with Aadhaar required',
    ],
    documents: [
      'Aadhaar Card',
      'Bank Passbook / KCC',
      'Land ownership / cultivation proof',
      'Crop details (sowing date, variety, area)',
    ],
    deadlines: 'Rabi 2025: Oct 1 – Nov 30 | Kharif 2025: Jun 1 – Jul 31',
  },
  {
    id: 'kcc',
    title: 'kisanCreditCard',
    icon: '💳',
    description: 'Short-term credit at 4% interest rate for farming needs',
    eligibility: [
      'Farmers, fishermen, animal husbandry farmers',
      'Must own or cultivate agricultural land',
      'No minimum land holding requirement',
    ],
    documents: [
      'Aadhaar Card',
      'Land records / Patta',
      'Bank account details',
      'Passport size photograph',
    ],
    deadlines: 'Apply anytime through nearest bank branch',
  },
  {
    id: 'subsidy',
    title: 'subsidySchemes',
    icon: '🏛️',
    description: 'Various central and state subsidy schemes for seeds, equipment, and organic farming',
    eligibility: [
      'Registered farmers on PFMS portal',
      'Must have valid land records',
      'Schemes vary by state and season',
    ],
    documents: [
      'Aadhaar Card',
      'Land ownership proof',
      'Bank Passbook',
      'Application form (state-specific)',
    ],
    deadlines: 'Varies by scheme. Check state agriculture department portal.',
  },
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

function SchemeCard({ scheme, t }: { scheme: Scheme; t: any }) {
  const [expanded, setExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const title = t[scheme.title] || scheme.title;
  const desc = t[scheme.description] || scheme.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-2xl">{scheme.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-green-800">{title}</h3>
          <p className="text-xs text-gray-500 truncate">{desc}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">{t.schemeInfo}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">{t.eligibility}</h4>
                <ul className="space-y-1">
                  {scheme.eligibility.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">{t.requiredDocs}</h4>
                <ul className="space-y-1">
                  {scheme.documents.map((doc, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deadlines */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">{t.deadlines}</h4>
                <p className="text-sm text-gray-600">{scheme.deadlines}</p>
              </div>

              {/* Toast */}
              {showToast && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center text-sm text-amber-700"
                >
                  Feature coming soon
                </motion.div>
              )}

              <button
                onClick={() => setShowToast(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                {t.applyOnline}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PMFBYScreen() {
  const { t } = useApp();

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🛡️</span>
            <h1 className="text-lg font-bold text-green-800">{t.pmfbySchemes}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
        <p className="text-sm text-gray-500 text-center">{t.pmfbyDesc}</p>

        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} t={t} />
        ))}

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-xs text-amber-700">⚠️ {t.pmfbyNote}</p>
        </div>
      </main>
    </PageWrapper>
  );
}
