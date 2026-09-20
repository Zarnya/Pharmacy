'use client';

import React from 'react';

interface NavbarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  'All Medicines',
  'Fever & Pain Relief',
  'Antibiotics & Infections',
  'Gastric & Digestion',
  'Blood Pressure & Heart',
  'Diabetes Care',
  'Respiratory & Allergy',
  'Vitamins & Nutrition',
  'Bone & Joint Care',
];

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1.5 whitespace-nowrap text-xs font-semibold text-slate-600">
        {CATEGORIES.map((cat) => {
          const isSelected =
            (cat === 'All Medicines' && selectedCategory === 'All') ||
            cat === selectedCategory;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat === 'All Medicines' ? 'All' : cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-teal-600 text-white font-bold shadow-xs'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
