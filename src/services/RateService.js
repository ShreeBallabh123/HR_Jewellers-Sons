import { calculateDynamicPrice, formatINR as _formatINR } from '../utils/pricing';

export const RateService = {
  // Convert 24k gold rate to 22k rate
  convert24kTo22k(rate24k) {
    return Math.round(rate24k * (22 / 24));
  },

  // Convert 1kg silver rate to 1g silver rate
  convertKgToGramSilver(rateSilver1kg) {
    return Number((rateSilver1kg / 1000).toFixed(2));
  },

  /**
   * Calculate product price.
   * If product.priceCalculationMode === 'dynamic', uses live rates from pricing.js formula.
   * Otherwise falls back to stored price (backward compatible).
   */
  calculateProductPrice(product, rate24k = 78500, rateSilver1kg = 92000) {
    if (!product) return { baseMetalValue: 0, makingCharges: 0, gst: 0, total: 0 };

    const rates = {
      goldRate24k:   rate24k,
      goldRate22k:   Math.round(rate24k * (22 / 24)),
      goldRate18k:   Math.round(rate24k * (18 / 24)),
      silverRate:    rateSilver1kg,
      silverRate1kg: rateSilver1kg,
      platinumRate:  3500,
    };

    const result = calculateDynamicPrice(product, rates);

    // Return in legacy shape for full backward compat with existing call sites
    return {
      baseMetalValue: result.goldValue,
      makingCharges:  result.makingCharge,
      stonePrice:     result.stonePrice,
      otherCharges:   result.otherCharges,
      gst:            result.gst,
      subtotal:       result.subtotal,
      total:          result.total,
      metalType:      result.metalType,
      isLive:         result.isLive,
    };
  },

  // Format currency
  formatINR(amount) {
    return _formatINR(amount);
  }
};
