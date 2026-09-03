import { Router, Request, Response } from 'express';
import { db } from '../store';
import { GoogleGenAI } from '@google/genai';

export const apiRouter = Router();

// Lazy initialization of Gemini API
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch {
      aiClient = null;
    }
  }
  return aiClient;
}

// 1. Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ZOVORO Atelier Commerce API',
    version: '1.2.0',
  });
});

// 2. Get Products (with filtering, searching, and sorting)
apiRouter.get('/products', (req: Request, res: Response) => {
  try {
    const { category, sort, search, minPrice, maxPrice, size } = req.query;

    const products = db.getProducts({
      category: typeof category === 'string' ? category : undefined,
      sort: typeof sort === 'string' ? sort : undefined,
      search: typeof search === 'string' ? search : undefined,
      minPrice: typeof minPrice === 'string' ? Number(minPrice) : undefined,
      maxPrice: typeof maxPrice === 'string' ? Number(maxPrice) : undefined,
      size: typeof size === 'string' ? size : undefined,
    });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve garments' });
  }
});

// 3. Get single product by ID
apiRouter.get('/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Garment not found' });
  }
  res.json({ success: true, data: product });
});

// 4. Get reviews for a product
apiRouter.get('/products/:id/reviews', (req: Request, res: Response) => {
  const reviews = db.getReviewsByProductId(req.params.id);
  res.json({ success: true, data: reviews });
});

// 5. Add a verified review
apiRouter.post('/products/:id/reviews', (req: Request, res: Response) => {
  const { author, rating, title, comment } = req.body;
  if (!comment || !rating) {
    return res.status(400).json({ success: false, error: 'Rating and comment are required' });
  }

  const review = db.addReview(req.params.id, author || 'Verified Client', Number(rating), title || 'Editorial Review', comment);
  res.status(201).json({ success: true, data: review });
});

// 6. Validate Promo Code
apiRouter.post('/promo/validate', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, message: 'Please provide a valid promotional code' });
  }

  const validation = db.validatePromo(code);
  if (!validation.valid) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  res.json({
    success: true,
    code: validation.promo!.code,
    type: validation.promo!.type,
    discountRate: validation.promo!.discountRate,
    message: validation.message,
  });
});

// 7. Validate Cart / Calculate live quote
apiRouter.post('/cart/validate', (req: Request, res: Response) => {
  const { items, discountCode, shippingMethod } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, error: 'Items array is required' });
  }

  let subtotal = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = db.getProductById(item.productId);
    const price = product ? product.price : item.price || 0;
    const quantity = Math.max(1, item.quantity || 1);
    subtotal += price * quantity;

    validatedItems.push({
      productId: item.productId,
      title: product?.title || item.title,
      price,
      quantity,
      color: item.color,
      size: item.size,
      inStock: product ? product.stockCount >= quantity : true,
    });
  }

  let discountAmount = 0;
  if (discountCode) {
    const promo = db.validatePromo(discountCode);
    if (promo.valid && promo.promo) {
      if (promo.promo.type === 'percentage') {
        discountAmount = subtotal * promo.promo.discountRate;
      }
    }
  }

  const freeShippingThreshold = 150;
  let shippingCost = subtotal >= freeShippingThreshold ? 0 : 25;
  if (shippingMethod === 'express') {
    shippingCost = 25;
  }
  if (discountCode?.toUpperCase() === 'FREESHIP') {
    shippingCost = 0;
  }

  const tax = (subtotal - discountAmount) * 0.08875;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  res.json({
    success: true,
    items: validatedItems,
    pricing: {
      subtotal,
      discountAmount,
      shippingCost,
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    },
  });
});

