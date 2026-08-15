'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

const STORAGE_KEY = 'kp_farm_memory';
const PHOTO_KEY = 'kp_farmer_photo';

interface FarmMemoryData {
  soilType: string;
  irrigationSource: string;
  farmingExperience: string;
  landOwnership: string;
  lastCrop: string;
  expectedHarvestMonth: string;
  livestockCount: string;
  fertilizerBrand: string;
  seedSource: string;
  lastSeasonCrop: string;
  lastSeasonYield: string;
  lastSeasonIncome: string;
  lastSeasonExpense: string;
  lastSeasonMajorProblem: string;
  lastSeasonPestIssue: string;
  lastSeasonSatisfaction: string;
  lastSeasonLesson: string;
  lastSeasonCropDamage: string;
}

const defaultData: FarmMemoryData = {
  soilType: '',
  irrigationSource: '',
  farmingExperience: '',
  landOwnership: 'own',
  lastCrop: '',
  expectedHarvestMonth: '',
  livestockCount: '',
  fertilizerBrand: '',
  seedSource: '',
  lastSeasonCrop: '',
  lastSeasonYield: '',
  lastSeasonIncome: '',
  lastSeasonExpense: '',
  lastSeasonMajorProblem: '',
  lastSeasonPestIssue: '',
  lastSeasonSatisfaction: '',
  lastSeasonLesson: '',
  lastSeasonCropDamage: '',
};

function loadFarmMemory(): FarmMemoryData {
  if (typeof window === 'undefined') return defaultData;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* ignore */
    }
  }
  return defaultData;
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

function FieldCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.06, duration: 0.4 }}
      className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4"
    >
      {children}
    </motion.div>
  );
}

