import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, HERO_IMAGE } from '../data/products';
import { ArrowRight } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { selectProduct, setActiveTab, setSelectedCategory } = useCart();

  const editorialLooks = [
    {
      title: 'LOOK 01: ARCHITECTURAL MONOCHROME',
      garments: ['structured-wool-coat', 'tailored-wide-leg-trouser', 'architectural-shades'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnS6bAkuSkM-3rMYlhJLJoPXTKXMAT8x_B1m7Y8drGQ4LB5nvQtrhWZX1Ae8PEBvCYn-9HjvlaWGJY8ZoKerfodxkrXXZCzXMq3MJKbecsBsaQsBUwbb0FLr_EdKO46y1dM4Mps97Uy_Sb1adLxEvLGM2GdVdbGgtmQkvGAnmvs7AYj8tgFmWnJoJ34ZYmyMRfbd8mWBgmTHg5gK9qUUN0h2mTKZfTcuncS8t7gIo7kNENRN2cm4vf',
      quote: '“Precision in the shoulder line creates an unwavering presence without unnecessary ornamentation.”',
    },
    {
      title: 'LOOK 02: FLUID ASYMMETRY',
      garments: ['asymmetric-silk-blouse', 'tailored-wide-trousers', 'architectural-leather-tote'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw0UjnNumnMJQrMuqFHd__vtTouFSPBOANYI4KGMfI5cT6wZDC_THDQd33TuDLolfkIiTZdI-GuQmtNKrHRhJbeM1MYIORIfryap7UK99f8AbwZNLrLb7SlaHQMKTK49waeTiuGlkg9v7O310PhvgKPfeiPxCv48gl2eZwcuFAFnlXq7FUvUlPMYNuGzZ7yy-sEijlWesWE6d5nwhuiVVVEsjZddyT5cR66Uni-19WA3_UbsLG5j2f',
      quote: '“Weightless silk crepe draped against razor-sharp worsted wool—a tension between motion and structure.”',
    },
    {
      title: 'LOOK 03: CASUAL ELEVATION',
      garments: ['essential-oversized-tee', 'signature-canvas-cap', 'minimalist-chain'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIyW9f0tV6sCU6xPiaT9tiAvm3-WSPgBP29pWJ17rFpDPXQNCpr07xTyOOFFLHKuZAwx5wUWTe4ApExY8QVCWoPHYoqm5XBOKjfcW3-elUfGQ3VHPt7peVc5r5oQSQOCuWCi3i3b1g8vdIt3_IN_eU1t6Sxse_c2a-zZ6c4hDOJ5sRvwQBlnuPCzOPEGpI8Daem9H9UffE0xHaXHtDtS1A5u4uN6uqwLmLxkHSt6YF23IIDOEf3Tzn',
      quote: '“The everyday t-shirt re-imagined as an architectural volume in 220gsm heavyweight cotton.”',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* Title */}
      <div className="border-b border-[#e5e2e1] pb-8 text-center max-w-2xl mx-auto">
        <span className="font-label-caps text-xs text-[#767676] tracking-[0.3em] uppercase block mb-2">
          Seasonal Lookbook
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-black">
          Capsule 04: The Void
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#5e5e5e] mt-3 leading-relaxed">
          An exploration of negative space, brutalist lines, and raw tactile density. Photographed in studio under natural diffused daylight.
        </p>
      </div>

      {/* Lookbook Entries */}
      <div className="space-y-28">
        {editorialLooks.map((look, index) => (
          <div
            key={look.title}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[3/4] bg-[#ebe7e6] border border-[#e5e2e1] overflow-hidden shadow-xs">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Look Details & Products in Look */}
            <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="font-mono text-xs text-[#767676] tracking-widest block">
                0{index + 1} / 03
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold uppercase text-black">
                {look.title}
              </h2>
              <blockquote className="font-display italic text-sm text-[#444748] border-l-2 border-black pl-4 my-4">
                {look.quote}
              </blockquote>

              <div className="pt-4 border-t border-[#e5e2e1]">
                <h4 className="font-label-caps text-xs text-black uppercase tracking-wider mb-4">
                  Pieces in this look:
                </h4>
                <div className="space-y-3">
                  {look.garments.map((id) => {
                    const p = PRODUCTS.find((item) => item.id === id);
                    if (!p) return null;
                    return (
                      <div
                        key={p.id}
                        onClick={() => selectProduct(p.id)}
                        className="flex items-center justify-between p-2.5 bg-white border border-[#e5e2e1] hover:border-black cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images.primary}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover bg-[#ebe7e6]"
                          />
                          <div>
                            <p className="text-xs font-semibold text-black group-hover:underline">
                              {p.title}
                            </p>
                            <p className="text-[11px] text-[#767676]">{p.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-black">
                            ${p.price.toFixed(2)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Catalog CTA */}
      <div className="bg-[#141414] text-white p-10 sm:p-14 text-center space-y-4">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold uppercase">
          Explore The Full Garment Ledger
        </h3>
        <p className="text-xs text-[#a0a0a0] max-w-md mx-auto">
          Every piece is produced in numbered runs using traceable materials.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setActiveTab('new-arrivals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#f1edec] transition-colors"
          >
            Shop Entire Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
