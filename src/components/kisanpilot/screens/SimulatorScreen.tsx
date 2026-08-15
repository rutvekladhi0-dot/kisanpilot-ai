'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

const crops = ['Wheat', 'Cotton', 'Soybean', 'Rice', 'Sugarcane', 'Onion'];

type CropAnalysis = {
  confidence: number;
  marketAnalysis: string;
  riskFactors: string;
  seasonContext: string;
  waterRequirement: string;
  soilSuitability: string;
  bestPractice: string;
  expectedYield: string;
  marketPrice: string;
};

const cropAnalysisData: Record<string, CropAnalysis> = {
  Wheat: {
    confidence: 85,
    marketAnalysis:
      'Current wheat prices are stable at ₹2,200/qtl. Demand expected to rise in Q4 due to festival season. Government MSP at ₹2,275/qtl provides a safety net. Export demand from Bangladesh and Sri Lanka remains steady.',
    riskFactors:
      'Moderate rain risk in next 2 weeks. Monitor for rust disease in humid conditions. Temperature fluctuations may affect grain filling stage. Terminal heat stress is a concern in March.',
    seasonContext:
      'Current Rabi season conditions are favorable. Optimal sowing window is closing. Day temperature of 20-25°C is ideal for tillering stage. Current weather pattern supports healthy crop growth.',
    waterRequirement:
      'Requires 4-5 irrigations. Current soil moisture is adequate for 7 days. Critical irrigation needed at crown root and flowering stages. Drip irrigation can reduce water usage by 30%.',
    soilSuitability:
      'Well-suited for loamy soil with pH 6.5-7.5. Your soil type is compatible. Good drainage is essential to prevent waterlogging. Add organic matter to improve soil structure.',
    bestPractice:
      'Apply DAP at sowing + split nitrogen application. Ensure proper drainage. Use treated seeds to prevent termite and smut. Timely weed management in first 30 days is crucial.',
    expectedYield: '18-22 quintals/acre with good management practices',
    marketPrice: '₹2,200-2,400/qtl (current), MSP ₹2,275/qtl',
  },
  Cotton: {
    confidence: 72,
    marketAnalysis:
      'Cotton prices at ₹6,200/qtl showing slight upward trend. Global cotton production shortfall may support prices. Textile industry demand is recovering post-festive season. Domestic cotton arrival is 15% lower than last year.',
    riskFactors:
      'High bollworm risk in current conditions. Pink bollworm resistance to certain pesticides reported. Excessive rainfall can cause boll rot. Price volatility expected due to international trade dynamics.',
    seasonContext:
      'Kharif season is ideal for cotton. Current temperature of 28-32°C is optimal. Monsoon progress supports timely sowing. Humidity levels are manageable for fiber development.',
    waterRequirement:
      'Requires 5-6 irrigations total. Critical moisture needed during flowering and boll development. Drip irrigation recommended for water efficiency. Avoid water stress during boll opening phase.',
    soilSuitability:
      'Performs best in black cotton soil (vertisols). Tolerates slightly alkaline pH up to 8.0. Good internal drainage is important. Soil depth of 45cm+ is preferred for root development.',
    bestPractice:
      'Use Bt cotton seeds with refuge area. Apply phosphorus and potassium at sowing. Monitor for bollworm with pheromone traps. Defoliate 15 days before picking for uniform maturity.',
    expectedYield: '8-12 quintals/acre with Bt varieties',
    marketPrice: '₹6,000-6,500/qtl (current), rising trend',
  },
  Soybean: {
    confidence: 78,
    marketAnalysis:
      'Soybean prices stable at ₹4,300/qtl. Rising demand from edible oil industry. India imports 60% of edible oil — domestic production is crucial. Soy meal export demand from poultry sector is strong.',
    riskFactors:
      'Yellow mosaic virus risk during early growth. Waterlogging can cause severe damage. Pod borer may attack during flowering. Weed competition in first 3 weeks reduces yield significantly.',
    seasonContext:
      'Kharif season is perfect for soybean. Current soil temperature is ideal for germination. Adequate monsoon forecast supports rainfed cultivation. Sowing should be completed by mid-July for best results.',
    waterRequirement:
      'Primarily rainfed, needs 500-700mm total rainfall. Supplemental irrigation at flowering if monsoon breaks. Avoid waterlogging — soybean is sensitive to excess moisture. Mulching helps retain soil moisture.',
    soilSuitability:
      'Well-drained loamy to sandy loam soil is ideal. pH range 6.0-7.5 is optimal. Avoid heavy clay soils. Rhizobium inoculation recommended for nitrogen fixation.',
    bestPractice:
      'Treat seeds with Rhizobium + fungicide. Apply 20:40:20 NPK at sowing. Row spacing of 30cm with 5cm plant spacing. Timely weeding in first 30 days is essential.',
    expectedYield: '12-16 quintals/acre with recommended practices',
    marketPrice: '₹4,200-4,500/qtl (current), stable',
  },
  Rice: {
    confidence: 82,
    marketAnalysis:
      'Rice prices at ₹3,100/qtl are firm. Paddy procurement by government at MSP ₹2,300/qtl. Basmati premium variety commands ₹3,500-4,000/qtl. Export to Middle East and Africa supports demand.',
    riskFactors:
      'Blast disease risk in humid conditions. Brown plant hopper may infest during tillering. Flood risk in low-lying areas. Narrow window between harvest and Rabi sowing.',
    seasonContext:
      'Kharif paddy season is active. Current rainfall pattern supports transplantation. Temperature of 25-30°C is ideal for crop growth. Day length is suitable for most varieties.',
    waterRequirement:
      'Requires 1,200-1,500mm water throughout season. Continuous flooding of 5cm during active growth. Critical water need at flowering and grain filling. Alternate wetting and drying can save 20% water.',
    soilSuitability:
      'Heavy clay to clay loam soils are ideal. Tolerates wide pH range 5.5-6.5. Requires good water retention capacity. Soil should be level for uniform water distribution.',
    bestPractice:
      'Use hybrid varieties for higher yield. Apply DAP + MOP as basal dose. Transplant 25-30 day old seedlings. Maintain 5cm standing water during active vegetative phase. Apply zinc sulfate if deficiency observed.',
    expectedYield: '25-35 quintals/acre (paddy) with hybrids',
    marketPrice: '₹3,000-3,200/qtl (current), MSP ₹2,300/qtl',
  },
  Sugarcane: {
    confidence: 80,
    marketAnalysis:
      'Sugarcane prices at ₹350/qtl supported by FRP ₹315/qtl. Sugar mills have started early crushing. Ethanol blending program increases demand. Recovery rate improvement can boost returns significantly.',
    riskFactors:
      'Red rot disease is a major concern. Early shoot borer attack reduces germination. Water stress during formative phase affects growth. Labour shortage for harvesting is a growing issue.',
    seasonContext:
      'Both spring and autumn planting windows exist. Current season supports autumn planting. Temperature of 25-35°C is optimal for growth. Adequate irrigation available for sustained growth.',
    waterRequirement:
      'Very high water need — 2,000-2,500mm per season. Requires irrigation every 7-10 days. Critical moisture needed during tillering and grand growth phases. Drip irrigation with fertigation gives best results.',
    soilSuitability:
      'Well-drained loamy soil with good water retention. pH 6.5-8.0 is acceptable. Avoid waterlogged or sandy soils. Deep soil (60cm+) preferred for root penetration.',
    bestPractice:
      'Use heat-treated setts from disease-free crop. Apply 50:25:25 NPK schedule. Earthing up at 120 days improves stooling. Ratoon management with trash mulching improves next crop.',
    expectedYield: '350-450 quintals/acre with good management',
    marketPrice: '₹340-360/qtl (current), FRP ₹315/qtl',
  },
  Onion: {
    confidence: 68,
    marketAnalysis:
      'Onion prices are volatile at ₹1,800/qtl. Sharp price swings are common — last cycle saw ₹800-4,000 range. Storage capacity determines selling strategy. Export ban/lift decisions by government create uncertainty.',
    riskFactors:
      'Very high price volatility — biggest risk factor. Thrip and purple blotch disease common. Excessive rain during harvest causes heavy losses. Storage losses of 15-25% without proper facilities.',
    seasonContext:
      'Rabi onion season gives best storage quality. Current planting window is open until December. Cool weather during bulb development improves quality. Early planting may face pest pressure.',
    waterRequirement:
      'Moderate water need — 400-500mm total. Irrigation at 10-day intervals. Stop irrigation 15 days before harvest for better curing. Drip irrigation prevents foliage wetness and disease.',
    soilSuitability:
      'Sandy loam to loam soil is ideal. pH 6.0-7.0 is optimal. Good drainage is essential. Soil should be loose for proper bulb development. Avoid heavy soils that restrict bulb expansion.',
    bestPractice:
      'Use graded bulbs (50-65mm) for planting. Apply 60:40:40 NPK per acre. Apply Boron and Sulphur for bulb quality. Proper curing and storage in ventilated structure. Consider staggered planting for price risk management.',
    expectedYield: '120-180 quintals/acre with drip irrigation',
    marketPrice: '₹1,500-2,500/qtl (highly volatile)',
  },
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
    <button
      onClick={() => navigate(target as any)}
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

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  let color = 'text-green-500';
  let strokeColor = 'stroke-green-500';
  if (value < 70) {
    color = 'text-orange-500';
    strokeColor = 'stroke-orange-500';
  } else if (value < 80) {
    color = 'text-yellow-500';
    strokeColor = 'stroke-yellow-500';
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={strokeColor}
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${color}`}>
        <motion.span
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}%
        </motion.span>
      </div>
    </div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function AnalysisCard({
  icon,
  title,
  detail,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-lg shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-green-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SimulatorScreen() {
  const { t } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [investment, setInvestment] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CropAnalysis | null>(null);

  const handleAnalyze = () => {
    if (!selectedCrop || !investment || !farmSize) return;
    setLoading(true);
    setAnalysis(null);
    setTimeout(() => {
      setAnalysis(cropAnalysisData[selectedCrop] || null);
      setLoading(false);
    }, 2000);
  };

  const totalInvestment = parseFloat(investment) * (parseFloat(farmSize) || 0);

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl" role="img" aria-label={t.whatIfSimulator}>
              🧠
            </span>
            <h1 className="text-lg font-bold text-green-800">{t.aiDecisionExplainer}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        <p className="text-sm text-gray-500 text-center">{t.aiDecisionDesc}</p>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
          <h2 className="text-base font-semibold text-green-800">{t.yourCrop}</h2>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Select Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {crops.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                {t.investmentPerAcre} (₹)
              </label>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                {t.farmSizeLabel} (acres)
              </label>
              <input
                type="number"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {investment && farmSize && (
            <div className="bg-green-50 rounded-xl p-3 flex justify-between items-center text-sm">
              <span className="text-green-700 font-medium">{t.investmentDetails}</span>
              <span className="text-green-800 font-bold">{formatINR(totalInvestment)}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!selectedCrop || !investment || !farmSize || loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analyzing…
              </span>
            ) : (
              t.getAiAnalysis
            )}
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded-lg w-1/3 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-full animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-4/5 animate-pulse" />
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded-lg w-2/5 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-full animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-3/5 animate-pulse" />
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded-lg w-1/2 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-full animate-pulse" />
              <div className="h-3 bg-gray-100 rounded-lg w-2/3 animate-pulse" />
            </div>
          </motion.div>
        )}

        {/* Results */}
        {analysis && !loading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Section Header */}
            <motion.div variants={staggerItem} className="text-center space-y-1">
              <h2 className="text-base font-semibold text-green-800">
                {t.whyThisDecision}
              </h2>
              <p className="text-xs text-gray-500">{selectedCrop} • {formatINR(totalInvestment)} • {farmSize} acres</p>
            </motion.div>

            {/* AI Confidence Score */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-green-800 mb-1">
                    {t.aiConfidence}
                  </h3>
                  <p className="text-xs text-gray-500">{t.aiReasonDetail}</p>
                </div>
                <CircularProgress value={analysis.confidence} />
              </div>
            </motion.div>

            {/* Market Analysis */}
            <AnalysisCard
              icon={<span>📊</span>}
              title={t.marketAnalysis}
              detail={analysis.marketAnalysis}
              index={0}
            />

            {/* Risk Factors */}
            <AnalysisCard
              icon={<span>⚠️</span>}
              title={t.riskFactors}
              detail={analysis.riskFactors}
              index={1}
            />

            {/* Season Context */}
            <AnalysisCard
              icon={<span>📅</span>}
              title={t.seasonContext}
              detail={analysis.seasonContext}
              index={2}
            />

            {/* Water Requirement */}
            <AnalysisCard
              icon={<span>💧</span>}
              title={t.waterRequirement}
              detail={analysis.waterRequirement}
              index={3}
            />

            {/* Soil Suitability */}
            <AnalysisCard
              icon={<span>🌱</span>}
              title={t.soilSuitability}
              detail={analysis.soilSuitability}
              index={4}
            />

            {/* Best Practice */}
            <AnalysisCard
              icon={<span>✅</span>}
              title={t.bestPractice}
              detail={analysis.bestPractice}
              index={5}
            />

            {/* Expected Yield & Market Price Summary */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3"
            >
              <h3 className="text-sm font-semibold text-green-800">{t.aiReasonTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-green-600 font-medium mb-0.5">{t.expectedYieldDetails}</p>
                  <p className="text-sm text-green-800 font-semibold">{analysis.expectedYield}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-green-600 font-medium mb-0.5">{t.marketPriceDetails}</p>
                  <p className="text-sm text-green-800 font-semibold">{analysis.marketPrice}</p>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              variants={staggerItem}
              className="bg-amber-50 rounded-2xl border border-amber-200 p-4"
            >
              <p className="text-xs text-amber-700 leading-relaxed flex items-start gap-2">
                <span className="shrink-0 mt-0.5">ℹ️</span>
                {t.disclaimer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>
    </PageWrapper>
  );
}
