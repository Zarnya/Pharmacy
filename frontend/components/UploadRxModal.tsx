'use client';

import React, { useState } from 'react';

interface UploadRxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadRxModal: React.FC<UploadRxModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [optForGenerics, setOptForGenerics] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFile(null);
    setPhoneNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">℞</span>
            <div>
              <h2 className="font-bold text-base md:text-lg text-white">
                Upload Valid Prescription
              </h2>
              <p className="text-[11px] text-teal-200">
                Amara certified pharmacists will verify & prepare your cart
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                ✓
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                Prescription Received!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our registered pharmacist will call you at <strong>{phoneNumber || '+91 98765 43210'}</strong> within 10 minutes to verify your medicines {optForGenerics ? 'and suggest cheaper generic substitutes.' : '.'}
              </p>
              <div className="pt-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Drop Area */}
              <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-5 text-center bg-slate-50 transition cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-1.5">
                  <div className="text-3xl">📄</div>
                  <div className="text-xs font-bold text-slate-800">
                    {file ? file.name : 'Click or Drag prescription here to upload'}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Supports JPG, PNG, PDF up to 10MB
                  </p>
                </div>
              </div>

              {/* Prescription Guidelines */}
              <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-teal-900 block">Valid Prescription Guide:</span>
                <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-600">
                  <li>Doctor&apos;s name and clinic registration number</li>
                  <li>Patient name and date of consultation</li>
                  <li>Clear medicine dosage instructions</li>
                </ul>
              </div>

              {/* Generic Substitution Opt-in Checkbox (Hallmark feature!) */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optForGenerics}
                  onChange={(e) => setOptForGenerics(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    Suggest Cheaper Generic Substitutes (Recommended)
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Our pharmacist will recommend equivalent medicines with the same active salts to save you up to 60%.
                  </span>
                </div>
              </label>

              {/* Phone number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Phone Number (For Pharmacist Confirmation)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  pattern="[0-9]{10}"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Submit Prescription & Order
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
