'use client';
import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../KisanPilotApp';

const STORAGE_KEY = 'kp_photo_tracker';
const MAX_PHOTOS = 50;

interface PhotoRecord {
  month: string; // '2025-07'
  week: number;  // 1-4
  date: string;  // '2025-07-07'
  image: string; // base64
}

interface PhotoTrackerData {
  photos: PhotoRecord[];
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const SCHEDULED_DAYS = [7, 14, 21, 28];

function loadData(): PhotoTrackerData {
  if (typeof window === 'undefined') return { photos: [] };
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* ignore */
    }
  }
  return { photos: [] };
}

function saveData(data: PhotoTrackerData) {
  if (typeof window === 'undefined') return;
  // Auto-delete oldest photos if over limit
  if (data.photos.length > MAX_PHOTOS) {
    data.photos = data.photos.slice(data.photos.length - MAX_PHOTOS);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCurrentMonthKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function getScheduledDate(weekIndex: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  const day = SCHEDULED_DAYS[weekIndex];
  const d = new Date(year, month, day);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function formatDisplayMonth(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const monthName = MONTH_NAMES[parseInt(month, 10) - 1];
  return `${monthName} ${year}`;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function CameraIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
      />
    </svg>
  );
}

export default function MonthlyPhotoTrackerScreen() {
  const { t, navigate } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<PhotoTrackerData>(loadData);
  const [previewPhoto, setPreviewPhoto] = useState<PhotoRecord | null>(null);
  const [activeWeekForUpload, setActiveWeekForUpload] = useState<number | null>(null);

  const currentMonthKey = getCurrentMonthKey();
  const currentMonthPhotos = data.photos.filter((p) => p.month === currentMonthKey);
  const photosThisMonth = currentMonthPhotos.length;
  const progressPercent = Math.round((photosThisMonth / 4) * 100);

  // Group past months
  const pastMonthKeys = [...new Set(
    data.photos
      .map((p) => p.month)
      .filter((m) => m !== currentMonthKey)
      .sort()
      .reverse()
  )];

  const handleCapturePhoto = useCallback(
    (weekIndex: number) => {
      setActiveWeekForUpload(weekIndex);
      fileInputRef.current?.click();
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || activeWeekForUpload === null) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const scheduledDate = getScheduledDate(activeWeekForUpload);

        const newPhoto: PhotoRecord = {
          month: currentMonthKey,
          week: activeWeekForUpload + 1,
          date: scheduledDate,
          image: base64,
        };

        const updatedData: PhotoTrackerData = {
          photos: [
            ...data.photos.filter(
              (p) => !(p.month === currentMonthKey && p.week === activeWeekForUpload + 1)
            ),
            newPhoto,
          ],
        };

        saveData(updatedData);
        setData(updatedData);
      };
      reader.readAsDataURL(file);

      // Reset input so same file can be re-selected
      e.target.value = '';
      setActiveWeekForUpload(null);
    },
    [activeWeekForUpload, currentMonthKey, data.photos]
  );

  const getPhotoForWeek = (week: number): PhotoRecord | undefined => {
    return currentMonthPhotos.find((p) => p.week === week);
  };

  const weekLabels = [t.week1, t.week2, t.week3, t.week4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-lg w-full rounded-2xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewPhoto.image}
              alt={`Week ${previewPhoto.week}`}
              className="w-full object-contain max-h-[70vh]"
            />
            <div className="p-4 text-center">
              <p className="text-sm font-semibold text-green-800">
                {t[`week${previewPhoto.week}` as keyof typeof t]} — {formatDisplayDate(previewPhoto.date)}
              </p>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('dashboard')}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t.backToDashboard}
          </button>
          <div className="flex-1 flex items-center gap-2 justify-center">
            <span className="text-xl">📸</span>
            <h1 className="text-lg font-bold text-green-800">{t.monthlyPhotoTracker}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
        {/* Description */}
        <p className="text-sm text-gray-500 text-center">{t.monthlyPhotoTrackerDesc}</p>

        {/* Current Month Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-lg font-bold text-green-800">{formatDisplayMonth(currentMonthKey)}</h2>
          <p className="text-xs text-gray-500 mt-1">{t.cropGrowthTimeline}</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-white border border-green-100 shadow-sm p-4 space-y-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">{t.monthlyProgress}</span>
            <span className={`font-bold ${photosThisMonth === 4 ? 'text-green-600' : 'text-amber-600'}`}>
              {photosThisMonth === 4
                ? t.allPhotosDone
                : `${photosThisMonth}/4 — ${t.photosRemaining}`}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                photosThisMonth === 4
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : 'bg-gradient-to-r from-amber-400 to-green-500'
              }`}
            />
          </div>
          <p className="text-xs text-gray-400 text-center">{t.photosThisMonth}</p>
        </motion.div>

        {/* 4 Weekly Photo Slots */}
        <div className="grid grid-cols-2 gap-4">
          {SCHEDULED_DAYS.map((_, idx) => {
            const photo = getPhotoForWeek(idx + 1);
            const scheduledDate = getScheduledDate(idx);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.07 }}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Photo or Placeholder */}
                <div
                  className="relative aspect-square bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => photo && setPreviewPhoto(photo)}
                >
                  {photo ? (
                    <img
                      src={photo.image}
                      alt={`${t[`week${idx + 1}` as keyof typeof t]} - ${t.photoTaken}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <CameraIcon className="w-10 h-10" />
                      <span className="text-xs">{t.noPhotoYet}</span>
                    </div>
                  )}
                  {/* Green check overlay for taken photos */}
                  {photo && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info & Action */}
                <div className="p-3 flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-sm font-semibold text-green-800">
                    {weekLabels[idx]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {t.scheduledDate}: {formatDisplayDate(scheduledDate)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCapturePhoto(idx);
                    }}
                    className={`mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${
                      photo
                        ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    <CameraIcon className="w-3.5 h-3.5" />
                    {photo ? t.photoTaken : t.takePhoto}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Photo History */}
        {pastMonthKeys.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-base font-bold text-green-800">{t.photoHistory}</h3>
            {pastMonthKeys.map((monthKey) => {
              const monthPhotos = data.photos.filter((p) => p.month === monthKey);
              return (
                <motion.div
                  key={monthKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      {formatDisplayMonth(monthKey)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {monthPhotos.length}/4 {t.photosThisMonth}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((week) => {
                      const photo = monthPhotos.find((p) => p.week === week);
                      return (
                        <div
                          key={week}
                          className="aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer"
                          onClick={() => photo && setPreviewPhoto(photo)}
                        >
                          {photo ? (
                            <img
                              src={photo.image}
                              alt={`${t[`week${week}` as keyof typeof t]}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                              <CameraIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
