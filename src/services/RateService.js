export const RateService = {
  // Convert 24k gold rate to 22k rate
  convert24kTo22k(rate24k) {
    return Math.round(rate24k * 0.9167);
  },

  // Convert 1kg silver rate to 1g silver rate
  convertKgToGramSilver(rateSilver1kg) {
    return Number((rateSilver1kg / 1000).toFixed(2));
  },

  // Calculate product base pricing
  calculateProductPrice(product, rate24k, rateSilver1kg = 92000) {
    if (!product) return { baseMetalValue: 0, makingCharges: 0, gst: 0, total: 0 };
    
    // Auto-detect metal type for display / categorisation purposes
    let metalType = (product.metal || product.metalType || '').toLowerCase();
    const purity = String(product.metalPurity || product.carat || '').toLowerCase();
    const name = String(product.name || '').toLowerCase();
    const desc = String(product.desc || product.description || '').toLowerCase();
    const cat = String(product.category || '').toLowerCase();
    const catType = (product.categoryType || '').toLowerCase();

    if (!metalType) {
      if (purity.includes('92.5') || purity.includes('925') || name.includes('silver') ||
          desc.includes('silver') || cat.includes('silver') || catType.includes('silver')) {
        metalType = 'silver';
      } else {
        metalType = 'gold';
      }
    }

    // Use the admin-entered DB price as the source of truth for all products.
    // Dynamic calculation is only used as a fallback when price is not set.
    const dbPrice = Number(product.price || 0);

    if (dbPrice > 0) {
      // Price exists in DB — use it directly (inclusive of GST already or exclusive?)
      // In Indian jewellery, price shown is typically GST-inclusive.
      // We extract 3% GST back to show breakup.
      const productGstRate = (Number(product.gstPercent) || 3) / 100;
      const gst = Math.round(dbPrice * productGstRate / (1 + productGstRate));
      const subtotal = dbPrice - gst;
      return {
        baseMetalValue: subtotal,
        makingCharges: 0,
        gst: gst,
        total: dbPrice,
        metalType,
      };
    }

    // Fallback: dynamically estimate price when DB price is absent
    const finalPurity = purity || '22k';
    const weight = parseFloat(product.netWeight) || parseFloat(product.weight) || parseFloat(product.weightGm) || 0;
    const makingChargesValue = parseFloat(product.makingCharges) || 0;

    let baseRate = 0;
    if (metalType === 'silver') {
      baseRate = rateSilver1kg / 1000;
    } else {
      let purityMultiplier = 0.9167; // 22k default
      if (finalPurity.includes('24') || finalPurity.includes('999')) purityMultiplier = 1.0;
      else if (finalPurity.includes('22')) purityMultiplier = 0.9167;
      else if (finalPurity.includes('20')) purityMultiplier = 0.8333;
      else if (finalPurity.includes('18')) purityMultiplier = 0.75;
      else if (finalPurity.includes('14')) purityMultiplier = 0.5833;
      else if (finalPurity.includes('9k')) purityMultiplier = 0.375;
      baseRate = (rate24k / 10) * purityMultiplier;
    }

    const baseMetalValue = baseRate * weight;
    // Treat making charges as % of metal value when no type info
    const makingCharges = baseMetalValue * (makingChargesValue / 100);
    const subtotal = baseMetalValue + makingCharges;
    const gst = subtotal * 0.03;

    return {
      baseMetalValue: Math.round(baseMetalValue),
      makingCharges: Math.round(makingCharges),
      gst: Math.round(gst),
      total: Math.round(subtotal + gst),
      metalType,
    };
  },

  // Format currency
  formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount).replace('INR', '₹');
  }
};
