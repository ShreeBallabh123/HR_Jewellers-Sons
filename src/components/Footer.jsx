import React from 'react';
import hrLogo from '../assets/logo_new.png';

export default function Footer({
  navigateTo,
  handleCategoryNav,
  triggerAudio
}) {
  return (
    <footer className="bg-[#12071B] text-white pt-16 pb-10 px-6 md:px-12 relative z-10 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_auto_0.8fr_auto_1fr_auto_1.1fr] gap-x-8 gap-y-12 items-start text-center md:text-left">
        
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-[#E6C687]/10 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={hrLogo}
                alt="HR Jewellers &amp; Sons Logo"
                className="relative w-24 h-24 object-contain select-none mix-blend-screen filter drop-shadow-[0_2px_15px_rgba(230,198,135,0.4)] hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h3 className="serif-luxury text-2xl font-bold tracking-[2.5px] text-[#E6C687] leading-none">
                H.R. JEWELLERS
              </h3>
              <h4 className="serif-luxury text-base font-bold tracking-[4px] text-[#E6C687]/90 mt-0.5">
                &amp; SONS
              </h4>
              <p className="text-[10px] tracking-[0.2em] text-[#E6C687]/70 font-sans uppercase font-medium mt-1">
                SINCE 1924
              </p>
            </div>
          </div>

          <p className="serif-luxury italic text-[11px] text-[#E6C687]/80 leading-normal font-medium max-w-[250px]">
            A House of Gold Hallmark Jewellery
          </p>

          {/* Horizontal divider with diamond */}
          <div className="flex items-center gap-1.5 py-1 w-full max-w-[200px] justify-center md:justify-start">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#E6C687]/30"></div>
            <div className="w-1.5 h-1.5 rotate-45 border border-[#E6C687]/40 bg-transparent flex items-center justify-center shrink-0">
              <div className="w-0.5 h-0.5 bg-[#E6C687]"></div>
            </div>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#E6C687]/30"></div>
          </div>

          <p className="text-[11px] text-white/70 leading-relaxed font-sans font-light max-w-[290px]">
            Crafting timeless jewellery since generations. Trusted for purity, craftsmanship and elegance. BIS Hallmarked Gold, Certified Diamonds, Polki Masterpieces and Bespoke Creations.
          </p>

          {/* The 4 badges */}
          <div className="grid grid-cols-4 gap-2 pt-4 w-full max-w-[290px] mx-auto md:mx-0">
            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 hover:border-[#E6C687]/60 hover:scale-105 transition-all">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 21h20L12 3zm0 5l6 10H6l6-10z" />
                </svg>
              </div>
              <span className="text-[8px] text-white/60 font-sans font-semibold tracking-wider uppercase text-center leading-tight">
                BIS<br />Hallmarked
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 hover:border-[#E6C687]/60 hover:scale-105 transition-all">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L12 3l6 9-6 9-6-9z M12 3v18 M6 12h12" />
                </svg>
              </div>
              <span className="text-[8px] text-white/60 font-sans font-semibold tracking-wider uppercase text-center leading-tight">
                Certified<br />Diamonds
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 hover:border-[#E6C687]/60 hover:scale-105 transition-all">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[8px] text-white/60 font-sans font-semibold tracking-wider uppercase text-center leading-tight">
                Secure<br />Payments
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2.5">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 hover:border-[#E6C687]/60 hover:scale-105 transition-all">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                </svg>
              </div>
              <span className="text-[8px] text-white/60 font-sans font-semibold tracking-wider uppercase text-center leading-tight">
                Lifetime<br />Exchange
              </span>
            </div>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="hidden lg:flex flex-col items-center self-stretch justify-center relative px-2">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#E6C687]/15 to-transparent"></div>
          <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 border border-[#E6C687]/40 bg-[#12071B] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#E6C687]"></div>
          </div>
        </div>

        {/* Collections Column */}
        <div className="space-y-5 flex flex-col items-center md:items-start text-center md:text-left md:pl-4 w-full">
          <div className="space-y-1 flex flex-col items-center md:items-start">
            <h4 className="serif-luxury text-base font-bold text-[#E6C687] uppercase tracking-wider">
              Our Collections
            </h4>
            <div className="flex items-center gap-1.5 py-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E6C687]/30"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#E6C687]/40 bg-transparent flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-[#E6C687]"></div>
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E6C687]/30"></div>
            </div>
          </div>

          <ul className="space-y-3.5 text-xs text-white/75 font-light font-sans flex flex-col items-center md:items-start">
            {[
              { label: "Gold Jewellery", action: () => handleCategoryNav('gold') },
              { label: "Diamond Jewellery", action: () => handleCategoryNav('diamond') },
              { label: "Polki Collection", action: () => handleCategoryNav('bridal') },
              { label: "Platinum Collection", action: () => handleCategoryNav('platinum') },
              { label: "Silver Collection", action: () => handleCategoryNav('silver') },
              { label: "Silver Earrings", action: () => handleCategoryNav('silver-earrings') },
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => { triggerAudio('click'); item.action(); }}
                  className="hover:text-white hover:translate-x-1.5 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 cursor-pointer focus:outline-none border-none bg-transparent text-white"
                >
                  <svg className="w-2.5 h-2.5 text-[#E6C687] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => { triggerAudio('shimmer'); navigateTo('gold-coins'); }}
                className="hover:text-white hover:translate-x-1.5 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 font-semibold text-white cursor-pointer focus:outline-none border-none bg-transparent"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C687] shadow-[0_0_8px_rgba(230,198,135,0.8)] inline-block shrink-0" />
                <span className="tracking-wide">Gold Coins</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Divider 2 */}
        <div className="hidden lg:flex flex-col items-center self-stretch justify-center relative px-2">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#E6C687]/15 to-transparent"></div>
          <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 border border-[#E6C687]/40 bg-[#12071B] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#E6C687]"></div>
          </div>
        </div>

        {/* Contact Column */}
        <div className="space-y-5 flex flex-col items-center md:items-start text-center md:text-left md:pl-4 w-full">
          <div className="space-y-1 flex flex-col items-center md:items-start">
            <h4 className="serif-luxury text-base font-bold text-[#E6C687] uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="flex items-center gap-1.5 py-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E6C687]/30"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#E6C687]/40 bg-transparent flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-[#E6C687]"></div>
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E6C687]/30"></div>
            </div>
          </div>

          <div className="space-y-5 text-xs text-white/75 font-sans font-light flex flex-col items-center md:items-start w-full">
            <a href="tel:+919783843978" className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2.5 md:gap-3.5 group hover:text-white transition-colors">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 group-hover:border-[#E6C687]/60 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-semibold tracking-wide font-sans">+91 9783843978</span>
                <span className="text-[10px] text-white/50">(Anil Soni)</span>
              </div>
            </a>

            <a href="tel:+919828131027" className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2.5 md:gap-3.5 group hover:text-white transition-colors">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 group-hover:border-[#E6C687]/60 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-semibold tracking-wide font-sans">+91 9828131027</span>
                <span className="text-[10px] text-white/50">(Bhanwar Lal Soni)</span>
              </div>
            </a>

            <a href="mailto:hrjewellersbkn@gmail.com" className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2.5 md:gap-3.5 group hover:text-white transition-colors">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 group-hover:border-[#E6C687]/60 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="tracking-wide break-all font-sans font-medium text-center md:text-left">hrjewellersbkn@gmail.com</span>
            </a>

            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2.5 md:gap-3.5 group shrink-0">
              <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="tracking-wide leading-relaxed font-sans text-white/70">
                4-D-37, Near Murti Circle,<br />
                J.N.V. Colony, Bikaner,<br />
                Rajasthan 334003
              </p>
            </div>
          </div>
        </div>

        {/* Divider 3 */}
        <div className="hidden lg:flex flex-col items-center self-stretch justify-center relative px-2">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#E6C687]/15 to-transparent"></div>
          <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 border border-[#E6C687]/40 bg-[#12071B] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#E6C687]"></div>
          </div>
        </div>

        {/* Quick Actions Column */}
        <div className="space-y-5 text-left md:pl-4">
          <div className="space-y-1 flex flex-col items-start">
            <h4 className="serif-luxury text-base font-bold text-[#E6C687] uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="flex items-center gap-1.5 py-1">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E6C687]/30"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#E6C687]/40 bg-transparent flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-[#E6C687]"></div>
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E6C687]/30"></div>
            </div>
          </div>

          <div className="space-y-3.5">
            <a
              href="https://wa.me/919783843978?text=Hello%20HR%20Jewellers,%20I%20am%20interested%20in%20your%20luxury%20collections."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-solid border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-solid border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.407 1.46h.007c5.856 0 10.622-4.762 10.625-10.625.002-2.84-1.1-5.509-3.103-7.514C17.28 .472 14.615.018 11.777.018a10.618 10.618 0 00-10.625 10.63c-.001 1.953.512 3.86 1.486 5.485L1.579 20.62l4.675-1.226c.159.087.318.174.393.21.001 0 0 0 0 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#E6C687] font-sans">WHATSAPP US</span>
              </div>
              <svg className="w-3.5 h-3.5 text-[#E6C687] transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="tel:+919783843978"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-solid border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-solid border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#E6C687] font-sans">CALL NOW</span>
              </div>
              <svg className="w-3.5 h-3.5 text-[#E6C687] transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://maps.app.goo.gl/ioex13s3JFuerox28?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl border border-solid border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-solid border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-widest text-[#E6C687] font-sans">GET DIRECTIONS</span>
              </div>
              <svg className="w-3.5 h-3.5 text-[#E6C687] transform group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
