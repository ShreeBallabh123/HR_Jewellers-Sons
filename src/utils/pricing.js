/**
 * pricing.js — Core Jewellery Price Calculation Engine
 * Pure functions only — no React, no Firestore.
 * Supports: Gold (24K/22K/18K/14K), Silver, Platinum
 * Future-ready: Diamond, Regional, Multi-branch
 */

// ─── Purity multipliers relative to 24K ────────────────────────────────────
export const PURITY_MULTIPLIERS = {
  '24K': 1.0,
  '22K': 22 / 24,       // 0.9167
  '18K': 18 / 24,       // 0.75
  '14K': 14 / 24,       // 0.5833
  '9K':   9 / 24,       // 0.375
};

/**
 * Get the per-gram rate for a given gold purity.
 * @param {string} purity  — '24K' | '22K' | '18K' | '14K' | '9K'
 * @param {number} rate24k — 24K rate per 10 grams (as stored in Firestore)
 * @returns {number} per-gram rate
 */
export function getGoldRatePerGram(purity, rate24k) {
  const mul = PURITY_MULTIPLIERS[purity] ?? PURITY_MULTIPLIERS['22K'];
  // rate24k is stored as ₹ per 10 grams  →  divide by 10 for per-gram
  return (rate24k / 10) * mul;
}

/**
 * Core dynamic price formula.
 *
 * @param {Object} product — Product document from Firestore
 * @param {Object} rates   — Live rates object from RatesContext / Firestore
 *   rates.goldRate24k  {number}  — ₹ per 10g (24K)
 *   rates.goldRate22k  {number}  — ₹ per 10g (22K) [optional, derived if absent]
 *   rates.goldRate18k  {number}  — ₹ per 10g (18K) [optional, derived if absent]
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
  const weight           = parseFloat(product.goldWeight || product.netWeight || product.weight || 0);
  const makingType       = product.makingChargeType || 'percentage';   // 'fixed' | 'percentage'
  const makingValue      = parseFloat(product.makingChargeValue || product.makingCharges || 0);
  const stonePriceVal    = parseFloat(product.stonePrice || product.diamondValue || 0);
  const otherChargesVal  = parseFloat(product.otherCharges || 0);
  const gstPct           = parseFloat(product.gstPercentage || product.gstPercent || 3);

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
    let ratePerGram;
    if (purity === '22K' && rates.goldRate22k) {
      ratePerGram = rates.goldRate22k / 10;
    } else if (purity === '18K' && rates.goldRate18k) {
      ratePerGram = rates.goldRate18k / 10;
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
  const dbPrice = Number(product.price || 0);
  if (!dbPrice) return emptyBreakdown();

  const gstPct  = parseFloat(product.gstPercent || product.gstPercentage || 3);
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
    weight: parseFloat(product.netWeight || product.weight || 0),
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
  if (!amount && amount !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace('INR', '₹').trim();
}

/**
 * Derive 22K and 18K rates from 24K base rate.
 * Utility for admin who only enters 24K.
 */
export function deriveRates(goldRate24k) {
  return {
    goldRate24k:  Math.round(goldRate24k),
    goldRate22k:  Math.round(goldRate24k * (22 / 24)),
    goldRate18k:  Math.round(goldRate24k * (18 / 24)),
  };
}
