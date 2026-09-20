'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Medicine } from '../types';
import { API_BASE_URL } from '../utils/api';

interface SearchBarProps {
  onSelectMedicine?: (medicine: Medicine) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSelectMedicine }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/api/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search fetch error:', err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (onSelectMedicine) {
        onSelectMedicine(selected);
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full font-sans" ref={dropdownRef}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <span className="absolute left-4 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search medicines, salts (e.g. Paracetamol, Augmentin, Telma)..."
          className="w-full pl-11 pr-11 py-2.5 bg-slate-100/90 text-slate-800 placeholder-slate-400 text-xs md:text-sm border border-slate-200 rounded-xl shadow-2xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
        />
        {isLoading && (
          <div className="absolute right-4">
            <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-100 max-h-[460px] overflow-y-auto animate-in fade-in-50">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelectMedicine) onSelectMedicine(item);
                    setIsOpen(false);
                  }}
                  className={`flex items-start justify-between p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-teal-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {item.brand_name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {item.form}
                      </span>
                      {item.requires_prescription && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded">
                          <span>℞</span> Prescribed
                        </span>
                      )}
                    </div>

                    {/* Active Salts / Compositions */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400 text-[10px] uppercase">Salts:</span>
                      {item.compositions.map((comp, i) => (
                        <span key={i} className="text-teal-700 bg-teal-50 border border-teal-100 px-1.5 py-0.2 rounded font-medium text-[11px]">
                          {comp.salt_name} ({comp.strength})
                        </span>
                      ))}
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400">
                      By {item.manufacturer} • {item.package_size}
                    </p>
                  </div>

                  {/* Pricing Column */}
                  <div className="text-right whitespace-nowrap">
                    <div className="text-sm font-black text-slate-900">
                      ₹{item.price_discounted.toFixed(2)}
                    </div>
                    {item.price_mrp > item.price_discounted && (
                      <div className="text-xs text-slate-400 line-through">
                        ₹{item.price_mrp.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching medicines or salts found for &ldquo;<span className="font-semibold text-slate-700">{query}</span>&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
};
