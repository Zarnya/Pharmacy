'use client';

import React from 'react';

interface HeroBannersProps {
  onOpenUploadRx: () => void;
  onExploreSubstitutes: () => void;
}

export const HeroBanners: React.FC<HeroBannersProps> = ({
  onOpenUploadRx,
  onExploreSubstitutes,
}) => {
  return (
    <section className="space-y-4">
      {/* Dynamic 2-Card Hero Promo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Generic Substitutes Engine Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 text-white p-6 shadow-md">
          <div className="relative z-10 max-w-sm space-y-3">
            <span className="inline-block px-2.5 py-1 bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider">
              Amara Generic Engine
            </span>
            <h2 className="text-xl md:text-2xl font-black leading-tight text-white">
              Save up to 60% on Exact Generic Substitutes
            </h2>
            <p className="text-xs text-teal-100 leading-relaxed">
              Every branded medicine has a clinical twin with identical active salts and strength. We help you find cheaper verified alternatives.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={onExploreSubstitutes}
                className="px-4 py-2 bg-white text-teal-900 hover:bg-teal-50 text-xs font-bold rounded-xl shadow transition"
              >
                Compare Generics
              </button>
              <span className="text-xs text-emerald-200 font-semibold">
                Lab Tested • 100% Bioequivalent
              </span>
            </div>
          </div>
          {/* Subtle medical icon background decoration */}
          <div className="absolute -right-6 -bottom-6 text-teal-600/30 text-9xl font-black select-none pointer-events-none">
            ✚
          </div>
        </div>

        {/* Card 2: Quick Upload Prescription Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-6 shadow-md">
          <div className="relative z-10 max-w-sm space-y-3">
            <span className="inline-block px-2.5 py-1 bg-teal-400/20 border border-teal-300/30 text-teal-200 text-xs font-bold rounded-full uppercase tracking-wider">
              Doctor&apos;s Prescription
            </span>
            <h2 className="text-xl md:text-2xl font-black leading-tight text-white">
              Order Medicines with Valid Doctor Rx
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Simply upload a photo or PDF of your prescription. Our licensed pharmacists will prepare your order and offer cheaper generic options.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={onOpenUploadRx}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <span>Upload Prescription</span>
                <span>→</span>
              </button>
              <span className="text-xs text-slate-400 font-medium">
                Pharmacist review in 10 mins
              </span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 text-slate-700/20 text-9xl font-black select-none pointer-events-none">
            ℞
          </div>
        </div>
      </div>

      {/* Trust & Guarantees Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">100% Genuine Medicines</h4>
            <p className="text-[11px] text-slate-500">Directly from licensed distributors</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">2-Hour Express Delivery</h4>
            <p className="text-[11px] text-slate-500">Free delivery on orders over ₹499</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            🧪
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Generic Substitute Match</h4>
            <p className="text-[11px] text-slate-500">Scientifically identical chemical salts</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-3 md:pt-0 md:pl-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
            🩺
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Doctor & Pharmacist On Call</h4>
            <p className="text-[11px] text-slate-500">Free dosage & safety consultation</p>
          </div>
        </div>
      </div>
    </section>
  );
};
