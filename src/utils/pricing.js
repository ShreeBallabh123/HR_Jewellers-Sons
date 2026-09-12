/**
 * pricing.js — Core Jewellery Price Calculation Engine
 * Pure functions only — no React, no Firestore.
 * Supports: Gold (24K/22K/18K/14K), Silver, Platinum
 * Future-ready: Diamond, Regional, Multi-branch
 */

// ─── Purity multipliers relative to 24K ────────────────────────────────────
export const PURITY_MULTIPLIERS = {
  '24K': 1.0,
  '22K': 22 / 24,       // 0.9167 (91.67%)
  '20K': 20 / 24,       // 0.8333 (83.33%)
  '18K': 18 / 24,       // 0.75   (75.00%)
  '14K': 14 / 24,       // 0.5833 (58.33%)
  '9K':   9 / 24,       // 0.375
};

export const DEFAULT_PURITY_PERCENTAGES = {
  '24K': 100.00,
  '22K': 91.67,
  '20K': 83.33,
  '18K': 75.00,
  '14K': 58.33,
};

/**
 * Parse floats safely by stripping any currency symbols, commas, or spaces.
 */
export function safeParseFloat(val) {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get the per-gram rate for a given gold purity.
 * @param {string} purity  — '24K' | '22K' | '20K' | '18K' | '14K' | '9K'
 * @param {number} rate24k — 24K rate per 10 grams (as stored in Firestore)
 * @returns {number} per-gram rate
 */
export function getGoldRatePerGram(purity, rate24k) {
  const normalized = (purity || '').toUpperCase().replace(/T$/, '').trim();
  const mul = PURITY_MULTIPLIERS[normalized] ?? PURITY_MULTIPLIERS[purity] ?? PURITY_MULTIPLIERS['22K'];
  // rate24k is stored as ₹ per 10 grams  →  divide by 10 for per-gram
  return (safeParseFloat(rate24k) / 10) * mul;
}

/**
 * Core dynamic price formula.
 *
 * @param {Object} product — Product document from Firestore
 * @param {Object} rates   — Live rates object from RatesContext / Firestore
 *   rates.goldRate24k  {number}  — ₹ per 10g (24K)
 *   rates.goldRate22k  {number}  — ₹ per 10g (22K) [optional, derived if absent]
 *   rates.goldRate20k  {number}  — ₹ per 10g (20K) [optional, derived if absent]
 *   rates.goldRate18k  {number}  — ₹ per 10g (18K) [optional, derived if absent]
 *   rates.goldRate14k  {number}  — ₹ per 10g (14K) [optional, derived if absent]
 *   rates.silverRate   {number}  — ₹ per kg
 *   rates.platinumRate {number}  — ₹ per gram
 *
 * @returns {{ goldValue, makingCharge, stonePrice, otherCharges, subtotal, gst, total, metalType, isLive }}
 */
export function calculateDynamicPrice(product, rates = {}) {
  if (!product) {
    return emptyBreakdown();
  }

  // ── 1. Determine calculation mode ────────────────────────────────────────
  const mode = product.priceCalculationMode || 'manual';

  if (mode !== 'dynamic') {
    // Legacy / manual mode: use stored price
    return calculateManualBreakdown(product);
  }

  // ── 2. Read product pricing inputs ───────────────────────────────────────
  const purity           = product.goldPurity || product.carat || '22K';
  const weight           = safeParseFloat(product.goldWeight || product.netWeight || product.weight || 0);
  const makingType       = product.makingChargeType || 'percentage';   // 'fixed' | 'percentage'
  const makingValue      = safeParseFloat(product.makingChargeValue || product.makingCharges || 0);
  const stonePriceVal    = safeParseFloat(product.stonePrice || product.diamondValue || 0);
  const otherChargesVal  = safeParseFloat(product.otherCharges || 0);
  const gstPct           = safeParseFloat(product.gstPercentage || product.gstPercent || 3);

  // ── 3. Detect metal type ──────────────────────────────────────────────────
  const metalType = detectMetalType(product);

  // ── 4. Calculate base metal value ────────────────────────────────────────
  let goldValue = 0;

  if (metalType === 'silver') {
    const silverRate1g = (rates.silverRate || rates.silverRate1kg || 92000) / 1000;
    goldValue = silverRate1g * weight;
  } else if (metalType === 'platinum') {
    const ptRate = rates.platinumRate || 3500;
    goldValue = ptRate * weight;
  } else {
    // Gold — resolve per-gram rate for the purity
    const normalized = (purity || '').toUpperCase().replace(/T$/, '').trim();
    let ratePerGram;
    if ((normalized === '24K' || normalized === '24') && rates.goldRate24k) {
      ratePerGram = rates.goldRate24k / 10;
    } else if ((normalized === '22K' || normalized === '22') && rates.goldRate22k) {
      ratePerGram = rates.goldRate22k / 10;
    } else if ((normalized === '20K' || normalized === '20') && rates.goldRate20k) {
      ratePerGram = rates.goldRate20k / 10;
    } else if ((normalized === '18K' || normalized === '18') && rates.goldRate18k) {
      ratePerGram = rates.goldRate18k / 10;
    } else if ((normalized === '14K' || normalized === '14') && rates.goldRate14k) {
      ratePerGram = rates.goldRate14k / 10;
    } else {
      // derive from 24K
      ratePerGram = getGoldRatePerGram(purity, rates.goldRate24k || 78500);
    }
    goldValue = ratePerGram * weight;
  }

  // ── 5. Making charges ────────────────────────────────────────────────────
  let makingCharge = 0;
  if (makingType === 'fixed') {
    makingCharge = makingValue;
  } else {
    // percentage of gold value
    makingCharge = goldValue * (makingValue / 100);
  }

  // ── 6. Subtotal & GST ────────────────────────────────────────────────────
  const subtotal = goldValue + makingCharge + stonePriceVal + otherChargesVal;
  const gst      = subtotal * (gstPct / 100);
  const total    = subtotal + gst;

  return {
    goldValue:    Math.round(goldValue),
    makingCharge: Math.round(makingCharge),
    stonePrice:   Math.round(stonePriceVal),
    otherCharges: Math.round(otherChargesVal),
    subtotal:     Math.round(subtotal),
    gst:          Math.round(gst),
    total:        Math.round(total),
    metalType,
    isLive:       true,
    purity,
    weight,
    makingType,
    gstPct,
  };
}

/**
 * Backward-compatible manual/legacy breakdown.
 * Reverse-engineers GST from stored price.
 */
export function calculateManualBreakdown(product) {
  const dbPrice = safeParseFloat(product.price);
  if (!dbPrice) return emptyBreakdown();

  const gstPct  = safeParseFloat(product.gstPercent || product.gstPercentage || 3);
  const gstRate = gstPct / 100;
  const gst     = Math.round(dbPrice * gstRate);
  const subtotal= dbPrice;

  return {
    goldValue:    subtotal,
    makingCharge: 0,
    stonePrice:   0,
    otherCharges: 0,
    subtotal,
    gst,
    total: dbPrice + gst,
    metalType: detectMetalType(product),
    isLive: false,
    purity: product.carat || product.goldPurity || '22K',
    weight: safeParseFloat(product.netWeight || product.weight || 0),
    makingType: 'fixed',
    gstPct,
  };
}

/** Detects metal type from product fields */
export function detectMetalType(product) {
  const metal   = (product.metal || product.metalType || '').toLowerCase();
  const purity  = (product.metalPurity || product.carat || product.goldPurity || '').toLowerCase();
  const name    = (product.name || '').toLowerCase();
  const cat     = (product.category || '').toLowerCase();
  const catType = (product.categoryType || '').toLowerCase();

  if (metal === 'silver' || purity.includes('92.5') || purity.includes('925') ||
      name.includes('silver') || cat.includes('silver') || catType.includes('silver')) {
    return 'silver';
  }
  if (metal === 'platinum' || name.includes('platinum') || cat.includes('platinum')) {
    return 'platinum';
  }
  if (metal === 'diamond' || name.includes('diamond') || cat.includes('diamond')) {
    return 'diamond';
  }
  return 'gold';
}

/** Returns zero-value breakdown */
function emptyBreakdown() {
  return {
    goldValue: 0, makingCharge: 0, stonePrice: 0,
    otherCharges: 0, subtotal: 0, gst: 0, total: 0,
    metalType: 'gold', isLive: false, purity: '22K', weight: 0,
    makingType: 'percentage', gstPct: 3,
  };
}

/**
 * Format a number as Indian Rupees.
 * @param {number} amount
 * @returns {string} e.g. "₹1,23,456"
 */
export function formatINR(amount) {
  const num = safeParseFloat(amount);
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Derive 22K, 20K, 18K and 14K rates from 24K base rate.
 * Formula:
 * 24K = 24K × 100%
 * 22K = 24K × [X%] (default 91.67%)
 * 20K = 24K × [X%] (default 83.33%)
 * 18K = 24K × [X%] (default 75.00%)
 * 14K = 24K × [X%] (default 58.33%)
 */
export function deriveRates(goldRate24k, customPercentages = {}) {
  const base24k = safeParseFloat(goldRate24k);
  const p22 = safeParseFloat(customPercentages['22K'] ?? customPercentages['22k'] ?? DEFAULT_PURITY_PERCENTAGES['22K']);
  const p20 = safeParseFloat(customPercentages['20K'] ?? customPercentages['20k'] ?? DEFAULT_PURITY_PERCENTAGES['20K']);
  const p18 = safeParseFloat(customPercentages['18K'] ?? customPercentages['18k'] ?? DEFAULT_PURITY_PERCENTAGES['18K']);
  const p14 = safeParseFloat(customPercentages['14K'] ?? customPercentages['14k'] ?? DEFAULT_PURITY_PERCENTAGES['14K']);

  return {
    goldRate24k: Math.round(base24k),
    goldRate22k: Math.round(base24k * (p22 / 100)),
    goldRate20k: Math.round(base24k * (p20 / 100)),
    goldRate18k: Math.round(base24k * (p18 / 100)),
    goldRate14k: Math.round(base24k * (p14 / 100)),
    percentages: {
      '24K': 100,
      '22K': p22,
      '20K': p20,
      '18K': p18,
      '14K': p14,
    }
  };
}
