export type DeliveryType = 'fast' | 'normal';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFastDelivery: boolean;
  fastDeliveryTime: string; // e.g. "90 mins" or "Today by 6 PM"
  normalDeliveryTime: string; // e.g. "Tomorrow" or "2-3 Days"
  image: string;
  description: string;
  agriculturalUse: string;
  specifications: Record<string, string>;
  returnPolicy: string;
  tags: string[];
  unit: string; // e.g. "1 kg pack", "500 ml bottle", "50 kg bag"
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
  description: string;
  isAgri: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDelivery: DeliveryType;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  type: 'Home' | 'Farm / Khet' | 'Warehouse / Shop';
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  deliveryType: DeliveryType;
  total: number;
  status: 'Placed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  address: Address;
  estimatedDelivery: string;
  trackingSteps: {
    status: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface LoanScheme {
  id: string;
  title: string;
  provider: string;
  maxAmount: string;
  interestRate: string;
  tenure: string;
  subsidy: string;
  description: string;
  eligibility: string[];
  documentsRequired: string[];
  icon: string;
  tag: string;
}

export interface Coupon {
  code: string;
  discountAmount?: number;
  discountPercent?: number;
  minOrder: number;
  description: string;
  expiresIn: string;
}
