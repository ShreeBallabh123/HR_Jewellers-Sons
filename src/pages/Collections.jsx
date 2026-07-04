import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useWishlist } from '../hooks/useWishlist';
import { useRates } from '../hooks/useRates';
import Modal from '../components/Modal';
import BookingForm from '../forms/BookingForm';

// Asset Imports
import banner1 from '../assets/banner_1.png';
import banner2 from '../assets/banner_2.webp';

const ITEMS_PER_PAGE = 12;


function BannerCarousel({ banners }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = banners.length;
  useEffect(() => {
    if (paused || len < 2) return;
    const t = setInterval(() => setActive(p => (p + 1) % len), 3500);
    return () => clearInterval(t);
  }, [paused, len]);
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: '2400/778' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Offer Banner ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 1 : 0 }}
          draggable={false}
        />
      ))}
      {/* Prev */}
      <button
        onClick={() => setActive(p => (p - 1 + len) % len)}
        className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 text-white text-sm sm:text-xl flex items-center justify-center backdrop-blur-sm cursor-pointer focus:outline-none transition-all border-none"
        aria-label="Previous"
      >&#8249;</button>
      {/* Next */}
      <button
        onClick={() => setActive(p => (p + 1) % len)}
        className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 text-white text-sm sm:text-xl flex items-center justify-center backdrop-blur-sm cursor-pointer focus:outline-none transition-all border-none"
        aria-label="Next"
      >&#8250;</button>
    </div>
  );
}

