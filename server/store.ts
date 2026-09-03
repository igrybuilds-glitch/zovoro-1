export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: 'Outerwear' | 'Tops' | 'Trousers' | 'Bags' | 'Accessories' | 'Caps';
  images: {
    primary: string;
    secondary?: string;
    detail?: string;
    lifestyle?: string;
  };
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  materialCare: {
    composition: string;
    instructions: string;
  };
  shippingInfo: string;
  rating: number;
  reviewsCount: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  stockCount: number;
}

export interface ReviewItem {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Processing' | 'Atelier Quality Inspection' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  carrier: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    title: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    image: string;
  }[];
  pricing: {
    subtotal: number;
    discountAmount: number;
    discountCode?: string;
    shipping: number;
    shippingMethod: 'standard' | 'express';
    tax: number;
    total: number;
  };
  payment: {
    lastFour: string;
    method: 'card' | 'apple_pay' | 'google_pay' | 'shop_pay';
  };
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'free_shipping';
  discountRate: number; // 0.10 for 10%
  minSpend?: number;
  description: string;
  active: boolean;
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

// Initial products catalogue
export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'essential-oversized-tee',
    title: 'Essential Oversized Tee',
    subtitle: 'Alabaster',
    price: 65,
    category: 'Tops',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2ZUuV1_fPZEHr4ykwqZEbSB-adPhw23KT14el_j3RzrEgvPSE_8jUsWrZiyfHHauwKNeo_pNvGt0JLOl6SS23sS9Y6hgsqa5V_QierVh4gtfhJ5oK6MPDmGjoGPaG3hkQqqIkcZZd05PznI-znHHBINN19sqteRnEmeDML5-Zk4nwR-DutbaZf-43vXg1lQy7SC00ra2XmWpcyqOSuRxxCHdwNLRHCLHkJj73VC5H2SKFd1VCUKS',
      detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCIMu8538Em4gz8DWw4b0Z6PDyWDptEyjfASkRIEsmB6AjLbNLfFb8_XrVNjIWh1kMyvSZKJHflCZJBHT0gyAfP0VMC8XbAviNdNfM8U5KM9sWSnw4mvqkcoy-ftzzNQz_JGggFBIFj1_wi-rFbb8mkbrMeaz3J0QlMvGVFi4KejU8TdP3SQaYtdSottXuUcfEFhqNncbOB7QDFd_QFMvx3euh_qBj1hhqs2yp4dzDZMKgIxvKUd9J',
      lifestyle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIyW9f0tV6sCU6xPiaT9tiAvm3-WSPgBP29pWJ17rFpDPXQNCpr07xTyOOFFLHKuZAwx5wUWTe4ApExY8QVCWoPHYoqm5XBOKjfcW3-elUfGQ3VHPt7peVc5r5oQSQOCuWCi3i3b1g8vdIt3_IN_eU1t6Sxse_c2a-zZ6c4hDOJ5sRvwQBlnuPCzOPEGpI8Daem9H9UffE0xHaXHtDtS1A5u4uN6uqwLmLxkHSt6YF23IIDOEf3Tzn',
      secondary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCIMu8538Em4gz8DWw4b0Z6PDyWDptEyjfASkRIEsmB6AjLbNLfFb8_XrVNjIWh1kMyvSZKJHflCZJBHT0gyAfP0VMC8XbAviNdNfM8U5KM9sWSnw4mvqkcoy-ftzzNQz_JGggFBIFj1_wi-rFbb8mkbrMeaz3J0QlMvGVFi4KejU8TdP3SQaYtdSottXuUcfEFhqNncbOB7QDFd_QFMvx3euh_qBj1hhqs2yp4dzDZMKgIxvKUd9J',
    },
    colors: [
      { name: 'Alabaster', hex: '#F9F6F0' },
      { name: 'Onyx', hex: '#1A1A1A' },
      { name: 'Concrete', hex: '#8A8D8F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Crafted from heavyweight 220gsm organic cotton, this tee offers a structured, architectural drape. Minimalist design for maximum impact.',
    details: [
      'Boxy, oversized silhouette',
      'Dropped shoulders for effortless posture',
      'High-gauge ribbed crewneck collar',
      'Pre-shrunk organic long-staple cotton',
      'Model is 6\'1" and wears size M',
    ],
    materialCare: {
      composition: '100% Organic Heavyweight Cotton (220gsm).',
      instructions: 'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.',
    },
    shippingInfo: 'Free standard shipping on orders over $150. Returns accepted within 30 days of delivery in original, unworn condition.',
    rating: 4.8,
    reviewsCount: 124,
    isNewArrival: true,
    isFeatured: true,
    stockCount: 42,
  },
  {
    id: 'structured-wool-coat',
    title: 'Structured Wool Coat',
    subtitle: 'Black',
    price: 895,
    category: 'Outerwear',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnS6bAkuSkM-3rMYlhJLJoPXTKXMAT8x_B1m7Y8drGQ4LB5nvQtrhWZX1Ae8PEBvCYn-9HjvlaWGJY8ZoKerfodxkrXXZCzXMq3MJKbecsBsaQsBUwbb0FLr_EdKO46y1dM4Mps97Uy_Sb1adLxEvLGM2GdVdbGgtmQkvGAnmvs7AYj8tgFmWnJoJ34ZYmyMRfbd8mWBgmTHg5gK9qUUN0h2mTKZfTcuncS8t7gIo7kNENRN2cm4vf',
      secondary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiLNSFyqRyiOF2cca2Xjr1pZahK7Kt3_OjGOJ_kYPiv-ZoGZ53oqluor2J2rrLG-thDnTDcP-DMcAvQ4Wjy4R3BDj_Hlc4-0jKiQi_x7VLwvSLSNYa03bxzhonSxIYKgxrTJRhMyYE997daXxZDmAqFwBHp4PpPJZ11oWDoF0mCKHrnS5kqvKuyrsiyECX4RzmKQn2FHbuGbNWgZK1a4jGlUE4v8cf5Gek2p-VwuAAFU93QgRXV31V',
      detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiLNSFyqRyiOF2cca2Xjr1pZahK7Kt3_OjGOJ_kYPiv-ZoGZ53oqluor2J2rrLG-thDnTDcP-DMcAvQ4Wjy4R3BDj_Hlc4-0jKiQi_x7VLwvSLSNYa03bxzhonSxIYKgxrTJRhMyYE997daXxZDmAqFwBHp4PpPJZ11oWDoF0mCKHrnS5kqvKuyrsiyECX4RzmKQn2FHbuGbNWgZK1a4jGlUE4v8cf5Gek2p-VwuAAFU93QgRXV31V',
      lifestyle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWLdD-NunW0-pNgNxEHygRL1oVGfRM4quwbH6KAehWtMwFGiXj42jSqrsck-7IusFB29rdNoOyRtdG744PbYQ2tfHxeEYjvu7M3Zh5TrCle8nXOe3AotQvYtwVQS599Accw6nfKgbg2l1y7pxnnvKq9HrkK0GTqIOo3Q3WO9hx2xNh1gT9kQQH78g5fEzNtNKik0a4Y9WKMP3f7Qc7lxp1WynnzxifsfoAhW63UILqEEZT9wLhFlpB',
    },
    colors: [
      { name: 'Onyx', hex: '#111111' },
      { name: 'Camel', hex: '#B28E64' },
      { name: 'Graphite', hex: '#3E4143' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A double-breasted structured overcoat crafted from double-faced virgin wool. Architectural silhouette with razor-sharp lapels and concealed horn button closures.',
    details: [
      'Tailored architectural shoulder structure',
      'Concealed double-breasted horn closures',
      'Dual deep angled welt pockets',
      'Cupro-lined sleeves for effortless layering',
      'Made in Italy',
    ],
    materialCare: {
      composition: '90% Virgin Wool, 10% Cashmere; 100% Cupro Lining.',
      instructions: 'Specialist dry clean only. Do not wash or tumble dry. Store on shaped wooden hanger.',
    },
    shippingInfo: 'Complimentary express delivery with signature required. Delivered in signature garment archive bag with wooden hanger.',
    rating: 4.9,
    reviewsCount: 88,
    isNewArrival: true,
    isFeatured: true,
    stockCount: 15,
  },
  {
    id: 'tailored-wide-trousers',
    title: 'Tailored Wide-Leg Trousers',
    subtitle: 'Graphite',
    price: 340,
    category: 'Trousers',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWQ9b6wVvjT8oXf9_yMsq5Q2G1Jg9B-zLz-V1i2Q8c_7oP5r-Xz5n_q8Z9m_s0w1u-v2x3y4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0',
      secondary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3aZc8qUuC8e3yLzR9gBv6w5nK7m8j2p4q5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6',
      detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN3aZc8qUuC8e3yLzR9gBv6w5nK7m8j2p4q5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3e4f5g6',
      lifestyle: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWQ9b6wVvjT8oXf9_yMsq5Q2G1Jg9B-zLz-V1i2Q8c_7oP5r-Xz5n_q8Z9m_s0w1u-v2x3y4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0',
    },
    colors: [
      { name: 'Graphite', hex: '#2B2B2B' },
      { name: 'Sand', hex: '#D7D0C0' },
      { name: 'Deep Navy', hex: '#161E2E' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    description: 'Cut with high-waisted ease and fluid volume, featuring razor front pleats and an elongated pooling hem.',
    details: [
      'Double front pleat construction',
      'Internal waist stay and hook closure',
      'Wide-leg silhouette with gentle taper',
      'Made from Italian tropical worsted wool',
    ],
    materialCare: {
      composition: '100% Italian Worsted Wool.',
      instructions: 'Dry clean only. Steam gently.',
    },
    shippingInfo: 'Complimentary shipping over $150. Free hem alteration voucher included.',
    rating: 4.7,
    reviewsCount: 64,
    isNewArrival: true,
    isFeatured: true,
    stockCount: 28,
  },
  {
    id: 'poplin-collar-shirt',
    title: 'Poplin Collar Shirt',
    subtitle: 'Bone White',
    price: 240,
    category: 'Tops',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOBrXjKHIDp4lpxVD6zszesPg-xhImBrBrNS3qc3wJh8EweVS0UQGFRmEf1ikA8DmtyFAWAIt0Hysip1JA7EwYBlZ1xEl-2PgZu7xdv0sRMmoi-5HsNpdaL0GisGAKNXV5u8XPJaJf7aOWyefTUVGabVounJ3NJF07p9BDObI4-OZwDHLJcbzHiC9zXQy6YKUwKVh_Y73zQFIRbssrXaqd4QUlIeWTb_MAc0S0_t11RB6tX24lB17e',
      detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOBrXjKHIDp4lpxVD6zszesPg-xhImBrBrNS3qc3wJh8EweVS0UQGFRmEf1ikA8DmtyFAWAIt0Hysip1JA7EwYBlZ1xEl-2PgZu7xdv0sRMmoi-5HsNpdaL0GisGAKNXV5u8XPJaJf7aOWyefTUVGabVounJ3NJF07p9BDObI4-OZwDHLJcbzHiC9zXQy6YKUwKVh_Y73zQFIRbssrXaqd4QUlIeWTb_MAc0S0_t11RB6tX24lB17e',
    },
    colors: [
      { name: 'Bone White', hex: '#F6F6F4' },
      { name: 'Sky Stripe', hex: '#C2D4E5' },
      { name: 'Night Sky', hex: '#11141E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A structural poplin shirt engineered with exaggerated French cuffs and a point collar.',
    details: [
      '120/2 two-ply Egyptian cotton poplin',
      'Architectural point collar',
      'Mother of pearl engraved buttons',
      'Relaxed straight silhouette',
    ],
    materialCare: {
      composition: '100% Long-Staple Egyptian Cotton Poplin.',
      instructions: 'Machine wash 30°C delicate. Hang dry. Hot iron with steam.',
    },
    shippingInfo: 'Complimentary shipping over $150.',
    rating: 4.8,
    reviewsCount: 52,
    isNewArrival: false,
    isFeatured: true,
    stockCount: 35,
  },
  {
    id: 'asymmetric-silk-blouse',
    title: 'Asymmetric Silk Blouse',
    subtitle: 'Raw Silk',
    price: 420,
    category: 'Tops',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw0UjnNumnMJQrMuqFHd__vtTouFSPBOANYI4KGMfI5cT6wZDC_THDQd33TuDLolfkIiTZdI-GuQmtNKrHRhJbeM1MYIORIfryap7UK99f8AbwZNLrLb7SlaHQMKTK49waeTiuGlkg9v7O310PhvgKPfeiPxCv48gl2eZwcuFAFnlXq7FUvUlPMYNuGzZ7yy-sEijlWesWE6d5nwhuiVVVEsjZddyT5cR66Uni-19WA3_UbsLG5j2f',
    },
    colors: [
      { name: 'Raw Silk', hex: '#EDE8DF' },
      { name: 'Onyx', hex: '#181818' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Fluid heavyweight silk georgette featuring an off-center bias drape and clean sculpted neckline.',
    details: [
      'Bias-cut 22mm silk georgette',
      'Asymmetrical floating shoulder fold',
      'French seamed interior finish',
    ],
    materialCare: {
      composition: '100% Mulberry Silk.',
      instructions: 'Dry clean or hand wash cold with silk detergent.',
    },
    shippingInfo: 'Complimentary shipping over $150.',
    rating: 4.9,
    reviewsCount: 31,
    isNewArrival: true,
    isFeatured: false,
    stockCount: 19,
  },
  {
    id: 'architectural-leather-tote',
    title: 'Architectural Leather Tote',
    subtitle: 'Matte Calfskin',
    price: 680,
    category: 'Bags',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvXgZ_T-X9c-Yd9_w1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0',
      detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvXgZ_T-X9c-Yd9_w1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0',
    },
    colors: [
      { name: 'Matte Black', hex: '#161616' },
      { name: 'Espresso', hex: '#3B2F2F' },
    ],
    sizes: ['One Size'],
    description: 'Sculpted from thick vegetable-tanned Italian calf leather with beveled hand-painted edges and magnetic bridge closure.',
    details: [
      'Full grain vegetable-tanned Tuscan calfskin',
      'Solid brushed brass hardware with nickel plating',
      'Internal zippered archive compartment',
      'Dimensions: 42cm x 34cm x 14cm',
    ],
    materialCare: {
      composition: '100% Italian Calfskin Leather.',
      instructions: 'Wipe with damp cloth. Condition with natural beeswax cream biannually.',
    },
    shippingInfo: 'Includes bespoke dust bag and travel storage box.',
    rating: 5.0,
    reviewsCount: 47,
    isNewArrival: true,
    isFeatured: true,
    stockCount: 12,
  },
  {
    id: 'signature-canvas-cap',
    title: 'Signature Canvas Cap',
    subtitle: 'Washed Black',
    price: 95,
    category: 'Caps',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9y3Yx4W7v_C8u6Z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9',
    },
    colors: [
      { name: 'Washed Black', hex: '#262626' },
      { name: 'Stone Grey', hex: '#7D7A75' },
    ],
    sizes: ['One Size'],
    description: 'Six-panel low profile cap in 14oz brushed cotton duck canvas with matte steel buckle adjustment.',
    details: [
      '14oz heavy brushed canvas',
      'Curved peak with structural buckram',
      'Custom stamped matte clasp',
    ],
    materialCare: {
      composition: '100% Heavy Cotton Canvas.',
      instructions: 'Spot clean only.',
    },
    shippingInfo: 'Standard shipping in protective rigid cap box.',
    rating: 4.6,
    reviewsCount: 78,
    isNewArrival: false,
    isFeatured: false,
    stockCount: 50,
  },
  {
    id: 'minimalist-chain',
    title: 'Minimalist Curb Chain',
    subtitle: 'Sterling Silver 925',
    price: 185,
    category: 'Accessories',
    images: {
      primary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXyZ9_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3',
    },
    colors: [
      { name: 'Silver 925', hex: '#C8C9CB' },
      { name: '18K Vermeil', hex: '#D4AF37' },
    ],
    sizes: ['50cm', '55cm', '60cm'],
    description: 'Precision milled solid sterling silver curb chain with custom sculptural lobster lock.',
    details: [
      'Solid 925 sterling silver',
      'Hand-finished diamond-cut bevels',
      'Hallmarked in London Assay Office',
    ],
    materialCare: {
      composition: '925 Sterling Silver.',
      instructions: 'Polish with included microfibre jewelry cloth.',
    },
    shippingInfo: 'Complimentary shipping. Packaged in custom embossed drawer box.',
    rating: 4.9,
    reviewsCount: 93,
    isNewArrival: false,
    isFeatured: false,
    stockCount: 22,
  },
];

// Initial reviews
export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    productId: 'essential-oversized-tee',
    author: 'Elena Rostova',
    rating: 5,
    title: 'Exceptional weight and silhouette',
    comment: 'The 220gsm cotton holds its shape in a way ordinary tees simply cannot. The collar remains crisp even after multiple washes. The subtle off-white alabaster tone is flawless.',
    date: '2026-08-14',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    productId: 'essential-oversized-tee',
    author: 'Marcus Vance',
    rating: 5,
    title: 'The definitive oversized tee',
    comment: 'Finally, an oversized tee where the shoulders drop correctly without feeling sloppy. Pairs impeccably under a tailored coat.',
    date: '2026-08-28',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    productId: 'structured-wool-coat',
    author: 'Soren Lindqvist',
    rating: 5,
    title: 'Architectural masterpiece',
    comment: 'The shoulder construction is reminiscent of old-world savile row tailoring, but the silhouette is modern brutalism. Heavy, warm, and commands respect.',
    date: '2026-08-02',
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    productId: 'tailored-wide-trousers',
    author: 'Aria Chen',
    rating: 5,
    title: 'Incredible break and movement',
    comment: 'The drape of this wool while walking is stunning. High-waisted with deep pleats, exactly as described.',
    date: '2026-08-19',
    verifiedPurchase: true,
  },
];

