// Client API Service for ZOVORO Atelier Commerce Backend

export interface ServerProduct {
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
  colors: { name: string; hex: string }[];
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
  stockCount: number;
}

export interface ServerReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface ServerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Processing' | 'Atelier Quality Inspection' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    title: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    image: string;
  }[];
  pricing: {
    subtotal: number;
    discountAmount: number;
    discountCode?: string;
    shipping: number;
    shippingMethod: 'standard' | 'express';
    tax: number;
    total: number;
  };
  payment: {
    lastFour: string;
    method: 'card' | 'apple_pay' | 'google_pay' | 'shop_pay';
  };
}

export const api = {
  // Products
  async getProducts(params?: {
    category?: string;
    sort?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
  }): Promise<ServerProduct[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.set('category', params.category);
    if (params?.sort) query.set('sort', params.sort);
    if (params?.search) query.set('search', params.search);
    if (params?.minPrice !== undefined) query.set('minPrice', String(params.minPrice));
    if (params?.maxPrice !== undefined) query.set('maxPrice', String(params.maxPrice));
    if (params?.size) query.set('size', params.size);

    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.data;
  },

  async getProduct(id: string): Promise<ServerProduct> {
    const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Garment not found');
    const json = await res.json();
    return json.data;
  },

  // Reviews
  async getReviews(productId: string): Promise<ServerReview[]> {
    const res = await fetch(`/api/products/${encodeURIComponent(productId)}/reviews`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  },

  async submitReview(
    productId: string,
    review: { author: string; rating: number; title: string; comment: string }
  ): Promise<ServerReview> {
    const res = await fetch(`/api/products/${encodeURIComponent(productId)}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit review');
    }
    const json = await res.json();
    return json.data;
  },

  // Promo
  async validatePromo(code: string): Promise<{
    valid: boolean;
    code: string;
    discountRate: number;
    type: string;
    message: string;
  }> {
    const res = await fetch('/api/promo/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const json = await res.json();
    if (!res.ok) {
      return { valid: false, code, discountRate: 0, type: '', message: json.message || 'Invalid code' };
    }
    return json;
  },

  // Cart quote
  async validateCart(data: {
    items: Array<{ productId: string; title: string; price: number; quantity: number; color: string; size: string }>;
    discountCode?: string;
    shippingMethod?: 'standard' | 'express';
  }) {
    const res = await fetch('/api/cart/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Orders
  async createOrder(orderData: {
    customer: ServerOrder['customer'];
    items: ServerOrder['items'];
    pricing: ServerOrder['pricing'];
    payment: ServerOrder['payment'];
  }): Promise<ServerOrder> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Checkout authorization failed');
    }
    const json = await res.json();
    return json.data;
  },

  async lookupOrder(reference: string): Promise<ServerOrder> {
    const res = await fetch(`/api/orders/${encodeURIComponent(reference)}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Order record not found');
    }
    const json = await res.json();
    return json.data;
  },

  async getRecentOrders(): Promise<ServerOrder[]> {
    const res = await fetch('/api/orders');
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  },

  // Newsletter
  async subscribeNewsletter(email: string, source = 'footer'): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    return res.json();
  },

  // Stylist AI
  async getStylistAdvice(question: string, productId?: string): Promise<{ advice: string; source: string }> {
    const res = await fetch('/api/stylist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, productId }),
    });
    if (!res.ok) throw new Error('Styling consultation unavailable');
    return res.json();
  },
};
