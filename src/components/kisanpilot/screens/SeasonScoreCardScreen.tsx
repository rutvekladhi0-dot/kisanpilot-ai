'use client';

import React, { useState, useCallback } from 'react';
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
// PDF Generation Helper
// ============================================================

function generatePdfHtml(t: any, labelMap: Record<string, string>): string {
  const season = getCurrentSeason(t);
  const ratingLabel = getRatingLabel(overallScore, t);
  const ratingColor = overallScore >= 80 ? '#22c55e' : overallScore >= 70 ? '#f59e0b' : '#ef4444';
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function scoreBarColor(s: number): string {
    if (s >= 80) return '#22c55e';
    if (s >= 70) return '#f59e0b';
    return '#ef4444';
  }

  function ratingBadgeColor(s: number): string {
    if (s >= 80) return 'background:#dcfce7;color:#15803d;';
    if (s >= 70) return 'background:#fef3c7;color:#92400e;';
    return 'background:#fee2e2;color:#991b1b;';
  }

  const metricsHtml = metrics
    .map((m) => {
      const s = scores[m.key];
      const r = getRatingLabel(s, t);
      return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e5e7eb;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">${m.icon}</span>
            <div style="flex:1;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-weight:600;font-size:14px;color:#374151;">${labelMap[m.key] || m.defaultLabel}</span>
                <span style="font-weight:700;font-size:14px;color:${scoreBarColor(s)};">${s}/100</span>
              </div>
              <div style="width:100%;height:10px;background:#e5e7eb;border-radius:5px;overflow:hidden;">
                <div style="width:${s}%;height:100%;background:${scoreBarColor(s)};border-radius:5px;"></div>
              </div>
              <div style="margin-top:4px;text-align:right;">
                <span style="display:inline-block;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:600;${ratingBadgeColor(s)}">${r}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>`;
    })
    .join('');

  const highlightsHtml = highlights
    .map((h) => `<li style="margin-bottom:8px;color:#374151;font-size:13px;">✅ ${h}</li>`)
    .join('');

  const alertsHtml = alerts
    .map((a) => `<li style="margin-bottom:8px;color:#374151;font-size:13px;">⚠️ ${a}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${t.seasonScoreCard} - KisanPilot AI</title>
  <style>
    @page { size: A4; margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1f2937;
      background: #ffffff;
      line-height: 1.6;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    .header {
      background: linear-gradient(135deg, #16a34a, #059669);
      padding: 30px 40px;
      text-align: center;
      color: #ffffff;
    }
    .header img {
      height: 48px;
      margin-bottom: 12px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .header p {
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      max-width: 700px;
      margin: 0 auto;
      padding: 30px 40px;
    }
    .season-badge {
      display: inline-block;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 20px;
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 600;
      color: #15803d;
      margin: 20px auto;
      text-align: center;
    }
    .score-section {
      text-align: center;
      padding: 30px 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #e5e7eb;
    }
    .score-circle {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 8px solid ${ratingColor};
      margin: 0 auto 16px;
    }
    .score-number {
      font-size: 48px;
      font-weight: 800;
      color: ${ratingColor};
      line-height: 1;
    }
    .score-label {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }
    .rating-badge {
      display: inline-block;
      padding: 6px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      background: ${ratingColor};
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #15803d;
      margin: 24px 0 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #bbf7d0;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .tip-card {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .tip-card h4 {
      font-size: 14px;
      font-weight: 700;
      color: #15803d;
      margin-bottom: 8px;
    }
    .tip-card p {
      font-size: 13px;
      color: #166534;
      line-height: 1.7;
    }
    .alert-card {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .footer {
      text-align: center;
      padding: 24px 40px;
      border-top: 2px solid #e5e7eb;
      margin-top: 20px;
    }
    .footer p {
      font-size: 12px;
      color: #9ca3af;
    }
    .date-row {
      text-align: right;
      font-size: 12px;
      color: #9ca3af;
      margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="/images/logo.png" alt="KisanPilot AI" onerror="this.style.display='none'; this.parentElement.querySelector('h1').style.fontSize='32px';" />
    <h1>🏆 ${t.seasonScoreCard}</h1>
    <p>${t.seasonScoreCardDesc}</p>
  </div>

  <div class="content">
    <div style="text-align:center;">
      <span class="season-badge">🌾 ${t.currentSeason}: <strong>${season}</strong></span>
    </div>

    <div class="score-section">
      <div class="score-circle">
        <span class="score-number">${overallScore}</span>
        <span class="score-label">${t.overallScore}</span>
      </div>
      <br/>
      <span class="rating-badge">${ratingLabel}</span>
    </div>

    <div class="date-row">${t.scorecardGeneratedDate}: ${today}</div>

    <h2 class="section-title">📊 ${t.seasonBreakdown}</h2>
    <div class="card">
      <table style="width:100%;border-collapse:collapse;">
        ${metricsHtml}
      </table>
    </div>

    <h2 class="section-title">✅ ${t.seasonHighlights}</h2>
    <div class="card">
      <ul style="list-style:none;padding:0;">
        ${highlightsHtml}
      </ul>
    </div>

    <h2 class="section-title">⚠️ ${t.seasonAlerts}</h2>
    <div class="alert-card">
      <ul style="list-style:none;padding:0;">
        ${alertsHtml}
      </ul>
    </div>

    <h2 class="section-title">💡 ${t.seasonTip}</h2>
    <div class="tip-card">
      <h4>${t.seasonTip}</h4>
      <p>Focus on improving soil health this season — consider adding organic compost and getting a soil test done before the next sowing cycle. Healthy soil is the foundation of high yields.</p>
    </div>
  </div>

  <div class="footer">
    <p>${t.poweredBy} | ${t.scorecardGeneratedDate}: ${today}</p>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 300);
    };
  </script>
</body>
</html>`;
}

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

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

  // ============================================================
  // PDF Download
  // ============================================================

  const downloadPdf = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const htmlContent = generatePdfHtml(t, labelMap);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.onafterprint = () => {
          printWindow.close();
          setIsGenerating(false);
        };
        // Fallback close after timeout
        setTimeout(() => {
          if (!printWindow.closed) {
            printWindow.close();
            setIsGenerating(false);
          }
        }, 3000);
      } else {
        setIsGenerating(false);
      }
    }, 500); // Brief loading animation
  }, [t, labelMap]);

  // ============================================================
  // Share Scorecard
  // ============================================================

  const shareScorecard = useCallback(async () => {
    const season = getCurrentSeason(t);
    const text = `🏆 ${t.seasonScoreCard}\n${t.currentSeason}: ${season}\n${t.overallScore}: ${overallScore}/100 (${getRatingLabel(overallScore, t)})\n\n📊 ${t.seasonBreakdown}:\n${metrics
      .map(
        (m) =>
          `${m.icon} ${labelMap[m.key] || m.defaultLabel}: ${scores[m.key]}/100`
      )
      .join('\n')}\n\n✅ ${t.seasonHighlights}:\n${highlights.map((h) => `• ${h}`).join('\n')}\n\n⚠️ ${t.seasonAlerts}:\n${alerts.map((a) => `• ${a}`).join('\n')}\n\n💡 ${t.seasonTip}: Focus on improving soil health this season.\n\n${t.poweredBy}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t.seasonScoreCard} - ${season}`,
          text,
        });
      } catch {
        // User cancelled or error — silently ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareFeedback(t.copiedToClipboard);
        setTimeout(() => setShareFeedback(null), 2500);
      } catch {
        setShareFeedback(t.shareNotSupported);
        setTimeout(() => setShareFeedback(null), 2500);
      }
    }
  }, [t, labelMap]);

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

        {/* Download / Share Buttons Card */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.08 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Download PDF Button */}
            <button
              onClick={downloadPdf}
              disabled={isGenerating}
              className="relative flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold text-sm px-5 py-3.5 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-80 disabled:cursor-wait"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4.5 w-4.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>{t.pdfGenerating}</span>
                </>
              ) : (
                <>
                  <span className="text-lg">📄</span>
                  <span>{t.downloadScorecardPdf}</span>
                </>
              )}
            </button>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={shareScorecard}
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm px-5 py-3.5 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                <span className="text-lg">📤</span>
                <span>{t.shareScorecard}</span>
              </button>
              {/* Share feedback toast */}
              {shareFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg z-10"
                >
                  {shareFeedback}
                </motion.div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2.5">
            {t.downloadScorecardDesc}
          </p>
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
