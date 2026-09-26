'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Heart,
  Tag,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Landmark,
  CheckCircle2,
  Edit2,
  Save,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    addresses,
    addAddress,
    orders,
    wishlist,
    setActiveTab,
  } = useShop();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(userProfile.name);
  const [phone, setPhone] = useState<string>(userProfile.phone);
  const [farmName, setFarmName] = useState<string>(userProfile.farmName);
  const [village, setVillage] = useState<string>(userProfile.village);
  const [showAddAddress, setShowAddAddress] = useState<boolean>(false);

  // New address state
  const [newAddrName, setNewAddrName] = useState<string>('');
  const [newAddrLine1, setNewAddrLine1] = useState<string>('');
  const [newAddrCity, setNewAddrCity] = useState<string>('Nashik');
  const [newAddrPincode, setNewAddrPincode] = useState<string>('422209');
  const [newAddrType, setNewAddrType] = useState<'Home' | 'Farm / Khet' | 'Warehouse / Shop'>('Farm / Khet');

  const handleSaveProfile = () => {
    updateUserProfile({
      name,
      phone,
      farmName,
      village,
    });
    setIsEditing(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrLine1) return;
    addAddress({
      name: newAddrName,
      phone: userProfile.phone,
      line1: newAddrLine1,
      city: newAddrCity,
      state: 'Maharashtra',
      pincode: newAddrPincode,
      type: newAddrType,
      isDefault: false,
    });
    setShowAddAddress(false);
    setNewAddrName('');
    setNewAddrLine1('');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* 1. Profile Top Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-emerald-800 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-emerald-300">
              {userProfile.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{userProfile.name}</h1>
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  Verified Farmer
                </span>
              </div>
              <p className="text-xs text-emerald-100 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{userProfile.farmName} • {userProfile.village}, {userProfile.district}</span>
              </p>
              <p className="text-xs text-emerald-200">
                📞 {userProfile.phone} • ✉️ {userProfile.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-xs transition-colors"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Edit Drawer */}
        {isEditing && (
          <div className="mt-5 p-4 bg-emerald-900/60 rounded-2xl border border-emerald-500/30 space-y-3 text-xs animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-emerald-200 block mb-1">Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-emerald-600 rounded-lg p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-emerald-200 block mb-1">Phone Number:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-emerald-600 rounded-lg p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-emerald-200 block mb-1">Farm / Estate Name:</label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-emerald-600 rounded-lg p-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-emerald-200 block mb-1">Village / Taluka:</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-emerald-600 rounded-lg p-2 text-white outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleSaveProfile}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2 rounded-xl shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Quick Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            title: 'My Orders',
            count: `${orders.length} Orders`,
            icon: Package,
            tab: 'orders',
            color: 'text-emerald-700 bg-emerald-50',
          },
          {
            title: 'Wishlist',
            count: `${wishlist.length} Items`,
            icon: Heart,
            tab: 'search',
            color: 'text-rose-700 bg-rose-50',
          },
          {
            title: 'Agri Loans',
            count: '4% Subsidized',
            icon: Landmark,
            tab: 'loans',
            color: 'text-amber-700 bg-amber-50',
          },
          {
            title: 'Security',
            count: '95% Protected',
            icon: ShieldCheck,
            tab: 'security',
            color: 'text-teal-700 bg-teal-50',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{item.count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Saved Delivery Addresses */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              Saved Delivery Addresses
            </h3>
          </div>

          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Add Address Form */}
        {showAddAddress && (
          <form
            onSubmit={handleCreateAddress}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs animate-in fade-in"
          >
            <h4 className="font-bold text-slate-800">Add New Farm / Home Location</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Address Label (e.g. Borewell Plot):</label>
                <input
                  type="text"
                  value={newAddrName}
                  onChange={(e) => setNewAddrName(e.target.value)}
                  placeholder="e.g. North Farm Gate"
                  required
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Type:</label>
                <select
                  value={newAddrType}
                  onChange={(e) => setNewAddrType(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none"
                >
                  <option value="Farm / Khet">Farm / Khet (Field)</option>
                  <option value="Home">Home (Village House)</option>
                  <option value="Warehouse / Shop">Warehouse / Shop</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1">Street / Gut / Survey Number:</label>
                <input
                  type="text"
                  value={newAddrLine1}
                  onChange={(e) => setNewAddrLine1(e.target.value)}
                  placeholder="e.g. Gat No. 128, Near Canal Bridge"
                  required
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddAddress(false)}
                className="px-3 py-1.5 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-xl shadow-xs"
              >
                Save Location
              </button>
            </div>
          </form>
        )}

        {/* Address Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-1.5 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">{addr.name}</span>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {addr.type}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {addr.line1}, {addr.city} ({addr.pincode}), {addr.state}
              </p>
              <p className="text-[11px] text-slate-500">Phone: {addr.phone}</p>
              {addr.isDefault && (
                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Primary Delivery Address
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Help & Support / Kisan Helpline */}
      <section className="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl shrink-0">
            📞
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base">
              Kisan Pilot 24x7 Mandi Helpline & WhatsApp
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Talk directly with certified agricultural agronomists for crop advice or order assistance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:18001801551"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors"
          >
            Call 1800-180-1551
          </a>
        </div>
      </section>
    </div>
  );
};
