'use client';

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/api';

interface SaltComposition {
  salt_name: string;
  strength: string;
}

interface SubstituteMedicine {
  id: string;
  brand_name: string;
  slug: string;
  manufacturer: string;
  form: string;
  package_size: string;
  price_mrp: number;
  price_discounted: number;
  savings_amount: number;
  savings_percentage: number;
  requires_prescription: boolean;
  compositions: SaltComposition[];
}

interface SubstituteWidgetProps {
  currentMedicineId: string;
  currentBrandName: string;
  currentPrice: number;
  onSwitchMedicine?: (substitute: SubstituteMedicine) => void;
}

export const SubstituteWidget: React.FC<SubstituteWidgetProps> = ({
  currentMedicineId,
  currentBrandName,
  currentPrice,
  onSwitchMedicine,
}) => {
  const [substitutes, setSubstitutes] = useState<SubstituteMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubstitutes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/medicines/${currentMedicineId}/substitutes`);
        const data = await res.json();
        setSubstitutes(data.substitutes || []);
      } catch (err) {
        console.error('Failed to load substitutes:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentMedicineId) {
      fetchSubstitutes();
    }
  }, [currentMedicineId]);

  if (loading) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm animate-pulse space-y-4">
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="h-20 bg-slate-100 rounded-xl" />
        <div className="h-20 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  // Filter only items that are strictly cheaper than current medicine
  const cheaperSubstitutes = substitutes.filter((s) => s.savings_amount > 0);

  if (cheaperSubstitutes.length === 0) {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500">
        You are viewing the lowest cost verified brand for this exact salt combination.
      </div>
    );
  }

  const maxSavings = Math.max(...cheaperSubstitutes.map((s) => s.savings_percentage));

  return (
    <section className="w-full bg-white border border-emerald-200 rounded-2xl p-5 md:p-6 shadow-sm font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
              ✓
            </span>
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Cheaper Generic Alternatives
            </h3>
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Save up to {maxSavings}%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Same active salts, formulation, and clinical efficacy as <strong className="text-slate-700">{currentBrandName}</strong>.
          </p>
        </div>
      </div>

      {/* Alternatives List */}
      <div className="mt-4 space-y-3">
        {cheaperSubstitutes.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/70 hover:bg-emerald-50/30 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all gap-4"
          >
            {/* Substitute Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-sm md:text-base">
                  {item.brand_name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                  {item.form}
                </span>
                {item.requires_prescription && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded">
                    ℞ Required
                  </span>
                )}
              </div>

              {/* Salt Composition Tags */}
              <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs">
                {item.compositions.map((comp, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]"
                  >
                    {comp.salt_name} <strong className="ml-1 text-slate-800">{comp.strength}</strong>
                  </span>
                ))}
              </div>

              <div className="mt-1 text-xs text-slate-400">
                By {item.manufacturer} • {item.package_size}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base md:text-lg font-bold text-slate-900">
                    ₹{item.price_discounted.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{currentPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-600">
                  Save ₹{item.savings_amount.toFixed(2)} ({item.savings_percentage}%)
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onSwitchMedicine) {
                    onSwitchMedicine(item);
                  } else {
                    alert(`Selected substitute: ${item.brand_name} (Saves ₹${item.savings_amount.toFixed(2)})`);
                  }
                }}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                Switch & Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
