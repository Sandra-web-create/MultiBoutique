export type CameroonCity = 
  | 'Toutes les villes'
  | 'Douala'
  | 'Yaoundé'
  | 'Bafoussam'
  | 'Garoua'
  | 'Kribi'
  | 'Bamenda';

export type ProductCategory = 
  | 'Toutes les catégories'
  | 'High-Tech & Smartphones'
  | 'Mode & Wax Camerounais'
  | 'Maison & Décoration'
  | 'Terroir & Épicerie Fine'
  | 'Beauté & Soins Bio';

export interface Boutique {
  id: string;
  name: string;
  city: CameroonCity;
  quarter: string;
  rating: number;
  reviewsCount: number;
  category: ProductCategory;
  description: string;
  verified: boolean;
  deliveryTime: string;
  badge: string;
  avatarUrl: string;
  phone: string;
}

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number; // in FCFA
  originalPrice?: number;
  boutiqueId: string;
  boutiqueName: string;
  city: CameroonCity;
  quarter: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  description: string;
  specifications: Record<string, string>;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  city: CameroonCity;
  quarter: string;
  landmark: string;
  paymentMethod: 'momo' | 'orange_money' | 'cash_delivery';
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  status: 'preparation' | 'dispatched' | 'out_for_delivery' | 'delivered';
}
