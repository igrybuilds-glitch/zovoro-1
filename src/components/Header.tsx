import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Package, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    totalItemsCount,
    openCart,
    wishlist,
    toggleWishlistDrawer,
    setIsSearchOpen,
    setSelectedCategory,
    openOrderLookup,
    openStylist,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: 'home' | 'new-arrivals' | 'shop' | 'collections', category?: string) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdf8f8]/90 backdrop-blur-md border-b border-[#e5e2e1]/60 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#141414] text-[#f7f3f2] px-4 py-2 text-center text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <span>Complimentary express shipping on orders over $150</span>
        <span className="hidden sm:inline opacity-60">|</span>
        <span className="hidden sm:inline font-mono text-[11px] text-[#dec084]">Use Code: ZOVORO10</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-[#1c1b1b] hover:text-black transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Left Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            id="nav-link-shop"
            onClick={() => handleNav('shop', 'All')}
            className={`font-label-caps text-xs tracking-[0.14em] transition-colors relative py-1 ${
              activeTab === 'shop'
                ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black'
                : 'text-[#5e5e5e] hover:text-black'
            }`}
          >
            Shop
          </button>
          <button
            id="nav-link-new-arrivals"
            onClick={() => handleNav('new-arrivals')}
            className={`font-label-caps text-xs tracking-[0.14em] transition-colors relative py-1 ${
              activeTab === 'new-arrivals'
                ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black'
                : 'text-[#5e5e5e] hover:text-black'
            }`}
          >
            New Arrivals
          </button>
          <button
            id="nav-link-collections"
            onClick={() => handleNav('collections')}
            className={`font-label-caps text-xs tracking-[0.14em] transition-colors relative py-1 ${
              activeTab === 'collections'
                ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black'
                : 'text-[#5e5e5e] hover:text-black'
            }`}
          >
            Collections
          </button>
        </nav>

        {/* Center Brand Logo */}
        <div className="flex-1 lg:flex-initial text-center">
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="group inline-flex flex-col items-center"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-[0.25em] font-semibold text-black uppercase select-none transition-transform group-hover:scale-[1.02]">
              ZOVORO
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[#767676] uppercase font-sans -mt-1 hidden sm:block">
              Atelier
            </span>
          </button>
        </div>

        {/* Right Utility Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Stylist Concierge Trigger */}
          <button
            id="stylist-trigger-btn"
            onClick={() => openStylist()}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#2c2b2b] hover:text-black transition-colors rounded-full hover:bg-black/5"
            aria-label="Atelier Stylist"
            title="Ask Atelier Stylist"
          >
            <Sparkles className="w-[15px] h-[15px] stroke-[1.6]" />
            <span className="font-label-caps text-[11px] uppercase tracking-wider hidden lg:inline">Stylist</span>
          </button>

          {/* Track Order Trigger */}
          <button
            id="track-order-trigger-btn"
            onClick={() => openOrderLookup()}
            className="p-2 text-[#2c2b2b] hover:text-black transition-colors rounded-full hover:bg-black/5"
            aria-label="Track Order & Archives"
            title="Track Order & Archives"
          >
            <Package className="w-[18px] h-[18px] stroke-[1.6]" />
          </button>

          {/* Search Trigger */}
          <button
            id="search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#2c2b2b] hover:text-black transition-colors rounded-full hover:bg-black/5"
            aria-label="Search catalog"
            title="Search"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.6]" />
          </button>

          {/* Wishlist Trigger */}
          <button
            id="wishlist-trigger-btn"
            onClick={toggleWishlistDrawer}
            className="p-2 text-[#2c2b2b] hover:text-black transition-colors relative rounded-full hover:bg-black/5"
            aria-label="View wishlist"
            title="Wishlist"
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.6]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#111111] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger */}
          <button
            id="cart-trigger-btn"
            onClick={openCart}
            className="p-2 text-[#1c1b1b] hover:text-black transition-colors relative flex items-center gap-1.5 group rounded-full hover:bg-black/5"
            aria-label="Open Shopping Bag"
          >
            <div className="relative">
              <ShoppingBag className="w-[19px] h-[19px] stroke-[1.6] group-hover:scale-105 transition-transform" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-mono text-xs font-semibold tracking-wider text-black ml-0.5">
              ({totalItemsCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slideout Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#fdf8f8] shadow-2xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#e5e2e1]">
                <span className="font-display text-xl tracking-[0.2em] font-semibold text-black uppercase">
                  ZOVORO
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-black hover:opacity-60"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                <button
                  onClick={() => handleNav('home')}
                  className="text-left font-display text-xl text-black hover:text-[#767676] transition-colors py-1 flex items-center justify-between"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
                <button
                  onClick={() => handleNav('new-arrivals')}
                  className="text-left font-display text-xl text-black hover:text-[#767676] transition-colors py-1 flex items-center justify-between"
                >
                  <span>New Arrivals</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
                <button
                  onClick={() => handleNav('shop', 'All')}
                  className="text-left font-display text-xl text-black hover:text-[#767676] transition-colors py-1 flex items-center justify-between"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
                <button
                  onClick={() => handleNav('shop', 'Outerwear')}
                  className="text-left font-sans text-sm text-[#5e5e5e] hover:text-black transition-colors pl-3 py-0.5"
                >
                  Outerwear & Coats
                </button>
                <button
                  onClick={() => handleNav('shop', 'Tops')}
                  className="text-left font-sans text-sm text-[#5e5e5e] hover:text-black transition-colors pl-3 py-0.5"
                >
                  Tops & Heavy Tees
                </button>
                <button
                  onClick={() => handleNav('shop', 'Trousers')}
                  className="text-left font-sans text-sm text-[#5e5e5e] hover:text-black transition-colors pl-3 py-0.5"
                >
                  Tailored Trousers
                </button>
                <button
                  onClick={() => handleNav('shop', 'Bags')}
                  className="text-left font-sans text-sm text-[#5e5e5e] hover:text-black transition-colors pl-3 py-0.5"
                >
                  Architectural Bags
                </button>
                <button
                  onClick={() => handleNav('shop', 'Accessories')}
                  className="text-left font-sans text-sm text-[#5e5e5e] hover:text-black transition-colors pl-3 py-0.5"
                >
                  Accessories & Shades
                </button>
                <button
                  onClick={() => handleNav('collections')}
                  className="text-left font-display text-xl text-black hover:text-[#767676] transition-colors py-1 flex items-center justify-between mt-2"
                >
                  <span>Lookbook & Journal</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              </nav>

              {/* Mobile Service Buttons */}
              <div className="pt-4 space-y-2 border-t border-[#e5e2e1]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openOrderLookup();
                  }}
                  className="w-full py-2.5 px-3 bg-white border border-[#c4c7c7] text-left text-xs font-mono uppercase tracking-wider text-black flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5" />
                    Track Order & Archives
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openStylist();
                  }}
                  className="w-full py-2.5 px-3 bg-white border border-[#c4c7c7] text-left text-xs font-mono uppercase tracking-wider text-black flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Atelier Stylist Advisory
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e5e2e1] text-xs text-[#767676] space-y-2">
              <p>Customer Care: atelier@zovoro.com</p>
              <p>Complimentary Global Shipping</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
