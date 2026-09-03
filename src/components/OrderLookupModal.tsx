import React, { useState } from 'react';
import { api, ServerOrder } from '../services/api';
import { X, Search, Package, Truck, CheckCircle2, Clock, Copy, ExternalLink, AlertCircle } from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ServerOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent, searchVal?: string) => {
    if (e) e.preventDefault();
    const val = (searchVal !== undefined ? searchVal : query).trim();
    if (!val) return;

    setLoading(true);
    setError(null);
    try {
      const data = await api.lookupOrder(val);
      setOrder(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No order record found for this reference';
      setError(msg);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const copyTracking = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#fdf8f8] border border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e2e1] bg-white sticky top-0 z-10">
          <div>
            <span className="font-label-caps text-[10px] text-[#767676] tracking-[0.2em] uppercase block">
              Atelier Logistics
            </span>
            <h3 className="font-display text-xl font-semibold uppercase text-black">
              Track Order & Archives
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-black hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-[#e5e2e1] bg-[#f7f3f2]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#767676]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order # (e.g. ZVR-882194) or Tracking #"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#c4c7c7] text-xs font-mono uppercase text-black focus:border-black focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Locate'}
            </button>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[#767676]">
            <span>Try sample record:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('ZVR-882194');
                handleSearch(undefined, 'ZVR-882194');
              }}
              className="font-mono text-black underline hover:text-neutral-700 text-[11px]"
            >
              ZVR-882194
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Order Record Not Found</p>
                <p className="mt-0.5 text-red-700">{error}</p>
              </div>
            </div>
          )}

          {order && (
            <div className="space-y-6">
              {/* Order Status Banner */}
              <div className="bg-white border border-[#e5e2e1] p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e2e1] pb-3">
                  <div>
                    <span className="text-[10px] text-[#767676] uppercase font-mono tracking-widest block">
                      Order Reference
                    </span>
                    <span className="font-mono text-base font-bold text-black">
                      {order.orderNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-mono uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Progress Stages */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-mono uppercase tracking-wider">
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-black" />
                    <span className="font-semibold text-black">Placed</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-black" />
                    <span className="font-semibold text-black">Atelier QC</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className={`h-1.5 ${order.status === 'Dispatched' || order.status === 'Delivered' ? 'bg-black' : 'bg-neutral-200'}`} />
                    <span className={order.status === 'Dispatched' || order.status === 'Delivered' ? 'font-semibold text-black' : 'text-[#767676]'}>
                      Dispatched
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className={`h-1.5 ${order.status === 'Delivered' ? 'bg-black' : 'bg-neutral-200'}`} />
                    <span className={order.status === 'Delivered' ? 'font-semibold text-black' : 'text-[#767676]'}>
                      Delivered
                    </span>
                  </div>
                </div>

                {/* Carrier & Tracking */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs bg-[#f7f3f2] p-3 border border-[#e5e2e1]">
                  <div>
                    <span className="text-[#767676] block text-[11px]">Carrier</span>
                    <span className="font-medium text-black">{order.carrier}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <span className="text-[#767676] block text-[11px]">Tracking Reference</span>
                      <span className="font-mono font-bold text-black">{order.trackingNumber}</span>
                    </div>
                    <button
                      onClick={() => copyTracking(order.trackingNumber)}
                      className="p-1.5 bg-white border border-[#c4c7c7] hover:border-black text-black transition-colors"
                      title="Copy Tracking Number"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-700 font-medium text-right">
                    Tracking reference copied to clipboard!
                  </p>
                )}
              </div>

              {/* Garments in Order */}
              <div className="bg-white border border-[#e5e2e1] p-5 space-y-4">
                <h4 className="font-label-caps text-xs text-black uppercase tracking-wider border-b border-[#e5e2e1] pb-2">
                  Garments ({order.items.length})
                </h4>
                <div className="divide-y divide-[#e5e2e1]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover bg-[#ebe7e6] border border-[#e5e2e1]"
                        />
                        <div>
                          <p className="font-semibold text-black">{item.title}</p>
                          <p className="text-[#767676] text-[11px]">
                            {item.color} / Size {item.size} • Qty {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Paid */}
                <div className="border-t border-[#e5e2e1] pt-3 flex justify-between items-center text-xs">
                  <span className="text-[#5e5e5e]">Total Paid (inc. taxes & shipping)</span>
                  <span className="font-mono text-base font-bold text-black">
                    ${order.pricing.total.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Destination */}
              <div className="bg-white border border-[#e5e2e1] p-5 text-xs text-[#5e5e5e] space-y-1">
                <h4 className="font-label-caps text-xs text-black uppercase tracking-wider border-b border-[#e5e2e1] pb-2 mb-2">
                  Shipping Destination
                </h4>
                <p className="font-medium text-black">{order.customer.firstName} {order.customer.lastName}</p>
                <p>{order.customer.address}{order.customer.apartment ? `, ${order.customer.apartment}` : ''}</p>
                <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}, {order.customer.country}</p>
                <p className="text-[#767676] pt-1">Contact: {order.customer.email}</p>
              </div>
            </div>
          )}

          {!order && !error && (
            <div className="text-center py-10 text-xs text-[#767676] space-y-2">
              <Package className="w-8 h-8 mx-auto stroke-1 text-black/40" />
              <p>Enter your 9-digit ZOVORO order code or shipping reference to track delivery progression.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
