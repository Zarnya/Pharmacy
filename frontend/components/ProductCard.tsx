'use client';

import React from 'react';
import { Medicine } from '../types';

interface ProductCardProps {
  medicine: Medicine;
  cartQuantity: number;
  onAddToCart: (medicine: Medicine) => void;
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onViewSubstitutes: (medicine: Medicine) => void;
  onSelectProduct: (medicine: Medicine) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  medicine,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onViewSubstitutes,
  onSelectProduct,
}) => {
  const discountPercent = Math.round(
    ((medicine.price_mrp - medicine.price_discounted) / medicine.price_mrp) * 100
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-teal-300 transition-all group font-sans relative">
      {/* Top Meta Badges */}
      <div>
        <div className="flex items-center justify-between gap-1 text-[11px] mb-2.5">
          <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md">
            {medicine.form}
          </span>
          {medicine.requires_prescription ? (
            <span className="flex items-center gap-1 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
              <span>℞</span> Rx Required
            </span>
          ) : (
            <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]">
              OTC Medicine
            </span>
          )}
        </div>

        {/* Product Brand Title & Pack */}
        <h3
          onClick={() => onSelectProduct(medicine)}
          className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 cursor-pointer transition line-clamp-1"
        >
          {medicine.brand_name}
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          By {medicine.manufacturer}
        </p>
        <p className="text-[11px] text-slate-500 font-medium">
          Pack: {medicine.package_size}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
            ★ {medicine.rating || 4.7}
          </span>
          <span className="text-[11px] text-slate-400">
            ({(medicine.reviews_count || 4200).toLocaleString()} ratings)
          </span>
        </div>

        {/* Active Chemical Salts Badges (Tata 1mg Hallmark) */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
            Active Salts:
          </span>
          <div className="flex flex-wrap gap-1">
            {medicine.compositions.map((comp, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-teal-50 text-teal-800 border border-teal-100 px-2 py-0.5 rounded-md font-medium"
              >
                {comp.salt_name} <strong className="text-teal-900">({comp.strength})</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
        {/* Pricing Row */}
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-lg font-black text-slate-900">
              ₹{medicine.price_discounted.toFixed(2)}
            </span>
            {discountPercent > 0 && (
              <span className="ml-1.5 text-xs text-slate-400 line-through">
                ₹{medicine.price_mrp.toFixed(2)}
              </span>
            )}
          </div>
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Find Cheaper Substitutes CTA */}
        <button
          type="button"
          onClick={() => onViewSubstitutes(medicine)}
          className="w-full py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
        >
          <span>🧪 Find Cheaper Substitutes</span>
          <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold">
            Save up to 45%
          </span>
        </button>

        {/* Add to Cart or Quantity Stepper */}
        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between bg-teal-50 border border-teal-300 rounded-xl p-1">
            <button
              onClick={() => onUpdateQuantity(medicine.id, cartQuantity - 1)}
              className="w-8 h-8 rounded-lg bg-white text-teal-800 font-bold hover:bg-teal-100 shadow-2xs flex items-center justify-center text-sm"
            >
              −
            </button>
            <span className="font-bold text-teal-900 text-sm">{cartQuantity}</span>
            <button
              onClick={() => onUpdateQuantity(medicine.id, cartQuantity + 1)}
              className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-2xs flex items-center justify-center text-sm"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAddToCart(medicine)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
};
