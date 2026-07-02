/**
 * HR Jewellers & Sons — Global Constants
 */

// ─── BUSINESS CONFIG ──────────────────────────────────────────
export const BUSINESS = Object.freeze({
  NAME: 'HR Jewellers & Sons',
  WHATSAPP_NUMBER: '919783843978',
  PHONE_PRIMARY: '+91-9783843978',
  EMAIL: 'admin@hrjewellers.com',
  ADDRESS: 'Station Road, Kote Gate, Bikaner, Rajasthan 344001',
  MAPS_URL: 'https://maps.google.com/?q=HR+Jewellers+Bikaner',
  SITE_URL: 'https://hr-soni.vercel.app',
  ESTABLISHED_YEAR: 1952,
});

// ─── API ENDPOINTS ─────────────────────────────────────────────
export const API = Object.freeze({
  GOLD_PRICE: 'https://api.gold-api.com/price/XAU',
  SILVER_PRICE: 'https://api.gold-api.com/price/XAG',
  EXCHANGE_RATE: 'https://open.er-api.com/v6/latest/USD',
});

// ─── STORAGE KEYS ──────────────────────────────────────────────
export const STORAGE_KEYS = Object.freeze({
  WISHLIST: 'hr_wishlist',
  CART: 'hr_cart',
  RECENTLY_VIEWED: 'hr_recently_viewed',
  ADMIN_SESSION: 'hrj_admin_user',
  ADMIN_ROLE: 'hrj_admin_role',
});

// ─── METAL RATES ───────────────────────────────────────────────
export const DEFAULT_RATES = Object.freeze({
  GOLD: { '24K': 7788, '22K': 7250, '18K': 5940 },
  SILVER: { '999': 95, '925': 88 },
});

export const METAL_CONSTANTS = Object.freeze({
  TROY_OUNCE_GRAMS: 31.1034768,
  PREMIUM_MULTIPLIER: 1.15,
  GOLD_22K_RATIO: 0.9167,
  GOLD_18K_RATIO: 0.75,
  SILVER_925_RATIO: 0.925,
  GST_RATE: 0.03,
  RATES_CACHE_DURATION_MS: 30 * 60 * 1000,
});

// ─── UI TIMING ─────────────────────────────────────────────────
export const TIMING = Object.freeze({
  SEARCH_DEBOUNCE_MS: 300,
  API_TIMEOUT_MS: 8000,
  API_RETRY_COUNT: 2,
});

// ─── VALIDATION ────────────────────────────────────────────────
export const VALIDATION = Object.freeze({
  PHONE_REGEX: /^[6-9]\d{9}$/,
  WEIGHT_MIN_GRAMS: 0.1,
  WEIGHT_MAX_GRAMS: 5000,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
});

// ─── ROUTES ────────────────────────────────────────────────────
export const ROUTES = Object.freeze({
  HOME: 'home',
  COLLECTIONS: 'collections',
  SAVINGS: 'savings',
  GOLD_RESERVE: 'gold-reserve',
  OFFERS: 'offers',
  PRODUCT_DETAIL: 'product-detail',
  HERITAGE: 'heritage',
  VALUATION: 'valuation',
  GOLD_COINS: 'gold-coins',
  SHOWROOMS: 'showrooms',
  SAVINGS_ENROLL: 'savings-enroll',
  CHECKOUT: 'checkout',
  TERMS: 'terms-and-conditions',
  PRIVACY: 'privacy-policy',
  ADMIN: 'admin',
});
