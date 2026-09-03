import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Heart, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  offset?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, offset }) => {
  const { selectProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || product.subtitle);
  const [isAddedQuick, setIsAddedQuick] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const secondaryImage = product.images.secondary || product.images.detail || product.images.primary;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, activeColor, product.sizes[0] || 'One Size', 1);
    setIsAddedQuick(true);
    setTimeout(() => setIsAddedQuick(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => selectProduct(product.id)}
      className={`group cursor-pointer flex flex-col relative transition-all duration-300 ${
        offset ? 'sm:mt-10 lg:mt-16' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ebe7e6] border border-[#e5e2e1]/80 group-hover:border-black/30 transition-colors">
        {/* Primary Image */}
        <img
          src={product.images.primary}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary Image cross-fade on hover */}
        {secondaryImage && secondaryImage !== product.images.primary && (
          <img
            src={secondaryImage}
            alt={`${product.title} alternate angle`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-[#111111]/90 text-white backdrop-blur-sm text-[10px] tracking-[0.18em] font-medium px-2 py-0.5 uppercase">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#fdf8f8]/80 backdrop-blur-sm hover:bg-white text-black transition-all hover:scale-110 shadow-xs"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-black stroke-black' : 'stroke-black'
            }`}
          />
        </button>

        {/* Quick Add Bar on Desktop Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-white/95 hover:bg-white text-black text-xs font-semibold tracking-wider uppercase backdrop-blur-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            {isAddedQuick ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3.5 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-sm font-medium text-[#1c1b1b] group-hover:text-black transition-colors leading-tight">
            {product.title}
          </h3>
          <span className="font-sans text-sm font-semibold text-black tracking-tight whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="font-sans text-xs text-[#5e5e5e]">{product.subtitle}</p>

        {/* Color Swatches preview */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mt-1.5 pt-0.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(c.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeColor === c.name
                    ? 'ring-1 ring-offset-1 ring-black border-black/40 scale-110'
                    : 'border-black/20 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
