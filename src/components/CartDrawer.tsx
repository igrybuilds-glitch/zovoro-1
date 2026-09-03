import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Lock, ArrowRight, Tag, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItemsCount,
    freeShippingThreshold,
    shippingCost,
    discountCode,
    discountAmount,
    applyDiscount,
    total,
    setActiveTab,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyDiscount(inputCode);
    if (res.success) {
      setPromoMessage({ text: res.message, error: false });
      setInputCode('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdf8f8] shadow-2xl flex flex-col border-l border-[#e5e2e1]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#e5e2e1] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-semibold tracking-wider text-black uppercase">
                Your Bag
              </h2>
              <span className="font-mono text-xs text-[#767676]">
                ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              id="close-cart-btn"
              onClick={closeCart}
              className="p-1.5 text-[#5e5e5e] hover:text-black hover:bg-black/5 rounded-full transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#f7f3f2] border-b border-[#e5e2e1]">
            <div className="flex justify-between text-xs text-[#1c1b1b] mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-semibold text-black">${remainingForFreeShipping.toFixed(2)}</strong> more for free worldwide shipping
                </span>
              ) : (
                <span className="font-medium text-black flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-black" /> You've unlocked Complimentary Express Shipping
                </span>
              )}
            </div>
            <div className="w-full bg-[#e5e2e1] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#e5e2e1]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#f1edec] flex items-center justify-center mb-4 text-[#767676]">
                  <X className="w-8 h-8" />
                </div>
                <p className="font-display text-lg text-black mb-1">Your bag is currently empty</p>
                <p className="text-xs text-[#5e5e5e] max-w-xs mb-6">
                  Discover our new arrivals and timeless silhouettes crafted from premium materials.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    setActiveTab('new-arrivals');
                  }}
                  className="px-6 py-2.5 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#ebe7e6] shrink-0 border border-[#e5e2e1] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-sans text-sm font-semibold text-black leading-snug">
                          {item.title}
                        </h3>
                        <span className="font-mono text-sm font-semibold text-black whitespace-nowrap">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-[#767676] mt-0.5">
                        {item.color} / Size: {item.size}
                      </p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-[#c4c7c7] bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-neutral-100 text-[#1c1b1b] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 font-mono text-xs font-semibold text-black min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 hover:bg-neutral-100 text-[#1c1b1b] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#767676] hover:text-black p-1 transition-colors"
                        aria-label="Remove item"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#e5e2e1] space-y-4">
              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (try ZOVORO10)"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-[#e5e2e1] focus:border-black focus:outline-hidden uppercase font-mono placeholder:normal-case placeholder:font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f1edec] hover:bg-black hover:text-white text-xs font-semibold tracking-wider text-black uppercase transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-xs ${
                    promoMessage.error ? 'text-red-600' : 'text-emerald-700 font-medium'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {discountCode && (
                <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 border border-emerald-200">
                  <span>Promo ({discountCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs text-[#5e5e5e] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-black font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-mono text-black">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black font-semibold pt-2 border-t border-[#e5e2e1]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  id="cart-checkout-cta"
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-6 bg-black hover:bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                >
                  <Lock className="w-3.5 h-3.5 text-white/80" />
                  <span>Proceed to Checkout</span>
                  <span className="opacity-70">|</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-2 text-center text-xs font-medium text-[#767676] hover:text-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
