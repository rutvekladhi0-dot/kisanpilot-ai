'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Search,
  Phone,
  Navigation,
  Thermometer,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Truck,
  Building2,
  Clock,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Award,
  Layers,
  Sparkles,
  Info,
  SlidersHorizontal,
  X,
  Printer,
  Compass,
  Gauge,
  Warehouse,
  Flame,
  Camera,
  Activity,
  UserCheck,
  Filter,
  Check,
} from 'lucide-react';
import {
  StorageCenter,
  StorageBookingRequest,
  StorageFacilityType,
  CropStorageGuide,
} from '@/types/storageCenter';
import {
  VERIFIED_STORAGE_CENTERS,
  CROP_STORAGE_GUIDELINES,
} from '@/data/storageCenterData';
import { INDIA_STATES_DIRECTORY } from '@/data/indiaDistricts';

interface StorageCenterScreenProps {
  onBack?: () => void;
}

type LanguageCode = 'en' | 'hi' | 'mr';

export default function StorageCenterScreen({ onBack }: StorageCenterScreenProps) {
  // Multilingual state
  const [lang, setLang] = useState<LanguageCode>('en');

  // Location filter state
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [facilityFilter, setFacilityFilter] = useState<'all' | 'cold' | 'warm' | 'iot'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Geolocation state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>({
    lat: 20.0059, // default near Nashik
    lng: 73.7898,
  });
  const [geoPromptOpen, setGeoPromptOpen] = useState<boolean>(false);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoPermissionStatus, setGeoPermissionStatus] = useState<'default' | 'granted' | 'denied'>('default');

  // Modals & Active Selections
  const [selectedCenter, setSelectedCenter] = useState<StorageCenter | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [bookingCenter, setBookingCenter] = useState<StorageCenter | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<StorageBookingRequest | null>(null);
  const [showOperatorPortal, setShowOperatorPortal] = useState<boolean>(false);

  // Active bookings state (with initial realistic sample booking)
  const [bookings, setBookings] = useState<StorageBookingRequest[]>([
    {
      id: 'book-sample-1',
      bookingId: 'KP-STR-2026-9041',
      farmerName: 'Rameshwar Patil',
      farmerPhone: '+91 98224 55678',
      village: 'Pimpalgaon Baswant',
      district: 'Nashik',
      state: 'Maharashtra',
      centerId: 'sc-nashik-pimpalgaon',
      centerName: 'Nashik Krishi Cold Chain & Multi-Commodity Warehouse',
      storageType: 'cold',
      cropName: 'Table Grapes (Thomson Seedless)',
      quantityTonnes: 15,
      quantityBags: 300,
      arrivalDate: '2026-09-28',
      durationDays: 45,
      estimatedCost: 27000,
      status: 'approved',
      createdAt: '2026-09-25T11:20:00Z',
      chamberAssigned: 'Chamber 1 (Pre-Cooling)',
      receiptId: 'WDRA-E-RECEIPT-88412',
    },
  ]);

  // Booking Form State
  const [bookingStorageType, setBookingStorageType] = useState<StorageFacilityType>('cold');
  const [bookingCrop, setBookingCrop] = useState<string>('Onion (कांदा / प्याज)');
  const [bookingQuantityTonnes, setBookingQuantityTonnes] = useState<number>(10);
  const [bookingDurationDays, setBookingDurationDays] = useState<number>(30);
  const [bookingArrivalDate, setBookingArrivalDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [bookingFarmerName, setBookingFarmerName] = useState<string>('Dnyaneshwar Shinde');
  const [bookingFarmerPhone, setBookingFarmerPhone] = useState<string>('+91 98901 23456');
  const [bookingVillage, setBookingVillage] = useState<string>('Ozar');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  // Translations
  const t = useMemo(() => {
    return {
      en: {
        heroTitle: 'Safe Storage for Every Harvest',
        heroSubtitle: 'Discover trusted, WDRA-certified agricultural storage facilities near you.',
        findNearMe: 'Find Storage Near Me',
        locationConsentTitle: 'Location Permission',
        locationConsentDesc:
          'Kisan Pilot requests your location solely to find the nearest cold and warm storage facilities and calculate exact road distance. Your personal data remains strictly confidential.',
        allowLocation: 'Allow Location Access',
        cancel: 'Cancel',
        activeVerified: 'Verified Partner Hubs',
        wdraCertified: 'WDRA & FSSAI Certified',
        liveIoT: 'Live IoT Telemetry',
        totalCapacity: '1,00,000+ MT Capacity',
        filterByState: 'Select State:',
        filterByDistrict: 'Select District:',
        allDistricts: 'All Districts',
        searchPlaceholder: 'Search by village, warehouse name, crop...',
        tabAll: 'All Facilities',
        tabCold: '❄️ Cold Storage',
        tabWarm: '🌾 Warm / Ambient Storage',
        tabIoT: '📡 Live IoT Monitored',
        listView: 'Card View',
        mapView: 'Interactive India Map',
        getDirections: 'Get Directions',
        callCenter: 'Call Warehouse',
        viewDetails: 'View Details & Sensors',
        requestSpace: 'Request Space / Book',
        activePartnerBadge: 'Active Partner Hub',
        expandingBadge: 'Network Expansion Underway',
        noCenterInDistrict: 'No verified partner center onboarded yet in this district.',
        noCenterNotice:
          'Kisan Pilot is actively verifying storage facilities across this region. Browse active partner hubs in nearby districts or request partner onboarding.',
        myBookings: 'My Storage Bookings',
        operatorDashboard: 'Operator / Admin Portal',
        backToDashboard: 'Back to Kisan Pilot',
        optimal: 'Optimal',
        warning: 'Warning',
        critical: 'Critical',
      },
      hi: {
        heroTitle: 'हर फसल के लिए सुरक्षित भंडारण',
        heroSubtitle: 'अपने नजदीकी प्रमाणित कोल्ड स्टोरेज और वैज्ञानिक अनाज गोदाम खोजें।',
        findNearMe: 'मेरे पास का गोदाम खोजें',
        locationConsentTitle: 'स्थान अनुमति',
        locationConsentDesc:
          'किसान पायलट केवल निकटतम भंडारण केंद्रों को खोजने और सड़क की दूरी मापने के लिए आपके स्थान का उपयोग करता है।',
        allowLocation: 'स्थान अनुमति दें',
        cancel: 'रद्द करें',
        activeVerified: 'सत्यापित पार्टनर केंद्र',
        wdraCertified: 'WDRA व FSSAI प्रमाणित',
        liveIoT: 'लाइव IoT तापमान निगरानी',
        totalCapacity: '1,00,000+ टन क्षमता',
        filterByState: 'राज्य चुनें:',
        filterByDistrict: 'ज़िला चुनें:',
        allDistricts: 'सभी ज़िले',
        searchPlaceholder: 'गांव, गोदाम का नाम, फसल से खोजें...',
        tabAll: 'सभी गोदाम',
        tabCold: '❄️ कोल्ड स्टोरेज (शीतगृह)',
        tabWarm: '🌾 शुष्क व अनाज गोदाम',
        tabIoT: '📡 लाइव IoT सेंसर',
        listView: 'सूची देखें',
        mapView: 'भारत का नक्शा',
        getDirections: 'रास्ता देखें (दिशाएं)',
        callCenter: 'गोदाम को कॉल करें',
        viewDetails: 'विवरण व सेंसर देखें',
        requestSpace: 'भंडारण बुक करें',
        activePartnerBadge: 'सक्रिय पार्टनर हब',
        expandingBadge: 'विस्तार कार्य प्रगति पर',
        noCenterInDistrict: 'इस ज़िले में अभी कोई सत्यापित पार्टनर केंद्र नहीं है।',
        noCenterNotice:
          'किसान पायलट इस क्षेत्र में गोदामों का भौतिक सत्यापन कर रहा है। पास के ज़िलों के सक्रिय केंद्र देखें।',
        myBookings: 'मेरी भंडारण बुकिंग',
        operatorDashboard: 'गोदाम प्रबंधक पोर्टल',
        backToDashboard: 'मुख्य डैशबोर्ड पर लौटें',
        optimal: 'अनुकूल',
        warning: 'चेतावनी',
        critical: 'गंभीर',
      },
      mr: {
        heroTitle: 'प्रत्येक पिकासाठी सुरक्षित गोदाम व्यवस्था',
        heroSubtitle: 'आपल्या नजीकचे शासनमान्य शीतगृह (Cold Storage) आणि शास्त्रीय धान्य गोदाम शोधा.',
        findNearMe: 'माझ्याजवळचे गोदाम शोधा',
        locationConsentTitle: 'स्थान (लोकेशन) परवानगी',
        locationConsentDesc:
          'किसान पायलट केवळ सर्वात जवळचे शीतगृह किंवा धान्य गोदाम शोधण्यासाठी आणि अचूक रस्त्याचे अंतर मोजण्यासाठी आपले स्थान वापरते.',
        allowLocation: 'स्थान परवानगी द्या',
        cancel: 'रद्द करा',
        activeVerified: 'सत्यापित पार्टनर हब',
        wdraCertified: 'WDRA व FSSAI प्रमाणित',
        liveIoT: 'थेट IoT तापमान देखरेख',
        totalCapacity: '१,००,०००+ टन क्षमता',
        filterByState: 'राज्य निवडा:',
        filterByDistrict: 'जिल्हा निवडा:',
        allDistricts: 'सर्व जिल्हे',
        searchPlaceholder: 'गाव, गोदामाचे नाव किंवा पिकाचे नाव टाका...',
        tabAll: 'सर्व गोदामे',
        tabCold: '❄️ शीतगृह (Cold Storage)',
        tabWarm: '🌾 वातानुकूलित धान्य गोदाम',
        tabIoT: '📡 थेट IoT सेन्सर्स',
        listView: 'यादी पहा',
        mapView: 'भारताचा परस्परसंवादी नकाशा',
        getDirections: 'रस्ता पहा (Google Maps)',
        callCenter: 'गोदामाशी संपर्क करा',
        viewDetails: 'तपशील व सेन्सर्स पहा',
        requestSpace: 'गोदाम आरक्षित करा',
        activePartnerBadge: 'सक्रिय पार्टनर हब',
        expandingBadge: 'नेटवर्क विस्तार सुरू आहे',
        noCenterInDistrict: 'या जिल्ह्यामध्ये अद्याप अधिकृत पडताळणी झालेले गोदाम उपलब्ध नाही.',
        noCenterNotice:
          'किसान पायलट या परिसरातील गोदामांची पडताळणी करत आहे. कृपया शेजारील जिल्ह्यातील सक्रिय गोदामे पहा.',
        myBookings: 'माझ्या गोदामाच्या नोंदी',
        operatorDashboard: 'गोदाम ऑपरेटर पोर्टल',
        backToDashboard: 'डॅशबोर्डवर परत जा',
        optimal: 'उत्कृष्ट',
        warning: 'सावधानता',
        critical: 'धोकादायक',
      },
    }[lang];
  }, [lang]);

  // Districts for selected state
  const stateDistricts = useMemo(() => {
    const found = INDIA_STATES_DIRECTORY.find((s) => s.stateName === selectedState);
    return found ? found.districts : [];
  }, [selectedState]);

  // Request browser geolocation with user consent
  const handleRequestLocation = () => {
    setGeoPromptOpen(false);
    setGeoLoading(true);

    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setGeoPermissionStatus('granted');
          setGeoLoading(false);
        },
        (err) => {
          console.warn('Geolocation error:', err.message);
          setGeoPermissionStatus('denied');
          setGeoLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGeoLoading(false);
    }
  };

  // Distance calculation helper (Haversine formula + road tortuosity factor)
  const calculateDistance = (targetLat: number, targetLng: number) => {
    if (!userLocation) return null;
    const R = 6371; // km
    const dLat = ((targetLat - userLocation.lat) * Math.PI) / 180;
    const dLon = ((targetLng - userLocation.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.cos((targetLat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const aerialKm = R * c;
    // Road factor approx 1.25x in India
    return Math.round(aerialKm * 1.25 * 10) / 10;
  };

  // Filtered storage centers
  const filteredCenters = useMemo(() => {
    return VERIFIED_STORAGE_CENTERS.filter((center) => {
      // State filter
      if (center.state !== selectedState) return false;

      // District filter
      if (selectedDistrict !== 'All') {
        const matchesDistrict = center.district
          .toLowerCase()
          .includes(selectedDistrict.toLowerCase());
        if (!matchesDistrict) return false;
      }

      // Facility Type filter
      if (facilityFilter === 'cold' && !center.facilities.coldStorage.available) {
        return false;
      }
      if (facilityFilter === 'warm' && !center.facilities.warmStorage.available) {
        return false;
      }
      if (facilityFilter === 'iot' && !center.iotSensors.isLive) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          center.name.toLowerCase().includes(q) ||
          center.village.toLowerCase().includes(q) ||
          center.taluka.toLowerCase().includes(q) ||
          center.district.toLowerCase().includes(q) ||
          center.facilities.coldStorage.supportedCrops.some((c) =>
            c.toLowerCase().includes(q)
          ) ||
          center.facilities.warmStorage.supportedCrops.some((c) =>
            c.toLowerCase().includes(q)
          );
        if (!matchesQuery) return false;
      }

      return true;
    }).map((c) => {
      const dist = calculateDistance(c.coordinates.lat, c.coordinates.lng);
      return {
        ...c,
        distanceKm: dist ?? c.distanceKm,
        travelTimeMins: dist ? Math.round(dist * 1.6) : c.travelTimeMins,
      };
    });
  }, [selectedState, selectedDistrict, facilityFilter, searchQuery, userLocation]);

  // Selected crop guidance helper
  const currentCropGuide = useMemo(() => {
    return CROP_STORAGE_GUIDELINES.find((g) => g.cropName === bookingCrop);
  }, [bookingCrop]);

  // Cost calculation for booking
  const estimatedCost = useMemo(() => {
    if (!bookingCenter) return 0;
    const isCold = bookingStorageType === 'cold';
    const ratePerQuintalPerMonth = isCold
      ? bookingCenter.pricing.coldStoragePerQuintalPerMonth || 120
      : bookingCenter.pricing.warmStoragePerQuintalPerMonth || 45;

    const totalQuintals = bookingQuantityTonnes * 10;
    const months = Math.max(1, Math.ceil(bookingDurationDays / 30));
    const storageFee = totalQuintals * ratePerQuintalPerMonth * months;
    const loadingFee = (bookingQuantityTonnes * 20) * (bookingCenter.pricing.loadingUnloadingRatePerBag || 4);
    const insuranceFee = bookingCenter.pricing.insuranceFeeIncluded ? 0 : 350;

    return Math.round(storageFee + loadingFee + insuranceFee);
  }, [bookingCenter, bookingStorageType, bookingQuantityTonnes, bookingDurationDays]);

  // Handle submit booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCenter) return;

    const newBooking: StorageBookingRequest = {
      id: `book-${Date.now()}`,
      bookingId: `KP-STR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: bookingFarmerName,
      farmerPhone: bookingFarmerPhone,
      village: bookingVillage,
      district: bookingCenter.district,
      state: bookingCenter.state,
      centerId: bookingCenter.id,
      centerName: bookingCenter.name,
      storageType: bookingStorageType,
      cropName: bookingCrop,
      quantityTonnes: bookingQuantityTonnes,
      quantityBags: bookingQuantityTonnes * 20,
      arrivalDate: bookingArrivalDate,
      durationDays: bookingDurationDays,
      estimatedCost,
      status: 'pending',
      createdAt: new Date().toISOString(),
      receiptId: `WDRA-E-RECEIPT-${Math.floor(10000 + Math.random() * 90000)}`,
      notes: bookingNotes,
    };

    setBookings([newBooking, ...bookings]);
    setBookingModalOpen(false);
    setSelectedReceipt(newBooking);
  };

  // Quick Open Directions
  const openDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans selection:bg-emerald-200">
      {/* 1. TOP HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center justify-center transition-all"
                title={t.backToDashboard}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
                <Warehouse className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-emerald-950 leading-tight">
                    Kisan Pilot Storage
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-300">
                    WDRA Network
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Agricultural Warehousing & Cold Chain Network
                </p>
              </div>
            </div>
          </div>

          {/* Language Switcher & Portal Action */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-0.5 rounded-xl flex items-center text-xs font-bold border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'hi' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'mr' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
            </div>

            <button
              onClick={() => setShowOperatorPortal(!showOperatorPortal)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showOperatorPortal
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.operatorDashboard}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-10 sm:py-14 px-4 sm:px-6">
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-600/50">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>India-Wide Certified Agricultural Storage Network</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
                {t.heroTitle}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 font-normal max-w-xl">
                {t.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setGeoPromptOpen(true)}
                  disabled={geoLoading}
                  className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-sm px-5 py-3 rounded-2xl shadow-lg shadow-emerald-400/20 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Compass className={`w-4 h-4 ${geoLoading ? 'animate-spin' : ''}`} />
                  <span>{geoLoading ? 'Detecting Location...' : t.findNearMe}</span>
                </button>

                {bookings.length > 0 && (
                  <button
                    onClick={() => {
                      const el = document.getElementById('my-bookings-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-4 py-3 rounded-2xl border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all"
                  >
                    <Building2 className="w-4 h-4 text-emerald-300" />
                    <span>
                      {t.myBookings} ({bookings.length})
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black">100%</div>
                <div className="text-xs text-emerald-200/80 font-medium">WDRA Registered & Insured</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300 mb-2">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black">2.5°C</div>
                <div className="text-xs text-sky-200/80 font-medium">Live IoT Sensor Precision</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-2">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black">60 MT</div>
                <div className="text-xs text-amber-200/80 font-medium">Weighbridge & Highway Access</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-2xl">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-2">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black">e-NWR</div>
                <div className="text-xs text-emerald-200/80 font-medium">Bank Loan Eligible Receipts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* OPERATOR / ADMIN DASHBOARD TOGGLE VIEW */}
        <AnimatePresence>
          {showOperatorPortal && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-950 text-white rounded-3xl p-5 sm:p-7 border border-emerald-800 shadow-xl overflow-hidden space-y-5"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg">
                      Warehouse Partner & Operator Control Panel
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Logged in as Operator: Sahyadri Agro Logistics (Pimpalgaon Hub) • WDRA Approved
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOperatorPortal(false)}
                  className="text-xs text-emerald-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-xl"
                >
                  Close Operator View
                </button>
              </div>

              {/* Operator Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">Cold Capacity</span>
                  <span className="text-lg font-bold text-white">1,250 / 4,500 MT</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">27% Free Space</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">Warm/Grain Capacity</span>
                  <span className="text-lg font-bold text-white">2,400 / 8,000 MT</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">30% Free Space</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">IoT Telemetry Nodes</span>
                  <span className="text-lg font-bold text-emerald-400">14 Active</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">All sensors calibrated</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">Pending Intakes</span>
                  <span className="text-lg font-bold text-amber-400">
                    {bookings.filter((b) => b.status === 'pending').length} Requests
                  </span>
                  <span className="text-[10px] text-amber-300 block mt-0.5">Requires confirmation</span>
                </div>
              </div>

              {/* Incoming Farmer Booking Requests */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Recent Farmer Storage Requests (Operator Intake Queue)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-2">Booking ID</th>
                        <th className="pb-2">Farmer</th>
                        <th className="pb-2">Crop / Produce</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Quantity</th>
                        <th className="pb-2">Arrival</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/5">
                          <td className="py-2.5 font-mono font-bold text-emerald-300">{b.bookingId}</td>
                          <td className="py-2.5">
                            <span className="font-bold block">{b.farmerName}</span>
                            <span className="text-[10px] text-slate-400">{b.farmerPhone}</span>
                          </td>
                          <td className="py-2.5 font-medium">{b.cropName}</td>
                          <td className="py-2.5">
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                b.storageType === 'cold'
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                              }`}
                            >
                              {b.storageType.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2.5 font-bold">{b.quantityTonnes} MT</td>
                          <td className="py-2.5">{b.arrivalDate}</td>
                          <td className="py-2.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                b.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {b.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2.5 text-right">
                            {b.status === 'pending' ? (
                              <button
                                onClick={() => {
                                  setBookings(
                                    bookings.map((item) =>
                                      item.id === b.id
                                    ? { ...item, status: 'approved', chamberAssigned: 'Chamber 2 (Cold)' }
                                    : item
                                    )
                                  );
                                }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-2.5 py-1 rounded-lg text-[11px]"
                              >
                                Approve & Assign
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedReceipt(b)}
                                className="text-emerald-300 hover:underline text-[11px]"
                              >
                                View e-Receipt
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 4. SEARCH & GEOGRAPHIC FILTERS */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* State Selector */}
            <div className="md:col-span-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.filterByState}
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict('All');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              >
                {INDIA_STATES_DIRECTORY.map((s) => (
                  <option key={s.stateCode} value={s.stateName}>
                    {s.stateName} {s.hasActivePartners ? '✓ (Active Hubs)' : '(Onboarding)'}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            <div className="md:col-span-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                {t.filterByDistrict}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value="All">{t.allDistricts}</option>
                {stateDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} {d.hasActivePartners ? `(${d.partnerCount} Active)` : '(No Partner Yet)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="md:col-span-6">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Search Storage Center or Crop:
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Facility Filter Pills & View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setFacilityFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  facilityFilter === 'all'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.tabAll}
              </button>
              <button
                onClick={() => setFacilityFilter('cold')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  facilityFilter === 'cold'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                }`}
              >
                {t.tabCold}
              </button>
              <button
                onClick={() => setFacilityFilter('warm')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  facilityFilter === 'warm'
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                {t.tabWarm}
              </button>
              <button
                onClick={() => setFacilityFilter('iot')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  facilityFilter === 'iot'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {t.tabIoT}
              </button>
            </div>

            {/* List vs Map Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.listView}
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.mapView}
              </button>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE INDIA MAP VIEW (WHEN TOGGLED) */}
        {viewMode === 'map' && (
          <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-xl overflow-hidden space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-base sm:text-lg">
                  Verified Storage Center Radar Map (India Network)
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Click any pin to inspect real IoT sensors and road directions
              </span>
            </div>

            {/* Interactive Vector / Pin Map Simulation with accurate Coordinates */}
            <div className="relative w-full h-80 sm:h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

              {/* User Location Radar Marker */}
              {userLocation && (
                <div
                  className="absolute z-20 flex flex-col items-center"
                  style={{ top: '48%', left: '38%' }}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative z-10" />
                  <span className="text-[10px] font-bold bg-blue-900/90 text-blue-200 px-1.5 py-0.5 rounded-md mt-1 backdrop-blur-xs border border-blue-400/30">
                    Your Location (Nashik/Ozar)
                  </span>
                </div>
              )}

              {/* Verified Storage Center Pins */}
              {VERIFIED_STORAGE_CENTERS.map((center, index) => {
                // Pin offsets mapping realistically to western/central India
                const positions: Record<string, { top: string; left: string }> = {
                  'sc-nashik-pimpalgaon': { top: '47%', left: '39%' },
                  'sc-nashik-lasalgaon': { top: '49%', left: '42%' },
                  'sc-pune-khed': { top: '56%', left: '40%' },
                  'sc-indore-dhar': { top: '38%', left: '46%' },
                  'sc-agra-fatehabad': { top: '24%', left: '54%' },
                };

                const pos = positions[center.id] || { top: `${30 + index * 12}%`, left: `${40 + index * 8}%` };

                return (
                  <motion.button
                    key={center.id}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => {
                      setSelectedCenter(center);
                      setDetailsModalOpen(true);
                    }}
                    className="absolute z-30 flex flex-col items-center group cursor-pointer"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 group-hover:bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-black">
                        {center.facilities.coldStorage.available ? '❄️' : '🌾'}
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
                    </div>
                    <div className="bg-slate-900/90 group-hover:bg-emerald-950 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-700 shadow-md mt-1 whitespace-nowrap backdrop-blur-xs">
                      {center.village} • {center.distanceKm} km
                    </div>
                  </motion.button>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2.5 rounded-xl text-[10px] space-y-1.5 z-20">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 flex items-center justify-center text-[8px]">
                    ❄️
                  </span>
                  <span>Cold Storage (CA Chilled 0°C to 8°C)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-600 flex items-center justify-center text-[8px]">
                    🌾
                  </span>
                  <span>Scientific Warm / Grain Godown</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Your GPS Location</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. DISTRICT STATUS BANNER (WHEN USER PICKS AN EMPTY DISTRICT) */}
        {selectedDistrict !== 'All' && filteredCenters.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-xl">
              🏢
            </div>
            <h3 className="text-base sm:text-lg font-black text-amber-950">
              {t.noCenterInDistrict} ({selectedDistrict}, {selectedState})
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 max-w-xl mx-auto">
              {t.noCenterNotice}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSelectedDistrict('All')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                View Nearby Centers in {selectedState}
              </button>
            </div>
          </div>
        )}

        {/* 7. STORAGE CENTER CARDS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-800 text-base sm:text-lg flex items-center gap-2">
              <span>Verified Partner Storage Centers</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full">
                {filteredCenters.length} Facilities
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Sorted by road proximity to your location
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredCenters.map((center) => {
              const liveChamber = center.iotSensors.chambers[0];

              return (
                <div
                  key={center.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-500/50 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Facility Image with Badges */}
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={center.images[0]}
                        alt={center.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                        <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                          <span>WDRA Verified</span>
                        </span>
                        <span className="bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                          📍 {center.distanceKm} km away • ~{center.travelTimeMins} mins
                        </span>
                      </div>

                      {/* Live IoT Sensor Floating Pill */}
                      {center.iotSensors.isLive && liveChamber && (
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl border border-emerald-400/40 flex items-center gap-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>
                            {liveChamber.currentTempC}°C | {liveChamber.currentHumidityPercent}% RH
                          </span>
                        </div>
                      )}

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="font-black text-base sm:text-lg leading-tight line-clamp-1 drop-shadow-sm">
                          {center.name}
                        </h4>
                        <p className="text-xs text-slate-200 font-medium line-clamp-1 mt-0.5">
                          {center.operatorName} • {center.village}, {center.district}
                        </p>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Facilities Comparison Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {/* Cold Storage Facility Box */}
                        <div
                          className={`p-3 rounded-2xl border ${
                            center.facilities.coldStorage.available
                              ? 'bg-sky-50/70 border-sky-200 text-sky-950'
                              : 'bg-slate-50 border-slate-200/60 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-[11px] flex items-center gap-1">
                              <span>❄️ Cold Storage</span>
                            </span>
                            {center.facilities.coldStorage.available && (
                              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded-md">
                                {center.facilities.coldStorage.availableMT} MT Free
                              </span>
                            )}
                          </div>
                          {center.facilities.coldStorage.available ? (
                            <div className="space-y-0.5 text-[11px]">
                              <div>
                                Temp:{' '}
                                <strong>
                                  {center.facilities.coldStorage.temperatureRange.min}°C to{' '}
                                  {center.facilities.coldStorage.temperatureRange.max}°C
                                </strong>
                              </div>
                              <div>
                                Rate:{' '}
                                <strong className="text-emerald-700">
                                  ₹{center.pricing.coldStoragePerQuintalPerMonth}/Qtl/mo
                                </strong>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px]">Not offered at this hub</span>
                          )}
                        </div>

                        {/* Warm / Ambient Grain Storage Facility Box */}
                        <div
                          className={`p-3 rounded-2xl border ${
                            center.facilities.warmStorage.available
                              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                              : 'bg-slate-50 border-slate-200/60 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-[11px] flex items-center gap-1">
                              <span>🌾 Grain / Ambient</span>
                            </span>
                            {center.facilities.warmStorage.available && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md">
                                {center.facilities.warmStorage.availableMT} MT Free
                              </span>
                            )}
                          </div>
                          {center.facilities.warmStorage.available ? (
                            <div className="space-y-0.5 text-[11px]">
                              <div>
                                Aeration: <strong>Scientific Godown</strong>
                              </div>
                              <div>
                                Rate:{' '}
                                <strong className="text-emerald-700">
                                  ₹{center.pricing.warmStoragePerQuintalPerMonth}/Qtl/mo
                                </strong>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px]">Cold Storage Only</span>
                          )}
                        </div>
                      </div>

                      {/* Road Access & Weighbridge highlights */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-[11px] text-slate-700 flex flex-wrap items-center justify-between gap-2">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-500" />
                          <span>{center.roadAccess.maxVehicleAccess}</span>
                        </span>
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                          ⚖️ {center.roadAccess.weighbridgeCapacityTonnes} Ton Weighbridge
                        </span>
                      </div>

                      {/* Supported Crops Tags */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Supported Crops & Commodities:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {[
                            ...center.facilities.coldStorage.supportedCrops,
                            ...center.facilities.warmStorage.supportedCrops,
                          ]
                            .slice(0, 5)
                            .map((crop, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                              >
                                {crop}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setSelectedCenter(center);
                        setDetailsModalOpen(true);
                      }}
                      className="col-span-2 sm:col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      <Activity className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t.viewDetails}</span>
                    </button>

                    <button
                      onClick={() => openDirections(center.coordinates.lat, center.coordinates.lng)}
                      className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1"
                      title={t.getDirections}
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-600" />
                      <span>Directions</span>
                    </button>

                    <a
                      href={`tel:${center.contact.phone}`}
                      className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1"
                      title={t.callCenter}
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call</span>
                    </a>

                    <button
                      onClick={() => {
                        setBookingCenter(center);
                        setBookingModalOpen(true);
                      }}
                      className="col-span-2 sm:col-span-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black py-2.5 px-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                    >
                      <span>{t.requestSpace}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 8. MY ACTIVE STORAGE BOOKINGS & RECEIPTS SECTION */}
        {bookings.length > 0 && (
          <section
            id="my-bookings-section"
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {t.myBookings} ({bookings.length})
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Official WDRA Electronic Warehouse Receipts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {booking.bookingId}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm mt-1">{booking.cropName}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        booking.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {booking.status === 'approved' ? '✓ Space Reserved' : 'Pending Approval'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Warehouse Center:</span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{booking.centerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Quantity & Bags:</span>
                      <span className="font-bold text-slate-800">
                        {booking.quantityTonnes} MT ({booking.quantityBags} Bags)
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Arrival Date:</span>
                      <span className="font-semibold text-slate-800">{booking.arrivalDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Estimated Cost:</span>
                      <span className="font-bold text-emerald-800">₹{booking.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-[11px] text-slate-500">
                      Chamber: <strong>{booking.chamberAssigned || 'Assigning at gate'}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedReceipt(booking)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Receipt / Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 9. MODALS: DETAILS, IOT TELEMETRY & SENSORS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {detailsModalOpen && selectedCenter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            >
              {/* Modal Header Image */}
              <div className="relative h-56 w-full bg-slate-900">
                <img
                  src={selectedCenter.images[1] || selectedCenter.images[0]}
                  alt={selectedCenter.name}
                  className="w-full h-full object-cover opacity-85"
                />
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                      WDRA Reg: {selectedCenter.wdraRegistrationNo}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-[10px] px-2 py-0.5 rounded-md font-bold">
                      {selectedCenter.isoCertified}
                    </span>
                  </div>
                  <h3 className="text-xl font-black">{selectedCenter.name}</h3>
                  <p className="text-xs text-slate-200">{selectedCenter.address}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-slate-800">
                {/* Real-time IoT Sensor Monitoring Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-black text-sm uppercase tracking-wider text-slate-900">
                        Live IoT Chamber Environmental Telemetry
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      {selectedCenter.iotSensors.lastSync}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCenter.iotSensors.chambers.map((chamber) => (
                      <div
                        key={chamber.chamberId}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{chamber.chamberName}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {chamber.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="bg-white p-2 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] text-slate-500 block">Temperature</span>
                            <span className="text-base font-black text-slate-900">
                              {chamber.currentTempC}°C
                            </span>
                            <span className="text-[9px] text-slate-400 block">
                              Target: {chamber.targetTempC}°C
                            </span>
                          </div>

                          <div className="bg-white p-2 rounded-xl border border-slate-100 text-center">
                            <span className="text-[10px] text-slate-500 block">Relative Humidity</span>
                            <span className="text-base font-black text-slate-900">
                              {chamber.currentHumidityPercent}%
                            </span>
                            <span className="text-[9px] text-slate-400 block">
                              Target: {chamber.targetHumidityPercent}%
                            </span>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 text-right">
                          Calibrated IoT Sensor • {chamber.lastUpdated}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hygiene & Safety Standards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-black text-sm uppercase tracking-wider text-slate-900">
                      Hygiene, Safety & Regulatory Standards
                    </h4>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Pest Control & Sanitization:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.hygieneAndSafety.pestControlDate}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Cleaning Protocol:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.hygieneAndSafety.cleaningSchedule}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Fire Suppression System:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.hygieneAndSafety.fireSafetySystem}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Insurance Underwriting:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.hygieneAndSafety.insuranceCoverage}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Road & Vehicle Entry Specifications */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-black text-sm uppercase tracking-wider text-slate-900">
                      Road Accessibility & Weighbridge
                    </h4>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Distance from Highway:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.roadAccess.highwayDistanceKm} km
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Entry Road Width:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.roadAccess.entryRoadWidthMeters} meters
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Weighbridge Capacity:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.roadAccess.weighbridgeCapacityTonnes} Tonnes
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Loading / Unloading Bays:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.roadAccess.loadingDocksCount} Covered Bays
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Height Clearance:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.roadAccess.heightClearanceMeters} meters
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Operating Hours:</span>
                      <strong className="text-slate-800">
                        {selectedCenter.contact.operatingHours}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    Manager: <strong>{selectedCenter.contact.managerName}</strong> (
                    {selectedCenter.contact.phone})
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setDetailsModalOpen(false);
                        setBookingCenter(selectedCenter);
                        setBookingModalOpen(true);
                      }}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
                    >
                      Book Storage Space Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 10. MODAL: STORAGE BOOKING & CROP SELECTION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {bookingModalOpen && bookingCenter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg text-slate-900">Request Storage Space</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {bookingCenter.name} • WDRA Certified
                  </p>
                </div>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmBooking} className="p-6 space-y-4 text-xs">
                {/* Storage Type Choice */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                    1. Select Storage Facility Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={!bookingCenter.facilities.coldStorage.available}
                      onClick={() => setBookingStorageType('cold')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        bookingStorageType === 'cold'
                          ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold ring-2 ring-sky-600/20'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block text-sm mb-0.5">❄️ Cold Storage</span>
                      <span className="text-[10px] text-slate-500 block">
                        ₹{bookingCenter.pricing.coldStoragePerQuintalPerMonth || 120}/Qtl/mo • Chilled 0°C to 8°C
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={!bookingCenter.facilities.warmStorage.available}
                      onClick={() => setBookingStorageType('warm')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        bookingStorageType === 'warm'
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-600/20'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block text-sm mb-0.5">🌾 Warm / Ambient Godown</span>
                      <span className="text-[10px] text-slate-500 block">
                        ₹{bookingCenter.pricing.warmStoragePerQuintalPerMonth || 45}/Qtl/mo • Aerated Grain Stack
                      </span>
                    </button>
                  </div>
                </div>

                {/* Crop & Produce Selection */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
                    2. Select Crop / Produce:
                  </label>
                  <select
                    value={bookingCrop}
                    onChange={(e) => setBookingCrop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-600"
                  >
                    {CROP_STORAGE_GUIDELINES.map((crop) => (
                      <option key={crop.cropName} value={crop.cropName}>
                        {crop.cropName} — {crop.recommendedStorageType.toUpperCase()} REC.
                      </option>
                    ))}
                  </select>

                  {/* Agricultural Storage Science Guidance Alert */}
                  {currentCropGuide && (
                    <div className="mt-2 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950 space-y-1">
                      <div className="font-bold text-[11px] flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Kisan Pilot Agronomist Storage Guidance:</span>
                      </div>
                      <p className="text-[10px] text-emerald-800">
                        Ideal Temp: <strong>{currentCropGuide.minTempC}°C - {currentCropGuide.maxTempC}°C</strong> | Relative Humidity:{' '}
                        <strong>{currentCropGuide.minHumidityPercent}% - {currentCropGuide.maxHumidityPercent}%</strong>
                      </p>
                      <p className="text-[10px] text-slate-600 italic">
                        {currentCropGuide.precautions[0]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Quantity & Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Quantity (Metric Tonnes):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={bookingQuantityTonnes}
                      onChange={(e) => setBookingQuantityTonnes(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Approx {bookingQuantityTonnes * 20} bags (50kg each)
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Storage Duration (Days):
                    </label>
                    <input
                      type="number"
                      min={15}
                      max={365}
                      value={bookingDurationDays}
                      onChange={(e) => setBookingDurationDays(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      ~{Math.ceil(bookingDurationDays / 30)} Month(s)
                    </span>
                  </div>
                </div>

                {/* Arrival Date & Farmer Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Expected Arrival Date:
                    </label>
                    <input
                      type="date"
                      value={bookingArrivalDate}
                      onChange={(e) => setBookingArrivalDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Farmer Contact Number:
                    </label>
                    <input
                      type="tel"
                      value={bookingFarmerPhone}
                      onChange={(e) => setBookingFarmerPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Farmer Name & Village */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Farmer Full Name:
                    </label>
                    <input
                      type="text"
                      value={bookingFarmerName}
                      onChange={(e) => setBookingFarmerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                      Farmer Village / Taluka:
                    </label>
                    <input
                      type="text"
                      value={bookingVillage}
                      onChange={(e) => setBookingVillage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800"
                    />
                  </div>
                </div>

                {/* Estimated Transparent Price Breakdown */}
                <div className="bg-slate-100 p-3.5 rounded-2xl space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>
                      Storage Fee ({bookingQuantityTonnes * 10} Qtl × {Math.ceil(bookingDurationDays / 30)} mo):
                    </span>
                    <span className="font-bold">
                      ₹
                      {(
                        bookingQuantityTonnes *
                        10 *
                        (bookingStorageType === 'cold'
                          ? bookingCenter.pricing.coldStoragePerQuintalPerMonth || 120
                          : bookingCenter.pricing.warmStoragePerQuintalPerMonth || 45) *
                        Math.ceil(bookingDurationDays / 30)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor Handling & Weighbridge:</span>
                    <span className="font-bold">
                      ₹{(bookingQuantityTonnes * 20 * (bookingCenter.pricing.loadingUnloadingRatePerBag || 4)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comprehensive Spoilage & Fire Insurance:</span>
                    <span className="font-bold text-emerald-700">Included (100% Covered)</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-300 text-sm font-black text-slate-900">
                    <span>Total Estimated Cost:</span>
                    <span className="text-emerald-800">₹{estimatedCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-3 rounded-2xl shadow-lg transition-all active:scale-95"
                  >
                    Submit Storage Request & Generate e-Pass
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 11. MODAL: DIGITAL WDRA STORAGE RECEIPT / E-RECEIPT PASS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl"
            >
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-black">
                    KP
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 leading-tight">
                      Kisan Pilot Storage Pass
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      WDRA Electronic Warehouse Receipt (e-NWR Standard)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Receipt Content */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-bold">Booking Reference:</span>
                  <span className="font-mono font-black text-emerald-800 text-sm">
                    {selectedReceipt.bookingId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Farmer Name:</span>
                    <strong>{selectedReceipt.farmerName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Contact Phone:</span>
                    <strong>{selectedReceipt.farmerPhone}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Commodity / Crop:</span>
                    <strong>{selectedReceipt.cropName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Quantity:</span>
                    <strong>{selectedReceipt.quantityTonnes} Tonnes ({selectedReceipt.quantityBags} Bags)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Expected Arrival:</span>
                    <strong>{selectedReceipt.arrivalDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Chamber Allocation:</span>
                    <strong className="text-emerald-700">
                      {selectedReceipt.chamberAssigned || 'Bay Allocated at Gate'}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">Estimated Total Bill:</span>
                  <span className="text-base font-black text-emerald-800">
                    ₹{selectedReceipt.estimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* QR Code / Gate Entry Stamp Simulation */}
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-emerald-300 flex items-center justify-center font-mono text-[9px] text-center font-black">
                  [QR CODE]
                </div>
                <div>
                  <strong className="block text-emerald-900">Gate Entry Authorized</strong>
                  <span className="text-[11px] text-emerald-800">
                    Present this electronic slip at weighbridge gate for instant weight tare & dock entry.
                  </span>
                </div>
              </div>

              {/* Print / Done Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-black py-2.5 rounded-xl transition-all text-xs"
                >
                  Close & Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 12. LOCATION PERMISSION CONSENT DIALOG */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {geoPromptOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl shadow-sm">
                📍
              </div>
              <h3 className="font-black text-lg text-slate-900">
                {t.locationConsentTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.locationConsentDesc}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setGeoPromptOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleRequestLocation}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all"
                >
                  {t.allowLocation}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
