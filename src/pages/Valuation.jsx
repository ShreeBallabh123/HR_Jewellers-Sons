import React, { useState } from 'react';
import { useRates } from '../hooks/useRates';
import { motion } from 'framer-motion';
import luxuryShowroom from '../assets/luxury_showroom.png';
import goldBullionCoin from '../assets/gold_bullion_coin.png';
import silverPoojaThali from '../assets/silver_pooja_thali.png';
import emeraldSovereignRing from '../assets/emerald_sovereign_ring.png';

export default function Valuation({
  navigateTo,
  triggerAudio: triggerAudioProp,
}) {
  // Self-contained: pull rates from context
  const { goldRate24k = 78500, silverRate1g: silverRate = 92 } = useRates();

  // Local calculator state (previously passed as props)
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedPurity, setSelectedPurity] = useState('22K');
  const [weightInput, setWeightInput] = useState('');
  const [makingChargesInput, setMakingChargesInput] = useState('12');
  const [wastageInput, setWastageInput] = useState('5');
  const [consultationModal, setConsultationModal] = useState(false);

  const triggerAudio = (type) => { try { triggerAudioProp?.(type); } catch { /* noop */ } };

  // Calculated bullion cost
  const weightNum = parseFloat(weightInput) || 0;
  const makingPct = parseFloat(makingChargesInput) || 0;
  const wastagePct = parseFloat(wastageInput) || 0;
  const ratePerGram = selectedMetal === 'gold'
    ? (selectedPurity === '24K' ? goldRate24k / 10 : selectedPurity === '22K' ? (goldRate24k * 0.9167) / 10 : (goldRate24k * 0.75) / 10)
    : silverRate;
  const metalValue = weightNum * ratePerGram;
  const makingAmt = metalValue * (makingPct / 100);
  const wastageAmt = metalValue * (wastagePct / 100);
  const calculatedBullionCost = metalValue + makingAmt + wastageAmt;

  return (
    <div className="transition-colors duration-500 min-h-screen pb-12 bg-[#FCF9F5] text-[#2C1A3A] font-sans relative">
      {/* 2. MAIN SECTION (3-column layout) */}
      <section className="relative w-full overflow-hidden select-none py-[80px] lg:py-[100px] px-6 sm:px-12" style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #ECE5D8 100%)' }}>
        {/* Palace Background Image with low opacity for depth */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 filter blur-[2px] pointer-events-none"
          style={{ backgroundImage: `url(${luxuryShowroom})` }}
        />
        <div className="absolute inset-0 bg-[#FCF9F5]/30 backdrop-blur-[0.5px] pointer-events-none" />

        {/* Floating gold particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-70">
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/45 animate-particle-1"></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#DDA0DD]/35 animate-particle-2"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/50 animate-particle-3"></div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">
          {/* COLUMN 1: Headings & trust indicators (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 text-left space-y-6 flex flex-col items-start"
          >
            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#DDA0DD] uppercase flex items-center gap-1.5 font-sans">
                ✦ TIMELESS VALUE • TRANSPARENT PRICING ✦
              </span>
              <h1 className="serif-luxury text-4xl sm:text-[50px] font-bold text-[#2C1A3A] leading-[1.12] font-serif">
                Jewellery Calculator <br />
                <span className="text-[#DDA0DD] italic font-medium font-serif">&amp;</span> Daily Metal Rates
              </h1>
            </div>

            <p className="text-[#2C1A3A]/80 font-light text-sm sm:text-base leading-relaxed tracking-wide max-w-xl font-sans mt-4">
              Plan your next heirloom purchase with absolute confidence. Calculate live gold and silver estimates according to official MCX indexes, making charges, and dynamic wastage adjustments.
            </p>

            {/* Trust features row */}
            <div className="grid grid-cols-3 gap-4 pt-8 w-full border-t border-[#DDA0DD]/20 mt-8">
              <div className="flex flex-col items-start space-y-2 text-left">
                <div className="text-[#DDA0DD] mb-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#2C1A3A] tracking-wider uppercase font-sans">100% Transparent</span>
                <span className="text-[9px] text-[#2C1A3A]/60 leading-relaxed font-light font-sans">No hidden costs</span>
              </div>

              <div className="flex flex-col items-start space-y-2 text-left">
                <div className="text-[#DDA0DD] mb-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#2C1A3A] tracking-wider uppercase font-sans">MCX Certified Rates</span>
                <span className="text-[9px] text-[#2C1A3A]/60 leading-relaxed font-light font-sans">Live market linked</span>
              </div>

              <div className="flex flex-col items-start space-y-2 text-left">
                <div className="text-[#DDA0DD] mb-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L12 4L18 12L12 20L6 12Z M12 4V20 M6 12H18" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#2C1A3A] tracking-wider uppercase font-sans">Optimized Estimates</span>
                <span className="text-[9px] text-[#2C1A3A]/60 leading-relaxed font-light font-sans">Wastage smartly applied</span>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2: Dashboard rate card (4 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <div className="bg-gradient-to-b from-[#251336] to-[#160B21] border border-[#DDA0DD]/35 rounded-[24px] p-6 shadow-2xl space-y-5 text-left relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#DDA0DD]/10 flex items-center justify-center border border-[#DDA0DD]/20">
                    <svg className="w-5 h-5 text-[#DDA0DD]" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="14" width="8" height="4" rx="0.5" />
                      <rect x="13" y="14" width="8" height="4" rx="0.5" />
                      <rect x="8" y="8" width="8" height="4" rx="0.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#DDA0DD] tracking-[0.2em] uppercase block font-sans">LIVE GOLD RATE</span>
                    <span className="text-[8px] text-white/50 tracking-wider uppercase block font-sans">TODAY'S MARKET RATE</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-white/80 font-semibold cursor-pointer hover:bg-white/10 transition-all font-sans select-none">
                  <span>INR</span>
                  <span className="text-[7px]">▼</span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Gold 24K Capsule */}
                <div className="flex justify-between items-center px-4 py-3 bg-[#331C45] rounded-xl border border-[#DDA0DD]/10">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white font-sans">24K</span>
                    <span className="text-[8px] text-[#DDA0DD]/80 font-medium uppercase font-sans">999 Purity</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹{(goldRate24k || 7788).toLocaleString('en-IN')} <span className="text-[9px] font-normal text-white/60">/g</span></span>
                    <span className="text-[8px] text-[#00E676] font-semibold font-mono flex items-center gap-0.5 mt-0.5">
                      +0.35% (24h)
                    </span>
                  </div>
                  <svg className="w-12 h-6 text-[#DDA0DD] opacity-80" viewBox="0 0 100 30" fill="none">
                    <path d="M0,20 Q20,10 40,22 T80,8 T100,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Gold 22K Capsule */}
                <div className="flex justify-between items-center px-4 py-3 bg-[#331C45] rounded-xl border border-[#DDA0DD]/10">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white font-sans">22K</span>
                    <span className="text-[8px] text-[#DDA0DD]/80 font-medium uppercase font-sans">916 Purity</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹{Math.round(goldRate24k * 0.9167).toLocaleString('en-IN')} <span className="text-[9px] font-normal text-white/60">/g</span></span>
                    <span className="text-[8px] text-[#00E676] font-semibold font-mono flex items-center gap-0.5 mt-0.5">
                      +0.32% (24h)
                    </span>
                  </div>
                  <svg className="w-12 h-6 text-[#DDA0DD] opacity-80" viewBox="0 0 100 30" fill="none">
                    <path d="M0,20 Q20,10 40,22 T80,8 T100,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Silver 999 Capsule */}
                <div className="flex justify-between items-center px-4 py-3 bg-[#331C45] rounded-xl border border-[#DDA0DD]/10">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white font-sans uppercase">SILVER 999</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹{(silverRate || 95).toLocaleString('en-IN')} <span className="text-[9px] font-normal text-white/60">/g</span></span>
                    <span className="text-[8px] text-[#FF4D4D] font-semibold font-mono flex items-center gap-0.5 mt-0.5">
                      -0.15% (24h)
                    </span>
                  </div>
                  <svg className="w-12 h-6 text-[#DDA0DD] opacity-80" viewBox="0 0 100 30" fill="none">
                    <path d="M0,5 Q20,20 45,8 T80,22 T100,25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => {
                  if (triggerAudio) triggerAudio('shimmer');
                  const el = document.getElementById('interactive-calculator');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setCalculatorModalOpen(true);
                  }
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#DDA0DD] via-[#F4D38A] to-[#DDA0DD] hover:opacity-90 text-[#2c1a3a] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                CALCULATE JEWELLERY PRICE <span className="text-sm">→</span>
              </button>
            </div>
          </motion.div>

          {/* COLUMN 3: Stack of promo cards (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-3 space-y-4 flex flex-col items-stretch"
          >
            {/* Card 1: Gold */}
            <div className="group bg-gradient-to-br from-[#FCFBF7] to-[#F5E5C3] border border-[#DDA0DD]/20 rounded-2xl p-5 flex items-center justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col text-left space-y-1">
                <span className="text-[8px] font-bold text-[#BA55D3] tracking-widest uppercase">INVEST IN PURITY</span>
                <h4 className="serif-luxury text-sm font-bold text-[#2C1A3A] leading-tight">24K Solid Gold Bullion</h4>
                <span className="text-[8px] text-[#2C1A3A]/70 uppercase tracking-wider">999.9 Purity</span>
                <button
                  onClick={() => {
                    if (triggerAudio) triggerAudio('click');
                    navigateTo('gold-coins');
                  }}
                  className="text-[9px] font-bold text-[#2C1A3A] hover:text-[#DDA0DD] flex items-center gap-0.5 pt-2 cursor-pointer bg-transparent border-none text-left w-fit focus:outline-none"
                >
                  View Details <span className="text-[10px]">→</span>
                </button>
              </div>
              <div className="w-16 h-16 shrink-0 relative">
                <img src={goldBullionCoin} className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" alt="" />
              </div>
            </div>

            {/* Card 2: Silver */}
            <div className="group bg-gradient-to-br from-[#FCFDFD] to-[#E6ECEF] border border-[#DDA0DD]/15 rounded-2xl p-5 flex items-center justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col text-left space-y-1">
                <span className="text-[8px] font-bold text-[#8A9BA8] tracking-widest uppercase">EVERYDAY VALUE</span>
                <h4 className="serif-luxury text-sm font-bold text-[#2C1A3A] leading-tight">Pure Silver Rates</h4>
                <span className="text-[8px] text-[#2C1A3A]/70 uppercase tracking-wider">999 Purity Silver</span>
                <button
                  onClick={() => {
                    if (triggerAudio) triggerAudio('click');
                    if (setCalculatorModalOpen) setCalculatorModalOpen(true);
                    setSelectedMetal('silver');
                    setSelectedPurity('999');
                  }}
                  className="text-[9px] font-bold text-[#2C1A3A] hover:text-[#DDA0DD] flex items-center gap-0.5 pt-2 cursor-pointer bg-transparent border-none text-left w-fit focus:outline-none"
                >
                  View Details <span className="text-[10px]">→</span>
                </button>
              </div>
              <div className="w-16 h-16 shrink-0 relative">
                <img src={silverPoojaThali} className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] opacity-90" alt="" />
              </div>
            </div>

            {/* Card 3: Jewellery */}
            <div className="group bg-gradient-to-br from-[#2D1445] to-[#170924] border border-[#DDA0DD]/30 rounded-2xl p-5 flex items-center justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col text-left space-y-1">
                <span className="text-[8px] font-bold text-[#DDA0DD] tracking-widest uppercase">NEW COLLECTION</span>
                <h4 className="serif-luxury text-sm font-bold text-white leading-tight">Exquisite Designs</h4>
                <span className="text-[8px] text-white/70 uppercase tracking-wider">Crafted to Perfection</span>
                <button
                  onClick={() => {
                    if (triggerAudio) triggerAudio('click');
                    handleCategoryNav('all');
                  }}
                  className="text-[9px] font-bold text-[#DDA0DD] hover:text-[#E6C687] flex items-center gap-0.5 pt-2 cursor-pointer bg-transparent border-none text-left w-fit focus:outline-none"
                >
                  Explore Collection <span className="text-[10px]">→</span>
                </button>
              </div>
              <div className="w-16 h-16 shrink-0 relative">
                <img src={emeraldSovereignRing} className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(212,175,55,0.25)]" alt="" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
        SECTION 2.5: INLINE INTERACTIVE VALUATION CALCULATOR
        ========================================== */}
      <section id="interactive-calculator" className="relative w-full overflow-hidden py-16 px-6 sm:px-12 border-t border-[#DDA0DD]/20 select-none bg-[#FCF9F5]">
        {/* Star details or floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-40">
          <div className="absolute top-12 left-10 text-gold text-lg">✦</div>
          <div className="absolute bottom-12 right-12 text-gold text-sm">✨</div>
        </div>

        <div className="max-w-[1440px] mx-auto relative z-20">
          {/* Header text */}
          <div className="text-center space-y-3 mb-12">
            <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#DDA0DD] uppercase block font-sans">SHOWROOM WORKSPACE</span>
            <h2 className="serif-luxury text-3xl sm:text-4xl font-bold text-[#2C1A3A] font-serif">Interactive Valuation Simulator</h2>
            <div className="w-16 h-[1px] bg-[#DDA0DD] mx-auto mt-3"></div>
            <p className="text-[#2C1A3A]/70 text-xs sm:text-sm font-light max-w-xl mx-auto tracking-wide mt-2 font-sans">
              Experiment with custom parameters below. Drag the sliders to simulate live metal weight, purity standards, making costs, and wastage dynamics to view real-time estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Configuration & Simulators (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Purity Config Card */}
                <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-6 space-y-5 text-left shadow-sm">
                  <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                    01. Purity Configuration
                  </span>

                  {/* Metal Selector Switch */}
                  <div className="flex rounded-full p-1 border border-[#DDA0DD]/20 bg-[#4B136A]/5">
                    <button
                      onClick={() => {
                        if (triggerAudio) triggerAudio('click');
                        setSelectedMetal('gold');
                        setSelectedPurity('22K');
                      }}
                      className={`flex-1 text-center font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${selectedMetal === 'gold'
                        ? 'bg-[#4B136A] text-white shadow-md'
                        : 'text-gray-500 hover:text-[#4B136A]'
                        }`}
                    >
                      Fine Gold
                    </button>
                    <button
                      onClick={() => {
                        if (triggerAudio) triggerAudio('click');
                        setSelectedMetal('silver');
                        setSelectedPurity('999');
                      }}
                      className={`flex-1 text-center font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${selectedMetal === 'silver'
                        ? 'bg-[#4B136A] text-white shadow-md'
                        : 'text-gray-500 hover:text-[#4B136A]'
                        }`}
                    >
                      Fine Silver
                    </button>
                  </div>

                  {/* Purity list */}
                  <div className="space-y-2">
                    {selectedMetal === 'gold' ? (
                      [
                        { id: "24K", label: "24 Karat Pure", purity: "99.9% Gold" },
                        { id: "22K", label: "22 Karat Standard", purity: "91.6% BIS Hallmark" },
                        { id: "18K", label: "18 Karat Ornaments", purity: "75.0% Gold" }
                      ].map((pur) => (
                        <button
                          key={pur.id}
                          onClick={() => {
                            if (triggerAudio) triggerAudio('click');
                            setSelectedPurity(pur.id);
                          }}
                          className={`w-full p-3 rounded-[16px] border text-left flex justify-between items-center transition-all duration-300 cursor-pointer focus:outline-none ${selectedPurity === pur.id
                            ? 'bg-[#4B136A] border-[#DDA0DD] text-white shadow-md'
                            : 'bg-[#4B136A]/5 border-gray-150 hover:border-[#DDA0DD]/50 hover:bg-[#4B136A]/10 text-[#2C1A3A]'
                            }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{pur.label}</span>
                            <span className="text-[9px] opacity-70 font-semibold block uppercase">{pur.purity}</span>
                          </div>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${selectedPurity === pur.id ? 'border-[#DDA0DD] text-[#DDA0DD]' : 'border-gray-300 text-transparent'
                            }`}>
                            ✓
                          </span>
                        </button>
                      ))
                    ) : (
                      [
                        { id: "999", label: "999 Fine Silver", purity: "99.9% Pure Silver" },
                        { id: "925", label: "925 Sterling Silver", purity: "92.5% Hallmark Standard" }
                      ].map((pur) => (
                        <button
                          key={pur.id}
                          onClick={() => {
                            if (triggerAudio) triggerAudio('click');
                            setSelectedPurity(pur.id);
                          }}
                          className={`w-full p-3 rounded-[16px] border text-left flex justify-between items-center transition-all duration-300 cursor-pointer focus:outline-none ${selectedPurity === pur.id
                            ? 'bg-[#4B136A] border-[#DDA0DD] text-white shadow-md'
                            : 'bg-[#4B136A]/5 border-gray-150 hover:border-[#DDA0DD]/50 hover:bg-[#4B136A]/10 text-[#2C1A3A]'
                            }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{pur.label}</span>
                            <span className="text-[9px] opacity-70 font-semibold block uppercase">{pur.purity}</span>
                          </div>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${selectedPurity === pur.id ? 'border-[#DDA0DD] text-[#DDA0DD]' : 'border-gray-300 text-transparent'
                            }`}>
                            ✓
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Spot Rate Control Card */}
                <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-6 space-y-4 text-left flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                      02. Live Spot Rate (per 1g)
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (triggerAudio) triggerAudio('click');
                          if (selectedMetal === 'gold') setGoldRate24k(prev => Math.max(5000, prev - 10));
                          else setSilverRate(prev => Math.max(50, +(prev - 0.2).toFixed(2)));
                        }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none focus:outline-none"
                      >
                        -
                      </button>

                      <div className="text-center flex items-center gap-1.5 justify-center">
                        <span className="serif-luxury text-xl font-bold text-[#DDA0DD]">₹</span>
                        <input
                          type="number"
                          value={selectedMetal === 'gold' ? goldRate24k : silverRate}
                          onChange={(e) => {
                            const val = Math.max(1, +e.target.value);
                            if (triggerAudio) triggerAudio('click');
                            if (selectedMetal === 'gold') setGoldRate24k(val);
                            else setSilverRate(val);
                          }}
                          className="serif-luxury text-xl font-black text-center text-[#DDA0DD] w-28 bg-transparent border-b-2 border-dashed border-[#DDA0DD]/35 focus:border-[#DDA0DD] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (triggerAudio) triggerAudio('click');
                          if (selectedMetal === 'gold') setGoldRate24k(prev => prev + 10);
                          else setSilverRate(prev => +(prev + 0.2).toFixed(2));
                        }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-405 leading-normal block text-center mt-2 font-sans">Adjust live spot rates to preview custom jewelry estimates.</span>
                  </div>
                </div>
              </div>

              {/* Weight & Charges Slider Section */}
              <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-6 space-y-6 text-left shadow-sm">
                <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                  03. Simulated Ornament Specifications
                </span>

                {/* Weight Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A] font-sans">
                    <span>Gross Weight</span>
                    <span className="flex items-center gap-1 text-[#DDA0DD]">
                      <input
                        type="number"
                        value={weightInput}
                        onChange={(e) => setWeightInput(Math.max(1, Math.min(1000, +e.target.value)))}
                        className="w-12 text-center bg-transparent border-b border-[#DDA0DD]/45 text-[#DDA0DD] font-black focus:outline-none"
                      />
                      <span>Grams</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setWeightInput(prev => Math.max(1, prev - 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">-</button>
                    <input
                      type="range"
                      min="1"
                      max="250"
                      value={weightInput}
                      onChange={(e) => setWeightInput(+e.target.value)}
                      className="flex-1 accent-[#4B136A] cursor-pointer"
                    />
                    <button onClick={() => setWeightInput(prev => Math.min(250, prev + 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">+</button>
                  </div>
                </div>

                {/* Making & Wastage Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Making charges */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A] font-sans">
                      <span>Making Charges</span>
                      <span className="text-[#DDA0DD] font-bold">{makingChargesInput}%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setMakingChargesInput(prev => Math.max(0, prev - 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">-</button>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={makingChargesInput}
                        onChange={(e) => setMakingChargesInput(+e.target.value)}
                        className="flex-1 accent-[#4B136A] cursor-pointer"
                      />
                      <button onClick={() => setMakingChargesInput(prev => Math.min(25, prev + 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">+</button>
                    </div>
                  </div>

                  {/* Wastage */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A] font-sans">
                      <span>Wastage/Loss</span>
                      <span className="text-[#DDA0DD] font-bold">{wastageInput}%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setWastageInput(prev => Math.max(0, prev - 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">-</button>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={wastageInput}
                        onChange={(e) => setWastageInput(+e.target.value)}
                        className="flex-1 accent-[#4B136A] cursor-pointer"
                      />
                      <button onClick={() => setWastageInput(prev => Math.min(15, prev + 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none focus:outline-none">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Quote Receipt (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#4B136A] via-[#220033] to-[#4B136A] border border-[#DDA0DD]/35 rounded-[24px] p-6 shadow-2xl space-y-6 text-left text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDA0DD]/10 blur-xl rounded-full pointer-events-none"></div>

                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[8px] text-[#DDA0DD] tracking-[0.25em] font-extrabold block">LIVE SHOWROOM QUOTE</span>
                    <span className="text-xs font-bold font-mono text-white/90">
                      {selectedMetal === 'gold' ? `Gold ${selectedPurity}` : `Silver ${selectedPurity}`}
                    </span>
                  </div>
                  <span className="text-xl">👑</span>
                </div>

                <div className="space-y-3.5 text-[11px] font-mono text-white/80">
                  <div className="flex justify-between">
                    <span>Pure Metal Weight:</span>
                    <span className="font-semibold text-white">{weightInput} g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bullion Value:</span>
                    <span className="font-semibold text-white">
                      ₹{Math.round(
                        (selectedMetal === 'gold' ? goldRate24k : silverRate) *
                        weightInput *
                        (selectedMetal === 'gold'
                          ? (selectedPurity === '24K' ? 1 : selectedPurity === '22K' ? 0.9167 : 0.75)
                          : (selectedPurity === '999' ? 1 : 0.925))
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Making Charges ({makingChargesInput}%):</span>
                    <span className="font-semibold text-white">
                      ₹{Math.round(
                        (selectedMetal === 'gold' ? goldRate24k : silverRate) *
                        weightInput *
                        (selectedMetal === 'gold'
                          ? (selectedPurity === '24K' ? 1 : selectedPurity === '22K' ? 0.9167 : 0.75)
                          : (selectedPurity === '999' ? 1 : 0.925)) *
                        (makingChargesInput / 100)
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wastage/Loss ({wastageInput}%):</span>
                    <span className="font-semibold text-white">
                      ₹{Math.round(
                        (selectedMetal === 'gold' ? goldRate24k : silverRate) *
                        weightInput *
                        (selectedMetal === 'gold'
                          ? (selectedPurity === '24K' ? 1 : selectedPurity === '22K' ? 0.9167 : 0.75)
                          : (selectedPurity === '999' ? 1 : 0.925)) *
                        (wastageInput / 100)
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3 text-[#E7C86E]">
                    <span>GST (3% standard):</span>
                    <span className="font-semibold">
                      ₹{Math.round(
                        (selectedMetal === 'gold' ? goldRate24k : silverRate) *
                        weightInput *
                        (selectedMetal === 'gold'
                          ? (selectedPurity === '24K' ? 1 : selectedPurity === '22K' ? 0.9167 : 0.75)
                          : (selectedPurity === '999' ? 1 : 0.925)) *
                        (1 + (makingChargesInput / 100) + (wastageInput / 100)) *
                        0.03
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl py-4 text-center space-y-1">
                  <span className="text-[8px] text-white/60 tracking-[0.2em] font-bold block uppercase">Estimated Final Value</span>
                  <span className="text-[#DDA0DD] font-black text-3xl block tracking-wide">
                    ₹{calculatedBullionCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[8px] text-white/40 font-mono block">ALL ESTIMATES INC. TAXES</span>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      if (triggerAudio) triggerAudio('shimmer');
                      setConsultationModal(true);
                    }}
                    className="w-full py-3.5 rounded-[16px] bg-gradient-to-r from-[#DDA0DD] via-[#E7C86E] to-[#DDA0DD] hover:from-[#E7C86E] hover:to-[#DDA0DD] text-[#220033] font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer focus:outline-none"
                  >
                    Book Showroom Lock Rate
                  </button>
                  <button
                    onClick={() => {
                      if (triggerAudio) triggerAudio('click');
                      const text = `Hello H.R. Jewellers, I simulated a dynamic estimation quote via your Jewellery Bullion Calculator:\n\n*Metal Configuration:* ${selectedMetal.toUpperCase()} (${selectedPurity})\n*Gross Weight:* ${weightInput} grams\n*Making Charge:* ${makingChargesInput}%\n*Wastage Factor:* ${wastageInput}%\n*Calculated Value:* Rs. ${calculatedBullionCost.toLocaleString('en-IN')}\n\nPlease lock this index for a bridal trousseau booking!`;
                      window.open(`https://wa.me/919783843978?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="w-full py-3.5 rounded-[16px] border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer focus:outline-none"
                  >
                    Share Receipt via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM TRUST STRIP */}
      <div className="bg-[#F5EFEB] border-t border-[#DDA0DD]/25 py-6 select-none relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-2 text-center items-center divide-y md:divide-y-0 md:divide-x divide-[#DDA0DD]/20">
          {/* Item 1 */}
          <div className="flex flex-col items-center justify-center gap-1.5 px-3">
            <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">MCX Verified</span>
            <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Real-time market data</span>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
            <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">Updated Live</span>
            <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">MCX Index Linked</span>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
            <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">No Hidden Fees</span>
            <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Absolute transparency</span>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
            <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">Simple EMI Scheme</span>
            <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Start from 1,000/mo</span>
          </div>

          {/* Item 5 */}
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
            <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">Johari Support</span>
            <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Call 97838 43978</span>
          </div>
        </div>
      </div>
    </div>
  );
}
