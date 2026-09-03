import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    toggleWishlistDrawer,
    wishlist,
    toggleWishlist,
    addToCart,
    selectProduct,
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={toggleWishlistDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdf8f8] shadow-2xl flex flex-col border-l border-[#e5e2e1]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e5e2e1] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-black fill-black" />
              <h2 className="font-display text-lg font-semibold tracking-wider text-black uppercase">
                Saved Items ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={toggleWishlistDrawer}
              className="p-1.5 text-[#5e5e5e] hover:text-black hover:bg-black/5 rounded-full"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#e5e2e1]">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <Heart className="w-12 h-12 text-[#c4c7c7] stroke-[1] mb-3" />
                <p className="font-display text-lg text-black mb-1">Your wishlist is empty</p>
                <p className="text-xs text-[#5e5e5e] max-w-xs">
                  Save pieces you love by tapping the heart icon on any product card or detail page.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-4">
                  <div
                    onClick={() => {
                      toggleWishlistDrawer();
                      selectProduct(p.id);
                    }}
                    className="w-20 h-24 bg-[#ebe7e6] shrink-0 border border-[#e5e2e1] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={p.images.primary}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            toggleWishlistDrawer();
                            selectProduct(p.id);
                          }}
                          className="font-sans text-sm font-semibold text-black cursor-pointer hover:underline"
                        >
                          {p.title}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-black">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-[#767676]">{p.subtitle} • {p.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      <button
                        onClick={() => {
                          addToCart(p, p.colors[0]?.name || p.subtitle, p.sizes[0] || 'One Size', 1);
                        }}
                        className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-[#767676] hover:text-black p-1 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
