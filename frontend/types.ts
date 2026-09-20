export interface SaltComposition {
  salt_name: string;
  strength: string;
}

export interface Medicine {
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
  match_type?: 'brand' | 'salt';
}

export interface SubstituteMedicine extends Medicine {
  savings_amount: number;
  savings_percentage: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}
