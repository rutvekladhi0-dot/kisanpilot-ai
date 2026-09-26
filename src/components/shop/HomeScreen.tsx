'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS, PROMOTIONAL_BANNERS } from '@/data/shopData';
import { ProductCard } from './ProductCard';
import {
  Search,
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgePercent,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Landmark,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    setActiveTab,
    setSelectedCategory,
    setSearchQuery,
    globalDeliveryMode,
    setGlobalDeliveryMode,
    userProfile,
    recentlyViewed,
  } = useShop();

  // Banner carousel state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filtered product lists
  const fastDeliveryProducts = PRODUCTS.filter((p) => p.isFastDelivery);
  const recommendedProducts = PRODUCTS.filter((p) => p.rating >= 4.8);
  const bestSellers = PRODUCTS.filter((p) => p.reviewCount >= 300);
  const dailyEssentials = PRODUCTS.filter(
    (p) => p.category === 'grocery' || p.category === 'household' || p.category === 'personal-care'
  );
  const agriProducts = PRODUCTS.filter(
    (p) => p.category === 'seeds' || p.category === 'fertilizers' || p.category === 'pesticides' || p.category === 'tools'
  );

  const quickSearchChips = [
    '🌱 Hybrid Seeds',
    '⚡ IFFCO Nano Urea',
    '🚜 Battery Sprayers',
    '🛡️ Bayer Confidor',
    '💧 Drip Lateral Pipe',
    '🐄 Godrej Cattle Feed',
    '🛒 Mustard Oil 5L',
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO SEARCH & GREETING */}
      <section className="bg-gradient-to-b from-emerald-800 via-emerald-700 to-green-700 text-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-emerald-900/10 relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-900/50 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kisan Pilot Agri Shop & Daily Essentials</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Namaste, {userProfile.name.split(' ')[0]} ji! 👋
            <br />
            <span className="text-emerald-100 font-extrabold text-xl sm:text-3xl">
              What does your farm & home need today?
            </span>
          </h1>

          {/* Large Prominent Search Bar */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center bg-white text-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-2xl cursor-pointer hover:ring-4 hover:ring-amber-300/40 transition-all group"
          >
            <div className="p-2 sm:p-2.5 text-emerald-700">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              readOnly
              placeholder="Search by crop, brand (IFFCO, Bayer, Mahyco), seeds, fertilizers, grocery..."
              className="w-full bg-transparent text-sm sm:text-base outline-none cursor-pointer placeholder:text-slate-400"
            />
            <button className="bg-emerald-700 group-hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 rounded-xl shrink-0 transition-colors shadow-sm">
              Search
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            <span className="text-xs text-emerald-200 font-medium mr-1 hidden sm:inline">
              Popular:
            </span>
            {quickSearchChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(chip.replace(/^[^\w\s]+/, '').trim());
                  setActiveTab('search');
                }}
                className="text-xs bg-emerald-900/40 hover:bg-emerald-900/80 text-emerald-100 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FAST DELIVERY PROMISE BANNER (Interactive Toggle) */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-300">
        <div className="flex items-center gap-3 text-emerald-950">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-7 h-7 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base sm:text-lg tracking-tight">
                ⚡ Need Urgent Farm Supplies?
              </h3>
              <span className="bg-emerald-950 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                90 Mins Delivery
              </span>
            </div>
            <p className="text-xs text-emerald-900 font-medium mt-0.5">
              Pesticides, sprayers, emergency seeds, and daily essentials delivered directly to your farm gate.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setGlobalDeliveryMode('fast');
              setActiveTab('search');
            }}
            className="flex items-center gap-1.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Shop Fast Delivery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. PROMOTIONAL BANNERS CAROUSEL */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg">
        {PROMOTIONAL_BANNERS.map((banner, index) => {
          const isActive = index === currentBannerIndex;
          if (!isActive) return null;

          return (
            <div
              key={banner.id}
              className={`bg-gradient-to-r ${banner.bgGradient} text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 min-h-[220px]`}
            >
              <div className="space-y-3 max-w-lg z-10 text-center md:text-left">
                <span className="inline-block bg-white/20 backdrop-blur-xs text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider">
                  {banner.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
                  {banner.title}
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 font-medium">
                  {banner.subtitle}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(banner.categoryTarget);
                      setActiveTab('categories');
                    }}
                    className="inline-flex items-center gap-2 bg-white text-emerald-900 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-amber-300 hover:text-emerald-950 transition-all active:scale-95"
                  >
                    <span>{banner.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Banner Graphic/Image preview */}
              <div className="relative shrink-0 w-full md:w-72 h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold py-1 px-2.5 rounded-lg text-center">
                  {banner.badge}
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation dots and arrows */}
        <div className="absolute bottom-3 left-6 flex items-center gap-1.5 z-20">
          {PROMOTIONAL_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBannerIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentBannerIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentBannerIndex(
              (prev) => (prev - 1 + PROMOTIONAL_BANNERS.length) % PROMOTIONAL_BANNERS.length
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs z-20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setCurrentBannerIndex((prev) => (prev + 1) % PROMOTIONAL_BANNERS.length)
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs z-20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* 4. POPULAR PRODUCT CATEGORIES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Explore Categories</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                12 Categories
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Seeds, Fertilizers, Sprayers, Irrigation, Groceries & Daily Needs
            </p>
          </div>
          <button
            onClick={() => setActiveTab('categories')}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 12).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveTab('categories');
              }}
              className="group bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100/80 flex items-center justify-center text-2xl sm:text-3xl mb-2.5 transition-colors overflow-hidden border border-emerald-100/60">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-tight group-hover:text-emerald-700 transition-colors line-clamp-1">
                {cat.name}
              </h4>
              <span className="text-[11px] text-slate-400 mt-1 font-medium">
                {cat.count}+ items
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAST DELIVERY SECTION (Express Items) */}
      <section className="bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/50 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>⚡ Fast Delivery Store</span>
                <span className="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Express 60 - 90 Mins
                </span>
              </h2>
              <p className="text-xs text-slate-600">
                In-stock at your nearest local taluka mandi hub for instant dispatch.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setGlobalDeliveryMode('fast');
              setActiveTab('search');
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>See all Fast Delivery items ({fastDeliveryProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fastDeliveryProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. RECOMMENDED FOR YOU (High Quality Agri Products) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>🌾 Seasonal Agriculture Essentials</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Top Rated
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Certified high germination seeds, nano fertilizers & plant protection
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('seeds');
              setActiveTab('categories');
            }}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Agri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agriProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. KISAN LOANS & SUBSIDIES PROMO CARD */}
      <section className="bg-gradient-to-r from-teal-900 via-emerald-800 to-green-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-200 border border-emerald-500/40">
            <Landmark className="w-3.5 h-3.5 text-yellow-300" />
            <span>Govt Subsidies & Kisan Credit Card</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black tracking-tight">
            Purchase with 4% KCC Crop Loan or 60% Solar Subsidy
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100">
            Link your Kisan Credit Card (KCC) or apply for PM-KUSUM Solar pump subsidy directly through Kisan Pilot. Zero paperwork digital check!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('loans')}
          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <span>Check Loan & Subsidies</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* 8. DAILY ESSENTIALS (Grocery, Household & Personal Care) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>🛒 Daily Essentials & Household</span>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Mandi Rates
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cooking oil, whole wheat atta, tarpaulins & farmer skin protection
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('grocery');
              setActiveTab('categories');
            }}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View Essentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyEssentials.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. RECENTLY VIEWED PRODUCTS (if any) */}
      {recentlyViewed.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Recently Viewed Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyViewed.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 10. TRUST BADGES (Agricultural Guarantee) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
        {[
          {
            icon: ShieldCheck,
            title: '100% Genuine Certified',
            desc: 'Direct from authorized manufacturers (IFFCO, Bayer, Mahyco)',
          },
          {
            icon: Zap,
            title: '⚡ 90 Mins Delivery',
            desc: 'Fast express delivery straight to your farm or home',
          },
          {
            icon: RotateCcw,
            title: '7-Day Easy Returns',
            desc: 'Hassle-free replacement for defective or damaged goods',
          },
          {
            icon: Landmark,
            title: 'Govt Subsidy Support',
            desc: 'KCC linked payments & DBT subsidy reimbursement invoices',
          },
        ].map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {badge.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-tight">
                {badge.desc}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};
