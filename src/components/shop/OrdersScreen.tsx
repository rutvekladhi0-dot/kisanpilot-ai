'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Order } from '@/types/shop';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  RotateCcw,
  ChevronRight,
  FileText,
  MapPin,
} from 'lucide-react';

export const OrdersScreen: React.FC = () => {
  const { orders, addToCart, setIsCartOpen, setActiveTab } = useShop();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.selectedDelivery);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>My Orders & Farm Deliveries</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track active live deliveries and view invoices of past farm purchases
          </p>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const isDelivered = order.status === 'Delivered';
            const isFast = order.deliveryType === 'fast';

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:px-6 bg-slate-50/80 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-black text-slate-900 text-sm">
                      #{order.orderNumber}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">Placed: {order.date}</span>
                    <span className="text-slate-400">•</span>
                    <span
                      className={`font-black px-2 py-0.5 rounded-md text-[10px] uppercase ${
                        isFast
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isFast ? '⚡ 90m Express' : 'Standard Delivery'}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1 ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isDelivered ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                      )}
                      <span>{order.status}</span>
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold uppercase text-emerald-700">
                              {item.product.brand}
                            </span>
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')} ({item.product.unit})
                            </p>
                          </div>
                        </div>

                        <span className="font-bold text-slate-900 text-xs sm:text-sm shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info & Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs space-y-1">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Delivery Address: {order.address.line1}, {order.address.city}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus}) • Total:{' '}
                        <strong className="text-emerald-800 text-sm">
                          ₹{order.total.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-2 rounded-xl transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Track Delivery</span>
                      </button>

                      <button
                        onClick={() => handleReorder(order)}
                        className="flex items-center gap-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-3xl">
            📦
          </div>
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-lg">No orders placed yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your farming orders and invoices will appear here once you make a purchase.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('home')}
            className="bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors shadow-md"
          >
            Explore Agri Shop
          </button>
        </div>
      )}

      {/* TRACKING TIMELINE MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  Track Delivery #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-slate-500">{selectedOrder.estimatedDelivery}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4 py-2">
              {selectedOrder.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3 items-start relative">
                  {idx < selectedOrder.trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                        step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                      step.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h5
                      className={`text-xs font-bold ${
                        step.completed ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.status}
                    </h5>
                    <p className="text-[11px] text-slate-400">{step.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold">Kisan Pilot Delivery Assurance:</span>
              <p className="text-[11px] text-emerald-800">
                Delivery partner: <strong>Raju Shinde (+91 94220 11223)</strong>. For any delivery queries, our 24x7 Mandi desk is available at 1800-180-1551.
              </p>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
