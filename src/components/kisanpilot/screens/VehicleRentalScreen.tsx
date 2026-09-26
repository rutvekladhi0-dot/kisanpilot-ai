'use client';

import React, { useState } from 'react';
import { useApp } from '../KisanPilotApp';
import { Vehicle, RentalDurationType, RentalBooking } from '@/types/vehicleRental';
import { VEHICLES, VEHICLE_CATEGORIES } from '@/data/vehicleRentalData';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Fuel,
  FileText,
  AlertCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  X,
  Sparkles,
  Info,
  Navigation,
} from 'lucide-react';

export const VehicleRentalScreen: React.FC = () => {
  const { navigate, lang } = useApp();

  // Search state
  const [searchLocation, setSearchLocation] = useState<string>('Pimpalgaon Baswant, Nashik');
  const [pickupPoint, setPickupPoint] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [durationType, setDurationType] = useState<RentalDurationType>('daily');

  // Modal states
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);

  // Booking Form State
  const [bookingPickup, setBookingPickup] = useState<string>('Farm Gate, Survey No. 42, Pimpalgaon');
  const [bookingDest, setBookingDest] = useState<string>('Lasalgaon APMC Mandi');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [durationUnits, setDurationUnits] = useState<number>(1);
  const [farmerName, setFarmerName] = useState<string>('Ramesh Patel');
  const [farmerPhone, setFarmerPhone] = useState<string>('+91 98765 43210');
  const [confirmedBooking, setConfirmedBooking] = useState<RentalBooking | null>(null);

  // Filter vehicles
  const filteredVehicles = VEHICLES.filter((v) => {
    if (selectedCategory !== 'all' && v.category !== selectedCategory) {
      return false;
    }
    if (searchLocation.trim()) {
      const q = searchLocation.toLowerCase();
      const matchLoc =
        v.location.toLowerCase().includes(q) ||
        v.village.toLowerCase().includes(q) ||
        v.district.toLowerCase().includes(q) ||
        v.name.toLowerCase().includes(q);
      if (!matchLoc) return false;
    }
    return true;
  });

  const getPriceForDuration = (vehicle: Vehicle, duration: RentalDurationType) => {
    switch (duration) {
      case 'daily':
        return `₹${vehicle.rates.daily.toLocaleString('en-IN')}/day`;
      case 'monthly':
        return `₹${vehicle.rates.monthly.toLocaleString('en-IN')}/month`;
      case 'yearly':
        return `₹${vehicle.rates.yearly.toLocaleString('en-IN')}/year`;
    }
  };

  const handleOpenBooking = (vehicle: Vehicle) => {
    setBookingVehicle(vehicle);
    setDetailVehicle(null);
    setConfirmedBooking(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingVehicle) return;

    let rate = bookingVehicle.rates.daily;
    if (durationType === 'monthly') rate = bookingVehicle.rates.monthly;
    if (durationType === 'yearly') rate = bookingVehicle.rates.yearly;

    const totalCost = rate * durationUnits;

    // Calculate end date roughly
    const start = new Date(startDate);
    let end = new Date(start);
    if (durationType === 'daily') end.setDate(start.getDate() + durationUnits);
    if (durationType === 'monthly') end.setMonth(start.getMonth() + durationUnits);
    if (durationType === 'yearly') end.setFullYear(start.getFullYear() + durationUnits);

    const newBooking: RentalBooking = {
      id: `rent-${Date.now()}`,
      bookingId: `KP-RENT-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicle: bookingVehicle,
      pickupLocation: bookingPickup,
      destination: bookingDest,
      durationType,
      durationUnits,
      startDate: start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      endDate: end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalCost,
      depositAmount: bookingVehicle.securityDeposit,
      farmerName,
      farmerPhone,
      status: 'Confirmed',
      createdAt: 'Just now',
    };

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Header with Back to Dashboard button */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('dashboard')}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <h1 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🚜</span>
              <span>Travel & Vehicle Rental</span>
            </h1>
          </div>

          <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Rural Vehicle Hub</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        
        {/* 1. MAIN PURPOSE BANNER */}
        <section className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-xs text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider text-amber-300">
              FARM TRANSPORT ON DEMAND
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              &quot;Your vehicle is unavailable? Kisan Pilot helps you find a vehicle when you need it.&quot;
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Tractor in maintenance? Pickup truck unavailable on mandi day? Rent verified local tractors, mini-trucks, harvest carriers, and passenger vans with transparent daily, monthly, or seasonal rates.
            </p>
          </div>
        </section>

        {/* 2. TRAVEL SEARCH BAR */}
        <section className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <h3 className="font-black text-base sm:text-lg">
              Where do you need a vehicle?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Village / City */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Village / City:
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="e.g. Pimpalgaon, Nashik"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-2 text-xs font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Pickup Location:
              </label>
              <input
                type="text"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                placeholder="e.g. Farm Gate / Khet"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Destination (Optional):
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. APMC Mandi / Sugar Mill"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={() => {}}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Search Vehicles</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. VEHICLE RENTAL CATEGORIES */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-sm text-slate-800">
              Vehicle Rental Categories:
            </h4>
            <span className="text-xs text-slate-500">
              Showing {filteredVehicles.length} vehicles available
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {VEHICLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. RENTAL DURATION SELECTOR (Dynamic Rates) */}
        <section className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-700">
              Select Rental Duration (Prices update dynamically):
            </span>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            {[
              { id: 'daily', label: 'Daily Rental' },
              { id: 'monthly', label: 'Monthly Rental' },
              { id: 'yearly', label: 'Yearly Rental' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDurationType(tab.id as RentalDurationType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  durationType === tab.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 5. VEHICLE CARDS GRID */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVehicles.map((vehicle) => {
              const currentPrice = getPriceForDuration(vehicle, durationType);

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-emerald-400 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Vehicle Image with Badges */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-emerald-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm">
                          {vehicle.categoryLabel}
                        </span>
                        <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                          📍 {vehicle.distanceKm} km away
                        </span>
                      </div>

                      {/* Availability status */}
                      <div className="absolute bottom-3 left-3 bg-emerald-500 text-emerald-950 text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping" />
                        <span>{vehicle.availabilityText}</span>
                      </div>

                      {/* Owner Rating */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-xl flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{vehicle.rating}</span>
                        <span className="text-slate-300 text-[10px]">({vehicle.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {vehicle.model} • {vehicle.location}
                        </p>
                      </div>

                      {/* Key highlights */}
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {vehicle.horsepower && (
                          <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                            ⚡ {vehicle.horsepower}
                          </span>
                        )}
                        {vehicle.loadCapacity && (
                          <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
                            📦 {vehicle.loadCapacity}
                          </span>
                        )}
                        <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                          ⛽ {vehicle.fuelType}
                        </span>
                      </div>

                      {/* Owner info */}
                      <div className="text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
                        <span>
                          Owner: <strong>{vehicle.ownerName}</strong>
                        </span>
                        <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Pricing & Action Buttons */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        {durationType.toUpperCase()} RATE
                      </span>
                      <span className="text-lg sm:text-xl font-black text-emerald-900">
                        {currentPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailVehicle(vehicle)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleOpenBooking(vehicle)}
                        className="text-xs font-black text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
                      >
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 6. VEHICLE DETAILS MODAL */}
      {detailVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {detailVehicle.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {detailVehicle.model} • 📍 {detailVehicle.location} ({detailVehicle.distanceKm} km away)
                </p>
              </div>
              <button
                onClick={() => setDetailVehicle(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
              <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={detailVehicle.image}
                  alt={detailVehicle.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-emerald-500 text-emerald-950 font-black px-3 py-1 rounded-xl text-xs">
                  {detailVehicle.availabilityText}
                </span>
              </div>

              {/* Price Breakdown for all 3 durations */}
              <div className="grid grid-cols-3 gap-2.5 text-center bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Daily Rate</span>
                  <span className="text-sm sm:text-base font-black text-emerald-950">
                    ₹{detailVehicle.rates.daily.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="border-x border-emerald-200">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Monthly Rate</span>
                  <span className="text-sm sm:text-base font-black text-emerald-950">
                    ₹{detailVehicle.rates.monthly.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">Yearly Contract</span>
                  <span className="text-sm sm:text-base font-black text-emerald-950">
                    ₹{detailVehicle.rates.yearly.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Owner info */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Owner: {detailVehicle.ownerName}</span>
                  <span className="text-xs text-slate-500">
                    Phone: {detailVehicle.ownerPhone} • ⭐ {detailVehicle.ownerRating} Rating
                  </span>
                </div>
                <a
                  href={`tel:${detailVehicle.ownerPhone}`}
                  className="bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Owner</span>
                </a>
              </div>

              {/* Specs & Condition */}
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Vehicle Condition & Fuel Policy:</h4>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>Condition:</strong> {detailVehicle.condition}
                </p>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong>Fuel Policy:</strong> {detailVehicle.fuelPolicy} ({detailVehicle.fuelType})
                </p>
              </div>

              {/* Features Included */}
              <div className="space-y-1.5">
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Equipment & Features Included:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {detailVehicle.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Conditions */}
              <div className="space-y-1.5">
                <h4 className="font-black text-slate-900 text-xs sm:text-sm">Usage Conditions:</h4>
                <ul className="space-y-1 text-xs text-slate-600 pl-4 list-disc">
                  {detailVehicle.usageConditions.map((cond, i) => (
                    <li key={i}>{cond}</li>
                  ))}
                </ul>
              </div>

              {/* Documents & Security */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 text-xs text-amber-900">
                <span className="font-bold block">Required Documents & Deposit:</span>
                <p>Documents: {detailVehicle.requiredDocuments.join(', ')}</p>
                <p>Deposit: <strong>{detailVehicle.securityDeposit}</strong></p>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleOpenBooking(detailVehicle)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-2xl shadow-lg transition-all"
              >
                Proceed to Book this Vehicle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. BOOKING & CONFIRMATION MODAL */}
      {bookingVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-slate-900 text-base">
                {confirmedBooking ? 'Rental Booking Confirmed!' : `Book ${bookingVehicle.name}`}
              </h3>
              <button
                onClick={() => setBookingVehicle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {confirmedBooking ? (
                /* CONFIRMATION DISPLAY */
                <div className="text-center py-4 space-y-5 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Booking Status: {confirmedBooking.status}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 mt-2">
                      Booking ID: #{confirmedBooking.bookingId}
                    </h4>
                    <p className="text-slate-500 mt-0.5">
                      Your booking has been registered with {confirmedBooking.vehicle.ownerName}.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Vehicle:</span>
                      <strong className="text-slate-900">{confirmedBooking.vehicle.name}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Rental Period:</span>
                      <strong className="text-slate-900">
                        {confirmedBooking.startDate} to {confirmedBooking.endDate} ({confirmedBooking.durationUnits} {confirmedBooking.durationType})
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Pickup Location:</span>
                      <strong className="text-slate-900">{confirmedBooking.pickupLocation}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span className="text-slate-500">Total Rental Cost:</span>
                      <strong className="text-emerald-800 text-sm">
                        ₹{confirmedBooking.totalCost.toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Security Deposit (at pickup):</span>
                      <strong className="text-amber-900">{confirmedBooking.depositAmount}</strong>
                    </div>
                  </div>

                  {/* Owner Contact */}
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-left space-y-1">
                    <span className="font-bold text-emerald-950 block">Provider Contact Details:</span>
                    <p className="text-emerald-900">
                      Owner: <strong>{confirmedBooking.vehicle.ownerName}</strong>
                    </p>
                    <p className="text-emerald-900">
                      Direct Phone: <strong>{confirmedBooking.vehicle.ownerPhone}</strong>
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      You can call the owner directly for key handover and vehicle delivery.
                    </p>
                  </div>

                  <button
                    onClick={() => setBookingVehicle(null)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Done & Return to Vehicle List
                  </button>
                </div>
              ) : (
                /* BOOKING FORM */
                <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{bookingVehicle.name}</h4>
                      <p className="text-slate-500 text-[11px]">{bookingVehicle.model}</p>
                    </div>
                    <span className="font-black text-emerald-800 text-sm">
                      {getPriceForDuration(bookingVehicle, durationType)}
                    </span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      1. Pickup / Meeting Location (Village / Farm Gate):
                    </label>
                    <input
                      type="text"
                      value={bookingPickup}
                      onChange={(e) => setBookingPickup(e.target.value)}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      2. Destination / Field Location (Optional):
                    </label>
                    <input
                      type="text"
                      value={bookingDest}
                      onChange={(e) => setBookingDest(e.target.value)}
                      placeholder="e.g. APMC Mandi, Lasalgaon"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        3. Rental Duration ({durationType}):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={durationUnits}
                        onChange={(e) => setDurationUnits(Math.max(1, Number(e.target.value)))}
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        4. Start Date:
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Farmer Name:
                      </label>
                      <input
                        type="text"
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Contact Phone:
                      </label>
                      <input
                        type="tel"
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-0.5">
                    <p>Security Deposit: <strong>{bookingVehicle.securityDeposit}</strong></p>
                    <p>Payment: Pay directly to vehicle owner upon physical delivery/inspection.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    Confirm & Reserve Vehicle
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRentalScreen;
