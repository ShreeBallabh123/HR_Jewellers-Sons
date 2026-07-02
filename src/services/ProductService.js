import { RateService } from './RateService';

export const ProductService = {
  // Filters a raw product list based on multiple active options
  filterProducts({
    products,
    categoryTab,
    metalFilter,
    minPrice,
    maxPrice,
    searchVal,
    goldRate24k,
    silverRate1kg
  }) {
    if (!Array.isArray(products)) return [];

    return products.filter((p) => {
      if (!p) return false;

      // 1. Category Tab Filter
      let matchesTab = true;
      if (categoryTab && categoryTab !== 'Collections') {
        const pName = String(p.name || '').toLowerCase();
        const pSub = String(p.subCategory || '').toLowerCase();
        const pCat = String(p.category || '').toLowerCase();

        const standardCategories = [
          'rings', 'earrings', 'necklace', 'necklaces', 'bracelets', 'bangles', 
          'anklets', 'mangalsutras', 'watch-jewellery', 'coins', 'gold coins',
          'chains', 'nose-pins', 'pendants', 'kada', 'm-kids', 'mens-jewellery',
          'silver-coin', 'silver coins', 'silver coin'
        ];

        if (categoryTab === 'Rings') {
          if (standardCategories.includes(pCat) && pCat !== 'rings') matchesTab = false;
          else matchesTab = pCat === 'rings' || /\bring(s)?\b/i.test(pSub) || /\bring(s)?\b/i.test(pName);
        } else if (categoryTab === 'Earrings') {
          if (standardCategories.includes(pCat) && pCat !== 'earrings') matchesTab = false;
          else matchesTab = pCat === 'earrings' || /\bearring(s)?\b/i.test(pSub) || /\bearring(s)?\b/i.test(pName) || /\bjhumka(s)?\b/i.test(pName);
        } else if (categoryTab === 'Necklace') {
          if (standardCategories.includes(pCat) && pCat !== 'necklace' && pCat !== 'necklaces') matchesTab = false;
          else matchesTab = pCat === 'necklace' || pCat === 'necklaces' || /\bnecklace(s)?\b/i.test(pSub) || /\bnecklace(s)?\b/i.test(pName);
        } else if (categoryTab === 'Mangalsutra') {
          if (standardCategories.includes(pCat) && pCat !== 'mangalsutra' && pCat !== 'mangalsutras') matchesTab = false;
          else matchesTab = pCat === 'mangalsutra' || pCat === 'mangalsutras' || /\bmangalsutra(s)?\b/i.test(pName);
        } else if (categoryTab === 'Bracelets') {
          if (standardCategories.includes(pCat) && pCat !== 'bracelets' && pCat !== 'bracelet') matchesTab = false;
          else matchesTab = pCat === 'bracelets' || pCat === 'bracelet' || /\bbracelet(s)?\b/i.test(pSub) || /\bbracelet(s)?\b/i.test(pName);
        } else if (categoryTab === 'Bangles') {
          if (standardCategories.includes(pCat) && pCat !== 'bangles' && pCat !== 'bangle') matchesTab = false;
          else matchesTab = pCat === 'bangles' || pCat === 'bangle' || /\bbangle(s)?\b/i.test(pSub) || /\bbangle(s)?\b/i.test(pName);
        } else if (categoryTab === 'Gold Coins') {
          if (standardCategories.includes(pCat) && pCat !== 'coins' && pCat !== 'gold coins') matchesTab = false;
          else matchesTab = pCat === 'gold coins' || pCat === 'coins' || /\bcoin(s)?\b/i.test(pName);
        } else if (categoryTab === 'Anklets') {
          if (standardCategories.includes(pCat) && pCat !== 'anklets' && pCat !== 'anklet') matchesTab = false;
          else matchesTab = pCat === 'anklets' || pCat === 'anklet' || /\banklet(s)?\b/i.test(pSub) || /\banklet(s)?\b/i.test(pName);
        } else if (categoryTab === 'Men Jewellery') {
          if (standardCategories.includes(pCat) && pCat !== 'men' && pCat !== 'mens-jewellery') matchesTab = false;
          else matchesTab = pCat === 'men' || pCat === 'mens-jewellery' || /\bmen(s)?\b/i.test(pName);
        } else if (categoryTab === 'Kids Jewellery') {
          if (standardCategories.includes(pCat) && pCat !== 'kids' && pCat !== 'm-kids') matchesTab = false;
          else matchesTab = pCat === 'kids' || pCat === 'm-kids' || /\bkid(s)?\b/i.test(pName);
        } else if (categoryTab === 'Gifts & Pooja') {
          matchesTab = pCat === 'pooja' || /\bpooja\b/i.test(pSub) || /\bgift(s)?\b/i.test(pSub) || /\bthali\b/i.test(pName);
        }
      }

      if (!matchesTab) return false;

      // 2. Metal Filter
      if (metalFilter && metalFilter !== 'all') {
        const pMetal = String(p.metal || p.metalType || 'gold').toLowerCase();
        if (pMetal !== metalFilter.toLowerCase()) return false;
      }

      // 3. Price Filter (calculated dynamically)
      const calculatedInfo = RateService.calculateProductPrice(p, goldRate24k, silverRate1kg);
      const computedPrice = calculatedInfo.total || Number(p.price || 0);

      if (computedPrice < minPrice || computedPrice > maxPrice) return false;

      // 4. Search Query Filter
      if (searchVal) {
        const queryStr = searchVal.toLowerCase();
        const matchesQuery = 
          String(p.name || '').toLowerCase().includes(queryStr) ||
          String(p.desc || p.description || '').toLowerCase().includes(queryStr) ||
          String(p.category || '').toLowerCase().includes(queryStr) ||
          String(p.subCategory || '').toLowerCase().includes(queryStr);
        if (!matchesQuery) return false;
      }

      return true;
    });
  },

  // Sorts a list of products
  sortProducts(productsList, sortOption, goldRate24k, silverRate1kg) {
    const listCopy = [...productsList];
    return listCopy.sort((a, b) => {
      const priceA = RateService.calculateProductPrice(a, goldRate24k, silverRate1kg).total;
      const priceB = RateService.calculateProductPrice(b, goldRate24k, silverRate1kg).total;

      if (sortOption === 'low-to-high') return priceA - priceB;
      if (sortOption === 'high-to-low') return priceB - priceA;
      
      // Default / Newest: assume ID or date
      return String(b.id).localeCompare(String(a.id));
    });
  }
};