// Initial pre-seeded order for lookup demonstration
export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-882194',
    orderNumber: 'ZVR-882194',
    createdAt: '2026-09-01T14:22:00.000Z',
    status: 'Dispatched',
    trackingNumber: 'FDX-992104812',
    carrier: 'FedEx International Priority',
    customer: {
      firstName: 'Julian',
      lastName: 'Vance',
      email: 'julian.vance@atelier.com',
      phone: '+1 (555) 234-8901',
      address: '450 West 33rd Street',
      apartment: 'Apt 14B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    items: [
      {
        productId: 'structured-wool-coat',
        title: 'Structured Wool Coat',
        price: 895,
        color: 'Onyx',
        size: '40R',
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnS6bAkuSkM-3rMYlhJLJoPXTKXMAT8x_B1m7Y8drGQ4LB5nvQtrhWZX1Ae8PEBvCYn-9HjvlaWGJY8ZoKerfodxkrXXZCzXMq3MJKbecsBsaQsBUwbb0FLr_EdKO46y1dM4Mps97Uy_Sb1adLxEvLGM2GdVdbGgtmQkvGAnmvs7AYj8tgFmWnJoJ34ZYmyMRfbd8mWBgmTHg5gK9qUUN0h2mTKZfTcuncS8t7gIo7kNENRN2cm4vf',
      },
      {
        productId: 'essential-oversized-tee',
        title: 'Essential Oversized Tee',
        price: 65,
        color: 'Alabaster',
        size: 'M',
        quantity: 2,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv2ZUuV1_fPZEHr4ykwqZEbSB-adPhw23KT14el_j3RzrEgvPSE_8jUsWrZiyfHHauwKNeo_pNvGt0JLOl6SS23sS9Y6hgsqa5V_QierVh4gtfhJ5oK6MPDmGjoGPaG3hkQqqIkcZZd05PznI-znHHBINN19sqteRnEmeDML5-Zk4nwR-DutbaZf-43vXg1lQy7SC00ra2XmWpcyqOSuRxxCHdwNLRHCLHkJj73VC5H2SKFd1VCUKS',
      },
    ],
    pricing: {
      subtotal: 1025,
      discountAmount: 102.5,
      discountCode: 'ZOVORO10',
      shipping: 0,
      shippingMethod: 'standard',
      tax: 81.87,
      total: 1004.37,
    },
    payment: {
      lastFour: '4242',
      method: 'card',
    },
  },
];

