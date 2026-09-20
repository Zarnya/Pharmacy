'use client';

import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onProceedCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate bill values
  const totalMrp = cartItems.reduce(
    (sum, item) => sum + item.medicine.price_mrp * item.quantity,
    0
  );
  const totalDiscounted = cartItems.reduce(
    (sum, item) => sum + item.medicine.price_discounted * item.quantity,
    0
  );
  const productDiscount = totalMrp - totalDiscounted;

  const requiresPrescription = cartItems.some((i) => i.medicine.requires_prescription);

  // Delivery fee rules (Free above ₹499)
  const deliveryFee = totalDiscounted >= 499 || totalDiscounted === 0 ? 0 : 49;
  const packagingFee = totalDiscounted > 0 ? 5 : 0;

  // Coupon discount (AMARA25 = 25% off up to ₹150)
  let couponDiscount = 0;
  if (appliedCoupon === 'AMARA25') {
    couponDiscount = Math.min(Math.round(totalDiscounted * 0.25), 150);
  }

  const finalTotal = Math.max(
    0,
    totalDiscounted - couponDiscount + deliveryFee + packagingFee
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'AMARA25') {
      setAppliedCoupon('AMARA25');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try AMARA25');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs font-sans">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛍️</span>
              <h2 className="font-bold text-slate-900 text-lg">Your Medicine Cart</h2>
              <span className="bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold transition"
            >
              ✕
            </button>
          </div>

          {/* Cart Scrollable Items */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {requiresPrescription && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-800">
                <span className="text-base">℞</span>
                <div>
                  <span className="font-bold block">Prescription Required</span>
                  One or more items in your cart requires a doctor prescription. You can upload it during checkout or our pharmacist will assist you.
                </div>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="text-5xl">🛒</div>
                <h3 className="font-bold text-slate-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-500">
                  Search for medicines or browse categories to add medicines with instant generic savings.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl hover:bg-teal-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.medicine.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.medicine.brand_name}
                        </span>
                        {item.medicine.requires_prescription && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1 py-0.2 rounded">
                            ℞
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {item.medicine.package_size} • {item.medicine.form}
                      </p>
                      <div className="text-xs font-bold text-slate-900">
                        ₹{(item.medicine.price_discounted * item.quantity).toFixed(2)}
                        {item.medicine.price_mrp > item.medicine.price_discounted && (
                          <span className="ml-1 text-[11px] text-slate-400 line-through font-normal">
                            ₹{(item.medicine.price_mrp * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.medicine.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                      >
                        −
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.medicine.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear Cart link */}
                <div className="text-right">
                  <button
                    onClick={onClearCart}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bill Breakdown & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (e.g. AMARA25)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs uppercase font-semibold outline-none focus:border-teal-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
                >
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded flex justify-between">
                  <span>Code <strong>{appliedCoupon}</strong> applied!</span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="font-bold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600">{couponError}</p>
              )}

              {/* Bill Details */}
              <div className="bg-slate-50 p-3 rounded-xl space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Item Total (MRP)</span>
                  <span>₹{totalMrp.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Price Discount</span>
                  <span>− ₹{productDiscount.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span>− ₹{couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Safety</span>
                  <span>₹{packagingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-slate-900 text-sm">
                  <span>Total Amount Payable</span>
                  <span className="text-teal-700">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>(₹{finalTotal.toFixed(2)})</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
