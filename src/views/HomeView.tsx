import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, HERO_IMAGE } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab, setSelectedCategory, selectProduct } = useCart();

  // Featured 4 items matching Screen 1 showcase
  const featuredIds = [
    'structured-tote',
    'oversized-heavy-tee',
    'tailored-wide-trousers',
    'architectural-shades',
  ];

  const featuredProducts = featuredIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  const spotlightProduct = PRODUCTS.find((p) => p.id === 'essential-oversized-tee');

  return (
    <div className="w-full">
      {/* 1. Hero Section (Screen 1) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-[#ebe7e6] overflow-hidden border-b border-[#e5e2e1]">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="ZOVORO Editorial Autumn Winter Collection"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 flex flex-col items-center">
          <span className="font-label-caps text-xs tracking-[0.3em] uppercase mb-4 text-[#dec084] font-semibold">
            Autumn / Winter Capsule 04
          </span>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white uppercase leading-[1.1] mb-6 max-w-3xl">
            Everyday, But Different.
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            A collection of modern essentials crafted with structural precision, relaxed tailoring, and elevated materials designed for daily ritual.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              id="hero-shop-new-arrivals"
              onClick={() => {
                setActiveTab('new-arrivals');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-[#f1edec] transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              Shop New Arrivals
            </button>

            <button
              id="hero-explore-collection"
              onClick={() => {
                setActiveTab('collections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/80 text-xs font-semibold tracking-widest uppercase backdrop-blur-xs transition-all"
            >
              Explore Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* 2. New Arrivals Grid Section (Screen 1 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#e5e2e1] pb-6 gap-4">
          <div>
            <span className="font-label-caps text-xs text-[#767676] tracking-[0.2em] uppercase block mb-1">
              Curated Selection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-black uppercase">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('new-arrivals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black hover:text-[#5e5e5e] transition-colors"
          >
            <span>View All Pieces ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetrical 4-Product Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              offset={index % 2 === 1} // Asymmetrical stagger from design
            />
          ))}
        </div>
      </section>

      {/* 3. PDP Spotlight Teaser (Screen 3 Showcase) */}
      {spotlightProduct && (
        <section className="bg-[#f7f3f2] border-y border-[#e5e2e1] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Image Preview */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] bg-[#ebe7e6] overflow-hidden">
                  <img
                    src={spotlightProduct.images.primary}
                    alt={spotlightProduct.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] bg-[#ebe7e6] overflow-hidden sm:mt-8">
                  <img
                    src={spotlightProduct.images.detail || spotlightProduct.images.primary}
                    alt={`${spotlightProduct.title} macro detail`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Story & PDP Entry */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-label-caps text-xs text-[#767676] tracking-[0.2em] uppercase">
                  Atelier Focus • {spotlightProduct.category}
                </span>

                <h3 className="font-display text-3xl sm:text-4xl text-black font-semibold uppercase leading-tight">
                  {spotlightProduct.title}
                </h3>

                <p className="font-sans text-sm text-[#5e5e5e] leading-relaxed">
                  {spotlightProduct.description} Engineered with a heavy 220gsm structure that holds its crisp silhouette through endless wears.
                </p>

                <div className="pt-2">
                  <div className="text-xl font-mono font-bold text-black mb-6">
                    ${spotlightProduct.price.toFixed(2)} USD
                  </div>

                  <button
                    onClick={() => selectProduct(spotlightProduct.id)}
                    className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-widest uppercase flex items-center gap-3 transition-colors shadow-md"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Atelier Pillars & Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e2e1]">
          <div className="flex flex-col items-center text-center p-4">
            <Truck className="w-6 h-6 text-black stroke-[1.5] mb-3" />
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black mb-1">
              Complimentary Express Shipping
            </h4>
            <p className="text-xs text-[#767676] max-w-xs">
              Direct express delivery on all orders over $150 with protective garment packaging.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <ShieldCheck className="w-6 h-6 text-black stroke-[1.5] mb-3" />
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black mb-1">
              Uncompromising Materials
            </h4>
            <p className="text-xs text-[#767676] max-w-xs">
              Sourced directly from certified organic mills and heritage Italian tanneries.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <RefreshCw className="w-6 h-6 text-black stroke-[1.5] mb-3" />
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black mb-1">
              30-Day Effortless Returns
            </h4>
            <p className="text-xs text-[#767676] max-w-xs">
              Prepaid return labels included inside every delivery parcel.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <Sparkles className="w-6 h-6 text-black stroke-[1.5] mb-3" />
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-black mb-1">
              Architectural Craft
            </h4>
            <p className="text-xs text-[#767676] max-w-xs">
              Designed in limited seasonal runs to avoid overproduction and maintain exclusivity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
