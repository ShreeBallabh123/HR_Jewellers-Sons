import React from 'react';
import hrLogo from '../assets/logo_new.png';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FCFBF9] bg-gradient-to-br from-[#FFFFFF] via-[#FAF9F5] to-[#F3EFE9] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Soft Ambient Spotlight Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#C8A646]/5 blur-[120px] pointer-events-none animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDuration: '4s' }} />

      {/* Subtle Gold Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute w-1 h-1 bg-[#C8A646] rounded-full top-[20%] left-[30%] animate-particle-1" />
        <div className="absolute w-1.5 h-1.5 bg-[#C8A646] rounded-full top-[60%] left-[15%] animate-particle-2" />
        <div className="absolute w-1 h-1 bg-[#C8A646] rounded-full top-[80%] left-[75%] animate-particle-3" />
        <div className="absolute w-2 h-2 bg-[#C8A646] rounded-full top-[40%] left-[85%] animate-particle-1" />
        <div className="absolute w-1 h-1 bg-[#C8A646] rounded-full top-[15%] left-[65%] animate-particle-2" />
      </div>

      {/* Main Brand Seal & Typography */}
      <div className="relative flex flex-col items-center text-center animate-luxury-splash">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#C8A646]/10 filter blur-2xl scale-75 animate-pulse" />
          <img
            src={hrLogo}
            alt="HR Jewellers &amp; Sons Logo"
            className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] object-contain select-none relative z-10 filter drop-shadow-[0_4px_20px_rgba(200,166,70,0.15)]"
          />
        </div>

        <h1 className="serif-luxury text-sm md:text-base font-bold tracking-[8px] text-[#C8A646] mt-5 uppercase select-none">
          HR JEWELLERS AND SONS
        </h1>

        {/* Luxury Loading Indicator */}
        <div className="w-[140px] h-[2px] bg-[#C8A646]/15 rounded-full mt-10 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[#8A6623] via-[#C8A646] to-[#8A6623] rounded-full absolute top-0 left-0 animate-luxury-loader" />
        </div>
      </div>
    </div>
  );
}
