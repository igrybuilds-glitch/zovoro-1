import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react';

export const NewArrivalsView: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Outerwear', 'Tops', 'Trousers', 'Bags', 'Accessories', 'Caps'];
  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const colors = [
    { label: 'All', hex: '' },
    { label: 'Onyx', hex: '#111111' },
    { label: 'Alabaster', hex: '#F9F6F0' },
    { label: 'Charcoal', hex: '#424548' },
    { label: 'Stone', hex: '#C7BFB5' },
    { label: 'Espresso', hex: '#3B2F2F' },
  ];

  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $300', min: 100, max: 300 },
    { label: '$300 - $600', min: 300, max: 600 },
    { label: 'Over $600', min: 600, max: Infinity },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Size
      if (selectedSize !== 'All' && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Color
      if (selectedColor !== 'All') {
        const hasColor = p.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor && !p.subtitle.toLowerCase().includes(selectedColor.toLowerCase())) {
          return false;
        }
      }
      // Price
      if (selectedPriceRange !== 'All') {
        const range = priceRanges.find((r) => r.label === selectedPriceRange);
        if (range && (p.price < range.min || p.price > range.max)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedSize, selectedColor, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedPriceRange('All');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    selectedPriceRange !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header Banner */}
      <div className="border-b border-[#e5e2e1] pb-8 mb-10">
        <div className="flex items-center gap-2 text-xs text-[#767676] mb-3 uppercase tracking-wider font-mono">
          <span>Catalog</span>
          <span>/</span>
          <span className="text-black font-semibold">New Arrivals</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-black uppercase">
              New Arrivals
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#5e5e5e] mt-2 max-w-xl">
              Sculptural cuts, weighted natural fibers, and monochromatic palettes engineered for modern elevation.
            </p>
          </div>

          <span className="font-mono text-xs text-[#767676]">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      </div>

      {/* Control Bar: Mobile Filter Button & Desktop Sort */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#e5e2e1] mb-8">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden px-4 py-2 border border-[#c4c7c7] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 text-black bg-white"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters {hasActiveFilters && '• Active'}</span>
        </button>

        {/* Active Filter Chips */}
        <div className="hidden lg:flex flex-wrap items-center gap-2">
          {hasActiveFilters && (
            <>
              <span className="text-xs text-[#767676] font-medium mr-1">Active:</span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-2.5 py-1 bg-black text-white text-xs flex items-center gap-1.5"
                >
                  <span>{selectedCategory}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedSize !== 'All' && (
                <button
                  onClick={() => setSelectedSize('All')}
                  className="px-2.5 py-1 bg-black text-white text-xs flex items-center gap-1.5"
                >
                  <span>Size: {selectedSize}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedColor !== 'All' && (
                <button
                  onClick={() => setSelectedColor('All')}
                  className="px-2.5 py-1 bg-black text-white text-xs flex items-center gap-1.5"
                >
                  <span>Color: {selectedColor}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              {selectedPriceRange !== 'All' && (
                <button
                  onClick={() => setSelectedPriceRange('All')}
                  className="px-2.5 py-1 bg-black text-white text-xs flex items-center gap-1.5"
                >
                  <span>{selectedPriceRange}</span>
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#767676] hover:text-black underline ml-2"
              >
                Clear all
              </button>
            </>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-[#767676] uppercase tracking-wider hidden sm:inline">
            Sort by:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-[#c4c7c7] px-3.5 py-1.5 pr-8 text-xs font-medium text-black focus:outline-hidden focus:border-black cursor-pointer uppercase tracking-wider"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#767676] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
          {/* Categories */}
          <div>
            <h3 className="font-label-caps text-xs text-black tracking-[0.16em] mb-3">
              Categories
            </h3>
            <ul className="space-y-1.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'font-bold text-black'
                        : 'text-[#5e5e5e] hover:text-black'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Garments' : cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizes */}
          <div className="border-t border-[#e5e2e1] pt-6">
            <h3 className="font-label-caps text-xs text-black tracking-[0.16em] mb-3">
              Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-xs font-mono font-semibold border transition-all text-center ${
                    selectedSize === s
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#e5e2e1] hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="border-t border-[#e5e2e1] pt-6">
            <h3 className="font-label-caps text-xs text-black tracking-[0.16em] mb-3">
              Color Tone
            </h3>
            <div className="space-y-2">
              {colors.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedColor(c.label)}
                  className={`w-full flex items-center justify-between py-1 text-xs transition-colors ${
                    selectedColor === c.label ? 'font-bold text-black' : 'text-[#5e5e5e] hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {c.hex ? (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-dashed border-[#767676]" />
                    )}
                    <span>{c.label}</span>
                  </div>
                  {selectedColor === c.label && <Check className="w-3.5 h-3.5 text-black" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-[#e5e2e1] pt-6">
            <h3 className="font-label-caps text-xs text-black tracking-[0.16em] mb-3">
              Price Range
            </h3>
            <div className="space-y-1.5">
              {priceRanges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedPriceRange(r.label)}
                  className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                    selectedPriceRange === r.label
                      ? 'font-bold text-black'
                      : 'text-[#5e5e5e] hover:text-black'
                  }`}
                >
                  <span>{r.label}</span>
                  {selectedPriceRange === r.label && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#c4c7c7] p-8">
              <h3 className="font-display text-xl text-black mb-2">No garments found</h3>
              <p className="text-xs text-[#5e5e5e] mb-6">
                Try loosening your filters or explore other categories.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  offset={product.asymmetricOffset || index % 3 === 1}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slideout Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#fdf8f8] shadow-2xl p-6 flex flex-col justify-between z-50">
            <div className="overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2e1]">
                <h3 className="font-display text-lg font-semibold uppercase">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="py-4 border-b border-[#e5e2e1]">
                <h4 className="font-label-caps text-xs text-black mb-2">Category</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs border ${
                        selectedCategory === cat ? 'bg-black text-white border-black' : 'bg-white text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="py-4 border-b border-[#e5e2e1]">
                <h4 className="font-label-caps text-xs text-black mb-2">Size</h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 text-xs font-mono border ${
                        selectedSize === s ? 'bg-black text-white border-black' : 'bg-white text-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="py-4 border-b border-[#e5e2e1]">
                <h4 className="font-label-caps text-xs text-black mb-2">Color</h4>
                <div className="flex flex-wrap gap-1.5">
                  {colors.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setSelectedColor(c.label)}
                      className={`px-2.5 py-1 text-xs border ${
                        selectedColor === c.label ? 'bg-black text-white border-black' : 'bg-white text-black'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e5e2e1] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-[#c4c7c7] text-xs font-semibold uppercase"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-black text-white text-xs font-semibold uppercase"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
