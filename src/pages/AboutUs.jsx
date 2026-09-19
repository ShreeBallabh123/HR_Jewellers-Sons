import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  Gem, 
  Award, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  HeartHandshake, 
  Crown, 
  Layers, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

import hrLogo from '../assets/logo_new.png';
import heritageBg from '../assets/heritage_palace_interior.png';
import royalBride from '../assets/royal_indian_bride.png';
import luxuryShowroom from '../assets/luxury_showroom.png';
import kadaImg from '../assets/gold_kada.png';
import solitaireImg from '../assets/solitaries.png';

export default function AboutUs({ navigateTo, triggerAudio: triggerAudioProp }) {
  const triggerAudio = (type = 'click') => {
    try { triggerAudioProp?.(type); } catch { /* noop */ }
  };

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    triggerAudio('click');
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How do I verify the authenticity and purity of HR Jewellers gold?",
      a: "Every single piece of gold jewellery created by HR Jewellers & Sons is certified with a 100% BIS 916 Hallmark, featuring the BIS triangular logo, karat purity mark, and a unique 6-digit HUID (Hallmark Unique Identification) traceable on the official BIS Care app."
    },
    {
      q: "Can I order customized bespoke bridal and heritage jewellery?",
      a: "Yes! Our master goldsmiths work directly with you to craft bespoke bridal sets, polki jadau necklaces, solitaires, and antique heirloom designs tailored precisely to your personal sketches, weight preferences, and gemstone choices."
    },
    {
      q: "What is the HR Jewellers 11+1 Gold Savings Scheme?",
      a: "Our signature 11+1 scheme allows you to invest a fixed monthly installment for 11 months, and HR Jewellers & Sons contributes the 12th month installment as a loyalty bonus, allowing you to redeem the total value in hallmarked gold jewellery."
    },
    {
      q: "Do you offer virtual video consultations for distant or NRI clients?",
      a: "Yes, we host dedicated one-on-one virtual showroom appointments via video call where our senior gold consultants showcase live collections, weight certifications, and detailed gemstone specifications from our Bikaner boutique."
    },
    {
      q: "What is your lifetime exchange and buyback policy?",
      a: "We offer a transparent lifetime exchange and buyback guarantee on all our BIS Hallmarked gold and certified diamond jewellery based on prevalent market bullion rates and transparent minimal deductions."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1A1A1A] font-sans selection:bg-[#C8A646]/20 selection:text-[#1A1A1A]">
      <Helmet>
        <title>About Us | HR Jewellers & Sons - Royal Goldsmith Legacy</title>
        <meta 
          name="description" 
          content="Learn about HR Jewellers & Sons, Rajasthan's trusted maison of BIS 916 Hallmarked Gold, Certified Syndicate Diamonds, and royal Bikaneri Jadau jewellery since 1996." 
        />
      </Helmet>

      {/* ========================================================
          HERO SECTION: THE ROYAL MAISON
          ======================================================== */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#12071B] text-white px-6 sm:px-12 py-20 text-center select-none">
        {/* Ambient Palace Interior Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
          style={{ backgroundImage: `url(${heritageBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12071B]/95 via-[#1E0B2B]/90 to-[#12071B] pointer-events-none" />

        {/* Golden ambient glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C8A646]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6">
          {/* Top Vintage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-solid border-[#E6C687]/30 backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-[#E6C687]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#E6C687]">
              ESTABLISHED 1996 • DECADES OF TRUST
            </span>
          </div>

          {/* Headline */}
          <h1 className="serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            A Century of Purity, <br />
            <span className="bg-gradient-to-r from-[#E6C687] via-[#F3D9A4] to-[#C8A646] bg-clip-text text-transparent italic font-serif">
              Ancestral Craftsmanship &amp; Trust
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base font-light text-white/80 max-w-2xl leading-relaxed font-sans">
            Welcome to <strong className="font-semibold text-[#E6C687]">HR Jewellers &amp; Sons</strong>. For generations, our family-led maison has created royal bridal jewellery, certified natural diamonds, and hallmark gold bullion with unwavering honesty and unmatched artisanal precision in Bikaner, Rajasthan.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={() => { triggerAudio('click'); navigateTo('collections'); }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-[#12071B] font-extrabold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(200,166,70,0.3)] cursor-pointer border-none"
            >
              Explore Collections
            </button>
            <button
              onClick={() => { triggerAudio('shimmer'); navigateTo('heritage'); }}
              className="px-8 py-3.5 rounded-full border border-solid border-[#E6C687]/50 text-[#E6C687] hover:bg-white/5 font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer bg-transparent"
            >
              Heritage Story
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-solid border-white/10 w-full max-w-3xl mt-6">
            <div className="flex flex-col items-center">
              <span className="serif-luxury text-2xl sm:text-3xl font-bold text-[#E6C687]">100+</span>
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mt-1">Years Heritage</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="serif-luxury text-2xl sm:text-3xl font-bold text-[#E6C687]">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mt-1">BIS Hallmarked</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="serif-luxury text-2xl sm:text-3xl font-bold text-[#E6C687]">50,000+</span>
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mt-1">Happy Families</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="serif-luxury text-2xl sm:text-3xl font-bold text-[#E6C687]">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mt-1">Certified Diamonds</span>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 02: THE FOUNDING STORY & VISION
          ======================================================== */}
      <section className="py-20 px-6 sm:px-12 max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase Frame */}
          <div className="relative mx-auto max-w-[480px] w-full">
            <div className="relative rounded-[28px] overflow-hidden border border-solid border-[#E8E3DA] shadow-2xl bg-white p-3">
              <img 
                src={royalBride} 
                alt="HR Jewellers Royal Heritage" 
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover rounded-[22px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[28px] pointer-events-none" />
              
              {/* Floating Seal */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-solid border-[#E8E3DA] shadow-lg flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#12071B] flex items-center justify-center text-[#E6C687] shrink-0 font-serif font-black text-xl">
                  HR
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1A1A1A] serif-luxury">Shri Bhanwar Lal Soni &amp; Anil Soni</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Custodians of Bikaneri Royal Goldsmith Traditions</p>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-tr from-[#C8A646] to-[#F3D9A4] rounded-full flex flex-col items-center justify-center text-[#12071B] shadow-xl font-sans text-center p-2 border-2 border-white">
              <span className="text-[8px] font-extrabold uppercase tracking-widest leading-tight">SINCE</span>
              <span className="serif-luxury font-black text-base leading-none">1996</span>
              <span className="text-[7px] font-bold uppercase tracking-wider">BIKANER</span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold tracking-[0.25em] text-[#C8A646] uppercase block font-sans">
                ✦ OUR ORIGINS &amp; PHILOSOPHY
              </span>
              <h2 className="serif-luxury text-2xl sm:text-4xl font-bold text-[#1A1A1A] leading-tight">
                Where Heritage Goldsmithing Meets Contemporary Luxury
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Rooted in the historic city of Bikaner, <strong className="text-[#1A1A1A] font-semibold">HR Jewellers &amp; Sons</strong> was founded with a single sacred conviction: that gold is not merely an ornament, but an enduring embodiment of family love, cultural heritage, and auspicious prosperity.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Over the last 10 decades, under the visionary guidance of <strong className="text-[#1A1A1A]">Shri Bhanwar Lal Soni</strong> and <strong className="text-[#1A1A1A]">Shri Anil Soni</strong>, our boutique has evolved from a revered traditional goldsmith workshop into an elite jewellery destination known across Northern India.
            </p>

            {/* Three Key Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-solid border-[#E8E3DA]">
                <CheckCircle2 className="w-5 h-5 text-[#C8A646] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Ancestral Kundan &amp; Polki Mastery</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Authentic 24K Jadau foil setting techniques passed down across three generations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-solid border-[#E8E3DA]">
                <CheckCircle2 className="w-5 h-5 text-[#C8A646] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">100% Guaranteed Gold Purity</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Every piece is laser hallmarked with government BIS 916 certification and HUID tracking.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-solid border-[#E8E3DA]">
                <CheckCircle2 className="w-5 h-5 text-[#C8A646] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Uncompromising Honest Pricing</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Clear invoices separating net gold weight, diamond carats, making charges, and taxes.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 03: THE 4 PILLARS OF TRUST
          ======================================================== */}
      <section className="py-16 px-6 sm:px-12 bg-white border-y border-solid border-[#E8E3DA]">
        <div className="max-w-[1340px] mx-auto text-center space-y-12">
          
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#C8A646] uppercase block font-sans">
              ✦ WHY FAMILIES TRUST HR JEWELLERS
            </span>
            <h2 className="serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              The Four Pillars of Our Promise
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Every purchase at HR Jewellers &amp; Sons is backed by a lifelong bond of security, purity, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Pillar 1 */}
            <div className="bg-[#FAF9F7] p-6 rounded-2xl border border-solid border-[#E8E3DA] hover:border-[#C8A646]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#12071B] flex items-center justify-center text-[#E6C687]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="serif-luxury text-base font-bold text-[#1A1A1A]">
                100% BIS 916 Hallmark
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Strict government hallmarking standards with 6-digit HUID code ensuring pure 22K (916) and 18K (750) certified bullion.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#FAF9F7] p-6 rounded-2xl border border-solid border-[#E8E3DA] hover:border-[#C8A646]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#12071B] flex items-center justify-center text-[#E6C687]">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="serif-luxury text-base font-bold text-[#1A1A1A]">
                Certified Natural Diamonds
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hand-inspected, ethically sourced Syndicate and conflict-free natural diamonds graded for superior cut, color, and clarity.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#FAF9F7] p-6 rounded-2xl border border-solid border-[#E8E3DA] hover:border-[#C8A646]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#12071B] flex items-center justify-center text-[#E6C687]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="serif-luxury text-base font-bold text-[#1A1A1A]">
                Complete Transparent Billing
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero ambiguous charges. Invoices transparently specify exact net weight, gross weight, stone value, making charge, and GST.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-[#FAF9F7] p-6 rounded-2xl border border-solid border-[#E8E3DA] hover:border-[#C8A646]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#12071B] flex items-center justify-center text-[#E6C687]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="serif-luxury text-base font-bold text-[#1A1A1A]">
                Lifetime Exchange &amp; Value
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enjoy hassle-free upgrades and buyback guarantee on gold and diamond jewellery at current prevailing gold market rates.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          SECTION 04: CRAFTSMANSHIP JOURNEY
          ======================================================== */}
      <section className="py-20 px-6 sm:px-12 max-w-[1340px] mx-auto text-center space-y-12">
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#C8A646] uppercase block font-sans">
            ✦ FROM SKETCH TO MASTERWORK
          </span>
          <h2 className="serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            The Journey of Master Craftsmanship
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Discover how raw precious metals and gemstones transform into timeless heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-white border border-solid border-[#E8E3DA] relative space-y-3">
            <span className="serif-luxury text-3xl font-black text-[#C8A646]/30 block">01</span>
            <h4 className="serif-luxury text-sm font-bold text-[#1A1A1A]">Design &amp; 3D Modeling</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every creation begins with hand-drawn royal sketches and high-precision CAD rendering to balance structural integrity with delicate beauty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-solid border-[#E8E3DA] relative space-y-3">
            <span className="serif-luxury text-3xl font-black text-[#C8A646]/30 block">02</span>
            <h4 className="serif-luxury text-sm font-bold text-[#1A1A1A]">Pure Bullion Refining</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Certified pure gold is alloyed precisely to 22K (916) or 18K standards to achieve rich warm hues and optimal strength.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-solid border-[#E8E3DA] relative space-y-3">
            <span className="serif-luxury text-3xl font-black text-[#C8A646]/30 block">03</span>
            <h4 className="serif-luxury text-sm font-bold text-[#1A1A1A]">Jadau &amp; Prong Setting</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Master artisans meticulously seat uncut polki, fine diamonds, and natural emeralds using ancient Bikaneri Jadau setting methods.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-solid border-[#E8E3DA] relative space-y-3">
            <span className="serif-luxury text-3xl font-black text-[#C8A646]/30 block">04</span>
            <h4 className="serif-luxury text-sm font-bold text-[#1A1A1A]">Mirror Polishing &amp; HUID</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Hand buffed to high-lustre perfection, inspected under 20x magnification, and laser hallmarked with government BIS authenticity codes.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 05: SHOWROOM BOUTIQUE & CONTACT DETAILS
          ======================================================== */}
      <section className="py-16 px-6 sm:px-12 bg-[#12071B] text-white">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#E6C687] uppercase block font-sans">
                ✦ VISIT OUR SHOWROOM
              </span>
              <h2 className="serif-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
                Experience Luxury in Person at Our Bikaner Boutique
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Step into a world of curated elegance. Our flagship showroom houses private consultation lounges, certified diamond specialists, and our comprehensive collections.
              </p>
            </div>

            <div className="space-y-4 text-xs text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E6C687] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Flagship Showroom</strong>
                  <span>4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan 334003</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <strong className="text-white block text-sm">Direct Phone &amp; WhatsApp</strong>
                  <a href="tel:+919783843978" className="hover:text-[#E6C687] transition-colors">+91 9783843978 (Anil Soni)</a> / <a href="tel:+919828131027" className="hover:text-[#E6C687] transition-colors">+91 9828131027 (Bhanwar Lal Soni)</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <strong className="text-white block text-sm">Official Email</strong>
                  <a href="mailto:hrjewellerssons@gmail.com" className="hover:text-[#E6C687] transition-colors">hrjewellerssons@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#E6C687] shrink-0" />
                <div>
                  <strong className="text-white block text-sm">Boutique Timings</strong>
                  <span>Open Daily: 10:30 AM to 08:30 PM (All 7 Days)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="https://maps.app.goo.gl/ioex13s3JFuerox28?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#E6C687] text-[#12071B] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Get Directions
              </a>
              <a
                href="https://wa.me/919783843978?text=Hello%20HR%20Jewellers,%20I%20would%20like%20to%20schedule%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all border border-solid border-white/20 flex items-center gap-2"
              >
                Book Appointment
              </a>
            </div>
          </div>

          {/* Showroom Showcase Image */}
          <div className="rounded-3xl overflow-hidden border border-solid border-white/10 shadow-2xl">
            <img 
              src={luxuryShowroom} 
              alt="HR Jewellers Flagship Showroom Bikaner" 
              loading="lazy"
              decoding="async"
              className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>

        </div>
      </section>


      {/* ========================================================
          SECTION 06: FREQUENTLY ASKED QUESTIONS (FAQ)
          ======================================================== */}
      <section className="py-20 px-6 sm:px-12 max-w-[900px] mx-auto text-center space-y-10">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#C8A646] uppercase block font-sans">
            ✦ TRANSPARENCY &amp; CLARITY
          </span>
          <h2 className="serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Everything you need to know about purchasing and certifying jewellery with us.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-solid border-[#E8E3DA] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer border-none bg-transparent"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] serif-luxury">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C8A646] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-solid border-gray-100 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* ========================================================
          SECTION 07: BOTTOM CTA BANNER
          ======================================================== */}
      <section className="pb-16 px-6 sm:px-12 max-w-[1340px] mx-auto">
        <div className="bg-gradient-to-r from-[#12071B] via-[#2A0E3C] to-[#12071B] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden border border-solid border-[#E6C687]/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A646]/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="serif-luxury text-2xl sm:text-4xl font-bold leading-tight">
              Begin Your Bespoke Jewellery Journey
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Whether you are selecting a wedding trousseau, an auspicious gold coin, or a customized diamond ring, our master goldsmiths are at your service.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center relative z-10 pt-2">
            <button
              onClick={() => { triggerAudio('click'); navigateTo('collections'); }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-[#12071B] font-extrabold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer border-none"
            >
              Browse Catalog
            </button>
            <a
              href="https://wa.me/919783843978?text=Hello%20HR%20Jewellers,%20I%20would%20like%20to%20know%20more%20about%20your%20custom%20designs."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E6C687] font-extrabold text-xs uppercase tracking-widest border border-solid border-[#E6C687]/40 transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
