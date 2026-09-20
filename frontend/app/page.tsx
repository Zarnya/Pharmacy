'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { HeroBanners } from '../components/HeroBanners';
import { ProductCard } from '../components/ProductCard';
import { SubstituteModal } from '../components/SubstituteModal';
import { CartDrawer } from '../components/CartDrawer';
import { UploadRxModal } from '../components/UploadRxModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import { Medicine, CartItem, SubstituteMedicine } from '../types';
import { API_BASE_URL } from '../utils/api';

export default function AmaraPharmacyHome() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rxFilter, setRxFilter] = useState<'all' | 'rx' | 'otc'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals State
  const [activeSubstituteMedicine, setActiveSubstituteMedicine] = useState<Medicine | null>(null);
  const [isUploadRxOpen, setIsUploadRxOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Fetch medicines from backend
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const categoryParam = selectedCategory !== 'All' ? `?category=${encodeURIComponent(selectedCategory)}` : '';
        const res = await fetch(`${API_BASE_URL}/api/medicines${categoryParam}`);
        const data = await res.json();
        setMedicines(data.medicines || []);
      } catch (err) {
        console.error('Failed to load medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [selectedCategory]);

  // Cart item management
  const handleAddToCart = (medicine: Medicine) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { medicine, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (medicineId: string, quantity: number) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.medicine.id !== medicineId);
      }
      return prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      );
    });
  };

  const handleSwitchAndAdd = (substitute: SubstituteMedicine) => {
    handleAddToCart(substitute);
    setIsCartOpen(true);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filter and sort catalog
  let filteredMedicines = medicines.filter((m) => {
    if (rxFilter === 'rx') return m.requires_prescription === true;
    if (rxFilter === 'otc') return m.requires_prescription === false;
    return true;
  });

  if (sortBy === 'price_asc') {
    filteredMedicines.sort((a, b) => a.price_discounted - b.price_discounted);
  } else if (sortBy === 'price_desc') {
    filteredMedicines.sort((a, b) => b.price_discounted - a.price_discounted);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafc]">
      {/* 1. Header with Search, Pincode & Cart */}
      <Header
        onSelectMedicine={(med) => setActiveSubstituteMedicine(med)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUploadRx={() => setIsUploadRxOpen(true)}
      />

      {/* 2. Top Navigation Bar with Categories */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-8">
        {/* Hero Banners */}
        <HeroBanners
          onOpenUploadRx={() => setIsUploadRxOpen(true)}
          onExploreSubstitutes={() => {
            const firstWithSub = medicines.find((m) => m.id === 'm5-augmentin-625') || medicines[0];
            if (firstWithSub) setActiveSubstituteMedicine(firstWithSub);
          }}
        />

        {/* Catalog Section Header & Filter Controls */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'All Verified Medicines' : selectedCategory}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredMedicines.length} clinical formulations with instant generic substitute comparisons
              </p>
            </div>

            {/* Filter Pills and Sorter */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Rx / OTC Filter */}
              <div className="inline-flex rounded-xl p-1 bg-slate-200/80 text-xs font-semibold">
                <button
                  onClick={() => setRxFilter('all')}
                  className={`px-3 py-1 rounded-lg transition ${
                    rxFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setRxFilter('rx')}
                  className={`px-3 py-1 rounded-lg transition ${
                    rxFilter === 'rx' ? 'bg-white text-rose-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ℞ Prescribed
                </button>
                <button
                  onClick={() => setRxFilter('otc')}
                  className={`px-3 py-1 rounded-lg transition ${
                    rxFilter === 'otc' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  OTC
                </button>
              </div>

              {/* Sorter */}
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                <option value="popular">Popularity</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                  <div className="h-12 bg-slate-100 rounded-xl" />
                  <div className="h-8 bg-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredMedicines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMedicines.map((medicine) => {
                const cartItem = cartItems.find((ci) => ci.medicine.id === medicine.id);
                return (
                  <ProductCard
                    key={medicine.id}
                    medicine={medicine}
                    cartQuantity={cartItem ? cartItem.quantity : 0}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onViewSubstitutes={(med) => setActiveSubstituteMedicine(med)}
                    onSelectProduct={(med) => setActiveSubstituteMedicine(med)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <span className="text-3xl">🔍</span>
              <h3 className="font-bold text-slate-800 text-base">No medicines match your filter</h3>
              <p className="text-xs text-slate-500">
                Try selecting a different category or resetting your prescription filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setRxFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Educational Feature Strip: "How Amara Substitutes Work" */}
        <section className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Transparent Pharmaceutical Science
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white mt-1">
              Why Pay 2x More for the Brand Name?
            </h3>
            <p className="text-xs text-teal-100 mt-2 leading-relaxed">
              In medicine, clinical effectiveness is determined by the <strong>active chemical salt and strength</strong>, not the logo on the box. Amara’s algorithm pairs your prescribed medicine with bioequivalent options licensed under stringent CDSCO guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400 text-teal-950 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Exact Chemical Twin</h4>
              <p className="text-xs text-teal-200 leading-relaxed">
                Both products contain the exact same milligrams of active drug (e.g. Paracetamol 650mg).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400 text-teal-950 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Same Bioavailability</h4>
              <p className="text-xs text-teal-200 leading-relaxed">
                Releases into the bloodstream at the identical rate with proven clinical efficacy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400 text-teal-950 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Up to 60% Savings</h4>
              <p className="text-xs text-teal-200 leading-relaxed">
                Save on marketing & packaging overheads while receiving first-class medical treatment.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modals & Drawers */}
      <SubstituteModal
        medicine={activeSubstituteMedicine}
        isOpen={activeSubstituteMedicine !== null}
        onClose={() => setActiveSubstituteMedicine(null)}
        onSwitchAndAdd={handleSwitchAndAdd}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <UploadRxModal
        isOpen={isUploadRxOpen}
        onClose={() => setIsUploadRxOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={() => {
          handleClearCart();
        }}
      />
    </div>
  );
}
