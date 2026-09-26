'use client';

import React from 'react';
import { ShopProvider, useShop } from '@/context/ShopContext';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { HomeScreen } from './HomeScreen';
import { CategoriesScreen } from './CategoriesScreen';
import { SearchScreen } from './SearchScreen';
import { OrdersScreen } from './OrdersScreen';
import { OffersScreen } from './OffersScreen';
import { LoansScreen } from './LoansScreen';
import { SecurityScreen } from './SecurityScreen';
import { ProfileScreen } from './ProfileScreen';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { ProductDetailModal } from './ProductDetailModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { ArrowLeft } from 'lucide-react';

interface KisanPilotShopAppProps {
  onBackToFarm?: () => void;
}

const MainShopContent: React.FC<{ onBackToFarm?: () => void }> = ({ onBackToFarm }) => {
  const { activeTab } = useShop();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'categories':
        return <CategoriesScreen />;
      case 'search':
        return <SearchScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'offers':
        return <OffersScreen />;
      case 'loans':
        return <LoansScreen />;
      case 'security':
        return <SecurityScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-200">
      {/* Return to Farm Dashboard Bar if embedded */}
      {onBackToFarm && (
        <div className="bg-emerald-950 text-white text-xs py-2 px-4 flex items-center justify-between border-b border-emerald-800 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300">🛒 Kisan Pilot Agri Shop & Marketplace</span>
            <span className="hidden sm:inline text-emerald-300">• Fast 90-min farm delivery</span>
          </div>
          <button
            onClick={onBackToFarm}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1 rounded-xl border border-emerald-600 shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Farm Dashboard</span>
          </button>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {renderActiveScreen()}
      </main>

      {/* Global Overlays & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <NotificationsDrawer />

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav />

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-white font-black text-lg tracking-tight">KISAN PILOT</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              India&apos;s trusted online agricultural marketplace and daily essentials platform. Fast farm gate delivery within 90 minutes.
            </p>
            <p className="text-emerald-400 font-bold">24x7 Mandi Helpline: 1800-180-1551</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Agri Products</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Certified Hybrid Seeds</li>
              <li>IFFCO Nano Fertilizers</li>
              <li>Plant Protection & Bio-Pesticides</li>
              <li>Battery & Manual Sprayers</li>
              <li>Drip & Solar Irrigation</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Customer & Finance</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Kisan Credit Card (4% KCC)</li>
              <li>PM-KUSUM 60% Solar Subsidy</li>
              <li>Fast 90-Minute Delivery Hubs</li>
              <li>Track Order Timeline</li>
              <li>7-Day Mandi Return Policy</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Security & Trust</h4>
            <p className="text-slate-400">
              Protected by 256-Bit SSL Bank Grade Encryption. Authorized retail partner for IFFCO, Bayer, Mahyco & Godrej Agrovet.
            </p>
            <div className="pt-2 text-slate-500">
              © {new Date().getFullYear()} Kisan Pilot AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const KisanPilotShopApp: React.FC<KisanPilotShopAppProps> = ({ onBackToFarm }) => {
  return (
    <ShopProvider>
      <MainShopContent onBackToFarm={onBackToFarm} />
    </ShopProvider>
  );
};

export default KisanPilotShopApp;
