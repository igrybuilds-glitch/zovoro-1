import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ViewTab, OrderConfirmation } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  toggleWishlistDrawer: () => void;
  
  subtotal: number;
  totalItemsCount: number;
  freeShippingThreshold: number;
  shippingCost: number;
  discountCode: string;
  discountRate: number;
  discountAmount: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  total: number;
  
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  selectedProductId: string;
  selectProduct: (id: string) => void;
  
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isOrderLookupOpen: boolean;
  setIsOrderLookupOpen: (open: boolean) => void;
  lookupInitialQuery: string;
  openOrderLookup: (query?: string) => void;

  isStylistOpen: boolean;
  setIsStylistOpen: (open: boolean) => void;
  stylistProduct: { id?: string; name?: string };
  openStylist: (id?: string, name?: string) => void;
  
  placedOrder: OrderConfirmation | null;
  setPlacedOrder: (order: OrderConfirmation | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial default items matching Screen 4
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'structured-wool-coat-Onyx-40R',
    productId: 'structured-wool-coat',
    title: 'Structured Wool Coat',
    price: 890,
    color: 'Onyx',
    size: '40R',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASXzwX9FjE_rvsxvAvwVhu3ydcoFZw4-EDlUowuL4oWFzfzhk1s6ek5_Wsz7O3CqaEZCSMYA0oBhT6ghgMcBBNy5uU2vg-Wgf5SOrKoJR-qbCxrw8W4Kd4Jq_kE01UbQ9xS9QCR8xdnrub5rcEbszIl0gqAM8Krd3YNavfOG8gaO3a9rk2sx6VGnBaCC3olxfwQXmN5-twThyE1xzLdmAyMNoIRbDpUxvAQOZT0bHZGBzU_ttDCSDr',
  },
  {
    id: 'poplin-collar-shirt-Bone White-M',
    productId: 'poplin-collar-shirt',
    title: 'Poplin Collar Shirt',
    price: 240,
    color: 'Bone White',
    size: 'M',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOBrXjKHIDp4lpxVD6zszesPg-xhImBrBrNS3qc3wJh8EweVS0UQGFRmEf1ikA8DmtyFAWAIt0Hysip1JA7EwYBlZ1xEl-2PgZu7xdv0sRMmoi-5HsNpdaL0GisGAKNXV5u8XPJaJf7aOWyefTUVGabVounJ3NJF07p9BDObI4-OZwDHLJcbzHiC9zXQy6YKUwKVh_Y73zQFIRbssrXaqd4QUlIeWTb_MAc0S0_t11RB6tX24lB17e',
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['architectural-shades', 'essential-oversized-tee']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('essential-oversized-tee');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [lookupInitialQuery, setLookupInitialQuery] = useState('');
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [stylistProduct, setStylistProduct] = useState<{ id?: string; name?: string }>({});

  const [placedOrder, setPlacedOrder] = useState<OrderConfirmation | null>(null);

  const openOrderLookup = (query = '') => {
    setLookupInitialQuery(query);
    setIsOrderLookupOpen(true);
  };

  const openStylist = (id?: string, name?: string) => {
    setStylistProduct({ id, name });
    setIsStylistOpen(true);
  };
  
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  const freeShippingThreshold = 150;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleWishlistDrawer = () => setIsWishlistOpen((prev) => !prev);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const selectProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    const itemInstanceId = `${product.id}-${color}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemInstanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemInstanceId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemInstanceId,
          productId: product.id,
          title: product.title,
          price: product.price,
          color: color || product.subtitle,
          size: size || (product.sizes[0] || 'One Size'),
          quantity,
          image: product.images.primary,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ZOVORO10') {
      setDiscountCode(clean);
      setDiscountRate(0.1);
      return { success: true, message: '10% discount applied to your order' };
    }
    if (clean === 'EDITORIAL20') {
      setDiscountCode(clean);
      setDiscountRate(0.2);
      return { success: true, message: '20% VIP promotion applied' };
    }
    return { success: false, message: 'Invalid promo code' };
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 25;
  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        toggleWishlistDrawer,
        subtotal,
        totalItemsCount,
        freeShippingThreshold,
        shippingCost,
        discountCode,
        discountRate,
        discountAmount,
        applyDiscount,
        total,
        activeTab,
        setActiveTab,
        selectedProductId,
        selectProduct,
        selectedCategory,
        setSelectedCategory,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSearchOpen,
        setIsSearchOpen,
        isOrderLookupOpen,
        setIsOrderLookupOpen,
        lookupInitialQuery,
        openOrderLookup,
        isStylistOpen,
        setIsStylistOpen,
        stylistProduct,
        openStylist,
        placedOrder,
        setPlacedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
