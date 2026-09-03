import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Check } from 'lucide-react';
import { api } from '../services/api';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, openOrderLookup, openStylist } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribing(true);
    try {
      await api.subscribeNewsletter(email.trim(), 'footer');
      setSubscribed(true);
      setEmail('');
    } catch {
      setSubscribed(true);
    } finally {
      setSubscribing(false);
    }
  };

  const navigateTo = (tab: 'home' | 'new-arrivals' | 'shop' | 'collections', category?: string) => {
    setActiveTab(tab);
    if (category) setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-[#f7f3f2] pt-16 pb-12 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl tracking-[0.25em] font-semibold text-white uppercase block">
              ZOVORO
            </span>
            <p className="text-xs text-[#a0a0a0] leading-relaxed max-w-sm">
              Redefining modern wardrobe essentials through structural precision, architectural cuts, and uncompromising material craft. Everyday silhouettes, elevated.
            </p>
            <div className="pt-2 text-[11px] text-[#767676] font-mono">
              PARIS • MILAN • TOKYO • NEW YORK
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-label-caps text-xs text-white tracking-[0.18em]">Collections</h4>
            <ul className="space-y-2 text-xs text-[#a0a0a0]">
              <li>
                <button
                  onClick={() => navigateTo('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Outerwear')}
                  className="hover:text-white transition-colors"
                >
                  Outerwear & Coats
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Tops')}
                  className="hover:text-white transition-colors"
                >
                  Heavy Tops & Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Trousers')}
                  className="hover:text-white transition-colors"
                >
                  Tailored Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', 'Bags')}
                  className="hover:text-white transition-colors"
                >
                  Architectural Bags
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-label-caps text-xs text-white tracking-[0.18em]">Client Care</h4>
            <ul className="space-y-2 text-xs text-[#a0a0a0]">
              <li>
                <button
                  type="button"
                  onClick={() => openOrderLookup()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Order & Archives
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openStylist()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Atelier Stylist Advisory
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Garment Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact Atelier
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-label-caps text-xs text-white tracking-[0.18em]">
              The Atelier Journal
            </h4>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Subscribe for private capsule previews, architectural lookbooks, and invitation-only seasonal drops.
            </p>
            {subscribed ? (
              <div className="p-3 bg-white/10 border border-white/20 text-xs text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-[#dec084]" />
                <span>Thank you. You have been registered to our private ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/5 border border-white/20 px-3 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-[#767676]">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#767676] gap-4">
          <div>
            © {new Date().getFullYear()} ZOVORO ATELIER LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
