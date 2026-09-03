import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Lock, ShieldCheck, Check, ArrowLeft, Tag, CreditCard, Package, ExternalLink, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingCost,
    discountCode,
    discountAmount,
    applyDiscount,
    total,
    setActiveTab,
    clearCart,
    openOrderLookup,
  } = useCart();

  // Form State
  const [email, setEmail] = useState('julian.vance@atelier.com');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [firstName, setFirstName] = useState('Julian');
  const [lastName, setLastName] = useState('Vance');
  const [address, setAddress] = useState('450 West 33rd Street');
  const [apartment, setApartment] = useState('Apt 14B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('10001');
  const [country, setCountry] = useState('United States');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [nameOnCard, setNameOnCard] = useState('JULIAN VANCE');

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('');

  const effectiveShipping = shippingMethod === 'express' ? 25 : shippingCost;
  const calculatedTax = (subtotal - discountAmount) * 0.08875;
  const finalOrderTotal = Math.max(0, subtotal - discountAmount + effectiveShipping + calculatedTax);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    try {
      const res = await api.validatePromo(promoInput);
      if (res.valid) {
        applyDiscount(promoInput);
        setPromoMsg({ text: res.message, error: false });
        setPromoInput('');
      } else {
        setPromoMsg({ text: res.message, error: true });
      }
    } catch {
      const fallback = applyDiscount(promoInput);
      setPromoMsg({ text: fallback.message, error: !fallback.success });
      if (fallback.success) setPromoInput('');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const createdOrder = await api.createOrder({
        customer: {
          firstName,
          lastName,
          email,
          phone,
          address,
          apartment,
          city,
          state,
          postalCode,
          country,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          image: item.image,
        })),
        pricing: {
          subtotal,
          discountAmount,
          discountCode: discountCode || undefined,
          shipping: effectiveShipping,
          shippingMethod,
          tax: Number(calculatedTax.toFixed(2)),
          total: Number(finalOrderTotal.toFixed(2)),
        },
        payment: {
          lastFour: cardNumber.slice(-4) || '4242',
          method: 'card',
        },
      });

      setOrderId(createdOrder.orderNumber);
      setTrackingNumber(createdOrder.trackingNumber);
      setCarrier(createdOrder.carrier);
      setOrderComplete(true);
    } catch (err: unknown) {
      console.warn('Backend order submission fallback', err);
      // Fallback in case of network issue
      const genId = `ZVR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(genId);
      setTrackingNumber(`FR-PAR-${Math.floor(100000000 + Math.random() * 900000000)}`);
      setCarrier('DHL Express International');
      setOrderComplete(true);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="font-label-caps text-xs text-[#767676] tracking-[0.2em] uppercase">
          Order Confirmation & Atelier Dispatch
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold uppercase text-black mt-2 mb-4">
          Thank you, {firstName}.
        </h1>

        <p className="text-sm text-[#5e5e5e] max-w-md mx-auto mb-8">
          Your order <strong className="text-black font-mono">{orderId}</strong> has been registered with our Paris Atelier and recorded in the logistics ledger.
        </p>

        {/* Order Summary Receipt Box */}
        <div className="bg-white border border-[#e5e2e1] p-6 sm:p-8 text-left max-w-xl mx-auto shadow-xs mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e2e1] pb-4 bg-[#f7f3f2] p-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#767676] block">
                Carrier & Tracking
              </span>
              <span className="font-mono text-sm font-bold text-black">{trackingNumber}</span>
              <span className="text-xs text-[#5e5e5e] block mt-0.5">{carrier}</span>
            </div>
            <button
              onClick={() => openOrderLookup(orderId)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors self-start sm:self-auto"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Live</span>
            </button>
          </div>

          <div>
            <h3 className="font-label-caps text-xs text-black border-b border-[#e5e2e1] pb-2 mb-3">
              Delivery Details
            </h3>
            <div className="text-xs text-[#5e5e5e] space-y-1">
              <p className="font-medium text-black">{firstName} {lastName}</p>
              <p>{address}{apartment ? `, ${apartment}` : ''}</p>
              <p>{city}, {state} {postalCode}, {country}</p>
              <p className="text-[#767676] pt-1">Confirmation sent to: {email}</p>
            </div>
          </div>

          <div>
            <h3 className="font-label-caps text-xs text-black border-b border-[#e5e2e1] pb-2 mb-3">
              Purchased Pieces ({cart.length})
            </h3>
            <div className="divide-y divide-[#e5e2e1]">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-12 object-cover bg-[#ebe7e6] border border-[#e5e2e1]"
                    />
                    <div>
                      <p className="font-medium text-black">{item.title}</p>
                      <p className="text-[#767676]">{item.color} • Size {item.size} • Qty {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-black pt-4 flex justify-between items-center text-sm font-bold text-black">
            <span>Total Paid (USD)</span>
            <span className="font-mono text-base">${finalOrderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openOrderLookup(orderId)}
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-black text-black hover:bg-neutral-50 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Open Tracking Portal</span>
          </button>
          <button
            onClick={() => {
              clearCart();
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            Return to Atelier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-6 mb-8">
        <button
          onClick={() => setActiveTab('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5e5e5e] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Bag</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#5e5e5e]">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span className="font-medium text-black">256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Express Checkout Simulation */}
          <div className="bg-[#f7f3f2] p-5 border border-[#e5e2e1]">
            <span className="font-label-caps text-xs text-[#767676] block text-center mb-3">
              Express Checkout
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    setOrderId('ZVR-EXP-94021');
                    setOrderComplete(true);
                  }, 800);
                }}
                className="py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-wider rounded-xs flex items-center justify-center transition-colors"
              >
                 Pay
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    setOrderId('ZVR-GPY-74812');
                    setOrderComplete(true);
                  }, 800);
                }}
                className="py-3 bg-white hover:bg-neutral-50 text-black border border-[#c4c7c7] text-xs font-bold tracking-wider rounded-xs flex items-center justify-center transition-colors"
              >
                G Pay
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    setOrderId('ZVR-SHP-61209');
                    setOrderComplete(true);
                  }, 800);
                }}
                className="py-3 bg-[#5a31f4] hover:bg-[#4924cf] text-white text-xs font-bold tracking-wider rounded-xs flex items-center justify-center transition-colors"
              >
                Shop Pay
              </button>
            </div>

            <div className="relative flex items-center justify-center mt-5">
              <div className="border-t border-[#e5e2e1] w-full" />
              <span className="bg-[#f7f3f2] px-3 text-[10px] uppercase font-mono tracking-widest text-[#767676] absolute">
                Or continue below
              </span>
            </div>
          </div>

          {/* Main Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* 1. Contact Info */}
            <div>
              <h2 className="font-label-caps text-xs text-black tracking-[0.16em] mb-4">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Mobile Phone (for delivery SMS)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div>
              <h2 className="font-label-caps text-xs text-black tracking-[0.16em] mb-4">
                2. Shipping Destination
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Country / Region</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Japan</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street address or P.O. Box"
                    className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-[#c4c7c7] text-xs text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Shipping Options */}
            <div>
              <h2 className="font-label-caps text-xs text-black tracking-[0.16em] mb-4">
                3. Shipping Method
              </h2>
              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-black bg-white ring-1 ring-black'
                      : 'border-[#e5e2e1] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-black"
                    />
                    <div>
                      <p className="text-xs font-semibold text-black">Standard Express Delivery</p>
                      <p className="text-[11px] text-[#767676]">2-4 Business Days with tracking</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold font-mono text-black">
                    {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-black bg-white ring-1 ring-black'
                      : 'border-[#e5e2e1] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-black"
                    />
                    <div>
                      <p className="text-xs font-semibold text-black">Priority Atelier White-Glove</p>
                      <p className="text-[11px] text-[#767676]">Next Business Day Delivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold font-mono text-black">$25.00</span>
                </label>
              </div>
            </div>

            {/* 4. Payment */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-label-caps text-xs text-black tracking-[0.16em]">
                  4. Payment Method
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-[#767676]">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </div>
              </div>

              <div className="p-5 border border-black bg-white space-y-4">
                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#c4c7c7] text-xs font-mono text-black focus:border-black focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#c4c7c7] text-xs font-mono text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5e5e5e] mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2.5 border border-[#c4c7c7] text-xs font-mono text-black focus:border-black focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#5e5e5e] mb-1">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#c4c7c7] text-xs uppercase text-black focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              id="complete-order-btn"
              type="submit"
              disabled={isProcessing || cart.length === 0}
              className="w-full py-4 bg-black hover:bg-neutral-900 text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5 text-white/80" />
              <span>
                {isProcessing ? 'Authorizing Payment...' : `Complete Order • $${finalOrderTotal.toFixed(2)} USD`}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary from Screen 4 */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-[#e5e2e1] p-6 sm:p-8 sticky top-28 space-y-6 shadow-xs">
            <h2 className="font-display text-lg font-semibold tracking-wider text-black uppercase border-b border-[#e5e2e1] pb-4">
              Order Summary ({cart.length})
            </h2>

            {/* Items List matching Screen 4 */}
            <div className="divide-y divide-[#e5e2e1] max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-[#ebe7e6] border border-[#e5e2e1] shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-sans text-xs font-semibold text-black leading-snug">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-black ml-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#767676] mt-0.5">
                      {item.color} / Size {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2 pt-2 border-t border-[#e5e2e1]">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo Code (ZOVORO10)"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#c4c7c7] text-black focus:border-black focus:outline-hidden uppercase font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMsg && (
              <p className={`text-xs ${promoMsg.error ? 'text-red-600' : 'text-emerald-700 font-medium'}`}>
                {promoMsg.text}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#5e5e5e] border-t border-[#e5e2e1] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-black font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Promotion ({discountCode})</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-black">
                  {effectiveShipping === 0 ? 'Complimentary' : `$${effectiveShipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8.875%)</span>
                <span className="font-mono text-black">${calculatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-[#e5e2e1]">
                <span>Total Due</span>
                <span className="font-mono text-lg font-bold">${finalOrderTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Atelier Shield Guarantee */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#767676] bg-[#f7f3f2] p-3">
              <ShieldCheck className="w-5 h-5 text-black shrink-0" />
              <span>Free returns within 30 days. Insured delivery guarantee.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
