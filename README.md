# Amara Pharmacy (अमारा फ़ार्मेसी)
*A modern, user-friendly e-pharmacy platform inspired by Tata 1mg & Apollo Pharmacy*

---

## Overview

**Amara Pharmacy** is a full-featured medical e-commerce platform built with **Next.js 14**, **Tailwind CSS**, **Node.js (Express) with TypeScript**, and **PostgreSQL**. 

It features an intelligent **Alternative Generic Substitute Engine** that transparently pairs branded medicines with bioequivalent generic alternatives sharing the exact same active chemical salts and strengths, saving patients up to 60% on their prescriptions.

---

## Key Features

1. **Brand & Generic Search**: Instant autocomplete search bar capable of indexing both commercial brand names (*Dolo 650, Augmentin 625 Duo, Telma 40*) and generic active chemical salts (*Paracetamol, Amoxicillin, Clavulanic Acid, Telmisartan*).
2. **Alternative Substitute Engine**: Modal and in-page engine that validates identical dosage forms, matching salt counts, and matching strengths, calculating ₹ and % savings with instant "Switch & Save" capability.
3. **Multi-Therapeutic Catalog**: 25+ authentic Indian medicines across 8 key therapeutic categories:
   - Fever & Pain Relief (Paracetamol 650mg: Dolo, Crocin, Calpol, Paracip)
   - Antibiotics & Infections (Augmentin 625 Duo, Moxikind-CV 625, Clavam 625)
   - Gastric & Digestion (Pan-D, Pantocid-D, Pantakind-D)
   - Blood Pressure & Cardiology (Telma 40, Telmikind 40, Telsartan 40)
   - Diabetes Care (Glycomet-GP 1, Gluconorm-G 1, Glimestar-M 1)
   - Respiratory & Allergy (Montair-LC, Montek-LC, Telekast-L)
   - Vitamins & Nutrition (Limcee Plus, Celin 500, Amara Daily Vitamin C)
   - Bone & Joint Care (Shelcal 500, Cipcal 500, Calcimax 500)
4. **Prescription Management (Upload Rx)**:
   - Full upload modal supporting photos/PDFs with drag-and-drop preview.
   - Prescription verification guide (Doctor registration, date, dosage).
   - "Suggest Cheaper Generic Substitutes" opt-in checkbox.
5. **Interactive Slide-over Cart Drawer**:
   - Live quantity increment/decrement controls.
   - Rx warning badge when prescription medicines are in cart.
   - Promo coupon code applicator (Try `AMARA25` for 25% off!).
   - Detailed bill summary (MRP total, discounts, free delivery threshold, packaging fee).
6. **Express Checkout Flow**:
   - Delivery address collection with 2-hour delivery estimate.
   - Payment method selection (Cash on Delivery, UPI / QR, Cards).
   - Instant order confirmation with simulated Order Tracking ID (`AMR-XXXXXX`).

---

## Live Development Servers

- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
  - Catalog: `GET /api/medicines`
  - Categories: `GET /api/categories`
  - Search: `GET /api/search?q=augmentin`
  - Substitutes: `GET /api/medicines/m5-augmentin-625/substitutes`
