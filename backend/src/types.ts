export interface SaltComposition {
  salt_name: string;
  strength: string;
}

export interface MedicineSearchResult {
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
  compositions: SaltComposition[];
  match_type: 'brand' | 'salt';
}

export interface SubstituteMedicine {
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
  savings_amount: number;
  savings_percentage: number;
  requires_prescription: boolean;
  image_url: string | null;
  compositions: SaltComposition[];
}

export interface CartItem {
  id: string;
  medicine_id: string;
  brand_name: string;
  form: string;
  package_size: string;
  price_discounted: number;
  price_mrp: number;
  requires_prescription: boolean;
  quantity: number;
  compositions: SaltComposition[];
}
