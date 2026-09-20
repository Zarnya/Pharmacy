import { MedicineSearchResult, SubstituteMedicine } from './types';

export interface SeedMedicine {
  id: string;
  brand_name: string;
  slug: string;
  manufacturer: string;
  category: string;
  form: string;
  package_size: string;
  price_mrp: number;
  price_discounted: number;
  rating: number;
  reviews_count: number;
  requires_prescription: boolean;
  image_url: string | null;
  compositions: { salt_name: string; strength: string }[];
}

export const SEED_MEDICINES: SeedMedicine[] = [
  // --------------------------------------------------------------------------
  // 1. FEVER & PAIN RELIEF (Paracetamol 650mg)
  // --------------------------------------------------------------------------
  {
    id: 'm1-dolo-650',
    brand_name: 'Dolo 650 Tablet',
    slug: 'dolo-650-tablet',
    manufacturer: 'Micro Labs Ltd',
    category: 'Fever & Pain Relief',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 34.00,
    price_discounted: 30.60,
    rating: 4.8,
    reviews_count: 14200,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [{ salt_name: 'Paracetamol', strength: '650 mg' }],
  },
  {
    id: 'm2-crocin-650',
    brand_name: 'Crocin 650 Advance',
    slug: 'crocin-650-advance',
    manufacturer: 'GSK Consumer Healthcare',
    category: 'Fever & Pain Relief',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 35.50,
    price_discounted: 33.72,
    rating: 4.7,
    reviews_count: 8900,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [{ salt_name: 'Paracetamol', strength: '650 mg' }],
  },
  {
    id: 'm3-calpol-650',
    brand_name: 'Calpol 650 Tablet',
    slug: 'calpol-650-tablet',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals',
    category: 'Fever & Pain Relief',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 32.00,
    price_discounted: 28.00,
    rating: 4.8,
    reviews_count: 6540,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [{ salt_name: 'Paracetamol', strength: '650 mg' }],
  },
  {
    id: 'm4-paracip-650',
    brand_name: 'Paracip 650 Tablet',
    slug: 'paracip-650-tablet',
    manufacturer: 'Cipla Ltd',
    category: 'Fever & Pain Relief',
    form: 'Tablet',
    package_size: '10 tablets in 1 strip',
    price_mrp: 22.00,
    price_discounted: 16.50,
    rating: 4.6,
    reviews_count: 3200,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [{ salt_name: 'Paracetamol', strength: '650 mg' }],
  },

  // --------------------------------------------------------------------------
  // 2. ANTIBIOTICS (Amoxicillin 500mg + Clavulanic Acid 125mg)
  // --------------------------------------------------------------------------
  {
    id: 'm5-augmentin-625',
    brand_name: 'Augmentin 625 Duo Tablet',
    slug: 'augmentin-625-duo-tablet',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals',
    category: 'Antibiotics & Infections',
    form: 'Tablet',
    package_size: '10 tablets in 1 strip',
    price_mrp: 223.50,
    price_discounted: 201.15,
    rating: 4.9,
    reviews_count: 18200,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Amoxicillin', strength: '500 mg' },
      { salt_name: 'Clavulanic Acid', strength: '125 mg' },
    ],
  },
  {
    id: 'm6-moxikind-cv-625',
    brand_name: 'Moxikind-CV 625 Tablet',
    slug: 'moxikind-cv-625-tablet',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Antibiotics & Infections',
    form: 'Tablet',
    package_size: '10 tablets in 1 strip',
    price_mrp: 178.00,
    price_discounted: 142.40,
    rating: 4.7,
    reviews_count: 9150,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Amoxicillin', strength: '500 mg' },
      { salt_name: 'Clavulanic Acid', strength: '125 mg' },
    ],
  },
  {
    id: 'm7-clavam-625',
    brand_name: 'Clavam 625 Tablet',
    slug: 'clavam-625-tablet',
    manufacturer: 'Alkem Laboratories Ltd',
    category: 'Antibiotics & Infections',
    form: 'Tablet',
    package_size: '10 tablets in 1 strip',
    price_mrp: 195.00,
    price_discounted: 156.00,
    rating: 4.8,
    reviews_count: 7300,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Amoxicillin', strength: '500 mg' },
      { salt_name: 'Clavulanic Acid', strength: '125 mg' },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. GASTRIC & ACID REFLUX (Pantoprazole 40mg + Domperidone 30mg)
  // --------------------------------------------------------------------------
  {
    id: 'm8-pan-d',
    brand_name: 'Pan-D Capsule PR',
    slug: 'pan-d-capsule-pr',
    manufacturer: 'Alkem Laboratories Ltd',
    category: 'Gastric & Digestion',
    form: 'Capsule',
    package_size: '15 capsules in 1 strip',
    price_mrp: 215.00,
    price_discounted: 193.50,
    rating: 4.8,
    reviews_count: 12400,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Pantoprazole', strength: '40 mg' },
      { salt_name: 'Domperidone', strength: '30 mg' },
    ],
  },
  {
    id: 'm9-pantocid-d',
    brand_name: 'Pantocid-D Capsule SR',
    slug: 'pantocid-d-capsule-sr',
    manufacturer: 'Sun Pharma Ltd',
    category: 'Gastric & Digestion',
    form: 'Capsule',
    package_size: '15 capsules in 1 strip',
    price_mrp: 205.00,
    price_discounted: 174.25,
    rating: 4.7,
    reviews_count: 5800,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Pantoprazole', strength: '40 mg' },
      { salt_name: 'Domperidone', strength: '30 mg' },
    ],
  },
  {
    id: 'm10-pantakind-d',
    brand_name: 'Pantakind-D Capsule',
    slug: 'pantakind-d-capsule',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Gastric & Digestion',
    form: 'Capsule',
    package_size: '10 capsules in 1 strip',
    price_mrp: 120.00,
    price_discounted: 96.00,
    rating: 4.6,
    reviews_count: 3900,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Pantoprazole', strength: '40 mg' },
      { salt_name: 'Domperidone', strength: '30 mg' },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. HYPERTENSION & BLOOD PRESSURE (Telmisartan 40mg)
  // --------------------------------------------------------------------------
  {
    id: 'm11-telma-40',
    brand_name: 'Telma 40 Tablet',
    slug: 'telma-40-tablet',
    manufacturer: 'Glenmark Pharmaceuticals',
    category: 'Blood Pressure & Heart',
    form: 'Tablet',
    package_size: '30 tablets in 1 strip',
    price_mrp: 258.00,
    price_discounted: 224.46,
    rating: 4.9,
    reviews_count: 15400,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [{ salt_name: 'Telmisartan', strength: '40 mg' }],
  },
  {
    id: 'm12-telmikind-40',
    brand_name: 'Telmikind 40 Tablet',
    slug: 'telmikind-40-tablet',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Blood Pressure & Heart',
    form: 'Tablet',
    package_size: '30 tablets in 1 strip',
    price_mrp: 165.00,
    price_discounted: 128.70,
    rating: 4.7,
    reviews_count: 6700,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [{ salt_name: 'Telmisartan', strength: '40 mg' }],
  },
  {
    id: 'm13-telsartan-40',
    brand_name: 'Telsartan 40 Tablet',
    slug: 'telsartan-40-tablet',
    manufacturer: "Dr. Reddy's Laboratories",
    category: 'Blood Pressure & Heart',
    form: 'Tablet',
    package_size: '30 tablets in 1 strip',
    price_mrp: 195.00,
    price_discounted: 156.00,
    rating: 4.8,
    reviews_count: 4200,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [{ salt_name: 'Telmisartan', strength: '40 mg' }],
  },

  // --------------------------------------------------------------------------
  // 5. DIABETES MANAGEMENT (Metformin 500mg + Glimepiride 1mg)
  // --------------------------------------------------------------------------
  {
    id: 'm14-glycomet-gp1',
    brand_name: 'Glycomet-GP 1 Tablet PR',
    slug: 'glycomet-gp-1-tablet-pr',
    manufacturer: 'USV Ltd',
    category: 'Diabetes Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 148.50,
    price_discounted: 129.20,
    rating: 4.8,
    reviews_count: 22000,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Metformin', strength: '500 mg' },
      { salt_name: 'Glimepiride', strength: '1 mg' },
    ],
  },
  {
    id: 'm15-gluconorm-g1',
    brand_name: 'Gluconorm-G 1 Tablet Forte',
    slug: 'gluconorm-g-1-tablet-forte',
    manufacturer: 'Lupin Ltd',
    category: 'Diabetes Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 135.00,
    price_discounted: 114.75,
    rating: 4.7,
    reviews_count: 8100,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Metformin', strength: '500 mg' },
      { salt_name: 'Glimepiride', strength: '1 mg' },
    ],
  },
  {
    id: 'm16-glimestar-m1',
    brand_name: 'Glimestar-M 1 Tablet PR',
    slug: 'glimestar-m-1-tablet-pr',
    manufacturer: 'Mankind Pharma Ltd',
    category: 'Diabetes Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 95.00,
    price_discounted: 76.00,
    rating: 4.6,
    reviews_count: 5300,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Metformin', strength: '500 mg' },
      { salt_name: 'Glimepiride', strength: '1 mg' },
    ],
  },

  // --------------------------------------------------------------------------
  // 6. ALLERGY & COUGH (Montelukast 10mg + Levocetirizine 5mg)
  // --------------------------------------------------------------------------
  {
    id: 'm17-montair-lc',
    brand_name: 'Montair-LC Tablet',
    slug: 'montair-lc-tablet',
    manufacturer: 'Cipla Ltd',
    category: 'Respiratory & Allergy',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 320.00,
    price_discounted: 288.00,
    rating: 4.8,
    reviews_count: 11200,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Montelukast', strength: '10 mg' },
      { salt_name: 'Levocetirizine', strength: '5 mg' },
    ],
  },
  {
    id: 'm18-montek-lc',
    brand_name: 'Montek-LC Tablet',
    slug: 'montek-lc-tablet',
    manufacturer: 'Sun Pharma Ltd',
    category: 'Respiratory & Allergy',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 298.00,
    price_discounted: 247.34,
    rating: 4.7,
    reviews_count: 6400,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Montelukast', strength: '10 mg' },
      { salt_name: 'Levocetirizine', strength: '5 mg' },
    ],
  },
  {
    id: 'm19-telekast-l',
    brand_name: 'Telekast-L Tablet',
    slug: 'telekast-l-tablet',
    manufacturer: 'Lupin Ltd',
    category: 'Respiratory & Allergy',
    form: 'Tablet',
    package_size: '15 tablets in 1 strip',
    price_mrp: 245.00,
    price_discounted: 196.00,
    rating: 4.6,
    reviews_count: 4100,
    requires_prescription: true,
    image_url: 'https://images.unsplash.com/photo-1550572017-ed200f5e6343?w=300&q=80',
    compositions: [
      { salt_name: 'Montelukast', strength: '10 mg' },
      { salt_name: 'Levocetirizine', strength: '5 mg' },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. VITAMINS & IMMUNITY (Vitamin C 500mg + Zinc 5mg) - OTC
  // --------------------------------------------------------------------------
  {
    id: 'm20-limcee-plus',
    brand_name: 'Limcee Plus Orange Chewable Tablet',
    slug: 'limcee-plus-chewable-tablet',
    manufacturer: 'Abbott Healthcare',
    category: 'Vitamins & Nutrition',
    form: 'Tablet',
    package_size: '15 chewable tablets in 1 strip',
    price_mrp: 110.00,
    price_discounted: 99.00,
    rating: 4.9,
    reviews_count: 31000,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Vitamin C (Ascorbic Acid)', strength: '500 mg' },
      { salt_name: 'Zinc', strength: '5 mg' },
    ],
  },
  {
    id: 'm21-celin-zinc',
    brand_name: 'Celin 500 + Zinc Tablet',
    slug: 'celin-500-zinc-tablet',
    manufacturer: 'Koye Pharmaceuticals',
    category: 'Vitamins & Nutrition',
    form: 'Tablet',
    package_size: '15 chewable tablets in 1 strip',
    price_mrp: 95.00,
    price_discounted: 80.75,
    rating: 4.7,
    reviews_count: 9800,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Vitamin C (Ascorbic Acid)', strength: '500 mg' },
      { salt_name: 'Zinc', strength: '5 mg' },
    ],
  },
  {
    id: 'm22-amara-vitc',
    brand_name: 'Amara Daily Vitamin C + Zinc',
    slug: 'amara-daily-vit-c-zinc',
    manufacturer: 'Amara Healthcare Naturals',
    category: 'Vitamins & Nutrition',
    form: 'Tablet',
    package_size: '15 chewable tablets in 1 strip',
    price_mrp: 75.00,
    price_discounted: 52.50,
    rating: 4.9,
    reviews_count: 4200,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&q=80',
    compositions: [
      { salt_name: 'Vitamin C (Ascorbic Acid)', strength: '500 mg' },
      { salt_name: 'Zinc', strength: '5 mg' },
    ],
  },

  // --------------------------------------------------------------------------
  // 8. BONE HEALTH & CALCIUM (Calcium 500mg + Vitamin D3 250 IU)
  // --------------------------------------------------------------------------
  {
    id: 'm23-shelcal-500',
    brand_name: 'Shelcal 500 Tablet',
    slug: 'shelcal-500-tablet',
    manufacturer: 'Torrent Pharmaceuticals',
    category: 'Bone & Joint Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 bottle',
    price_mrp: 142.00,
    price_discounted: 127.80,
    rating: 4.8,
    reviews_count: 19800,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Calcium', strength: '500 mg' },
      { salt_name: 'Vitamin D3 (Cholecalciferol)', strength: '250 IU' },
    ],
  },
  {
    id: 'm24-cipcal-500',
    brand_name: 'Cipcal 500 Tablet',
    slug: 'cipcal-500-tablet',
    manufacturer: 'Cipla Ltd',
    category: 'Bone & Joint Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 bottle',
    price_mrp: 125.00,
    price_discounted: 105.00,
    rating: 4.7,
    reviews_count: 7200,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Calcium', strength: '500 mg' },
      { salt_name: 'Vitamin D3 (Cholecalciferol)', strength: '250 IU' },
    ],
  },
  {
    id: 'm25-calcimax-500',
    brand_name: 'Calcimax 500 Tablet',
    slug: 'calcimax-500-tablet',
    manufacturer: 'Meyer Organics',
    category: 'Bone & Joint Care',
    form: 'Tablet',
    package_size: '15 tablets in 1 bottle',
    price_mrp: 110.00,
    price_discounted: 88.00,
    rating: 4.6,
    reviews_count: 3600,
    requires_prescription: false,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
    compositions: [
      { salt_name: 'Calcium', strength: '500 mg' },
      { salt_name: 'Vitamin D3 (Cholecalciferol)', strength: '250 IU' },
    ],
  },
];

