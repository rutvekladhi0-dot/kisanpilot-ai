'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Home, Search, Grid, Landmark, ShieldCheck, ShoppingCart } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, setIsCartOpen } = useShop();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'loans', label: 'Loans', icon: Landmark, badge: 'Govt 4%' },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <>
      {/* Floating Mini Cart Bar if items exist and cart is not open */}
      {cartCount > 0 && activeTab !== 'orders' && (
        <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-950/30 border border-emerald-600/40 hover:bg-emerald-900 active:scale-98 transition-all animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center">
                {cartCount}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">Items in Cart</p>
                <p className="text-[11px] text-emerald-200">Tap to view & checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-700/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>View Cart →</span>
            </div>
          </button>
        </div>
      )}

      {/* Fixed Bottom Navigation (Mobile & Tablet) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-700 font-bold scale-105'
                  : 'text-slate-500 hover:text-emerald-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-5 text-[8px] font-black bg-amber-500 text-emerald-950 px-1 py-0.2 rounded-full uppercase tracking-tighter">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
