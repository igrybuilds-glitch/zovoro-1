import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, selectProduct } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const quickTags = ['Oversized Tee', 'Wool Coat', 'Silk Blouse', 'Tote', 'Trouser', 'Shades'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-full items-start justify-center pt-16 px-4 pb-10">
        <div className="relative w-full max-w-2xl bg-[#fdf8f8] shadow-2xl p-6 border border-[#e5e2e1]">
          {/* Search Input Bar */}
          <div className="relative flex items-center border-b border-black pb-3">
            <Search className="w-5 h-5 text-black mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections, garments, or materials..."
              className="w-full text-base font-sans bg-transparent focus:outline-hidden text-black placeholder:text-[#767676]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#767676] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 text-xs font-semibold uppercase tracking-wider text-[#5e5e5e] hover:text-black"
            >
              ESC
            </button>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
            <span className="text-xs text-[#767676] uppercase tracking-wider font-medium">
              Popular:
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 text-xs bg-[#f1edec] hover:bg-black hover:text-white text-black transition-colors rounded-xs"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold tracking-widest text-[#767676] uppercase mb-3">
              {query ? `Results (${filtered.length})` : 'Featured Pieces'}
            </h4>

            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#5e5e5e]">
                No items match "{query}". Try checking the spelling or searching for a category.
              </div>
            ) : (
              <div className="divide-y divide-[#e5e2e1]">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      selectProduct(item.id);
                    }}
                    className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-black/5 px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images.primary}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover bg-[#ebe7e6] border border-[#e5e2e1]"
                      />
                      <div>
                        <h5 className="font-sans text-sm font-semibold text-black group-hover:underline">
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#5e5e5e]">{item.subtitle} • {item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-black">
                        ${item.price.toFixed(2)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