export function searchMockMedicines(query: string, category?: string): MedicineSearchResult[] {
  const q = query.toLowerCase();
  let matched = SEED_MEDICINES;

  if (category && category !== 'All') {
    matched = matched.filter((m) => m.category.toLowerCase() === category.toLowerCase());
  }

  if (q) {
    matched = matched.filter((m) => {
      const brandMatch = m.brand_name.toLowerCase().includes(q);
      const saltMatch = m.compositions.some((c) => c.salt_name.toLowerCase().includes(q));
      const catMatch = m.category.toLowerCase().includes(q);
      return brandMatch || saltMatch || catMatch;
    });
  }

  return matched.map((m) => {
    const brandMatch = m.brand_name.toLowerCase().includes(q);
    return {
      ...m,
      match_type: brandMatch ? 'brand' : 'salt',
    };
  });
}

export function findMockSubstitutes(medicineId: string): SubstituteMedicine[] {
  const target = SEED_MEDICINES.find((m) => m.id === medicineId);
  if (!target) return [];

  // Match same form, exact same compositions
  const targetComps = [...target.compositions].sort((a, b) => a.salt_name.localeCompare(b.salt_name));

  const substitutes = SEED_MEDICINES.filter((m) => {
    if (m.id === target.id) return false;
    if (m.form !== target.form) return false;
    if (m.compositions.length !== targetComps.length) return false;

    const candidateComps = [...m.compositions].sort((a, b) => a.salt_name.localeCompare(b.salt_name));
    return targetComps.every((tc, idx) => {
      const cc = candidateComps[idx];
      return cc && cc.salt_name === tc.salt_name && cc.strength === tc.strength;
    });
  });

  return substitutes
    .map((s) => {
      const savings_amount = Number((target.price_discounted - s.price_discounted).toFixed(2));
      const savings_percentage = Number(
        (((target.price_discounted - s.price_discounted) / target.price_discounted) * 100).toFixed(1)
      );
      return {
        ...s,
        savings_amount,
        savings_percentage,
      };
    })
    .sort((a, b) => a.price_discounted - b.price_discounted);
}