// In-Memory Database Class
class DataStore {
  private products: ProductItem[] = [...INITIAL_PRODUCTS];
  private reviews: ReviewItem[] = [...INITIAL_REVIEWS];
  private orders: OrderItem[] = [...INITIAL_ORDERS];
  private subscribers: Subscriber[] = [
    { email: 'vip@zovoro-archive.com', subscribedAt: '2026-08-01T10:00:00.000Z', source: 'footer' },
  ];
  private promoCodes: PromoCode[] = [
    { code: 'ZOVORO10', type: 'percentage', discountRate: 0.10, description: '10% off entire order', active: true },
    { code: 'EDITORIAL20', type: 'percentage', discountRate: 0.20, minSpend: 200, description: '20% off capsule purchases over $200', active: true },
    { code: 'ATELIER15', type: 'percentage', discountRate: 0.15, description: '15% welcome reduction', active: true },
    { code: 'FREESHIP', type: 'free_shipping', discountRate: 1.0, description: 'Complimentary white-glove shipping', active: true },
  ];

  // Product methods
  getProducts(query?: {
    category?: string;
    sort?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
  }): ProductItem[] {
    let list = [...this.products];

    if (query?.category && query.category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === query.category!.toLowerCase());
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (query?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= query.minPrice!);
    }

