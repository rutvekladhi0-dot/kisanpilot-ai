'use client';

import React, { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTranslations, getLanguageLabel, type Language, type Translations } from '@/lib/i18n';
import VoiceKhataScreen from './screens/VoiceKhataScreen';
import FarmEconomicsScreen from './screens/FarmEconomicsScreen';
import BajarBhavScreen from './screens/BajarBhavScreen';
import RiskRadarScreen from './screens/RiskRadarScreen';
import SimulatorScreen from './screens/SimulatorScreen';
import PMFBYScreen from './screens/PMFBYScreen';
import FarmGoalsScreen from './screens/FarmGoalsScreen';
import NextBestActionScreen from './screens/NextBestActionScreen';
import MonthlyPhotoTrackerScreen from './screens/MonthlyPhotoTrackerScreen';
import FarmMemoryScreen from './screens/FarmMemoryScreen';
import SeasonScoreCardScreen from './screens/SeasonScoreCardScreen';

// ============================================================
// Types
// ============================================================
export type Screen = 'language' | 'profile' | 'dashboard' | 'chatbot' | 'myfarm' | 'cropdoctor' | 'weather' | 'insights' | 'alerts' | 'settings' | 'voicekhata' | 'farmeconomics' | 'bajarbhav' | 'riskradar' | 'simulator' | 'pmfby' | 'farmgoals' | 'nextbestaction' | 'phototracker' | 'farmmemory' | 'seasonscorecard';

export interface FarmerProfile {
  name: string;
  village: string;
  farmSize: string;
  mainCrop: string;
}

export interface AlertItem {
  id: number;
  text: string;
  icon: string;
  read: boolean;
}

