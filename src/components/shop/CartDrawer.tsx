'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Zap,
  Truck,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    globalDeliveryMode,
    setGlobalDeliveryMode,
    setActiveTab,
  } = useShop();

  const [couponInput, setCouponInput] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                {cartCount}
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-base sm:text-lg">
                  Your Shopping Cart
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in your basket
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery Mode Banner inside Cart */}
          {cart.length > 0 && (
            <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Delivery Speed:</span>
              </div>
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-amber-200">
                <button
                  onClick={() => setGlobalDeliveryMode('fast')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    globalDeliveryMode === 'fast'
                      ? 'bg-amber-400 text-emerald-950 shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  ⚡ Fast (90m)
                </button>
                <button
                  onClick={() => setGlobalDeliveryMode('normal')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    globalDeliveryMode === 'normal'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  📦 Standard
                </button>
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="overflow-y-auto p-4 space-y-3 flex-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex gap-3 items-center"
                >
                  {/* Item Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-emerald-700">
                      {item.product.brand}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Pack: {item.product.unit}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-slate-900 text-sm">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors self-start"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-3xl">
                  🛒
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-lg">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Looks like you haven&apos;t added any seeds, fertilizers, sprayers, or daily essentials yet.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('home');
                  }}
                  className="bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer: Coupon, Price Breakdown, Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5">
              
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-100/70 border border-emerald-300 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Coupon &quot;{appliedCoupon.code}&quot; Applied!</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon (e.g. KISAN100, FASTDEL)"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-2 text-xs font-bold uppercase outline-none focus:border-emerald-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p
                    className={`text-[11px] mt-1 font-semibold ${
                      couponMessage.success ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    {globalDeliveryMode === 'fast' ? (
                      <span className="text-amber-800 font-bold flex items-center gap-0.5">
                        <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Fast Express Delivery (90m):
                      </span>
                    ) : (
                      <span className="text-slate-700 font-bold flex items-center gap-0.5">
                        <Truck className="w-3 h-3 text-slate-500" />
                        Standard Delivery:
                      </span>
                    )}
                  </span>
                  <span>
                    {cartDeliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded-md">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold text-slate-900">₹{cartDeliveryFee}</span>
                    )}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Savings:</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-emerald-800">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-800/30 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
