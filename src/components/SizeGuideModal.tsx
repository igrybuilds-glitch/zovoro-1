import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms'>('tops');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#fdf8f8] shadow-2xl p-6 sm:p-8 border border-[#e5e2e1]">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-black stroke-[1.5]" />
              <h3 className="font-display text-xl font-semibold tracking-wider text-black uppercase">
                Size & Measurement Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1.5 text-[#5e5e5e] hover:text-black rounded-full hover:bg-black/5"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex border border-[#c4c7c7] bg-white">
              <button
                onClick={() => setActiveTab('tops')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'tops' ? 'bg-black text-white' : 'text-[#5e5e5e] hover:text-black'
                }`}
              >
                Tops & Outerwear
              </button>
              <button
                onClick={() => setActiveTab('bottoms')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'bottoms' ? 'bg-black text-white' : 'text-[#5e5e5e] hover:text-black'
                }`}
              >
                Tailored Trousers
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#5e5e5e]">
              <span>Units:</span>
              <div className="flex border border-[#c4c7c7] bg-white">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 text-xs font-mono font-bold ${
                    unit === 'in' ? 'bg-neutral-800 text-white' : 'text-[#5e5e5e]'
                  }`}
                >
                  IN
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 text-xs font-mono font-bold ${
                    unit === 'cm' ? 'bg-neutral-800 text-white' : 'text-[#5e5e5e]'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#e5e2e1] bg-white mb-6">
            {activeTab === 'tops' ? (
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#1c1b1b] uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest ({unit})</th>
                    <th className="py-3 px-4">Shoulder ({unit})</th>
                    <th className="py-3 px-4">Body Length ({unit})</th>
                    <th className="py-3 px-4">Sleeve ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2e1] text-[#5e5e5e] font-mono">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">XS</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '40.0"' : '101 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '18.5"' : '47 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '28.0"' : '71 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '9.0"' : '23 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">S</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '42.0"' : '106 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '19.5"' : '49 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '29.0"' : '73 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '9.5"' : '24 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="py-2.5 px-4 font-bold text-black font-sans">M (Model)</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '44.5"' : '113 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '20.5"' : '52 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '30.0"' : '76 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '10.0"' : '25 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">L</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '47.0"' : '119 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '21.5"' : '54 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '31.0"' : '78 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '10.5"' : '26 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">XL</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '50.0"' : '127 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '22.5"' : '57 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '32.0"' : '81 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '11.0"' : '28 cm'}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#1c1b1b] uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Waist ({unit})</th>
                    <th className="py-3 px-4">Inseam ({unit})</th>
                    <th className="py-3 px-4">Leg Opening ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e2e1] text-[#5e5e5e] font-mono">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">XS / 28</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '28-29"' : '71-74 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '31.0"' : '79 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '10.5"' : '26 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">S / 30</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '30-31"' : '76-79 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '31.5"' : '80 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '11.0"' : '28 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="py-2.5 px-4 font-bold text-black font-sans">M / 32</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '32-33"' : '81-84 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '32.0"' : '81 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '11.5"' : '29 cm'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-black font-sans">L / 34</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '34-35"' : '86-89 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '32.5"' : '82 cm'}</td>
                    <td className="py-2.5 px-4">{unit === 'in' ? '12.0"' : '30 cm'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-[#f7f3f2] p-4 text-xs text-[#5e5e5e] leading-relaxed">
            <strong className="text-black font-semibold block mb-1">Architectural Fit Philosophy:</strong>
            Our silhouettes are engineered with relaxed, dropped proportion. For a signature runway oversized look, select your true size. For a tailored, closer fit, consider sizing down.
          </div>
        </div>
      </div>
    </div>
  );
};