export default function FarmMemoryScreen() {
  const { t, navigate } = useApp();
  const [formData, setFormData] = useState<FarmMemoryData>(() => loadFarmMemory());
  const [showSuccess, setShowSuccess] = useState(false);
  const [farmerPhoto] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(PHOTO_KEY);
  });

  const updateField = useCallback((field: keyof FarmMemoryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  }, [formData]);

  const inputClass =
    'w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white text-gray-800';
  const selectClass =
    'w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all bg-white text-gray-800 appearance-none';
  const labelClass = 'text-xs text-gray-500 mb-1.5 block font-medium';

  const isEditing = Object.values(formData).some((v) => v !== '' && v !== 'own');

  return (
    <PageWrapper>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🧠</span>
            <h1 className="text-lg font-bold text-green-800">{t.farmMemory}</h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Farmer Photo & Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="relative">
            {farmerPhoto ? (
              <img
                src={farmerPhoto}
                alt={t.profilePhoto}
                className="w-20 h-20 rounded-full object-cover border-3 border-green-400 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl shadow-md">
                👨‍🌾
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow">
              <span className="text-white text-xs">🧠</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-base font-bold text-green-800">
              {t.tellUsAboutFarm}
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              {t.farmMemoryDesc}
            </p>
          </div>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-3">
          {/* 1. Soil Type */}
          <FieldCard index={0}>
            <label className={labelClass}>{t.soilType}</label>
            <select
              value={formData.soilType}
              onChange={(e) => updateField('soilType', e.target.value)}
              className={selectClass}
            >
              <option value="">{t.soilTypePlaceholder}</option>
              <option value="loamy">{t.soilLoamy}</option>
              <option value="clay">{t.soilClay}</option>
              <option value="sandy">{t.soilSandy}</option>
              <option value="black">{t.soilBlack}</option>
              <option value="red">{t.soilRed}</option>
            </select>
          </FieldCard>

          {/* 2. Irrigation Source */}
          <FieldCard index={1}>
            <label className={labelClass}>{t.irrigationSource}</label>
            <select
              value={formData.irrigationSource}
              onChange={(e) => updateField('irrigationSource', e.target.value)}
              className={selectClass}
            >
              <option value="">{t.irrigationSourcePlaceholder}</option>
              <option value="well">{t.irrigationWell}</option>
              <option value="canal">{t.irrigationCanal}</option>
              <option value="rain">{t.irrigationRain}</option>
              <option value="drip">{t.irrigationDrip}</option>
            </select>
          </FieldCard>

          {/* 3. Farming Experience */}
          <FieldCard index={2}>
            <label className={labelClass}>{t.farmingExperience}</label>
            <input
              type="text"
              value={formData.farmingExperience}
              onChange={(e) => updateField('farmingExperience', e.target.value)}
              placeholder={t.farmingExperiencePlaceholder}
              className={inputClass}
            />
          </FieldCard>

          {/* 4. Land Ownership (Toggle) */}
          <FieldCard index={3}>
            <label className={labelClass}>{t.ownOrLeased}</label>
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => updateField('landOwnership', 'own')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  formData.landOwnership === 'own'
                    ? 'bg-green-500 text-white shadow-md shadow-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.ownLand}
              </button>
              <button
                type="button"
                onClick={() => updateField('landOwnership', 'leased')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  formData.landOwnership === 'leased'
                    ? 'bg-green-500 text-white shadow-md shadow-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.leasedLand}
              </button>
            </div>
          </FieldCard>

          {/* 5. Last Harvested Crop */}
          <FieldCard index={4}>
            <label className={labelClass}>{t.lastCrop}</label>
            <input
              type="text"
              value={formData.lastCrop}
              onChange={(e) => updateField('lastCrop', e.target.value)}
              placeholder={t.lastCropPlaceholder}
              className={inputClass}
            />
          </FieldCard>

          {/* 6. Expected Harvest Month */}
          <FieldCard index={5}>
            <label className={labelClass}>{t.expectedHarvestMonth}</label>
            <input
              type="text"
              value={formData.expectedHarvestMonth}
              onChange={(e) => updateField('expectedHarvestMonth', e.target.value)}
              placeholder={t.expectedHarvestPlaceholder}
              className={inputClass}
            />
          </FieldCard>

          {/* 7. Livestock Count */}
          <FieldCard index={6}>
            <label className={labelClass}>{t.livestockCount}</label>
            <input
              type="text"
              value={formData.livestockCount}
              onChange={(e) => updateField('livestockCount', e.target.value)}
              placeholder={t.livestockCountPlaceholder}
              className={inputClass}
            />
          </FieldCard>

          {/* 8. Preferred Fertilizer Brand */}
          <FieldCard index={7}>
            <label className={labelClass}>{t.fertilizerBrand}</label>
            <input
              type="text"
              value={formData.fertilizerBrand}
              onChange={(e) => updateField('fertilizerBrand', e.target.value)}
              placeholder={t.fertilizerBrandPlaceholder}
              className={inputClass}
            />
          </FieldCard>

          {/* 9. Seed Source */}
          <FieldCard index={8}>
            <label className={labelClass}>{t.seedSource}</label>
            <select
              value={formData.seedSource}
              onChange={(e) => updateField('seedSource', e.target.value)}
              className={selectClass}
            >
              <option value="">{t.seedSourcePlaceholder}</option>
              <option value="local">{t.seedSourceLocal}</option>
              <option value="govt">{t.seedSourceGovt}</option>
              <option value="private">{t.seedSourcePrivate}</option>
              <option value="own">{t.seedSourceOwn}</option>
            </select>
          </FieldCard>
        </div>

        {/* Last Season Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="pt-4"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">📋</span>
            <h2 className="text-base font-bold text-green-800">
              {(t as any).lastSeasonReview || 'Last Season Review'}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mb-3 ml-11">
            {(t as any).lastSeasonReviewDesc || 'Tell us about your previous farming season'}
          </p>
          <div className="h-px bg-gradient-to-r from-green-300 via-green-200 to-transparent" />
        </motion.div>

        <div className="space-y-3">
          {/* 10. Last Season Crop */}
          <FieldCard index={9}>
            <label className={labelClass}>{(t as any).lastSeasonCrop || 'Last Season Crop'}</label>
            <select
              value={formData.lastSeasonCrop}
              onChange={(e) => updateField('lastSeasonCrop', e.target.value)}
              className={selectClass}
            >
              <option value="">{(t as any).lastSeasonCropPlaceholder || 'Select last season\'s crop'}</option>
              <option value="wheat">{(t as any).lastSeasonCropWheat || 'Wheat'}</option>
              <option value="cotton">{(t as any).lastSeasonCropCotton || 'Cotton'}</option>
              <option value="soybean">{(t as any).lastSeasonCropSoybean || 'Soybean'}</option>
              <option value="rice">{(t as any).lastSeasonCropRice || 'Rice'}</option>
              <option value="sugarcane">{(t as any).lastSeasonCropSugarcane || 'Sugarcane'}</option>
              <option value="onion">{(t as any).lastSeasonCropOnion || 'Onion'}</option>
              <option value="other">{(t as any).lastSeasonCropOther || 'Other'}</option>
            </select>
          </FieldCard>

          {/* 11. Last Season Yield */}
          <FieldCard index={10}>
            <label className={labelClass}>{(t as any).lastSeasonYield || 'Yield per Acre'}</label>
            <input
              type="text"
              value={formData.lastSeasonYield}
              onChange={(e) => updateField('lastSeasonYield', e.target.value)}
              placeholder={(t as any).lastSeasonYieldPlaceholder || 'e.g. 15 quintals/acre'}
              className={inputClass}
            />
          </FieldCard>

          {/* 12. Last Season Income */}
          <FieldCard index={11}>
            <label className={labelClass}>{(t as any).lastSeasonIncome || 'Total Income'}</label>
            <input
              type="text"
              value={formData.lastSeasonIncome}
              onChange={(e) => updateField('lastSeasonIncome', e.target.value)}
              placeholder={(t as any).lastSeasonIncomePlaceholder || 'e.g. ₹50,000'}
              className={inputClass}
            />
          </FieldCard>

          {/* 13. Last Season Expense */}
          <FieldCard index={12}>
            <label className={labelClass}>{(t as any).lastSeasonExpense || 'Total Expense'}</label>
            <input
              type="text"
              value={formData.lastSeasonExpense}
              onChange={(e) => updateField('lastSeasonExpense', e.target.value)}
              placeholder={(t as any).lastSeasonExpensePlaceholder || 'e.g. ₹25,000'}
              className={inputClass}
            />
          </FieldCard>

          {/* 14. Major Problem Faced */}
          <FieldCard index={13}>
            <label className={labelClass}>{(t as any).lastSeasonMajorProblem || 'Major Problem Faced'}</label>
            <select
              value={formData.lastSeasonMajorProblem}
              onChange={(e) => updateField('lastSeasonMajorProblem', e.target.value)}
              className={selectClass}
            >
              <option value="">{(t as any).lastSeasonMajorProblemPlaceholder || 'Select main problem'}</option>
              <option value="pest">{(t as any).problemPest || 'Pest Attack'}</option>
              <option value="water">{(t as any).problemWater || 'Water Shortage'}</option>
              <option value="market">{(t as any).problemMarket || 'Low Market Price'}</option>
              <option value="disease">{(t as any).problemDisease || 'Crop Disease'}</option>
              <option value="weather">{(t as any).problemWeather || 'Weather Damage'}</option>
              <option value="labor">{(t as any).problemLabor || 'Labor Shortage'}</option>
              <option value="none">{(t as any).problemNone || 'No Major Problem'}</option>
            </select>
          </FieldCard>

          {/* 15. Pest/Disease Details */}
          <FieldCard index={14}>
            <label className={labelClass}>{(t as any).lastSeasonPestIssue || 'Pest/Disease Details'}</label>
            <input
              type="text"
              value={formData.lastSeasonPestIssue}
              onChange={(e) => updateField('lastSeasonPestIssue', e.target.value)}
              placeholder={(t as any).lastSeasonPestIssuePlaceholder || 'Which pest or disease?'}
              className={inputClass}
            />
          </FieldCard>

          {/* 16. Satisfaction Level */}
          <FieldCard index={15}>
            <label className={labelClass}>{(t as any).lastSeasonSatisfaction || 'Satisfaction Level'}</label>
            <select
              value={formData.lastSeasonSatisfaction}
              onChange={(e) => updateField('lastSeasonSatisfaction', e.target.value)}
              className={selectClass}
            >
              <option value="">{(t as any).lastSeasonSatisfactionPlaceholder || 'How satisfied were you?'}</option>
              <option value="very-satisfied">{(t as any).satisfactionVerySatisfied || 'Very Satisfied'}</option>
              <option value="satisfied">{(t as any).satisfactionSatisfied || 'Satisfied'}</option>
              <option value="neutral">{(t as any).satisfactionNeutral || 'Neutral'}</option>
              <option value="dissatisfied">{(t as any).satisfactionDissatisfied || 'Dissatisfied'}</option>
              <option value="very-dissatisfied">{(t as any).satisfactionVeryDissatisfied || 'Very Dissatisfied'}</option>
            </select>
          </FieldCard>

          {/* 17. Key Learning */}
          <FieldCard index={16}>
            <label className={labelClass}>{(t as any).lastSeasonLesson || 'Key Learning'}</label>
            <textarea
              value={formData.lastSeasonLesson}
              onChange={(e) => updateField('lastSeasonLesson', e.target.value)}
              placeholder={(t as any).lastSeasonLessonPlaceholder || 'What did you learn from last season?'}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </FieldCard>

          {/* 18. Crop Damage % */}
          <FieldCard index={17}>
            <label className={labelClass}>{(t as any).lastSeasonCropDamage || 'Crop Damage %'}</label>
            <input
              type="text"
              value={formData.lastSeasonCropDamage}
              onChange={(e) => updateField('lastSeasonCropDamage', e.target.value)}
              placeholder={(t as any).lastSeasonCropDamagePlaceholder || 'e.g. 10%'}
              className={inputClass}
            />
          </FieldCard>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            {isEditing ? t.editFarmMemory : t.saveFarmMemory}
          </button>
        </motion.div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  className="w-10 h-10 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <h3 className="text-lg font-bold text-green-800">
                {t.farmMemorySaved}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {t.farmMemoryComplete}
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-2 px-6 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                {t.backToDashboard}
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </PageWrapper>
  );
}
