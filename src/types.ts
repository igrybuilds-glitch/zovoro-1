export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: 'Outerwear' | 'Tops' | 'Trousers' | 'Bags' | 'Accessories' | 'Caps';
  images: {
    primary: string;
    secondary?: string;
    detail?: string;
    lifestyle?: string;
  };
  colors: ColorOption[];
  sizes: string[];
  description: string;
  details: string[];
  materialCare: {
    composition: string;
    instructions: string;
  };
  shippingInfo: string;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  asymmetricOffset?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id: `${productId}-${color}-${size}`
  productId: string;
  title: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country?: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiration: string;
  cvc: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
}

export type ViewTab = 'home' | 'new-arrivals' | 'shop' | 'collections' | 'product-detail' | 'checkout';