// ============================================================
// App Context
// ============================================================
interface AppContextType {
  lang: Language;
  t: Translations;
  setLang: (l: Language) => void;
  profile: FarmerProfile | null;
  setProfile: (p: FarmerProfile) => void;
  screen: Screen;
  navigate: (s: Screen) => void;
  alerts: AlertItem[];
  setAlerts: (a: AlertItem[]) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function useApp() {
  return useContext(AppContext);
}

const defaultAlerts: AlertItem[] = [
  { id: 1, icon: '🌧', text: 'rainExpected', read: false },
  { id: 2, icon: '💧', text: 'monitorSoil', read: false },
  { id: 3, icon: '🐛', text: 'checkPestSigns', read: false },
  { id: 4, icon: '🧪', text: 'fertilizerReminder', read: false },
];

// ============================================================
// Main App Component
// ============================================================
export default function KisanPilotApp() {
  const initialized = useRef(false);
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('kp_lang') as Language) || 'en';
    }
    return 'en';
  });
  const [profile, setProfileState] = useState<FarmerProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kp_profile');
        return saved ? JSON.parse(saved) : null;
      } catch { return null; }
    }
    return null;
  });
  const [screen, setScreen] = useState<Screen>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('kp_lang');
      const savedProfile = localStorage.getItem('kp_profile');
      if (savedLang && savedProfile) return 'dashboard';
      if (savedLang) return 'profile';
    }
    return 'language';
  });
  const [alerts, setAlertsState] = useState<AlertItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kp_alerts');
        return saved ? JSON.parse(saved) : defaultAlerts;
      } catch { return defaultAlerts; }
    }
    return defaultAlerts;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      requestAnimationFrame(() => setMounted(true));
    }
  }, []);

  const t = getTranslations(lang);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('kp_lang', l);
  }, []);

  const setProfile = useCallback((p: FarmerProfile) => {
    setProfileState(p);
    localStorage.setItem('kp_profile', JSON.stringify(p));
  }, []);

  const navigate = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  }, []);

  const setAlerts = useCallback((a: AlertItem[]) => {
    setAlertsState(a);
    localStorage.setItem('kp_alerts', JSON.stringify(a));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider value={{ lang, t, setLang, profile, setProfile, screen, navigate, alerts, setAlerts }}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <AnimatePresence mode="wait">
          {screen === 'language' && <LanguageScreen key="language" />}
          {screen === 'profile' && <ProfileScreen key="profile" />}
          {screen === 'dashboard' && <DashboardScreen key="dashboard" />}
          {screen === 'chatbot' && <ChatbotScreen key="chatbot" />}
          {screen === 'myfarm' && <MyFarmScreen key="myfarm" />}
          {screen === 'cropdoctor' && <CropDoctorScreen key="cropdoctor" />}
          {screen === 'weather' && <WeatherScreen key="weather" />}
          {screen === 'insights' && <InsightsScreen key="insights" />}
          {screen === 'alerts' && <AlertsScreen key="alerts" />}
          {screen === 'settings' && <SettingsScreen key="settings" />}
          {screen === 'voicekhata' && <VoiceKhataScreen key="voicekhata" />}
          {screen === 'farmeconomics' && <FarmEconomicsScreen key="farmeconomics" />}
          {screen === 'bajarbhav' && <BajarBhavScreen key="bajarbhav" />}
          {screen === 'riskradar' && <RiskRadarScreen key="riskradar" />}
          {screen === 'simulator' && <SimulatorScreen key="simulator" />}
          {screen === 'pmfby' && <PMFBYScreen key="pmfby" />}
          {screen === 'farmgoals' && <FarmGoalsScreen key="farmgoals" />}
          {screen === 'nextbestaction' && <NextBestActionScreen key="nextbestaction" />}
          {screen === 'phototracker' && <MonthlyPhotoTrackerScreen key="phototracker" />}
          {screen === 'farmmemory' && <FarmMemoryScreen key="farmmemory" />}
          {screen === 'seasonscorecard' && <SeasonScoreCardScreen key="seasonscorecard" />}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

// ============================================================
// Shared Animation Variants
// ============================================================
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

function PageWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// Shared Back Button Component
// ============================================================
function BackButton({ target, label }: { target: Screen; label: string }) {
  const { navigate } = useApp();
  return (
    <button
      onClick={() => navigate(target)}
      className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
      {label}
    </button>
  );
}

// ============================================================
// LANGUAGE SELECTION SCREEN
// ============================================================
function LanguageScreen() {
  const { setLang, navigate } = useApp();
  const t = getTranslations('en');

  const languages = [
    { code: 'mr' as Language, flag: '🇮🇳', label: t.marathi },
    { code: 'hi' as Language, flag: '🇮🇳', label: t.hindi },
    { code: 'en' as Language, flag: '🌐', label: t.english },
  ];

  const handleSelect = (code: Language) => {
    setLang(code);
    navigate('profile');
  };

  return (
    <PageWrapper className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-2xl mx-auto mb-4 overflow-hidden">
            <img src="/images/logo.png" alt="KisanPilot AI" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">KisanPilot AI</h1>
          <p className="text-green-600 font-medium text-lg">{t.yourPersonalAi}</p>
        </motion.div>

        {/* Language Cards */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.chooseYourLanguage}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.languageSubtitle[0]}</p>
          {languages.map((lang, i) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              onClick={() => handleSelect(lang.code)}
              className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-green-500 transition-all duration-200 group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{lang.flag}</span>
              <span className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                {lang.label}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// ============================================================
// PROFILE SETUP SCREEN
// ============================================================
function ProfileScreen() {
  const { t, navigate, setProfile } = useApp();
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [mainCrop, setMainCrop] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; village?: string }>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const farmSizes = [
    { value: '<1', label: t.lessThanOneAcre },
    { value: '1-5', label: t.oneToFiveAcres },
    { value: '5-10', label: t.fiveToTenAcres },
    { value: '>10', label: t.moreThanTenAcres },
  ];

  const crops = [t.cropWheat, t.cropRice, t.cropCotton, t.cropSoybean, t.cropSugarcane, t.cropTomato, t.cropOnion, t.cropOther];

  const handleSave = () => {
    const newErrors: { name?: string; village?: string } = {};
    if (!name.trim()) newErrors.name = t.nameRequired;
    if (!village.trim()) newErrors.village = t.villageRequired;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setProfile({
      name: name.trim(),
      village: village.trim(),
      farmSize: farmSize || t.lessThanOneAcre,
      mainCrop: mainCrop || t.cropWheat,
    });
    if (photo) {
      localStorage.setItem('kp_farmer_photo', photo);
    }
    navigate('dashboard');
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    localStorage.removeItem('kp_farmer_photo');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <PageWrapper className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-lg mx-auto mb-3 cursor-pointer overflow-hidden border-4 border-white shadow-green-200"
          >
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">👨‍🌾</span>
            )}
          </motion.div>
          <div className="flex items-center justify-center gap-3 mb-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-green-600 font-semibold hover:text-green-800"
            >
              {t.changePhoto}
            </button>
            {photo && (
              <button
                onClick={removePhoto}
                className="text-xs text-red-500 font-semibold hover:text-red-700"
              >
                {t.removePhoto}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-400">{t.uploadPhotoLabel}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handlePhotoSelect}
            className="hidden"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">{t.setupProfile}</h1>
          <p className="text-gray-500 mt-1">{t.setupProfileSubtitle}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-5">
          {/* Farmer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.farmerName}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              placeholder={t.farmerNamePlaceholder}
              className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-green-500 focus:bg-white focus:outline-none transition-all text-gray-800`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Village Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.villageName}</label>
            <input
              type="text"
              value={village}
              onChange={(e) => { setVillage(e.target.value); setErrors(p => ({ ...p, village: undefined })); }}
              placeholder={t.villageNamePlaceholder}
              className={`w-full px-4 py-3 rounded-xl border-2 ${errors.village ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:border-green-500 focus:bg-white focus:outline-none transition-all text-gray-800`}
            />
            {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
          </div>

          {/* Farm Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.farmSize}</label>
            <div className="grid grid-cols-2 gap-2">
              {farmSizes.map((fs) => (
                <button
                  key={fs.value}
                  onClick={() => setFarmSize(fs.label)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    farmSize === fs.label
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Crop */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.mainCrop}</label>
            <select
              value={mainCrop}
              onChange={(e) => setMainCrop(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-gray-800"
            >
              <option value="">{t.selectCrop}</option>
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate('language')}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              {t.back}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              {t.saveAndContinue}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ============================================================
// DASHBOARD SCREEN
// ============================================================
function DashboardScreen() {
  const { t, profile, navigate, lang } = useApp();
  const [farmerPhoto, setFarmerPhoto] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kp_farmer_photo');
      if (saved) setFarmerPhoto(saved);
    }
  }, []);

  if (!profile) return null;

  const features = [
    { id: 'chatbot' as Screen, icon: '🤖', title: t.aiChatbot, desc: t.aiChatbotDesc, color: 'from-violet-500 to-purple-600' },
    { id: 'myfarm' as Screen, icon: '🌾', title: t.myFarm, desc: t.myFarmDesc, color: 'from-amber-500 to-orange-600' },
    { id: 'cropdoctor' as Screen, icon: '📷', title: t.cropDoctor, desc: t.cropDoctorDesc, color: 'from-rose-500 to-pink-600' },
    { id: 'weather' as Screen, icon: '🌦', title: t.weather, desc: t.weatherDesc, color: 'from-sky-500 to-blue-600' },
    { id: 'voicekhata' as Screen, icon: '🎙', title: t.voiceKhata, desc: t.voiceKhataDesc, color: 'from-emerald-500 to-green-600' },
    { id: 'farmeconomics' as Screen, icon: '💰', title: t.farmEconomics, desc: t.farmEconomicsDesc, color: 'from-green-500 to-emerald-600' },
    { id: 'bajarbhav' as Screen, icon: '🏪', title: t.bajarBhav, desc: t.bajarBhavDesc, color: 'from-yellow-500 to-amber-600' },
    { id: 'riskradar' as Screen, icon: '🎯', title: t.riskRadar, desc: t.riskRadarDesc, color: 'from-orange-500 to-red-600' },
    { id: 'simulator' as Screen, icon: '⚖️', title: t.whatIfSimulator, desc: t.whatIfDesc, color: 'from-indigo-500 to-violet-600' },
    { id: 'pmfby' as Screen, icon: '🏛', title: t.pmfbySchemes, desc: t.pmfbyDesc, color: 'from-blue-500 to-indigo-600' },
    { id: 'farmgoals' as Screen, icon: '🎯', title: t.farmGoals, desc: t.farmGoalsDesc, color: 'from-teal-500 to-cyan-600' },
    { id: 'nextbestaction' as Screen, icon: '✨', title: t.nextBestAction, desc: t.nextBestActionDesc, color: 'from-lime-500 to-green-600' },
    { id: 'phototracker' as Screen, icon: '📸', title: t.monthlyPhotoTracker, desc: t.monthlyPhotoTrackerDesc, color: 'from-pink-500 to-rose-600' },
    { id: 'farmmemory' as Screen, icon: '🧠', title: t.farmMemory, desc: t.farmMemoryDesc, color: 'from-emerald-500 to-teal-600' },
    { id: 'seasonscorecard' as Screen, icon: '🏆', title: t.seasonScoreCard, desc: t.seasonScoreCardDesc, color: 'from-amber-500 to-yellow-600' },
    { id: 'insights' as Screen, icon: '📊', title: t.farmInsights, desc: t.farmInsightsDesc, color: 'from-cyan-500 to-teal-600' },
    { id: 'alerts' as Screen, icon: '🔔', title: t.smartAlerts, desc: t.smartAlertsDesc, color: 'from-red-500 to-rose-600' },
  ];

  return (
    <PageWrapper>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-md overflow-hidden">
              <img src="/images/logo.png" alt="KisanPilot AI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-800 leading-tight">KisanPilot AI</h1>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                {getLanguageLabel(lang)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('settings')}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label={t.settings}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-8">
        {/* Welcome */}
        <div className="mt-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
              {farmerPhoto ? (
                <img src={farmerPhoto} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-base">👨‍🌾</span>
              )}
            </div>
            <span>{t.welcomeBack}, {profile.name} 👋</span>
          </h2>
          <p className="text-gray-500 mt-1">{t.smarterDecisions}</p>
        </div>

        {/* Farm Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: '📍', label: t.village, value: profile.village },
            { icon: '🌾', label: t.mainCrop, value: profile.mainCrop },
            { icon: '📏', label: t.farmSizeLabel, value: profile.farmSize },
            { icon: '🌱', label: t.farmStatus, value: t.good },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{card.label}</p>
              <p className="text-sm font-bold text-gray-800 mt-1 truncate">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Next Best Action Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('nextbestaction')}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 mb-4 shadow-md text-left hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✨</span>
            <h3 className="text-white font-bold">{t.nextBestAction}</h3>
            <span className="ml-auto text-white/70 text-xs">→</span>
          </div>
          <p className="text-green-100 text-sm">{t.action1}</p>
          <p className="text-green-200/60 text-xs mt-1">{t.action1Reason}</p>
        </motion.button>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-6 shadow-lg">
          <img src="/images/hero-farm.png" alt="Farm landscape" className="w-full h-44 md:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <h3 className="text-white text-xl md:text-2xl font-bold">{t.yourPersonalAi}</h3>
            <p className="text-white/80 text-sm mt-1">{t.smarterDecisions}</p>
          </div>
        </div>

        {/* Risk Radar Summary Strip */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">🎯 {t.riskSummary}</h3>
            <button onClick={() => navigate('riskradar')} className="text-xs text-green-600 font-semibold hover:text-green-800">View All →</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { label: t.rainRisk, level: 'medium' as const, icon: '🌧' },
              { label: t.waterStressRisk, level: 'low' as const, icon: '💧' },
              { label: t.diseaseRisk, level: 'low' as const, icon: '🐛' },
              { label: t.heatRisk, level: 'low' as const, icon: '🌡' },
              { label: t.costRisk, level: 'medium' as const, icon: '💸' },
              { label: t.insuranceReady, level: 'high' as const, icon: '🛡' },
            ].map((risk) => (
              <div key={risk.label} className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                risk.level === 'low' ? 'bg-green-100 text-green-700' : risk.level === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                <span>{risk.icon}</span>
                <span>{risk.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t.exploreFeatures}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {features.map((feature, i) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => navigate(feature.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h4 className="font-bold text-gray-800 text-sm md:text-base">{feature.title}</h4>
                <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* AI Agriculture Banner */}
        <div className="relative rounded-3xl overflow-hidden mt-8 shadow-lg">
          <img src="/images/ai-agriculture.png" alt="AI Agriculture" className="w-full h-40 md:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent" />
          <div className="absolute inset-0 flex items-center p-5 md:p-8">
            <div className="max-w-sm">
              <h3 className="text-white text-lg md:text-xl font-bold">AI-Powered Farming</h3>
              <p className="text-white/80 text-sm mt-1">Leverage artificial intelligence for smarter agricultural decisions.</p>
              <button
                onClick={() => navigate('insights')}
                className="mt-3 px-4 py-2 bg-white/90 text-green-800 rounded-xl font-semibold text-sm hover:bg-white transition-colors"
              >
                {t.farmInsights} →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-green-100 mt-4">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">KisanPilot AI v1.0</span>
          <span className="text-xs text-green-600 font-medium">🌱 {t.tagline}</span>
        </div>
      </footer>
    </PageWrapper>
  );
}

// ============================================================
// CHATBOT SCREEN
// ============================================================
interface ChatMessage {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

function ChatbotScreen() {
  const { t, lang } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening'>('idle');
  const [liveTranscript, setLiveTranscript] = useState('');
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const recognitionRef = React.useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getTransactionSummary = (): string => {
    try {
      const stored = localStorage.getItem('kp_voicekhata');
      if (!stored) return 'NO_DATA';
      const entries: any[] = JSON.parse(stored);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
      const recent = entries.filter((e: any) => e.date && new Date(e.date) >= thirtyDaysAgo);
      if (recent.length === 0) return 'NO_DATA';
      const income = recent.filter((e: any) => e.type === 'income').reduce((s: number, e: any) => s + (Number(e.amount) || 0), 0);
      const expense = recent.filter((e: any) => e.type === 'expense').reduce((s: number, e: any) => s + (Number(e.amount) || 0), 0);
      const net = income - expense;
      const incCount = recent.filter((e: any) => e.type === 'income').length;
      const expCount = recent.filter((e: any) => e.type === 'expense').length;
      return JSON.stringify({ income, expense, net, incCount, expCount, total: recent.length });
    } catch { return 'NO_DATA'; }
  };

  const getFarmMemorySummary = (): string => {
    try {
      const stored = localStorage.getItem('kp_farm_memory');
      if (!stored) return 'NO_DATA';
      return stored;
    } catch { return 'NO_DATA'; }
  };

  const formatCurrency = (amount: number): string => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const generateResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();

    // Greeting
    if (/^(hi|hello|hey|namaste|नमस्ते|हेलो|हाय)/i.test(lower.trim())) {
      return t.chatGreeting;
    }
    // Thank you
    if (/^(thank|thanks|धन्य|शुक्रिया|thank you)/i.test(lower.trim())) {
      return t.chatThankYou;
    }
    // Everything OK / Farm Status / Health Check
    if (lower.includes('everything ok') || lower.includes('everything is ok') || lower.includes('कुछ ठीक') || lower.includes('farm status') || lower.includes('खेत कैसा') || lower.includes('खेत कसा') || lower.includes('how is my farm') || lower.includes('overall health') || lower.includes('farm health')) {
      const mem = getFarmMemorySummary();
      if (mem !== 'NO_DATA') {
        const fm: any = JSON.parse(mem);
        const crop = fm.lastCrop || fm.lastSeasonCrop || t.defaultResponse;
        const soil = fm.soilType || 'N/A';
        const satisfaction = fm.lastSeasonSatisfaction || 'N/A';
        return t.chatFarmStatusResponse
          .replace('{crop}', crop)
          .replace('{soil}', soil)
          .replace('{satisfaction}', satisfaction);
      }
      return t.chatFarmStatusDefault;
    }
    // Transaction / Last Month / Expense / Income Summary
    if (lower.includes('transaction') || lower.includes('last month') || lower.includes('expense') || lower.includes('income') || lower.includes('my spend') || lower.includes('my earning') || lower.includes('khata') || lower.includes('राशि') || lower.includes('खर्च') || lower.includes('आय') || lower.includes('लेनदेन') || lower.includes('बाजार') || lower.includes('profit') || lower.includes('loss')) {
      const summary = getTransactionSummary();
      if (summary !== 'NO_DATA') {
        const data: any = JSON.parse(summary);
        const netLabel = data.net >= 0 ? t.netProfit : (t.totalExpense);
        return t.chatTransactionResponse
          .replace('{income}', formatCurrency(data.income))
          .replace('{expense}', formatCurrency(data.expense))
          .replace('{net}', formatCurrency(Math.abs(data.net)))
          .replace('{netLabel}', data.net >= 0 ? t.netProfit : 'Loss')
          .replace('{total}', String(data.total))
          .replace('{incCount}', String(data.incCount))
          .replace('{expCount}', String(data.expCount));
      }
      return t.chatTransactionNoData;
    }
    // Water / Irrigation
    if (lower.includes('water') || lower.includes('irrigat') || lower.includes('watering') || lower.includes('पानी') || lower.includes('सिंचाई')) {
      return t.waterResponse;
    }
    // Yellow Leaves
    if (lower.includes('yellow') || lower.includes('पील') || lower.includes('पिवळ')) {
      return t.yellowLeavesResponse;
    }
    // Pest / Insect
    if (lower.includes('pest') || lower.includes('insect') || lower.includes('कीट') || lower.includes('bug')) {
      return t.pestResponse;
    }
    // Fertilizer / Nutrient
    if (lower.includes('fertilizer') || lower.includes('nutrient') || lower.includes('उर्वरक') || lower.includes('पोषक') || lower.includes('खत')) {
      return t.fertilizerResponse;
    }
    // Weather
    if (lower.includes('weather') || lower.includes('मौसम') || lower.includes('हवामान') || lower.includes('rain') || lower.includes('बारिश') || lower.includes('बारसात')) {
      return t.weatherResponse;
    }
    // Soil / Soil Test / Soil Health
    if (lower.includes('soil') || lower.includes('मिट्टी') || lower.includes('माती') || lower.includes('soil test')) {
      return t.chatSoilResponse;
    }
    // Seed / Sowing / Planting
    if (lower.includes('seed') || lower.includes('sowing') || lower.includes('planting') || lower.includes('बीज') || lower.includes('बियाणे') || lower.includes('बुवाई')) {
      return t.chatSeedResponse;
    }
    // Harvest / Crop Ready
    if (lower.includes('harvest') || lower.includes('crop ready') || lower.includes('कटाई') || lower.includes('फसल तैयार') || lower.includes('कापणी')) {
      return t.chatHarvestResponse;
    }
    // Insurance / PMFBY
    if (lower.includes('insurance') || lower.includes('pmfby') || lower.includes('बीमा') || lower.includes('विमा')) {
      return t.chatInsuranceResponse;
    }
    // Loan / Credit / KCC
    if (lower.includes('loan') || lower.includes('credit') || lower.includes('kcc') || lower.includes('कर्ज') || lower.includes('क्रेडिट') || lower.includes('ऋण')) {
      return t.chatLoanResponse;
    }
    // Subsidy / Government Scheme
    if (lower.includes('subsidy') || lower.includes('scheme') || lower.includes('government') || lower.includes('सब्सिडी') || lower.includes('योजना') || lower.includes('सरकार')) {
      return t.chatSubsidyResponse;
    }
    // Organic Farming / Compost
    if (lower.includes('organic') || lower.includes('compost') || lower.includes('vermicompost') || lower.includes('जैविक') || lower.includes('कम्पोस्ट') || lower.includes('खाद')) {
      return t.chatOrganicResponse;
    }
    // Disease / Rot / Fungus / Blight
    if (lower.includes('disease') || lower.includes('rot') || lower.includes('fungus') || lower.includes('blight') || lower.includes('रोग') || lower.includes('बुरसी') || lower.includes('सड़न')) {
      return t.chatDiseaseResponse;
    }
    // Market Price / Mandi / Bajar Bhav
    if (lower.includes('market price') || lower.includes('mandi') || lower.includes('bajar') || lower.includes('bhav') || lower.includes('मंडी') || lower.includes('बाजार') || lower.includes('भाव')) {
      return t.chatMarketResponse;
    }
    // What should I do today / Next Action
    if (lower.includes('what should i do') || lower.includes('next action') || lower.includes('today') || lower.includes('आज') || lower.includes('करा') || lower.includes('करू') || lower.includes('करना चाहिए')) {
      return t.chatNextActionResponse;
    }
    // Scorecard / Season Performance
    if (lower.includes('scorecard') || lower.includes('score card') || lower.includes('season performance') || lower.includes('स्कोर') || lower.includes('प्रदर्शन')) {
      return t.chatScorecardResponse;
    }
    // Weed / Weed Control
    if (lower.includes('weed') || lower.includes('grass') || lower.includes('खरपतवार') || lower.includes('गवत')) {
      return t.chatWeedResponse;
    }
    // Drone / Technology / Modern
    if (lower.includes('drone') || lower.includes('technology') || lower.includes('modern') || lower.includes('ड्रोन') || lower.includes('तकनीक') || lower.includes('आधुनिक')) {
      return t.chatTechResponse;
    }
    // Crop rotation / Crop selection
    if (lower.includes('rotation') || lower.includes('which crop') || lower.includes('best crop') || lower.includes('फसल चुन') || lower.includes('फसल बदल') || lower.includes('फसल निवड')) {
      return t.chatCropRotationResponse;
    }
    // Help / What can you do
    if (lower.includes('help') || lower.includes('what can you') || lower.includes('मदद') || lower.includes('क्या कर') || lower.includes('मदत')) {
      return t.chatHelpResponse;
    }
    return t.defaultResponse;
  };

  const startVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (final) {
        setInput(final);
        setLiveTranscript('');
      } else if (interim) {
        setInput(interim);
        setLiveTranscript(interim);
      }
    };
    recognition.onerror = () => {
      setVoiceState('idle');
    };
    recognition.onend = () => {
      if (voiceState === 'listening') {
        recognition.start();
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
    setVoiceState('listening');
  };

  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setVoiceState('idle');
    setLiveTranscript('');
    if (input.trim()) {
      sendMessage();
    }
  };

  const toggleVoice = () => {
    if (voiceState === 'listening') {
      stopVoice();
    } else {
      startVoice();
    }
  };

  const sendMessage = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply: ChatMessage = { id: Date.now() + 1, role: 'bot', text: generateResponse(msgText) };
      setIsTyping(false);
      setMessages(prev => [...prev, botReply]);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <PageWrapper className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🤖</span>
            <h1 className="text-lg font-bold text-green-800">{t.aiAssistant}</h1>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.aiAssistant}</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">{t.defaultResponse}</p>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600 mb-3">{t.quickSuggestions}</p>
              <div className="grid grid-cols-1 gap-2">
                {[t.suggestion1, t.suggestion2, t.suggestion3, t.suggestion4, t.suggestion5, t.suggestion6, t.suggestion7, t.suggestion8].map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => sendMessage(s)}
                  className="w-full text-left px-4 py-3 bg-white rounded-xl border border-green-200 text-sm text-green-800 hover:bg-green-50 hover:border-green-300 transition-all shadow-sm"
                >
                  {s}
                </motion.button>
              ))}
              </div>
            </div>
          </div>
        )}

        {/* Message List */}
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-md'
                : 'bg-white border border-gray-200 text-gray-800 shadow-sm rounded-bl-md'
            }`}>
              <div className="whitespace-pre-wrap break-words">{msg.text}</div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex mb-4 justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          {/* Voice status indicator */}
          {voiceState === 'listening' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 w-fit"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2.5 h-2.5 bg-red-500 rounded-full"
              />
              <span className="text-xs font-medium text-red-600">{t.listeningChat}</span>
              <span className="text-xs text-red-400">{liveTranscript && `→ "${liveTranscript.slice(-40)}${liveTranscript.length > 40 ? '...' : ''}"`}</span>
            </motion.div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.typeMessage}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-gray-800 text-sm"
            />
            <button
              onClick={toggleVoice}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                voiceState === 'listening'
                  ? 'bg-red-500 shadow-lg shadow-red-200'
                  : 'bg-gray-100 hover:bg-green-50'
              }`}
              title={voiceState === 'listening' ? t.stopVoiceChat : t.startVoiceChat}
            >
              {voiceState === 'listening' ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4.5 12.75a6 6 0 0111.57 2.25M12 18.75a2.25 2.25 0 01-2.25-2.25V6.108c0-1.135.845-2.098 1.976-2.192a4.503 4.503 0 018.048 0c1.13.094 1.976 1.057 1.976 2.192V16.5a2.25 2.25 0 01-2.25 2.25H12z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ============================================================
// CROP DOCTOR SCREEN
// ============================================================
function CropDoctorScreen() {
  const { t } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2000);
  };

  const handleAnalyzeAnother = () => {
    setSelectedImage(null);
    setResult(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📷</span>
            <h1 className="text-lg font-bold text-green-800">{t.cropDoctorTitle}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <p className="text-gray-500 text-center mb-6">{t.cropDoctorSubtitle}</p>

        {/* Default State */}
        {!selectedImage && !result && (
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src="/images/crop-doctor.png" alt="Crop health" className="w-full h-64 object-cover" />
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-300 rounded-3xl p-10 text-center hover:border-green-500 hover:bg-green-50/50 transition-all cursor-pointer"
            >
              <div className="text-5xl mb-3">📷</div>
              <h3 className="text-lg font-bold text-gray-800">{t.uploadPhoto}</h3>
              <p className="text-gray-500 text-sm mt-1">{t.uploadPhotoDesc}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Image Selected */}
        {selectedImage && !result && (
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src={selectedImage} alt="Selected crop" className="w-full h-64 object-cover" />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-70 transition-all"
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  {t.analyzing}
                </span>
              ) : (
                t.analyzeCrop
              )}
            </button>
            <button
              onClick={() => { setSelectedImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              {t.back}
            </button>
          </div>
        )}

        {/* Analysis Result */}
        {result && (
          <div className="space-y-5">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src={selectedImage!} alt="Analyzed crop" className="w-full h-48 object-cover" />
            </div>

            {/* Health Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-600">{t.cropHealthScore}</span>
                <span className="text-2xl font-bold text-green-600">82%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Observation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">{t.possibleObservation}</h4>
              <p className="text-gray-800">{t.mildNutrientStress}</p>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">{t.recommendations}</h4>
              <ul className="space-y-2">
                {[
                  { icon: '🧪', text: t.rec1 },
                  { icon: '👁', text: t.rec2 },
                  { icon: '💧', text: t.rec3 },
                  { icon: '👨‍🔬', text: t.rec4 },
                ].map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <span className="text-lg">{r.icon}</span>
                    <span>{r.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Expert Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">👨‍🔬</span>
                <h3 className="text-sm font-bold text-amber-800">{t.expertConsultation}</h3>
              </div>
              <p className="text-xs text-amber-700">{t.expertConsultationDesc}</p>

              <div className="space-y-3">
                {[
                  { name: 'Dr. Ramesh Patil', specialty: 'Crop Pathology & Disease', phone: '+91 98765 43210', available: true },
                  { name: 'Shri. Sunil Deshmukh', specialty: 'Soil Science & Fertilizers', phone: '+91 87654 32109', available: true },
                  { name: 'Dr. Meena Kulkarni', specialty: 'Pest Management & Organic Farming', phone: '+91 76543 21098', available: false },
                ].map((expert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="bg-white rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {expert.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{expert.name}</p>
                      <p className="text-xs text-gray-500">{expert.specialty}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {expert.available ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-1">{t.expertAvailable}</span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium mb-1">Busy</span>
                      )}
                      <a href={`tel:${expert.phone.replace(/\s/g, '')}`} className="block text-xs text-green-600 font-semibold hover:text-green-800">{t.callExpert}</a>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-amber-600 italic">💡 {t.expertNote}</p>
            </motion.div>

            {/* Nearby Krushi Kendra */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🏪</span>
                <h3 className="text-sm font-bold text-gray-800">{t.nearbyKrushiKendra}</h3>
              </div>
              <p className="text-xs text-gray-500">{t.krushiKendraDesc}</p>

              <div className="space-y-3">
                {[
                  { name: 'Krushi Kendra - Main Branch', address: 'Near Bus Stand, Taluka Road', phone: '+91 95553 44332', hours: '8:00 AM - 7:00 PM', services: 'Seeds, Fertilizers, Pesticides, Tools' },
                  { name: 'Agri Service Center - West', address: 'NH-6 Highway, Village Entry Point', phone: '+91 84432 22119', hours: '7:00 AM - 6:30 PM', services: 'Seeds, Soil Testing, Spray Equipment' },
                  { name: 'Gram Seva Kendra', address: 'Village Panchayat Office, Main Road', phone: '+91 73321 11008', hours: '9:00 AM - 5:00 PM', services: 'Subsidy Forms, Insurance, Seeds' },
                ].map((center, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="border border-gray-100 rounded-xl p-3 space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">📍</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{center.name}</p>
                        <p className="text-xs text-gray-500">{center.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 ml-7">
                      <span className="flex items-center gap-1">📞 {center.phone}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 ml-7">
                      <span className="flex items-center gap-1">🕐 {center.hours}</span>
                    </div>
                    <div className="ml-7">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">
                        {center.services}
                      </span>
                    </div>
                    <div className="ml-7 flex gap-2">
                      <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors">
                        📞 {t.callExpert}
                      </a>
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors">
                        🗺️ {t.directions}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <button
              onClick={handleAnalyzeAnother}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {t.analyzeAnother}
            </button>
            <BackButton target="dashboard" label={t.backToDashboard} />
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

// ============================================================
// WEATHER SCREEN
// ============================================================
function WeatherScreen() {
  const { t } = useApp();

  const forecast = [
    { day: t.monday, icon: '☀️', temp: '30°C' },
    { day: t.tuesday, icon: '🌤', temp: '29°C' },
    { day: t.wednesday, icon: '🌧', temp: '26°C' },
    { day: t.thursday, icon: '⛅', temp: '28°C' },
    { day: t.friday, icon: '☀️', temp: '31°C' },
  ];

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🌦</span>
            <h1 className="text-lg font-bold text-green-800">{t.weatherTitle}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Weather Hero Image */}
        <div className="relative rounded-3xl overflow-hidden mb-6 shadow-lg">
          <img src="/images/weather-farm.png" alt="Farm weather" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-4xl font-bold text-white">28°C</span>
            <span className="text-white/80 text-sm ml-2">{t.partlyCloudy}</span>
          </div>
        </div>

        {/* Current Conditions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">{t.currentWeather}</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t.temperature, value: '28°C', icon: '🌡' },
              { label: t.condition, value: t.partlyCloudy, icon: '⛅' },
              { label: t.humidity, value: '65%', icon: '💧' },
              { label: t.wind, value: '12 km/h', icon: '💨' },
              { label: t.rainChance, value: '30%', icon: '🌧' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">{t.fiveDayForecast}</h3>
          <div className="space-y-3">
            {forecast.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 w-24">{day.day}</span>
                <span className="text-2xl">{day.icon}</span>
                <span className="text-sm font-bold text-gray-800">{day.temp}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 shadow-md text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold mb-1">{t.farmingAdvice}</h3>
              <p className="text-green-100 text-sm leading-relaxed">{t.rainAdvice}</p>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

// ============================================================
// MY FARM SCREEN
// ============================================================
function MyFarmScreen() {
  const { t, profile, setProfile } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [village, setVillage] = useState(profile?.village || '');
  const [farmSize, setFarmSize] = useState(profile?.farmSize || '');
  const [mainCrop, setMainCrop] = useState(profile?.mainCrop || '');

  const handleSave = () => {
    setProfile({ name, village, farmSize, mainCrop });
    setEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setName(profile.name);
      setVillage(profile.village);
      setFarmSize(profile.farmSize);
      setMainCrop(profile.mainCrop);
    }
    setEditing(false);
  };

  if (!profile) return null;

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🌾</span>
            <h1 className="text-lg font-bold text-green-800">{t.myFarmTitle}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Farm Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">{t.farmDetails}</h3>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-semibold hover:bg-green-200 transition-colors"
              >
                {t.editProfile}
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t.farmerName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t.villageName}</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t.farmSize}</label>
                <input
                  type="text"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{t.mainCrop}</label>
                <input
                  type="text"
                  value={mainCrop}
                  onChange={(e) => setMainCrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-green-500 focus:bg-white focus:outline-none transition-all text-sm text-gray-800"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  {t.saveChanges}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { icon: '👨‍🌾', label: t.farmerName, value: profile.name },
                { icon: '📍', label: t.villageName, value: profile.village },
                { icon: '📏', label: t.farmSizeLabel, value: profile.farmSize },
                { icon: '🌾', label: t.mainCrop, value: profile.mainCrop },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-gray-500">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Farm Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">{t.farmStatusSection}</h3>
          <div className="space-y-4">
            {[
              { icon: '🌱', label: t.cropHealth, value: t.good, color: 'green' },
              { icon: '💧', label: t.soilMoisture, value: t.moderate, color: 'yellow' },
              { icon: '🚰', label: t.irrigationStatus, value: t.onTrack, color: 'blue' },
            ].map((status) => (
              <div key={status.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{status.icon}</span>
                  <span className="text-sm text-gray-700">{status.label}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  status.color === 'green' ? 'bg-green-100 text-green-700' :
                  status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

// ============================================================
// FARM INSIGHTS SCREEN
// ============================================================
function InsightsScreen() {
  const { t } = useApp();
  const [insightIndex, setInsightIndex] = useState(0);
  const [animatedValues, setAnimatedValues] = useState({ health: 0, moisture: 0, irrigation: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({ health: 82, moisture: 68, irrigation: 75 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const insights = [t.insight1, t.insight2, t.insight3, t.insight4, t.insight5, t.insight6];

  const handleGenerate = () => {
    setAnimatedValues({ health: 0, moisture: 0, irrigation: 0 });
    setInsightIndex(prev => (prev + 1) % insights.length);
    setTimeout(() => {
      setAnimatedValues({ health: 82, moisture: 68, irrigation: 75 });
    }, 300);
  };

  const bars = [
    { label: t.cropHealthScore2, value: animatedValues.health, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100' },
    { label: t.soilMoisture2, value: animatedValues.moisture, color: 'from-sky-500 to-blue-500', bgColor: 'bg-sky-100' },
    { label: t.irrigationEfficiency, value: animatedValues.irrigation, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-100' },
  ];

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📊</span>
            <h1 className="text-lg font-bold text-green-800">{t.insightsTitle}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Progress Bars */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-5">Farm Analytics</h3>
          <div className="space-y-5">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 font-medium">{bar.label}</span>
                  <span className="text-sm font-bold text-gray-800">{bar.value}%</span>
                </div>
                <div className={`w-full h-3 ${bar.bgColor} rounded-full overflow-hidden`}>
                  <motion.div
                    className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 mb-6 shadow-md text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <h3 className="font-bold mb-1">{t.aiInsights}</h3>
              <motion.p
                key={insightIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-100 text-sm leading-relaxed"
              >
                {insights[insightIndex]}
              </motion.p>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          ✨ {t.generateInsight}
        </button>
      </main>
    </PageWrapper>
  );
}

// ============================================================
// SMART ALERTS SCREEN
// ============================================================
function AlertsScreen() {
  const { t, alerts, setAlerts } = useApp();

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">🔔</span>
            <h1 className="text-lg font-bold text-green-800">{t.alertsTitle}</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="w-full py-3 rounded-xl bg-green-100 text-green-700 font-semibold text-sm hover:bg-green-200 transition-colors mb-5"
          >
            ✅ {t.markAllAsRead}
          </button>
        )}

        {unreadCount === 0 && (
          <div className="text-center py-10 mb-5">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-gray-500">{t.noUnreadAlerts}</p>
          </div>
        )}

        <div className="space-y-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                alert.read
                  ? 'bg-gray-50 border-gray-100 opacity-60'
                  : 'bg-white border-green-200 shadow-sm'
              }`}
            >
              <div className="text-2xl">{alert.icon}</div>
              <div className="flex-1">
                <p className={`text-sm ${alert.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                  {t[alert.text as keyof Translations] || alert.text}
                </p>
              </div>
              {!alert.read && (
                <button
                  onClick={() => markAsRead(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200 transition-colors whitespace-nowrap"
                >
                  {t.markAsRead}
                </button>
              )}
              {alert.read && (
                <span className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-500 text-xs font-medium">
                  ✓
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}

// ============================================================
// SETTINGS SCREEN
// ============================================================
function SettingsScreen() {
  const { t, navigate, setLang, lang, setProfile, setAlerts, profile } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangeLanguage = () => {
    navigate('language');
  };

  const handleEditProfile = () => {
    navigate('myfarm');
  };

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    localStorage.removeItem('kp_lang');
    localStorage.removeItem('kp_profile');
    localStorage.removeItem('kp_alerts');
    setLang('en');
    setProfile(null!);
    setAlerts(defaultAlerts);
    navigate('language');
  };

  const settings = [
    { icon: '🌐', label: t.changeLanguageOption, desc: getLanguageLabel(lang), action: handleChangeLanguage, color: 'bg-violet-100 text-violet-700' },
    { icon: '👨‍🌾', label: t.editProfileOption, desc: profile?.name || '', action: handleEditProfile, color: 'bg-amber-100 text-amber-700' },
    { icon: '🗑', label: t.resetData, desc: '', action: handleReset, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <PageWrapper className="flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <BackButton target="dashboard" label={t.backToDashboard} />
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">⚙️</span>
            <h1 className="text-lg font-bold text-green-800">{t.settingsTitle}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Confirm Reset Dialog */}
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚠️</div>
                <h3 className="text-lg font-bold text-gray-800">{t.resetData}</h3>
              </div>
              <p className="text-gray-600 text-sm text-center mb-6">{t.resetConfirm}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
                >
                  {t.cancelReset}
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm shadow-md hover:bg-red-600 transition-all"
                >
                  {t.confirmReset}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="space-y-3">
          {settings.map((setting, i) => (
            <motion.button
              key={setting.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={setting.action}
              className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all text-left"
            >
              <div className={`w-12 h-12 rounded-xl ${setting.color} flex items-center justify-center`}>
                <span className="text-xl">{setting.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{setting.label}</h3>
                {setting.desc && <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          ))}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-md mx-auto mb-3">
            <span className="text-2xl">🌾</span>
          </div>
          <h3 className="font-bold text-green-800">KisanPilot AI</h3>
          <p className="text-xs text-gray-500 mt-1">v1.0 — {t.tagline}</p>
        </div>
      </main>
    </PageWrapper>
  );
}
