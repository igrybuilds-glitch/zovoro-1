import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { api, ServerReview } from '../services/api';
import {
  Star,
  Plus,
  Minus,
  Heart,
  ChevronDown,
  ChevronUp,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveTab,
    setIsSizeGuideOpen,
    openStylist,
  } = useCart();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || product.subtitle);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reviews from backend
  const [reviews, setReviews] = useState<ServerReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  useEffect(() => {
    setSelectedColor(product.colors[0]?.name || product.subtitle);
    setSelectedSize(product.sizes[0] || 'One Size');
    setQuantity(1);

    // Fetch live reviews from backend
    setLoadingReviews(true);
    api.getReviews(product.id)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setLoadingReviews(false));
  }, [product]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingReview(true);
    try {
      const created = await api.submitReview(product.id, {
        author: newAuthor.trim() || 'Verified Client',
        rating: newRating,
        title: newTitle.trim() || 'Editorial Impression',
        comment: newComment.trim(),
      });
      setReviews((prev) => [created, ...prev]);
      setNewComment('');
      setNewTitle('');
      setShowReviewForm(false);
      setReviewSuccessMsg(true);
      setTimeout(() => setReviewSuccessMsg(false), 3000);
    } catch (err) {
      console.error('Review submit failed', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const isFavorited = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleAcc = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  // Complementary pieces for "COMPLETE THE LOOK"
  const complementaryIds = ['signature-canvas-cap', 'minimalist-chain', 'tailored-wide-trousers', 'architectural-shades'];
  const completeTheLookProducts = complementaryIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p) && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#767676] mb-8 uppercase tracking-wider font-mono">
        <button onClick={() => setActiveTab('home')} className="hover:text-black">
          Home
        </button>
        <span>/</span>
        <button onClick={() => setActiveTab('shop')} className="hover:text-black">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-black font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.title}
        </span>
      </nav>

      {/* Main Product Layout (Gallery + Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Stacked Editorial Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Primary View */}
          <div className="aspect-[3/4] w-full bg-[#ebe7e6] border border-[#e5e2e1] overflow-hidden relative group">
            <img
              src={product.images.primary}
              alt={`${product.title} primary view`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] tracking-[0.2em] font-medium px-2.5 py-1 uppercase">
                New Arrival
              </span>
            )}
          </div>

          {/* Macro Detail & Alternate Lifestyle Angles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.images.detail && (
              <div className="aspect-[3/4] bg-[#ebe7e6] border border-[#e5e2e1] overflow-hidden">
                <img
                  src={product.images.detail}
                  alt={`${product.title} texture detail`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {product.images.lifestyle && (
              <div className="aspect-[3/4] bg-[#ebe7e6] border border-[#e5e2e1] overflow-hidden">
                <img
                  src={product.images.lifestyle}
                  alt={`${product.title} on body`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Product Purchase Details */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28 h-fit space-y-7">
          {/* Header & Rating */}
          <div className="border-b border-[#e5e2e1] pb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs text-[#767676] tracking-[0.2em] uppercase">
                {product.category}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="text-[#767676] hover:text-black text-xs flex items-center gap-1"
                  title="Share link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink && <span className="text-[10px] text-black">Copied!</span>}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-1 text-black hover:opacity-75"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorited ? 'fill-black stroke-black' : 'stroke-black'}`}
                  />
                </button>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-black uppercase leading-tight">
              {product.title}
            </h1>

            {/* Stars & Reviews */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black stroke-black" />
                ))}
              </div>
              <span className="text-xs font-mono text-[#5e5e5e]">
                {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="pt-2">
              <span className="font-mono text-2xl font-bold text-black">
                ${product.price.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
              <span className="text-black font-semibold">
                Color: <span className="font-normal text-[#5e5e5e]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-offset-2 ring-black border-black/40 scale-105'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={`Select ${c.name} color`}
                >
                  {selectedColor === c.name && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        c.hex === '#111111' || c.hex === '#1A1A1A' || c.hex === '#141414' || c.hex === '#3B2F2F'
                          ? 'bg-white'
                          : 'bg-black'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector with Size Guide Trigger */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider">
              <span className="text-black font-semibold">
                Size: <span className="font-normal text-[#5e5e5e]">{selectedSize}</span>
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#767676] hover:text-black underline flex items-center gap-1 lowercase tracking-normal"
              >
                <Ruler className="w-3 h-3" />
                <span className="capitalize">Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 text-xs font-mono font-bold uppercase tracking-wider border transition-all text-center ${
                    selectedSize === s
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-[#c4c7c7] hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-black bg-white h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 h-full hover:bg-neutral-100 transition-colors text-black"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-mono text-sm font-semibold text-black min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 h-full hover:bg-neutral-100 transition-colors text-black"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                id="pdp-add-to-bag-btn"
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-black hover:bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <span className="opacity-60">|</span>
                <span className="font-mono">${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Buy It Now Direct */}
            <button
              id="pdp-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full h-12 bg-[#f1edec] hover:bg-[#e5e2e1] text-black text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Buy It Now
            </button>

            {/* Atelier Stylist Advisory */}
            <button
              id="pdp-stylist-btn"
              type="button"
              onClick={() => openStylist(product.id, product.title)}
              className="w-full py-3 px-4 bg-white border border-[#c4c7c7] hover:border-black text-xs font-semibold uppercase tracking-wider text-black transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Ask Stylist: How to Style This Piece</span>
            </button>
          </div>

          {/* Value Props */}
          <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-[#5e5e5e]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-black shrink-0" />
              <span>Complimentary shipping $150+</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-black shrink-0" />
              <span>30-day effortless returns</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="border-t border-[#e5e2e1] divide-y divide-[#e5e2e1] pt-2">
            {/* Details & Fit */}
            <div className="py-4">
              <button
                onClick={() => toggleAcc('details')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black text-left"
              >
                <span>Details & Fit</span>
                {openAccordion === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'details' && (
                <ul className="mt-3 space-y-1.5 text-xs text-[#5e5e5e] list-disc list-inside">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Material & Care */}
            <div className="py-4">
              <button
                onClick={() => toggleAcc('material')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black text-left"
              >
                <span>Material & Care</span>
                {openAccordion === 'material' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'material' && (
                <div className="mt-3 text-xs text-[#5e5e5e] space-y-2">
                  <p>
                    <strong className="text-black">Composition:</strong> {product.materialCare.composition}
                  </p>
                  <p>
                    <strong className="text-black">Care:</strong> {product.materialCare.instructions}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="py-4">
              <button
                onClick={() => toggleAcc('shipping')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black text-left"
              >
                <span>Shipping & Returns</span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="mt-3 text-xs text-[#5e5e5e] leading-relaxed">
                  <p>{product.shippingInfo}</p>
                </div>
              )}
            </div>

            {/* Reviews & Client Verification */}
            <div className="py-4">
              <button
                onClick={() => toggleAcc('reviews')}
                className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black text-left"
              >
                <div className="flex items-center gap-2">
                  <span>Client Impressions ({reviews.length})</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-amber-500" />
                  </div>
                </div>
                {openAccordion === 'reviews' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'reviews' && (
                <div className="mt-4 space-y-4">
                  {reviewSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Your review has been verified and added to the atelier ledger.</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#767676] font-mono">
                      {reviews.length} Verified Assessments
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-xs font-mono uppercase underline text-black hover:text-[#5e5e5e]"
                    >
                      {showReviewForm ? 'Cancel' : '+ Add Review'}
                    </button>
                  </div>

                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="bg-[#f7f3f2] p-4 border border-[#e5e2e1] space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#767676] mb-1">
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="p-1 text-black"
                            >
                              <Star
                                className={`w-4 h-4 ${star <= newRating ? 'fill-black text-black' : 'text-neutral-300'}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="Your Name (e.g., Charlotte M.)"
                          className="w-full p-2 bg-white border border-[#c4c7c7] text-xs focus:border-black focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Review Title (e.g., Exceptional drape)"
                          className="w-full p-2 bg-white border border-[#c4c7c7] text-xs focus:border-black focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                          placeholder="Describe fabric weight, fit, and silhouette..."
                          className="w-full p-2 bg-white border border-[#c4c7c7] text-xs focus:border-black focus:outline-hidden resize-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="w-full py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 transition-colors disabled:opacity-50"
                      >
                        {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                      </button>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-3 divide-y divide-[#e5e2e1]">
                    {reviews.map((r) => (
                      <div key={r.id} className="pt-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-black">{r.author}</span>
                            {r.verifiedPurchase && (
                              <span className="text-[9px] bg-neutral-200 text-neutral-800 px-1.5 py-0.5 font-mono uppercase tracking-wider">
                                Verified
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#767676] font-mono">{r.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < r.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-300'}`}
                            />
                          ))}
                        </div>
                        <p className="font-semibold text-black">{r.title}</p>
                        <p className="text-[#5e5e5e] leading-relaxed">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* "COMPLETE THE LOOK" Section from Screen 3 */}
      <section className="mt-24 pt-16 border-t border-[#e5e2e1]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-caps text-xs text-[#767676] tracking-[0.2em] uppercase block mb-1">
              Curated Ensemble
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-black uppercase">
              Complete The Look
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {completeTheLookProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
