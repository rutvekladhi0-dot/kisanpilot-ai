'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  Zap,
  MapPin,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Heart,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    unreadNotificationsCount,
    setIsNotificationsOpen,
    globalDeliveryMode,
    setGlobalDeliveryMode,
    selectedAddress,
    wishlist,
    userProfile,
  } = useShop();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top Banner: Location and Fast Delivery Indicator */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Delivering to:</span>
            <span className="font-semibold text-white truncate max-w-[280px]">
              {selectedAddress.name} - {selectedAddress.pincode} ({selectedAddress.city})
            </span>
          </div>
          <span className="text-emerald-400">|</span>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Kharif & Rabi Season Agri Sale Live! Use code <strong className="text-white">KISAN100</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Fast Delivery Mode Switcher */}
          <div className="flex items-center gap-1 bg-emerald-800/80 p-0.5 rounded-full border border-emerald-700">
            <button
              onClick={() => setGlobalDeliveryMode('fast')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                globalDeliveryMode === 'fast'
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3 fill-current text-emerald-950" />
              ⚡ Fast Delivery (90m)
            </button>
            <button
              onClick={() => setGlobalDeliveryMode('normal')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                globalDeliveryMode === 'normal'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              📦 Standard
            </button>
          </div>

          <div className="text-emerald-300 text-xs">
            Helpline: <span className="text-white font-semibold">1800-180-1551</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* FAR LEFT: Kisan Pilot Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-xl sm:text-2xl">🌱</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-900 group-hover:text-emerald-700 transition-colors">
                  KISAN PILOT
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md hidden sm:inline-block">
                  Shop
                </span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 hidden sm:inline-block">
                Agri Marketplace & Essentials
              </span>
            </div>
          </div>

          {/* CENTER: Important Navigation Options */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'categories', label: 'Categories' },
              { id: 'orders', label: 'Orders' },
              { id: 'offers', label: 'Offers' },
              { id: 'loans', label: 'Agri Loans' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                  )}
                  {tab.id === 'offers' && (
                    <span className="absolute -top-1 -right-1 text-[9px] bg-red-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                      Sale
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* FAR RIGHT: Search, Notifications, Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger (Desktop quick search button / mobile search icon) */}
            <button
              onClick={() => setActiveTab('search')}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors sm:w-44 md:w-56"
              title="Search products"
            >
              <Search className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="truncate hidden sm:inline-block text-slate-500 text-xs">
                Search seeds, urea, tools...
              </span>
            </button>

            {/* Fast Delivery Badge on Mobile */}
            <button
              onClick={() => setGlobalDeliveryMode(globalDeliveryMode === 'fast' ? 'normal' : 'fast')}
              className={`md:hidden flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-lg border transition-all ${
                globalDeliveryMode === 'fast'
                  ? 'bg-amber-400 text-emerald-950 border-amber-500'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{globalDeliveryMode === 'fast' ? '⚡ 90m' : 'Standard'}</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-amber-400 text-emerald-950 text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline-block">
                Cart
              </span>
            </button>

            {/* Profile Avatar / Trigger */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
              title="My Account"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-300">
                {userProfile.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-slate-700 hidden lg:inline-block truncate max-w-[90px]">
                {userProfile.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:inline-block" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
