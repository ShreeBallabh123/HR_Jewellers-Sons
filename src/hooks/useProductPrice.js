/**
 * useProductPrice.js — Memoized product price hook
 * Uses live rates from RatesContext + pure pricing formula.
 * Backward-compatible: products without priceCalculationMode use stored price.
 */
import { useMemo } from 'react';
import { useRates } from './useRates';
import { calculateDynamicPrice } from '../utils/pricing';

/**
 * Returns the full price breakdown for a single product.
 * Recalculates only when product or rates change.
 *
 * @param {Object} product — Firestore product document
 * @returns {{ goldValue, makingCharge, stonePrice, otherCharges, subtotal, gst, total, isLive, purity, weight }}
 */
export function useProductPrice(product) {
  const rates = useRates();

  return useMemo(() => {
    if (!product) return null;
    return calculateDynamicPrice(product, {
      goldRate24k:  rates.goldRate24k,
      goldRate22k:  rates.goldRate22k,
      goldRate18k:  rates.goldRate18k  || Math.round(rates.goldRate24k * 0.75),
      silverRate:   rates.silverRate   || rates.silverRate1kg,
      platinumRate: rates.platinumRate || 3500,
    });
  }, [
    product,
    rates.goldRate24k,
    rates.goldRate22k,
    rates.goldRate18k,
    rates.silverRate,
    rates.silverRate1kg,
    rates.platinumRate,
  ]);
}

/**
 * Returns just the final total price (integer) for a product.
 * Lightweight version for product cards/lists.
 */
export function useProductTotal(product) {
  const breakdown = useProductPrice(product);
  return breakdown?.total ?? 0;
}

export default useProductPrice;
