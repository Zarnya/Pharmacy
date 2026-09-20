'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 mt-16">
      {/* Upper Info Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-black text-lg">
              ✚
            </div>
            <span className="text-xl font-black text-white">
              Amara<span className="text-teal-400">Pharmacy</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Inspired by Tata 1mg and Apollo Pharmacy. Empowering patients with 100% genuine medicines, transparent active generic salt comparisons, and express 2-hour doorstep delivery.
          </p>
          <div className="text-[11px] text-slate-500">
            Licensed by Central Drugs Standard Control Organisation (CDSCO).
          </div>
        </div>

        {/* Col 2: Popular Medicine Searches */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-sm tracking-wide">Popular Medicines</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>Dolo 650 Tablet & Generics</li>
            <li>Augmentin 625 Duo Tablet</li>
            <li>Pan-D Capsule PR (Pantoprazole)</li>
            <li>Telma 40 (Telmisartan)</li>
            <li>Glycomet-GP 1 Tablet</li>
            <li>Montair-LC (Montelukast + Levocetirizine)</li>
            <li>Limcee Chewable Vitamin C 500mg</li>
          </ul>
        </div>

        {/* Col 3: Clinical & Health Services */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-sm tracking-wide">Healthcare Services</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>Instant Prescription Verification</li>
            <li>Generic Bioequivalence Search</li>
            <li>Doorstep Diagnostic Blood Tests</li>
            <li>24x7 Certified Doctor Teleconsult</li>
            <li>Chronic Disease Medication Refills</li>
            <li>Senior Citizen Care Program</li>
          </ul>
        </div>

        {/* Col 4: Contact & Emergency */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-sm tracking-wide">Customer Support</h4>
          <p className="text-slate-400">
            Have questions about your prescription or generic substitution?
          </p>
          <div className="bg-slate-800/80 p-3 rounded-xl space-y-1 border border-slate-700">
            <span className="text-teal-400 font-bold block text-sm">
              📞 1800-262-7200 (Toll Free)
            </span>
            <span className="text-[11px] text-slate-400 block">
              support@amarapharmacy.com
            </span>
            <span className="text-[10px] text-slate-500 block">
              Available 24 hours • 7 days a week
            </span>
          </div>
        </div>
      </div>

      {/* Medical Legal Disclaimer */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto space-y-2 text-[11px] text-slate-500 text-center md:text-left">
          <p>
            <strong>Disclaimer:</strong> Amara Pharmacy dispenses prescription medicines strictly against a valid doctor&apos;s prescription in compliance with the Drugs and Cosmetics Act and CDSCO regulations. The Alternative Generic Substitute Engine identifies bioequivalent medicines containing identical active pharmaceutical salts and strengths; however, consult your physician before altering any chronic medication regimen.
          </p>
          <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-2 text-slate-600">
            <span>© 2026 Amara Healthcare Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Editorial Guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
