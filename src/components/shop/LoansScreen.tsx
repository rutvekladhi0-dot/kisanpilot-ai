'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { LOAN_SCHEMES } from '@/data/shopData';
import { LoanScheme } from '@/types/shop';
import {
  Landmark,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Phone,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const LoansScreen: React.FC = () => {
  const { userProfile } = useShop();

  const [selectedScheme, setSelectedScheme] = useState<LoanScheme | null>(null);
  const [expandedScheme, setExpandedScheme] = useState<string | null>('loan-kcc');

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(4); // KCC subsidized
  const [tenureYears, setTenureYears] = useState<number>(1);

  // Application Modal state
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [appliedScheme, setAppliedScheme] = useState<LoanScheme | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<boolean>(false);

  // Calculate simple EMI
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const calculatedEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalRepayment = calculatedEMI * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  const handleApply = (scheme: LoanScheme) => {
    setAppliedScheme(scheme);
    setIsApplying(true);
    setApplicationSuccess(false);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSuccess(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-green-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-bold text-amber-300 border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Govt Subsidized Agri Credit Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Agricultural Loans & Govt Subsidies
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            Finance your seeds, fertilizers, drip irrigation, tractors, and solar pumps with 4% KCC interest rates and up to 60% direct government subsidies.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>NABARD & RBI Regulated</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Zero Collateral up to ₹1.6 Lakh</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Direct Bank Account Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOAN SCHEMES LIST */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Available Agricultural Schemes ({LOAN_SCHEMES.length})</span>
        </h2>

        <div className="space-y-4">
          {LOAN_SCHEMES.map((scheme) => {
            const isExpanded = expandedScheme === scheme.id;

            return (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-all overflow-hidden"
              >
                {/* Scheme Header */}
                <div
                  onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                      {scheme.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-900 text-base sm:text-lg">
                          {scheme.title}
                        </h3>
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                          {scheme.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        Provided by: <span className="text-emerald-700">{scheme.provider}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">
                        Max Credit Limit
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {scheme.maxAmount}
                      </span>
                    </div>

                    <div className="p-2 rounded-full bg-slate-100 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 border-t border-slate-100 space-y-4 animate-in fade-in">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {scheme.description}
                    </p>

                    {/* Key Attributes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                      <div>
                        <span className="text-slate-500 font-medium block">Interest Rate:</span>
                        <strong className="text-emerald-900 text-sm">{scheme.interestRate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium block">Tenure:</span>
                        <strong className="text-emerald-900 text-sm">{scheme.tenure}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium block">Govt Subsidy:</span>
                        <strong className="text-amber-800 text-sm">{scheme.subsidy}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Eligibility */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Eligibility Criteria:</span>
                        </h4>
                        <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                          {scheme.eligibility.map((el, i) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Documents */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Documents Required:</span>
                        </h4>
                        <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                          {scheme.documentsRequired.map((doc, i) => (
                            <li key={i}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Zero Processing Fee through Kisan Pilot Partner Banks
                      </span>
                      <button
                        onClick={() => handleApply(scheme)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                      >
                        <span>Apply / Check Eligibility</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE FARM LOAN EMI CALCULATOR */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl">
              Agri Loan EMI & Repayment Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Calculate your harvest repayment or monthly installments in seconds
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sliders */}
          <div className="md:col-span-2 space-y-5">
            {/* Amount Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Loan Amount:</span>
                <span className="text-emerald-800 text-sm font-black">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="25000"
                max="1000000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹25,000</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Annual Interest Rate (%):</span>
                <span className="text-emerald-800 text-sm font-black">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>4% (KCC Subsidized)</span>
                <span>14% (Commercial)</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Loan Tenure:</span>
                <span className="text-emerald-800 text-sm font-black">
                  {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({totalMonths} Months)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year (KCC Crop Cycle)</span>
                <span>7 Years (Tractor/Solar)</span>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wider">
                Estimated Monthly EMI
              </span>
              <span className="text-3xl font-black text-emerald-950 block mt-1">
                ₹{calculatedEMI.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                *For KCC loans, repayment can be made as a single bullet payment post-harvest.
              </p>
            </div>

            <div className="space-y-2 text-xs border-t border-emerald-200/60 pt-3 text-slate-700">
              <div className="flex justify-between">
                <span>Principal Amount:</span>
                <span className="font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-amber-900">₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200/60 pt-2 font-bold text-slate-900 text-sm">
                <span>Total Amount to Repay:</span>
                <span className="text-emerald-900">₹{totalRepayment.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      {isApplying && appliedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  Apply for {appliedScheme.title}
                </h3>
                <p className="text-xs text-slate-500">Fast digital application with zero paperwork</p>
              </div>
              <button
                onClick={() => setIsApplying(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            {applicationSuccess ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your reference application number is{' '}
                  <strong className="text-emerald-800">
                    KCC-{Math.floor(100000 + Math.random() * 900000)}
                  </strong>
                  . A Kisan Pilot Agricultural Officer will contact you on {userProfile.phone} within 24 hours.
                </p>
                <button
                  onClick={() => setIsApplying(false)}
                  className="bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Farmer Full Name:</label>
                  <input
                    type="text"
                    defaultValue={userProfile.name}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      defaultValue={userProfile.phone}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Land Size (Acres):</label>
                    <input
                      type="number"
                      defaultValue="3.5"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Village & Taluka:</label>
                    <input
                      type="text"
                      defaultValue={`${userProfile.village}, ${userProfile.district}`}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Aadhaar Last 4 Digits:</label>
                    <input
                      type="text"
                      maxLength={4}
                      defaultValue="8912"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  ℹ️ By submitting, you authorize Kisan Pilot to verify your land records via State Bhulekh / 7/12 portal for instantaneous loan approval.
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3 rounded-xl transition-all shadow-md"
                >
                  Submit Digital Pre-approval Form
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
