'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { DeliveryType } from '@/types/shop';
import {
  X,
  Star,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Heart,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    wishlist,
    toggleWishlist,
    globalDeliveryMode,
  } = useShop();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryType>(
    selectedProduct?.isFastDelivery ? 'fast' : 'normal'
  );
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedDelivery);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedDelivery);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
              {selectedProduct.brand}
            </span>
            <span className="text-xs text-slate-500">• {selectedProduct.category.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`p-2 rounded-xl transition-colors ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-white text-slate-400 hover:text-rose-500 border border-slate-200'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Product Image & Badges */}
            <div className="space-y-3">
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                  {selectedProduct.discountPercent > 0 && (
                    <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                      {selectedProduct.discountPercent}% OFF
                    </span>
                  )}
                  {selectedProduct.isFastDelivery && (
                    <span className="bg-amber-400 text-emerald-950 text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      {selectedProduct.fastDeliveryTime}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Genuine Agri Certified</span>
                </div>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Express Farm Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span>{selectedProduct.returnPolicy.split(' ')[0]} {selectedProduct.returnPolicy.split(' ')[1]} Return</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Mandi Verified</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Pricing, Delivery Options, Actions */}
            <div className="space-y-5 flex flex-col justify-between">
              <div>
                {/* Rating & Stock */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-xl text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating} / 5</span>
                    <span className="text-slate-400">({selectedProduct.reviewCount} reviews)</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                      selectedProduct.inStock
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {selectedProduct.inStock
                      ? `In Stock (${selectedProduct.stockCount} units available)`
                      : 'Out of Stock'}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 leading-snug">
                  {selectedProduct.name}
                </h1>

                {/* Pack / Unit */}
                <p className="text-xs text-slate-500 mt-1">
                  Pack Size: <span className="font-bold text-slate-800">{selectedProduct.unit}</span>
                </p>

                {/* Pricing Box */}
                <div className="mt-3 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-900">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-slate-400 line-through">
                      M.R.P: ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ml-auto">
                    Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* DELIVERY OPTIONS SELECTOR (Fast vs Normal) */}
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Choose Delivery Speed:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Fast Delivery Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedDelivery('fast')}
                      disabled={!selectedProduct.isFastDelivery}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        selectedDelivery === 'fast'
                          ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      } ${!selectedProduct.isFastDelivery ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-950">
                        <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>⚡ Fast Delivery</span>
                      </div>
                      <p className="text-[11px] font-bold text-amber-900 mt-1">
                        {selectedProduct.fastDeliveryTime}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">₹49 (Free above ₹999)</p>
                      {selectedDelivery === 'fast' && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </button>

                    {/* Normal Delivery Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedDelivery('normal')}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        selectedDelivery === 'normal'
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/30'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                        <Truck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>📦 Standard Delivery</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-700 mt-1">
                        {selectedProduct.normalDeliveryTime}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">₹25 (Free above ₹499)</p>
                      {selectedDelivery === 'normal' && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">Select Quantity:</span>
                  <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-xs font-black text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => Math.min(selectedProduct.stockCount, prev + 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart and Buy Now */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-xs sm:text-sm py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Technical Specs & Agricultural Use, Reviews */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              {[
                { id: 'details', label: '🌾 Agricultural Use & Details' },
                { id: 'specs', label: '📋 Specifications' },
                { id: 'reviews', label: `⭐ Reviews (${selectedProduct.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Product Description:</h4>
                    <p className="text-slate-600">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-800 mb-1">Farming & Field Application:</h4>
                    <p className="text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                      {selectedProduct.agriculturalUse}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody>
                      {Object.entries(selectedProduct.specifications).map(([key, value], idx) => (
                        <tr
                          key={key}
                          className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                        >
                          <td className="py-2.5 px-4 font-bold text-slate-600 w-1/3 border-b border-slate-100">
                            {key}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-900 border-b border-slate-100">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-900 font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{selectedProduct.rating} out of 5 Stars</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Based on {selectedProduct.reviewCount} verified farmer reviews across Maharashtra, Gujarat & MP
                      </p>
                    </div>
                  </div>

                  {/* Sample verified farmer review */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">Suresh Kulkarni (Jalgaon)</span>
                      <span className="text-slate-400">3 days ago</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">★★★★★</div>
                    <p className="text-xs text-slate-600">
                      &quot;Received genuine product within 90 minutes right at my farm borewell. Germination and quality was 100% as promised. Highly recommend Kisan Pilot!&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
