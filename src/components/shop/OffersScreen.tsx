'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { COUPONS } from '@/data/shopData';
import { Tag, Sparkles, Copy, Check, ArrowRight, Zap, Gift } from 'lucide-react';

export const OffersScreen: React.FC = () => {
  const { applyCoupon, appliedCoupon, setIsCartOpen, setActiveTab } = useShop();

  const handleApply = (code: string) => {
    applyCoupon(code);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-yellow-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kharif & Rabi Season Dhamaka</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Special Agricultural Offers & Coupons
          </h1>
          <p className="text-xs sm:text-sm text-yellow-100">
            Save up to ₹300 on seeds, IFFCO fertilizers, battery sprayers, and daily grocery essentials!
          </p>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COUPONS.map((coupon) => {
          const isApplied = appliedCoupon?.code === coupon.code;

          return (
            <div
              key={coupon.code}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-4 bg-white ${
                isApplied
                  ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                      <Tag className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-base font-black tracking-wider text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-dashed border-slate-300">
                      {coupon.code}
                    </span>
                  </div>

                  {isApplied && (
                    <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Applied in Cart
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-800 mt-2">
                  {coupon.description}
                </p>
                <p className="text-[11px] text-slate-400">
                  Minimum Order: <strong>₹{coupon.minOrder}</strong> • {coupon.expiresIn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-bold">
                  {coupon.discountAmount ? `Flat ₹${coupon.discountAmount} OFF` : `${coupon.discountPercent}% OFF`}
                </span>

                <button
                  onClick={() => handleApply(coupon.code)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                    isApplied
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs active:scale-95'
                  }`}
                >
                  {isApplied ? 'Applied ✓' : 'Apply to Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Govt Subsidy Schemes Box */}
      <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">
              Looking for 60% Solar Pump & Drip Subsidies?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Direct Benefit Transfer (DBT) subsidy invoices provided with all eligible agricultural equipment.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('loans')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
        >
          View Subsidy Schemes →
        </button>
      </div>
    </div>
  );
};
