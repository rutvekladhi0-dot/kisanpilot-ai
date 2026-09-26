'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { X, Bell, Zap, Tag, Landmark, Package, CheckCheck } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationsAsRead,
    setActiveTab,
  } = useShop();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="font-black text-slate-900 text-base">Notifications</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markNotificationsAsRead}
                className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark Read</span>
              </button>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto p-4 space-y-3 flex-1">
            {notifications.map((item) => {
              const iconMap = {
                order: Package,
                offer: Tag,
                alert: Zap,
                loan: Landmark,
              };
              const Icon = iconMap[item.type] || Bell;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-1 ${
                    item.read
                      ? 'bg-white border-slate-200'
                      : 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-8 leading-snug">
                    {item.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <button
              onClick={() => {
                setIsNotificationsOpen(false);
                setActiveTab('orders');
              }}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View Order Tracking & Delivery Status →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
