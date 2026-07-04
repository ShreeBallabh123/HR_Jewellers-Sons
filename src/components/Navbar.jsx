import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useRates } from '../hooks/useRates';
import { useProducts } from '../hooks/useProducts';

import hrLogo from '../assets/logo.png';
import hrLogoMark from '../assets/logo-mark.png';

// Import local category tab icons
import solitariesImg from '../assets/solitaries.png';
import watchJewelleryImg from '../assets/watch_jewellery.png';
import mensJewelleryImg from '../assets/mens_jewellery.png';
import mangalsutrasImg from '../assets/mangalsutras.png';
import nosePinsImg from '../assets/nose_pins.png';
import kidsJewelleryImg from '../assets/kids_jewellery.png';
import goldCoinsImg from '../assets/gold_coins.png';
import ankletsImg from '../assets/anklets.png';

export default function Navbar({
  currentPage,
  navigateTo,
  changeCategoryTab,
  soundEnabled,
  toggleSound,
  triggerAudio,
  setConsultationModal,
  setCoinPurityTab,
  setCoinWeightFilter,
  setMetalFilter,
  setMaxPriceFilter,
  navigateToPDP
}) {
  const { cartItems, setCartOpen, cartItemCount } = useCart();
  const { wishlistItems, setWishlistOpen } = useWishlist();
  const { products } = useProducts();
  const { formatPrice } = useRates();

  const [searchVal, setSearchVal] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Suggestions search logic
  const searchSuggestions = searchVal.trim()
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
          p.category.toLowerCase().includes(searchVal.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      triggerAudio('click');
      changeCategoryTab('Collections');
      navigateTo('collections');
      setSearchFocused(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 select-none bg-white/95 backdrop-blur-md shadow-sm py-2">
      {/* DESKTOP HEADER (Two-Row Layout) */}
      <div className="hidden lg:flex flex-col w-full max-w-[1400px] mx-auto px-6">
        
        {/* Top Row: Logo, Search Bar, Redesigned Utility Buttons */}
        <div className="flex justify-between items-center gap-8 h-20">
          
          {/* Logo / Brand Name */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 shrink-0 focus:outline-none transition-all duration-300 hover:scale-[1.02] text-left cursor-pointer border-none bg-transparent"
          >
            <img
              src={hrLogoMark}
              alt="HR Jewellers &amp; Sons Logo"
              className="w-[58px] h-[58px] lg:w-[68px] lg:h-[68px] object-contain select-none"
            />
            <div className="flex flex-col justify-center">
              <span className="serif-luxury text-[15px] lg:text-[18px] font-bold leading-tight tracking-[2.5px] text-[#1A1A1A]">
                HR JEWELLERS
              </span>
              <span className="serif-luxury text-[11px] lg:text-[13px] font-semibold leading-none tracking-[3.5px] text-[#C8A646] mt-0.5">
                &amp; SONS
              </span>
              <span className="text-[7px] tracking-[0.25em] uppercase font-sans font-light text-gray-400 mt-1">
                Timeless Elegance
              </span>
            </div>
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-[550px] mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search Jewellery, Gold Coins, Diamonds..."
                className="w-full h-12 pl-12 pr-4 bg-[#FAF9F7] border border-solid border-[#ECECEC] focus:border-[#C8A646] focus:outline-none rounded-full text-[#1A1A1A] placeholder-gray-400 text-[13px] font-medium transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white text-gray-800 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-2xl py-3 px-4 z-[999] max-h-[300px] overflow-y-auto">
                {searchSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      triggerAudio('click');
                      navigateToPDP(prod);
                    }}
                    className="w-full flex items-center gap-3 p-2 hover:bg-[#FAF9F7] rounded-xl transition-colors text-left cursor-pointer focus:outline-none border-none bg-transparent"
                  >
                    <img src={prod.img} alt={prod.name} className="w-10 h-10 object-contain rounded-lg border border-solid border-[#ECECEC] bg-[#FAF9F7]" />
                    <div>
                      <div className="text-[12px] font-bold text-[#1A1A1A] line-clamp-1">{prod.name}</div>
                      <div className="text-[10px] text-[#C8A646] font-bold font-sans">₹{formatPrice(prod.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center space-x-2 xl:space-x-3 h-full">
            
            {/* Sound Button */}
            <button
              onClick={toggleSound}
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-[#FAF9F7] transition-all duration-300 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <div className="text-[#C8A646] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                {soundEnabled ? (
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                ) : (
                  <svg className="w-5.5 h-5.5 text-gray-450" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6h4.72L12.75 5.1c.3-.3.8-.09.8.32v13.16c0 .41-.5.62-.8.32l-3.53-3.53H6.75c-.69 0-1.25-.56-1.25-1.25v-3c0-.69.56-1.25 1.25-1.25z" />
                  </svg>
                )}
              </div>
            </button>

            {/* Whatsapp Inquire */}
            <a
              href="https://wa.me/919414088000?text=Hello%20HR%20Jewellers,%20I%20am%20interested%20in%20your%20jewellery%20designs."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-[#FAF9F7] transition-all duration-300 cursor-pointer"
            >
              <div className="text-[#C8A646] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.705 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
            </a>

            {/* Showrooms Locator */}
            <button
              onClick={() => { triggerAudio('click'); navigateTo('offers'); }}
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-[#FAF9F7] transition-all duration-300 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <div className="text-[#C8A646] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => { triggerAudio('click'); setWishlistOpen(true); }}
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-[#FAF9F7] transition-all duration-300 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <div className="text-[#C8A646] relative transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-[-4px] right-[-4px] bg-[#D58B8B] text-white text-[8px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
            </button>

            {/* Cart */}
            <button
              onClick={() => { triggerAudio('click'); setCartOpen(true); }}
              className="group relative flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-[#FAF9F7] transition-all duration-300 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <div className="text-[#C8A646] relative transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-[-4px] right-[-4px] bg-[#C8A646] text-white text-[8px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </button>

          </div>
        </div>

        {/* Bottom Row: NAVIGATION LINKS */}
        <div className="w-full flex justify-center mt-3 mb-1">
          <div className="w-full max-w-[1240px] bg-white border border-solid border-[#ECECEC] rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-8 py-3.5 flex justify-center items-center">
            <div className="flex items-center justify-center space-x-6 xl:space-x-8 text-[11px] font-sans tracking-[0.12em] uppercase font-bold text-[#1A1A1A] w-full font-semibold">
              
              {/* 11+1 Scheme Dropdown */}
              <div className="relative group h-full flex items-center">
                <button
                  onClick={() => { triggerAudio('click'); navigateTo('savings'); }}
                  className="relative hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1.5 focus:outline-none border-none bg-transparent"
                >
                  <span>11+1 Scheme</span>
                  <span className="px-1.5 py-0.5 text-[8px] tracking-normal font-sans font-extrabold text-white bg-gradient-to-r from-[#D58B8B] to-[#C8A646] rounded-full uppercase scale-95 shadow-sm font-semibold">
                    NEW
                  </span>
                  <svg className="w-3 h-3 text-gray-405 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-gray-800 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-2xl py-2 px-1 min-w-[200px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-[12px] normal-case font-sans select-none font-semibold">
                  <button
                    onClick={() => { triggerAudio('click'); navigateTo('savings'); }}
                    className="w-full text-left px-5 py-2.5 font-semibold text-gray-800 hover:bg-[#FAF9F7] hover:text-[#C8A646] transition-colors rounded-xl cursor-pointer border-none bg-transparent"
                  >
                    Gold Mine
                  </button>
                  <button
                    onClick={() => { triggerAudio('click'); navigateTo('gold-reserve'); }}
                    className="w-full text-left px-5 py-2.5 font-semibold text-gray-800 hover:bg-[#FAF9F7] hover:text-[#C8A646] transition-colors rounded-xl cursor-pointer border-none bg-transparent"
                  >
                    Gold Reserve
                  </button>
                </div>
              </div>

              {/* standard categories */}
              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Bracelets'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Watch Jewellery
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Rings'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Rings
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Earrings'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Earrings
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Necklace'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Necklaces
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Necklace'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Pendants
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Rings'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                Solitaires
              </button>

              <button
                onClick={() => { triggerAudio('click'); changeCategoryTab('Collections'); navigateTo('collections'); }}
                className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
              >
                All Jewellery
              </button>

              {/* Gifts Dropdown */}
              <div className="relative group h-full flex items-center">
                <button
                  onClick={() => { triggerAudio('click'); changeCategoryTab('Gifts & Pooja'); navigateTo('collections'); }}
                  className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
                >
                  <span>Gifts</span>
                  <svg className="w-3 h-3 text-gray-450 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-gray-800 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-2xl py-6 px-7 min-w-[420px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-8 text-[12px] normal-case font-sans select-none text-left font-semibold">
                  <div className="flex flex-col space-y-1 flex-1">
                    <h4 className="font-bold text-[13px] text-[#1A1A1A] border-b border-solid border-gray-100 pb-2 mb-1">Gifts For Special Someone</h4>
                    {[
                      { label: 'For HER', price: '2,861' },
                      { label: 'For HIM', price: '5,820' },
                      { label: 'For SISTER', price: '5,746' },
                      { label: 'For BROTHER', price: '5,820' },
                      { label: 'For MOTHER', price: '5,805' },
                      { label: 'For FATHER', price: '5,820' },
                      { label: 'For FRIENDS', price: '4,221' }
                    ].map((g) => (
                      <button
                        key={g.label}
                        onClick={() => { triggerAudio('click'); changeCategoryTab('Gifts & Pooja'); navigateTo('collections'); }}
                        className="text-left hover:text-[#C8A646] hover:translate-x-1 transition-all py-1 cursor-pointer focus:outline-none border-none bg-transparent"
                      >
                        <span className="font-bold text-[12px] text-gray-800 block">{g.label}</span>
                        <span className="text-[10px] text-gray-400">Starting at Rs. {g.price}/-</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col items-center justify-center bg-[#FAF9F7] rounded-2xl p-4 min-w-[160px]">
                    <div className="bg-gradient-to-br from-[#D58B8B] to-[#C8A646] rounded-xl p-4 text-center text-white w-full shadow-sm">
                      <p className="text-[9px] uppercase tracking-wider font-semibold opacity-90">HR Jewellers &amp; Sons</p>
                      <p className="text-[10px] font-bold mt-0.5">Gift Cards</p>
                      <div className="text-2xl mt-1">💍</div>
                    </div>
                    <p className="text-[10px] text-gray-500 text-center mt-2 leading-snug font-medium">Available in denominations<br />starting from <strong className="text-[#1A1A1A]">₹500</strong> to <strong className="text-[#1A1A1A]">₹50,000</strong></p>
                  </div>
                </div>
              </div>

              {/* Gold Coins Dropdown */}
              <div className="relative group h-full flex items-center">
                <button
                  onClick={() => {
                    triggerAudio('click');
                    navigateTo('gold-coins');
                    setCoinPurityTab('24K');
                    setCoinWeightFilter('all');
                  }}
                  className="hover:text-[#C8A646] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none border-none bg-transparent"
                >
                  <span>Gold Coins</span>
                  <svg className="w-3 h-3 text-gray-450 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-gray-800 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-2xl py-6 px-7 min-w-[320px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 grid grid-cols-2 gap-x-8 gap-y-4 text-[12px] normal-case font-sans select-none text-left font-semibold">
                  <div className="flex flex-col space-y-2.5">
                    <button
                      onClick={() => {
                        triggerAudio('click');
                        navigateTo('gold-coins');
                        setCoinPurityTab('24K');
                        setCoinWeightFilter('all');
                      }}
                      className="font-bold text-[13px] text-gray-900 border-b border-solid border-gray-100 pb-1.5 text-left hover:text-[#C8A646] focus:outline-none border-none bg-transparent"
                    >
                      24 Kt (995)
                    </button>
                    <div className="flex flex-col space-y-2 text-[12px] text-gray-605 font-medium">
                      {['0.5', '1', '2', '5', '10', '20', '50'].map((w) => (
                        <button
                          key={`dropdown-24k-${w}`}
                          onClick={() => {
                            triggerAudio('click');
                            navigateTo('gold-coins');
                            setCoinPurityTab('24K');
                            setCoinWeightFilter(w);
                          }}
                          className="text-left hover:text-[#C8A646] hover:translate-x-1 transition-all py-0.5 cursor-pointer focus:outline-none border-none bg-transparent"
                        >
                          {w} gram
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2.5">
                    <button
                      onClick={() => {
                        triggerAudio('click');
                        navigateTo('gold-coins');
                        setCoinPurityTab('22K');
                        setCoinWeightFilter('all');
                      }}
                      className="font-bold text-[13px] text-gray-900 border-b border-solid border-gray-100 pb-1.5 text-left hover:text-[#C8A646] focus:outline-none border-none bg-transparent"
                    >
                      22 Kt (916)
                    </button>
                    <div className="flex flex-col space-y-2 text-[12px] text-gray-605 font-medium">
                      {['1', '2', '5', '10', '20', '50'].map((w) => (
                        <button
                          key={`dropdown-22k-${w}`}
                          onClick={() => {
                            triggerAudio('click');
                            navigateTo('gold-coins');
                            setCoinPurityTab('22K');
                            setCoinWeightFilter(w);
                          }}
                          className="text-left hover:text-[#C8A646] hover:translate-x-1 transition-all py-0.5 cursor-pointer focus:outline-none border-none bg-transparent"
                        >
                          {w} gram
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers */}
              <div className="relative group h-full flex items-center">
                <button
                  onClick={() => { triggerAudio('click'); navigateTo('offers'); }}
                  className="hover:text-[#D58B8B] transition-colors duration-300 cursor-pointer h-full flex items-center gap-1 focus:outline-none text-[#D58B8B] border-none bg-transparent"
                >
                  <span>Offers</span>
                  <svg className="w-3 h-3 text-[#D58B8B]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-3 bg-white text-gray-800 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-2xl py-2.5 px-1 min-w-[340px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-[12px] normal-case font-sans select-none font-semibold">
                  <button
                    onClick={() => { triggerAudio('click'); setMaxPriceFilter(100000000); changeCategoryTab('Collections'); navigateTo('collections'); }}
                    className="w-full text-left px-5 py-3 text-[12px] font-semibold text-gray-800 hover:bg-[#FAF9F7] hover:text-[#C8A646] transition-colors rounded-xl cursor-pointer leading-snug focus:outline-none border-none bg-transparent"
                  >
                    💎 Up To 50% Off On Making Charges On Diamond Jewellery
                  </button>
                  <button
                    onClick={() => { triggerAudio('click'); setMetalFilter('gold'); changeCategoryTab('Collections'); navigateTo('collections'); }}
                    className="w-full text-left px-5 py-3 text-[12px] font-semibold text-gray-800 hover:bg-[#FAF9F7] hover:text-[#C8A646] transition-colors rounded-xl cursor-pointer leading-snug focus:outline-none border-none bg-transparent"
                  >
                    🥇 Up To 20% Off On Making Charges On Plain Gold Jewellery
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* MOBILE HEADER (Single-Row with dropdown drawer) */}
      <div className="lg:hidden flex flex-col w-full bg-white border-b border-solid border-slate-100 px-4 py-3 gap-3">
        <div className="flex items-center justify-between w-full">
          
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-2.5 focus:outline-none cursor-pointer text-left border-none bg-transparent"
          >
            <img
              src={hrLogoMark}
              alt="HR Logo"
              className="w-11 h-11 object-contain select-none"
            />
            <div className="flex flex-col justify-center">
              <span className="serif-luxury text-[13px] font-bold tracking-[1.5px] text-[#1A1A1A]">
                HR JEWELLERS
              </span>
              <span className="serif-luxury text-[9px] font-bold tracking-[2.5px] text-[#C8A646] -mt-0.5">
                &amp; SONS
              </span>
            </div>
          </button>

          {/* Mobile Action Controls */}
          <div className="flex items-center space-x-2.5 text-[#1A1A1A]">
            
            {/* Wishlist Mobile */}
            <button
              onClick={() => { triggerAudio('click'); setWishlistOpen(true); }}
              className="p-1.5 hover:bg-slate-50 rounded-full relative focus:outline-none border-none bg-transparent"
            >
              <svg className="w-5 h-5 text-[#C8A646]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Cart Mobile */}
            <button
              onClick={() => { triggerAudio('click'); setCartOpen(true); }}
              className="p-1.5 hover:bg-slate-50 rounded-full relative focus:outline-none border-none bg-transparent"
            >
              <svg className="w-5.5 h-5.5 text-[#C8A646]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C8A646] text-white text-[7px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Drawer Menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 hover:bg-slate-50 rounded-full focus:outline-none border-none bg-transparent"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="relative w-full">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search designs..."
              className="w-full h-10 pl-10 pr-4 bg-[#FAF9F7] border border-solid border-[#ECECEC] focus:border-[#C8A646] focus:outline-none rounded-full text-[#1A1A1A] placeholder-gray-400 text-[12px] font-medium transition-all"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Mobile Autocomplete Suggest */}
          {searchFocused && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-solid border-[#ECECEC] rounded-xl py-2 px-3 z-[999] max-h-[220px] overflow-y-auto">
              {searchSuggestions.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    triggerAudio('click');
                    setSearchFocused(false);
                    navigateToPDP(prod);
                  }}
                  className="w-full flex items-center gap-3 p-1.5 hover:bg-[#FAF9F7] rounded-lg transition-colors text-left border-none bg-transparent"
                >
                  <img src={prod.img} alt={prod.name} className="w-8 h-8 object-contain rounded-md border border-solid border-[#ECECEC] bg-[#FAF9F7]" />
                  <div>
                    <div className="text-[11px] font-bold text-[#1A1A1A] line-clamp-1">{prod.name}</div>
                    <div className="text-[9px] text-[#C8A646] font-bold font-sans">₹{formatPrice(prod.price)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Full-Screen Menu Overlay — portal to escape nav's backdrop-filter stacking context */}
        {mobileMenuOpen && ReactDOM.createPortal(
          <div
            className="fixed inset-0 w-screen h-screen bg-white z-[99999] flex flex-col overflow-y-auto"
            style={{ animation: 'slideDownFadeIn 0.25s ease-out forwards', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-solid border-zinc-100 shrink-0">
              <div className="flex items-center gap-3">
                <img src={hrLogoMark} alt="HR Logo" className="w-10 h-10 object-contain" />
                <div>
                  <div className="text-[13px] font-bold tracking-[1.5px] text-[#1A1A1A] serif-luxury">HR JEWELLERS</div>
                  <div className="text-[10px] font-bold tracking-[2px] text-[#C8A646] serif-luxury">&amp; SONS</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 active:bg-zinc-200 border-none cursor-pointer"
              >
                <svg className="w-5 h-5 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col px-5 py-4 space-y-1 flex-1">
              {/* 11+1 Savings — highlighted */}
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('savings'); }}
                className="flex items-center gap-4 w-full text-left px-4 py-4 rounded-2xl bg-[#C8A646]/10 active:bg-[#C8A646]/20 border-none cursor-pointer transition-colors mb-2"
              >
                <span className="w-10 h-10 rounded-full bg-[#C8A646]/20 flex items-center justify-center text-[#C8A646] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[13px] font-extrabold text-[#C8A646] uppercase tracking-wider">11+1 Savings Scheme</div>
                  <div className="text-[11px] text-zinc-500 font-medium mt-0.5">Invest 11 months, get 12th FREE</div>
                </div>
              </button>

              <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 px-2 pt-3 pb-2">Collections</div>

              {[
                { label: 'Rings', icon: '💍', tab: 'Rings' },
                { label: 'Earrings', icon: '✨', tab: 'Earrings' },
                { label: 'Necklaces', icon: '📿', tab: 'Necklace' },
                { label: 'Bangles', icon: '🔮', tab: 'Bangles' },
                { label: 'Bracelets', icon: '🌟', tab: 'Bracelets' },
                { label: 'Mangalsutras', icon: '❤️', tab: 'Mangalsutras' },
              ].map(item => (
                <button
                  key={item.tab}
                  onClick={() => { setMobileMenuOpen(false); changeCategoryTab(item.tab); navigateTo('collections'); }}
                  className="flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-xl active:bg-zinc-50 border-none cursor-pointer transition-colors"
                >
                  <span className="text-xl w-9 text-center">{item.icon}</span>
                  <span className="text-[14px] font-semibold text-zinc-800">{item.label}</span>
                  <svg className="w-4 h-4 text-zinc-300 ml-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}

              <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 px-2 pt-3 pb-2">More</div>

              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('gold-coins'); setCoinPurityTab('24K'); setCoinWeightFilter('all'); }}
                className="flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-xl active:bg-zinc-50 border-none cursor-pointer transition-colors"
              >
                <span className="text-xl w-9 text-center">🪙</span>
                <span className="text-[14px] font-semibold text-zinc-800">Gold Coins</span>
                <svg className="w-4 h-4 text-zinc-300 ml-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo('offers'); }}
                className="flex items-center gap-4 w-full text-left px-4 py-3.5 rounded-xl active:bg-zinc-50 border-none cursor-pointer transition-colors"
              >
                <span className="text-xl w-9 text-center">🏷️</span>
                <span className="text-[14px] font-semibold text-zinc-800">Offers &amp; Showrooms</span>
                <svg className="w-4 h-4 text-zinc-300 ml-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>

            {/* WhatsApp CTA at bottom */}
            <div className="px-5 pb-8 pt-4 shrink-0">
              <a
                href="https://wa.me/919783843978?text=Hello%20H.R.%20Jewellers"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold text-[14px] shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.037L2 22l5.135-1.348a9.954 9.954 0 004.878 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.67-1.037-5.18-2.925-7.07C17.186 3.037 14.678 2 12.012 2z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        , document.body)}

      </div>
    </nav>
  );
}
