import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { useCart } from '../hooks/useCart';

export default function MainLayout({
  children,
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
  navigateToPDP,
  genderFilter,
  setGenderFilter
}) {
  const { cartOpen, setCartOpen } = useCart();

  return (
    <div className="font-sans min-h-screen relative overflow-x-clip bg-[#FBF9FF] text-[#4A126D] selection:bg-[#4A126D]/10 selection:text-[#4A126D]">
      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        navigateTo={navigateTo}
        changeCategoryTab={changeCategoryTab}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        triggerAudio={triggerAudio}
        setConsultationModal={setConsultationModal}
        setCoinPurityTab={setCoinPurityTab}
        setCoinWeightFilter={setCoinWeightFilter}
        setMetalFilter={setMetalFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        navigateToPDP={navigateToPDP}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
      />

      {/* Main Content Area */}
      <div className="pt-[116px] lg:pt-[150px]">
        {children}
      </div>

      {/* Floating WhatsApp Quick Connect Button */}
      <div className="fixed bottom-16 sm:bottom-24 lg:bottom-8 right-3 sm:right-6 lg:right-8 z-40">
        <a
          href="https://wa.me/919783843978?text=Hello%20H.R.%20Jewellers,%20I%27d%20like%20to%20inquire%20about%20your%20signature%20collections."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerAudio('shimmer')}
          className="relative w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#120422] to-[#4A126D] border-2 border-solid border-[#DDA0DD] rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.45)] hover:scale-110 active:scale-95 transition-all duration-500 group cursor-pointer focus:outline-none"
          title="Connect on WhatsApp"
        >
          {/* Outer Pulsing Gold Rings */}
          <span className="absolute -inset-0.5 sm:-inset-1 rounded-full border border-solid border-[#DDA0DD] animate-ping opacity-25 group-hover:opacity-50" style={{ animationDuration: '2s' }} />
          <span className="absolute -inset-1 sm:-inset-2 rounded-full border border-solid border-[#DDA0DD]/60 animate-ping opacity-15 group-hover:opacity-30" style={{ animationDuration: '3s' }} />

          {/* Rotating Accent Circle */}
          <svg className="absolute w-8 h-8 sm:w-12 sm:h-12 text-[#DDA0DD] opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          </svg>

          {/* WhatsApp Gold Icon */}
          <svg className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 text-[#DDA0DD] group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_5px_rgba(212,175,55,0.5)]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.037L2 22l5.135-1.348a9.954 9.954 0 004.878 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.67-1.037-5.18-2.925-7.07C17.186 3.037 14.678 2 12.012 2zm5.727 14.153c-.313.882-1.554 1.61-2.148 1.666-.59.055-1.18.326-3.766-.694-2.585-1.02-4.237-3.663-4.364-3.834-.127-.171-1.03-1.374-1.03-2.623 0-1.25.654-1.862.887-2.102.233-.24.509-.3.678-.3.17 0 .34 0 .487.007.155.007.363-.058.567.442.204.5.7 1.713.76 1.838.06.126.1.272.017.438-.083.166-.124.272-.25.418-.125.146-.263.327-.375.44-.124.125-.253.26-.11.507.144.247.64 1.056 1.373 1.71.942.843 1.737 1.103 1.983 1.226.246.123.39.103.535-.062.145-.165.62-.72.787-.966.166-.247.33-.206.555-.124.225.083 1.427.674 1.674.8.247.124.412.185.472.289.06.103.06.6-.253 1.482z" />
          </svg>
        </a>
      </div>

      {/* Footer Details — desktop only */}
      <div className="hidden lg:block">
        <Footer
          navigateTo={navigateTo}
          handleCategoryNav={(cat) => {
            changeCategoryTab(cat === 'gold' ? 'Collections' : cat.charAt(0).toUpperCase() + cat.slice(1));
            navigateTo('collections');
          }}
          triggerAudio={triggerAudio}
        />
      </div>

      {/* Shopping Bag Drawer Overlay */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        navigateTo={navigateTo}
      />
    </div>
  );
}
