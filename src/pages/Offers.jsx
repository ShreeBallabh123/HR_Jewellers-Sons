import React from 'react';

// Asset Imports
import offerSavingsBanner from '../assets/1778492620039-BS--MCPG--Offer---Desktop-Responsive----2400-x-778.webp';
import bannerDiamond50 from '../assets/Gemini_Generated_Image_11boa611boa611bo.png';
import offerSavings11_1Banner from '../assets/Gemini_Generated_Image_rw2cj3rw2cj3rw2c.png';
import storefrontLocatorBanner from '../assets/Gemini_Generated_Image_abzyycabzyycabzy.png';

export default function Offers({
  navigateTo,
  changeCategoryTab,
  triggerAudio
}) {
  return (
    <div className="bg-[#FCFAFF] text-[#0A2240] min-h-screen pb-16">

      {/* TOP ANNOUNCEMENT BANNERS */}
      <div className="w-full bg-[#031838] border-b border-solid border-[#DDA0DD]/10 py-6 px-4">
        {/* Two Banners Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 select-none animate-slide-up text-center">
          {/* Banner 1: Gold Mine */}
          <div
            onClick={() => {
              triggerAudio('click');
              navigateTo('savings');
            }}
            className="overflow-hidden rounded-2xl relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-solid border-white/10 text-center"
          >
            <img
              src={offerSavingsBanner}
              alt="Gold Mine 11+1 Monthly Installment Plan"
              loading="lazy"
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          </div>

          {/* Banner 2: Diamond Making Charges */}
          <div
            onClick={() => {
              triggerAudio('click');
              changeCategoryTab('Diamond');
              navigateTo('collections');
            }}
            className="overflow-hidden rounded-2xl relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-solid border-white/10 text-center"
          >
            <img
              src={bannerDiamond50}
              alt="Up to 50% Off on Making Charges on Diamond Jewellery"
              loading="lazy"
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
          </div>
        </div>
      </div>

      {/* WHITE AREA BELOW BANNERS */}
      <div className="w-full select-none animate-slide-up bg-white space-y-0 text-center">
        {/* 11+1 GRP Savings Scheme Banner */}
        <div
          onClick={() => {
            triggerAudio('click');
            navigateTo('savings');
          }}
          className="w-full overflow-hidden relative group cursor-pointer shadow-xs text-center"
        >
          <img
            src={offerSavings11_1Banner}
            alt="Gold Mine 11+1 Monthly Installment Plan"
            loading="lazy"
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.005]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        </div>

        {/* HR Jeweller & Sons Storefront Locator Banner */}
        <div
          onClick={() => {
            triggerAudio('click');
            navigateTo('showrooms');
          }}
          className="w-full overflow-hidden relative group cursor-pointer shadow-xs border-t border-solid border-gray-100 text-center"
        >
          <img
            src={storefrontLocatorBanner}
            alt="HR Jeweller & Sons Store Locator"
            loading="lazy"
            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.005]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        </div>

        {/* HR Jeweller & Sons Promise Section */}
        <div className="w-full bg-[#FAF6F8] py-16 lg:py-24 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-solid border-gray-200 select-none text-center">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 text-center">

            {/* Left Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left shrink-0">
              <h3 className="font-serif text-[#031838] text-[28px] sm:text-[36px] lg:text-[44px] font-normal tracking-[0.01em] leading-tight m-0">
                HR Jeweller &amp; Sons
              </h3>
              <h2 className="font-serif text-[#031838] text-[56px] sm:text-[72px] lg:text-[84px] font-extrabold tracking-[0.02em] leading-none mt-1 sm:mt-2 mb-0">
                Promise
              </h2>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 grid grid-cols-3 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12 justify-items-center text-center">
              {/* Circle 1 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <span className="text-[8px] sm:text-[10px] tracking-widest uppercase opacity-75 font-semibold font-sans">SINCE</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold font-serif tracking-wider mt-0.5">1952</span>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Royal Lineage of Bikaner
                </p>
              </div>

              {/* Circle 2 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  100% Certified Jewellery
                </p>
              </div>

              {/* Circle 3 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Lifetime Exchange &amp; Buyback
                </p>
              </div>

              {/* Circle 4 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Guaranteed Purity &amp; Value
                </p>
              </div>

              {/* Circle 5 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  100% Transparency
                </p>
              </div>

              {/* Circle 6 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Free Shipping
                </p>
              </div>

              {/* Circle 7 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Authentic Rajputi Ornaments
                </p>
              </div>

              {/* Circle 8 */}
              <div className="flex flex-col items-center max-w-[120px] text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10">
                    <polygon points="23 7 16 12 23 17 23 7" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                  Personalised Video Consultations
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
