'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  CreditCard,
  UserCheck,
  BellRing,
} from 'lucide-react';

export const SecurityScreen: React.FC = () => {
  const { userProfile, updateUserProfile } = useShop();

  const [twoFactor, setTwoFactor] = useState<boolean>(userProfile.twoFactorEnabled);
  const [biometric, setBiometric] = useState<boolean>(userProfile.biometricEnabled);
  const [testOtp, setTestOtp] = useState<string>('');
  const [otpGenerated, setOtpGenerated] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [currentPin, setCurrentPin] = useState<string>('4582');
  const [showPin, setShowPin] = useState<boolean>(false);

  const handleGenerateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpGenerated(code);
    setOtpVerified(false);
  };

  const handleVerifyOtp = () => {
    if (testOtp.trim() === otpGenerated) {
      setOtpVerified(true);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-800/60 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kisan Pilot Shield Protected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Account Security & Privacy Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Bank-grade 256-bit encryption protecting your farm records, KCC loans, and payments.
            </p>
          </div>

          {/* Security Score Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center shrink-0">
            <span className="text-[10px] font-black uppercase text-emerald-400 block tracking-wider">
              Security Score
            </span>
            <span className="text-3xl font-black text-emerald-400">95%</span>
            <span className="text-[11px] font-bold text-white block mt-0.5">
              High Protection
            </span>
          </div>
        </div>
      </div>

      {/* 1. LOGIN & SECURITY SETTINGS */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-700" />
          <span>Login & Verification Settings</span>
        </h2>

        <div className="space-y-4 divide-y divide-slate-100">
          {/* Two-Factor Authentication */}
          <div className="pt-3 first:pt-0 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Two-Factor Authentication (2FA)
                </h4>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-md">
                  Recommended
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Receive an instant SMS verification OTP on {userProfile.phone} before confirming high-value purchases or loan updates.
              </p>
            </div>

            <button
              onClick={() => {
                const newVal = !twoFactor;
                setTwoFactor(newVal);
                updateUserProfile({ twoFactorEnabled: newVal });
              }}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                twoFactor ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm absolute top-0.5 ${
                  twoFactor ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Biometric / Fast Kisan PIN */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  Kisan 4-Digit Security PIN & Biometric Login
                </h4>
              </div>
              <p className="text-xs text-slate-500">
                Quick 1-tap checkout verification using your fingerprint or 4-digit secret PIN.
              </p>
            </div>

            <button
              onClick={() => {
                const newVal = !biometric;
                setBiometric(newVal);
                updateUserProfile({ biometricEnabled: newVal });
              }}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                biometric ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm absolute top-0.5 ${
                  biometric ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* View / Change PIN */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Your Current Kisan PIN
              </h4>
              <p className="text-xs text-slate-500">
                Used to authorize payments and profile edits.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                {showPin ? currentPin : '••••'}
              </span>
              <button
                onClick={() => setShowPin(!showPin)}
                className="p-1.5 text-slate-500 hover:text-slate-800"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECURITY VERIFICATION & OTP TEST TOOL */}
      <section className="bg-emerald-50/60 rounded-3xl border border-emerald-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              Security Verification Code Test
            </h3>
            <p className="text-xs text-slate-600">
              Verify your registered mobile number {userProfile.phone}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <button
              onClick={handleGenerateOtp}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            >
              Send Security OTP Code
            </button>

            {otpGenerated && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                  Simulated SMS Code: <strong className="font-mono text-sm">{otpGenerated}</strong>
                </span>

                <input
                  type="text"
                  maxLength={6}
                  value={testOtp}
                  onChange={(e) => setTestOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-mono font-bold w-36 outline-none"
                />

                <button
                  onClick={handleVerifyOtp}
                  className="bg-slate-900 text-white font-bold text-xs px-3 py-2 rounded-xl hover:bg-slate-800"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          {otpVerified && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Mobile verification code successfully authenticated! Your account is active & secure.</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. SECURE PAYMENTS & PRIVACY ASSURANCE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Security */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <h4 className="font-black text-slate-900 text-sm sm:text-base">
            Secure Payment Architecture
          </h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Card Storage:</strong> We never save your CVV or debit/credit card PINs on our servers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>NPCI & RBI Certified:</strong> UPI transactions processed directly through official NPCI payment gateways.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cash on Delivery Protection:</strong> Open box inspection available before paying cash to delivery rider.</span>
            </li>
          </ul>
        </div>

        {/* Data Privacy */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="font-black text-slate-900 text-sm sm:text-base">
            Farmer Data Privacy Policy
          </h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Confidential Land Records:</strong> Your 7/12 land titles and crop records are encrypted and never sold to third parties.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Spam Guarantee:</strong> You will only receive order delivery SMS and critical weather/pest alerts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Right to Erasure:</strong> Delete your search history or saved addresses anytime with one tap.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. ACTIVE LOGIN SESSIONS */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
        <h4 className="font-black text-slate-900 text-sm">
          Active Device Sessions
        </h4>
        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="font-bold text-slate-900">Chrome on Android • Samsung Galaxy M34</span>
                <p className="text-[11px] text-slate-500">Nashik, Maharashtra • Current Session (Active now)</p>
              </div>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              Current Device
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
