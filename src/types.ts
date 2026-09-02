export type ScreenType =
  | 'home'
  | 'shop'
  | 'categories'
  | 'category_detail'
  | 'search_results'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'order_confirmation'
  | 'wishlist'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'reset_password'
  | 'account'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'shipping_returns'
  | 'not_found'
  | 'error_state';

export type AccountTab =
  | 'dashboard'
  | 'orders'
  | 'order_detail'
  | 'profile'
  | 'addresses'
  | 'payment_methods'
  | 'notifications'
  | 'settings';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Timepieces' | 'Audio & Acoustics' | 'Leather Goods' | 'Eyewear & Optics' | 'Fine Accessories' | 'Premium Living';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  badge?: {
    text: 'New' | 'Sale' | 'Bestseller' | 'Exclusive' | 'Limited';
    type: 'tertiary' | 'sale' | 'neutral' | 'gold';
  };
  description: string;
  specs: string[];
  colors?: ProductColor[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  discountPercent?: number;
  reviewsList: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export interface PaymentCard {
  id: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expMonth: string;
  expYear: string;
  holderName: string;
  isDefault: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  unread: boolean;
  type: 'order' | 'promo' | 'system';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: string;
  deliveryMethod: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isLoggedIn: boolean;
  memberTier: 'Premium' | 'VIP' | 'Collector' | 'Standard';
  joinedDate: string;
  addresses: Address[];
  paymentMethods: PaymentCard[];
  notifications: NotificationItem[];
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