// 8. Place Order
apiRouter.post('/orders', (req: Request, res: Response) => {
  try {
    const { customer, items, pricing, payment } = req.body;

    if (!customer || !customer.email || !customer.address) {
      return res.status(400).json({ success: false, error: 'Customer contact and shipping address are required' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart cannot be empty' });
    }

    const newOrder = db.createOrder({
      customer,
      items,
      pricing: {
        subtotal: Number(pricing?.subtotal) || 0,
        discountAmount: Number(pricing?.discountAmount) || 0,
        discountCode: pricing?.discountCode,
        shipping: Number(pricing?.shipping) || 0,
        shippingMethod: pricing?.shippingMethod || 'standard',
        tax: Number(pricing?.tax) || 0,
        total: Number(pricing?.total) || 0,
      },
      payment: {
        lastFour: payment?.lastFour || '4242',
        method: payment?.method || 'card',
      },
    });

    res.status(201).json({
      success: true,
      data: newOrder,
      message: `Order ${newOrder.orderNumber} placed successfully with ZOVORO Atelier.`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to authorize and process order.' });
  }
});

// 9. Lookup Order by ID or Email or Tracking
apiRouter.get('/orders/:id', (req: Request, res: Response) => {
  const order = db.getOrder(req.params.id);
  if (!order) {
    return res.status(404).json({
      success: false,
      error: `No archive record found for order or tracking reference "${req.params.id}"`,
    });
  }
  res.json({ success: true, data: order });
});

// 10. List recent orders ledger (for transparency & testing)
apiRouter.get('/orders', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: db.getAllOrders().length,
    data: db.getAllOrders(),
  });
});

// 11. Newsletter subscription
apiRouter.post('/newsletter', (req: Request, res: Response) => {
  const { email, source } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
  }

  const result = db.subscribeNewsletter(email, source || 'web');
  res.json(result);
});

// 12. AI Atelier Stylist Advisor (Gemini integration with graceful fallback)
apiRouter.post('/stylist', async (req: Request, res: Response) => {
  const { question, productId, currentLooks } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ success: false, error: 'A styling question is required' });
  }

  const ai = getAiClient();
  if (ai) {
    try {
      const prompt = `You are the lead styling director at ZOVORO, an avant-garde, minimalist luxury fashion atelier known for architectural silhouettes, brutalist tailoring, and monochromatic balance.
The customer asks: "${question}".
Product context if any: ${productId ? `Product ID: ${productId}` : 'General capsule query'}.
Other pieces in look: ${currentLooks ? JSON.stringify(currentLooks) : 'None specified'}.

Provide a concise, sophisticated, and authoritative 2-3 sentence styling recommendation. Emphasize proportions, negative space, fabric tension, and minimal accessories. Keep the tone elevated, restrained, and poetic without marketing clichés.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (response.text) {
        return res.json({
          success: true,
          source: 'gemini',
          advice: response.text.trim(),
        });
      }
    } catch (err) {
      // Fall through to fallback styling director response
      console.warn('Gemini API call failed, providing curated stylist response', err);
    }
  }

  // Curated editorial styling fallbacks based on question keywords
  const qLower = question.toLowerCase();
  let fallback = 'Balance oversized, architectural proportions with razor-sharp tailoring. Pair heavy 220gsm cotton with fluid worsted wool to create deliberate material contrast.';

  if (qLower.includes('coat') || qLower.includes('outerwear')) {
    fallback = 'Let the razor-sharp shoulder structure of the coat anchor the silhouette. Layer an Alabaster organic tee beneath with wide-leg pooling trousers for effortless volume.';
  } else if (qLower.includes('trouser') || qLower.includes('pant')) {
    fallback = 'The high-waisted pleats demand a clean tucked or cropped top line. Anchor with architectural boots or minimalist loafers so the hem pools naturally.';
  } else if (qLower.includes('accessory') || qLower.includes('shoe') || qLower.includes('bag')) {
    fallback = 'Exercise strict restraint: a single 925 sterling curb chain and the matte calfskin architectural tote maintain structural equilibrium without visual clutter.';
  } else if (qLower.includes('color') || qLower.includes('shade')) {
    fallback = 'Remain within monochromatic depth: juxtapose deep Onyx against Bone White and tactile Concrete to preserve the stark editorial mood.';
  }

  res.json({
    success: true,
    source: 'editorial-director',
    advice: fallback,
  });
});
