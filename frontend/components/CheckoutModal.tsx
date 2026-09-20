'use client';

import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('Rahul Sharma');
  const [address, setAddress] = useState('Flat 402, Green Glen Heights, Sector 14');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110001');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalPayable = cartItems.reduce(
    (sum, item) => sum + item.medicine.price_discounted * item.quantity,
    0
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'AMR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <h2 className="font-bold text-base md:text-lg text-white">
              Fast Express Checkout
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {orderPlaced ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                ✓
              </div>
              <h3 className="font-bold text-slate-900 text-xl">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your order <strong>#{orderId}</strong> has been received and is being dispatched by Amara Express Delivery.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 max-w-sm mx-auto space-y-1 text-left">
                <div><strong>Recipient:</strong> {name}</div>
                <div><strong>Delivery To:</strong> {address}, {city} - {pincode}</div>
                <div><strong>Payment:</strong> {paymentMethod.toUpperCase()} (₹{totalPayable.toFixed(2)})</div>
                <div><strong>Estimated Arrival:</strong> Today, within 2 hours</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 block">Total Items: {cartItems.length}</span>
                  <span className="font-black text-slate-900 text-sm">
                    Amount to Pay: ₹{totalPayable.toFixed(2)}
                  </span>
                </div>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ⚡ 2-Hr Delivery
                </span>
              </div>

              {/* Delivery Address Fields */}
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition ${
                      paymentMethod === 'cod'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    💵 Cash on Del.
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition ${
                      paymentMethod === 'upi'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    📱 UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition ${
                      paymentMethod === 'card'
                        ? 'border-teal-600 bg-teal-50 text-teal-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    💳 Card / NetB.
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Place Order (₹{totalPayable.toFixed(2)})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
