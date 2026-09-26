'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { DeliveryType, Order } from '@/types/shop';
import {
  X,
  MapPin,
  Phone,
  Zap,
  Truck,
  CreditCard,
  Banknote,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Landmark,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartDiscount,
    cartTotal,
    addresses,
    selectedAddress,
    setSelectedAddress,
    globalDeliveryMode,
    placeOrder,
    setActiveTab,
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>(globalDeliveryMode);
  const [phone, setPhone] = useState<string>(selectedAddress.phone);
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState<string>('ramesh.patel@okhdfcbank');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(paymentMethod, deliveryType, selectedAddress, phone);
      setPlacedOrder(order);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              KP
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-base sm:text-lg">
                {placedOrder ? 'Order Confirmed!' : 'Checkout & Farm Delivery'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {placedOrder ? 'Thank you for shopping with Kisan Pilot' : 'Fast, reliable delivery direct to your field'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {placedOrder ? (
            /* ORDER SUCCESS SCREEN */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Order #{placedOrder.orderNumber}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  We have received your order for{' '}
                  <strong className="text-slate-900">₹{placedOrder.total.toLocaleString('en-IN')}</strong>.
                  Our local delivery partner has been dispatched.
                </p>
              </div>

              {/* Delivery ETA card */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-md mx-auto text-left flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-black text-amber-950 text-sm">
                    Estimated Delivery: {placedOrder.estimatedDelivery}
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Delivering to: {placedOrder.address.line1}, {placedOrder.address.city} ({placedOrder.address.pincode})
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Payment: <strong>{placedOrder.paymentMethod}</strong> ({placedOrder.paymentStatus})
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setActiveTab('orders');
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition-all"
                >
                  Track Order Timeline →
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    setActiveTab('home');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <div className="space-y-5">
              {/* 1. DELIVERY ADDRESS */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>1. Select Delivery Location (Farm / Home):</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddress.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => {
                          setSelectedAddress(addr);
                          setPhone(addr.phone);
                        }}
                        className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{addr.name}</span>
                          <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            {addr.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {addr.line1}, {addr.city} ({addr.pincode})
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">📞 {addr.phone}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. PHONE NUMBER */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Contact Phone for Delivery Rider:</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-600"
                />
              </div>

              {/* 3. DELIVERY SPEED SELECTION */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  2. Choose Delivery Speed:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('fast')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      deliveryType === 'fast'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                      <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>⚡ Fast Delivery</span>
                    </div>
                    <p className="text-[11px] font-bold text-amber-900 mt-0.5">
                      Within 90 - 120 Mins
                    </p>
                    <p className="text-[10px] text-slate-500">
                      ₹49 (Free on orders ₹999+)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('normal')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      deliveryType === 'normal'
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                      <Truck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>📦 Standard Delivery</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                      Tomorrow by 4:00 PM
                    </p>
                    <p className="text-[10px] text-slate-500">
                      ₹25 (Free on orders ₹499+)
                    </p>
                  </button>
                </div>
              </div>

              {/* 4. PAYMENT METHOD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  3. Select Payment Method:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI (GPay/PhonePe)', icon: Zap },
                    { id: 'Card', label: 'Card (Debit/Credit)', icon: CreditCard },
                    { id: 'Net Banking', label: 'Net Banking', icon: Building2 },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 text-xs font-bold ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-700" />
                        <span className="leading-tight text-[11px]">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-emerald-900">Enter UPI ID:</span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                      className="w-full bg-white border border-emerald-300 rounded-lg p-2 text-xs font-bold outline-none"
                    />
                  </div>
                )}
              </div>

              {/* 5. ORDER SUMMARY & BREAKDOWN */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5 flex justify-between">
                  <span>Order Items ({cart.length})</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({deliveryType === 'fast' ? '⚡ Fast 90m' : 'Standard'}):</span>
                  <span>
                    {cartDeliveryFee === 0 ? (
                      <strong className="text-emerald-700 uppercase">FREE</strong>
                    ) : (
                      `₹${cartDeliveryFee}`
                    )}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount:</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total to Pay:</span>
                  <span className="text-emerald-800">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-black text-sm py-4 rounded-2xl shadow-xl shadow-emerald-800/30 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {isSubmitting ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <span>Place Order • ₹{cartTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & RBI Mandated Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