export default function Collections({
  activeCategoryTab: initialCategoryTab = 'Collections',
  setActiveCategoryTab: onCategoryTabChange,
  metalFilter: externalMetalFilter,
  setMetalFilter: setExternalMetalFilter,
  purityFilter: externalPurityFilter,
  setPurityFilter: setExternalPurityFilter,
  maxPriceFilter: externalMaxPrice,
  setMaxPriceFilter: setExternalMaxPrice,
  genderFilter: externalGenderFilter,
  setGenderFilter: setExternalGenderFilter,
  navigateToPDP,
  triggerAudio: triggerAudioProp,
}) {
  // Data from context — no prop drilling
  const { products = [], categories = [], loading: catalogLoading } = useProducts();
  const { wishlistItems = [], toggleWishlist } = useWishlist();
  const { calculatePrice } = useRates();

  // Safe audio helper
  const triggerAudio = (type) => { try { triggerAudioProp?.(type); } catch { /* noop */ } };

  // All filter state (self-contained)
  const [activeCategoryTab, setActiveCategoryTab] = useState(initialCategoryTab);
  const [metalFilter, setMetalFilter] = useState(externalMetalFilter || 'all');
  const [purityFilter, setPurityFilter] = useState(externalPurityFilter || 'all');
  const [maxPriceFilter, setMaxPriceFilter] = useState(externalMaxPrice || 100000000);
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState(externalGenderFilter || 'all');
  const [stoneFilter, setStoneFilter] = useState('all');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('popularity');
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [customDesignOpen, setCustomDesignOpen] = useState(false);
  const [consultationModal, setConsultationModal] = useState(false);
  const isCatalogDark = false;

  // Sync external filter props when they change (from nav bar clicks)
  useEffect(() => { if (externalMetalFilter !== undefined) setMetalFilter(externalMetalFilter); }, [externalMetalFilter]);
  useEffect(() => { if (externalPurityFilter !== undefined) setPurityFilter(externalPurityFilter); }, [externalPurityFilter]);
  useEffect(() => { if (externalMaxPrice !== undefined) setMaxPriceFilter(externalMaxPrice); }, [externalMaxPrice]);
  useEffect(() => { setActiveCategoryTab(initialCategoryTab); }, [initialCategoryTab]);

  const changeCategoryTab = (tab) => {
    setActiveCategoryTab(tab);
    setCollectionsPage(1);
    onCategoryTabChange?.(tab);
  };

  // Build categoryFilters from Firestore categories + static list
  const categoryFilters = useMemo(() => {
    const base = ['Collections', 'Rings', 'Earrings', 'Necklaces', 'Pendants', 'Bangles', 'Bracelets', 'Mangalsutra', 'Anklets', 'Nose Pins', 'Solitaires', 'Kids Jewellery', 'Silver'];
    const fromDB = (categories || []).map(c => c.name || c.label || c.id).filter(Boolean);
    return [...new Set([...base, ...fromDB])];
  }, [categories]);

  // Filtered + sorted products
  const filteredJewellery = useMemo(() => {
    let result = [...(products || [])];
    if (activeCategoryTab && activeCategoryTab !== 'Collections') {
      const tab = activeCategoryTab.toLowerCase();
      result = result.filter(p => {
        const cat = String(p.category || '').toLowerCase();
        const subCat = String(p.subCategory || '').toLowerCase();
        const name = String(p.name || '').toLowerCase();
        return cat.includes(tab) || subCat.includes(tab) || name.includes(tab);
      });
    }
    if (metalFilter !== 'all') result = result.filter(p => String(p.metal || p.metalType || '').toLowerCase().includes(metalFilter));
    if (purityFilter !== 'all') result = result.filter(p => String(p.carat || p.purity || '').toLowerCase().includes(purityFilter.toLowerCase()));
    if (maxPriceFilter < 100000000) result = result.filter(p => calculatePrice(p).total <= maxPriceFilter);
    if (stoneFilter !== 'all') result = result.filter(p => String(p.stone || p.gemstone || '').toLowerCase().includes(stoneFilter.toLowerCase()));
    if (genderFilter !== 'all') result = result.filter(p => String(p.gender || '').toLowerCase().includes(genderFilter.toLowerCase()));
    if (occasionFilter !== 'all') result = result.filter(p => String(p.occasion || '').toLowerCase().includes(occasionFilter.toLowerCase()));
    switch (sortFilter) {
      case 'price_low': result.sort((a, b) => calculatePrice(a).total - calculatePrice(b).total); break;
      case 'price_high': result.sort((a, b) => calculatePrice(b).total - calculatePrice(a).total); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
      default: break;
    }
    return result;
  }, [products, activeCategoryTab, metalFilter, purityFilter, maxPriceFilter, stoneFilter, genderFilter, occasionFilter, sortFilter, calculatePrice]);

  const totalPages = 1;
  const paginatedProducts = useMemo(() => {
    return filteredJewellery;
  }, [filteredJewellery]);

  // Reset to page 1 when filters change
  useEffect(() => { setCollectionsPage(1); }, [activeCategoryTab, metalFilter, purityFilter, maxPriceFilter, stoneFilter, genderFilter, occasionFilter, sortFilter]);

  // Bidirectional sync for genderFilter state
  useEffect(() => {
    if (externalGenderFilter !== undefined && externalGenderFilter !== genderFilter) {
      setGenderFilter(externalGenderFilter);
    }
  }, [externalGenderFilter]);

  useEffect(() => {
    setExternalGenderFilter?.(genderFilter);
  }, [genderFilter, setExternalGenderFilter]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0';
    return Number(price).toLocaleString('en-IN');
  };

  return (
    <>
      {/* SORT + FILTER STICKY BAR FOR MOBILE ONLY */}

      <div className={`lg:hidden fixed bottom-0 left-0 w-full z-30 border-t flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors duration-500 ${isCatalogDark
        ? "bg-[#1D0E29]/95 border-gold/15 text-white shadow-2xl"
        : "bg-[#FCFAFF]/95 border-[#DDA0DD]/20 text-[#4A126D]"
        }`}>
        {/* Pincode */}
        <button
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest border-r bg-transparent border-none active:bg-black/5 transition-colors ${isCatalogDark ? "border-gold/15 text-white active:bg-white/5" : "border-[#DDA0DD]/20 text-[#4A126D] active:bg-black/5"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Pincode
        </button>
        {/* Sort */}
        <button
          onClick={() => { triggerAudio('click'); setMobileSortOpen(true); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest border-r bg-transparent border-none active:bg-black/5 transition-colors ${isCatalogDark ? "border-gold/15 text-white active:bg-white/5" : "border-[#DDA0DD]/20 text-[#4A126D] active:bg-black/5"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
          Sort
        </button>
        {/* Filter */}
        <button
          onClick={() => { triggerAudio('click'); setMobileFilterOpen(true); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest bg-transparent border-none active:bg-black/5 transition-colors ${isCatalogDark ? "text-white active:bg-white/5" : "text-[#4A126D] active:bg-black/5"
            }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Filter
        </button>
      </div>

      {/* MOBILE SORT DRAWER */}
      <AnimatePresence>
        {mobileSortOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setMobileSortOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] bg-white rounded-t-2xl shadow-2xl max-h-[50vh] overflow-hidden"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>
              <div className="px-5 pb-2 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-sm font-bold text-[#4A126D] serif-luxury">Sort By</h3>
                <button onClick={() => setMobileSortOpen(false)} className="text-gray-400 hover:text-[#4A126D] transition-colors p-1 cursor-pointer border-none bg-transparent">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="py-2 px-5 space-y-0 text-left">
                {[
                  { val: 'popularity', label: 'Popularity' },
                  { val: 'newest', label: 'Newest First' },
                  { val: 'price_low', label: 'Price: Low to High' },
                  { val: 'price_high', label: 'Price: High to Low' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => { setSortFilter(opt.val); setMobileSortOpen(false); triggerAudio('click'); }}
                    className={`w-full text-left py-3 px-3 rounded-lg text-xs font-sans transition-colors cursor-pointer border-none ${sortFilter === opt.val ? 'bg-[#4A126D]/8 text-[#4A126D] font-bold' : 'text-gray-600 hover:bg-gray-50 bg-transparent'}`}
                  >
                    {sortFilter === opt.val && <span className="mr-2">✓</span>}
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] bg-white rounded-t-2xl shadow-2xl flex flex-col"
              style={{ maxHeight: '85vh' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-2 pb-1 shrink-0">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              {/* Header */}
              <div className="px-4 pb-2 flex justify-between items-center border-b border-gray-100 shrink-0">
                <h3 className="text-sm font-bold text-[#4A126D] serif-luxury flex items-center gap-1.5">
                  <span className="text-xs">✨</span> Filters
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setMetalFilter('all'); setPurityFilter('all'); setMaxPriceFilter(100000000); setPriceFilter('all'); setTypeFilter('all'); setGenderFilter('all'); setStoneFilter('all'); setOccasionFilter('all'); }}
                    className="text-[8px] uppercase tracking-widest font-black text-[#DDA0DD] hover:text-[#4A126D] transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Clear All
                  </button>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-gray-400 hover:text-[#4A126D] transition-colors p-1 cursor-pointer border-none bg-transparent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Filter Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-left" style={{ scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent' }}>

                {/* METAL TYPE — Quick Select */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Metal Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMetalFilter(prev => prev === 'gold' ? 'all' : 'gold')}
                      className={`relative flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${metalFilter === 'gold' ? 'border-[#C8960C] shadow-[0_4px_12px_rgba(200,150,12,0.25)]' : 'border-gray-200 bg-white'}`}
                      style={{ background: metalFilter === 'gold' ? 'linear-gradient(135deg, #FFF8E7, #FFF0B3)' : 'white' }}
                    >
                      <span className="text-2xl">🥇</span>
                      <span className={`text-[10px] font-extrabold tracking-wide font-sans ${metalFilter === 'gold' ? 'text-[#A07820]' : 'text-gray-500'}`}>GOLD</span>
                      {metalFilter === 'gold' && <span className="absolute top-1 right-1 w-4 h-4 bg-[#C8960C] rounded-full flex items-center justify-center"><svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="white"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                    </button>
                    <button
                      onClick={() => setMetalFilter(prev => prev === 'silver' ? 'all' : 'silver')}
                      className={`relative flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${metalFilter === 'silver' ? 'border-[#718096] shadow-[0_4px_12px_rgba(113,128,150,0.20)]' : 'border-gray-200 bg-white'}`}
                      style={{ background: metalFilter === 'silver' ? 'linear-gradient(135deg, #F7FAFC, #E2E8F0)' : 'white' }}
                    >
                      <span className="text-2xl">🥈</span>
                      <span className={`text-[10px] font-extrabold tracking-wide font-sans ${metalFilter === 'silver' ? 'text-[#4A5568]' : 'text-gray-500'}`}>SILVER</span>
                      {metalFilter === 'silver' && <span className="absolute top-1 right-1 w-4 h-4 bg-[#718096] rounded-full flex items-center justify-center"><svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="white"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                    </button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Price</span>
                  <div className="space-y-1.5">
                    {[
                      { label: 'Below Rs. 10,000', val: 10000 },
                      { label: 'Rs. 10,000 – Rs. 20,000', val: 20000 },
                      { label: 'Rs. 20,000 – Rs. 30,000', val: 30000 },
                      { label: 'Rs. 30,000 – Rs. 40,000', val: 40000 },
                      { label: 'Rs. 40,000 – Rs. 50,000', val: 50000 },
                      { label: 'Rs. 50,000 and Above', val: 100000000 },
                    ].map(({ label, val }) => {
                      const isChecked = priceFilter === label;
                      return (
                        <label key={val} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="mob-price" 
                            checked={isChecked} 
                            onChange={() => {
                              if (isChecked) {
                                setPriceFilter('all');
                                setMaxPriceFilter(100000000);
                              } else {
                                setPriceFilter(label);
                                setMaxPriceFilter(val);
                              }
                            }} 
                            className="accent-[#4A126D] w-3 h-3 cursor-pointer" 
                          />
                          <span className={`text-[10px] font-sans leading-none ${isChecked ? 'text-[#4A126D] font-bold' : 'text-gray-600'}`}>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* METAL */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Metal</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Gold', 'Silver', 'Rose Gold', 'White Gold', 'Platinum', 'Plain Gold'].map(m => (
                      <button key={m} onClick={() => setMetalFilter(m.toLowerCase())}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${metalFilter === m.toLowerCase() ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GOLD PURITY */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Gold Purity</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', '14K', '18K', '22K', '24K'].map(p => (
                      <button key={p} onClick={() => setPurityFilter(p === 'All' ? 'all' : p)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${purityFilter === (p === 'All' ? 'all' : p) ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GENDER */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Gender</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Women', 'Men', 'Unisex'].map(g => (
                      <button key={g} onClick={() => setGenderFilter(g.toLowerCase())}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${genderFilter === g.toLowerCase() ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STONES */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Stones</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Topaz', 'Amethyst', 'Garnet', 'Opal', 'Citrine', 'Aquamarine'].map(s => (
                      <button key={s} onClick={() => setStoneFilter(prev => prev === s ? 'all' : s)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${stoneFilter === s ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* OCCASION */}
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Occasion</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Everyday Wear', 'Festive', 'Wedding', 'Engagement', 'Anniversary', 'Gifting', 'Workwear', 'Romantic', 'Vacation', 'Special Occasion', 'Valentine'].map(o => (
                      <button key={o} onClick={() => setOccasionFilter(prev => prev === o ? 'all' : o)}
                        className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${occasionFilter === o ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="pb-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Category</span>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryFilters.map(cat => {
                      const isActive = activeCategoryTab === cat;
                      return (
                        <button key={cat} onClick={() => changeCategoryTab(cat)}
                          className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer border-solid ${isActive ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Apply Button */}
              <div className="shrink-0 px-4 py-3 border-t border-gray-100 bg-white">
                <button
                  onClick={() => { setMobileFilterOpen(false); triggerAudio('shimmer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-3 rounded-xl bg-[#4A126D] text-white text-[10px] uppercase font-bold tracking-widest shadow-lg hover:bg-[#DDA0DD] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-none font-bold"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CATALOG MAIN BODY */}
      <div className={`transition-colors duration-500 min-h-screen pb-32 sm:pb-20 ${isCatalogDark ? 'bg-[#F4ECF9] text-[#4A126D]' : 'bg-[#FCFAFF] text-[#4A126D]'}`}>

        {/* Full-width Banner Carousel */}
        <BannerCarousel banners={[banner1, banner2]} />

        <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 space-y-4 sm:space-y-12 animate-slide-up pt-4 sm:pt-10">

          {/* Split Layout: Sidebar Filters (left) & Products Grid (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start text-left">

            {/* Left Sidebar Filters Panel — Desktop only */}
            <aside className="hidden lg:block col-span-12 lg:col-span-3 lg:sticky lg:top-24 bg-white border border-[#DDA0DD]/20 rounded-xl sm:rounded-3xl shadow-[0_8px_24px_rgba(63,31,84,0.04)] text-left relative z-20 self-start" style={{ maxHeight: 'none', overflowY: 'visible', scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent', padding: '0' }}>

              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 px-3 sm:px-5 py-2 sm:py-3 sticky top-0 bg-white z-10 rounded-t-xl sm:rounded-t-3xl">
                <h3 className="serif-luxury text-xs sm:text-base font-bold text-[#4A126D] flex items-center gap-1 tracking-wide">
                  <span className="text-[10px] sm:text-sm">✨</span> Filters
                </h3>
                <button
                  onClick={() => { setMetalFilter('all'); setPurityFilter('all'); setMaxPriceFilter(100000000); setPriceFilter('all'); setTypeFilter('all'); setGenderFilter('all'); setStoneFilter('all'); setOccasionFilter('all'); }}
                  className="text-[7px] sm:text-[9px] uppercase tracking-widest font-black text-[#DDA0DD] hover:text-[#4A126D] transition-colors cursor-pointer border border-solid border-[#DDA0DD]/30 rounded-md sm:rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 bg-transparent"
                >
                  Clear All
                </button>
              </div>

              <div className="px-3 sm:px-5 py-2 sm:py-4 space-y-0 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto text-left" style={{ scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent' }}>

                {/* METAL TYPE — Quick Select (Gold / Silver) */}
                <div className="border-b border-gray-100 py-2 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2 sm:mb-3">Metal Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Gold */}
                    <button
                      onClick={() => setMetalFilter(prev => prev === 'gold' ? 'all' : 'gold')}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${metalFilter === 'gold' ? 'border-[#C8960C] shadow-[0_4px_14px_rgba(200,150,12,0.30)]' : 'border-gray-200 hover:border-[#C8960C]/50'}`}
                      style={{ background: metalFilter === 'gold' ? 'linear-gradient(135deg, #FFF8E7 0%, #FFF0B3 100%)' : 'white' }}
                    >
                      <span className="text-xl">🥇</span>
                      <span className={`text-[9px] sm:text-[11px] font-extrabold tracking-wide font-sans ${metalFilter === 'gold' ? 'text-[#A07820]' : 'text-gray-500'}`}>GOLD</span>
                      {metalFilter === 'gold' && (
                        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C8960C] rounded-full flex items-center justify-center">
                          <svg viewBox="0 0 10 10" className="w-2 h-2" fill="white"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </button>

                    {/* Silver */}
                    <button
                      onClick={() => setMetalFilter(prev => prev === 'silver' ? 'all' : 'silver')}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden ${metalFilter === 'silver' ? 'border-[#718096] shadow-[0_4px_14px_rgba(113,128,150,0.25)]' : 'border-gray-200 hover:border-gray-450'}`}
                      style={{ background: metalFilter === 'silver' ? 'linear-gradient(135deg, #F7FAFC 0%, #E2E8F0 100%)' : 'white' }}
                    >
                      <span className="text-xl">🥈</span>
                      <span className={`text-[9px] sm:text-[11px] font-extrabold tracking-wide font-sans ${metalFilter === 'silver' ? 'text-[#4A5568]' : 'text-gray-500'}`}>SILVER</span>
                      {metalFilter === 'silver' && (
                        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#718096] rounded-full flex items-center justify-center">
                          <svg viewBox="0 0 10 10" className="w-2 h-2" fill="white"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* PRICE */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Price</span>
                  <div className="space-y-1 sm:space-y-2">
                    {[
                      { label: 'Below Rs. 10,000', val: 10000 },
                      { label: 'Rs. 10,000 – Rs. 20,000', val: 20000 },
                      { label: 'Rs. 20,000 – Rs. 30,000', val: 30000 },
                      { label: 'Rs. 30,000 – Rs. 40,000', val: 40000 },
                      { label: 'Rs. 40,000 – Rs. 50,000', val: 50000 },
                      { label: 'Rs. 50,000 and Above', val: 100000000 },
                    ].map(({ label, val }) => {
                      const isChecked = priceFilter === label;
                      return (
                        <label key={val} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="price" 
                            checked={isChecked} 
                            onChange={() => {
                              if (isChecked) {
                                setPriceFilter('all');
                                setMaxPriceFilter(100000000);
                              } else {
                                setPriceFilter(label);
                                setMaxPriceFilter(val);
                              }
                            }} 
                            className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" 
                          />
                          <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${isChecked ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* METAL */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Metal</span>
                  <div className="space-y-1 sm:space-y-2">
                    {['All', 'Gold', 'Silver', 'Rose Gold', 'White Gold', 'Platinum', 'Plain Gold'].map(m => (
                      <label key={m} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                        <input type="radio" name="metal" checked={metalFilter === m.toLowerCase()} onChange={() => setMetalFilter(m.toLowerCase())} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                        <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${metalFilter === m.toLowerCase() ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* GOLD PURITY */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Gold Purity</span>
                  <div className="space-y-1 sm:space-y-2">
                    {['All', '14K', '18K', '22K', '24K'].map(p => (
                      <label key={p} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                        <input type="radio" name="purity" checked={purityFilter === (p === 'All' ? 'all' : p)} onChange={() => setPurityFilter(p === 'All' ? 'all' : p)} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                        <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${purityFilter === (p === 'All' ? 'all' : p) ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* GENDER */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Gender</span>
                  <div className="space-y-1 sm:space-y-2">
                    {['All', 'Women', 'Men', 'Unisex'].map(g => (
                      <label key={g} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                        <input type="radio" name="gender" checked={genderFilter === g.toLowerCase()} onChange={() => setGenderFilter(g.toLowerCase())} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                        <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${genderFilter === g.toLowerCase() ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* STONES */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Stones</span>
                  <div className="space-y-1 sm:space-y-2">
                    {['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Topaz', 'Amethyst', 'Garnet', 'Opal', 'Citrine', 'Aquamarine'].map(s => (
                      <label key={s} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                        <input type="radio" name="stone" checked={stoneFilter === s} onChange={() => setStoneFilter(prev => prev === s ? 'all' : s)} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                        <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${stoneFilter === s ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* OCCASION */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Occasion</span>
                  <div className="space-y-1 sm:space-y-2">
                    {['Everyday Wear', 'Festive', 'Wedding', 'Engagement', 'Anniversary', 'Gifting', 'Workwear', 'Romantic', 'Vacation', 'Special Occasion', 'Valentine'].map(o => (
                      <label key={o} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                        <input type="radio" name="occasion" checked={occasionFilter === o} onChange={() => setOccasionFilter(prev => prev === o ? 'all' : o)} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                        <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${occasionFilter === o ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CATEGORY */}
                <div className="border-b border-gray-100 py-1.5 sm:py-3 text-left">
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Category</span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {categoryFilters.map(cat => {
                      const isActive = activeCategoryTab === cat;
                      return (
                        <button key={cat} onClick={() => changeCategoryTab(cat)}
                          className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[7px] sm:text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border border-solid cursor-pointer ${isActive ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-[#FCFAFF] text-gray-600 border-gray-200 hover:border-[#4A126D] hover:text-[#4A126D]'}`}>
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* BESPOKE CTA */}
                <div className="pt-2 sm:pt-4 text-center space-y-1.5 sm:space-y-2">
                  <p className="text-[7px] sm:text-[9px] text-gray-400 font-light leading-relaxed font-sans">Can't find your dream piece? Request bespoke craftsmanship.</p>
                  <button onClick={() => { triggerAudio('shimmer'); setCustomDesignOpen(true); }}
                    className="w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#4A126D]/10 hover:bg-[#4A126D] text-[#4A126D] hover:text-white border border-solid border-[#4A126D]/30 hover:border-transparent text-[7px] sm:text-[8.5px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer font-bold">
                    ✍️ Create Custom Design
                  </button>
                </div>

              </div>

            </aside>

            {/* Right Products panel */}
            <div className="col-span-12 lg:col-span-9 space-y-3 sm:space-y-6 text-left">

              {/* Sorting Header Row */}
              <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 bg-white border border-[#DDA0DD]/15 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-3 sm:px-6 shadow-[0_4px_16px_rgba(63,31,84,0.03)] text-[9px] sm:text-xs">
                <span className="text-gray-500 font-medium whitespace-nowrap">
                  Showing <strong className="text-[#4A126D]">{filteredJewellery.length}</strong> jewellery items
                </span>

                <div className="flex items-center gap-1.5 sm:gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-450 font-bold uppercase text-[7px] sm:text-[9px] tracking-wider shrink-0 hidden sm:inline">Sort By:</span>
                    <select
                      value={sortFilter}
                      onChange={(e) => setSortFilter(e.target.value)}
                      className="bg-[#FBF9FF] border border-gray-200 rounded-lg sm:rounded-xl px-1.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-xs text-gray-700 font-sans outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="newest">Newest</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>

                  <button
                    onClick={() => { triggerAudio('shimmer'); setCustomDesignOpen(true); }}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-lg sm:rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-white border border-solid border-gold hover:border-transparent text-[8px] sm:text-[9px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer shadow-sm ml-auto whitespace-nowrap"
                  >
                    ✍️ <span className="hidden xs:inline">Custom </span>Design
                  </button>
                </div>
              </div>

              {catalogLoading ? (
                /* Shimmer loading state */
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl sm:rounded-[28px] p-2 sm:p-4 space-y-2 sm:space-y-4 shadow-sm animate-pulse bg-white border-gray-100"
                    >
                      <div className="aspect-square rounded-[1.25rem] relative overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-1/3 rounded bg-gray-200"></div>
                        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                      </div>
                      <div className="h-10 rounded-xl bg-gray-100"></div>
                    </div>
                  ))}
                </div>
              ) : filteredJewellery.length === 0 ? (
                /* Empty state */
                <div className="py-20 px-6 text-center border border-solid rounded-[2.5rem] shadow-sm max-w-md mx-auto space-y-5 animate-fade-in bg-white border-[#FBF9FF] text-[#4A126D]">
                  <div className="w-16 h-16 bg-[#FBF9FF]/10 border border-solid border-[#DDA0DD]/30 rounded-full flex items-center justify-center mx-auto text-[#DDA0DD] text-2xl shadow-inner animate-float-gentle">
                    ✨
                  </div>
                  <h3 className="serif-luxury font-medium text-xl">No Masterpieces Found</h3>
                  <p className="text-xs max-w-xs mx-auto leading-relaxed normal-case text-gray-550">
                    We are currently crafting new designs or applying filter adjustments for the <span className="font-semibold text-[#DDA0DD]">{activeCategoryTab}</span> collection.
                  </p>
                  <button
                    onClick={() => {
                      triggerAudio('click');
                      changeCategoryTab('Collections');
                      setMetalFilter('all');
                      setPurityFilter('all');
                      setMaxPriceFilter(100000000);
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-md cursor-pointer border bg-[#4A126D] text-white hover:bg-[#DDA0DD] border-transparent font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                /* Normal Listing State */
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 animate-fade-in text-left">
                    {paginatedProducts.map((prod) => {
                      const isWishlisted = wishlistItems.some(w => w.id === prod.id);
                      const isNecklace = String(prod.category || '').toLowerCase().includes('necklace') || 
                                         String(prod.subCategory || '').toLowerCase().includes('necklace') || 
                                         String(prod.name || '').toLowerCase().includes('necklace') ||
                                         String(prod.name || '').toLowerCase().includes('set') ||
                                         String(prod.name || '').toLowerCase().includes('longset') ||
                                         String(prod.name || '').toLowerCase().includes('kanthla') ||
                                         String(prod.name || '').toLowerCase().includes('chain') ||
                                         String(prod.name || '').toLowerCase().includes('pendant') ||
                                         String(prod.name || '').toLowerCase().includes('haar') ||
                                         String(prod.name || '').toLowerCase().includes('mangalsutra') ||
                                         String(prod.category || '').toLowerCase().includes('chain') ||
                                         String(prod.category || '').toLowerCase().includes('pendant') ||
                                         String(prod.category || '').toLowerCase().includes('mangalsutra');
                      return (
                        <div
                          key={prod.id}
                          onClick={() => navigateToPDP(prod)}
                          className="group rounded-xl sm:rounded-3xl p-2 sm:p-5 flex flex-col justify-between border border-solid border-[#EAEAEA] transition-all duration-300 relative cursor-pointer overflow-hidden bg-white text-[#1B1B1B] shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:border-[#DDA0DD]/45 hover:-translate-y-1.5 h-auto text-left"
                        >
                          {/* Image & Overlays */}
                          <div className="aspect-square rounded-xl sm:rounded-[1.5rem] overflow-hidden relative bg-white border border-solid border-[#DDA0DD]/5 shrink-0 text-center">

                            {prod.img ? (
                              <img
                                src={prod.img}
                                alt={prod.name}
                                className="w-full h-full object-contain p-4 scale-100 group-hover:scale-110 transition-transform duration-[1200ms] ease-out mix-blend-multiply"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-tr from-[#FAF8F5] to-[#F3EEE7] flex flex-col items-center justify-center space-y-2 border border-dashed border-[#DDA0DD]/20 rounded-xl">
                                <span className="text-3xl animate-float-gentle">{prod.fallback || '✨'}</span>
                                <span className="text-[8px] tracking-widest text-[#BCA057] uppercase font-bold">Awaiting Curation</span>
                              </div>
                            )}

                            {prod.badge && (
                              <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#1B1B1B] text-[#DDA0DD] text-[6px] sm:text-[8px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider uppercase border border-solid border-[#DDA0DD]/30 z-20 shadow-sm animate-pulse-slow">
                                {prod.badge}
                              </span>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerAudio('click');
                                toggleWishlist(prod);
                              }}
                              className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1.5 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1B1B1B] shadow-md transition-all duration-300 hover:scale-105 active:scale-95 z-20 focus:outline-none cursor-pointer border-none"
                            >
                              <svg
                                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transition-colors duration-300 ${isWishlisted ? 'text-[#DDA0DD] fill-current scale-110' : 'text-gray-400 fill-none'
                                  }`}
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Metadata Details */}
                          <div className="space-y-1 sm:space-y-2 mt-1.5 sm:mt-4 flex-1 flex flex-col justify-between text-left">
                            <div className="space-y-0.5 sm:space-y-1 text-left">
                              <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#DDA0DD] font-bold block text-left">
                                {prod.subCategory || prod.category}
                              </span>
                              <h3 className="serif-luxury font-bold text-[10px] sm:text-base leading-tight sm:leading-snug group-hover:text-[#DDA0DD] transition-colors duration-300 line-clamp-2 text-[#1B1B1B] text-left">
                                {prod.name}
                              </h3>
                              <p className="text-[8px] sm:text-[10px] font-sans font-light leading-relaxed normal-case text-[#666666]/90 hidden sm:line-clamp-2 text-left">
                                {prod.desc}
                              </p>
                            </div>

                            <div className="pt-1 sm:pt-2.5 border-t border-gray-100/80 flex items-center justify-between mt-auto">
                              <span className="font-extrabold text-[10px] sm:text-sm text-[#DDA0DD] tracking-wide font-sans">
                                ₹{formatPrice(calculatePrice(prod).total)}
                              </span>
                              <span className="text-[6px] sm:text-[8.5px] font-semibold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase tracking-widest bg-[#DDA0DD]/10 text-[#DDA0DD] border border-solid border-[#DDA0DD]/20 hidden sm:inline">
                                {prod.carat || '22K Gold'}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-1.5 sm:mt-4 pt-0 sm:pt-1 flex items-center gap-1.5 sm:gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerAudio('click');
                                setConsultationModal(true);
                              }}
                              className="w-9 h-9 sm:w-12 sm:h-12 border border-solid border-[#4CAF50] bg-transparent hover:bg-[#4CAF50]/5 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer focus:outline-none shrink-0 transition-colors duration-300"
                              title="Book Video Call"
                            >
                              <svg className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-[#4CAF50]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                              </svg>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerAudio('click');
                                navigateToPDP(prod);
                              }}
                              className="flex-grow h-9 sm:h-12 border border-solid border-gray-200 hover:border-gray-400 bg-white text-gray-800 hover:text-black font-semibold text-[9px] sm:text-xs rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center font-sans"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>


        </div>
      </div>

      {/* Custom Design Request Modal */}
      <Modal
        isOpen={customDesignOpen}
        onClose={() => setCustomDesignOpen(false)}
        title="Create Custom Design"
        size="md"
      >
        <BookingForm 
          type="custom_design" 
          onSuccess={() => setCustomDesignOpen(false)} 
        />
      </Modal>

      {/* Consultation Booking Modal */}
      <Modal
        isOpen={consultationModal}
        onClose={() => setConsultationModal(false)}
        title="Book Live Video Consultation"
        size="md"
      >
        <BookingForm 
          type="consultation" 
          onSuccess={() => setConsultationModal(false)} 
        />
      </Modal>
    </>
  );
}