    if (query?.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= query.maxPrice!);
    }

    if (query?.size) {
      list = list.filter((p) => p.sizes.includes(query.size!));
    }

    // Sorting
    if (query?.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (query?.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (query?.sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (query?.sort === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }

  getProductById(id: string): ProductItem | undefined {
    return this.products.find((p) => p.id === id);
  }

  // Review methods
  getReviewsByProductId(productId: string): ReviewItem[] {
    return this.reviews.filter((r) => r.productId === productId);
  }

  addReview(productId: string, author: string, rating: number, title: string, comment: string): ReviewItem {
    const product = this.getProductById(productId);
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId,
      author: author.trim() || 'Verified Client',
      rating: Math.max(1, Math.min(5, rating)),
      title: title.trim() || 'Exceptional Quality',
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
    };

    this.reviews.unshift(newRev);

    // Update product rating and reviewsCount
    if (product) {
      const prodRevs = this.getReviewsByProductId(productId);
      const totalScore = prodRevs.reduce((acc, r) => acc + r.rating, 0);
      product.reviewsCount = prodRevs.length;
      product.rating = Number((totalScore / prodRevs.length).toFixed(1));
    }

    return newRev;
  }

  // Promo code validation
  validatePromo(code: string): { valid: boolean; promo?: PromoCode; message: string } {
    const normalized = code.trim().toUpperCase();
    const match = this.promoCodes.find((p) => p.code === normalized && p.active);
    if (!match) {
      return { valid: false, message: 'Invalid or expired promotional code' };
    }
    return {
      valid: true,
      promo: match,
      message: `${match.description}`,
    };
  }

  // Order management
  createOrder(orderData: Omit<OrderItem, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingNumber' | 'carrier'>): OrderItem {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ZVR-${randomSuffix}`;
    const trackingNumber = `FDX-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      trackingNumber,
      carrier: orderData.pricing.shippingMethod === 'express' ? 'FedEx Priority White-Glove' : 'FedEx Express Courier',
      ...orderData,
    };

    // Deduct stock
    for (const item of newOrder.items) {
      const prod = this.getProductById(item.productId);
      if (prod && prod.stockCount > 0) {
        prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
      }
    }

    this.orders.unshift(newOrder);
    return newOrder;
  }

  getOrder(query: string): OrderItem | undefined {
    const clean = query.trim().toUpperCase();
    return this.orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.customer.email.toLowerCase() === query.trim().toLowerCase() ||
        o.trackingNumber.toUpperCase() === clean
    );
  }

  getAllOrders(): OrderItem[] {
    return this.orders;
  }

  // Newsletter subscription
  subscribeNewsletter(email: string, source = 'web'): { success: boolean; message: string } {
    const clean = email.trim().toLowerCase();
    const existing = this.subscribers.find((s) => s.email === clean);
    if (existing) {
      return { success: true, message: 'You are already registered for the Atelier Dispatch.' };
    }
    this.subscribers.push({
      email: clean,
      subscribedAt: new Date().toISOString(),
      source,
    });
    return { success: true, message: 'Welcome to the ZOVORO Atelier. You will receive private capsule previews.' };
  }

  getSubscribersCount(): number {
    return this.subscribers.length;
  }
}

export const db = new DataStore();
