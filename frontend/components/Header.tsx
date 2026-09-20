'use client';

import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { Medicine } from '../types';

interface HeaderProps {
  onSelectMedicine: (med: Medicine) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenUploadRx: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectMedicine,
  cartCount,
  onOpenCart,
  onOpenUploadRx,
}) => {
  const [pincode, setPincode] = useState('110001');
  const [isEditingPincode, setIsEditingPincode] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
              Express
            </span>
            <span className="text-teal-100">
              ⚡ Guaranteed 2-Hour Delivery in Metro Areas • 100% Genuine Medicines
            </span>
          </div>
          <div className="flex items-center gap-4 text-teal-200">
            <span className="hidden md:inline">24x7 Doctor Helpline: <strong>1800-262-7200</strong></span>
            <span className="hover:text-white cursor-pointer transition">Need Help?</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-teal-700/20">
            <span>✚</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Amara<span className="text-teal-600 font-extrabold">Pharmacy</span>
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-0.5">
              Tata 1mg & Apollo Inspired Healthcare
            </p>
          </div>
        </div>

        {/* Delivery Location Selector */}
        <div className="hidden lg:flex items-center gap-2 text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/70 hover:bg-slate-100 transition cursor-pointer">
          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Deliver to</div>
            {isEditingPincode ? (
              <input
                type="text"
                autoFocus
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                onBlur={() => setIsEditingPincode(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingPincode(false)}
                className="w-16 text-xs font-bold text-slate-800 bg-white border border-teal-500 rounded px-1 outline-none"
              />
            ) : (
              <div
                className="font-bold text-slate-800 flex items-center gap-1"
                onClick={() => setIsEditingPincode(true)}
              >
                <span>New Delhi, {pincode}</span>
                <span className="text-teal-600 text-[10px] font-semibold">▾</span>
              </div>
            )}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl">
          <SearchBar onSelectMedicine={onSelectMedicine} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Upload Prescription CTA */}
          <button
            onClick={onOpenUploadRx}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl text-xs font-bold transition shadow-2xs"
          >
            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Upload Rx</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden md:inline">Cart</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center bg-emerald-500 text-white text-[11px] font-black w-5 h-5 rounded-full ml-0.5 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
