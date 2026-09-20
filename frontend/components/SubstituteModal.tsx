'use client';

import React, { useEffect, useState } from 'react';
import { Medicine, SubstituteMedicine } from '../types';
import { API_BASE_URL } from '../utils/api';

interface SubstituteModalProps {
  medicine: Medicine | null;
  isOpen: boolean;
  onClose: () => void;
  onSwitchAndAdd: (substitute: SubstituteMedicine) => void;
}

export const SubstituteModal: React.FC<SubstituteModalProps> = ({
  medicine,
  isOpen,
  onClose,
  onSwitchAndAdd,
}) => {
  const [substitutes, setSubstitutes] = useState<SubstituteMedicine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!medicine || !isOpen) return;

    const fetchSubstitutes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/medicines/${medicine.id}/substitutes`);
        const data = await res.json();
        setSubstitutes(data.substitutes || []);
      } catch (err) {
        console.error('Failed to load substitutes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubstitutes();
  }, [medicine, isOpen]);

  if (!isOpen || !medicine) return null;

  const cheaperSubstitutes = substitutes.filter((s) => s.savings_amount > 0);
  const maxSavings = cheaperSubstitutes.length > 0
    ? Math.max(...cheaperSubstitutes.map((s) => s.savings_percentage))
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400 text-teal-950 text-xs font-black px-2 py-0.5 rounded-full uppercase">
                Bioequivalent Generic Match
              </span>
              {maxSavings > 0 && (
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Save up to {maxSavings}%
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white mt-1.5">
              Cheaper Alternatives for {medicine.brand_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition"
          >
            ✕
          </button>
        </div>

        {/* Current Medicine Comparison Anchor */}
        <div className="p-5 bg-slate-50 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Prescribed / Selected Brand:
              </span>
              <div className="font-bold text-slate-900 text-base flex items-center gap-2 mt-0.5">
                <span>{medicine.brand_name}</span>
                <span className="text-xs px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
                  {medicine.form}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                By {medicine.manufacturer} • {medicine.package_size}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Current Price:</span>
              <span className="text-lg font-black text-slate-900">
                ₹{medicine.price_discounted.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Active Salts verification pills */}
          <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500 text-[11px]">Active Molecules:</span>
            {medicine.compositions.map((comp, idx) => (
              <span
                key={idx}
                className="bg-white text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-md font-semibold text-[11px] flex items-center gap-1"
              >
                <span>✓</span> {comp.salt_name} ({comp.strength})
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 max-h-[420px] overflow-y-auto space-y-3">
          {loading ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">
                Searching verified clinical databases for bioequivalent substitutes...
              </p>
            </div>
          ) : cheaperSubstitutes.length > 0 ? (
            cheaperSubstitutes.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-emerald-100 hover:border-emerald-400 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">
                      {item.brand_name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      Identical Formulation
                    </span>
                  </div>

                  <p className="text-xs text-slate-500">
                    By {item.manufacturer} • {item.package_size}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1 text-[11px]">
                    {item.compositions.map((c, i) => (
                      <span key={i} className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {c.salt_name} ({c.strength})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Savings & Switch Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <div className="text-base font-black text-slate-900">
                      ₹{item.price_discounted.toFixed(2)}
                    </div>
                    <div className="text-xs font-bold text-emerald-600">
                      Save ₹{item.savings_amount.toFixed(2)} ({item.savings_percentage}% OFF)
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSwitchAndAdd(item);
                      onClose();
                    }}
                    className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1"
                  >
                    <span>Switch & Add to Cart</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-2xl">🎉</span>
              <h4 className="text-sm font-bold text-slate-800">
                Best Value Already!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {medicine.brand_name} is currently the most affordable verified brand for this exact chemical formulation.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>All substitutes are CDSCO compliant & bioequivalent</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
