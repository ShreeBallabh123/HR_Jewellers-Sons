import React, { useState, useEffect, useMemo, useRef } from 'react';
import { db, storage, auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PRODUCTS } from './productsData';
import Admin from './Admin';
import heritageBg from './assets/heritage_palace_interior.png';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Local High-Fashion Luxury Campaign Images
import emeraldBridalSuite from './assets/emerald_bridal_suite.png';
import citrineFloralSet from './assets/citrine_floral_set.png';
import sapphireHeritageSet from './assets/sapphire_heritage_set.png';
import diamondEmeraldChoker from './assets/diamond_emerald_choker.png';
import royalChitaiKadas from './assets/royal_chitai_kadas.png';
import udaipurFiligreeSolitaire from './assets/udaipur_filigree_solitaire.jpg';
import emeraldSovereignRing from './assets/emerald_sovereign_ring.png';
import silverPoojaThali from './assets/silver_pooja_thali.png';
import silverPayals from './assets/silver_payals.png';
import familySignet from './assets/family_signet.png';
import solitaireMangalsutra from './assets/solitaire_mangalsutra.png';
import mayuraMangalsutra from './assets/mayura_mangalsutra.png';
import diamondBracelet from './assets/diamond_bracelet.png';
import goldKada from './assets/gold_kada.png';
import laxmiGoldCoin from './assets/laxmi_gold_coin.png';
import goldBullionCoin from './assets/gold_bullion_coin.png';
import royalIndianBride from './assets/royal_indian_bride.png';
import luxuryShowroom from './assets/luxury_showroom.png';
import anilSoni from './assets/anil_soni.png';
import hrLogo from './assets/logo.png';
import banner1 from './assets/banner_1.png';
import banner2 from './assets/banner_2.webp';
import solitariesImg from './assets/solitaries.png';
import watchJewelleryImg from './assets/watch_jewellery.png';
import mensJewelleryImg from './assets/mens_jewellery.png';
import mangalsutrasImg from './assets/mangalsutras.png';
import nosePinsImg from './assets/nose_pins.png';
import kidsJewelleryImg from './assets/kids_jewellery.png';
import goldCoinsImg from './assets/gold_coins.png';
import ankletsImg from './assets/anklets.png';
import pendantsImg from './assets/pendants.png';
import ringsImg from './assets/rings.png';
import necklacesImg from './assets/necklaces.png';
import goldChainsImg from './assets/gold_chains.png';
import kadaImg from './assets/kada.png';
import heroBgVideo from './assets/vl_video_1.mp4';
import strokesOfGeniusVideo from './assets/strokes_of_genius.mp4';
import giftingLayeredNecklaces from './assets/gifting_layered_necklaces.png';
import giftingCovetedStyles from './assets/gifting_coveted_styles.png';
import giftingHrMan from './assets/gifting_hr_man.png';
import bannerGold20 from './assets/banner_gold_20.webp';
import bannerSavings11_1 from './assets/banner_savings_11_1.webp';
import savingsHeroJewellery from './assets/savings_hero_jewellery.png';
import goldReserveBanner from './assets/gold_reserve_banner.png';
import offerSavingsBanner from './assets/1778492620039-BS--MCPG--Offer---Desktop-Responsive----2400-x-778.webp';
import atelierManifestoBanner from './assets/f604b099-b1cd-4941-b277-94d746277ae8.jpg';
import bannerOldGold from './assets/banner_old_gold.webp';
import bannerDiamond50 from './assets/Gemini_Generated_Image_11boa611boa611bo.png';
import offerSavings11_1Banner from './assets/Gemini_Generated_Image_rw2cj3rw2cj3rw2c.png';
import storefrontLocatorBanner from './assets/Gemini_Generated_Image_abzyycabzyycabzy.png';
import campaignDaintyDreams from './assets/campaign_dainty_dreams.webp';
import campaignRawReverie from './assets/campaign_raw_reverie.webp';
import campaignClayWhispers from './assets/campaign_clay_whispers.webp';

// Testimonial Custom Generated Images
import testimonial1 from './assets/testimonial_1.png';
import testimonial2 from './assets/testimonial_2.png';
import testimonial3 from './assets/testimonial_3.png';
import testimonial4 from './assets/testimonial_4.png';
import testimonial5 from './assets/testimonial_5.png';



// Auto-scrolling Banner Carousel Component
function BannerCarousel({ banners }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const len = banners.length;
  React.useEffect(() => {
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
          className="absolute inset-0 w-full h-full object-cover sm:object-cover object-center transition-opacity duration-700"
          style={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 1 : 0 }}
          draggable={false}
        />
      ))}
      {/* Prev */}
      <button
        onClick={() => setActive(p => (p - 1 + len) % len)}
        className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 text-white text-sm sm:text-xl flex items-center justify-center backdrop-blur-sm cursor-pointer focus:outline-none transition-all"
        aria-label="Previous"
      >&#8249;</button>
      {/* Next */}
      <button
        onClick={() => setActive(p => (p + 1) % len)}
        className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/50 text-white text-sm sm:text-xl flex items-center justify-center backdrop-blur-sm cursor-pointer focus:outline-none transition-all"
        aria-label="Next"
      >&#8250;</button>
      {/* Dots */}
      <div className="absolute bottom-1.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${active === i ? 'w-4 h-1.5 sm:w-6 sm:h-2 bg-white' : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Premium Gold Intertwined Monogram Crest Logo Component
export function LogoCrest({ className = "w-10 h-10" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
      <defs>
        <linearGradient id="lGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="25%" stopColor="#E6C96A" />
          <stop offset="55%" stopColor="#C8972A" />
          <stop offset="100%" stopColor="#A07820" />
        </linearGradient>
      </defs>

      {/* ── Outer circle ring ── */}
      <circle cx="100" cy="100" r="90" stroke="url(#lGold)" strokeWidth="3" fill="none" />

      {/* ══════════════════════════════
           LOTUS FLOWER  (stroke-only)
          ══════════════════════════════ */}

      {/* Center tall petal */}
      <path
        d="M100,30 C96,42 92,56 92,68 C92,80 96,87 100,90
           C104,87 108,80 108,68 C108,56 104,42 100,30 Z"
        stroke="url(#lGold)" strokeWidth="1.6" fill="none"
      />

      {/* Diamond gem inside center petal */}
      <path d="M100,48 L104,55 L100,62 L96,55 Z"
        stroke="url(#lGold)" strokeWidth="1.2" fill="none" />

      {/* Inner-left petal */}
      <path
        d="M100,90 C94,78 80,66 68,62 C60,59 54,62 52,66
           C58,70 66,78 76,85 C84,90 93,92 100,90 Z"
        stroke="url(#lGold)" strokeWidth="1.6" fill="none"
      />

      {/* Inner-right petal */}
      <path
        d="M100,90 C106,78 120,66 132,62 C140,59 146,62 148,66
           C142,70 134,78 124,85 C116,90 107,92 100,90 Z"
        stroke="url(#lGold)" strokeWidth="1.6" fill="none"
      />

      {/* Outer-left petal */}
      <path
        d="M76,85 C64,72 50,64 38,66 C30,68 28,74 32,78
           C40,84 54,86 66,86 C70,86 74,86 76,85 Z"
        stroke="url(#lGold)" strokeWidth="1.4" fill="none"
      />

      {/* Outer-right petal */}
      <path
        d="M124,85 C136,72 150,64 162,66 C170,68 172,74 168,78
           C160,84 146,86 134,86 C130,86 126,86 124,85 Z"
        stroke="url(#lGold)" strokeWidth="1.4" fill="none"
      />

      {/* Lotus base curve / sepal */}
      <path d="M72,90 Q100,102 128,90"
        stroke="url(#lGold)" strokeWidth="1.4" fill="none" />
      <path d="M82,95 Q100,105 118,95"
        stroke="url(#lGold)" strokeWidth="1" fill="none" opacity="0.7" />

      {/* ══════════════════════════════
           HR  MONOGRAM
          ══════════════════════════════ */}
      <text
        x="100" y="155"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        fontSize="52"
        fill="url(#lGold)"
        letterSpacing="4"
      >HR</text>
    </svg>
  );
}

// Premium Category Configurations with Emojis and circular spotlights
const PREMIUM_CATEGORIES = [
  { name: 'Collections', icon: '🛍️', img: goldKada },
  { name: 'Rings', icon: '💍', img: emeraldSovereignRing },
  { name: 'Earrings', icon: '✨', img: sapphireHeritageSet },
  { name: 'Necklace', icon: '📿', img: diamondEmeraldChoker },
  { name: 'Mangalsutra', icon: '👑', img: solitaireMangalsutra },
  { name: 'Bracelets', icon: '💫', img: diamondBracelet },
  { name: 'Bangles', icon: '💫', img: royalChitaiKadas },
  { name: 'Gold Coins', icon: '🪙', img: laxmiGoldCoin },
  { name: 'Anklets', icon: '👣', img: silverPayals },
  { name: 'Men Jewellery', icon: '👑', img: familySignet },
  { name: 'Kids Jewellery', icon: '👶', img: silverPayals },
  { name: 'Gifts & Pooja', icon: '🎁', img: silverPoojaThali }
];

const promisesList = [
  "✨ 100% Certified BIS Hallmarked Jewellery",
  "🔄 Lifetime Exchange & Insured Buyback Guarantee",
  "🚚 Safe Secured Next-Day Delivery across Rajasthan",
  "📅 30-Day No-Questions Money-Back Policy"
];

const shopTheLookItems = [
  {
    name: "The Udaipur Filigree Solitaire",
    price: 165000,
    img: udaipurFiligreeSolitaire,
    id: "look-1",
    weight: "12.4g",
    carat: "18K Gold & VVS1"
  },
  {
    name: "The Imperial Chitai Kada Bangle",
    price: 135000,
    img: royalChitaiKadas,
    id: "look-2",
    weight: "52.5g",
    carat: "22K Solid Gold"
  },
  {
    name: "The Imperial Emerald Choker Haar",
    price: 485000,
    img: diamondEmeraldChoker,
    id: "look-3",
    weight: "142g",
    carat: "VVS Diamond Collet"
  },
  {
    name: "The Royal Sapphire Drops",
    price: 380000,
    img: sapphireHeritageSet,
    id: "look-4",
    weight: "62g",
    carat: "VVS Sapphire & Gold"
  }
];

// ==========================================================
// GOLD COINS COLLECTION DATA
// ==========================================================
const GOLD_COINS_DATA = [
  {
    id: 'coin-1',
    name: '24K Temple Heritage Gold Coin',
    purity: '24K',
    weightGm: 10,
    img: laxmiGoldCoin,
    makingChargePercent: 3.5,
    description: 'Bespoke 24K solid gold coin embossed with fine royal temple engraving of Laxmi-Ganesha. Crafted for pure prosperity, daily puja, and heritage family holdings.',
    certification: 'BIS Hallmarked & NABL Accredited Refinery Cert',
    available: true,
    category: 'Temple Coin'
  },
  {
    id: 'coin-2',
    name: '24K Royal Laxmi Emblem Gold Coin',
    purity: '24K',
    weightGm: 5,
    img: laxmiGoldCoin,
    makingChargePercent: 3.8,
    description: 'Exquisite 5g gold coin featuring a detailed bas-relief of Goddess Laxmi, the embodiment of wealth and fortune. Sealed in tamper-proof premium assay card certification.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: 'Lakshmi Coin'
  },
  {
    id: 'coin-3',
    name: '24K Imperial Bikaneri Mint Coin',
    purity: '24K',
    weightGm: 20,
    img: goldBullionCoin,
    makingChargePercent: 3.0,
    description: 'Heavyweight investment-grade 20g minted coin showcasing custom geometric royal floral grids representing standard Rajasthani artistry.',
    certification: 'BIS Hallmarked & NABL Accredited Refinery Cert',
    available: true,
    category: '24K Coin'
  },
  {
    id: 'coin-4',
    name: '24K Sovereign Bullion Mint Coin',
    purity: '24K',
    weightGm: 50,
    img: goldBullionCoin,
    makingChargePercent: 2.5,
    description: 'Premium institutional 50g solid gold bullion coin with serialized laser-etched registry code. High purity asset for absolute portfolio hedging.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: '24K Coin'
  },
  {
    id: 'coin-5',
    name: '24K Devotion Ganesha Mint Coin',
    purity: '24K',
    weightGm: 2,
    img: laxmiGoldCoin,
    makingChargePercent: 4.5,
    description: 'Intricately pressed 2g gold coin featuring Lord Ganesha. Perfect for Diwali celebrations, Akshaya Tritiya, wedding gifting, or personal altars.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: 'Temple Coin'
  },
  {
    id: 'coin-6',
    name: '24K Shubh Labh Auspicious Gift Coin',
    purity: '24K',
    weightGm: 1,
    img: laxmiGoldCoin,
    makingChargePercent: 5.0,
    description: 'Elegant 1g gold coin carrying the holy "Shubh Labh" scripts. Designed as an auspicious premium token to celebrate milestones and corporate blessings.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: 'Gift Coin'
  },
  {
    id: 'coin-7',
    name: '22K Bikaneri Royal Heritage Coin',
    purity: '22K',
    weightGm: 10,
    img: laxmiGoldCoin,
    makingChargePercent: 4.0,
    description: 'Generational 22K (916) pure gold medallion carrying the official atelier emblem of HR Jewellers & Sons. Extremely durable alloy structure made for custom jewellery settings.',
    certification: 'BIS 916 Hallmarked & Lifetime Atelier Buyback Guarantee',
    available: true,
    category: '22K Coin'
  },
  {
    id: 'coin-8',
    name: '22K Rajputana Crest Gold Coin',
    purity: '22K',
    weightGm: 8,
    img: goldBullionCoin,
    makingChargePercent: 4.2,
    description: 'Stately 8g sovereign weight gold medallion embossed with the ancient shield crest of Rajputana warriors. A spectacular symbol of lineage, heritage, and pride.',
    certification: 'BIS 916 Hallmarked & Lifetime Atelier Buyback Guarantee',
    available: true,
    category: '22K Coin'
  },
  {
    id: 'coin-9',
    name: '22K Golden Kalash Puja Token',
    purity: '22K',
    weightGm: 5,
    img: laxmiGoldCoin,
    makingChargePercent: 4.5,
    description: 'Beautiful 5g gold coin featuring the sacred Kalash, mango leaves, and coconut, symbolizing life, health, and spiritual abundance.',
    certification: 'BIS 916 Hallmarked & Lifetime Atelier Buyback Guarantee',
    available: true,
    category: 'Gift Coin'
  },
  {
    id: 'coin-10',
    name: '24K Imperial Lakshmi Coin',
    purity: '24K',
    weightGm: 8,
    img: laxmiGoldCoin,
    makingChargePercent: 3.6,
    description: 'A sovereign weight 8g pure gold coin, struck with an exquisite motif of Goddess Lakshmi sitting gracefully on a lotus, bordered with elegant traditional arches.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: 'Lakshmi Coin'
  },
  {
    id: 'coin-11',
    name: '24K Micro-Bullion Savings Coin',
    purity: '24K',
    weightGm: 0.5,
    img: goldBullionCoin,
    makingChargePercent: 6.0,
    description: 'An affordable entry-point 0.5g gold coin for regular savings accumulation. Encased in a beautiful gift-ready card with tamper-evident seal.',
    certification: 'BIS Hallmarked & 999.9 Fine Purity Assay Certified',
    available: true,
    category: 'Gift Coin'
  },
  {
    id: 'coin-12',
    name: '22K Classic Sovereign Coin',
    purity: '22K',
    weightGm: 20,
    img: goldBullionCoin,
    makingChargePercent: 3.2,
    description: 'Premium 20g 22K durable gold coin designed for investors looking for heavier weight with royal finish, perfect for melting or passing down as an heirloom.',
    certification: 'BIS 916 Hallmarked & Lifetime Atelier Buyback Guarantee',
    available: true,
    category: '22K Coin'
  }
];

const calculateCoinPrice = (coin, rate24k) => {
  const baseRatePerGm = rate24k / 10;
  const purityMultiplier = coin.purity === '24K' ? 1.0 : 0.9167;
  const baseMetalValue = baseRatePerGm * coin.weightGm * purityMultiplier;
  const makingCharges = baseMetalValue * (coin.makingChargePercent / 100);
  const subtotal = baseMetalValue + makingCharges;
  const gst = subtotal * 0.03;
  const total = subtotal + gst;
  return {
    baseMetalValue: Math.round(baseMetalValue),
    makingCharges: Math.round(makingCharges),
    gst: Math.round(gst),
    total: Math.round(total)
  };
};

function generateOrderRef() {
  return `BS-ORDER-${Math.floor(10000 + Math.random() * 90000)}`;
}

// ==========================================================
// LUXURY SOUND SYNTH: Web Audio API Elegant Clicks & Chimes
// ==========================================================
class LuxurySynth {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playClick() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // Elegant B5 chime note
      osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.08); // slides to E6

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio context error ignored safely
    }
  }
  playShimmer() {
    if (this.muted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.006, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      gain.connect(this.ctx.destination);

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major luxury arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        osc.connect(gain);
        osc.start(now + idx * 0.06);
        osc.stop(now + 0.8);
      });
    } catch {
      // Audio context error ignored safely
    }
  }
}

const synth = new LuxurySynth();

const formatPrice = (p) => {
  try {
    if (p === null || p === undefined) return '0';
    if (typeof p === 'number') return p.toLocaleString('en-IN');
    const num = Number(p);
    return isNaN(num) ? String(p) : num.toLocaleString('en-IN');
  } catch {
    return '0';
  }
};

const TERMS_DATA = [
  {
    id: "tc-sec-1",
    num: 1,
    title: "General Terms",
    paragraphs: [
      "HR Jeweller & Sons reserves the right to modify, update, or discontinue any service, product, offer, or policy without prior notice.",
      "All products displayed on our website are subject to availability.",
      "Product images are for illustrative purposes only. Actual product appearance may vary slightly due to screen settings, photography, and handcrafted variations."
    ]
  },
  {
    id: "tc-sec-2",
    num: 2,
    title: "Product Pricing",
    paragraphs: [
      "Gold, diamond, gemstone, silver, and precious metal prices fluctuate based on market rates.",
      "All prices displayed are subject to change without prior notice.",
      "The final price applicable will be the price displayed at the time of order confirmation.",
      "Taxes, GST, shipping charges, and other applicable fees may be added during checkout."
    ]
  },
  {
    id: "tc-sec-3",
    num: 3,
    title: "Promotional Offers",
    paragraphs: [
      "Offers, discounts, coupons, vouchers, and promotional campaigns are applicable only on selected products.",
      "HR Jeweller & Sons reserves the right to withdraw, modify, or cancel any offer at any time.",
      "Offers cannot be combined unless specifically mentioned."
    ],
    hasSavingScheme: true
  },
  {
    id: "tc-sec-4",
    num: 4,
    title: "Account Registration",
    paragraphs: [
      "Customers are responsible for maintaining the confidentiality of their account credentials.",
      "Any activity conducted through a registered account shall be deemed authorized by the account holder.",
      "HR Jeweller & Sons reserves the right to suspend or terminate accounts involved in fraudulent or suspicious activities."
    ]
  },
  {
    id: "tc-sec-5",
    num: 5,
    title: "Orders & Payments",
    paragraphs: [
      "Orders will be processed only after successful payment verification.",
      "We accept payments through approved payment gateways, UPI, Net Banking, Debit Cards, Credit Cards, and other supported methods.",
      "HR Jeweller & Sons reserves the right to cancel any order due to pricing errors, stock unavailability, suspected fraud, or regulatory requirements."
    ]
  },
  {
    id: "tc-sec-6",
    num: 6,
    title: "Shipping & Delivery",
    paragraphs: [
      "Delivery timelines are estimates and may vary depending on location, logistics, weather conditions, or other unforeseen circumstances.",
      "Customers must provide accurate shipping information.",
      "Risk of loss passes to the customer upon successful delivery."
    ]
  },
  {
    id: "tc-sec-7",
    num: 7,
    title: "Cancellation Policy",
    paragraphs: [
      "Orders may be cancelled before dispatch without additional charges.",
      "Customized jewellery, engraved products, personalized items, and made-to-order products cannot be cancelled once production has commenced.",
      "Refunds for prepaid orders will be processed according to our refund policy."
    ]
  },
  {
    id: "tc-sec-8",
    num: 8,
    title: "Returns & Refunds",
    paragraphs: [
      "Eligible products may be returned within the return period specified on the product page.",
      "Customized jewellery, personalized products, coins, bullion, and special-order items may not be eligible for return.",
      "Refunds will be processed after successful quality inspection and approval.",
      "Refunds will be issued through the original payment method whenever possible."
    ]
  },
  {
    id: "tc-sec-9",
    num: 9,
    title: "Exchange & Buyback Policy",
    paragraphs: [
      "Exchange and buyback services are subject to product verification, purity testing, and applicable deductions.",
      "Buyback values may vary according to prevailing market rates and company policies.",
      "HR Jeweller & Sons reserves the right to reject products that do not meet exchange eligibility requirements."
    ]
  },
  {
    id: "tc-sec-10",
    num: 10,
    title: "KYC & PAN Requirements",
    paragraphs: [
      "For purchases exceeding limits prescribed under applicable Indian laws, customers must provide valid PAN details and supporting KYC documentation.",
      "Failure to provide required documentation may result in order cancellation or transaction delays."
    ]
  },
  {
    id: "tc-sec-11",
    num: 11,
    title: "Intellectual Property",
    paragraphs: [
      "All trademarks, logos, product images, content, graphics, designs, videos, and website materials belong exclusively to HR Jeweller & Sons.",
      "Unauthorized use, reproduction, or distribution is strictly prohibited."
    ]
  },
  {
    id: "tc-sec-12",
    num: 12,
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to external websites.",
      "HR Jeweller & Sons is not responsible for the content, privacy practices, or services offered by third-party websites."
    ]
  },
  {
    id: "tc-sec-13",
    num: 13,
    title: "Limitation of Liability",
    paragraphs: [
      "HR Jeweller & Sons shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from:"
    ],
    listItems: [
      "Website usage",
      "Product purchases",
      "Delivery delays",
      "Technical failures",
      "Third-party service interruptions"
    ],
    extraParagraphs: [
      "Our maximum liability shall not exceed the value of the purchased product."
    ]
  },
  {
    id: "tc-sec-14",
    num: 14,
    title: "Warranties Disclaimer",
    paragraphs: [
      "Products and services are provided on an \"as-is\" and \"as-available\" basis.",
      "Except as expressly stated, HR Jeweller & Sons makes no warranties regarding uninterrupted website operation or error-free services."
    ]
  },
  {
    id: "tc-sec-15",
    num: 15,
    title: "User Conduct",
    paragraphs: [
      "Users agree not to:"
    ],
    listItems: [
      "Violate applicable laws",
      "Submit false information",
      "Attempt unauthorized access",
      "Engage in fraudulent transactions",
      "Abuse promotional offers",
      "Interfere with website functionality"
    ],
    extraParagraphs: [
      "Violations may result in account suspension or legal action."
    ]
  },
  {
    id: "tc-sec-16",
    num: 16,
    title: "Fair Usage Policy",
    paragraphs: [
      "Customers must use return, exchange, buyback, referral, loyalty, and promotional programs fairly.",
      "Excessive returns, fraudulent claims, abuse of discounts, creation of multiple accounts, or misuse of offers may result in restrictions or account termination."
    ]
  },
  {
    id: "tc-sec-17",
    num: 17,
    title: "Privacy",
    paragraphs: [
      "Personal information is collected, stored, and processed in accordance with our Privacy Policy.",
      "By using our services, customers consent to such processing."
    ]
  },
  {
    id: "tc-sec-18",
    num: 18,
    title: "Force Majeure",
    paragraphs: [
      "HR Jeweller & Sons shall not be responsible for delays or failures caused by circumstances beyond reasonable control, including:"
    ],
    listItems: [
      "Natural disasters",
      "Government restrictions",
      "Supply chain disruptions",
      "Strikes",
      "Internet outages",
      "Technical failures"
    ]
  },
  {
    id: "tc-sec-19",
    num: 19,
    title: "Governing Law",
    paragraphs: [
      "These Terms & Conditions shall be governed by the laws of India.",
      "Any disputes arising from the use of our website, products, or services shall be subject to the exclusive jurisdiction of the courts where HR Jeweller & Sons operates its principal business."
    ]
  },
  {
    id: "tc-sec-20",
    num: 20,
    title: "Contact Information",
    paragraphs: [
      "For any questions regarding these Terms & Conditions, customers may contact:"
    ],
    contactInfo: {
      brand: "HR Jeweller & Sons",
      address: "4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan (334001)",
      email: "support@hrjewellerandsons.com",
      backupEmail: "notifications@hrjewellers.com",
      phone: "+91 97838 43978 / +91 76108 43978",
      hours: "Monday to Saturday, 10:00 AM – 7:00 PM"
    },
    extraParagraphs: [
      "By using our website and purchasing from HR Jeweller & Sons, you acknowledge that you have read, understood, and agreed to these Terms & Conditions."
    ]
  }
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Atelier Error Boundary caught an exception:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#13071C] flex flex-col items-center justify-center p-6 text-center select-none text-white">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#DDA0DD]/5 blur-[120px] pointer-events-none" />
          <div className="relative mb-6">
            <span className="text-5xl block animate-bounce">💎</span>
          </div>
          <h1 className="serif-luxury text-2xl sm:text-3xl font-extrabold tracking-wider gold-metallic-text uppercase mb-3">
            Maison Care Required
          </h1>
          <p className="text-xs tracking-widest text-[#DDA0DD]/80 max-w-md mx-auto leading-relaxed mb-6 font-sans normal-case">
            A boutique runtime exception has occurred. Our master artisans are already notified.
          </p>
          <button
            onClick={() => { window.location.href = '/'; }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border bg-[#DDA0DD] text-white hover:bg-white hover:text-black border-transparent cursor-pointer shadow-md"
          >
            Return to Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Promo Banners Configurations for Homepage Carousel
const promoBanners = [
  {
    id: 1,
    img: bannerGold20,
    alt: "20% OFF on Making Charges on Plain Gold Jewellery",
    link: "collections",
    tab: "Collections"
  },
  {
    id: 2,
    img: bannerSavings11_1,
    alt: "Our Premier 11+1 Gold Saving Plan - Invest for 11 months, get 12th installment as a bonus",
    link: "savings"
  },
  {
    id: 3,
    img: bannerOldGold,
    alt: "Transform your old gold: Big Gold Upgrade Program",
    link: "valuation"
  },
  {
    id: 4,
    img: bannerDiamond50,
    alt: "50% OFF on Making Charges on Diamond Jewellery",
    link: "collections",
    tab: "Diamond"
  }
];

export default function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const getInitialPage = () => {
    try {
      if (typeof window === 'undefined') return 'home';
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const targetPage = pageParam || path;
      const validPages = ['admin', 'savings', 'gold-reserve', 'offers', 'gold-coins', 'heritage', 'valuation', 'collections', 'showrooms', 'terms-and-conditions', 'privacy-policy', 'product-detail', 'savings-enroll'];
      if (validPages.includes(targetPage)) {
        return targetPage;
      }
    } catch (e) {
      console.warn("Routing initialization failed:", e);
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Carousel Slider States & Handlers
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
  const [promoIsPaused, setPromoIsPaused] = useState(false);
  const [promoTouchStart, setPromoTouchStart] = useState(null);
  const [promoTouchEnd, setPromoTouchEnd] = useState(null);
  const promoAutoplayRef = useRef(null);

  const testimonialsRef = useRef(null);
  const [testimonialsInView, setTestimonialsInView] = useState(false);
  const polaroidScrollRef = useRef(null);
  const [polaroidScrollProgress, setPolaroidScrollProgress] = useState(0);

  const handlePolaroidScroll = () => {
    if (polaroidScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = polaroidScrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setPolaroidScrollProgress((scrollLeft / totalScroll) * 100);
      }
    }
  };

  const categoriesScrollRef = useRef(null);
  const categoriesAutoplayRef = useRef(null);

  const startCategoriesAutoplay = () => {
    if (categoriesAutoplayRef.current) clearInterval(categoriesAutoplayRef.current);
    categoriesAutoplayRef.current = setInterval(() => {
      if (categoriesScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoriesScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          categoriesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollStep = clientWidth > 768 ? 240 : 160;
          categoriesScrollRef.current.scrollTo({ left: scrollLeft + scrollStep, behavior: 'smooth' });
        }
      }
    }, 5000);
  };

  const scrollCategories = (direction) => {
    if (categoriesScrollRef.current) {
      const { scrollLeft, clientWidth } = categoriesScrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      categoriesScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      startCategoriesAutoplay();
    }
  };

  useEffect(() => {
    startCategoriesAutoplay();
    return () => {
      if (categoriesAutoplayRef.current) clearInterval(categoriesAutoplayRef.current);
    };
  }, []);

  useEffect(() => {
    if (promoAutoplayRef.current) clearInterval(promoAutoplayRef.current);
    if (!promoIsPaused) {
      promoAutoplayRef.current = setInterval(() => {
        setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
      }, 5000);
    }
    return () => {
      if (promoAutoplayRef.current) clearInterval(promoAutoplayRef.current);
    };
  }, [promoIsPaused]);

  const handlePromoTouchStart = (e) => {
    setPromoTouchStart(e.targetTouches[0].clientX);
  };

  const handlePromoTouchMove = (e) => {
    setPromoTouchEnd(e.targetTouches[0].clientX);
  };

  const handlePromoTouchEnd = () => {
    if (!promoTouchStart || !promoTouchEnd) return;
    const distance = promoTouchStart - promoTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      triggerAudio('click');
      setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
    } else if (isRightSwipe) {
      triggerAudio('click');
      setCurrentPromoSlide((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
    }
    setPromoTouchStart(null);
    setPromoTouchEnd(null);
  };

  const handlePromoKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      triggerAudio('click');
      setCurrentPromoSlide((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
    } else if (e.key === 'ArrowRight') {
      triggerAudio('click');
      setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
    }
  };

  // Custom luxury site loader & lightbox states
  const [siteLoading, setSiteLoading] = useState(true);
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSiteLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Interactive Homepage States
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const [activeCategoryTab, setActiveCategoryTab] = useState('Collections');
  const [activeTcSection, setActiveTcSection] = useState('tc-sec-1');
  const [activeStoryStep, setActiveStoryStep] = useState(0);
  const [activeStoryTimeline, setActiveStoryTimeline] = useState(1952);
  const [timelineAutoplay, setTimelineAutoplay] = useState(true);
  const [timelineResetTrigger, setTimelineResetTrigger] = useState(0);
  const [timelineDirection, setTimelineDirection] = useState(1);
  const [products, setProducts] = useState(PRODUCTS);
  const [categories, setCategories] = useState([]);
  if (categories.length === -1) {
    console.log(categories);
  }

  // PDP Gallery & Customizer
  const [detailProduct, setDetailProduct] = useState(PRODUCTS[0]);
  const [detailActiveImg, setDetailActiveImg] = useState(PRODUCTS[0]?.img);
  const [emiMonths, setEmiMonths] = useState(6);
  const [customEngraving, setCustomEngraving] = useState('');
  const [selectedRingSize, setSelectedRingSize] = useState('12');
  const [selectedCaratPurity, setSelectedCaratPurity] = useState('22K');

  // Zip Code checker
  const [zipCode, setZipCode] = useState('');
  const [zipChecking, setZipChecking] = useState(false);
  const [zipCheckResult, setZipCheckResult] = useState(null); // success or error string
  const [storePincode, setStorePincode] = useState('');
  const [storeSearchStatus, setStoreSearchStatus] = useState(null);

  // 11+1 Gold Saving Scheme States (Upgraded GRP Scheme)
  const [monthlySavingsInput, setMonthlySavingsInput] = useState(2000);
  const [savingsSchemeOpen, setSavingsSchemeOpen] = useState(false);
  const [savingsSchemeType, setSavingsSchemeType] = useState('Gold Mine');
  const [savingsSuccess, setSavingsSuccess] = useState(false);
  const [erdTooltip, setErdTooltip] = useState(null); // null | '6th' | '8th'
  const [savingsForm, setSavingsForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    aadhaar: '',
    preferredJewellery: 'Rings',
    budgetRange: '₹5,000 - ₹15,000/mo',
    branch: 'Tilak Nagar Flagship, Bikaner'
  });
  const [savingsVoucherType, setSavingsVoucherType] = useState('Diamond/Gemstone');
  const [savingsEnrollStep, setSavingsEnrollStep] = useState(1);
  const [savingsEnrollForm, setSavingsEnrollForm] = useState({
    email: '',
    mobile: '',
    name: '',
    pincode: '',
    address: '',
    street: '',
    locality: '',
    landmark: '',
    city: '',
    state: 'Rajasthan',
    nomineeName: '',
    nomineeRelationship: 'Spouse',
    nomineePhone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    paymentMethod: 'card'
  });

  // Bespoke Custom Design Request Modal States
  const [customDesignOpen, setCustomDesignOpen] = useState(false);
  const [customDesignStep, setCustomDesignStep] = useState(1);
  const [customDesignForm, setCustomDesignForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    jewelryType: 'Rings',
    material: '22K Gold',
    budget: '₹20,000 - ₹50,000',
    description: '',
    fileName: '',
    fileData: '',
    referenceImageUrl: ''
  });
  const [customDesignSuccess, setCustomDesignSuccess] = useState(false);
  const [customDesignUploadProgress, setCustomDesignUploadProgress] = useState('');
  const [customDesignUploading, setCustomDesignUploading] = useState(false);

  const [firebaseDiagnostics, setFirebaseDiagnostics] = useState({
    checked: false,
    valid: false,
    projectId: 'Checking...',
    bucketName: 'Checking...',
    authStatus: 'Checking...',
    storageStatus: 'Checking...',
    error: null
  });

  const checkFirebaseConfig = async () => {
    try {
      const res = await fetch('/api/upload-image', { method: 'GET' });
      const data = await res.json();

      setFirebaseDiagnostics({
        checked: true,
        valid: data.success === true,
        projectId: data.projectId || 'Unknown',
        bucketName: data.bucketName || 'Unknown',
        authStatus: data.authStatus || 'Failed',
        storageStatus: data.storageStatus || 'Disconnected',
        error: data.error || null
      });
      return data.success === true;
    } catch (err) {
      setFirebaseDiagnostics({
        checked: true,
        valid: false,
        projectId: 'Unknown',
        bucketName: 'Unknown',
        authStatus: 'Failed',
        storageStatus: 'Offline/Failed to connect',
        error: err.message
      });
      return false;
    }
  };

  useEffect(() => {
    checkFirebaseConfig();
  }, []);

  useEffect(() => {
    if (currentPage === 'savings-enroll') {
      setSavingsEnrollForm(prev => ({
        ...prev,
        email: prev.email || savingsForm.email || '',
        name: prev.name || savingsForm.name || ''
      }));
      setSavingsEnrollStep(1);
    }
  }, [currentPage]);

  // Catalog Premium Filters & Sorting States
  const [metalFilter, setMetalFilter] = useState('all');
  const [purityFilter, setPurityFilter] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState(1000000);
  const [sortFilter, setSortFilter] = useState('popularity');
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [stoneFilter, setStoneFilter] = useState('all');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [openFilterSections, setOpenFilterSections] = useState({ price: true, type: true, metal: true, purity: false, gender: false, stones: false, occasion: false });
  const toggleFilterSection = (key) => setOpenFilterSections(prev => ({ ...prev, [key]: !prev[key] }));
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  // Live Homepage Search & Suggestions States
  const [homeSearchVal, setHomeSearchVal] = useState('');
  const [homeSearchSuggestions, setHomeSearchSuggestions] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setHomeSearchVal(val);
    if (val.trim()) {
      const query = val.toLowerCase();
      const filtered = PRODUCTS.filter(p =>
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(query))
      ).slice(0, 5);
      setHomeSearchSuggestions(filtered);
    } else {
      setHomeSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeSearchVal.trim()) {
      changeCategoryTab('Collections');
      navigateTo('collections');
      setSearchFocused(false);
    }
  };

  // Standalone premium widgets states
  const [standaloneEmiPrice, setStandaloneEmiPrice] = useState(50000);
  const [standaloneEmiMonths, setStandaloneEmiMonths] = useState(12);
  const standaloneEmiRate = 8.5;
  const [comparisonInvestmentInput, setComparisonInvestmentInput] = useState(10000);
  const [comparisonAiIntent, setComparisonAiIntent] = useState('wedding');

  // App Utilities
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Quick View Modal
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [isCatalogDark, setIsCatalogDark] = useState(true);

  const changeCategoryTab = (tabName) => {
    setCatalogLoading(true);
    setActiveCategoryTab(tabName);
    setTimeout(() => {
      setCatalogLoading(false);
    }, 450);
  };

  const [pledgeActiveIdx, setPledgeActiveIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cart & Wishlist
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Cart local storage parse error:", e);
    }
    return [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Wishlist local storage parse error:", e);
    }
    return [];
  });

  // Daily Spot Bullion Rates
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [weightInput, setWeightInput] = useState(10);
  const [selectedPurity, setSelectedPurity] = useState('22K');

  const [goldRate24k, setGoldRate24k] = useState(10245);
  const [silverRate, setSilverRate] = useState(92.10);
  const [ratesLastUpdated, setRatesLastUpdated] = useState('');

  // Premium Metal Rates & Calculator States
  const [makingChargesInput, setMakingChargesInput] = useState(8);
  const [wastageInput, setWastageInput] = useState(2);
  const [isRatesCardView, setIsRatesCardView] = useState(true);
  const [ratesDashboardTab, setRatesDashboardTab] = useState('gold');
  const [waSubscribed, setWaSubscribed] = useState(false);

  // Gold Coins Page states
  const [coinPurityTab, setCoinPurityTab] = useState('all');
  const [coinWeightFilter, setCoinWeightFilter] = useState('all');
  const [coinDetailOpen, setCoinDetailOpen] = useState(null);
  const [coinDetailImg, setCoinDetailImg] = useState(0);

  // Modals & Inquiries
  const [consultationModal, setConsultationModal] = useState(false);
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [loungeSuccess, setLoungeSuccess] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', type: 'Solitaire Festival Consultation'
  });
  const [consultationPassCode, setConsultationPassCode] = useState('');

  const [checkoutFormOpen, setCheckoutFormOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '', phone: '', address: '', method: 'Cash on Showroom Delivery'
  });

  // Full-Page Checkout Flow States
  const [checkoutFlowStep, setCheckoutFlowStep] = useState(1); // 1=Cart, 2=Delivery, 3=Payment
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'store'
  const [deliveryForm, setDeliveryForm] = useState({
    email: '', mobile: '', whatsapp: '',
    recipientName: '', recipientMobile: '', pincode: '',
    apartment: '', street: '', locality: '', landmark: '',
    gstNumber: '', billingIsSameAsShipping: true,
    storeCity: '', storeBranch: ''
  });

  const [tryHomeModalOpen, setTryHomeModalOpen] = useState(false);
  const [tryHomeSuccess, setTryHomeSuccess] = useState(false);
  const [tryHomeForm, setTryHomeForm] = useState({ name: '', phone: '', date: '', item: '' });

  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', msg: '' });
  const [policyModalContent, setPolicyModalContent] = useState(null);
  const [pdpSelectedMetal, setPdpSelectedMetal] = useState('22K Yellow Gold');
  const [pdpSelectedStone, setPdpSelectedStone] = useState('Royal Syndicate Diamond');
  const [pdpTcExpanded, setPdpTcExpanded] = useState(false);
  const [pdpActiveTab, setPdpActiveTab] = useState('craftsmanship');
  const [pdpActiveReviewIdx, setPdpActiveReviewIdx] = useState(0);

  // ==========================================
  // SYNC & STORAGE HOOKS
  // ==========================================
  useEffect(() => {
    localStorage.setItem('hrj_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('hrj_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // PDP Reviews slider auto-advance effect
  useEffect(() => {
    if (currentPage !== 'product-detail' || !detailProduct) return;

    const productReviews = detailProduct.reviews || [];
    const fallbacks = [
      { patron: 'Aishwarya Sen', stars: 5, comment: 'Breathtaking craftsmanship. The hand-chiseled finish is absolute perfection!' },
      { patron: 'Rani Padmini Devi', stars: 5, comment: 'An unmatched royal masterpiece. The detailing is pure Rajputana class.' }
    ];
    const allReviews = [...productReviews, ...fallbacks];

    const interval = setInterval(() => {
      setPdpActiveReviewIdx((prev) => (prev + 1) % allReviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPage, detailProduct]);

  useEffect(() => {
    setPdpActiveReviewIdx(0);
  }, [detailProduct]);

  // Reset pagination on filter change
  useEffect(() => {
    setCollectionsPage(1);
  }, [metalFilter, purityFilter, maxPriceFilter, activeCategoryTab, sortFilter]);

  // Scroll Spy for Terms & Conditions Page
  useEffect(() => {
    if (currentPage !== 'terms-and-conditions') return;

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sec of TERMS_DATA) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTcSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentPage]);

  // ==========================================
  // CUSTOM LUXURY MOTION HOOKS
  // ==========================================
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setCursorHovering(true);
      } else {
        setCursorHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleMouseOver);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let frameId;
    const updateRing = () => {
      setCursorRingPos((prev) => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16
        };
      });
      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(frameId);
  }, [cursorPos]);

  // Document dynamic header tags for SEO
  useEffect(() => {
    let title = 'HR Jewellers & Sons — Luxury Storefront';
    let desc = 'Finalized light-themed modern storefront replica of BlueStone.com. Explore certified diamond solitaires, gold mine GRP savings calculators, and Bikaneri ornaments.';
    if (currentPage === 'gold-reserve') {
      setSavingsSchemeType('Gold Reserve');
    } else if (currentPage === 'savings') {
      setSavingsSchemeType('Gold Mine');
    }
    switch (currentPage) {
      case 'collections':
        title = 'Premium Storefront Catalog — BlueStone by HRJ';
        desc = 'Browse our modern interactive catalog of certified gold, platinum, uncut diamonds, and pooja silverwares.';
        break;
      case 'heritage':
        title = 'Legacy and Royal Atelier — HR Jewellers';
        desc = 'Discover the legacy and certified royal lineage of our master goldsmiths working in Bikaner since 1924.';
        break;
      case 'valuation':
        title = 'Live Daily Bullion Rates Estimator — BlueStone Partner';
        desc = 'Calculate jewelry rates instantly according to active Indian bullion indexes and 916 hallmark metrics.';
        break;
      case 'showrooms':
        title = 'Flagship Fitting Showroom Bikaner — BlueStone';
        desc = 'Book a private lounge suite at Tilak Nagar in Bikaner. Register appointments for bespoke custom fittings.';
        break;
      case 'product-detail':
        title = `${detailProduct?.name || 'Exclusive Ornaments'} — BlueStone`;
        desc = `Details, carat purity specs, dynamic pricing breakdown, EMI calculator and zip code delivery checker for ${detailProduct?.name}`;
        break;
      case 'savings':
        title = `11+1 Gold Saving Scheme — HR Jewellers & Sons`;
        desc = `Simulate GRP monthly savings inputs for our 11+1 Gold Saving Scheme, get the 12th Month completely FREE as a 100% Bonus Month, and redeem against Rajputi heritage or certified diamonds ornaments.`;
        break;
      case 'gold-reserve':
        title = `Gold Reserve Option Plan — HR Jewellers & Sons`;
        desc = `Simulate monthly savings inputs for our Gold Reserve Option Plan, receive gold units at live values, and enjoy special Plain Gold or Non-Plain Gold vouchers.`;
        break;
      case 'gold-coins':
        title = 'Invest in Pure Gold Coins — HR Jewellers & Sons';
        desc = 'Discover certified 24K and 22K gold coins crafted for gifting, investment, and heritage value. Real-time dynamic pricing based on daily metal rates.';
        break;
      case 'offers':
        title = `Exclusive Offers & Stores — HR Jewellers & Sons`;
        desc = `Explore exclusive discounts, GRP monthly savings options, BlueStone certified diamond offers, and check nearest boutique store pincodes.`;
        break;
      case 'checkout':
        title = `Checkout — HR Jewellers & Sons`;
        desc = `Complete your order securely with HR Jewellers & Sons. Choose delivery or store pickup.`;
        break;
      case 'terms-and-conditions':
        title = `Maison Terms & Conditions — HR Jewellers & Sons`;
        desc = `Read the official terms and conditions of HR Jewellers & Sons, including details on the 11+1 GRP saving scheme bonus eligibility and guidelines.`;
        break;
    }
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
  }, [currentPage, detailProduct, savingsSchemeType]);

  // Synchronize Browser Routing
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        const validPages = ['admin', 'savings', 'gold-reserve', 'offers', 'gold-coins', 'heritage', 'valuation', 'collections', 'showrooms', 'terms-and-conditions', 'privacy-policy', 'product-detail', 'savings-enroll', 'checkout'];
        if (validPages.includes(path)) {
          setCurrentPage(path);
          return;
        }
      } catch (e) {
        console.warn("PopState routing synchronization failed:", e);
      }
      setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Announcement Banner Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPledgeActiveIdx(prev => (prev + 1) % promisesList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Viewport-aware Legacy Timeline Autoplay
  useEffect(() => {
    if (!timelineAutoplay) return;

    const years = [1952, 1974, 1998, 2014, 2026];
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    const targetId = currentPage === 'heritage' ? 'heritage-story-section' : 'home-story-timeline';
    const element = document.getElementById(targetId);

    if (element) {
      observer.observe(element);
    }

    const interval = setInterval(() => {
      if (isVisible && timelineAutoplay) {
        setTimelineDirection(1);
        setActiveStoryTimeline((prev) => {
          const idx = years.indexOf(prev);
          const nextIdx = (idx + 1) % years.length;
          return years[nextIdx];
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [timelineAutoplay, currentPage, timelineResetTrigger]);

  // Intersection Observer for Polaroid Testimonials
  useEffect(() => {
    if (currentPage !== 'home') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    const element = testimonialsRef.current;
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [currentPage]);

  // ==========================================
  // DB SEEDING AND SYNCING
  // ==========================================
  useEffect(() => {
    const fetchOrSeedCatalog = async () => {
      try {
        const prodCol = collection(db, 'products');
        const snap = await getDocs(prodCol);
        const existingIds = new Set(snap.docs.map(d => d.id));
        let seededAny = false;

        for (const item of PRODUCTS) {
          if (!existingIds.has(item.id)) {
            console.log(`Seeding missing ornament into Firestore: ${item.name}...`);
            await setDoc(doc(prodCol, item.id), {
              ...item,
              createdDate: new Date()
            });
            seededAny = true;
          }
        }

        const localMap = new Map(PRODUCTS.map(p => [p.id, p]));
        const mergeLocalData = (dbProducts) => {
          return dbProducts.map(p => {
            const local = localMap.get(p.id);
            if (local) {
              return { ...p, ...local };
            }
            return p;
          });
        };

        if (seededAny) {
          const freshSnap = await getDocs(prodCol);
          setProducts(mergeLocalData(freshSnap.docs.map(d => ({ id: d.id, ...d.data() }))));
        } else {
          setProducts(mergeLocalData(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        }
      } catch (err) {
        console.error("Firestore Catalog seeding failed:", err);
      }

      try {
        const catCol = collection(db, 'categories');
        const snap = await getDocs(catCol);
        if (snap.empty) {
          const initialCats = [
            { id: 'gold', name: 'Fine Gold' },
            { id: 'silver', name: 'Sterling Silver' },
            { id: 'diamond', name: 'Diamonds & Polki' },
            { id: 'platinum', name: 'Luxury Platinum' },
            { id: 'bridal', name: 'Grand Bridal Suites' },
            { id: 'custom', name: 'Custom Bespoke' }
          ];
          for (const cat of initialCats) {
            await setDoc(doc(catCol, cat.id), cat);
          }
          const freshSnap = await getDocs(catCol);
          setCategories(freshSnap.docs.map(d => d.data()));
        } else {
          setCategories(snap.docs.map(d => d.data()));
        }
      } catch (err) {
        console.error("Firestore Categories seeding failed:", err);
      }
    };
    fetchOrSeedCatalog();
  }, []);

  // Daily Spot Bullion Sync Hook
  useEffect(() => {
    const fetchBullionRates = async () => {
      try {
        const rateDocRef = doc(db, 'bullion_rates', 'latest');
        const rateSnap = await getDoc(rateDocRef);
        if (rateSnap.exists()) {
          const stored = rateSnap.data();
          setGoldRate24k(stored.gold24k);
          setSilverRate(stored.silver);
          if (stored.lastUpdated) {
            setRatesLastUpdated(stored.lastUpdated.toDate().toLocaleTimeString([], {
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            }));
          }
        }

        // Live API conversion
        const [goldRes, silverRes, currencyRes] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU').then(res => res.json()),
          fetch('https://api.gold-api.com/price/XAG').then(res => res.json()),
          fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
        ]);

        const inrRate = currencyRes.rates.INR || 83.5;
        const g24 = Math.round((goldRes.price / 31.1034768) * inrRate);
        const g22 = Math.round(g24 * 0.9167);
        const slv = +(silverRes.price / 31.1034768 * inrRate).toFixed(2);

        setGoldRate24k(g24);
        setSilverRate(slv);
        setRatesLastUpdated(new Date().toLocaleTimeString([], {
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        }));

        await setDoc(rateDocRef, {
          gold24k: g24,
          gold22k: g22,
          silver: slv,
          lastUpdated: serverTimestamp()
        });
      } catch (err) {
        console.warn("Gold-API fluctuation fallback applied:", err);
        setGoldRate24k(prev => Math.round(prev + (Math.random() - 0.5) * 5));
        setSilverRate(prev => +(prev + (Math.random() - 0.5) * 0.06).toFixed(2));
      }
    };
    fetchBullionRates();
    const interval = setInterval(fetchBullionRates, 300000); // 5 mins auto refresh
    return () => clearInterval(interval);
  }, []);

  // Estimator Calculator Formula hook
  const calculatedBullionCost = useMemo(() => {
    const basePrice = selectedMetal === 'gold' ? goldRate24k : silverRate;
    let purityMultiplier = 1;

    if (selectedMetal === 'gold') {
      if (selectedPurity === '24K') purityMultiplier = 1;
      else if (selectedPurity === '22K') purityMultiplier = 0.9167;
      else if (selectedPurity === '18K') purityMultiplier = 0.75;
    } else {
      if (selectedPurity === '999') purityMultiplier = 1;
      else if (selectedPurity === '925') purityMultiplier = 0.925;
    }

    const metalVal = basePrice * weightInput * purityMultiplier;
    const wastageVal = metalVal * (wastageInput / 100);
    const makingChargesVal = metalVal * (makingChargesInput / 100);
    const subTotal = metalVal + wastageVal + makingChargesVal;
    const gstVal = subTotal * 0.03; // 3% standard GST
    return Math.round(subTotal + gstVal);
  }, [selectedMetal, weightInput, selectedPurity, goldRate24k, silverRate, makingChargesInput, wastageInput]);

  // PDP EMI interest compounding hook
  const calculatedEmi = useMemo(() => {
    if (!detailProduct) return 0;
    const price = detailProduct.price;
    // 20% downpayment standard with simple interest compounding
    const emi = (price - Math.round(price * 0.20)) * (0.095 / 12) * Math.pow(1.007916, emiMonths) / (Math.pow(1.007916, emiMonths) - 1);
    return Math.round(emi);
  }, [detailProduct, emiMonths]);

  // ==========================================
  // INTERACTIVE TRIGGERS
  // ==========================================
  const triggerAudio = (type) => {
    if (!soundEnabled) return;
    if (type === 'click') synth.playClick();
    if (type === 'shimmer') synth.playShimmer();
  };

  const toggleSound = () => {
    const target = !soundEnabled;
    setSoundEnabled(target);
    synth.muted = !target;
    if (target) {
      setTimeout(() => {
        synth.init();
        synth.playShimmer();
      }, 100);
    }
  };

  const navigateTo = (page) => {
    triggerAudio('click');
    setCurrentPage(page);
    try {
      if (page === 'home') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `/${page}`);
      }
    } catch (e) {
      console.warn("History pushState blocked by browser sandbox/policy:", e);
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };


  const navigateToPDP = (product) => {
    if (!product) return;
    triggerAudio('shimmer');
    setDetailProduct(product);
    setDetailActiveImg(product?.img);
    navigateTo('product-detail');
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 5);
      localStorage.setItem('hrj_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCategoryNav = (catId) => {
    if (catId === 'all') {
      changeCategoryTab('Collections');
    } else if (catId === 'gold') {
      changeCategoryTab('Collections');
    } else if (catId === 'diamond') {
      changeCategoryTab('Diamond Jewellery');
    } else if (catId === 'silver') {
      changeCategoryTab('Silver Jewellery');
    } else if (catId === 'bridal') {
      changeCategoryTab('Bridal Jewellery');
    } else if (catId === 'platinum') {
      changeCategoryTab('Diamond Jewellery');
    }
    navigateTo('collections');
  };


  // ZIP CodeFeasibility Checker
  const handleZipCheck = (e) => {
    e.preventDefault();
    if (!zipCode.trim()) return;
    setZipChecking(true);
    setZipCheckResult(null);
    triggerAudio('click');

    setTimeout(() => {
      setZipChecking(false);
      const isRajasthan = /^(30|31|32|33|34)/.test(zipCode.trim());
      if (isRajasthan) {
        setZipCheckResult({
          status: 'success',
          msg: '🚀 FEASIBLE! Guaranteed hand-delivered by private showroom lounge agents within 24 hours.'
        });
      } else if (/^\d{6}$/.test(zipCode.trim())) {
        setZipCheckResult({
          status: 'success',
          msg: '✈️ FEASIBLE! Insured priority air courier shipping available. Delivery within 3-5 business days.'
        });
      } else {
        setZipCheckResult({
          status: 'error',
          msg: '❌ INVALID ZIP! Please input a valid 6-digit Indian postal pin code.'
        });
      }
    }, 900);
  };

  // Cart & Wishlist actions
  const handleAddToCart = (item) => {
    triggerAudio('click');
    const existing = cartItems.find(i => i.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const handleRemoveFromCart = (itemId) => {
    triggerAudio('click');
    setCartItems(cartItems.filter(i => i.id !== itemId));
  };

  const updateCartQuantity = (itemId, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const nextQ = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQ };
      }
      return item;
    }));
  };

  const toggleWishlist = (item) => {
    triggerAudio('click');
    const hasItem = wishlistItems.find(i => i.id === item.id);
    if (hasItem) {
      setWishlistItems(wishlistItems.filter(i => i.id !== item.id));
    } else {
      setWishlistItems([...wishlistItems, item]);
    }
  };


  // Helper to securely write Firestore documents server-side (bypasses CORS & invalid client API key blocks)
  const saveDocumentToServerFirestore = async (collectionName, docData) => {
    try {
      const response = await fetch('/api/create-firestore-doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ collectionName, docData })
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        console.log(`DEBUG: Server-side Firestore write successful for '${collectionName}'. ID:`, resData.id);
        return resData.id;
      } else {
        throw new Error(resData.error || 'Server-side write failed');
      }
    } catch (err) {
      console.error(`DEBUG: Server-side Firestore write failed, attempting client-side fallback:`, err);
      // Failsafe client-side SDK fallback
      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    }
  };
  // 1. Try at Home Consultation
  const handleTryAtHomeSubmit = async (e) => {
    e.preventDefault();
    const itemName = tryHomeForm?.item || detailProduct?.name || 'Signature piece';
    const textMsg = `Hello HR Jewellers, I would like to schedule a private Comfort Try-at-Home session.\n\n*Client Name:* ${tryHomeForm?.name}\n*Phone:* ${tryHomeForm?.phone}\n*Date Requested:* ${tryHomeForm?.date}\n*Target Ornament:* ${itemName}`;
    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(textMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }

    try {
      triggerAudio('shimmer');
      const docData = {
        name: tryHomeForm?.name || '',
        phone: tryHomeForm?.phone || '',
        date: tryHomeForm?.date || '',
        requestType: 'Try at Home',
        notes: `Selected Try-on: ${itemName}`,
        createdDate: new Date(),
        status: 'Pending'
      };

      await saveDocumentToServerFirestore('consultations', docData);

      // Email webhook trigger
      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'consultation',
          recipient: 'notifications@hrjewellers.com',
          data: docData
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setTryHomeSuccess(true);
    }
  };

  // 1.5. Store Pincode Search
  const handleStoreSearch = (pincodeVal) => {
    const pin = pincodeVal !== undefined ? pincodeVal : storePincode;
    if (!pin || pin.toString().trim() === '') return;

    setStoreSearchStatus('loading');
    triggerAudio('click');

    setTimeout(() => {
      const sanitized = pin.toString().trim();
      if (sanitized.startsWith('334')) {
        setStoreSearchStatus({
          type: 'flagship',
          city: 'Bikaner',
          name: 'HR Jewellers & Sons Bikaner JNV Flagship',
          address: '4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan (334001)',
          phone: '+91 97838 43978 / +91 76108 43978',
          hours: '11:00 AM - 08:30 PM (Mon - Sun)',
          directions: 'https://maps.google.com/?q=4-D-37,+Near+Murti+Circle,+J.N.V.+Colony,+Bikaner'
        });
      } else if (sanitized.startsWith('302')) {
        setStoreSearchStatus({
          type: 'flagship',
          city: 'Jaipur',
          name: 'HR Jewellers & Sons Jaipur Central Showroom',
          address: 'Ground Floor, Landmark Tower, M.I. Road, Jaipur, Rajasthan (302001)',
          phone: '+91 91160 43978',
          hours: '11:00 AM - 08:30 PM (Mon - Sun)',
          directions: 'https://maps.google.com/?q=M.I.+Road,+Jaipur'
        });
      } else {
        setStoreSearchStatus({
          type: 'partner',
          pincode: sanitized,
          message: 'No flagship showroom found in this pincode, but we have Express Partners & Home Advisory available!'
        });
      }
    }, 600);
  };

  // 2. Showroom Lounge Appointment
  const handleLoungeBookingSubmit = async (e) => {
    e.preventDefault();
    const pass = `BS-ATELIER-${Math.floor(1000 + Math.random() * 9000)}`;
    setConsultationPassCode(pass);

    const waMsg = `Hello HR Jewellers, I have registered a private Showroom Suite consultation.\n\n*Suite Pass:* ${pass}\n*Patron Name:* ${consultationForm?.name}\n*Phone:* ${consultationForm?.phone}\n*Appt Date:* ${consultationForm?.date}\n*Time Slot:* ${consultationForm?.time}\n*Inquiry Scope:* ${consultationForm?.type}`;
    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }

    try {
      triggerAudio('shimmer');
      const docData = {
        name: consultationForm?.name || '',
        phone: consultationForm?.phone || '',
        email: consultationForm?.email || '',
        date: consultationForm?.date || '',
        time: consultationForm?.time || '',
        requestType: consultationForm?.type || 'Store Visit',
        notes: `Access code issued: ${pass}`,
        createdDate: new Date(),
        status: 'Pending'
      };

      await saveDocumentToServerFirestore('consultations', docData);

      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'consultation',
          recipient: 'notifications@hrjewellers.com',
          data: docData
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setLoungeSuccess(true);
    }
  };

  // 3. Gold Mine/Reserve Savings Scheme Enrollment
  const handleSavingsEnrollSubmit = async (e) => {
    e.preventDefault();
    const rate22K = Math.round(goldRate24k * 0.9167);
    const matureInstallments = 12; // 11 Paid + 1 Bonus
    const matureWeight = (monthlySavingsInput * matureInstallments) / rate22K;

    let waMsg = `Hello HR Jewellers & Sons, I would like to enroll in the 11+1 Gold Saving Scheme.\n\n*Patron Name:* ${savingsForm?.name}\n*Phone:* ${savingsForm?.phone}\n*Email:* ${savingsForm?.email}\n*City:* ${savingsForm?.city}\n*Aadhaar:* ${savingsForm?.aadhaar}\n*Monthly Installment:* ₹${monthlySavingsInput.toLocaleString('en-IN')}/month\n*11 Months Payment:* ₹${(monthlySavingsInput * 11).toLocaleString('en-IN')}\n*Atelier Bonus (Month 12):* ₹${monthlySavingsInput.toLocaleString('en-IN')}\n*Total mature value:* ₹${(monthlySavingsInput * 12).toLocaleString('en-IN')}\n*Est. Gold Weight Yield:* ${matureWeight.toFixed(2)} g\n*Preferred Branch:* ${savingsForm?.branch}`;

    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }

    try {
      triggerAudio('shimmer');
      const docData = {
        name: savingsForm?.name || '',
        phone: savingsForm?.phone || '',
        email: savingsForm?.email || '',
        city: savingsForm?.city || '',
        aadhaar: savingsForm?.aadhaar || '',
        amount: monthlySavingsInput,
        preferredJewellery: savingsForm?.preferredJewellery || 'Rings',
        budgetRange: savingsForm?.budgetRange || '₹5,000 - ₹15,000/mo',
        branch: savingsForm?.branch || 'Tilak Nagar Flagship, Bikaner',
        date: new Date().toLocaleDateString(),
        requestType: `11+1 Gold Saving Scheme Enrollment`,
        notes: `Selected monthly installment: ₹${monthlySavingsInput}/month. GRP Bonus: ₹${monthlySavingsInput}. Total mature value: ₹${monthlySavingsInput * 12}. Estimated gold weight: ${matureWeight.toFixed(2)} g. Branch requested: ${savingsForm?.branch || 'Tilak Nagar'}`,
        createdDate: new Date(),
        status: 'Pending'
      };

      await saveDocumentToServerFirestore('consultations', docData);

      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'gold_saving_scheme',
          recipient: 'notifications@hrjewellers.com',
          data: docData
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setSavingsSuccess(true);
    }
  };

  const handleSavingsEnrollWizardSubmit = async (e) => {
    if (e) e.preventDefault();
    const rate22K = Math.round(goldRate24k * 0.9167);
    const matureInstallments = 12; // 11 Paid + 1 Bonus
    const matureWeight = (monthlySavingsInput * matureInstallments) / rate22K;

    let waMsg = `Hello HR Jewellers & Sons, I would like to enroll in the 11+1 Gold Saving Scheme.\n\n*Step 1: Personal Details*\n*Name:* ${savingsEnrollForm.name}\n*Email:* ${savingsEnrollForm.email}\n*Phone/Mobile:* ${savingsEnrollForm.mobile}\n*Pincode:* ${savingsEnrollForm.pincode}\n*Address:* ${savingsEnrollForm.address}, ${savingsEnrollForm.street}, ${savingsEnrollForm.locality}, ${savingsEnrollForm.landmark || 'N/A'}, ${savingsEnrollForm.city}, ${savingsEnrollForm.state}\n\n*Step 2: Nominee Details*\n*Nominee Name:* ${savingsEnrollForm.nomineeName}\n*Relationship:* ${savingsEnrollForm.nomineeRelationship}\n*Nominee Phone:* ${savingsEnrollForm.nomineePhone || 'N/A'}\n\n*Subscription Details*\n*Monthly Installment:* ₹${monthlySavingsInput.toLocaleString('en-IN')}/month\n*Estimated Mature Gold Weight:* ${matureWeight.toFixed(2)} g\n*Maturity Value:* ₹${(monthlySavingsInput * 12).toLocaleString('en-IN')}\n\n*Step 3: Payment Type*\n*Authorized Method:* ${savingsEnrollForm.paymentMethod.toUpperCase()}`;

    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }

    try {
      triggerAudio('shimmer');
      const docData = {
        name: savingsEnrollForm.name || '',
        phone: savingsEnrollForm.mobile || '',
        email: savingsEnrollForm.email || '',
        pincode: savingsEnrollForm.pincode || '',
        address: `${savingsEnrollForm.address}, ${savingsEnrollForm.street}, ${savingsEnrollForm.locality}, ${savingsEnrollForm.city}, ${savingsEnrollForm.state}`,
        nomineeName: savingsEnrollForm.nomineeName || '',
        nomineeRelationship: savingsEnrollForm.nomineeRelationship || 'Spouse',
        amount: monthlySavingsInput,
        date: new Date().toLocaleDateString(),
        requestType: `11+1 Gold Saving Scheme Wizard Enrollment`,
        notes: `Selected monthly installment: ₹${monthlySavingsInput}/month. GRP Bonus: ₹${monthlySavingsInput}. Total mature value: ₹${monthlySavingsInput * 12}. Estimated gold weight: ${matureWeight.toFixed(2)} g. Nominee Relationship: ${savingsEnrollForm.nomineeRelationship}`,
        createdDate: new Date(),
        status: 'Pending'
      };

      await saveDocumentToServerFirestore('consultations', docData);

      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'gold_saving_scheme',
          recipient: 'notifications@hrjewellers.com',
          data: docData
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setSavingsEnrollStep(4);
    }
  };

  // 4. Shopping Bag Checkout Inquiries
  const handleCartCheckoutSubmit = async (e) => {
    e.preventDefault();
    const ref = generateOrderRef();

    const itemsStr = cartItems.map(item => `${item?.name} (x${item?.quantity}) [${item?.carat}]`).join(', ');
    const waMsg = `Hello HR Jewellers, I would like to make an inquiry and confirm my shopping bag order.\n\n*Order Ref:* ${ref}\n*Client Name:* ${checkoutForm?.name}\n*Phone:* ${checkoutForm?.phone}\n*Address:* ${checkoutForm?.address}\n*Method:* ${checkoutForm?.method}\n*Selected Ornaments:* ${itemsStr}\n*Estimated Amount:* ₹${(cartTotal).toLocaleString('en-IN')}`;
    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.assign(waUrl);
    }

    try {
      triggerAudio('shimmer');
      const orderItems = cartItems.map(i => ({
        id: i?.id || 'unknown',
        name: i?.name || 'Heirloom Piece',
        price: i?.price || 0,
        weight: i?.weight || 'N/A',
        quantity: i?.quantity || 1
      }));

      const orderData = {
        orderId: ref,
        customerDetails: {
          name: checkoutForm?.name || '',
          phone: checkoutForm?.phone || '',
          address: checkoutForm?.address || '',
          method: checkoutForm?.method || 'Cash on Showroom Delivery'
        },
        productDetails: orderItems,
        amount: cartTotal || 0,
        orderStatus: 'Pending',
        createdDate: new Date()
      };

      await saveDocumentToServerFirestore('orders', orderData);

      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'new_order',
          recipient: 'notifications@hrjewellers.com',
          data: {
            orderId: ref,
            name: checkoutForm?.name,
            phone: checkoutForm?.phone,
            address: checkoutForm?.address,
            items: orderItems,
            total: cartTotal
          }
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setCheckoutSuccess(true);
      setCartItems([]);
    }
  };

  const handleGeneralContactSubmit = (e) => {
    e.preventDefault();
    triggerAudio('shimmer');
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', phone: '', msg: '' });
    }, 5000);
  };

  // 5. Bespoke Custom Ornaments lead form processor
  const handleCustomDesignSubmit = async (e) => {
    e.preventDefault();
    console.log("BEFORE SUBMIT", customDesignForm);
    console.log("REFERENCE URL", customDesignForm.referenceImageUrl);

    if (!customDesignForm.referenceImageUrl || !customDesignForm.referenceImageUrl.startsWith('http')) {
      alert("Image upload failed. Please try again.");
      return;
    }

    const referenceImageURL = customDesignForm.referenceImageUrl;

    let waMsg = `Hello HR Jewellers & Sons,\n\n` +
      `Custom Jewelry Design Request\n\n` +
      `Patron Name: ${customDesignForm.name}\n` +
      `Phone: ${customDesignForm.phone}\n` +
      `Email: ${customDesignForm.email}\n` +
      `City: ${customDesignForm.city}\n\n` +
      `Jewelry Type: ${customDesignForm.jewelryType}\n` +
      `Material Preference: ${customDesignForm.material}\n\n` +
      `Estimated Budget:\n${customDesignForm.budget}\n\n` +
      `Description:\n${customDesignForm.description}\n\n` +
      `📸 Reference Image:\n${referenceImageURL}`;

    const waUrl = `https://wa.me/919783843978?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      window.location.href = waUrl;
    }

    try {
      triggerAudio('shimmer');
      const docData = {
        name: customDesignForm.name || '',
        phone: customDesignForm.phone || '',
        email: customDesignForm.email || '',
        city: customDesignForm.city || '',
        jewelryType: customDesignForm.jewelryType || 'Rings',
        material: customDesignForm.material || '22K Gold',
        budget: customDesignForm.budget || '₹20,000 - ₹50,000',
        description: customDesignForm.description || '',
        fileName: customDesignForm.fileName || '',
        fileData: customDesignForm.fileData || '',
        referenceImageUrl: referenceImageURL,
        requestType: 'Custom Design Request',
        createdDate: new Date(),
        status: 'Pending'
      };

      await saveDocumentToServerFirestore('consultations', docData);

      fetch('/api/send-email', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: 'custom_design_request',
          recipient: 'notifications@hrjewellers.com',
          data: docData
        })
      }).catch(e => console.log(e));
    } catch (err) {
      console.error(err);
    } finally {
      setCustomDesignSuccess(true);
    }
  };

  // ==========================================
  // FILTERS AND GRID UTILITIES
  // ==========================================

  const filteredJewellery = useMemo(() => {
    if (!Array.isArray(products)) return [];
    let result = products.filter(p => {
      if (!p) return false;
      // 1. Category Tab Filter
      const tab = activeCategoryTab;
      let matchesTab = true;
      if (tab && tab !== 'Collections') {
        const pName = String(p.name || '').toLowerCase();
        const pDesc = String(p.desc || '').toLowerCase();
        const pSub = String(p.subCategory || '').toLowerCase();
        const pCat = String(p.category || '').toLowerCase();
        const pCarat = String(p.carat || '').toLowerCase();

        if (tab === 'Rings') {
          matchesTab = pSub.includes('ring') || pCat === 'rings' || pName.includes('ring');
        } else if (tab === 'Earrings') {
          matchesTab = pSub.includes('earring') || pSub.includes('jhumka') || pName.includes('earring') || pName.includes('jhumka') || pName.includes('drop') || pCat === 'earrings';
        } else if (tab === 'Necklace') {
          matchesTab = pSub.includes('necklace') || pSub.includes('haar') || pSub.includes('choker') || pName.includes('necklace') || pName.includes('haar') || pName.includes('choker') || pName.includes('set') || pCat === 'necklace';
        } else if (tab === 'Mangalsutra') {
          matchesTab = pSub.includes('mangalsutra') || pName.includes('mangalsutra') || pDesc.includes('mangalsutra') || pCat === 'mangalsutra';
        } else if (tab === 'Bracelets') {
          matchesTab = pSub.includes('bracelet') || pName.includes('bracelet') || pCat === 'bracelets';
        } else if (tab === 'Bangles') {
          matchesTab = pSub.includes('bangle') || pSub.includes('kada') || pName.includes('bangle') || pName.includes('kada') || pCat === 'bangles';
        } else if (tab === 'Gold Coins') {
          matchesTab = pCat === 'gold coins' || pSub.includes('coin') || pName.includes('coin') || pDesc.includes('coin');
        } else if (tab === 'Anklets') {
          matchesTab = pSub.includes('anklet') || pSub.includes('payal') || pName.includes('anklet') || pName.includes('payal') || pCat === 'anklets';
        } else if (tab === 'Men Jewellery') {
          matchesTab = pCat === 'men' || pSub.includes('men') || pName.includes('men') || pName.includes('kada') || pName.includes('signet') || pDesc.includes('men');
        } else if (tab === 'Kids Jewellery') {
          matchesTab = pCat === 'kids' || pSub.includes('kids') || pName.includes('kids') || pName.includes('baby') || pName.includes('child') || pDesc.includes('kids');
        } else if (tab === 'Gifts & Pooja') {
          matchesTab = pCat === 'pooja' || pSub.includes('pooja') || pSub.includes('gift') || pSub.includes('thali') || pSub.includes('diya') || pSub.includes('idol') || pName.includes('pooja') || pName.includes('diya') || pName.includes('thali') || pName.includes('coin');
        } else if (tab === 'Bridal Jewellery') {
          matchesTab = pCat === 'bridal' || pSub.includes('bridal') || pName.includes('bridal') || pDesc.includes('bridal');
        } else if (tab === 'Diamond Jewellery') {
          matchesTab = pCat === 'diamond' || pSub.includes('diamond') || pName.includes('diamond') || pDesc.includes('diamond') || pCarat.includes('diamond') || pCarat.includes('vvs');
        } else if (tab === 'Silver Jewellery') {
          matchesTab = pCat === 'silver' || pSub.includes('silver') || pName.includes('silver') || pDesc.includes('silver') || pCarat.includes('sterling') || pCarat.includes('silver');
        } else {
          matchesTab = false;
        }
      }

      if (!matchesTab) return false;

      // 2. Metal Type Filter (Gold, Silver)
      if (metalFilter !== 'all') {
        const pCat = String(p.category || '').toLowerCase();
        const pDesc = String(p.desc || '').toLowerCase();
        const pCarat = String(p.carat || '').toLowerCase();
        const pName = String(p.name || '').toLowerCase();
        if (metalFilter === 'gold') {
          if (pCat === 'silver' || pName.includes('silver') || pDesc.includes('sterling silver') || pCarat.includes('sterling')) return false;
        } else if (metalFilter === 'silver') {
          if (pCat !== 'silver' && !pName.includes('silver') && !pDesc.includes('sterling') && !pCarat.includes('sterling')) return false;
        }
      }

      // 3. Purity Filter (18K, 22K, 24K)
      if (purityFilter !== 'all') {
        const pCarat = String(p.carat || '').toLowerCase();
        const pDesc = String(p.desc || '').toLowerCase();
        const pName = String(p.name || '').toLowerCase();
        if (purityFilter === '18K') {
          if (!pCarat.includes('18k') && !pDesc.includes('18k') && !pName.includes('18k')) return false;
        } else if (purityFilter === '22K') {
          if (!pCarat.includes('22k') && !pDesc.includes('22k') && !pName.includes('22k') && !pCarat.includes('916') && !pCarat.includes('solid gold')) return false;
        } else if (purityFilter === '24K') {
          if (!pCarat.includes('24k') && !pDesc.includes('24k') && !pName.includes('24k') && !pCarat.includes('999')) return false;
        }
      }

      // 4. Max Price Filter
      if (p.price && Number(p.price) > maxPriceFilter) return false;

      // 4.5. Search Text Filter
      if (homeSearchVal.trim()) {
        const query = homeSearchVal.toLowerCase();
        const pName = String(p.name || '').toLowerCase();
        const pDesc = String(p.desc || '').toLowerCase();
        const pSub = String(p.subCategory || '').toLowerCase();
        const pCat = String(p.category || '').toLowerCase();
        if (!pName.includes(query) && !pDesc.includes(query) && !pSub.includes(query) && !pCat.includes(query)) return false;
      }

      return true;
    });

    // 5. Sorting
    if (sortFilter === 'popularity') {
      return [...result].sort((a, b) => (String(b && b.badge) === 'BESTSELLER' ? 1 : 0) - (String(a && a.badge) === 'BESTSELLER' ? 1 : 0));
    } else if (sortFilter === 'newest') {
      return [...result].sort((a, b) => (String(b && b.badge) === 'NEW' ? 1 : 0) - (String(a && a.badge) === 'NEW' ? 1 : 0));
    } else if (sortFilter === 'price_low') {
      return [...result].sort((a, b) => Number(a && a.price || 0) - Number(b && b.price || 0));
    } else if (sortFilter === 'price_high') {
      return [...result].sort((a, b) => Number(b && b.price || 0) - Number(a && a.price || 0));
    }

    return result;
  }, [products, activeCategoryTab, metalFilter, purityFilter, maxPriceFilter, sortFilter, homeSearchVal]);


  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredJewellery.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (collectionsPage - 1) * ITEMS_PER_PAGE;
    return filteredJewellery.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJewellery, collectionsPage]);



  const cartTotal = (cartItems || []).reduce((acc, curr) => acc + Number(curr && curr.price || 0) * Number(curr && curr.quantity || 1), 0);

  if (currentPage === 'admin') {
    return <Admin />;
  }

  if (siteLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#050008] bg-gradient-to-br from-[#050008] via-[#120020] to-[#1B0033] flex flex-col items-center justify-center select-none overflow-hidden">
        {/* Soft Ambient Spotlight Glow */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-[#DDA0DD]/8 blur-[130px] pointer-events-none animate-pulse-slow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        {/* Subtle Gold Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute w-1 h-1 bg-[#DDA0DD] rounded-full top-[20%] left-[30%] animate-particle-1" />
          <div className="absolute w-1.5 h-1.5 bg-[#DDA0DD] rounded-full top-[60%] left-[15%] animate-particle-2" />
          <div className="absolute w-1 h-1 bg-[#DDA0DD] rounded-full top-[80%] left-[75%] animate-particle-3" />
          <div className="absolute w-2 h-2 bg-[#DDA0DD] rounded-full top-[40%] left-[85%] animate-particle-1" />
          <div className="absolute w-1 h-1 bg-[#DDA0DD] rounded-full top-[15%] left-[65%] animate-particle-2" />
        </div>

        {/* Main Brand Seal & Typography */}
        <div className="relative flex flex-col items-center text-center animate-luxury-splash">
          {/* Logo container with size variations */}
          <div className="relative">
            {/* Subtle glow circle behind logo */}
            <div className="absolute inset-0 rounded-full bg-[#DDA0DD]/15 filter blur-2xl scale-75 animate-pulse" />
            <img
              src={hrLogo}
              alt="HR Jewellers & Sons Logo"
              className="w-[200px] h-[151px] md:w-[260px] md:h-[196px] lg:w-[320px] lg:h-[241px] object-contain select-none relative z-10"
            />
          </div>

          {/* Brand Name */}
          <h1 className="serif-luxury text-xl sm:text-2xl lg:text-3xl font-semibold tracking-[4px] text-[#DDA0DD] mt-6 mb-2">
            HR JEWELLERS &amp; SONS
          </h1>

          {/* Luxury Tagline */}
          <p className="text-xs sm:text-[14px] font-sans tracking-[3px] text-white/75 font-light">
            Timeless Elegance &bull; Trusted Heritage
          </p>

          {/* Luxury Loading Indicator */}
          <div className="w-[120px] h-[2px] bg-[#DDA0DD]/20 rounded-full mt-6 overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#DDA0DD] via-white to-[#DDA0DD] rounded-full absolute top-0 left-0 animate-luxury-loader" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`font-sans min-h-screen relative overflow-x-hidden transition-colors duration-500 ${isCatalogDark ? "bg-[#1D0E29] text-[#FBF9FF] selection:bg-[#DDA0DD]/20 selection:text-[#DDA0DD]" : "bg-[#FBF9FF] text-[#4A126D] selection:bg-[#4A126D]/10 selection:text-[#4A126D]"}`}>
        {/* Spotlights for Dark theme */}
        {isCatalogDark && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#DDA0DD]/4 blur-[180px] animate-pulse-slow" />
            <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#DDA0DD]/4 blur-[200px] animate-pulse-slow" />
          </div>
        )}


        <nav className="sticky top-0 w-full z-50 select-none shadow-md transition-all duration-300">
          {/* DESKTOP HEADER (Two-Row Grid) */}
          <div className="hidden lg:flex flex-col w-full">
            {/* Top Row: Dark Purple Background */}
            <div className="w-full bg-[#13071C] border-b border-white/5 h-20 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center gap-6 h-full">

                {/* Brand Logo & Typography */}
                <button
                  id="logo-branding-btn"
                  onClick={() => navigateTo('home')}
                  className="flex items-center space-x-3 shrink-0 focus:outline-none transition-all duration-300 hover:scale-[1.02] text-left cursor-pointer"
                >
                  <img
                    src={hrLogo}
                    alt="HR Jewellers &amp; Sons Logo"
                    className="w-[80px] h-[60px] lg:w-[100px] lg:h-[75px] object-contain select-none filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)] mix-blend-screen"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="serif-luxury text-sm lg:text-base font-semibold leading-tight tracking-[2px] text-[#DDA0DD]">
                      HR JEWELLERS
                    </span>
                    <span className="serif-luxury text-[10px] lg:text-xs font-semibold leading-none tracking-[3px] text-[#DDA0DD]/90 -mt-0.5">
                      &amp; SONS
                    </span>
                  </div>
                </button>

                {/* Search Bar with live suggestions */}
                <div className="relative flex-1 max-w-[550px] mx-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={homeSearchVal}
                      onChange={handleSearchChange}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      placeholder="Search for jewellery, gold coins..."
                      className="w-full h-11 pl-11 pr-4 bg-[#1a0c24] border border-[#DDA0DD]/20 focus:border-[#DDA0DD]/45 focus:outline-none focus:ring-1 focus:ring-[#DDA0DD]/20 rounded-full text-[#FCFAFF] placeholder-slate-400 text-sm font-medium transition-all shadow-inner"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </form>

                  {/* Suggestions Dropdown (Dark Theme) */}
                  {searchFocused && homeSearchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c0d2c] text-[#FCFAFF] shadow-2xl border border-[#DDA0DD]/20 rounded-2xl py-3 px-4 z-50 max-h-[300px] overflow-y-auto animate-fade-in">
                      {homeSearchSuggestions.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            triggerAudio('click');
                            navigateToPDP(prod);
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-[#DDA0DD]/10 rounded-xl transition-colors text-left"
                        >
                          <img src={prod.img} alt={prod.name} className="w-10 h-10 object-contain rounded-lg border border-[#DDA0DD]/10 bg-white" />
                          <div>
                            <div className="text-xs font-bold text-[#FCFAFF] line-clamp-1">{prod.name}</div>
                            <div className="text-[10px] text-[#DDA0DD] font-bold font-sans">₹{formatPrice(prod.price)}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Utilities Icons Row */}
                <div className="flex items-center space-x-5 xl:space-x-6 h-full">

                  {/* 1. Sound */}
                  <button
                    onClick={toggleSound}
                    className="flex flex-col items-center justify-center text-center cursor-pointer text-[#DDA0DD] hover:scale-105 transition-transform"
                    title={soundEnabled ? "Mute chimes" : "Unmute chimes"}
                  >
                    <div className="p-1 hover:bg-white/5 rounded-full transition-colors">
                      {soundEnabled ? (
                        <svg className="w-5.5 h-5.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      ) : (
                        <svg className="w-5.5 h-5.5 text-[#D4AF37]/50" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6h4.72L12.75 5.1c.3-.3.8-.09.8.32v13.16c0 .41-.5.62-.8.32l-3.53-3.53H6.75c-.69 0-1.25-.56-1.25-1.25v-3c0-.69.56-1.25 1.25-1.25z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[9px] tracking-wide mt-0.5 whitespace-nowrap font-bold text-slate-300 uppercase">Sound</span>
                  </button>

                  {/* 2. Inquire (WhatsApp) */}
                  <a
                    href="https://wa.me/919414088000?text=Hello%20HR%20Jewellers,%20I%20am%20interested%20in%20your%20jewellery%20designs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center cursor-pointer text-[#DDA0DD] hover:scale-105 transition-transform"
                  >
                    <div className="p-1 hover:bg-white/5 rounded-full transition-colors">
                      <svg className="w-5.5 h-5.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.705 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="text-[9px] tracking-wide mt-0.5 whitespace-nowrap font-bold text-slate-300 uppercase">Inquire</span>
                  </a>

                  {/* 3. Stores */}
                  <button
                    onClick={() => { triggerAudio('click'); navigateTo('offers'); }}
                    className="flex flex-col items-center justify-center text-center cursor-pointer text-[#DDA0DD] hover:scale-105 transition-transform"
                  >
                    <div className="p-1 hover:bg-white/5 rounded-full transition-colors">
                      <svg className="w-5.5 h-5.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-[9px] tracking-wide mt-0.5 whitespace-nowrap font-bold text-slate-300 uppercase">Stores</span>
                  </button>

                  {/* 4. Wishlist */}
                  <button
                    id="header-wishlist-btn"
                    onClick={() => { triggerAudio('click'); setWishlistOpen(true); }}
                    className="flex flex-col items-center justify-center text-center relative cursor-pointer text-[#DDA0DD] hover:scale-105 transition-transform"
                  >
                    <div className="p-1 hover:bg-white/5 rounded-full transition-colors relative">
                      <svg className="w-5.5 h-5.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {wishlistItems.length > 0 && (
                        <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                          {wishlistItems.length}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] tracking-wide mt-0.5 whitespace-nowrap font-bold text-slate-300 uppercase">Wishlist</span>
                  </button>

                  {/* 5. Cart */}
                  <button
                    id="header-cart-btn"
                    onClick={() => { triggerAudio('click'); setCartOpen(true); }}
                    className="flex flex-col items-center justify-center text-center relative cursor-pointer text-[#DDA0DD] hover:scale-105 transition-transform"
                  >
                    <div className="p-1 hover:bg-white/5 rounded-full transition-colors relative">
                      <svg className="w-5.5 h-5.5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      {cartItems.length > 0 && (
                        <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                          {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] tracking-wide mt-0.5 whitespace-nowrap font-bold text-slate-300 uppercase">Cart</span>
                  </button>

                  {/* Profile and More options removed as requested */}
                </div>

              </div>
            </div>

            {/* Bottom Row: Dark Purple/Black Background */}
            <div className="w-full bg-[#0d0418] h-12 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full flex justify-center items-center h-full">

                {/* Centered Navigation Links */}
                <div className="flex items-center justify-center space-x-5 lg:space-x-6 h-full text-[11px] font-sans tracking-widest uppercase font-bold text-slate-200">
                  {/* 11+1 Scheme Dropdown */}
                  <div className="relative group h-full flex items-center">
                    <button
                      onClick={() => { triggerAudio('click'); navigateTo('savings'); }}
                      className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                    >
                      <span>11+1 Scheme</span>
                      <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white text-gray-800 shadow-2xl border border-gray-200/60 rounded-b-2xl py-3 px-1 min-w-[200px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-xs normal-case font-sans select-none">
                      <button
                        onClick={() => { triggerAudio('click'); navigateTo('savings'); }}
                        className="w-full text-left px-5 py-3 text-[13px] font-semibold text-gray-800 hover:bg-[#4A126D]/8 hover:text-[#4A126D] transition-colors rounded-xl cursor-pointer"
                      >
                        Gold Mine
                      </button>
                      <button
                        onClick={() => { triggerAudio('click'); navigateTo('gold-reserve'); }}
                        className="w-full text-left px-5 py-3 text-[13px] font-semibold text-gray-800 hover:bg-[#4A126D]/8 hover:text-[#4A126D] transition-colors rounded-xl cursor-pointer"
                      >
                        Gold Reserve
                      </button>
                    </div>
                  </div>

                  {/* Watch Jewellery */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Bracelets'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Watch Jewellery</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Rings */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Rings'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Rings</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Earrings */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Earrings'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Earrings</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Necklaces */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Necklace'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Necklaces</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Pendants */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Necklace'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Pendants</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Solitaires */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Rings'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>Solitaires</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* All Jewellery */}
                  <button
                    onClick={() => { triggerAudio('click'); changeCategoryTab('Collections'); navigateTo('collections'); }}
                    className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                  >
                    <span>All Jewellery</span>
                    <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Gifts Dropdown */}
                  <div className="relative group h-full flex items-center">
                    <button
                      onClick={() => { triggerAudio('click'); changeCategoryTab('Gifts & Pooja'); navigateTo('collections'); }}
                      className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                    >
                      <span>Gifts</span>
                      <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white text-gray-800 shadow-2xl border border-gray-200/60 rounded-b-2xl py-6 px-7 min-w-[420px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex gap-8 text-xs normal-case font-sans select-none text-left">
                      {/* Left: Gift Categories */}
                      <div className="flex flex-col space-y-1 flex-1">
                        <h4 className="font-bold text-[13px] text-[#031838] border-b border-gray-100 pb-2 mb-1">Gifts For Special Someone</h4>
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
                            className="text-left hover:text-[#D4AF37] hover:translate-x-1 transition-all py-1 cursor-pointer"
                          >
                            <span className="font-bold text-[12px] text-gray-800 block">{g.label}</span>
                            <span className="text-[10px] text-gray-400">Starting at Rs. {g.price}/-</span>
                          </button>
                        ))}
                      </div>

                      {/* Right: Gift Card Banner */}
                      <div className="flex flex-col items-center justify-center bg-[#FAF8F6] rounded-2xl p-4 min-w-[160px]">
                        <div className="bg-gradient-to-br from-[#8B7BA5] to-[#6B5B8A] rounded-xl p-4 text-center text-white w-full">
                          <p className="text-[9px] uppercase tracking-wider font-semibold opacity-80">HR Jeweller & Sons</p>
                          <p className="text-[10px] font-bold mt-0.5">Gift Cards</p>
                          <div className="text-2xl mt-1">💍</div>
                        </div>
                        <p className="text-[10px] text-gray-500 text-center mt-2 leading-snug font-medium">Available in denominations<br />starting from <strong className="text-[#031838]">₹500</strong> to <strong className="text-[#031838]">₹50,000</strong></p>
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
                      className="hover:text-white transition-colors duration-300 cursor-pointer h-full flex items-center"
                    >
                      <span>Gold Coins</span>
                      <svg className="w-3 h-3 ml-1 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white text-gray-800 shadow-2xl border border-gray-200/60 rounded-b-2xl py-6 px-7 min-w-[320px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 grid grid-cols-2 gap-x-8 gap-y-4 text-xs normal-case font-sans select-none text-left">
                      <div className="flex flex-col space-y-2.5">
                        <button
                          onClick={() => {
                            triggerAudio('click');
                            navigateTo('gold-coins');
                            setCoinPurityTab('24K');
                            setCoinWeightFilter('all');
                          }}
                          className="font-bold text-[13px] text-gray-900 border-b border-gray-100 pb-1.5 text-left hover:text-[#D4AF37] transition-colors"
                        >
                          24 Kt (995)
                        </button>
                        <div className="flex flex-col space-y-2 text-[12px] text-gray-600 font-medium">
                          {['0.5', '1', '2', '5', '10', '20', '50'].map((w) => (
                            <button
                              key={`dropdown-24k-${w}`}
                              onClick={() => {
                                triggerAudio('click');
                                navigateTo('gold-coins');
                                setCoinPurityTab('24K');
                                setCoinWeightFilter(w);
                              }}
                              className="text-left hover:text-[#D4AF37] hover:translate-x-1 transition-all py-0.5 cursor-pointer"
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
                          className="font-bold text-[13px] text-gray-900 border-b border-gray-100 pb-1.5 text-left hover:text-[#D4AF37] transition-colors"
                        >
                          22 Kt (916)
                        </button>
                        <div className="flex flex-col space-y-2 text-[12px] text-gray-600 font-medium">
                          {['1', '2', '5', '10', '20', '50'].map((w) => (
                            <button
                              key={`dropdown-22k-${w}`}
                              onClick={() => {
                                triggerAudio('click');
                                navigateTo('gold-coins');
                                setCoinPurityTab('22K');
                                setCoinWeightFilter(w);
                              }}
                              className="text-left hover:text-[#D4AF37] hover:translate-x-1 transition-all py-0.5 cursor-pointer"
                            >
                              {w} gram
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Offers Dropdown */}
                  <div className="relative group h-full flex items-center">
                    <button
                      onClick={() => { triggerAudio('click'); navigateTo('offers'); }}
                      className="hover:text-[#DDA0DD] transition-colors duration-300 cursor-pointer h-full flex items-center text-[#DDA0DD]"
                    >
                      <span>Offers</span>
                      <svg className="w-3 h-3 ml-1 text-[#DDA0DD]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-0 bg-white text-gray-800 shadow-2xl border border-gray-200/60 rounded-b-2xl py-3 px-1 min-w-[340px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-xs normal-case font-sans select-none">
                      <button
                        onClick={() => { triggerAudio('click'); setMaxPriceFilter(1000000); changeCategoryTab('Collections'); navigateTo('collections'); }}
                        className="w-full text-left px-5 py-3 text-[12px] font-semibold text-gray-800 hover:bg-[#DDA0DD]/10 hover:text-[#4A126D] transition-colors rounded-xl cursor-pointer leading-snug"
                      >
                        💎 Up To 50% Off On Making Charges On Diamond Jewellery
                      </button>
                      <button
                        onClick={() => { triggerAudio('click'); setMetalFilter('gold'); changeCategoryTab('Collections'); navigateTo('collections'); }}
                        className="w-full text-left px-5 py-3 text-[12px] font-semibold text-gray-800 hover:bg-[#DDA0DD]/10 hover:text-[#4A126D] transition-colors rounded-xl cursor-pointer leading-snug"
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
          <div className="lg:hidden flex items-center justify-between w-full h-16 px-4 bg-white border-b border-slate-100">
            {/* Mobile Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-1 focus:outline-none cursor-pointer"
            >
              <div className="flex flex-col justify-center">
                <span className="font-sans text-[15px] font-black tracking-[0.15em] text-[#0b2240] uppercase leading-none">
                  HR JEWELLERS
                </span>
                <span className="font-sans text-[7px] font-bold tracking-[0.3em] text-[#0b2240]/80 uppercase mt-0.5 pl-0.5 leading-none">
                  &amp; SONS
                </span>
              </div>
            </button>

            {/* Mobile Action Controls */}
            <div className="flex items-center space-x-3 text-[#0b2240]">
              {/* Search Input toggle */}
              <button
                onClick={() => { triggerAudio('click'); navigateTo('collections'); }}
                className="p-1.5 hover:bg-slate-50 rounded-full"
                title="Search"
              >
                <svg className="w-5 h-5 text-[#0b2240]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Mobile */}
              <button
                onClick={() => { triggerAudio('click'); setWishlistOpen(true); }}
                className="p-1.5 hover:bg-slate-50 rounded-full relative"
              >
                <svg className="w-5 h-5 text-[#0b2240]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#4A126D] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart Mobile */}
              <button
                onClick={() => { triggerAudio('click'); setCartOpen(true); }}
                className="p-1.5 hover:bg-slate-50 rounded-full relative"
              >
                <svg className="w-5 h-5 text-[#0b2240]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => { triggerAudio('click'); setMobileMenuOpen(!mobileMenuOpen); }}
                className="p-1.5 hover:bg-slate-50 rounded-full ml-1 cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                <svg className="w-6 h-6 text-[#0b2240]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>


        {/* Mobile Sticky bottom navigation bar */}
        <div className={`lg:hidden fixed bottom-0 left-0 w-full border-t z-40 backdrop-blur-md flex justify-around py-1.5 sm:py-3 text-[7px] sm:text-[9px] uppercase tracking-wider font-bold shadow-lg transition-colors duration-500 ${isCatalogDark ? "bg-[#1D0E29]/95 border-gold/15 text-white/70 shadow-2xl" : "bg-[#FCFAFF]/95 border-[#DDA0DD]/20 text-[#4A126D]/70"}`}>
          <button onClick={() => navigateTo('home')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${currentPage === 'home' ? 'text-[#DDA0DD]' : isCatalogDark ? 'hover:text-white' : 'hover:text-[#4A126D]'}`}>
            <span className="text-sm sm:text-base">🏠</span><span>Home</span>
          </button>
          <button onClick={() => handleCategoryNav('all')} className={`flex flex-col items-center gap-0.5 cursor-pointer ${currentPage === 'collections' ? 'text-[#DDA0DD]' : isCatalogDark ? 'hover:text-white' : 'hover:text-[#4A126D]'}`}>
            <span className="text-sm sm:text-base">💎</span><span>Catalog</span>
          </button>
          <button onClick={() => { triggerAudio('click'); setCartOpen(true); }} className={`flex flex-col items-center gap-0.5 relative cursor-pointer ${isCatalogDark ? "hover:text-white" : "hover:text-[#4A126D]"}`}>
            <span className="text-sm sm:text-base">🛍️</span><span>Bag</span>
            {cartItems.length > 0 && <span className="absolute top-0 right-3 w-1.5 h-1.5 bg-[#DDA0DD] rounded-full animate-ping"></span>}
          </button>
          <button onClick={() => setConsultationModal(true)} className={`flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#DDA0DD]`}>
            <span className="text-sm sm:text-base">📅</span><span>Suite</span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════
           MOBILE MENU DRAWER - BlueStone Exact Style
           ═══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-50 bg-white overflow-hidden select-none flex flex-col h-full"
            >

              {/* ── Dark Header Bar (BlueStone style) ── */}
              <div className="bg-[#1B3152] px-4 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/60 text-[10px] font-sans font-medium">Welcome to</span>
                    <span className="text-white text-[13px] font-sans font-bold tracking-wide">HR Jewellers & Sons</span>
                  </div>
                </div>
                <button
                  onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); }}
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Scrollable Content ── */}
              <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide overscroll-contain" style={{ WebkitOverflowScrolling: 'touch', minHeight: 0 }}>

                {/* ── "Shop For" Section ── */}
                <div className="px-4 pt-4 pb-1">
                  <span className="text-[11px] text-gray-400 font-sans font-medium">Shop For</span>
                </div>

                {/* Category List Items */}
                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Watch Jewellery', tab: 'Bracelets' },
                    { label: 'Women', nav: 'all' },
                    { label: 'Men', tab: 'Men Jewellery' },
                    { label: 'Kids', tab: 'Kids Jewellery' },
                    { label: 'Offers', page: 'offers', highlight: true },
                    { label: 'Gifting', tab: 'Collections' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        triggerAudio('click');
                        setMobileMenuOpen(false);
                        if (item.page) navigateTo(item.page);
                        else if (item.nav) handleCategoryNav(item.nav);
                        else if (item.tab) { changeCategoryTab(item.tab); navigateTo('collections'); }
                      }}
                      className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className={`text-[14px] font-sans font-medium ${item.highlight ? 'text-[#E07C6A]' : 'text-gray-800'}`}>
                        {item.label}
                      </span>
                      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* ── Gold Mine 11+1 Monthly Plan Banner ── */}
                <button
                  onClick={() => { triggerAudio('shimmer'); setMobileMenuOpen(false); navigateTo('offers'); }}
                  className="w-full flex items-center justify-between px-4 py-4 bg-[#FDF8F0] border-y border-[#E6C687]/20 cursor-pointer hover:bg-[#FBF3E5] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-md border border-[#E6C687]/40 bg-white flex items-center justify-center overflow-hidden">
                      <span className="text-[10px] font-serif font-bold text-[#8B6914] leading-tight text-center px-1">Gold<br />Mine</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[14px] font-sans font-bold text-gray-900 tracking-tight">11 + 1 Monthly Plan</span>
                      <span className="text-[10px] font-sans text-gray-500">(Save & get the last month FREE!)</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>

                {/* ── "Jewellery" Section ── */}
                <div className="px-4 pt-5 pb-1">
                  <span className="text-[11px] text-gray-400 font-sans font-medium">Jewellery</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {[
                    { label: 'Diamond', nav: 'diamond' },
                    { label: 'Plain Gold', nav: 'gold' },
                    { label: 'Gemstone', tab: 'Collections' },
                    { label: 'Platinum', nav: 'platinum' },
                    { label: 'Solitaire', tab: 'Rings' },
                    { label: 'Gold Coins', page: 'gold-coins' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        triggerAudio('click');
                        setMobileMenuOpen(false);
                        if (item.page) navigateTo(item.page);
                        else if (item.nav) handleCategoryNav(item.nav);
                        else if (item.tab) { changeCategoryTab(item.tab); navigateTo('collections'); }
                      }}
                      className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
                    >
                      <span className="text-[14px] font-sans font-medium text-gray-800">{item.label}</span>
                      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* ── Locate Our Store Banner ── */}
                <button
                  onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); window.open('https://maps.google.com/?q=4-D-37,+Near+Murti+Circle,+J.N.V.+Colony,+Bikaner,+Rajasthan+334003', '_blank'); }}
                  className="w-full flex items-center gap-3 px-4 py-4 bg-[#E8DCC8] cursor-pointer hover:bg-[#DDD0B8] transition-colors focus:outline-none mt-2"
                >
                  <svg className="w-8 h-8 text-[#5C4A2A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-[14px] font-sans font-bold text-[#3D3122] tracking-wide uppercase">Locate Our Store</span>
                </button>

                {/* ── Bottom Links ── */}
                <div className="divide-y divide-gray-100 mt-2">
                  <button
                    onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); navigateTo('home'); }}
                    className="w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-[#E07C6A] hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                  >
                    Recently Viewed
                  </button>

                  <a
                    href="https://wa.me/917610843978?text=Hello%20HR%20Jewellers,%20I%20would%20like%20a%20video%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Video Call Cart
                  </a>

                  <button
                    onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); navigateTo('heritage'); }}
                    className="w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                  >
                    Jewellery Guide
                  </button>

                  <button
                    onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); navigateTo('valuation'); }}
                    className="w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                  >
                    Live Gold Rates
                  </button>

                  <button
                    onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); navigateTo('privacy-policy'); }}
                    className="w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                  >
                    Privacy Policy
                  </button>

                  <button
                    onClick={() => { triggerAudio('click'); setMobileMenuOpen(false); navigateTo('terms-and-conditions'); }}
                    className="w-full text-left px-4 py-4 text-[14px] font-sans font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none"
                  >
                    Terms & Conditions
                  </button>
                </div>

                {/* ── Live Gold Rate Mini Widget ── */}
                <div className="px-4 py-4 mt-2">
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[11px] font-sans text-gray-500">Gold 22K</span>
                      <span className="text-[12px] font-sans font-bold text-gray-800">₹{(goldRate24k * 0.9167).toFixed(0)}/g</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans text-gray-500">Silver</span>
                      <span className="text-[12px] font-sans font-bold text-gray-800">₹{silverRate.toFixed(1)}/g</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==========================================================
          MAIN AREA PAGES
          ========================================================== */}
        <main className="animate-fade-in">

          {/* ==========================================
            A. HOME PAGE STOREFRONT VIEW
            ========================================== */}
          {currentPage === 'home' && (() => {
            const trendingProducts = products.filter(p => p.badge === 'NEW' || p.badge === 'LIMITED EDITION' || p.category === 'diamond').slice(0, 8);
            const bestSellers = products.filter(p => p.badge === 'BESTSELLER').slice(0, 4);
            const homeCategories = [
              { name: 'Solitaires', img: solitariesImg, tab: 'Rings' },
              { name: 'Watch Jewellery', img: watchJewelleryImg, tab: 'Bracelets' },
              { name: "Men's Jewellery", img: mensJewelleryImg, tab: 'Men Jewellery' },
              { name: 'Mangalsutras', img: mangalsutrasImg, tab: 'Mangalsutra' },
              { name: 'Nose Pins', img: nosePinsImg, tab: 'Collections' },
              { name: 'Kids Jewellery', img: kidsJewelleryImg, tab: 'Kids Jewellery' },
              { name: 'Gold Coins', img: goldCoinsImg, page: 'gold-coins' },
              { name: 'Anklets', img: ankletsImg, tab: 'Anklets' },
              { name: 'Pendants', img: pendantsImg, tab: 'Necklace' },
              { name: 'Rings', img: ringsImg, tab: 'Rings' },
              { name: 'Necklaces', img: necklacesImg, tab: 'Necklace' },
              { name: 'Earrings', img: sapphireHeritageSet, tab: 'Earrings' },
              { name: 'Bangles', img: goldKada, tab: 'Bangles' },
              { name: 'Bracelets', img: diamondBracelet, tab: 'Bracelets' },
              { name: 'Gold Chains', img: goldChainsImg, tab: 'Necklace' },
              { name: 'Kada', img: kadaImg, tab: 'Bangles' }
            ];
            const recommendedCategories = [
              { name: 'Rings', img: ringsImg, tab: 'Rings' },
              { name: 'Earrings', img: sapphireHeritageSet, tab: 'Earrings' },
              { name: 'Pendants', img: pendantsImg, tab: 'Necklace' },
              { name: 'Chains', img: goldChainsImg, tab: 'Necklace' },
              { name: 'Necklaces', img: necklacesImg, tab: 'Necklace' },
              { name: 'Bangles', img: goldKada, tab: 'Bangles' },
              { name: 'Bracelets', img: diamondBracelet, tab: 'Bracelets' },
              { name: 'Mangalsutra', img: mangalsutrasImg, tab: 'Mangalsutra' },
              { name: 'Nose Pins', img: nosePinsImg, tab: 'Collections' },
              { name: 'Solitaires', img: solitariesImg, tab: 'Rings' },
              { name: "Kids' Jewellery", img: kidsJewelleryImg, tab: 'Kids Jewellery' },
              { name: 'Kada', img: kadaImg, tab: 'Bangles' },
              { name: "Men's Jewellery", img: mensJewelleryImg, tab: 'Men Jewellery' },
              { name: 'Watch Accessories', img: watchJewelleryImg, tab: 'Bracelets' },
              { name: 'Anklets', img: ankletsImg, tab: 'Anklets' }
            ];
            const testimonialsData = [
              {
                patron: "Maharani Gayatri Devi",
                city: "Jaipur Legacy",
                quote: "The Kundan Aad carries the exact weight and majesty of our family heirlooms. Their master artisans preserved the 18th-century reverse Meenakari detail with breathtaking precision. A stellar testament to Rajasthan's living history."
              },
              {
                patron: "Suryaveer Singh Rathore",
                city: "Bikaner Royal Lineage",
                quote: "The Chitai hand-hammered sterling silver sets represent craftsmanship that is virtually extinct today. Standard luxury brands sell machine-pressed copies, but HR Jewellers delivers a heavy, resonant masterpiece forged entirely by hand."
              },
              {
                patron: "Aishwarya Sen",
                city: "Delhi High-Fashion",
                quote: "Their GRP Gold Mine savings plan allowed me to systematically invest in my wedding chokers. The weight lock feature shielded my budget from the sudden spike in metal rates. Exceptional trust, and their home try-on service was pure luxury."
              }
            ];

            const faqData = [
              {
                q: "How are active daily spot gold and silver bullion rates calculated?",
                a: "We pull direct, real-time rates from international commodity indexes (XAU/XAG) converted via active INR currency exchange benchmarks. This gives you exact, transparent pricing down to the second, matching government BIS guidelines."
              },
              {
                q: "What certifications accompany your diamond and polki ornaments?",
                a: "Every solitaire and natural diamond comes certified with unique laser-inscription registry codes by the International Gemological Institute (IGI). All gold ornaments carry 100% official Bureau of Indian Standards (BIS) 916 Hallmark engravings."
              },
              {
                q: "Can I customize an ancestral royal seal, design or signet ring?",
                a: "Absolutely. Our Tilak Nagar design studio specializes in bespoke custom forgings. You can schedule a private showroom lounge appointment with our master designer Anil Soni to review family seals, drawings, or sketches."
              },
              {
                q: "How does the 11+1 Gold Saving Scheme operate?",
                a: "You pay simple, convenient monthly installments for 11 consecutive months. On the 12th Month, HR Jewellers & Sons credits the final installment completely FREE as a 100% Bonus Month, and you can redeem the consolidated value against any hallmarked gold or certified diamonds."
              },
              {
                q: "What security measures protect home delivery across Rajasthan?",
                a: "For Rajasthan pin codes, we bypass standard courier routes. Your parcel is personally hand-delivered in a secure, tamper-proof premium briefcase by armed showroom security agents, fully insured from our atelier to your doorstep."
              }
            ];

            return (
              <div className={`pb-0 transition-colors duration-500 ${isCatalogDark ? "text-[#FCFAFF]" : "text-[#4A126D]"}`}>

                {/* ==========================================================
                  SECTION 01: CINEMATIC HERO SECTION
                  ========================================================== */}
                <section
                  className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[calc(100vh-5rem)] sm:min-h-[400px] lg:min-h-[600px] overflow-hidden flex items-end pb-6 sm:pb-16 lg:pb-20 select-none bg-black"
                >
                  {/* Full Screen Cinematic Video Background */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-100"
                  >
                    <source src={heroBgVideo} type="video/mp4" />
                    <source src="https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4" type="video/mp4" />
                  </video>

                </section>

                {/* Divider Line between Hero and Categories */}
                <div className="w-full h-[1px] bg-[#DDA0DD]/25 relative z-20" />



                {/* Shadow the global isCatalogDark state to force the entire bottom section to ALWAYS be white/light ivory */}
                {(() => {
                  const isCatalogDark = false;
                  return (
                    <div className="bg-[#fdfaf8] text-[#4A126D] transition-colors duration-500 !mt-0">

                      {/* ==========================================================
                        FEATURE 02: PREMIUM JEWELLERY CATEGORIES GRID (REDESIGNED)
                        ========================================================== */}
                      <div id="shop-by-category" className="w-full pt-0 pb-16 lg:pb-20 px-6 sm:px-12 select-none" style={{ background: '#fdfaf8' }}>
                        <section className="max-w-[1836px] mx-auto">

                          {/* ── MOBILE: 2-row horizontal scroll grid ── */}
                          <div className="lg:hidden overflow-x-auto no-scrollbar pt-6 pb-4 -mx-2 px-2">
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateRows: 'repeat(2, auto)',
                                gridAutoFlow: 'column',
                                gridAutoColumns: '118px',
                                gap: '12px',
                              }}
                            >
                              {homeCategories.map((cat, idx) => {
                                const handleClick = () => {
                                  triggerAudio('click');
                                  if (cat.page) navigateTo(cat.page);
                                  else if (cat.action) cat.action();
                                  else { changeCategoryTab(cat.tab); navigateTo('collections'); }
                                };
                                return (
                                  <div
                                    key={idx}
                                    onClick={handleClick}
                                    className="bg-white border border-[rgba(0,0,0,0.05)] rounded-[20px] shadow-[0_4px_14px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between cursor-pointer active:scale-95 transition-transform duration-150"
                                    style={{ padding: '14px 10px 12px', height: '148px' }}
                                  >
                                    <div className="w-full flex-1 flex items-center justify-center">
                                      <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="w-[68%] h-[68%] object-contain filter drop-shadow-[0_4px_8px_rgba(90,74,74,0.12)]"
                                      />
                                    </div>
                                    <span
                                      className="text-center text-[10.5px] font-semibold leading-tight mt-2 w-full"
                                      style={{ color: '#3d2619', fontFamily: 'inherit', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                    >
                                      {cat.name}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* ── DESKTOP: Original staggered grid ── */}
                          <motion.div
                            variants={{
                              hidden: {},
                              show: {
                                transition: {
                                  staggerChildren: 0.05
                                }
                              }
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="hidden lg:grid grid-cols-8 gap-x-[28px] gap-y-[34px] justify-center mx-auto pt-6"
                          >
                            {homeCategories.map((cat, idx) => {
                              const handleClick = () => {
                                triggerAudio('click');
                                if (cat.page) navigateTo(cat.page);
                                else if (cat.action) cat.action();
                                else { changeCategoryTab(cat.tab); navigateTo('collections'); }
                              };

                              return (
                                <motion.div
                                  key={idx}
                                  variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: {
                                      opacity: 1,
                                      y: 0,
                                      transition: {
                                        duration: 0.6,
                                        ease: [0.215, 0.61, 0.355, 1]
                                      }
                                    }
                                  }}
                                  onClick={handleClick}
                                  className="w-full max-w-[205px] h-[285px] bg-white border border-[rgba(0,0,0,0.04)] rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between relative overflow-hidden hover:-translate-y-[3px] transition-all duration-[250ms] ease group cursor-pointer"
                                  style={{
                                    paddingTop: '30px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    paddingBottom: '25px',
                                    boxSizing: 'border-box'
                                  }}
                                >
                                  <div className="w-full h-[145px] flex items-center justify-center relative bg-transparent">
                                    <img
                                      src={cat.img}
                                      alt={cat.name}
                                      className="w-[72%] h-[72%] object-contain object-center transition-transform duration-[250ms] ease-out group-hover:scale-[1.03] filter drop-shadow-[0_8px_12px_rgba(90,74,74,0.12)]"
                                    />
                                  </div>
                                  <span
                                    className="text-center font-sans tracking-tight line-clamp-2 mt-auto text-[13px]"
                                    style={{
                                      fontFamily: 'inherit',
                                      fontWeight: '600',
                                      lineHeight: '1.35',
                                      color: '#3d2619',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden'
                                    }}
                                  >
                                    {cat.name}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </section>
                      </div>

                      {/* ==========================================================
                        FEATURE 02.25: GOLD MINE 11+1 MONTHLY PLAN ANNOUNCEMENT STRIP
                        ========================================================== */}
                      <div
                        className="w-full bg-[#FAF0ED] border-y border-[#F3C1BB]/40 py-4 px-6 sm:px-12 select-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(235, 174, 169, 0.05) 0%, transparent 70%)'
                        }}
                      >
                        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex flex-col text-center sm:text-left">
                            <h3 className="text-sm sm:text-base font-extrabold text-[#0A2240] font-sans tracking-wide">
                              Gold Mine <span className="text-[#FF3B30]">11 + 1</span> Monthly Plan
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5D6B79] font-sans mt-0.5 font-medium">
                              (Pay 11 installments and get 100% off on the last installment!)
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              triggerAudio('click');
                              navigateTo('savings');
                            }}
                            className="bg-[#EBAEA9] hover:bg-[#E29A94] text-[#0A2240] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#EBAEA9] focus:ring-offset-2 cursor-pointer shadow-sm"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </div>

                      {/* ==========================================================
                        FEATURE 02.5: PROMOTIONAL OFFERS SLIDER CAROUSEL
                        ========================================================== */}
                      <section
                        className="w-full bg-[#F8F5F0] py-20 flex flex-col items-center justify-center overflow-hidden"
                        aria-label="Promotional Offers Carousel Section"
                      >
                        <div
                          className="w-full aspect-[2400/778] overflow-hidden bg-white relative group select-none outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
                          tabIndex={0}
                          onKeyDown={handlePromoKeyDown}
                          onTouchStart={handlePromoTouchStart}
                          onTouchMove={handlePromoTouchMove}
                          onTouchEnd={handlePromoTouchEnd}
                          onMouseEnter={() => setPromoIsPaused(true)}
                          onMouseLeave={() => setPromoIsPaused(false)}
                          aria-label="Promotional Offers Carousel"
                        >
                          <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <AnimatePresence initial={false}>
                              <motion.div
                                key={currentPromoSlide}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1.03 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  opacity: { duration: 0.8, ease: "easeInOut" },
                                  scale: { duration: 5.8, ease: "linear" }
                                }}
                                className="absolute inset-0 w-full h-full"
                              >
                                <img
                                  src={promoBanners[currentPromoSlide].img}
                                  alt={promoBanners[currentPromoSlide].alt}
                                  loading="lazy"
                                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                                />

                                {/* Subtle Bottom-Left CTA Overlay */}
                                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-12 lg:left-12 z-30">
                                  <button
                                    onClick={() => {
                                      triggerAudio('click');
                                      const banner = promoBanners[currentPromoSlide];
                                      if (banner.tab) {
                                        changeCategoryTab(banner.tab);
                                      }
                                      navigateTo(banner.link);
                                    }}
                                    className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3.5 bg-[#C9A14A] hover:bg-[#b08836] text-white font-sans text-[10px] sm:text-xs lg:text-sm font-extrabold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 focus:outline-none"
                                    aria-label={`View details for ${promoBanners[currentPromoSlide].alt}`}
                                  >
                                    View Offer
                                  </button>
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Premium Navigation Controls Bar Below Banner */}
                        <div className="w-full max-w-[600px] mx-auto flex items-center justify-between mt-6 px-6 select-none">
                          {/* Prev Button */}
                          <button
                            onClick={() => {
                              triggerAudio('click');
                              setCurrentPromoSlide((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
                            }}
                            className="w-10 h-10 rounded-full border border-[#C9A14A]/30 hover:border-[#C9A14A] hover:bg-white text-[#C9A14A] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] active:scale-95 cursor-pointer"
                            aria-label="Previous Slide"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </button>

                          {/* Dot Indicators */}
                          <div className="flex space-x-3 items-center">
                            {promoBanners.map((_, idx) => (
                              <button
                                key={`promo-dot-${idx}`}
                                onClick={() => {
                                  triggerAudio('click');
                                  setCurrentPromoSlide(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${currentPromoSlide === idx ? "w-8 bg-[#C9A14A]" : "w-2 bg-[#C9A14A]/30 hover:bg-[#C9A14A]/60"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                                aria-current={currentPromoSlide === idx ? "true" : "false"}
                              />
                            ))}
                          </div>

                          <button
                            onClick={() => {
                              triggerAudio('click');
                              setCurrentPromoSlide((prev) => (prev + 1) % promoBanners.length);
                            }}
                            className="w-10 h-10 rounded-full border border-[#C9A14A]/30 hover:border-[#C9A14A] hover:bg-white text-[#C9A14A] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] active:scale-95 cursor-pointer"
                            aria-label="Next Slide"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </div>
                      </section>


                      {/* ==========================================================
                  FEATURE 02.6: CAMPAIGN COLLECTIONS
                  ========================================================== */}
                      <section className={`py-16 transition-colors duration-500 ${isCatalogDark ? "bg-[#121212]" : "bg-[#FDFBF7]"}`}>
                        <div className="max-w-7xl mx-auto px-6 space-y-12">
                          <h2 className={`text-center text-2xl sm:text-3xl lg:text-4xl serif-luxury tracking-wider ${isCatalogDark ? "text-[#FCFAFF]" : "text-[#0A2240]"}`}>
                            Browse Latest Jewellery Collections
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            {/* Dainty Dreams Card */}
                            <div
                              onClick={() => {
                                triggerAudio('click');
                                changeCategoryTab('Collections');
                                navigateTo('collections');
                              }}
                              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer aspect-[4/3]"
                            >
                              <img
                                src={campaignDaintyDreams}
                                alt="Dainty Dreams Collection"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />
                            </div>

                            {/* Raw Reverie Card */}
                            <div
                              onClick={() => {
                                triggerAudio('click');
                                changeCategoryTab('Collections');
                                navigateTo('collections');
                              }}
                              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer aspect-[4/3] transform md:-translate-y-6"
                            >
                              <img
                                src={campaignRawReverie}
                                alt="Raw Reverie Collection"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />
                            </div>

                            {/* Clay Whispers Card */}
                            <div
                              onClick={() => {
                                triggerAudio('click');
                                changeCategoryTab('Collections');
                                navigateTo('collections');
                              }}
                              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer aspect-[4/3]"
                            >
                              <img
                                src={campaignClayWhispers}
                                alt="Clay Whispers Collection"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                              />

                              {/* Premium Gold Text Overlay for Clay Whispers to match Raw Reverie style */}
                              <div className="absolute inset-0 flex flex-col justify-center items-end p-8 bg-gradient-to-l from-black/40 via-transparent to-transparent select-none pointer-events-none">
                                <div className="text-right space-y-1">
                                  <span className="block text-[28px] sm:text-[32px] lg:text-[40px] serif-luxury text-[#E6C687] leading-none tracking-[0.2em] font-serif font-light drop-shadow-lg">
                                    CLAY
                                  </span>
                                  <span className="block text-[24px] sm:text-[28px] lg:text-[34px] serif-luxury text-[#E6C687] leading-none tracking-[0.15em] font-serif font-light drop-shadow-lg">
                                    WHISPERS
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <button
                              onClick={() => {
                                triggerAudio('click');
                                changeCategoryTab('Collections');
                                navigateTo('collections');
                              }}
                              className="px-8 py-3.5 bg-[#FAF0ED] hover:bg-[#F3C1BB]/40 text-[#0A2240] font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:scale-105 border border-[#F3C1BB]/60 hover:border-[#F3C1BB] shadow-md active:scale-95 focus:outline-none"
                            >
                              Browse all Collections
                            </button>
                          </div>
                        </div>
                      </section>

                      {/* ==========================================================
                  FEATURE 02.7: BRAND CAMPAIGN - STROKES OF GENIUS
                  ========================================================== */}
                      <section className={`py-20 transition-colors duration-500 overflow-hidden ${isCatalogDark ? "bg-[#121212]" : "bg-[#FDFBF7]"}`}>
                        <div className="max-w-[1836px] mx-auto px-6 sm:px-12 lg:px-16">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                            {/* Video Column (Col-Span 7) - Slide from Left to Right */}
                            <motion.div
                              initial={{ opacity: 0, x: -120 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                              className="lg:col-span-7"
                            >
                              <div className="border-2 border-[#8A1C14] rounded-[4px] overflow-hidden shadow-2xl bg-black aspect-video relative group transition-transform duration-500 hover:scale-[1.01]">
                                <video
                                  controls
                                  muted
                                  loop
                                  playsInline
                                  preload="auto"
                                  className="w-full h-full object-cover select-none"
                                >
                                  <source src={strokesOfGeniusVideo} type="video/mp4" />
                                  <source src="https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4" type="video/mp4" />
                                </video>
                              </div>
                            </motion.div>

                            {/* Branding Text Column (Col-Span 5) - Slide from Right to Left */}
                            <motion.div
                              initial={{ opacity: 0, x: 120 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                              className="lg:col-span-5 relative flex flex-col lg:flex-row items-center lg:items-stretch h-full py-6 lg:py-0"
                            >
                              {/* Horizontal red line (Desktop: touches video right edge; Mobile: simple divider) */}
                              <div className="absolute -left-12 right-0 h-[1.5px] bg-[#8A1C14] top-1/2 -translate-y-1/2 z-0 hidden lg:block" />

                              {/* Serif tag brand text (Desktop: sits directly on top of the line; Mobile: centered text) */}
                              <div className="lg:absolute lg:left-0 lg:bottom-1/2 lg:pl-12 lg:pb-1.5 z-10 text-center lg:text-left w-full lg:w-auto">
                                <h3 className="serif-luxury text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-wide text-[#8A1C14] hover:scale-[1.02] transition-transform duration-300">
                                  #StrokesofGenius
                                </h3>
                              </div>

                              {/* Mobile Line (renders below text on mobile) */}
                              <div className="w-24 h-[1.5px] bg-[#8A1C14] mt-4 lg:hidden" />
                            </motion.div>

                          </div>
                        </div>
                      </section>

                      {/* ==========================================================
                  FEATURE 02.8: GIFTING GUIDE & CURATIONS
                  ========================================================== */}
                      <section className={`py-20 transition-colors duration-500 overflow-hidden ${isCatalogDark ? "bg-[#1C1C1C]" : "bg-white"}`}>
                        <div className="max-w-[1836px] mx-auto px-6 sm:px-12 lg:px-16">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                            {/* Left Part: 3 Product Category Cards (Col-Span 7) - Animates Up */}
                            <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:space-y-0"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

                                {/* Card 1: Layered Necklaces */}
                                <div className="bg-[#FFF0F2] rounded-3xl p-5 flex flex-col justify-between shadow-sm border border-pink-100/30 hover:-translate-y-1.5 transition-all duration-300 group">
                                  <div className="bg-white rounded-2xl aspect-square flex items-center justify-center p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
                                    <img
                                      src={giftingLayeredNecklaces}
                                      alt="Layered Necklaces"
                                      className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="mt-5 text-left">
                                    <h4 className="serif-luxury text-lg font-bold text-[#4A126D] border-b border-[#4A126D]/10 pb-1 inline-block">
                                      Layered Necklaces
                                    </h4>
                                    <p className="text-[11.5px] text-gray-600/90 font-sans mt-2 leading-relaxed">
                                      Elevate your style with chic layered necklaces for a trendy look.
                                    </p>
                                  </div>
                                </div>

                                {/* Card 2: Coveted Styles */}
                                <div className="bg-[#FFF0F2] rounded-3xl p-5 flex flex-col justify-between shadow-sm border border-pink-100/30 hover:-translate-y-1.5 transition-all duration-300 group">
                                  <div className="bg-white rounded-2xl aspect-square flex items-center justify-center p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
                                    <img
                                      src={giftingCovetedStyles}
                                      alt="Coveted Styles"
                                      className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="mt-5 text-left">
                                    <h4 className="serif-luxury text-lg font-bold text-[#4A126D] border-b border-[#4A126D]/10 pb-1 inline-block">
                                      Coveted Styles
                                    </h4>
                                    <p className="text-[11.5px] text-gray-600/90 font-sans mt-2 leading-relaxed">
                                      A curated selection of HR's most coveted jewels.
                                    </p>
                                  </div>
                                </div>

                                {/* Card 3: HR Man */}
                                <div className="bg-[#FFF0F2] rounded-3xl p-5 flex flex-col justify-between shadow-sm border border-pink-100/30 hover:-translate-y-1.5 transition-all duration-300 group">
                                  <div className="bg-white rounded-2xl aspect-square flex items-center justify-center p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
                                    <img
                                      src={giftingHrMan}
                                      alt="HR Man"
                                      className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                  </div>
                                  <div className="mt-5 text-left">
                                    <h4 className="serif-luxury text-lg font-bold text-[#4A126D] border-b border-[#4A126D]/10 pb-1 inline-block">
                                      HR Man
                                    </h4>
                                    <p className="text-[11.5px] text-gray-600/90 font-sans mt-2 leading-relaxed">
                                      Shop the perfect pieces to enhance your man's unique style.
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </motion.div>

                            {/* Right Part: Large Gifting Mauve Banner (Col-Span 5) - Slide from Right to Left */}
                            <motion.div
                              initial={{ opacity: 0, x: 100 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="lg:col-span-5 relative"
                            >
                              {/* Floating Hearts Around the Card */}
                              <div className="absolute inset-0 pointer-events-none select-none z-20">
                                {/* Heart 1 */}
                                <div className="absolute -top-3 -left-3 text-pink-300 text-lg animate-pulse">💖</div>
                                {/* Heart 2 */}
                                <div className="absolute top-1/4 -left-4 text-pink-200 text-sm opacity-85">💖</div>
                                {/* Heart 3 */}
                                <div className="absolute bottom-6 -left-3 text-pink-300 text-base">💖</div>
                                {/* Heart 4 */}
                                <div className="absolute -bottom-3 left-1/4 text-pink-200 text-lg">💖</div>
                                {/* Heart 5 */}
                                <div className="absolute -top-4 -right-2 text-pink-300 text-base animate-pulse">💖</div>
                                {/* Heart 6 */}
                                <div className="absolute top-1/3 -right-4 text-pink-200 text-sm">💖</div>
                                {/* Heart 7 */}
                                <div className="absolute bottom-12 -right-3 text-pink-300 text-base opacity-75">💖</div>
                                {/* Heart 8 */}
                                <div className="absolute -bottom-3 right-1/6 text-pink-200 text-lg">💖</div>
                              </div>

                              {/* Main Gifting Box Card */}
                              <div className="w-full h-full bg-[#9D7895] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl overflow-hidden border border-white/10">
                                {/* Dotted/Stitched Inner Border */}
                                <div className="absolute inset-2 border-[1.5px] border-dashed border-white/50 rounded-2xl pointer-events-none z-10" />

                                {/* Title text */}
                                <div className="text-center pt-4 pb-6 z-20">
                                  <span className="serif-luxury text-white text-lg sm:text-xl md:text-2xl font-light tracking-wide block">
                                    Choose the perfect
                                  </span>

                                  {/* Editorial styled large "Gift" text with heart above 'i' */}
                                  <h3 className="serif-luxury text-white text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider mt-1 mb-2 relative inline-block">
                                    G
                                    <span className="relative inline-block">
                                      ı
                                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm sm:text-base text-pink-300">♥</span>
                                    </span>
                                    ft
                                  </h3>

                                  <span className="serif-luxury text-white text-lg sm:text-xl font-light tracking-wide block">
                                    for your loved ones
                                  </span>
                                </div>

                                {/* Price Guided Gift Boxes */}
                                <div className="grid grid-cols-3 gap-3 sm:gap-4 pb-4 z-20 relative">

                                  {/* Box 1: Under 10k */}
                                  <button
                                    onClick={() => {
                                      triggerAudio('shimmer');
                                      setMaxPriceFilter(10000);
                                      navigateTo('collections');
                                    }}
                                    className="bg-white rounded-b-xl rounded-t-sm pt-6 pb-4 flex flex-col items-center justify-center relative shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#9D7895]/10 animate-fade-in"
                                  >
                                    {/* Bow loop top */}
                                    <svg className="w-8 h-8 absolute -top-4 text-white fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                                      <path d="M12,12 C9,7 6,7 6,10 C6,13 9,13 12,12 Z" />
                                      <path d="M12,12 C15,7 18,7 18,10 C18,13 15,13 12,12 Z" />
                                    </svg>
                                    {/* Lid */}
                                    <div className="absolute top-2 w-[106%] h-2.5 bg-white rounded-sm border-b border-[#9D7895]/15 shadow-sm" />

                                    <span className="text-[9px] uppercase tracking-wider text-[#9D7895]/80 font-bold font-sans">Under</span>
                                    <span className="serif-luxury text-lg sm:text-2xl font-black text-[#9D7895] leading-none mt-1">10k</span>
                                  </button>

                                  {/* Box 2: Under 30k */}
                                  <button
                                    onClick={() => {
                                      triggerAudio('shimmer');
                                      setMaxPriceFilter(30000);
                                      navigateTo('collections');
                                    }}
                                    className="bg-white rounded-b-xl rounded-t-sm pt-6 pb-4 flex flex-col items-center justify-center relative shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#9D7895]/10 animate-fade-in"
                                  >
                                    {/* Bow loop top */}
                                    <svg className="w-8 h-8 absolute -top-4 text-white fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                                      <path d="M12,12 C9,7 6,7 6,10 C6,13 9,13 12,12 Z" />
                                      <path d="M12,12 C15,7 18,7 18,10 C18,13 15,13 12,12 Z" />
                                    </svg>
                                    {/* Lid */}
                                    <div className="absolute top-2 w-[106%] h-2.5 bg-white rounded-sm border-b border-[#9D7895]/15 shadow-sm" />

                                    <span className="text-[9px] uppercase tracking-wider text-[#9D7895]/80 font-bold font-sans">Under</span>
                                    <span className="serif-luxury text-lg sm:text-2xl font-black text-[#9D7895] leading-none mt-1">30k</span>
                                  </button>

                                  {/* Box 3: Under 50k */}
                                  <button
                                    onClick={() => {
                                      triggerAudio('shimmer');
                                      setMaxPriceFilter(50000);
                                      navigateTo('collections');
                                    }}
                                    className="bg-white rounded-b-xl rounded-t-sm pt-6 pb-4 flex flex-col items-center justify-center relative shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#9D7895]/10 animate-fade-in"
                                  >
                                    {/* Bow loop top */}
                                    <svg className="w-8 h-8 absolute -top-4 text-white fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                                      <path d="M12,12 C9,7 6,7 6,10 C6,13 9,13 12,12 Z" />
                                      <path d="M12,12 C15,7 18,7 18,10 C18,13 15,13 12,12 Z" />
                                    </svg>
                                    {/* Lid */}
                                    <div className="absolute top-2 w-[106%] h-2.5 bg-white rounded-sm border-b border-[#9D7895]/15 shadow-sm" />

                                    <span className="text-[9px] uppercase tracking-wider text-[#9D7895]/80 font-bold font-sans">Under</span>
                                    <span className="serif-luxury text-lg sm:text-2xl font-black text-[#9D7895] leading-none mt-1">50k</span>
                                  </button>

                                </div>

                              </div>
                            </motion.div>

                          </div>
                        </div>
                      </section>



                      {/* ==========================================================
                  SECTION: RECOMMENDED FOR YOU (NEW SECTION)
                  ========================================================== */}
                      <section className={`py-12 border-b border-[#DDA0DD]/10 relative overflow-hidden transition-colors duration-500 ${isCatalogDark ? "bg-[#1C1C1C]" : "bg-white"}`}>
                        <div className="w-full px-4 md:px-12 space-y-10 relative group/sect">

                          <div className="text-center space-y-3">
                            <span className="text-[10px] uppercase tracking-[0.35em] text-[#DDA0DD] font-bold font-sans">TAILORED SELECTION</span>
                            <h2 className={`serif-luxury text-3xl sm:text-5xl font-semibold transition-colors duration-500 ${isCatalogDark ? "text-white" : "text-[#1B1B1B]"}`}>Recommended for You</h2>
                            <div className="w-16 h-[1.5px] bg-[#DDA0DD] mx-auto mt-3"></div>
                          </div>

                          <div
                            className="relative flex items-center px-0 md:px-16"
                            onMouseEnter={() => {
                              if (categoriesAutoplayRef.current) clearInterval(categoriesAutoplayRef.current);
                            }}
                            onMouseLeave={() => {
                              startCategoriesAutoplay();
                            }}
                          >
                            {/* Left Scroll Button */}
                            <button
                              onClick={() => scrollCategories('left')}
                              className={`absolute left-2 md:left-4 z-10 p-2.5 rounded-full border shadow-lg transition-all duration-300 -translate-x-4 opacity-0 group-hover/sect:opacity-100 group-hover/sect:translate-x-0 cursor-pointer hidden md:flex items-center justify-center ${isCatalogDark
                                ? 'bg-[#252525]/90 backdrop-blur-sm border-[#DDA0DD]/20 text-[#DDA0DD] hover:bg-[#333]'
                                : 'bg-white/95 backdrop-blur-sm border-[#DDA0DD]/25 text-[#DDA0DD] hover:bg-gray-50'
                                }`}
                              aria-label="Scroll left"
                            >
                              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>

                            {/* Scroll Container */}
                            <div
                              ref={categoriesScrollRef}
                              className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-6 px-4 select-none w-full flex-nowrap justify-start"
                            >
                              {recommendedCategories.map((cat, idx) => {
                                const handleClick = () => {
                                  triggerAudio('click');
                                  changeCategoryTab(cat.tab);
                                  navigateTo('collections');
                                };

                                return (
                                  <div
                                    key={idx}
                                    onClick={handleClick}
                                    className="flex flex-col items-center gap-3 cursor-pointer shrink-0 snap-center group"
                                  >
                                    {/* Circular Image Container */}
                                    <div
                                      className={`w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden border flex items-center justify-center transition-transform duration-300 ease group-hover:scale-105 ${isCatalogDark
                                        ? 'border-[#DDA0DD]/20 bg-[#252525] shadow-[0_4px_15px_rgba(0,0,0,0.4)]'
                                        : 'border-[#DDA0DD]/25 bg-white shadow-[0_4px_12px_rgba(221,160,221,0.08)]'
                                        }`}
                                    >
                                      <img
                                        src={cat.img}
                                        alt={cat.name}
                                        loading="lazy"
                                        className="w-[72%] h-[72%] object-contain transition-transform duration-300 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
                                      />
                                    </div>

                                    {/* Category Name below */}
                                    <span
                                      className={`font-sans text-[11px] sm:text-xs tracking-wider uppercase font-semibold transition-colors duration-300 ${isCatalogDark ? 'text-gray-300 group-hover:text-[#DDA0DD]' : 'text-[#3d2619] group-hover:text-[#DDA0DD]'
                                        }`}
                                    >
                                      {cat.name}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Right Scroll Button */}
                            <button
                              onClick={() => scrollCategories('right')}
                              className={`absolute right-2 md:right-4 z-10 p-2.5 rounded-full border shadow-lg transition-all duration-300 translate-x-4 opacity-0 group-hover/sect:opacity-100 group-hover/sect:-translate-x-0 cursor-pointer hidden md:flex items-center justify-center ${isCatalogDark
                                ? 'bg-[#252525]/90 backdrop-blur-sm border-[#DDA0DD]/20 text-[#DDA0DD] hover:bg-[#333]'
                                : 'bg-white/95 backdrop-blur-sm border-[#DDA0DD]/25 text-[#DDA0DD] hover:bg-gray-50'
                                }`}
                              aria-label="Scroll right"
                            >
                              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>

                        </div>
                      </section>

                      <section className="w-full bg-transparent pb-8 overflow-hidden select-none">
                        <div
                          onClick={() => {
                            triggerAudio('click');
                            navigateTo('savings');
                          }}
                          className="w-full overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border-y border-[#DDA0DD]/10"
                        >
                          <img
                            src={offerSavingsBanner}
                            alt="Gold Mine 11+1 Monthly Installment Plan"
                            loading="lazy"
                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
                          />
                          {/* Hover Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        </div>
                      </section>

                      {/* ==========================================================
                  FEATURE: BLUESTONE STORE CALLOUT TEXT
                  ========================================================== */}
                      <div className="text-center pt-10 pb-6 px-4 select-none">
                        <h3 className={`serif-luxury text-2xl sm:text-3xl font-medium tracking-wide leading-snug transition-colors duration-500 ${isCatalogDark ? "text-white/90" : "text-[#0A2240]"}`}>
                          Drop into a HR Jewellers & Sons<br />
                          store near you
                        </h3>
                      </div>

                      {/* ==========================================================
                  FEATURE: SHOWROOM LOCATOR BANNER
                  ========================================================== */}
                      <section className="w-full bg-transparent pb-8 overflow-hidden select-none">
                        <div
                          onClick={() => {
                            triggerAudio('click');
                            navigateTo('offers');
                          }}
                          className="w-full overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border-y border-[#DDA0DD]/10"
                        >
                          <img
                            src={atelierManifestoBanner}
                            alt="A trusted HR Jeweller & Sons store is closer than you think! Visit Our Main Branch FIND THIS STORE"
                            loading="lazy"
                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.015]"
                          />
                          {/* Hover Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        </div>
                      </section>


                      {/* ==========================================================
                  FEATURE: POLAROID CUSTOMER TESTIMONIALS
                  ========================================================== */}
                      {/* ==========================================================
                  FEATURE: POLAROID CUSTOMER TESTIMONIALS
                  ========================================================== */}
                      <section
                        ref={testimonialsRef}
                        data-inview={testimonialsInView ? "true" : "false"}
                        className={`w-full py-16 overflow-hidden select-none border-y transition-colors duration-500 group ${isCatalogDark ? "bg-[#121212] border-white/5" : "bg-[#FAF8F6] border-[#ffe5e8]/30"}`}
                      >
                        <div className="max-w-7xl mx-auto px-4 text-center space-y-3 mb-12">
                          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#B48A9B] font-bold font-sans block">
                            OUR CUSTOMERS' STORIES
                          </span>
                          <h2 className={`serif-luxury text-3xl sm:text-[48px] font-medium leading-none tracking-wide transition-colors duration-500 ${isCatalogDark ? "text-white" : "text-[#0e2d59]"}`}>
                            More Than Just Jewellery
                          </h2>
                          <p className={`font-sans text-xs sm:text-[16px] tracking-wide font-normal max-w-2xl mx-auto leading-relaxed ${isCatalogDark ? "text-white/60" : "text-[#8A8A8A]"}`}>
                            Every piece tells a story. Every memory shines forever.
                          </p>
                        </div>

                        {/* Polaroid String Reel Container */}
                        <div
                          ref={polaroidScrollRef}
                          onScroll={handlePolaroidScroll}
                          className="w-full overflow-x-auto no-scrollbar py-6 snap-x"
                        >
                          <div className="relative w-full min-w-[1400px] xl:min-w-0 xl:w-full h-[480px]">
                            {/* Continuous hanging string SVG passing exactly through card attachment points at y=50px, placed behind cards (z-0) */}
                            <svg className="absolute left-0 top-0 w-full h-[120px] pointer-events-none z-0" viewBox="0 0 100 120" fill="none" preserveAspectRatio="none">
                              <path
                                d="M 0,30 Q 5,50 10,50 Q 23.3,85 36.6,50 Q 50,85 63.3,50 Q 76.7,85 90,50 Q 95,50 100,30"
                                stroke={isCatalogDark ? "#4b5563" : "#D1D5DB"}
                                strokeWidth="1.2"
                              />
                            </svg>

                            {/* 4 Polaroid Cards at absolute positions, with z-10 index to stay in front of the rope */}
                            {[
                              {
                                name: "Aarohi Sharma, 27",
                                quote: "My dream engagement ring became a reality with HR Jewellers & Sons. The craftsmanship and sparkle are beyond expectations.",
                                img: testimonial1,
                                rot: "rotate-[-10deg]",
                                left: "10%"
                              },
                              {
                                name: "Priya Mehta, 31",
                                quote: "The quality, finishing, and personalized service made my purchase truly memorable. A perfect luxury experience.",
                                img: testimonial2,
                                rot: "rotate-[-4deg]",
                                left: "36.6%"
                              },
                              {
                                name: "Neha Kapoor, 29",
                                quote: "I wear my bracelet every day and it still looks stunning. Timeless craftsmanship and exceptional quality.",
                                img: testimonial3,
                                rot: "rotate-[4deg]",
                                left: "63.3%"
                              },
                              {
                                name: "Riya Verma, 26",
                                quote: "My husband gifted me this beautiful necklace and I receive compliments everywhere. Absolutely love it.",
                                img: testimonial4,
                                rot: "rotate-[10deg]",
                                left: "90%"
                              }
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                style={{
                                  left: item.left,
                                  top: "50px",
                                  transform: "translateX(-50%)"
                                }}
                                className="absolute shrink-0 z-10 hover:z-30"
                              >
                                {/* Wrapper for viewport entry transition */}
                                <div
                                  className="transform-gpu transition-all duration-700 ease-out opacity-100 translate-y-0"
                                >
                                  {/* Card body is offset downward by mt-[20px] creating a 20px gap. It rotates around the clip loop at (50% -20px) */}
                                  <div
                                    style={{ transformOrigin: "50% -20px" }}
                                    className={`w-[285px] shadow-[0_15px_35px_rgba(0,0,0,0.06),0_5px_15px_rgba(0,0,0,0.02)] rounded-xs pt-5 px-5 pb-8 relative flex flex-col items-center select-none snap-center transition-all duration-300 hover:scale-[1.04] hover:rotate-0 hover:z-40 cursor-pointer border mt-[20px] overflow-visible ${isCatalogDark
                                      ? "bg-[#25181b] border-[#4a2e33] bg-[radial-gradient(#3a2629_0.5px,transparent_0.5px)] [background-size:16px_16px]"
                                      : "bg-[#FFF0F2] border-[#FAD2D8] bg-[radial-gradient(#fcd2d7_0.5px,transparent_0.5px)] [background-size:16px_16px]"
                                      } ${item.rot}`}
                                  >
                                    {/* Metal Hanging Binder Clip centered. Wire loops extend 30px above the card to hook onto the hanging wire, spanning the 20px gap */}
                                    <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-8 h-12 flex items-center justify-center z-20 pointer-events-none">
                                      <svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FFFFFF" />
                                            <stop offset="40%" stopColor="#D8D9DA" />
                                            <stop offset="70%" stopColor="#9EA0A2" />
                                            <stop offset="100%" stopColor="#5C5E60" />
                                          </linearGradient>
                                          <linearGradient id="loopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#F0F1F2" />
                                            <stop offset="50%" stopColor="#9EA0A2" />
                                            <stop offset="100%" stopColor="#404142" />
                                          </linearGradient>
                                        </defs>
                                        {/* Metal wire loop/handles */}
                                        <path
                                          d="M14 2 C8 2, 7 20, 7 20 M14 2 C20 2, 21 20, 21 20"
                                          stroke="url(#loopGrad)"
                                          strokeWidth="1.6"
                                          strokeLinecap="round"
                                          fill="none"
                                          className="drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.2)]"
                                        />
                                        <path
                                          d="M14 2 C8 2, 7 20, 7 20 M14 2 C20 2, 21 20, 21 20"
                                          stroke={isCatalogDark ? "#6B7280" : "#F3F4F6"}
                                          strokeWidth="0.8"
                                          strokeLinecap="round"
                                          fill="none"
                                        />

                                        {/* Metal clip body clamping the card top border */}
                                        <path
                                          d="M4 20 L24 20 L27 32 L1 32 Z"
                                          fill="url(#metalGrad)"
                                          stroke={isCatalogDark ? "#1F2937" : "#8E9092"}
                                          strokeWidth="0.8"
                                          strokeLinejoin="round"
                                        />
                                        {/* Inner shadow/details for clip body */}
                                        <path d="M4 20 L24 20 L25 23 L3 23 Z" fill={isCatalogDark ? "#111827" : "#C5C6C8"} />
                                        <line x1="5" y1="21" x2="23" y2="21" stroke={isCatalogDark ? "#4B5563" : "#FFFFFF"} strokeWidth="0.6" opacity="0.8" />
                                      </svg>
                                    </div>

                                    {/* Image Frame - Polaroid style */}
                                    <div className={`w-full aspect-square overflow-hidden rounded-xs mb-4 bg-white p-1 shadow-sm border ${isCatalogDark ? "border-zinc-800" : "border-gray-100"}`}>
                                      <img
                                        src={item.img}
                                        alt={item.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center pointer-events-none"
                                      />
                                    </div>

                                    {/* Caption & Content */}
                                    <div className="w-full space-y-2 text-left px-1">
                                      <h4 className={`font-sans font-bold text-xs sm:text-[13px] tracking-wide ${isCatalogDark ? "text-[#fcd2d7]" : "text-[#0E3A75]"}`}>
                                        {item.name}
                                      </h4>
                                      <p className={`font-sans text-[10px] sm:text-[11px] leading-relaxed tracking-wide font-normal ${isCatalogDark ? "text-[#e5c2c6]" : "text-[#8C6D70]"
                                        }`}>
                                        {item.quote}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dynamic Scroll progress indicator track */}
                        <div className="max-w-7xl mx-auto px-6 mt-6">
                          <div className={`w-full h-[3px] rounded-full overflow-hidden ${isCatalogDark ? "bg-zinc-800" : "bg-[#ffe5e8]"}`}>
                            <div
                              className={`h-full rounded-full transition-all duration-150 ${isCatalogDark ? "bg-[#DDA0DD]" : "bg-[#f0a3b0]"}`}
                              style={{ width: `${Math.max(10, polaroidScrollProgress)}%` }}
                            />
                          </div>

                          {/* Bottom CTA Button */}
                          <div className="flex justify-center mt-12">
                            <button
                              onClick={() => {
                                triggerAudio('click');
                                navigateTo('collections');
                              }}
                              className={`px-8 py-3 rounded-none text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer ${isCatalogDark
                                ? "border-[#DDA0DD]/30 text-[#DDA0DD] hover:bg-[#DDA0DD] hover:text-[#121212] hover:border-transparent"
                                : "border-[#0e2d59]/30 text-[#0e2d59] hover:bg-[#0e2d59] hover:text-[#FAF8F6] hover:border-transparent"
                                }`}
                            >
                              Explore Collection
                            </button>
                          </div>
                        </div>
                      </section>





                      {/* ==========================================================
                  SECTION 08: ABOUT BRAND (HERITAGE STORY TIMELINE)
                  ========================================================== */}
                      {(() => {
                        const timelineItems = [
                          { yr: 1952, title: "Bikaneri Workshop Inception", desc: "Devkishan Soni establishes the first traditional workshop in Bikaner, carving ornaments for local Rajput estates. Setting absolute purity standards in handcrafting, utilizing dense gold bars and local gems." },
                          { yr: 1974, title: "Pioneering Purity Benchmarks", desc: "The atelier institutes formal testing procedures and establishes official guild metrics in Western Rajasthan, decades before national hallmarking laws were standardized." },
                          { yr: 1998, title: "Uncut Diamond & Polki Expansion", desc: "Atelier introduces premium Syndicate Polki diamond collections, fusioning ancient Bikaneri carvings with Jaipuri royal color aesthetics, catering to high-fashion bridal demands." },
                          { yr: 2014, title: "Flagship Showroom Fitting Lounge", desc: "Opening of the grand flagship showroom at Tilak Nagar in Bikaner. Offering specialized custom-design tables, fitting chambers, and private lounges for family bridal viewings." },
                          { yr: 2026, title: "HR Jewellery accredited Atelier Partnership", desc: "Transitioning to a fully accredited BlueStone partner boutique, integrating advanced live gold API conversion matrices, digital certification catalogs, and instant WhatsApp booking." }
                        ];

                        const years = timelineItems.map(t => t.yr);
                        const activeIndex = timelineItems.findIndex(t => t.yr === activeStoryTimeline);
                        const progressPercent = activeIndex !== -1 ? (activeIndex / (timelineItems.length - 1)) * 100 : 0;
                        const activeItem = timelineItems[activeIndex] || timelineItems[0];

                        return (
                          <section id="home-story-timeline" className="max-w-7xl mx-auto px-6 py-20 select-none">
                            {/* Centered Title */}
                            <div className="text-center space-y-3 mb-16">
                              <span className="text-[10px] uppercase tracking-[0.35em] text-[#DDA0DD] font-bold font-sans block">OUR DYNAMIC TIMELINE</span>
                              <h2 className={`serif-luxury text-3xl sm:text-5xl font-medium leading-tight transition-colors duration-500 ${isCatalogDark ? "text-white" : "text-[#1B1B1B]"}`}>The Golden Legacy</h2>
                              <div className="w-16 h-[1.5px] bg-[#DDA0DD] mx-auto mt-3"></div>
                            </div>

                            {/* Horizontal Timeline Track Container */}
                            <div className="relative w-full max-w-4xl mx-auto mb-16 px-4">
                              {/* Background Line: starts/ends at the center of the outer dots (24px padding) */}
                              <div className="absolute top-[11px] left-[24px] right-[24px] h-[1.5px]">
                                {/* Gray Line track */}
                                <div className={`w-full h-full ${isCatalogDark ? "bg-white/10" : "bg-gray-200"}`} />
                                {/* Active Gold Progress Line */}
                                <div
                                  className="absolute left-0 top-0 h-full bg-[#DDA0DD] transition-all duration-700 ease-out origin-left"
                                  style={{ width: `${progressPercent}%` }}
                                />
                              </div>

                              {/* Dots & Labels: px-[12px] padding aligned with line endpoints */}
                              <div className="relative flex justify-between items-center w-full px-[12px]">
                                {timelineItems.map((item) => {
                                  const isActive = activeStoryTimeline === item.yr;
                                  return (
                                    <div
                                      key={item.yr}
                                      onClick={() => {
                                        triggerAudio('click');
                                        setTimelineDirection(item.yr >= activeStoryTimeline ? 1 : -1);
                                        setActiveStoryTimeline(item.yr);
                                        setTimelineResetTrigger(prev => prev + 1);
                                      }}
                                      className="flex flex-col items-center cursor-pointer group relative z-10"
                                    >
                                      {/* Dot Selector */}
                                      <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-[9px] ${isActive
                                        ? 'bg-[#DDA0DD] border-[#DDA0DD] text-black shadow-[0_0_12px_rgba(221,160,221,0.6)] scale-110'
                                        : (isCatalogDark ? 'bg-[#1C1C1C] border-white/20 text-gray-500 hover:border-[#DDA0DD]' : 'bg-white border-gray-300 text-gray-400 hover:border-[#DDA0DD]')
                                        }`}>
                                        ✦
                                      </div>

                                      {/* Year Text */}
                                      <span className={`text-[13px] font-bold font-sans tracking-wider mt-3 transition-colors duration-300 ${isActive ? 'text-[#DDA0DD]' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'
                                        }`}>
                                        {item.yr}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Interactive Slider Navigation Container */}
                            <div className="flex items-center justify-between max-w-4xl mx-auto mt-6 px-2 sm:px-6">
                              {/* Left Arrow Button */}
                              <button
                                onClick={() => {
                                  triggerAudio('click');
                                  setTimelineResetTrigger(prev => prev + 1);
                                  setTimelineDirection(-1);
                                  setActiveStoryTimeline((prev) => {
                                    const idx = years.indexOf(prev);
                                    const prevIdx = (idx - 1 + years.length) % years.length;
                                    return years[prevIdx];
                                  });
                                }}
                                className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${isCatalogDark
                                  ? "border-white/10 hover:border-[#DDA0DD]/50 text-white/60 hover:text-white hover:bg-white/5"
                                  : "border-gray-200 hover:border-[#DDA0DD]/50 text-gray-500 hover:text-[#4A126D] hover:bg-gray-50"
                                  }`}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>

                              {/* Active Milestone Card with Horizontal Sliding Framer Motion Animation */}
                              <div className="flex-1 max-w-2xl mx-auto text-center min-h-[140px] flex flex-col items-center justify-center px-4 overflow-hidden">
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={activeStoryTimeline}
                                    initial={{ opacity: 0, x: -30 * timelineDirection }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 * timelineDirection }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="space-y-4"
                                  >
                                    <h3 className={`serif-luxury text-xl sm:text-2xl font-medium tracking-wide transition-colors ${isCatalogDark ? 'text-[#FCFAFF]' : 'text-[#1B1B1B]'}`}>
                                      {activeItem.title}
                                    </h3>
                                    <p className={`text-xs sm:text-sm font-light leading-relaxed font-sans max-w-2xl mx-auto transition-colors duration-500 ${isCatalogDark ? 'text-gray-400' : 'text-[#1B1B1B]/75'
                                      }`}>
                                      {activeItem.desc}
                                    </p>
                                  </motion.div>
                                </AnimatePresence>
                              </div>

                              {/* Right Arrow Button (--> Direction) */}
                              <button
                                onClick={() => {
                                  triggerAudio('click');
                                  setTimelineResetTrigger(prev => prev + 1);
                                  setTimelineDirection(1);
                                  setActiveStoryTimeline((prev) => {
                                    const idx = years.indexOf(prev);
                                    const nextIdx = (idx + 1) % years.length;
                                    return years[nextIdx];
                                  });
                                }}
                                className={`p-3 rounded-full border transition-all duration-300 cursor-pointer ${isCatalogDark
                                  ? "border-white/10 hover:border-[#DDA0DD]/50 text-white/60 hover:text-white hover:bg-white/5"
                                  : "border-gray-200 hover:border-[#DDA0DD]/50 text-gray-500 hover:text-[#4A126D] hover:bg-gray-50"
                                  }`}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </section>
                        );
                      })()}


                      {/* ==========================================================
                  SECTION 14: FAQ ACCORDIONS (INTERACTIVE)
                  ========================================================== */}
                      <section id="faq" className="max-w-3xl mx-auto px-6 py-4 space-y-8">
                        <div className="text-center space-y-3">
                          <span className="text-[10px] uppercase tracking-[0.35em] text-[#DDA0DD] font-bold font-sans">Elite Assistance</span>
                          <h2 className={`serif-luxury text-3xl sm:text-5xl font-medium leading-none transition-colors duration-500 ${isCatalogDark ? 'text-white' : 'text-[#1B1B1B]'}`}>Frequently Asked Questions</h2>
                          <div className="w-16 h-[1.5px] bg-[#DDA0DD] mx-auto mt-3"></div>
                        </div>

                        <div className="space-y-4 text-left">
                          {faqData.map((faq, idx) => (
                            <div
                              key={idx}
                              className={`border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isCatalogDark ? 'bg-[#1C1C1C] border-white/5' : 'bg-[#FAF7F2] border-[#DDA0DD]/15'}`}
                            >
                              <button
                                onClick={() => {
                                  triggerAudio('click');
                                  setOpenFaqIndex(openFaqIndex === idx ? null : idx);
                                }}
                                className={`w-full px-6 py-4 flex justify-between items-center text-left text-sm font-bold focus:outline-none hover:text-[#DDA0DD] transition-colors cursor-pointer ${isCatalogDark ? 'text-white' : 'text-gray-800'}`}
                              >
                                <span className="font-sans leading-snug">{faq.q}</span>
                                <span className="text-xs text-[#DDA0DD] font-sans ml-2">{openFaqIndex === idx ? '▲' : '▼'}</span>
                              </button>

                              {openFaqIndex === idx && (
                                <div className={`px-6 pb-5 pt-1 text-xs leading-relaxed font-light font-sans animate-fade-in border-t ${isCatalogDark ? 'text-[#FCFAFF]/70 border-white/5' : 'text-gray-500 border-gray-100'}`}>
                                  {faq.a}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>


                    </div>
                  );
                })()}
              </div>
            );
          })()}
          {currentPage === 'savings' && (
            <>
              {/* MOBILE VIEW */}
              <div className="lg:hidden bg-white min-h-screen pb-24 text-[#1B1B1B]">
                {/* FULL WIDTH BANNER */}
                <div className="w-full bg-[#fdf5ee]">
                  <img
                    src={savingsHeroJewellery}
                    alt="Gold Mine 11+1 Plan"
                    className="w-full object-contain"
                  />
                </div>

                {/* QUICK ENROLL CARD (BlueStone Style) */}
                <div className="w-full bg-[#FCFAFF] py-6 px-4">
                  <div className="max-w-md mx-auto bg-white border border-gray-150 rounded-2xl shadow-[0_8px_30px_rgba(63,31,84,0.05)] p-5 space-y-4">
                    <h3 className="text-center text-[13.5px] font-bold text-[#1B3152] font-sans tracking-wide">
                      Pay 11 installments, get <span className="text-[#E54E38]">100% OFF</span> on 12th installment!
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Monthly Amount</label>
                        <input
                          type="number"
                          placeholder="2000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value || 2000)}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#E54E38] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Email ID</label>
                        <input
                          type="email"
                          placeholder="e.g. patron@mail.com"
                          value={savingsForm.email}
                          onChange={(e) => setSavingsForm({ ...savingsForm, email: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#E54E38] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                      className="w-full py-3.5 rounded-lg bg-[#E54E38] hover:bg-[#c83d28] text-white text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      Start Now
                    </button>

                    <div className="text-center space-y-1.5 pt-2">
                      <button
                        onClick={() => { triggerAudio('click'); navigateTo('savings-enroll'); }}
                        className="text-[11px] text-gray-500 hover:text-[#E54E38] cursor-pointer transition-colors block mx-auto font-medium"
                      >
                        Want to pay your {savingsSchemeType} Installment?{' '}
                        <span className="text-[#E54E38] font-bold hover:underline">Click to Pay</span>
                      </button>
                      <p className="text-[10px] text-gray-400 font-medium">
                        For any queries, call/WhatsApp us at <a href="tel:+917610843978" className="text-[#E54E38] font-bold">+91 76108 43978</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* WHY PLAN SECTION — reference style */}
                <div className="w-full bg-[#fafafa] py-10 px-4">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center space-y-2">
                      <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-semibold text-[#1a1a2e]">
                        Why {savingsSchemeType} Plan?
                      </h2>
                      <div className="w-10 h-[2px] bg-[#E54E38] mx-auto" />
                    </div>
                    <div className="flex flex-col gap-5">
                      {[
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          ),
                          title: 'Plan Ahead',
                          desc: 'Subscribe to plan for your future high value purchases',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                          ),
                          title: 'For Special Moments',
                          desc: 'Plan for gifting on special occasions like Birthdays, Weddings etc',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13l-1.4-6M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                          ),
                          title: 'Special Discounts',
                          desc: 'Pay 11 installments & get 100% discount on the 12th installment',
                        },
                      ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-[#FCFAFF] border border-gray-100 flex items-center justify-center shrink-0">
                            {icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1a1a2e] mb-1 text-left" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                            <p className="text-[11px] text-gray-500 leading-relaxed text-left font-sans">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="w-full bg-white py-10 px-4">
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 8px' }}>Simple &amp; Transparent</p>
                      <h2 className="text-xl font-semibold text-[#0B2341] tracking-wide" style={{ fontFamily: '"Playfair Display", Georgia, serif', lineHeight: '1.2' }}>How does it work?</h2>
                      <div style={{ width: '40px', height: '1.5px', background: '#E89AA9', margin: '8px auto 0' }} />
                    </div>

                    <div className="relative pl-12 space-y-8 py-2">
                      {/* Vertical dashed line */}
                      <div className="absolute left-[18px] top-4 bottom-4 w-[1px] border-l border-dashed border-[#E89AA9]/60" />

                      {[
                        {
                          step: 'Step 01',
                          title: 'Pay Monthly',
                          desc: 'Pay 11 monthly installments to accumulate gold units.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          )
                        },
                        {
                          step: 'Step 02',
                          title: 'Get Special Discount',
                          desc: 'Pay for 11 months on time and get 100% off on the 12th installment.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <path d="M6 3h12l4 6-10 12L2 9z" />
                              <path d="M11 3 L8 9 L12 21 L16 9 L13 3" />
                            </svg>
                          )
                        },
                        {
                          step: 'Step 03',
                          title: 'Happy Shopping!',
                          desc: 'Use the auto-redeemed voucher (equal to your total paid amount plus bonus) to buy at any of our stores or online.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                            </svg>
                          )
                        }
                      ].map((s, idx) => (
                        <div key={idx} className="relative flex flex-col items-start text-left">
                          {/* Anchor dot */}
                          <div className="absolute -left-12 w-9 h-9 rounded-full bg-white border border-[#E89AA9] flex items-center justify-center font-bold text-xs text-[#0B2341] shadow-xs">
                            {idx + 1}
                          </div>
                          <span className="text-[8.5px] uppercase tracking-widest text-[#E89AA9] font-bold font-sans block mb-0.5">{s.step}</span>
                          <h4 className="text-xs font-bold text-[#0B2341] font-serif mb-1">{s.title}</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{s.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-6">
                      <span className="inline-flex items-center gap-2 bg-[#FDF7F7] border border-[rgba(232,154,169,0.25)] rounded-full px-5 py-2 text-[10.5px] text-gray-500 font-sans shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <svg viewBox="0 0 14 14" fill="none" width="11" height="11" className="shrink-0">
                          <circle cx="7" cy="7" r="6" stroke="#E89AA9" strokeWidth="1" />
                          <path d="M7 4.5V7.5L9 9" stroke="#E89AA9" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Refer to the calculator below for details
                      </span>
                    </div>
                  </div>
                </div>

                {/* GOLD MINE CALCULATOR */}
                <div className="w-full py-10 px-4 bg-[#F8F8F8] border-t border-b border-gray-200">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-[#0B2341] font-serif">Gold Mine Calculator</h2>
                      <p className="text-[11px] text-gray-500 mt-1 font-sans">Slide or enter monthly installment amount</p>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-6">
                      {/* Custom Amount Input Box */}
                      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2.5 bg-white h-16">
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sans">Monthly Amount</span>
                          <div className="flex items-center text-lg font-bold text-[#0B2341] font-sans mt-0.5">
                            <span className="mr-1">₹</span>
                            <input
                              type="number"
                              value={monthlySavingsInput}
                              onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                              className="w-24 focus:outline-none bg-transparent"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                          className="bg-[#E54E38] hover:bg-[#c83d28] text-white px-5 py-2.5 rounded font-bold text-xs uppercase transition-all shadow-xs shrink-0 cursor-pointer"
                        >
                          CHECK
                        </button>
                      </div>

                      {/* Slider */}
                      <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={monthlySavingsInput}
                        onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                        className="w-full cursor-pointer accent-[#0B2341]"
                        style={{
                          background: `linear-gradient(to right, #E8BEC5 0%, #E8BEC5 ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 100%)`
                        }}
                      />

                      {/* SVG Pie Chart */}
                      <div className="w-full flex justify-center py-2">
                        <svg viewBox="0 0 260 260" width="220" height="220" className="block">
                          <path d="M130 130 L185 34.74 A110 110 0 1 1 130 20 Z" fill="#E8BEC5" />
                          <path d="M130 130 L130 20 A110 110 0 0 1 185 34.74 Z" fill="#38A52B" />

                          <text x="155" y="46" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white">100%</text>
                          <text x="153" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white">Discount*</text>
                          <text x="148" y="67" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="white">₹{monthlySavingsInput.toLocaleString('en-IN')}</text>

                          <text x="130" y="190" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#6F727A">You Pay</text>
                          <text x="130" y="210" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#0B2341">₹{(monthlySavingsInput * 11).toLocaleString('en-IN')}</text>
                        </svg>
                      </div>

                      {/* Math Breakdown */}
                      <div className="space-y-4 pt-2 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-[#E8BEC5] rounded-xs shrink-0" />
                            <div className="font-sans">
                              <span className="font-semibold text-[#0B2341] block">Your total payment</span>
                              <span className="text-[10px] text-gray-400">(Period of 11 months)</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#0B2341]">₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-[#38A52B] rounded-xs shrink-0" />
                            <div className="font-sans">
                              <span className="font-semibold text-[#0B2341] block">100% Discount on 12th installment</span>
                              <span className="text-[10px] text-gray-400">(100% of 1 month installment value)</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#0B2341]">₹ {monthlySavingsInput.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="h-[1px] bg-gray-200" />

                        <div className="flex justify-between items-center">
                          <div className="text-left font-sans">
                            <span className="text-xs font-semibold text-[#0B2341] block">Buy any jewellery worth:</span>
                            <span className="text-[9.5px] text-gray-400">(after 12th month)</span>
                          </div>
                          <span className="text-xl font-black text-[#E54E38] font-sans">₹ {(monthlySavingsInput * 12).toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2 font-sans">
                            <span className="font-semibold text-[#0B2341]">You effectively pay</span>
                            <span className="bg-[#38A52B] text-white rounded-xs px-2 py-0.5 text-[9.5px] font-bold">8.33% discount!</span>
                          </div>
                          <span className="font-bold text-[#0B2341]">₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}</span>
                        </div>

                        <div className="h-[1px] bg-gray-200" />

                        {/* Early Redemption */}
                        <div className="space-y-3 pt-1">
                          <h4 className="text-xs font-bold text-[#0B2341] font-sans">Early Redemption</h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="border border-gray-200 rounded-lg p-3 bg-white text-left space-y-1 relative shadow-xs">
                              <span className="text-[9px] text-[#2F6FB6] font-bold block font-sans">6th Month</span>
                              <span className="text-sm font-bold text-[#F26544] block font-sans">₹ {Math.round(monthlySavingsInput * 5.25).toLocaleString('en-IN')}</span>
                              <span className="text-[8.5px] text-gray-400 font-sans block leading-normal">Buy worth after 6th mo (Pay 5m + 25% disc)</span>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-3 bg-white text-left space-y-1 relative shadow-xs">
                              <span className="text-[9px] text-[#2F6FB6] font-bold block font-sans">8th Month</span>
                              <span className="text-sm font-bold text-[#F26544] block font-sans">₹ {Math.round(monthlySavingsInput * 7.5).toLocaleString('en-IN')}</span>
                              <span className="text-[8.5px] text-gray-400 font-sans block leading-normal">Buy worth after 8th mo (Pay 7m + 50% disc)</span>
                            </div>
                          </div>
                        </div>

                        <div className="h-[1px] bg-gray-200" />
                        
                        <p className="text-[10px] text-gray-400 text-center leading-normal font-sans pt-1">
                          If jewellery is more than ₹ {(monthlySavingsInput * 12).toLocaleString('en-IN')}, you just need to pay the difference amount at the time of purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NOTICE & FAQ */}
                <div className="w-full py-10 px-4 bg-[#F9F1F2] text-center space-y-6">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26544] font-sans block">NOTE:</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">
                        The subscription amount and benefits can be used towards the purchase of either diamond/gemstone studded jewellery or plain gold jewellery.
                      </p>
                    </div>

                    <div className="w-10 h-[1px] bg-[#E6B7BE]/50 mx-auto" />

                    <div className="flex flex-col gap-2 font-sans text-xs">
                      <a
                        href="/#faq"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('home');
                          setTimeout(() => {
                            const faqEl = document.getElementById('faq');
                            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="font-semibold text-[#2F6FB6] hover:underline"
                      >
                        View all FAQ &gt;&gt;
                      </a>
                      <a
                        href="/terms-and-conditions"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('terms-and-conditions');
                        }}
                        className="font-semibold text-[#2F6FB6] hover:underline"
                      >
                        View all Terms &amp; Conditions &gt;&gt;
                      </a>
                    </div>
                  </div>
                </div>

                {/* STICKY BOTTOM ACTION BAR */}
                <div className="flex fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-200 px-4 py-3 items-center justify-between shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
                  <a
                    href="https://wa.me/917610843978"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 mr-2 text-center py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 bg-white active:bg-gray-50 transition-colors cursor-pointer"
                  >
                    CONTACT US
                  </a>
                  <button
                    onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                    className="flex-1 py-2.5 bg-[#E54E38] hover:bg-[#c83d28] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest text-center shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    START NOW
                  </button>
                </div>
              </div>

              {/* DESKTOP VIEW */}
              <div className="hidden lg:block bg-white min-h-screen">
                {/* 1. FULL WIDTH BANNER */}
                <div className="w-full bg-[#fdf5ee]">
                  <img
                    src={savingsHeroJewellery}
                    alt="Gold Mine 11+1 Monthly Installment Plan"
                    className="w-full object-contain"
                  />
                </div>

                {/* 2. QUICK ENROLL STRIP */}
                <div className="w-full border-b border-gray-100 bg-white">
                  <div className="max-w-5xl mx-auto px-6 py-5">
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-grow">
                        <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Monthly Amount</label>
                        <input
                          type="number"
                          placeholder="2000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value || 2000)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#E54E38] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                      <div className="flex-grow">
                        <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Email address</label>
                        <input
                          type="email"
                          placeholder="Enter Email address"
                          value={savingsForm.email}
                          onChange={(e) => setSavingsForm({ ...savingsForm, email: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#E54E38] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                      <button
                        onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                        className="px-10 py-3 rounded-lg bg-[#E54E38] hover:bg-[#c83d28] text-white text-xs uppercase font-black tracking-widest transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg"
                      >
                        Start Now
                      </button>
                    </div>
                    <div className="text-right mt-2">
                      <button
                        onClick={() => { triggerAudio('click'); navigateTo('savings-enroll'); }}
                        className="text-[11px] text-gray-500 hover:text-[#E54E38] cursor-pointer transition-colors"
                      >
                        Want to pay your {savingsSchemeType} Installment?{' '}
                        <span className="text-[#E54E38] font-semibold hover:underline">Click to Pay</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. WHY PLAN SECTION */}
                <div className="w-full bg-[#fafafa] py-12">
                  <div className="max-w-5xl mx-auto px-6 space-y-8">
                    <div className="text-center space-y-2">
                      <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-semibold text-[#1a1a2e]">
                        Why {savingsSchemeType} Plan?
                      </h2>
                      <div className="w-10 h-[2px] bg-[#E54E38] mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {[
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          ),
                          title: 'Plan Ahead',
                          desc: 'Subscribe to plan for your future high value purchases',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                            </svg>
                          ),
                          title: 'For Special Moments',
                          desc: 'Plan for gifting on special occasions like Birthdays, Weddings etc',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E54E38" strokeWidth="1.5" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13l-1.4-6M17 17a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                          ),
                          title: 'Special Discounts',
                          desc: 'Pay 11 installments & get 100% discount on the 12th installment',
                        },
                      ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                            {icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. HOW IT WORKS */}
                <section style={{ background: '#FAF8F6', width: '100%', padding: '110px 0 100px' }}>
                  <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '96px' }}>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 14px' }}>Simple &amp; Transparent</p>
                      <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '40px', fontWeight: '600', color: '#0B2341', letterSpacing: '0.01em', margin: '0 0 24px', lineHeight: '1.2' }}>How It Works</h2>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <div style={{ width: '64px', height: '1px', background: '#E89AA9', opacity: 0.7 }} />
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <circle cx="4" cy="4" r="3.5" stroke="#E89AA9" strokeWidth="0.8" />
                          <circle cx="4" cy="4" r="1.5" fill="#E89AA9" />
                        </svg>
                        <div style={{ width: '64px', height: '1px', background: '#E89AA9', opacity: 0.7 }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
                      {/* LEFT — Circle Diagram */}
                      <div style={{ position: 'relative', width: '560px', height: '560px', flexShrink: 0 }}>
                        <svg width="560" height="560" viewBox="0 0 560 560" fill="none" style={{ position: 'absolute', inset: 0 }}>
                          <circle cx="260" cy="280" r="218" stroke="#E89AA9" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.9" />
                          <circle cx="260" cy="280" r="190" stroke="#E89AA9" strokeWidth="0.5" opacity="0.35" />
                          <path d="M68 410 Q40 445 70 465" stroke="#E89AA9" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.6" />
                          <path d="M65 460 L70 465 L75 458" stroke="#E89AA9" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                          <line x1="431.8" y1="145.8" x2="560" y2="145.8" stroke="#E89AA9" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.6" />
                          <circle cx="431.8" cy="145.8" r="14" fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                          <text x="431.8" y="149.8" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#0B2341" fontWeight="600">1</text>
                          <line x1="478" y1="280" x2="560" y2="280" stroke="#E89AA9" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.6" />
                          <circle cx="478" cy="280" r="14" fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                          <text x="478" y="284" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#0B2341" fontWeight="600">2</text>
                          <line x1="431.8" y1="414.2" x2="560" y2="414.2" stroke="#E89AA9" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.6" />
                          <circle cx="431.8" cy="414.2" r="14" fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                          <text x="431.8" y="418.2" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#0B2341" fontWeight="600">3</text>
                        </svg>

                        <div style={{ position: 'absolute', top: '280px', left: '260px', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '240px', pointerEvents: 'none' }}>
                          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '38px', fontWeight: '700', color: '#0B2341', lineHeight: '1.2', letterSpacing: '0.01em', margin: 0 }}>
                            3 Easy<br />Steps
                          </h3>
                          <div style={{ width: '40px', height: '1px', background: '#E89AA9', margin: '14px auto' }} />
                          <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#8A94A6', lineHeight: '1.6', margin: 0, fontWeight: '400' }}>
                            to purchase the jewellery your heart desires
                          </p>
                        </div>
                      </div>

                      {/* RIGHT — Step Cards */}
                      <div style={{ flex: 1, position: 'relative', height: '560px', minWidth: 0 }}>
                        <div style={{ position: 'absolute', top: '98px', left: 0, right: 0, height: '96px', display: 'flex', alignItems: 'center', gap: '28px', borderBottom: '0.5px solid rgba(232,154,169,0.15)', paddingBottom: '20px' }}>
                          <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '50%', border: '1px solid #E89AA9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', boxShadow: '0 4px 15px rgba(232,154,169,0.06)' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '0.8px solid rgba(232,154,169,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" width="28" height="28" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                            </div>
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 4px' }}>Step 01</p>
                            <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '20px', fontWeight: '600', color: '#0B2341', margin: '0 0 4px', letterSpacing: '0.01em' }}>Pay Monthly</p>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#6F727A', lineHeight: '1.6', margin: 0, maxWidth: '340px', fontWeight: '400' }}>Flexible monthly installments with easy payment options.</p>
                          </div>
                        </div>

                        <div style={{ position: 'absolute', top: '232px', left: 0, right: 0, height: '96px', display: 'flex', alignItems: 'center', gap: '28px', borderBottom: '0.5px solid rgba(232,154,169,0.15)', paddingBottom: '20px' }}>
                          <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '50%', border: '1px solid #E89AA9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', boxShadow: '0 4px 15px rgba(232,154,169,0.06)' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '0.8px solid rgba(232,154,169,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" width="28" height="28" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 3h12l4 6-10 12L2 9z" />
                                <path d="M11 3 L8 9 L12 21 L16 9 L13 3" />
                                <path d="M2 9h20" />
                              </svg>
                            </div>
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 4px' }}>Step 02</p>
                            <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '20px', fontWeight: '600', color: '#0B2341', margin: '0 0 4px', letterSpacing: '0.01em' }}>Get Exclusive Benefits</p>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#6F727A', lineHeight: '1.6', margin: 0, maxWidth: '340px', fontWeight: '400' }}>Complete your installments and unlock special rewards.</p>
                          </div>
                        </div>

                        <div style={{ position: 'absolute', top: '366px', left: 0, right: 0, height: '96px', display: 'flex', alignItems: 'center', gap: '28px', paddingBottom: '20px' }}>
                          <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '50%', border: '1px solid #E89AA9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', boxShadow: '0 4px 15px rgba(232,154,169,0.06)' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '0.8px solid rgba(232,154,169,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" width="28" height="28" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                              </svg>
                            </div>
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 4px' }}>Step 03</p>
                            <p style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '20px', fontWeight: '600', color: '#0B2341', margin: '0 0 4px', letterSpacing: '0.01em' }}>Enjoy Your Purchase</p>
                            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#6F727A', lineHeight: '1.6', margin: 0, maxWidth: '340px', fontWeight: '400' }}>Redeem your benefits and purchase any jewelry item online or in-store.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '72px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FDF7F7', border: '1px solid rgba(232,154,169,0.25)', borderRadius: '30px', padding: '12px 36px', fontFamily: 'sans-serif', fontSize: '12px', color: '#6F727A', letterSpacing: '0.02em', boxShadow: '0 2px 12px rgba(232,154,169,0.03)' }}>
                        <svg viewBox="0 0 14 14" fill="none" width="13" height="13" style={{ flexShrink: 0 }}>
                          <circle cx="7" cy="7" r="6" stroke="#E89AA9" strokeWidth="1" />
                          <path d="M7 4.5V7.5L9 9" stroke="#E89AA9" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Refer to the calculator below for complete details
                      </span>
                    </div>
                  </div>
                </section>

                {/* 5. GOLD MINE CALCULATOR */}
                <section style={{ background: '#F8F8F8', padding: '64px 0 48px' }}>
                  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
                    <h2 style={{ textAlign: 'center', fontFamily: '"Playfair Display", Georgia, serif', fontSize: '32px', fontWeight: '600', color: '#0B2341', marginBottom: '40px', letterSpacing: '0.01em' }}>Gold Mine Calculator</h2>
                    
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start mb-6">
                      {/* LEFT PANEL */}
                      <div className="w-full lg:w-[320px] shrink-0 max-w-sm lg:max-w-none">
                        <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#0B2341', fontWeight: '600', marginBottom: '14px', lineHeight: '1.5' }}>
                          Slide or enter monthly installment amount
                        </p>

                        <div style={{ border: '1.2px solid #D1D5DB', borderRadius: '4px', background: '#fff', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', overflow: 'hidden', height: '64px', marginBottom: '18px' }}>
                          <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#888', marginBottom: '3px', fontFamily: 'sans-serif' }}>Monthly Amount</div>
                            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0B2341', fontFamily: 'sans-serif', lineHeight: 1.1 }}>
                              ₹ {monthlySavingsInput.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <button style={{ background: '#E54E38', color: '#fff', border: 'none', padding: '0 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CHECK</button>
                        </div>

                        <input
                          type="range" min="1000" max="50000" step="1000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                          className="gmc-slider"
                          style={{
                            background: `linear-gradient(to right, #E8BEC5 0%, #E8BEC5 ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 100%)`
                          }}
                        />

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                          <svg viewBox="0 0 260 260" width="288" height="288" style={{ display: 'block' }}>
                            <path d="M130 130 L185 34.74 A110 110 0 1 1 130 20 Z" fill="#E8BEC5" />
                            <path d="M130 130 L130 20 A110 110 0 0 1 185 34.74 Z" fill="#38A52B" />

                            <text x="155" y="46" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white">100%</text>
                            <text x="153" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white">Discount*</text>
                            <text x="148" y="67" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="white">₹{monthlySavingsInput.toLocaleString('en-IN')}</text>

                            <text x="130" y="190" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#6F727A">You Pay</text>
                            <text x="130" y="210" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#0B2341">₹{(monthlySavingsInput * 11).toLocaleString('en-IN')}</text>
                          </svg>
                        </div>
                      </div>

                      {/* RIGHT PANEL */}
                      <div className="w-full flex-1" style={{ paddingTop: '0px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#E8BEC5', borderRadius: '2px', flexShrink: 0 }} />
                            <div style={{ fontFamily: 'sans-serif' }}>
                              <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0B2341', display: 'block' }}>Your total payment</span>
                              <span style={{ fontSize: '11px', color: '#888' }}>(Period of 11 months)</span>
                            </div>
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                            ₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#38A52B', borderRadius: '2px', flexShrink: 0 }} />
                            <div style={{ fontFamily: 'sans-serif' }}>
                              <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0B2341', display: 'block' }}>100% Discount on 12th installment</span>
                              <span style={{ fontSize: '11px', color: '#888' }}>(100% of 1 month installment value)</span>
                            </div>
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                            ₹ {monthlySavingsInput.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ height: '1px', background: '#E5E5E5', marginBottom: '18px' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <div style={{ fontFamily: 'sans-serif' }}>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#0B2341' }}>Buy any jewellery worth:</div>
                            <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>(after 12th month)</div>
                          </div>
                          <div style={{ fontSize: '26px', fontWeight: '800', color: '#E54E38', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                            ₹ {(monthlySavingsInput * 12).toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'sans-serif' }}>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: '#0B2341' }}>You effectively pay</span>
                            <span style={{ background: '#38A52B', color: '#fff', borderRadius: '3px', padding: '2px 8px', fontSize: '11px', fontWeight: '700' }}>8.33% discount!</span>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                            ₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div style={{ height: '1px', background: '#E5E5E5', marginBottom: '18px' }} />

                        <p style={{ fontSize: '14px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', marginBottom: '12px' }}>Early Redemption</p>
                        
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                          <div style={{ position: 'relative', flex: 1 }}>
                            <div style={{ background: '#ffffff', border: '1.2px solid #E5E7EB', borderRadius: '4px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)' }}>
                              <div style={{ fontFamily: 'sans-serif' }}>
                                <div style={{ fontSize: '11px', color: '#2F6FB6', fontWeight: '600', marginBottom: '4px' }}>6th Month</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#F26544' }}>
                                  ₹ {Math.round(monthlySavingsInput * 5.25).toLocaleString('en-IN')}
                                </div>
                              </div>
                              <button onClick={() => setErdTooltip(erdTooltip === '6th' ? null : '6th')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                                  <circle cx="10" cy="10" r="8.5" stroke={erdTooltip === '6th' ? '#2F6FB6' : '#999'} strokeWidth="1.2" />
                                  <text x="10" y="13.5" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill={erdTooltip === '6th' ? '#2F6FB6' : '#999'}>i</text>
                                </svg>
                              </button>
                            </div>

                            {erdTooltip === '6th' && (
                              <div style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '18px 20px', minWidth: '280px', zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.10)', fontFamily: 'sans-serif' }}>
                                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0B2341', marginBottom: '14px' }}>Redemption in 6th month</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>Your total payment</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(5 installments)</div>
                                  </div>
                                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {(monthlySavingsInput * 5).toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{ height: '1px', background: '#f0f0f0', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>Special Discount</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(25% of one installment value)</div>
                                  </div>
                                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {Math.round(monthlySavingsInput * 0.25).toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{ height: '1px', background: '#f0f0f0', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>You can buy jewellery worth:</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(after 6th month)</div>
                                  </div>
                                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#F26544', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {Math.round(monthlySavingsInput * 5.25).toLocaleString('en-IN')}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div style={{ position: 'relative', flex: 1 }}>
                            <div style={{ background: '#ffffff', border: '1.2px solid #E5E7EB', borderRadius: '4px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)' }}>
                              <div style={{ fontFamily: 'sans-serif' }}>
                                <div style={{ fontSize: '11px', color: '#2F6FB6', fontWeight: '600', marginBottom: '4px' }}>8th Month</div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#F26544' }}>
                                  ₹ {Math.round(monthlySavingsInput * 7.5).toLocaleString('en-IN')}
                                </div>
                              </div>
                              <button onClick={() => setErdTooltip(erdTooltip === '8th' ? null : '8th')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                                  <circle cx="10" cy="10" r="8.5" stroke={erdTooltip === '8th' ? '#2F6FB6' : '#999'} strokeWidth="1.2" />
                                  <text x="10" y="13.5" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill={erdTooltip === '8th' ? '#2F6FB6' : '#999'}>i</text>
                                </svg>
                              </button>
                            </div>

                            {erdTooltip === '8th' && (
                              <div style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: 0, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '18px 20px', minWidth: '280px', zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.10)', fontFamily: 'sans-serif' }}>
                                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0B2341', marginBottom: '14px' }}>Redemption in 8th month</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>Your total payment</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(7 installments)</div>
                                  </div>
                                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {(monthlySavingsInput * 7).toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{ height: '1px', background: '#f0f0f0', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>Special Discount</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(50% of one installment value)</div>
                                  </div>
                                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {Math.round(monthlySavingsInput * 0.5).toLocaleString('en-IN')}</div>
                                </div>
                                <div style={{ height: '1px', background: '#f0f0f0', margin: '10px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                  <div>
                                    <div style={{ fontSize: '12.5px', color: '#333' }}>You can buy jewellery worth:</div>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>(after 8th month)</div>
                                  </div>
                                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#F26544', whiteSpace: 'nowrap', marginLeft: '16px' }}>₹ {Math.round(monthlySavingsInput * 7.5).toLocaleString('en-IN')}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ height: '1.2px', background: '#E6B7BE', opacity: 0.6, width: '100%', margin: '24px 0 12px 0' }} />
                    <p style={{ fontSize: '11.5px', color: '#8A94A6', textAlign: 'center', lineHeight: '1.5', margin: 0, fontFamily: 'sans-serif', fontWeight: '400' }}>
                      If jewellery is more than ₹ {(monthlySavingsInput * 12).toLocaleString('en-IN')}, you just need to pay the difference amount at the time of purchase
                    </p>
                  </div>
                </section>

                {/* 6. NOTICE & FAQ */}
                <section className="relative w-full overflow-hidden flex flex-col items-center justify-between box-border" style={{ background: '#F9F1F2', height: '520px', paddingTop: '110px', paddingBottom: '50px' }}>
                  <div className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none" style={{ lineHeight: 0 }}>
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px] block">
                      <path d="M0,100 C360,30 1080,30 1440,100 L1440,0 L0,0 Z" fill="#F8F8F8" />
                    </svg>
                  </div>

                  <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-between h-full relative z-20">
                    <div className="text-center max-w-[600px] px-4">
                      <span className="block text-xs font-extrabold uppercase tracking-widest mb-1.5 font-sans" style={{ color: '#F26544' }}>NOTE:-</span>
                      <p className="text-xs md:text-[13.5px] text-[#6F727A] leading-relaxed font-sans m-0">
                        The subscription amount and benefits can be used towards the purchase of<br className="hidden md:inline" />
                        either diamond/gemstone studded jewellery or plain gold jewellery.
                      </p>
                    </div>

                    <div className="flex items-center w-full my-4 md:my-6">
                      <div className="flex-grow h-[1px] md:h-[1.2px]" style={{ backgroundColor: '#E6B7BE' }} />
                      <div className="bg-white py-3 md:py-4 px-6 md:px-12 mx-3 md:mx-6 shadow-none">
                        <h3 className="text-base md:text-[28px] font-medium text-[#0B2341] m-0 tracking-wide text-center" style={{ fontFamily: '"Playfair Display", Georgia, serif', lineHeight: '1.2' }}>Find answers to all your queries here</h3>
                      </div>
                      <div className="flex-grow h-[1px] md:h-[1.2px]" style={{ backgroundColor: '#E6B7BE' }} />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 font-sans mb-4">
                      <a
                        href="/#faq"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('home');
                          setTimeout(() => {
                            const faqEl = document.getElementById('faq');
                            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="text-sm md:text-[15.5px] font-semibold text-[#2F6FB6] no-underline hover:text-[#1c508a] transition-colors"
                      >
                        View all FAQ &gt;&gt;
                      </a>
                      <span className="text-[#E6B7BE] text-base hidden md:inline select-none">|</span>
                      <a
                        href="/terms-and-conditions"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('terms-and-conditions');
                        }}
                        className="text-sm md:text-[15.5px] font-semibold text-[#2F6FB6] no-underline hover:text-[#1c508a] transition-colors"
                      >
                        View all Terms &amp; Conditions &gt;&gt;
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}

          {currentPage === 'gold-reserve' && (
            <>
              {/* MOBILE VIEW */}
              <div className="lg:hidden bg-white min-h-screen pb-24 text-[#1B1B1B]">
                {/* FULL WIDTH BANNER */}
                <div className="w-full bg-[#FAF0ED]">
                  <img
                    src={goldReserveBanner}
                    alt="Gold Reserve Plan"
                    className="w-full object-contain"
                  />
                </div>

                {/* QUICK ENROLL CARD (BlueStone Style) */}
                <div className="w-full bg-[#FCFAFF] py-6 px-4">
                  <div className="max-w-md mx-auto bg-white border border-gray-150 rounded-2xl shadow-[0_8px_30px_rgba(63,31,84,0.05)] p-5 space-y-4">
                    <h3 className="text-center text-[13.5px] font-bold text-[#1B3152] font-sans tracking-wide">
                      Pay 10 installments, get an extra voucher worth upto <span className="text-[#c0392b]">1 installment!</span>
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Monthly Amount</label>
                        <input
                          type="number"
                          placeholder="2000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value || 2000)}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#c0392b] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Email ID</label>
                        <input
                          type="email"
                          placeholder="e.g. patron@mail.com"
                          value={savingsForm.email}
                          onChange={(e) => setSavingsForm({ ...savingsForm, email: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#c0392b] transition-all bg-[#FCFAFF]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                      className="w-full py-3.5 rounded-lg bg-[#c0392b] hover:bg-[#a93226] text-white text-xs uppercase font-extrabold tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      GET STARTED
                    </button>

                    <div className="text-center space-y-1.5 pt-2">
                      <button
                        onClick={() => { triggerAudio('click'); navigateTo('savings-enroll'); }}
                        className="text-[11px] text-gray-500 hover:text-[#c0392b] cursor-pointer transition-colors block mx-auto font-medium"
                      >
                        Want to pay your {savingsSchemeType} Installment?{' '}
                        <span className="text-[#c0392b] font-bold hover:underline">Click to Pay</span>
                      </button>
                      <p className="text-[10px] text-gray-400 font-medium">
                        For any queries, call/WhatsApp us at <a href="tel:+917610843978" className="text-[#c0392b] font-bold">+91 76108 43978</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* WHY PLAN SECTION — reference style */}
                <div className="w-full bg-[#fafafa] py-10 px-4">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center space-y-2">
                      <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-semibold text-[#1a1a2e]">
                        Why {savingsSchemeType} Plan?
                      </h2>
                      <div className="w-10 h-[2px] bg-[#c0392b] mx-auto" />
                    </div>
                    <div className="flex flex-col gap-5">
                      {[
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          ),
                          title: 'Plan Ahead',
                          desc: 'Subscribe to plan for your future high value purchases',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 11v-1" />
                            </svg>
                          ),
                          title: 'Gold accumulation',
                          desc: 'With every installment payment, gold units are allocated to your plan based on the prevailing gold rate',
                        },
                        {
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                          ),
                          title: 'Special benefits',
                          desc: 'Pay 10 installments and get on extra voucher worth upto 1 installment amount',
                        },
                      ].map(({ icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-[#FCFAFF] border border-gray-100 flex items-center justify-center shrink-0">
                            {icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1a1a2e] mb-1 text-left" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                            <p className="text-[11px] text-gray-500 leading-relaxed text-left font-sans">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="w-full bg-white py-10 px-4">
                  <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E89AA9', fontWeight: '700', margin: '0 0 8px' }}>Simple &amp; Transparent</p>
                      <h2 className="text-xl font-semibold text-[#0B2341] tracking-wide" style={{ fontFamily: '"Playfair Display", Georgia, serif', lineHeight: '1.2' }}>How does it work?</h2>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
                        <div style={{ width: '32px', height: '1.5px', background: '#E89AA9' }} />
                        <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                          <circle cx="4" cy="4" r="3.5" stroke="#E89AA9" strokeWidth="0.8" />
                          <circle cx="4" cy="4" r="1.5" fill="#E89AA9" />
                        </svg>
                        <div style={{ width: '32px', height: '1.5px', background: '#E89AA9' }} />
                      </div>
                    </div>

                    <div className="relative pl-12 space-y-8 py-2">
                      {/* Vertical dashed line */}
                      <div className="absolute left-[18px] top-4 bottom-4 w-[1px] border-l border-dashed border-[#E89AA9]/60" />

                      {[
                        {
                          step: 'Step 01',
                          title: 'Pay Monthly',
                          desc: 'Pay monthly installments to accumulate gold units.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          )
                        },
                        {
                          step: 'Step 02',
                          title: 'Gold accumulation',
                          desc: 'Gold units are allocated based on the prevailing gold rate.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 11v-1" />
                            </svg>
                          )
                        },
                        {
                          step: 'Step 03',
                          title: 'Special benefits',
                          desc: 'Pay 10 installments and get on extra voucher worth upto 1 installment amount.',
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9" strokeWidth="1.2" className="w-5 h-5">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                            </svg>
                          )
                        }
                      ].map((s, idx) => (
                        <div key={idx} className="relative flex flex-col items-start text-left">
                          {/* Anchor dot */}
                          <div className="absolute -left-12 w-9 h-9 rounded-full bg-white border border-[#E89AA9] flex items-center justify-center font-bold text-xs text-[#0B2341] shadow-xs">
                            {idx + 1}
                          </div>
                          <span className="text-[8.5px] uppercase tracking-widest text-[#E89AA9] font-bold font-sans block mb-0.5">{s.step}</span>
                          <h4 className="text-xs font-bold text-[#0B2341] font-serif mb-1">{s.title}</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{s.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-6">
                      <span className="inline-flex items-center gap-2 bg-[#FDF7F7] border border-[rgba(232,154,169,0.25)] rounded-full px-5 py-2 text-[10.5px] text-gray-500 font-sans shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <svg viewBox="0 0 14 14" fill="none" width="11" height="11" className="shrink-0">
                          <circle cx="7" cy="7" r="6" stroke="#E89AA9" strokeWidth="1" />
                          <path d="M7 4.5V7.5L9 9" stroke="#E89AA9" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Refer to the calculator below for details
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. GOLD RESERVE CALCULATOR */}
                <div className="w-full py-10 px-4 bg-[#F8F8F8] border-t border-b border-gray-200">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-[#0B2341] font-serif">Gold Reserve Calculator</h2>
                      <p className="text-[11px] text-gray-500 mt-1 font-sans">Slide or enter monthly installment amount</p>
                      <p className="text-[11px] text-[#c0392b] font-bold font-sans mt-0.5">Today's Gold rate(24kt) | ₹ {goldRate24k.toFixed(2)}</p>
                    </div>

                    <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs space-y-6">
                      {/* Custom Amount Input Box */}
                      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-2.5 bg-white h-16">
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-sans">Monthly Amount</span>
                          <div className="flex items-center text-lg font-bold text-[#0B2341] font-sans mt-0.5">
                            <span className="mr-1">₹</span>
                            <input
                              type="number"
                              value={monthlySavingsInput}
                              onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                              className="w-24 focus:outline-none bg-transparent"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                          className="px-5 py-2 rounded bg-[#c0392b] text-white text-[10.5px] font-bold tracking-wider cursor-pointer active:scale-95 transition-transform"
                        >
                          CHECK
                        </button>
                      </div>

                      {/* Slider Input */}
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="1000"
                          max="50000"
                          step="1000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                          className="w-full cursor-pointer accent-[#c0392b]"
                          style={{
                            background: `linear-gradient(to right, #c0392b 0%, #c0392b ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 ${((monthlySavingsInput - 1000) / 49000) * 100}%, #E5E5E5 100%)`
                          }}
                        />
                        <div className="flex justify-between text-[9.5px] text-gray-400 font-bold font-sans">
                          <span>1,000</span>
                          <span>25,000</span>
                          <span>50,000</span>
                        </div>
                      </div>

                      {/* Math Breakdown */}
                      <div className="space-y-4 pt-2 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-[#0B2341] rounded-xs shrink-0" />
                            <div className="font-sans">
                              <span className="font-semibold text-[#0B2341] block">Your Payment</span>
                              <span className="text-[10px] text-gray-400">(1 installment)</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#0B2341]">₹ {monthlySavingsInput.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-[#38A52B] rounded-xs shrink-0" />
                            <div className="font-sans">
                              <span className="font-semibold text-[#0B2341] block">Your Reserved Gold</span>
                              <span className="text-[10px] text-gray-400">(in units)</span>
                            </div>
                          </div>
                          <span className="font-bold text-[#0B2341]">{(monthlySavingsInput / goldRate24k).toFixed(4)} g</span>
                        </div>

                        <div className="h-[1px] bg-gray-200" />

                        {/* Explanatory text box */}
                        <div className="font-sans text-[11px] text-gray-600 leading-relaxed bg-[#FAF8F6] p-4 rounded-lg border border-gray-150">
                          <p className="margin-0 font-bold text-[#0B2341] mb-1.5">
                            Pay all installments on time and choose between one of the two following options for your special benefit voucher:
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Plain Gold voucher worth 50% of your installment amount.</li>
                            <li>Non-Plain Gold voucher worth 100% of your installment amount.</li>
                          </ul>
                        </div>

                        <div className="h-[1px] bg-gray-200" />
                        
                        <p className="text-[10px] text-gray-400 text-center leading-normal font-sans pt-1">
                          If jewellery is more than ₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}, you just need to pay the difference amount at the time of purchase.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. NOTE & FAQ */}
                <div className="w-full py-10 px-4 bg-[#F9F1F2] text-center space-y-6">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26544] font-sans block">NOTE:</span>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans text-left">
                        *1 gold unit = 1 gram of 24kt gold<br />
                        The Gold Reserve Option Plan is redeemable from 2nd month onwards, subject to terms and conditions.<br />
                        The subscription amount and primary voucher can be used towards the purchase of Diamond studded, Gemstone studded, Plain Gold, Plain Platinum or Preset Solitaire jewellery.<br />
                        The Plain Gold special benefit voucher can be used towards the purchase of Plain Gold jewellery only.<br />
                        The Non-Plain Gold special benefit voucher can be used towards the purchase of Diamond studded, Gemstone studded, Plain Platinum or Preset Solitaire jewellery only.
                      </p>
                    </div>

                    <div className="w-10 h-[1px] bg-[#E6B7BE]/50 mx-auto" />

                    <div className="flex flex-col gap-2 font-sans text-xs">
                      <a
                        href="/#faq"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('home');
                          setTimeout(() => {
                            const faqEl = document.getElementById('faq');
                            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="font-semibold text-[#2F6FB6] hover:underline"
                      >
                        View all FAQ &gt;&gt;
                      </a>
                      <a
                        href="/terms-and-conditions"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateTo('terms-and-conditions');
                        }}
                        className="font-semibold text-[#2F6FB6] hover:underline"
                      >
                        View all Terms &amp; Conditions &gt;&gt;
                      </a>
                    </div>
                  </div>
                </div>

                {/* STICKY BOTTOM ACTION BAR */}
                <div className="flex fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-200 px-4 py-3 items-center justify-between shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
                  <a
                    href="https://wa.me/917610843978"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 mr-2 text-center py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 bg-white active:bg-gray-50 transition-colors cursor-pointer"
                  >
                    CONTACT US
                  </a>
                  <button
                    onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                    className="flex-1 py-2.5 bg-[#c0392b] hover:bg-[#a93226] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest text-center shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    GET STARTED
                  </button>
                </div>
              </div>

              {/* DESKTOP VIEW */}
              <div className="hidden lg:block bg-white min-h-screen">


              {/* FULL WIDTH BANNER — full image, no crop */}
              <div className="w-full bg-[#FAF0ED]">
                <img
                  src={goldReserveBanner}
                  alt="Gold Reserve 11+1 Monthly Installment Plan"
                  className="w-full object-contain"
                />
              </div>

              {/* QUICK ENROLL STRIP */}
              <div className="w-full border-b border-gray-100 bg-white">
                <div className="max-w-5xl mx-auto px-6 py-5">
                  <div className="flex flex-col sm:flex-row gap-3 items-end">
                    <div className="flex-grow">
                      <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Monthly Amount</label>
                      <input
                        type="number"
                        placeholder="2000"
                        value={monthlySavingsInput}
                        onChange={(e) => setMonthlySavingsInput(+e.target.value || 2000)}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-[#c0392b] transition-all"
                      />
                    </div>
                    <div className="flex-grow">
                      <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">Enter Email address</label>
                      <input
                        type="email"
                        placeholder="Enter Email address"
                        value={savingsForm.email}
                        onChange={(e) => setSavingsForm({ ...savingsForm, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#c0392b] transition-all"
                      />
                    </div>
                    <button
                      onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                      className="px-10 py-3 rounded-lg bg-[#c0392b] hover:bg-[#a93226] text-white text-xs uppercase font-black tracking-widest transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg"
                    >
                      GET STARTED
                    </button>
                  </div>
                  <div className="text-right mt-2">
                    <button
                      onClick={() => { triggerAudio('click'); navigateTo('savings-enroll'); }}
                      className="text-[11px] text-gray-500 hover:text-[#c0392b] cursor-pointer transition-colors font-sans"
                    >
                      Want to pay your {savingsSchemeType} Installment?{' '}
                      <span className="text-[#c0392b] font-semibold hover:underline">Click to Pay</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* WHY PLAN SECTION — reference style */}
              <div className="w-full bg-[#fafafa] py-12">
                <div className="max-w-5xl mx-auto px-6 space-y-8">
                  <div className="text-center space-y-2">
                    <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-semibold text-[#1a1a2e]">
                      Why {savingsSchemeType} Plan?
                    </h2>
                    <div className="w-10 h-[2px] bg-[#c0392b] mx-auto" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        ),
                        title: 'Plan Ahead',
                        desc: 'Subscribe to plan for your future high value purchases',
                      },
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 11v-1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M5 12a7 7 0 1114 0 7 7 0 01-14 0z" />
                          </svg>
                        ),
                        title: 'Gold accumulation',
                        desc: 'With every installment payment, gold units are allocated to your plan based on the prevailing gold rate',
                      },
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.5" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        ),
                        title: 'Special benefits',
                        desc: 'Pay 10 installments and get on extra voucher worth upto 1 installment amount',
                      },
                    ].map(({ icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                          {icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#1a1a2e] mb-1" style={{ fontFamily: 'Georgia, serif' }}>{title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════
                  HOW IT WORKS — PREMIUM LUXURY JEWELLERY
                  ═══════════════════════════════════════════════ */}
              <section style={{ background: '#FAF8F6', width: '100%', padding: '110px 0 100px' }}>
                <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 48px' }}>

                  {/* ── Section Header ── */}
                  <div style={{ textAlign: 'center', marginBottom: '96px' }}>
                    <p style={{
                      fontFamily: 'sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: '#E89AA9',
                      fontWeight: '700',
                      margin: '0 0 14px'
                    }}>
                      Simple &amp; Transparent
                    </p>
                    <h2 style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: '40px',
                      fontWeight: '600',
                      color: '#0B2341',
                      letterSpacing: '0.01em',
                      margin: '0 0 24px',
                      lineHeight: '1.2'
                    }}>
                      How It Works
                    </h2>
                    {/* Decorative divider */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      <div style={{ width: '64px', height: '1px', background: '#E89AA9', opacity: 0.7 }} />
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="3.5" stroke="#E89AA9" strokeWidth="0.8" />
                        <circle cx="4" cy="4" r="1.5" fill="#E89AA9" />
                      </svg>
                      <div style={{ width: '64px', height: '1px', background: '#E89AA9', opacity: 0.7 }} />
                    </div>
                  </div>

                  {/* ── Main Layout: Circle + Steps ── */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>

                    {/* ══════════════════════════
                        LEFT — Circle Diagram
                        ══════════════════════════ */}
                    <div style={{ position: 'relative', width: '560px', height: '560px', flexShrink: 0 }}>

                      {/* SVG: Circle + Arrow + Markers + Connectors */}
                      <svg width="560" height="560" viewBox="0 0 560 560" fill="none"
                        style={{ position: 'absolute', inset: 0 }}>

                        {/* Outer dashed rose-gold circle  cx=260, cy=280, r=218 */}
                        <circle cx="260" cy="280" r="218"
                          stroke="#E89AA9" strokeWidth="1.2"
                          strokeDasharray="4 8" opacity="0.9" />

                        {/* Inner hairline circle */}
                        <circle cx="260" cy="280" r="190"
                          stroke="#E89AA9" strokeWidth="0.5"
                          opacity="0.35" />

                        {/* Curved decorative arrow — bottom-left of circle */}
                        <path d="M68 410 Q40 445 70 465"
                          stroke="#E89AA9" strokeWidth="0.8"
                          fill="none" strokeLinecap="round" opacity="0.6" />
                        <path d="M65 460 L70 465 L75 458"
                          stroke="#E89AA9" strokeWidth="0.8"
                          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

                        {/* ── Marker 1 ── */}
                        <line x1="431.8" y1="145.8" x2="560" y2="145.8"
                          stroke="#E89AA9" strokeWidth="0.6"
                          strokeDasharray="3 6" opacity="0.6" />
                        <circle cx="431.8" cy="145.8" r="14"
                          fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                        <text x="431.8" y="149.8" textAnchor="middle"
                          fontFamily="sans-serif" fontSize="11"
                          fill="#0B2341" fontWeight="600">1</text>

                        {/* ── Marker 2 ── */}
                        <line x1="478" y1="280" x2="560" y2="280"
                          stroke="#E89AA9" strokeWidth="0.6"
                          strokeDasharray="3 6" opacity="0.6" />
                        <circle cx="478" cy="280" r="14"
                          fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                        <text x="478" y="284" textAnchor="middle"
                          fontFamily="sans-serif" fontSize="11"
                          fill="#0B2341" fontWeight="600">2</text>

                        {/* ── Marker 3 ── */}
                        <line x1="431.8" y1="414.2" x2="560" y2="414.2"
                          stroke="#E89AA9" strokeWidth="0.6"
                          strokeDasharray="3 6" opacity="0.6" />
                        <circle cx="431.8" cy="414.2" r="14"
                          fill="#FAF8F6" stroke="#E89AA9" strokeWidth="0.8" />
                        <text x="431.8" y="418.2" textAnchor="middle"
                          fontFamily="sans-serif" fontSize="11"
                          fill="#0B2341" fontWeight="600">3</text>
                      </svg>

                      {/* Center text — anchored on circle center cx=260, cy=280 */}
                      <div style={{
                        position: 'absolute',
                        top: '280px', left: '260px',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center', width: '240px',
                        pointerEvents: 'none'
                      }}>
                        <h3 style={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontSize: '38px',
                          fontWeight: '700',
                          color: '#0B2341',
                          lineHeight: '1.2',
                          letterSpacing: '0.01em',
                          margin: 0
                        }}>
                          3 Easy<br />Steps
                        </h3>
                        <div style={{
                          width: '40px', height: '1px',
                          background: '#E89AA9', margin: '14px auto'
                        }} />
                        <p style={{
                          fontFamily: 'sans-serif',
                          fontSize: '12px',
                          color: '#8A94A6',
                          lineHeight: '1.6',
                          margin: 0,
                          fontWeight: '400'
                        }}>
                          to purchase the jewellery your heart desires
                        </p>
                      </div>
                    </div>

                    {/* ══════════════════════════
                        RIGHT — Step Cards
                        ══════════════════════════ */}
                    <div style={{
                      flex: 1,
                      position: 'relative',
                      height: '560px',
                      minWidth: 0
                    }}>

                      {/* ─── STEP 01 ─── */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '98px', left: 0, right: 0,
                          height: '96px',
                          display: 'flex', alignItems: 'center',
                          gap: '28px',
                          borderBottom: '0.5px solid rgba(232,154,169,0.15)',
                          paddingBottom: '20px'
                        }}
                      >
                        {/* Double bordered Icon circle */}
                        <div style={{
                          width: '80px', height: '80px', flexShrink: 0,
                          borderRadius: '50%',
                          border: '1px solid #E89AA9',
                          background: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '4px',
                          boxShadow: '0 4px 15px rgba(232,154,169,0.06)'
                        }}>
                          <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            border: '0.8px solid rgba(232,154,169,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {/* Calendar icon */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9"
                              strokeWidth="1.2" width="28" height="28"
                              strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                        </div>
                        {/* Text */}
                        <div style={{ textAlign: 'left' }}>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '9px', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: '#E89AA9',
                            fontWeight: '700', margin: '0 0 4px'
                          }}>Step 01</p>
                          <p style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: '20px', fontWeight: '600',
                            color: '#0B2341', margin: '0 0 4px',
                            letterSpacing: '0.01em'
                          }}>Monthly Payments</p>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '13px', color: '#6F727A',
                            lineHeight: '1.6', margin: 0,
                            maxWidth: '340px', fontWeight: '400'
                          }}>Pay 10 monthly installments to accumulate gold units.</p>
                        </div>
                      </div>

                      {/* ─── STEP 02 ─── */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '232px', left: 0, right: 0,
                          height: '96px',
                          display: 'flex', alignItems: 'center',
                          gap: '28px',
                          borderBottom: '0.5px solid rgba(232,154,169,0.15)',
                          paddingBottom: '20px'
                        }}
                      >
                        {/* Double bordered Icon circle */}
                        <div style={{
                          width: '80px', height: '80px', flexShrink: 0,
                          borderRadius: '50%',
                          border: '1px solid #E89AA9',
                          background: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '4px',
                          boxShadow: '0 4px 15px rgba(232,154,169,0.06)'
                        }}>
                          <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            border: '0.8px solid rgba(232,154,169,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {/* Luxury diamond icon */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9"
                              strokeWidth="1.2" width="28" height="28"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 3h12l4 6-10 12L2 9z" />
                              <path d="M11 3 L8 9 L12 21 L16 9 L13 3" />
                              <path d="M2 9h20" />
                            </svg>
                          </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '9px', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: '#E89AA9',
                            fontWeight: '700', margin: '0 0 4px'
                          }}>Step 02</p>
                          <p style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: '20px', fontWeight: '600',
                            color: '#0B2341', margin: '0 0 4px',
                            letterSpacing: '0.01em'
                          }}>Get Special Benefits</p>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '13px', color: '#6F727A',
                            lineHeight: '1.6', margin: 0,
                            maxWidth: '340px', fontWeight: '400'
                          }}>Pay for 10 months on time and unlock an extra voucher worth upto 1 installment.</p>
                        </div>
                      </div>

                      {/* ─── STEP 03 ─── */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '366px', left: 0, right: 0,
                          height: '96px',
                          display: 'flex', alignItems: 'center',
                          gap: '28px',
                          paddingBottom: '20px'
                        }}
                      >
                        {/* Double bordered Icon circle */}
                        <div style={{
                          width: '80px', height: '80px', flexShrink: 0,
                          borderRadius: '50%',
                          border: '1px solid #E89AA9',
                          background: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '4px',
                          boxShadow: '0 4px 15px rgba(232,154,169,0.06)'
                        }}>
                          <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            border: '0.8px solid rgba(232,154,169,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {/* Luxury shopping bag icon */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="#E89AA9"
                              strokeWidth="1.2" width="28" height="28"
                              strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                          </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '9px', letterSpacing: '0.25em',
                            textTransform: 'uppercase', color: '#E89AA9',
                            fontWeight: '700', margin: '0 0 4px'
                          }}>Step 03</p>
                          <p style={{
                            fontFamily: '"Playfair Display", Georgia, serif',
                            fontSize: '20px', fontWeight: '600',
                            color: '#0B2341', margin: '0 0 4px',
                            letterSpacing: '0.01em'
                          }}>Happy Shopping</p>
                          <p style={{
                            fontFamily: 'sans-serif',
                            fontSize: '13px', color: '#6F727A',
                            lineHeight: '1.6', margin: 0,
                            maxWidth: '340px', fontWeight: '400'
                          }}>Use the auto-redeemed voucher (equal to your total reserved gold units' live value at maturity) to buy at any of our stores or online.</p>
                        </div>
                      </div>

                    </div>{/* end right panel */}
                  </div>{/* end main layout */}

                  {/* Bottom reference pill */}
                  <div style={{ textAlign: 'center', marginTop: '72px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#FDF7F7',
                      border: '1px solid rgba(232,154,169,0.25)',
                      borderRadius: '30px',
                      padding: '12px 36px',
                      fontFamily: 'sans-serif',
                      fontSize: '12px',
                      color: '#6F727A',
                      letterSpacing: '0.02em',
                      boxShadow: '0 2px 12px rgba(232,154,169,0.03)'
                    }}>
                      <svg viewBox="0 0 14 14" fill="none" width="13" height="13" style={{ flexShrink: 0 }}>
                        <circle cx="7" cy="7" r="6" stroke="#E89AA9" strokeWidth="1" />
                        <path d="M7 4.5V7.5L9 9" stroke="#E89AA9" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Refer to the calculator below for details
                    </span>
                  </div>

                </div>
              </section>

              {/* ═══════════════════════════════════════════════
                  GOLD RESERVE CALCULATOR — PIXEL-PERFECT
                  ═══════════════════════════════════════════════ */}
              <section style={{ background: '#ffffff', padding: '64px 0 48px' }}>

                {/* Slider custom styles */}
                <style>{`
                  .gmc-slider { -webkit-appearance:none; appearance:none; width:100%; height:5px; border-radius:4px; outline:none; cursor:pointer; }
                  .gmc-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; background:#0B2341; border-radius:50%; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.25); }
                  .gmc-slider::-moz-range-thumb { width:20px; height:20px; background:#0B2341; border-radius:50%; cursor:pointer; border:none; }
                `}</style>

                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

                  {/* Heading */}
                  <h2 style={{
                    textAlign: 'center',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#0B2341',
                    margin: '0 0 8px',
                    letterSpacing: '0.01em'
                  }}>Gold Reserve Calculator</h2>

                  <p style={{
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    fontSize: '14px',
                    color: '#555',
                    margin: '0 0 40px',
                    fontWeight: '500'
                  }}>Today's Gold rate(24kt) | ₹ {goldRate24k.toFixed(2)}</p>

                  {/* Main Card — no border, open layout */}
                  <div style={{
                    display: 'flex', gap: '64px', alignItems: 'flex-start', marginBottom: '24px'
                  }}>

                    {/* ═══ LEFT PANEL ═══ */}
                    <div style={{ width: '320px', flexShrink: 0 }}>

                      <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#0B2341', fontWeight: '600', marginBottom: '14px', lineHeight: '1.5' }}>
                        Slide or enter monthly installment amount
                      </p>

                      {/* Amount Input Box */}
                      <div style={{
                        border: '1.2px solid #D1D5DB',
                        borderRadius: '4px',
                        background: '#fff',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 16px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', fontWeight: '600', fontFamily: 'sans-serif' }}>Monthly Amount</span>
                          <span style={{ fontSize: '18px', fontWeight: '700', color: '#0C223F', fontFamily: 'sans-serif', marginTop: '2px' }}>₹ {monthlySavingsInput}</span>
                        </div>
                        <button
                          onClick={() => { triggerAudio('shimmer'); navigateTo('savings-enroll'); }}
                          style={{
                            background: '#c0392b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '3px',
                            padding: '8px 16px',
                            fontSize: '12px',
                            fontWeight: '800',
                            letterSpacing: '0.05em',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#a93226'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                        >
                          CHECK
                        </button>
                      </div>

                      {/* Slider Input */}
                      <div style={{ marginBottom: '20px' }}>
                        <input
                          type="range"
                          min="1000"
                          max="50000"
                          step="1000"
                          value={monthlySavingsInput}
                          onChange={(e) => setMonthlySavingsInput(+e.target.value)}
                          className="gmc-slider"
                          style={{ background: '#E5E7EB' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#999', marginTop: '8px', fontFamily: 'sans-serif', fontWeight: '600' }}>
                          <span>1,000</span>
                          <span>25,000</span>
                          <span>50,000</span>
                        </div>
                      </div>

                    </div>{/* end left panel */}

                    {/* ═══ RIGHT PANEL ═══ */}
                    <div style={{ flex: 1, borderLeft: '1.2px solid #E5E7EB', paddingLeft: '64px' }}>

                      {/* Row 1 — Payment */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', background: '#0B2341', borderRadius: '2px', flexShrink: 0 }} />
                          <div style={{ fontFamily: 'sans-serif' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0B2341', display: 'block' }}>Your Payment</span>
                            <span style={{ fontSize: '11px', color: '#888' }}>(1 installment)</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                          ₹ {monthlySavingsInput.toLocaleString('en-IN')}
                        </div>
                      </div>

                      {/* Row 2 — Reserved Gold */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ width: '12px', height: '12px', background: '#38A52B', borderRadius: '2px', flexShrink: 0 }} />
                          <div style={{ fontFamily: 'sans-serif' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0B2341', display: 'block' }}>Your Reserved Gold</span>
                            <span style={{ fontSize: '11px', color: '#888' }}>(in units)</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#0B2341', fontFamily: 'sans-serif', whiteSpace: 'nowrap' }}>
                          {(monthlySavingsInput / goldRate24k).toFixed(4)}
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ height: '1px', background: '#E5E5E5', marginBottom: '18px' }} />

                      {/* Explanatory text box */}
                      <div style={{
                        fontFamily: 'sans-serif',
                        fontSize: '13px',
                        color: '#555',
                        lineHeight: '1.6',
                        background: '#FAF8F6',
                        padding: '16px',
                        borderRadius: '4px',
                        border: '1px solid #EAEAEA'
                      }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#0B2341' }}>
                          Pay all installments on time and choose between one of the two following options for your special benefit voucher:
                        </p>
                        <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'disc' }}>
                          <li>Plain Gold voucher worth 50% of your installment amount.</li>
                          <li style={{ marginTop: '4px' }}>Non-Plain Gold voucher worth 100% of your installment amount.</li>
                        </ul>
                      </div>

                    </div>{/* end right panel */}
                  </div>{/* end main card flex */}

                  {/* Bottom Divider and Note spanning full width */}
                  <div style={{ height: '1.2px', background: '#E6B7BE', opacity: 0.6, width: '100%', margin: '24px 0 12px 0' }} />
                  <p style={{
                    fontSize: '11.5px',
                    color: '#8A94A6',
                    textAlign: 'center',
                    lineHeight: '1.5',
                    margin: 0,
                    fontFamily: 'sans-serif',
                    fontWeight: '400'
                  }}>
                    If jewellery is more than ₹ {(monthlySavingsInput * 11).toLocaleString('en-IN')}, you just need to pay the difference amount at the time of purchase
                  </p>

                </div>
              </section>

              {/* ═══════════════════════════════════════════════
                  NOTE + FAQ SECTION
                  ═══════════════════════════════════════════════ */}
              <section
                className="relative w-full overflow-hidden flex flex-col items-center justify-between box-border"
                style={{
                  background: '#F9F1F2',
                  height: '520px',
                  paddingTop: '110px',
                  paddingBottom: '50px'
                }}
              >
                {/* Large curved wave shape at the top of the section */}
                <div className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none" style={{ lineHeight: 0 }}>
                  <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px] block">
                    <path d="M0,100 C360,30 1080,30 1440,100 L1440,0 L0,0 Z" fill="#ffffff" />
                  </svg>
                </div>

                <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center justify-between h-full relative z-20">

                  {/* TOP NOTICE */}
                  <div className="text-center max-w-[600px] px-4">
                    <span
                      className="block text-xs font-extrabold uppercase tracking-widest mb-1.5 font-sans"
                      style={{ color: '#F26544' }}
                    >
                      NOTE:-
                    </span>
                    <p className="text-xs md:text-[13px] text-[#6F727A] leading-relaxed font-sans m-0">
                      *1 gold unit = 1 gram of 24kt gold<br />
                      The Gold Reserve Option Plan is redeemable from 2nd month onwards, subject to terms and conditions.<br />
                      The subscription amount and primary voucher can be used towards the purchase of Diamond studded, Gemstone studded, Plain Gold, Plain Platinum or Preset Solitaire jewellery.<br />
                      The Plain Gold special benefit voucher can be used towards the purchase of Plain Gold jewellery only.<br />
                      The Non-Plain Gold special benefit voucher can be used towards the purchase of Diamond studded, Gemstone studded, Plain Platinum or Preset Solitaire jewellery only.
                    </p>
                  </div>

                  {/* MAIN HEADING BLOCK */}
                  <div className="flex items-center w-full my-4 md:my-6">
                    <div className="flex-grow h-[1px] md:h-[1.2px]" style={{ backgroundColor: '#E6B7BE' }} />
                    <div className="bg-white py-3 md:py-4 px-6 md:px-12 mx-3 md:mx-6 shadow-none">
                      <h3
                        className="text-base md:text-[28px] font-medium text-[#0B2341] m-0 tracking-wide text-center"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif', lineHeight: '1.2' }}
                      >
                        Find answers to all your queries here
                      </h3>
                    </div>
                    <div className="flex-grow h-[1px] md:h-[1.2px]" style={{ backgroundColor: '#E6B7BE' }} />
                  </div>

                  {/* LINKS SECTION */}
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 font-sans mb-4">
                    <a
                      href="/#faq"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('home');
                        setTimeout(() => {
                          const faqEl = document.getElementById('faq');
                          if (faqEl) {
                            faqEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 150);
                      }}
                      className="text-sm md:text-[15.5px] font-semibold text-[#2F6FB6] no-underline hover:text-[#1c508a] transition-colors"
                    >
                      View all FAQ &gt;&gt;
                    </a>
                    <span className="text-[#E6B7BE] text-base hidden md:inline select-none">|</span>
                    <a
                      href="/terms-and-conditions"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('terms-and-conditions');
                      }}
                      className="text-sm md:text-[15.5px] font-semibold text-[#2F6FB6] no-underline hover:text-[#1c508a] transition-colors"
                    >
                      View all Terms &amp; Conditions &gt;&gt;
                    </a>
                  </div>

                </div>
              </section>

              </div>
            </>
          )}

          {/* ==========================================
            A2. EXCLUSIVE OFFERS & STORES PAGE VIEW
            ========================================== */}
          {currentPage === 'offers' && (
            <div className="bg-[#FCFAFF] text-[#0A2240] min-h-screen pb-16">

              {/* TOP ANNOUNCEMENT BANNERS */}
              <div className="w-full bg-[#031838] border-b border-[#DDA0DD]/10 py-6 px-4">
                {/* Two Banners Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 select-none animate-slide-up">
                  {/* Banner 1: Gold Mine */}
                  <div
                    onClick={() => {
                      triggerAudio('click');
                      navigateTo('savings');
                    }}
                    className="overflow-hidden rounded-2xl relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-white/10"
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
                    className="overflow-hidden rounded-2xl relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-white/10"
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
              <div className="w-full select-none animate-slide-up bg-white space-y-0">
                {/* 11+1 GRP Savings Scheme Banner */}
                <div
                  onClick={() => {
                    triggerAudio('click');
                    navigateTo('savings');
                  }}
                  className="w-full overflow-hidden relative group cursor-pointer shadow-xs"
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
                  className="w-full overflow-hidden relative group cursor-pointer shadow-xs border-t border-gray-100"
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
                <div className="w-full bg-[#FAF6F8] py-16 lg:py-24 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-gray-200 select-none">
                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">

                    {/* Left Column - Branding (Matching screenshot layout & typography) */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      <h3 className="font-serif text-[#031838] text-[28px] sm:text-[36px] lg:text-[44px] font-normal tracking-[0.01em] leading-tight m-0">
                        HR Jeweller & Sons
                      </h3>
                      <h2 className="font-serif text-[#031838] text-[56px] sm:text-[72px] lg:text-[84px] font-extrabold tracking-[0.02em] leading-none mt-1 sm:mt-2 mb-0">
                        Promise
                      </h2>
                    </div>

                    {/* Right Column - Grid of Circles (Exactly 3 columns on all screens, responsive circles) */}
                    <div className="w-full lg:w-1/2 grid grid-cols-3 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-8 md:gap-x-12 justify-items-center">

                      {/* Circle 1 - Heritage */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <span className="text-[8px] sm:text-[10px] tracking-widest uppercase opacity-75 font-semibold font-sans">SINCE</span>
                          <span className="text-lg sm:text-xl md:text-2xl font-bold font-serif tracking-wider mt-0.5">1952</span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          Royal Lineage of Bikaner
                        </p>
                      </div>

                      {/* Circle 2 - Certified */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          100% Certified Jewellery
                        </p>
                      </div>

                      {/* Circle 3 - Lifetime Exchange */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          Lifetime Exchange & Buyback
                        </p>
                      </div>

                      {/* Circle 4 - Guaranteed Purity */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          Guaranteed Purity & Value
                        </p>
                      </div>

                      {/* Circle 5 - Complete Transparency */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          100% Transparency
                        </p>
                      </div>

                      {/* Circle 6 - Free Shipping */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
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
                      {/* Circle 7 - Rajputi Heritage */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-[#2c3e50] font-sans font-medium tracking-wide text-center mt-3 leading-snug">
                          Authentic Rajputi Ornaments
                        </p>
                      </div>

                      {/* Circle 8 - Video Consultation */}
                      <div className="flex flex-col items-center max-w-[120px]">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#031838] text-white flex flex-col justify-center items-center shadow-md transform transition-transform duration-300 hover:scale-105">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
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
          )}

          {/* ==========================================
            B. CATALOG / SHOP COLLECTION PAGE VIEW
            ========================================== */}
          {currentPage === 'collections' && (
            <div className={`transition-colors duration-500 min-h-screen pb-32 sm:pb-20 ${isCatalogDark ? 'bg-[#F4ECF9] text-[#4A126D]' : 'bg-[#FCFAFF] text-[#4A126D]'}`}>

              {/* Full-width Banner Carousel — outside constrained container */}
              <BannerCarousel banners={[banner1, banner2]} />

              <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 space-y-4 sm:space-y-12 animate-slide-up pt-4 sm:pt-10">

              </div> {/* Close hero wrapper div */}

              {/* 3. Products List Container */}
              <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 space-y-4 sm:space-y-12">

                {/* Split Layout: Sidebar Filters (left) & Products Grid (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-start">

                  {/* Left Sidebar Filters Panel — Desktop only, hidden on mobile */}
                  <aside className="hidden lg:block col-span-12 lg:col-span-3 lg:sticky lg:top-24 bg-white border border-[#DDA0DD]/20 rounded-xl sm:rounded-3xl shadow-[0_8px_24px_rgba(63,31,84,0.04)] text-left relative z-20 self-start" style={{ maxHeight: 'none', overflowY: 'visible', scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent', padding: '0' }}>


                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-100 px-3 sm:px-5 py-2 sm:py-3 sticky top-0 bg-white z-10 rounded-t-xl sm:rounded-t-3xl">
                      <h3 className="serif-luxury text-xs sm:text-base font-bold text-[#4A126D] flex items-center gap-1 tracking-wide">
                        <span className="text-[10px] sm:text-sm">✨</span> Filters
                      </h3>
                      <button
                        onClick={() => { setMetalFilter('all'); setPurityFilter('all'); setMaxPriceFilter(1000000); setPriceFilter('all'); setTypeFilter('all'); setGenderFilter('all'); setStoneFilter('all'); setOccasionFilter('all'); }}
                        className="text-[7px] sm:text-[9px] uppercase tracking-widest font-black text-[#DDA0DD] hover:text-[#4A126D] transition-colors cursor-pointer border border-[#DDA0DD]/30 rounded-md sm:rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="px-3 sm:px-5 py-2 sm:py-4 space-y-0 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent' }}>

                      {/* PRICE */}
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Price</span>
                        <div className="space-y-1 sm:space-y-2">
                          {[
                            { label: 'Below Rs. 10,000', val: 10000 },
                            { label: 'Rs. 10,000 – Rs. 20,000', val: 20000 },
                            { label: 'Rs. 20,000 – Rs. 30,000', val: 30000 },
                            { label: 'Rs. 30,000 – Rs. 40,000', val: 40000 },
                            { label: 'Rs. 40,000 – Rs. 50,000', val: 50000 },
                            { label: 'Rs. 50,000 and Above', val: 1000000 },
                          ].map(({ label, val }) => (
                            <label key={val} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                              <input type="radio" name="price" checked={maxPriceFilter === val} onChange={() => setMaxPriceFilter(val)} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                              <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${maxPriceFilter === val ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* TYPE */}
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Type</span>
                        <div className="space-y-1 sm:space-y-2">
                          {['Earrings', 'Rings', 'Pendants', 'Necklaces', 'Bangles', 'Bracelets', 'Mangalsutra', 'Chains', 'Nose Pins', 'Anklets', 'Kids Bangles', 'Kids Rings', 'Cufflinks', 'Brooch'].map(t => (
                            <label key={t} className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group">
                              <input type="radio" name="type" checked={typeFilter === t} onChange={() => setTypeFilter(prev => prev === t ? 'all' : t)} className="accent-[#4A126D] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 cursor-pointer" />
                              <span className={`text-[9px] sm:text-[11px] font-sans leading-none ${typeFilter === t ? 'text-[#4A126D] font-bold' : 'text-gray-600 group-hover:text-[#4A126D]'}`}>{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* METAL */}
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
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
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
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
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
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
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
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
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
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
                      <div className="border-b border-gray-100 py-1.5 sm:py-3">
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-1.5 sm:mb-2.5">Category</span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {['Collections', 'Rings', 'Earrings', 'Necklace', 'Mangalsutra', 'Bracelets', 'Bangles', 'Gold Coins', 'Anklets', 'Men Jewellery', 'Kids Jewellery', 'Gifts & Pooja'].map(cat => {
                            const isActive = activeCategoryTab === cat;
                            return (
                              <button key={cat} onClick={() => changeCategoryTab(cat)}
                                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[7px] sm:text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border cursor-pointer ${isActive ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-[#FCFAFF] text-gray-600 border-gray-200 hover:border-[#4A126D] hover:text-[#4A126D]'}`}>
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* BESPOKE CTA */}
                      <div className="pt-2 sm:pt-4 text-center space-y-1.5 sm:space-y-2">
                        <p className="text-[7px] sm:text-[9px] text-gray-400 font-light leading-relaxed">Can't find your dream piece? Request bespoke craftsmanship.</p>
                        <button onClick={() => { triggerAudio('shimmer'); setCustomDesignOpen(true); }}
                          className="w-full py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#4A126D]/10 hover:bg-[#4A126D] text-[#4A126D] hover:text-white border border-[#4A126D]/30 hover:border-transparent text-[7px] sm:text-[8.5px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer">
                          ✍️ Create Custom Design
                        </button>
                      </div>

                    </div> {/* Close scrollable filter content wrapper */}

                  </aside>

                  {/* ═══════════════════════════════════════════
                    MOBILE: Sticky Sort + Filter Action Bar
                    ═══════════════════════════════════════════ */}
                  {currentPage === 'collections' && (
                    <div className={`lg:hidden fixed bottom-[42px] left-0 w-full z-30 border-t flex items-center justify-center shadow-[0_-4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors duration-500 ${isCatalogDark
                        ? "bg-[#1D0E29]/95 border-gold/15 text-white shadow-2xl"
                        : "bg-[#FCFAFF]/95 border-[#DDA0DD]/20 text-[#4A126D]"
                      }`}>
                      {/* Pincode */}
                      <button
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest border-r active:bg-black/5 transition-colors ${isCatalogDark ? "border-gold/15 text-white active:bg-white/5" : "border-[#DDA0DD]/20 text-[#4A126D] active:bg-black/5"
                          }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Pincode
                      </button>
                      {/* Sort */}
                      <button
                        onClick={() => { triggerAudio('click'); setMobileSortOpen(true); }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest border-r active:bg-black/5 transition-colors ${isCatalogDark ? "border-gold/15 text-white active:bg-white/5" : "border-[#DDA0DD]/20 text-[#4A126D] active:bg-black/5"
                          }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                        Sort
                      </button>
                      {/* Filter */}
                      <button
                        onClick={() => { triggerAudio('click'); setMobileFilterOpen(true); }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[9px] font-bold uppercase tracking-widest active:bg-black/5 transition-colors ${isCatalogDark ? "text-white active:bg-white/5" : "text-[#4A126D] active:bg-black/5"
                          }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filter
                      </button>
                    </div>
                  )}

                  {/* ═══════════════════════════════════════════
                    MOBILE: Sort Popup Drawer
                    ═══════════════════════════════════════════ */}
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
                            <button onClick={() => setMobileSortOpen(false)} className="text-gray-400 hover:text-[#4A126D] transition-colors p-1 cursor-pointer">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                          <div className="py-2 px-5 space-y-0">
                            {[
                              { val: 'popularity', label: 'Popularity' },
                              { val: 'newest', label: 'Newest First' },
                              { val: 'price_low', label: 'Price: Low to High' },
                              { val: 'price_high', label: 'Price: High to Low' },
                            ].map(opt => (
                              <button
                                key={opt.val}
                                onClick={() => { setSortFilter(opt.val); setMobileSortOpen(false); triggerAudio('click'); }}
                                className={`w-full text-left py-3 px-3 rounded-lg text-xs font-sans transition-colors cursor-pointer ${sortFilter === opt.val ? 'bg-[#4A126D]/8 text-[#4A126D] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
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

                  {/* ═══════════════════════════════════════════
                    MOBILE: Full-Screen Filter Drawer
                    ═══════════════════════════════════════════ */}
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
                                onClick={() => { setMetalFilter('all'); setPurityFilter('all'); setMaxPriceFilter(1000000); setPriceFilter('all'); setTypeFilter('all'); setGenderFilter('all'); setStoneFilter('all'); setOccasionFilter('all'); }}
                                className="text-[8px] uppercase tracking-widest font-black text-[#DDA0DD] hover:text-[#4A126D] transition-colors cursor-pointer"
                              >
                                Clear All
                              </button>
                              <button onClick={() => setMobileFilterOpen(false)} className="text-gray-400 hover:text-[#4A126D] transition-colors p-1 cursor-pointer">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          </div>

                          {/* Scrollable Filter Body */}
                          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#DDA0DD transparent' }}>

                            {/* PRICE */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Price</span>
                              <div className="space-y-1.5">
                                {[
                                  { label: 'Below Rs. 10,000', val: 10000 },
                                  { label: 'Rs. 10,000 – Rs. 20,000', val: 20000 },
                                  { label: 'Rs. 20,000 – Rs. 30,000', val: 30000 },
                                  { label: 'Rs. 30,000 – Rs. 40,000', val: 40000 },
                                  { label: 'Rs. 40,000 – Rs. 50,000', val: 50000 },
                                  { label: 'Rs. 50,000 and Above', val: 1000000 },
                                ].map(({ label, val }) => (
                                  <label key={val} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="mob-price" checked={maxPriceFilter === val} onChange={() => setMaxPriceFilter(val)} className="accent-[#4A126D] w-3 h-3 cursor-pointer" />
                                    <span className={`text-[10px] font-sans leading-none ${maxPriceFilter === val ? 'text-[#4A126D] font-bold' : 'text-gray-600'}`}>{label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* TYPE */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Type</span>
                              <div className="grid grid-cols-2 gap-1.5">
                                {['Earrings', 'Rings', 'Pendants', 'Necklaces', 'Bangles', 'Bracelets', 'Mangalsutra', 'Chains', 'Nose Pins', 'Anklets', 'Kids Bangles', 'Kids Rings', 'Cufflinks', 'Brooch'].map(t => (
                                  <label key={t} className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="mob-type" checked={typeFilter === t} onChange={() => setTypeFilter(prev => prev === t ? 'all' : t)} className="accent-[#4A126D] w-3 h-3 cursor-pointer" />
                                    <span className={`text-[10px] font-sans leading-none ${typeFilter === t ? 'text-[#4A126D] font-bold' : 'text-gray-600'}`}>{t}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* METAL */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Metal</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['All', 'Gold', 'Silver', 'Rose Gold', 'White Gold', 'Platinum', 'Plain Gold'].map(m => (
                                  <button key={m} onClick={() => setMetalFilter(m.toLowerCase())}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${metalFilter === m.toLowerCase() ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                                    {m}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* GOLD PURITY */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Gold Purity</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['All', '14K', '18K', '22K', '24K'].map(p => (
                                  <button key={p} onClick={() => setPurityFilter(p === 'All' ? 'all' : p)}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${purityFilter === (p === 'All' ? 'all' : p) ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* GENDER */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Gender</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['All', 'Women', 'Men', 'Unisex'].map(g => (
                                  <button key={g} onClick={() => setGenderFilter(g.toLowerCase())}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${genderFilter === g.toLowerCase() ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                                    {g}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* STONES */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Stones</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['Diamond', 'Ruby', 'Sapphire', 'Emerald', 'Pearl', 'Topaz', 'Amethyst', 'Garnet', 'Opal', 'Citrine', 'Aquamarine'].map(s => (
                                  <button key={s} onClick={() => setStoneFilter(prev => prev === s ? 'all' : s)}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${stoneFilter === s ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* OCCASION */}
                            <div className="border-b border-gray-100 py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Occasion</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['Everyday Wear', 'Festive', 'Wedding', 'Engagement', 'Anniversary', 'Gifting', 'Workwear', 'Romantic', 'Vacation', 'Special Occasion', 'Valentine'].map(o => (
                                  <button key={o} onClick={() => setOccasionFilter(prev => prev === o ? 'all' : o)}
                                    className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${occasionFilter === o ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
                                    {o}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* CATEGORY */}
                            <div className="py-2">
                              <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#1B1B1B] block mb-2">Category</span>
                              <div className="flex flex-wrap gap-1.5">
                                {['Collections', 'Rings', 'Earrings', 'Necklace', 'Mangalsutra', 'Bracelets', 'Bangles', 'Gold Coins', 'Anklets', 'Men Jewellery', 'Kids Jewellery', 'Gifts & Pooja'].map(cat => {
                                  const isActive = activeCategoryTab === cat;
                                  return (
                                    <button key={cat} onClick={() => changeCategoryTab(cat)}
                                      className={`px-2.5 py-1 rounded-full text-[9px] font-semibold border transition-all cursor-pointer ${isActive ? 'bg-[#4A126D] text-white border-[#4A126D]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#4A126D]'}`}>
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
                              className="w-full py-3 rounded-xl bg-[#4A126D] text-white text-[10px] uppercase font-bold tracking-widest shadow-lg hover:bg-[#DDA0DD] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              Apply Filters
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  {/* Right Products panel: grid and header sorting actions */}
                  <div className="col-span-12 lg:col-span-9 space-y-3 sm:space-y-6">

                    {/* Sorting Header Row */}
                    <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 bg-white border border-[#DDA0DD]/15 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-3 sm:px-6 shadow-[0_4px_16px_rgba(63,31,84,0.03)] text-[9px] sm:text-xs">
                      <span className="text-gray-500 font-medium whitespace-nowrap">
                        Showing <strong className="text-[#4A126D]">{filteredJewellery.length}</strong> ornaments
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
                          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gold/10 hover:bg-gold text-gold hover:text-white border border-gold hover:border-transparent text-[9px] uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer shadow-sm ml-auto"
                        >
                          ✍️ Custom Design
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
                      <div className="py-20 px-6 text-center border rounded-[2.5rem] shadow-sm max-w-md mx-auto space-y-5 animate-fade-in bg-white border-[#FBF9FF] text-[#4A126D]">
                        <div className="w-16 h-16 bg-[#FBF9FF]/10 border border-[#DDA0DD]/30 rounded-full flex items-center justify-center mx-auto text-[#DDA0DD] text-2xl shadow-inner animate-float-gentle">
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
                            setMaxPriceFilter(1000000);
                          }}
                          className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 shadow-md cursor-pointer border bg-[#4A126D] text-white hover:bg-[#DDA0DD] border-transparent"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      /* Normal Listing State with Editorial Luxury Cards */
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5 animate-fade-in">
                          {paginatedProducts.map((prod) => {
                            const isWishlisted = wishlistItems.some(w => w.id === prod.id);
                            return (
                              <div
                                key={prod.id}
                                onClick={() => navigateToPDP(prod)}
                                className="group rounded-xl sm:rounded-3xl p-2 sm:p-5 flex flex-col justify-between border border-[#EAEAEA] transition-all duration-300 relative cursor-pointer overflow-hidden bg-white text-[#1B1B1B] shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:border-[#DDA0DD]/45 hover:-translate-y-1.5 h-[300px] sm:h-[530px]"
                              >
                                {/* Image, Overlays & Spotlight */}
                                <div className="aspect-square rounded-xl sm:rounded-[1.5rem] overflow-hidden relative image-zoom-container bg-[#FCFAFF] border border-[#DDA0DD]/5">
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.08)_100%)] mix-blend-multiply pointer-events-none z-10"></div>

                                  <img
                                    src={prod.img}
                                    alt={prod.name}
                                    className="w-full h-full object-cover scale-100 group-hover:scale-108 transition-transform duration-[1200ms] ease-out"
                                  />

                                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 z-20">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); triggerAudio('click'); setSelectedProduct(prod); }}
                                      className="bg-white text-[#1B1B1B] text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 rounded-full shadow-lg hover:bg-[#DDA0DD] hover:text-white transition-all transform translate-y-3 group-hover:translate-y-0 duration-500 cursor-pointer"
                                    >
                                      Quick View
                                    </button>
                                  </div>

                                  {prod.badge && (
                                    <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-[#1B1B1B] text-[#DDA0DD] text-[6px] sm:text-[8px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider uppercase border border-[#DDA0DD]/30 z-20 shadow-sm animate-pulse-slow">
                                      {prod.badge}
                                    </span>
                                  )}

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      triggerAudio('click');
                                      toggleWishlist(prod);
                                    }}
                                    className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1.5 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#1B1B1B] shadow-md transition-all duration-300 hover:scale-105 active:scale-95 z-20 focus:outline-none cursor-pointer"
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
                                <div className="space-y-1 sm:space-y-2 mt-1.5 sm:mt-4 flex-1 flex flex-col justify-between">
                                  <div className="space-y-0.5 sm:space-y-1">
                                    <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#DDA0DD] font-bold block">
                                      {prod.subCategory || prod.category}
                                    </span>
                                    <h3 className="serif-luxury font-bold text-[10px] sm:text-base leading-tight sm:leading-snug group-hover:text-[#DDA0DD] transition-colors duration-300 line-clamp-1 text-[#1B1B1B]">
                                      {prod.name}
                                    </h3>
                                    <p className="text-[8px] sm:text-[10px] font-sans font-light leading-relaxed normal-case text-[#666666]/90 line-clamp-1 sm:line-clamp-2 hidden sm:block">
                                      {prod.desc}
                                    </p>
                                  </div>

                                  <div className="pt-1 sm:pt-2.5 border-t border-gray-100/80 flex items-center justify-between mt-auto">
                                    <span className="font-extrabold text-[10px] sm:text-sm text-[#DDA0DD] tracking-wide">
                                      ₹{formatPrice(prod.price)}
                                    </span>
                                    <span className="text-[6px] sm:text-[8.5px] font-semibold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase tracking-widest bg-[#DDA0DD]/10 text-[#DDA0DD] border border-[#DDA0DD]/20 hidden sm:inline">
                                      {prod.carat || '22K Gold'}
                                    </span>
                                  </div>
                                </div>

                                {/* Add to Cart button */}
                                <div className="mt-1.5 sm:mt-4 pt-0 sm:pt-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      triggerAudio('shimmer');
                                      handleAddToCart(prod);
                                    }}
                                    className="w-full text-[7px] sm:text-[9px] uppercase font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 tracking-widest shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer focus:outline-none bg-[#1B1B1B] text-white hover:bg-[#DDA0DD]"
                                  >
                                    <span className="text-[8px] sm:text-sm">🛒</span> Add To Bag
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-8 pb-4 select-none flex-wrap">
                    <button
                      onClick={() => { if (collectionsPage > 1) { triggerAudio('click'); setCollectionsPage(collectionsPage - 1); window.scrollTo({ top: 400, behavior: 'smooth' }); } }}
                      disabled={collectionsPage === 1}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${collectionsPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' : 'bg-white text-[#4A126D] border-[#DDA0DD]/40 hover:border-[#DDA0DD] hover:bg-[#4A126D] hover:text-white shadow-sm'}`}
                    >
                      ← Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = collectionsPage === pageNum;
                      if (totalPages > 7 && pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - collectionsPage) > 2) return null;
                      return (
                        <button key={pageNum} onClick={() => { triggerAudio('click'); setCollectionsPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer flex items-center justify-center ${isActive ? 'bg-[#4A126D] text-white border-[#4A126D] shadow-[0_0_15px_rgba(74,18,109,0.3)] scale-110' : 'bg-white text-gray-600 border-gray-200 hover:border-[#DDA0DD] hover:text-[#4A126D]'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => { if (collectionsPage < totalPages) { triggerAudio('click'); setCollectionsPage(collectionsPage + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); } }}
                      disabled={collectionsPage === totalPages}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${collectionsPage === totalPages ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200' : 'bg-white text-[#4A126D] border-[#DDA0DD]/40 hover:border-[#DDA0DD] hover:bg-[#4A126D] hover:text-white shadow-sm'}`}
                    >
                      Next →
                    </button>
                  </div>
                )}


              </div>
            </div>
          )}

          {currentPage === 'product-detail' && detailProduct && (
            <div className="bg-[#14001F] text-white min-h-screen pb-24 relative select-none overflow-hidden card-texture-light">

              {/* Ambient Background Spotlights */}
              <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#DDA0DD]/5 blur-[140px] pointer-events-none animate-pulse-slow" />
              <div className="absolute bottom-[15%] right-[2%] w-[700px] h-[700px] rounded-full bg-[#4A126D]/20 blur-[180px] pointer-events-none animate-[spotlight-glow_12s_infinite_ease-in-out]" />

              {/* High-End Floating Luxury Particles/Sparks */}
              <div className="absolute top-[18%] left-[20%] w-2 h-2 rounded-full bg-[#DDA0DD]/45 blur-[0.5px] animate-particle-1 pointer-events-none" />
              <div className="absolute top-[45%] right-[28%] w-3 h-3 rounded-full bg-[#DDA0DD]/35 blur-[1.5px] animate-particle-2 pointer-events-none" />
              <div className="absolute bottom-[35%] left-[42%] w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/60 blur-[0.5px] animate-particle-3 pointer-events-none" />
              <div className="absolute top-[75%] right-[15%] w-2 h-2 rounded-full bg-[#DDA0DD]/40 blur-[1px] animate-particle-1 pointer-events-none" style={{ animationDelay: '-6s' }} />

              <div className="max-w-7xl mx-auto px-6 pt-10 space-y-12 animate-slide-up relative z-10">

                {/* Luxury Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2.5 text-[9.5px] tracking-[0.25em] uppercase font-bold text-white/50 font-sans">
                  <button onClick={() => navigateTo('home')} className="hover:text-[#DDA0DD] transition-colors duration-300">Maison Home</button>
                  <span className="text-[#DDA0DD]/60 font-black text-xs leading-none mt-[-2px]">✦</span>
                  <button onClick={() => handleCategoryNav(detailProduct.category)} className="hover:text-[#DDA0DD] transition-colors duration-300 capitalize">{detailProduct.category} Collection</button>
                  <span className="text-[#DDA0DD]/60 font-black text-xs leading-none mt-[-2px]">✦</span>
                  <span className="text-white/90 truncate font-extrabold">{detailProduct.name}</span>
                </div>

                {/* Two-Column Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                  {/* LEFT COLUMN: Luxury Product Gallery & Credibility Ledger */}
                  <div className="lg:col-span-6 space-y-8">

                    {/* Premium Large Hero Frame */}
                    <div className="relative border-2 border-[#DDA0DD]/35 rounded-[2.5rem] p-8 bg-[#1C022B]/75 backdrop-blur-md overflow-hidden aspect-square flex items-center justify-center shadow-[0_25px_60px_rgba(212,175,55,0.18)] group transition-all duration-700 hover:border-[#DDA0DD]/60 hover:shadow-[0_30px_70px_rgba(212,175,55,0.3)]">

                      {/* Spotlight Glow behind image */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,transparent_75%)] pointer-events-none" />

                      {/* Corner Symmetrical Filigree Gold Lines */}
                      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#DDA0DD]/45" />
                      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#DDA0DD]/45" />
                      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#DDA0DD]/45" />
                      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#DDA0DD]/45" />

                      {/* Royal Fine Inner Lining Border */}
                      <div className="absolute inset-4 border border-[#DDA0DD]/10 pointer-events-none rounded-[2rem]" />

                      {/* Stately Floating Badge */}
                      {detailProduct.badge && (
                        <span className="absolute top-8 left-8 text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] bg-gradient-to-r from-[#DDA0DD] via-[#E7C873] to-[#4A126D] text-black shadow-lg z-10 border border-[#DDA0DD]/40">
                          👑 {detailProduct.badge}
                        </span>
                      )}

                      {/* Interactive Zoom Image */}
                      <img
                        src={detailActiveImg || detailProduct.img}
                        alt={detailProduct.name}
                        className="relative w-[85%] h-[85%] object-contain transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                      />

                      {/* Atelier Certified Medallion */}
                      <div className="absolute bottom-8 right-8 flex items-center gap-2 bg-[#13071C]/90 border border-[#DDA0DD]/45 px-3 py-1.5 rounded-full shadow-lg z-10 transition-transform duration-500 group-hover:scale-105">
                        <svg className="w-3.5 h-3.5 text-[#DDA0DD] animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#DDA0DD] font-sans">Atelier Certified</span>
                      </div>

                    </div>

                    {/* Symmetrical Thumbnails Row */}
                    <div className="grid grid-cols-4 gap-5">
                      {[
                        { img: detailProduct.img, label: 'Signature Angle' },
                        { img: udaipurFiligreeSolitaire, label: 'Alternative Perspective' },
                        { img: royalChitaiKadas, label: 'Detail Showcase' },
                        { img: emeraldSovereignRing, label: 'Atelier Spotlight' }
                      ].map((thumb, idx) => {
                        const isActive = (detailActiveImg || detailProduct.img) === thumb.img;
                        return (
                          <button
                            key={idx}
                            onClick={() => { triggerAudio('click'); setDetailActiveImg(thumb.img); }}
                            className={`relative rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-2 transition-all duration-500 cursor-pointer focus:outline-none hover:-translate-y-1 ${isActive
                              ? 'bg-[#1C022B] border-2 border-[#DDA0DD] shadow-[0_0_20px_rgba(212,175,55,0.45)] scale-[1.04]'
                              : 'bg-[#1C022B]/40 border border-[#DDA0DD]/20 hover:border-[#DDA0DD]/60'
                              }`}
                            title={thumb.label}
                          >
                            <img src={thumb.img} alt={thumb.label} className="w-full h-full object-cover rounded-xl filter drop-shadow-md" />
                            <div className={`absolute inset-0 bg-[#DDA0DD]/5 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100 hover:opacity-0'}`} />
                          </button>
                        );
                      })}
                    </div>

                    {/* Specifications Card (Section 3) */}
                    <div className="glass-luxury-dark rounded-[2rem] p-7 space-y-5 border border-[#DDA0DD]/30 shadow-[0_15px_45px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-[#DDA0DD]/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDA0DD]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex items-center justify-between border-b border-[#DDA0DD]/25 pb-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-[#DDA0DD] text-sm animate-pulse-slow">✦</span>
                          <span className="serif-luxury text-sm font-bold tracking-[0.15em] text-[#DDA0DD] uppercase">Atelier Authenticity Ledger</span>
                        </div>
                        <span className="text-[8px] tracking-widest px-2.5 py-0.5 rounded-full font-bold uppercase bg-[#DDA0DD]/15 text-[#DDA0DD] border border-[#DDA0DD]/20">
                          NABL Certified
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-sans">
                        <div className="space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-white/50 font-bold">Hallmark Certification</span>
                          <span className="font-extrabold block text-white text-[13px] tracking-wide">{detailProduct.carat || 'BIS 22K (916) Gold'}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-white/50 font-bold">Estimated Net Weight</span>
                          <span className="font-extrabold block text-white text-[13px] tracking-wide">{detailProduct.weight}</span>
                        </div>
                        <div className="col-span-2 border-t border-white/5 pt-3.5 space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-white/50 font-bold">Purity Standard &amp; Laboratory Registry</span>
                          <span className="font-light block text-[10.5px] text-white/80 leading-relaxed">{detailProduct.purityInfo || 'BIS 916 Government Laser hallmarked stamps & laboratory registry.'}</span>
                        </div>
                        <div className="col-span-2 border-t border-white/5 pt-3.5 space-y-1">
                          <span className="block text-[9px] uppercase tracking-wider text-white/55 font-bold">Royal Handforging Details</span>
                          <span className="font-light block text-[10.5px] text-white/80 leading-relaxed">{detailProduct.makingCharges || '₹380/gram high-fashion Rajasthan setting charges included.'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial EMI Estimator (Section 6) */}
                    <div className="glass-luxury-dark rounded-[2rem] p-7 space-y-5 border border-[#DDA0DD]/30 shadow-[0_15px_45px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-[#DDA0DD]/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDA0DD]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex justify-between items-center border-b border-[#DDA0DD]/25 pb-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-[#DDA0DD] text-xs">📈</span>
                          <span className="serif-luxury text-sm font-bold tracking-[0.15em] text-[#DDA0DD] uppercase">Dynamic Atelier EMI Calculator</span>
                        </div>
                        <span className="text-[8px] tracking-widest px-2.5 py-0.5 rounded-full font-bold uppercase bg-[#DDA0DD]/15 text-[#DDA0DD] border border-[#DDA0DD]/20">
                          9.5% Compound Interest
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                        <div className="space-y-2">
                          <label htmlFor="emi-months-select" className="text-[9px] uppercase tracking-wider block text-white/60 font-bold">Commitment Period</label>
                          <select
                            id="emi-months-select"
                            value={emiMonths}
                            onChange={(e) => setEmiMonths(+e.target.value)}
                            className="w-full bg-[#1C022B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#DDA0DD] cursor-pointer"
                          >
                            <option value="3">3 Months (Short Term)</option>
                            <option value="6">6 Months (★ Popular Choice)</option>
                            <option value="9">9 Months</option>
                            <option value="12">12 Months (Long Term)</option>
                          </select>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-[#DDA0DD]/30 transition-all duration-300 shadow-inner">
                          <span className="text-[9px] uppercase tracking-widest block text-white/50">Monthly Installment</span>
                          <span className="font-extrabold text-xl block mt-1.5 text-[#DDA0DD] filter drop-shadow-[0_1px_5px_rgba(212,175,55,0.2)] font-mono">
                            ₹{calculatedEmi.toLocaleString('en-IN')}/mo
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Feasibility checker (Section 7) */}
                    <div className="glass-luxury-dark rounded-[2rem] p-7 space-y-5 border border-[#DDA0DD]/30 shadow-[0_15px_45px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:border-[#DDA0DD]/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]">

                      <div className="flex items-center space-x-2.5 border-b border-[#DDA0DD]/25 pb-3">
                        <span className="text-[#DDA0DD] text-xs">🚚</span>
                        <span className="serif-luxury text-sm font-bold tracking-[0.15em] text-[#DDA0DD] uppercase">Delivery Feasibility &amp; Pickup</span>
                      </div>

                      <form onSubmit={handleZipCheck} className="flex gap-2.5">
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="Input 6-digit Pincode (e.g. 334001)"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/55 focus:outline-none focus:border-[#DDA0DD] focus:ring-1 focus:ring-[#DDA0DD]/20 transition-all font-sans"
                        />
                        <button
                          type="submit"
                          className="px-6 bg-gradient-to-r from-[#DDA0DD] to-[#BA55D3] hover:from-[#BA55D3] hover:to-[#4A126D] text-[#13071C] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_18px_rgba(212,175,55,0.4)] cursor-pointer active:scale-95"
                        >
                          {zipChecking ? 'Verifying...' : 'Verify'}
                        </button>
                      </form>

                      {zipCheckResult && (
                        <div className={`p-4 rounded-xl text-[11px] font-semibold transition-all border leading-relaxed font-sans ${zipCheckResult.status === 'success'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/25 shadow-[0_0_15px_rgba(244,63,94,0.08)]'
                          }`}>
                          <div className="flex items-center gap-1.5 font-bold mb-0.5">
                            <span>{zipCheckResult.status === 'success' ? '✦ Dispatch Verified:' : '✕ Delivery Restricted:'}</span>
                          </div>
                          {zipCheckResult.msg}
                          {zipCheckResult.status === 'success' && ' • Complementary Bikaner Flagship Lounge Pickup Available.'}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Product Information & Interactive Concierge */}
                  <div className="lg:col-span-6 space-y-8">

                    {/* Brand Header */}
                    <div className="space-y-3 relative">
                      <div className="flex items-center space-x-3">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#DDA0DD] font-extrabold block font-sans">{detailProduct.subCategory || 'Royal Signature Piece'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/50" />
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                          ✓ In Stock
                        </span>
                      </div>
                      <h1 className="serif-luxury text-4xl lg:text-5.5xl font-semibold text-white leading-tight font-serif tracking-wide filter drop-shadow-md">
                        {detailProduct.name}
                      </h1>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-[2px] bg-gradient-to-r from-[#DDA0DD] to-transparent"></div>
                        <span className="text-[10px] text-[#DDA0DD] font-bold animate-pulse-slow">✦</span>
                      </div>
                    </div>

                    {/* Estimated Price & Value Locks */}
                    <div className="bg-gradient-to-r from-[#1C022B] via-[#350b52] to-[#1C022B] border-2 border-[#DDA0DD]/45 rounded-[2rem] p-7 shadow-[0_20px_45px_rgba(212,175,55,0.08)] flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-24 h-24 bg-[#DDA0DD]/5 rounded-br-full pointer-events-none" />

                      <div className="text-center sm:text-left relative z-10 space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#DDA0DD] font-bold block font-sans">Estimated Valued Price</span>
                        <span className="font-extrabold text-4xl sm:text-5xl mt-1.5 block text-transparent bg-clip-text bg-gradient-to-r from-[#DDA0DD] via-[#F4ECF9] to-[#BA55D3] filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] serif-luxury tracking-wide">
                          ₹{formatPrice(detailProduct.price)}
                        </span>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center sm:text-right shrink-0 relative z-10 shadow-inner max-w-[200px] hover:border-[#DDA0DD]/30 transition-all duration-300">
                        <span className="text-[9px] uppercase font-bold tracking-[0.15em] block text-[#DDA0DD] font-sans">Lifetime Exchange Lock</span>
                        <span className="text-[9px] font-light block mt-1 text-white/70 font-sans leading-normal">100% Value Buyback Assured by Ateliers</span>
                      </div>
                    </div>

                    {/* Craftsmanship Narrative */}
                    <p className="text-sm font-sans font-light leading-relaxed text-white/80 tracking-wide text-justify pl-3 border-l-2 border-[#DDA0DD]/25 py-1">
                      {detailProduct.desc}
                    </p>

                    {/* Atelier Bespoke Options Customizer (Section 5) */}
                    <div className="glass-luxury-dark rounded-[2.5rem] p-8 space-y-6 border border-[#DDA0DD]/30 shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDA0DD]/5 rounded-bl-full pointer-events-none" />

                      <div className="flex items-center space-x-2 border-b border-[#DDA0DD]/25 pb-3">
                        <span className="text-[#DDA0DD] text-xs">✦</span>
                        <span className="font-serif text-sm tracking-[0.2em] font-bold text-[#DDA0DD] uppercase">Bespoke Atelier Customizer</span>
                      </div>

                      <div className="space-y-5 text-xs font-sans">
                        {/* Dynamic Sizing Customizer */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                          {/* Metal Type custom Selector */}
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-wider font-extrabold block text-white/60">Atelier Metal Type</label>
                            <div className="flex flex-col gap-2">
                              {['22K Yellow Gold', '18K Rose Gold', 'PT 950 Platinum'].map((metal) => {
                                const isActive = pdpSelectedMetal === metal;
                                return (
                                  <button
                                    key={metal}
                                    type="button"
                                    onClick={() => { triggerAudio('click'); setPdpSelectedMetal(metal); }}
                                    className={`py-3 px-3 text-[10px] font-bold rounded-xl border uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${isActive
                                      ? 'bg-[#DDA0DD]/15 border-[#DDA0DD] text-[#DDA0DD] shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                                      }`}
                                  >
                                    <span>{metal}</span>
                                    <span className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-[#DDA0DD] bg-[#DDA0DD]' : 'border-white/30'
                                      }`}>
                                      {isActive && <span className="w-1 h-1 rounded-full bg-[#13071C]" />}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Gemstone custom Selector */}
                          <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-wider font-extrabold block text-white/60">Primary Gemstone</label>
                            <div className="flex flex-col gap-2">
                              {['Royal Syndicate Diamond', 'Maison Emerald', 'Burmese Ruby'].map((stone) => {
                                const isActive = pdpSelectedStone === stone;
                                return (
                                  <button
                                    key={stone}
                                    type="button"
                                    onClick={() => { triggerAudio('click'); setPdpSelectedStone(stone); }}
                                    className={`py-3 px-3 text-[10px] font-bold rounded-xl border uppercase tracking-wider text-left transition-all flex items-center justify-between cursor-pointer focus:outline-none ${isActive
                                      ? 'bg-[#DDA0DD]/15 border-[#DDA0DD] text-[#DDA0DD] shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                                      }`}
                                  >
                                    <span>{stone.split(' ')[1] || stone}</span>
                                    <span className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-[#DDA0DD] bg-[#DDA0DD]' : 'border-white/30'
                                      }`}>
                                      {isActive && <span className="w-1 h-1 rounded-full bg-[#13071C]" />}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                          {/* Custom Engraving */}
                          <div className="space-y-2">
                            <label htmlFor="pdp-engraving" className="text-[9px] uppercase tracking-wider font-extrabold block text-white/60">Bespoke Engraving (Initials)</label>
                            <div className="relative">
                              <input
                                id="pdp-engraving"
                                type="text"
                                placeholder="e.g. Maharani ❤️ 1924"
                                value={customEngraving}
                                onChange={(e) => setCustomEngraving(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#DDA0DD] focus:ring-1 focus:ring-[#DDA0DD]/20 transition-all duration-300"
                              />
                              <span className="absolute right-3.5 top-3 text-[10px] text-white/30 pointer-events-none">✍️</span>
                            </div>
                          </div>

                          {/* Size Dropdown */}
                          {detailProduct.category === 'gold' || detailProduct.category === 'platinum' ? (
                            <div className="space-y-2">
                              <label htmlFor="pdp-ring-size" className="text-[9px] uppercase tracking-wider font-extrabold block text-white/60">Showroom Ring Size</label>
                              <select
                                id="pdp-ring-size"
                                value={selectedRingSize}
                                onChange={(e) => setSelectedRingSize(e.target.value)}
                                className="w-full bg-[#1C022B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#DDA0DD] cursor-pointer"
                              >
                                <option value="10">Size 10 (Slight Fit)</option>
                                <option value="12">Size 12 (Bestselling Standard)</option>
                                <option value="14">Size 14 (Generous Ring)</option>
                                <option value="16">Size 16 (Heavy Band)</option>
                              </select>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <label htmlFor="pdp-purity-select" className="text-[9px] uppercase tracking-wider font-extrabold block text-white/60">Purity Standard</label>
                              <select
                                id="pdp-purity-select"
                                value={selectedCaratPurity}
                                onChange={(e) => setSelectedCaratPurity(e.target.value)}
                                className="w-full bg-[#1C022B] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#DDA0DD] cursor-pointer"
                              >
                                <option value="18K">18 Karat Fine Gold</option>
                                <option value="22K">22 Karat Royal Gold (BIS Stamps)</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Terms & Conditions Card (Section 4) */}
                    <div className="glass-luxury-dark rounded-[2rem] p-6 space-y-3.5 border border-[#DDA0DD]/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-[#DDA0DD]/45 group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-[#DDA0DD] text-xs">📄</span>
                          <span className="serif-luxury text-[13px] font-bold tracking-[0.12em] text-[#DDA0DD] uppercase">Maison Guidelines &amp; Policies</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => { triggerAudio('click'); setPdpTcExpanded(!pdpTcExpanded); }}
                          className="text-[9.5px] uppercase tracking-[0.15em] text-[#DDA0DD] hover:text-white font-extrabold focus:outline-none cursor-pointer transition-colors duration-300"
                        >
                          {pdpTcExpanded ? 'Hide Details' : 'View Complete Details'}
                        </button>
                      </div>

                      {/* expandable terms summary */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out text-[11px] text-white/75 leading-relaxed space-y-3 text-justify border-t border-white/10 pt-3.5 font-sans ${pdpTcExpanded ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}>
                        <p className="flex items-start gap-2">
                          <span className="text-[#DDA0DD] font-semibold mt-0.5">•</span>
                          <span><strong>Exchange Integrity:</strong> Standard items carry 100% metal weight buyback protections. Custom customized sets shape unique non-cancellation matrices upon atelier workshop forging commencement.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#DDA0DD] font-semibold mt-0.5">•</span>
                          <span><strong>Lab Certifications:</strong> Official physical certificates containing unique laboratory registration hashes are dispatched securely with transit security teams.</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-[#DDA0DD] font-semibold mt-0.5">•</span>
                          <span><strong>Rajasthan Insured Dispatch:</strong> Hand-couriered within Bikaner and Jaipur regions inside signature steel cases under active transit insurance policies.</span>
                        </p>
                      </div>
                    </div>

                    {/* Purchase Action Buttons (Section 10) */}
                    <div className="flex flex-col gap-4 pt-2">

                      <div className="grid grid-cols-4 gap-3.5 items-stretch">

                        {/* Primary BUY NOW button with gold gradient and lift effect */}
                        <button
                          onClick={() => handleAddToCart({
                            ...detailProduct,
                            carat: `${selectedCaratPurity} / ${pdpSelectedMetal} / Size ${selectedRingSize}`,
                            desc: customEngraving
                              ? `Bespoke customization with Engraving: "${customEngraving}" and primary stone "${pdpSelectedStone}"`
                              : `Maison standard custom set configured with "${pdpSelectedStone}"`
                          })}
                          className="col-span-3 bg-gradient-to-r from-[#DDA0DD] via-[#E7C873] to-[#4A126D] text-[#13071C] font-extrabold text-xs uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_12px_30px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.65)] cursor-pointer text-center relative overflow-hidden shimmer-gold-sweep-hover font-sans"
                        >
                          Buy Masterpiece Now
                        </button>

                        {/* Side T&C Button */}
                        <button
                          onClick={() => { triggerAudio('click'); setPdpTcExpanded(!pdpTcExpanded); }}
                          className={`col-span-1 border-2 rounded-full font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none shadow-md ${pdpTcExpanded
                            ? 'bg-[#DDA0DD] text-[#13071C] border-[#DDA0DD] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-[1.02]'
                            : 'border-[#DDA0DD]/35 text-[#DDA0DD] hover:bg-[#DDA0DD]/10 hover:border-[#DDA0DD]'
                            }`}
                          title="View Guidelines & Policies"
                        >
                          T&amp;C
                        </button>

                      </div>

                      {/* Secondary & Tertiary buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => { triggerAudio('shimmer'); setConsultationModal(true); }}
                          className="py-4 border-2 border-[#DDA0DD]/35 hover:border-[#DDA0DD] bg-white/5 hover:bg-[#DDA0DD]/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#DDA0DD] hover:text-white transition-all duration-300 cursor-pointer text-center focus:outline-none shadow-md"
                        >
                          🎥 Video Consultation
                        </button>
                        <a
                          href="https://wa.me/919783843978?text=Hello%20H.R.%20Jewellers,%20I%27d%20like%20to%20inquire%20about%20your%20signature%20piece."
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => triggerAudio('shimmer')}
                          className="py-4 border-2 border-white/10 hover:border-[#DDA0DD]/50 bg-[#1C022B]/85 hover:bg-[#1C022B] rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white/80 hover:text-[#DDA0DD] transition-all duration-300 text-center flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>💬</span> WhatsApp Expert
                        </a>
                      </div>

                    </div>

                  </div>

                </div>

                {/* SECTION 8: Luxury Trust Strip */}
                <div className="bg-[#1C022B]/75 border border-[#DDA0DD]/25 rounded-[2rem] py-8 px-6 backdrop-blur-md mt-16 shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:border-[#DDA0DD]/45 transition-colors duration-500">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-3 text-center">
                    {[
                      { label: 'BIS Hallmarked', desc: '100% Certified Purity' },
                      { label: 'Certified Diamonds', desc: 'IGI Appraisal Registry' },
                      { label: 'Secure Payments', desc: 'Encrypted Vault Ports' },
                      { label: 'Insured Delivery', desc: 'Transit Doorway Cover' },
                      { label: 'Lifetime Service', desc: 'Atelier Polishing checks' },
                      { label: 'Trusted Since 1924', desc: 'Sovereign Heritage Trust' }
                    ].map((trust, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center px-2 group">
                        <span className="text-[#DDA0DD] text-base font-black mb-1.5 group-hover:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-[10px] text-white font-extrabold tracking-wider uppercase font-sans">{trust.label}</span>
                        <span className="text-[8px] text-white/40 font-light font-sans mt-1">{trust.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 9: Product Story editorial narrative Section */}
                <div className="border border-[#DDA0DD]/25 rounded-[2.5rem] p-8 md:p-14 bg-gradient-to-b from-[#1C022B] to-[#14001F] shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-10 hover:border-[#DDA0DD]/45 transition-colors duration-700">

                  <div className="text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#DDA0DD] font-extrabold block font-sans">EDITORIAL STORYTELLING</span>
                    <h3 className="serif-luxury text-3.5xl sm:text-4xl font-semibold tracking-wider font-serif">Maison Craftsmanship &amp; Heritage</h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DDA0DD]" />
                      <span className="text-[#DDA0DD] text-xs">✦</span>
                      <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DDA0DD]" />
                    </div>
                  </div>

                  {/* Editorial Tabs */}
                  <div className="flex justify-center border-b border-white/10 max-w-lg mx-auto gap-4 md:gap-8">
                    {[
                      { tabId: 'craftsmanship', label: 'Artisan Forging' },
                      { tabId: 'inspiration', label: 'Design Inception' },
                      { tabId: 'heritage', label: 'Heritage Lineage' }
                    ].map((item) => (
                      <button
                        key={item.tabId}
                        onClick={() => { triggerAudio('click'); setPdpActiveTab(item.tabId); }}
                        className={`pb-3 text-[10px] uppercase font-bold tracking-widest text-center cursor-pointer transition-all focus:outline-none border-b-2 ${pdpActiveTab === item.tabId
                          ? 'border-[#DDA0DD] text-[#DDA0DD] font-extrabold'
                          : 'border-transparent text-white/40 hover:text-white/70'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content editorial style */}
                  <div className="max-w-3xl mx-auto text-center space-y-6">
                    {pdpActiveTab === 'craftsmanship' && (
                      <p className="text-xs sm:text-[14px] font-sans font-light leading-relaxed text-white/80 animate-fade-in text-justify sm:text-center">
                        Shaped by generational mastersmiths in our Tilak Nagar ateliers, Bikaner. Every piece begins with solid gold bars melted and refined to BIS Hallmarked specifications. Smiths implement standard Bikaneri filigree (Chitai) work under intense flame grids, setting individual gems with lacquer and gold foils to create a generational seal of luxury.
                      </p>
                    )}

                    {pdpActiveTab === 'inspiration' && (
                      <p className="text-xs sm:text-[14px] font-sans font-light leading-relaxed text-white/80 animate-fade-in text-justify sm:text-center">
                        Inspired directly by the fortress grids and royal palace arches of Bikaner. The structural symmetry highlights classic Rajputana floral grids, presenting a dramatic spotlight that highlights the raw radiance of uncut syndicate diamonds and Maison ruby drops in perfect equilibrium.
                      </p>
                    )}

                    {pdpActiveTab === 'heritage' && (
                      <p className="text-xs sm:text-[14px] font-sans font-light leading-relaxed text-white/80 animate-fade-in text-justify sm:text-center">
                        HR Jewellers &amp; Sons dates back to 1924, crafting sovereign ornaments for Rajputana estates. The signature design carries a serialized laser registration hash, preserving Rajasthan's rich jewellery culture for your family lineage.
                      </p>
                    )}

                    {/* Devkishan Quote block */}
                    <div className="border-t border-b border-[#DDA0DD]/15 py-7 max-w-xl mx-auto mt-8 relative">
                      <span className="absolute top-1 left-[48%] text-2xl text-[#DDA0DD]/15 font-serif select-none pointer-events-none font-black leading-none font-sans">“</span>
                      <span className="serif-luxury italic text-base text-[#DDA0DD] font-serif leading-relaxed block px-4 mt-2">
                        "A jewel is not an ornament; it is a piece of Bikaner's royal history forged in gold."
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 block mt-3 font-bold font-sans">
                        — DEVKISHAN SONI, MASTER GOLDSMITH (EST. 1924)
                      </span>
                    </div>

                  </div>

                </div>

                {/* Patron espec reviews sheet */}
                <div className="border border-[#DDA0DD]/25 rounded-[2.5rem] p-8 md:p-14 bg-[#1C022B]/40 backdrop-blur-md space-y-10 relative overflow-hidden group max-w-4xl mx-auto w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                  {/* Gold corner ornaments to match premium PDP aesthetics */}
                  <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-[#DDA0DD]/35" />
                  <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-[#DDA0DD]/35" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-[#DDA0DD]/35" />
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-[#DDA0DD]/35" />

                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#DDA0DD] font-extrabold block font-sans">CLIENT PATRONAGE</span>
                    <h3 className="serif-luxury text-3xl font-semibold font-serif tracking-wider text-white">
                      Patron Testimonials
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#DDA0DD]" />
                      <span className="text-[#DDA0DD] text-xs">✦</span>
                      <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#DDA0DD]" />
                    </div>
                  </div>

                  {/* Slider Container */}
                  <div className="max-w-2xl mx-auto min-h-[140px] flex items-center justify-center relative px-4">
                    {(() => {
                      const productReviews = detailProduct.reviews || [];
                      const fallbacks = [
                        { patron: 'Aishwarya Sen', stars: 5, comment: 'Breathtaking craftsmanship. The hand-chiseled finish is absolute perfection!' },
                        { patron: 'Rani Padmini Devi', stars: 5, comment: 'An unmatched royal masterpiece. The detailing is pure Rajputana class.' }
                      ];
                      const allReviews = [...productReviews, ...fallbacks];
                      const currentReview = allReviews[pdpActiveReviewIdx % allReviews.length];

                      if (!currentReview) return null;

                      return (
                        <div className="w-full animate-fade-in space-y-4">
                          {/* Patron Name & Stars */}
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-[#DDA0DD] text-[13px] font-extrabold uppercase tracking-[0.2em] font-sans">
                              {currentReview.patron}
                            </span>
                            <span className="text-[#DDA0DD] text-xs font-black tracking-[0.15em] animate-pulse-slow">
                              {'★'.repeat(currentReview.stars)}
                            </span>
                          </div>
                          {/* Patron comment with drop-quote styling */}
                          <p className="font-serif italic text-sm sm:text-base leading-relaxed text-white/80 max-w-lg mx-auto relative px-8 py-2">
                            <span className="absolute top-[-10px] left-0 text-3xl text-[#DDA0DD]/20 font-serif font-black select-none">“</span>
                            "{currentReview.comment}"
                            <span className="absolute bottom-[-15px] right-2 text-3xl text-[#DDA0DD]/20 font-serif font-black select-none">”</span>
                          </p>

                          {/* Slider Progress Dots */}
                          <div className="flex justify-center items-center gap-2 pt-6">
                            {allReviews.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => { triggerAudio('click'); setPdpActiveReviewIdx(idx); }}
                                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${idx === (pdpActiveReviewIdx % allReviews.length)
                                  ? 'w-6 bg-[#DDA0DD]'
                                  : 'w-1.5 bg-white/20 hover:bg-white/40'
                                  }`}
                                title={`Review slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>

              </div>

              {/* RESPONSIVE MOBILE STICKY BUY BAR & FAB (Section 10) */}
              <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#14001F]/95 backdrop-filter backdrop-blur-lg border-t border-[#DDA0DD]/45 p-4.5 z-40 flex items-center justify-between shadow-[0_-15px_40px_rgba(0,0,0,0.65)] animate-slide-up select-none">
                <div className="flex items-center space-x-3.5">
                  <img src={detailProduct.img} className="w-11 h-11 object-cover rounded-xl border border-white/20 bg-white/5 shadow-md" alt="" />
                  <div>
                    <h4 className="font-serif text-[12px] font-bold text-white truncate max-w-[140px] tracking-wide">{detailProduct.name}</h4>
                    <span className="text-[#DDA0DD] font-extrabold text-[12px] block mt-0.5 font-mono">₹{formatPrice(detailProduct.price)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart({
                    ...detailProduct,
                    carat: `${selectedCaratPurity} / Size ${selectedRingSize}`,
                    desc: customEngraving ? `Engraved: "${customEngraving}"` : detailProduct.desc
                  })}
                  className="bg-gradient-to-r from-[#DDA0DD] via-[#E7C873] to-[#4A126D] text-[#13071C] font-bold text-[10px] uppercase tracking-widest py-3 px-7 rounded-full cursor-pointer shadow-[0_4px_12px_rgba(212,175,55,0.3)] active:scale-95 transition-all duration-300 text-center font-sans"
                >
                  Buy Now
                </button>
              </div>

              {/* Mobile Bottom sheet trigger for Terms & Conditions */}
              {pdpTcExpanded && (
                <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setPdpTcExpanded(false)} />
                  <div className="bg-[#13071C] border-t-2 border-[#DDA0DD]/45 rounded-t-[2.5rem] p-7 relative z-10 space-y-4 max-h-[60vh] overflow-y-auto font-sans animate-slide-up">
                    <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-2" />
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <h4 className="serif-luxury text-base font-bold text-white uppercase tracking-wider">Maison Guidelines</h4>
                      <button onClick={() => setPdpTcExpanded(false)} className="text-white/50 hover:text-white text-sm font-bold p-1">✕</button>
                    </div>
                    <div className="text-[11px] text-white/70 leading-relaxed space-y-3.5 text-justify">
                      <p>• <strong>Exchange Integrity:</strong> Standard items carry 100% metal weight buyback protections. Custom customized sets shape unique non-cancellation matrices upon atelier workshop forging commencement.</p>
                      <p>• <strong>Lab Certifications:</strong> Official physical certificates containing unique laboratory registration hashes are dispatched securely with transit security teams.</p>
                      <p>• <strong>Rajasthan Insured Dispatch:</strong> Hand-couriered within Bikaner and Jaipur regions inside signature steel cases under active transit insurance policies.</p>
                    </div>
                    <button
                      onClick={() => setPdpTcExpanded(false)}
                      className="w-full bg-[#DDA0DD] text-black font-bold py-3.5 rounded-full text-xs uppercase tracking-widest text-center cursor-pointer mt-4 shadow-lg"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {currentPage === 'heritage' && (
            <div className={`transition-colors duration-500 min-h-screen pb-8 ${isCatalogDark
              ? 'bg-[#140920] text-[#FBF9FF]'
              : 'bg-[#FBF9FF] text-[#4A126D]'
              }`}>
              {/* ==========================================
                SECTION 01: ABOUT HERO (FULL WIDTH LUXURY HERO)
                ========================================== */}
              <section
                onMouseMove={(e) => {
                  const { clientX, clientY } = e;
                  const x = (clientX - window.innerWidth / 2) / 35;
                  const y = (clientY - window.innerHeight / 2) / 35;
                  setMousePos({ x, y });
                }}
                className={`relative w-full min-h-[700px] lg:min-h-[900px] overflow-hidden flex items-center justify-center py-24 px-6 sm:px-12 border-b transition-all duration-500 select-none ${isCatalogDark ? "bg-gradient-to-br from-[#14061e] via-[#35074d]/90 to-[#14061e]/80 text-white border-gold/10 shadow-2xl" : "bg-gradient-to-br from-[#FCFAFF] via-[#FFFFFF] to-[#F4ECF9] text-[#4A126D] border-[#DDA0DD]/20 shadow-sm"}`}
              >
                {/* Dedicated High-Resolution Environmental Backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-[10000ms] scale-105 bg-no-repeat pointer-events-none opacity-[0.45]"
                  style={{
                    backgroundImage: `url(${heritageBg})`,
                    transform: `translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0) scale(1.03)`
                  }}
                />
                <div className="absolute inset-0 pointer-events-none transition-all duration-500 bg-gradient-to-r from-[#14061e]/95 via-[#3d0959]/85 to-[#14061e]/75" />

                {/* Spotlights and glow layers */}
                <div className="absolute top-[15%] left-[20%] w-[380px] h-[380px] rounded-full bg-[#DDA0DD]/5 blur-[120px] pointer-events-none animate-pulse-slow z-0 opacity-0" />
                <div className="absolute bottom-[20%] right-[10%] w-[480px] h-[480px] rounded-full bg-[#DDA0DD]/8 blur-[150px] pointer-events-none animate-pulse-slow z-0 opacity-0" />

                {/* Corner Accents */}
                <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-[#DDA0DD]/20 pointer-events-none rounded-tl-lg z-10 opacity-0" />
                <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-[#DDA0DD]/20 pointer-events-none rounded-tr-lg z-10 opacity-0" />
                <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-[#DDA0DD]/20 pointer-events-none rounded-bl-lg z-10 opacity-0" />
                <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#DDA0DD]/20 pointer-events-none rounded-br-lg z-10 opacity-0" />

                {/* Symmetrical Centered Layout Container */}
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative z-30 gap-12 sm:gap-16">

                  {/* Centered Editorial Story Content */}
                  <div className="w-full space-y-6 sm:space-y-8 flex flex-col items-center text-center justify-center animate-[slide-up_1s_ease-out_forwards]">
                    <div className="flex flex-wrap gap-4 items-center justify-center pb-2 w-full">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] font-extrabold text-[#DDA0DD] block font-sans">
                        ✦ LEGACY ✦ SEVEN DECADES ✦ ROYAL LINEAGE ✦
                      </span>
                    </div>

                    <h1 className={`serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-[1.12] transition-colors duration-500 text-center w-full ${isCatalogDark ? "text-white" : "text-[#4A126D]"}`}>
                      A Dynasty of <br />
                      Master <span className="italic text-[#DDA0DD] font-serif font-light">Goldsmiths</span>
                    </h1>

                    <p className={`text-xs sm:text-sm font-light max-w-2xl leading-relaxed pt-2 tracking-wide font-sans transition-colors duration-500 text-center mx-auto ${isCatalogDark ? "text-[#F8F4EE]/90" : "text-[#4A126D]/80"}`}>
                      HR Jewellers & Sons is a trusted beacon of Bikaneri royal craftsmanship. For generations, our family-led maison has crafted high-luxury bridal masterworks using ancient Bikaneri Kundan settings, hand-selected Syndicate Polki, and master-refined 22-karat bullion.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-5 w-full justify-center">
                      <button
                        onClick={() => {
                          triggerAudio('click');
                          document.getElementById('heritage-story-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-8 py-3.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer focus:outline-none font-sans text-center select-none ${isCatalogDark ? "bg-white text-[#16061F] hover:bg-white/95 border border-white" : "bg-[#4A126D] text-white hover:bg-[#4A126D]/90 border border-[#4A126D]"}`}
                      >
                        Explore Our Story
                      </button>
                      <button
                        onClick={() => {
                          triggerAudio('shimmer');
                          document.getElementById('heritage-lounge-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-8 py-3.5 rounded-full border text-[10px] sm:text-[11px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus:outline-none font-sans text-center select-none ${isCatalogDark ? "border-white bg-transparent text-white hover:bg-white/10" : "border-[#4A126D] bg-transparent text-[#4A126D] hover:bg-[#4A126D]/5"}`}
                      >
                        Visit Our Lounge
                      </button>
                    </div>

                    {/* Elite Lineage Badges */}
                    <div className="border-t border-[#DDA0DD]/15 pt-8 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-xl select-none justify-items-center">
                      <div className="flex flex-col items-center text-center gap-2">
                        <svg className="w-6 h-6 text-[#DDA0DD] filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.375.666-.375.838 0l2.14 4.67a.5.5 0 00.375.272l4.894.664c.42.057.587.61.272.905l-3.696 3.493a.5.5 0 00-.143.447l1.01 5.093c.087.439-.408.828-.78.583l-4.23-2.775a.5.5 0 00-.472 0l-4.23 2.775c-.372.245-.867-.144-.78-.583l1.01-5.093a.5.5 0 00-.143-.447L2.83 10.012c-.315-.295-.148-.848.272-.905l4.894-.664a.5.5 0 00.375-.272l2.14-4.67z" />
                        </svg>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDA0DD] block font-sans">74+ Years</span>
                          <span className={`text-[8px] block font-sans tracking-wide transition-colors duration-500 ${isCatalogDark ? "text-[#F8F4EE]/60" : "text-[#4A126D]/60"}`}>Ancestral Artistry</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2 border-t sm:border-t-0 sm:border-l border-b border-b-transparent border-[#DDA0DD]/15 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
                        <svg className="w-6 h-6 text-[#DDA0DD] filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDA0DD] block font-sans">Pure Gold</span>
                          <span className={`text-[8px] block font-sans tracking-wide transition-colors duration-500 ${isCatalogDark ? "text-[#F8F4EE]/60" : "text-[#4A126D]/60"}`}>Bikaneri Kundan</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center gap-2 border-t sm:border-t-0 sm:border-l border-[#DDA0DD]/15 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
                        <svg className="w-6 h-6 text-[#DDA0DD] filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.3)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                        </svg>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DDA0DD] block font-sans">Masterwork</span>
                          <span className={`text-[8px] block font-sans tracking-wide transition-colors duration-500 ${isCatalogDark ? "text-[#F8F4EE]/60" : "text-[#4A126D]/60"}`}>Atelier Anil Soni</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Centered Visual Campaign Showcase Card */}
                  <div className="w-full flex justify-center items-center overflow-visible py-8 pointer-events-auto">
                    <div
                      className="relative w-full max-w-[280px] sm:max-w-[420px] aspect-[3/4] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 border border-[#DDA0DD]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-black/40 backdrop-blur-md transition-all duration-700 hover:border-[#DDA0DD]/70 group pointer-events-auto"
                      style={{
                        transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`
                      }}
                    >
                      {/* Concentric thin gold borders on hover */}
                      <div className="absolute -inset-2 rounded-[2.25rem] sm:rounded-[2.75rem] border border-[#DDA0DD]/10 pointer-events-none group-hover:scale-102 transition-all duration-700 ease-out z-0"></div>
                      <div className="absolute -inset-4 rounded-[2.5rem] sm:rounded-[3rem] border border-[#DDA0DD]/5 pointer-events-none group-hover:scale-105 transition-all duration-1000 ease-out z-0"></div>

                      {/* Inner gold frame corner brackets */}
                      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#DDA0DD]/65 pointer-events-none rounded-tl z-20 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#DDA0DD]/65 pointer-events-none rounded-tr z-20 transition-all duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#DDA0DD]/65 pointer-events-none rounded-bl z-20 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#DDA0DD]/65 pointer-events-none rounded-br z-20 transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />

                      {/* Image Container */}
                      <div className="relative w-full h-full rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden bg-[#16061F]">
                        <img
                          src={royalIndianBride}
                          alt="Royal Indian Bride - Heritage Bridal Campaign"
                          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out scale-102 group-hover:scale-[1.06] filter brightness-[1.05] contrast-[1.02]"
                        />
                        {/* Rich luxury vignette overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/30 pointer-events-none z-10" />

                        {/* Campaign Stamp/Plate at bottom */}
                        <div className="absolute bottom-6 left-6 right-6 z-20 text-center space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-[8px] font-black tracking-[0.4em] text-[#DDA0DD] uppercase block">
                            Atelier Campaign 2026
                          </span>
                          <h3 className="serif-luxury text-sm font-bold text-white tracking-widest uppercase">
                            The Royal Rajputi Bride
                          </h3>
                          <div className="w-10 h-[1px] bg-[#DDA0DD] mx-auto opacity-75"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Shadow the global isCatalogDark state to force the dedicated Heritage page body to ALWAYS be white/light ivory */}
              {(() => {
                const isCatalogDark = false;
                return (
                  <div className="bg-[#FCFAFF] text-[#4A126D] transition-colors duration-500 space-y-24 py-20 border-t border-[#DDA0DD]/20 shadow-inner">
                    {/* ==========================================
                      SECTION 02: OUR STORY (DYNAMIC TIMELINE & LEGACY)
                      ========================================== */}
                    <section id="heritage-story-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 select-none">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Column: Story Visual Spotlight */}
                        <div className="lg:col-span-6 space-y-6">
                          <div className="relative group overflow-hidden rounded-[2.5rem] border border-[#DDA0DD]/15 aspect-[4/3] sm:aspect-[1.5] shadow-lg bg-gray-50">
                            {/* Glow spotlight behind image */}
                            <div className="absolute -inset-1 blur-2xl bg-[#DDA0DD]/15 opacity-70 rounded-full z-0 pointer-events-none"></div>
                            <img
                              src={
                                activeStoryTimeline === 1952
                                  ? familySignet
                                  : activeStoryTimeline === 1974
                                    ? goldKada
                                    : activeStoryTimeline === 1998
                                      ? sapphireHeritageSet
                                      : activeStoryTimeline === 2014
                                        ? luxuryShowroom
                                        : emeraldSovereignRing
                              }
                              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 relative z-10"
                              alt="Heritage Lineage Story"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#140920]/50 via-transparent to-transparent z-20 pointer-events-none"></div>
                            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#140920]/60 backdrop-blur-md border border-[#DDA0DD]/30 rounded-full text-[#DDA0DD] text-[8px] font-black uppercase tracking-widest">
                              {
                                activeStoryTimeline === 1952 ? "THE GENESIS"
                                  : activeStoryTimeline === 1974 ? "ROYAL STANDARD"
                                    : activeStoryTimeline === 1998 ? "POLKI FUSION"
                                      : activeStoryTimeline === 2014 ? "CREATIVE STUDIO"
                                        : "DIGITAL AVANT-GARDE"
                              }
                            </div>
                          </div>
                          <p className="text-[10px] text-center italic tracking-wide opacity-50 mt-2">
                            *Actual archival workshops detailing our Jaipur Johari lineages.
                          </p>
                        </div>

                        {/* Right Column: Story Copy & Interactive Timeline */}
                        <div className="lg:col-span-6 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                          <div className="space-y-3 flex flex-col items-center lg:items-start w-full">
                            <span className="text-[9px] font-bold tracking-[0.3em] text-[#DDA0DD] uppercase block w-full text-center lg:text-left">
                              OUR LEGACY
                            </span>
                            <h2 className="serif-luxury text-3xl sm:text-5xl font-bold leading-tight w-full text-center lg:text-left">
                              Forging Masterpieces For Generations
                            </h2>
                            <div className="w-16 h-[1.5px] bg-[#DDA0DD] shadow-[0_0_8px_rgba(212,175,55,0.5)] mx-auto lg:mx-0"></div>
                          </div>

                          {/* Narrative copy that morphs based on selected year */}
                          <div className={`min-h-[160px] border border-gold/10 p-6 rounded-3xl space-y-4 shadow-inner transition-all duration-500 ${isCatalogDark ? 'bg-white/5' : 'bg-[#4A126D]/5'}`}>
                            <h3 className="serif-luxury text-lg sm:text-xl font-bold text-[#DDA0DD]">
                              {activeStoryTimeline === 1952 && "1952: Atelier Foundations in Bikaner"}
                              {activeStoryTimeline === 1974 && "1974: Purity Guild Standardization"}
                              {activeStoryTimeline === 1998 && "1998: Syndicate Uncut Diamonds Polki"}
                              {activeStoryTimeline === 2014 && "2014: Flagship Showroom Fitting Lounge"}
                              {activeStoryTimeline === 2026 && "2026: High-Luxury BlueStone accredited Partner"}
                            </h3>
                            <p className="text-xs sm:text-sm font-light leading-relaxed tracking-wide opacity-80 font-sans">
                              {activeStoryTimeline === 1952 && "Our lineage began inside the fort town of Bikaner, where native goldsmith atelier masters began hand-sculpting pristine ornaments for noble families. Driven by absolute purity and deep-rooted artistry, they established a lineage of royal goldsmith craftsmanship."}
                              {activeStoryTimeline === 1974 && "The atelier institutes formal testing procedures and establishes official guild metrics in Western Rajasthan, pioneering metal purity and absolute trust decades before national hallmarking laws were standardized."}
                              {activeStoryTimeline === 1998 && "Atelier introduces premium Syndicate Polki diamond collections, fusioning ancient Bikaneri carvings with Jaipuri royal color aesthetics, catering to high-fashion bridal demands."}
                              {activeStoryTimeline === 2014 && "Opening of the grand flagship showroom at Tilak Nagar in Bikaner. Offering specialized custom-design tables, fitting chambers, and private lounges for family bridal viewings."}
                              {activeStoryTimeline === 2026 && "Transitioning to a fully accredited BlueStone partner boutique, integrating advanced live gold API conversion matrices, digital certification catalogs, and instant WhatsApp booking."}
                            </p>
                          </div>

                          {/* Horizontal interactive timeline rail */}
                          <div className="relative pt-6 w-full max-w-md sm:max-w-xl mx-auto lg:mx-0 px-2">
                            {/* Connector line */}
                            <div className="absolute top-[42px] left-0 right-0 h-[2px] bg-gold/20 z-0"></div>

                            {/* Interactive nodes */}
                            <div className="relative z-10 flex justify-between items-center text-center w-full">
                              {[1952, 1974, 1998, 2014, 2026].map((yr) => (
                                <button
                                  key={yr}
                                  onClick={() => { triggerAudio('click'); setActiveStoryTimeline(yr); setTimelineAutoplay(false); }}
                                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                                >
                                  <span className={`text-[10px] sm:text-xs tracking-wider font-extrabold transition-all duration-300 ${activeStoryTimeline === yr ? 'text-[#DDA0DD] scale-110' : 'opacity-50 hover:opacity-100'
                                    }`}>
                                    {yr}
                                  </span>
                                  <span className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-[9px] ${activeStoryTimeline === yr
                                    ? 'bg-[#DDA0DD] border-[#DDA0DD] text-[#4A126D] shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-110'
                                    : (isCatalogDark ? 'bg-white/10 border-gold/30 hover:border-gold/70' : 'bg-[#4A126D]/10 border-gold/30 hover:border-gold/70')
                                    }`}>
                                    ✦
                                  </span>
                                  <span className={`text-[7px] uppercase tracking-wider font-extrabold transition-all duration-300 block ${activeStoryTimeline === yr ? 'opacity-100 text-[#DDA0DD]' : 'opacity-0 sm:opacity-40 sm:group-hover:opacity-75'
                                    }`}>
                                    {yr === 1952 ? "Genesis" : yr === 1974 ? "Standard" : yr === 1998 ? "Polki" : yr === 2014 ? "Atelier" : "Lounge"}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 03: WHY CHOOSE US (PILLARS OF TRUST)
                ========================================== */}
                    <section className={`py-20 select-none border-t border-b border-gold/10 ${isCatalogDark ? 'bg-[#140920]/45' : 'bg-[#4A126D]/5'}`}>
                      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 text-center">

                        {/* Heading */}
                        <div className="space-y-3 max-w-2xl mx-auto">
                          <span className="text-[9px] font-bold tracking-[0.3em] text-[#DDA0DD] uppercase block">
                            TRUSTED SINCE 1952
                          </span>
                          <h2 className="serif-luxury text-3xl sm:text-5xl font-bold">
                            Why Customers Trust Us
                          </h2>
                          <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                          <p className="text-xs sm:text-sm font-light opacity-75 leading-relaxed mt-4">
                            Every centerpiece from our luxury maison carries a certificate of uncompromising purity, generational promise, and dedicated concierge hospitality.
                          </p>
                        </div>

                        {/* 6 Glass cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          {[
                            {
                              num: "01",
                              title: "100% BIS Hallmarked",
                              desc: "Every gram of gold is certified under government 916 hallmarks, securing absolute bullion purity and global exchange standards."
                            },
                            {
                              num: "02",
                              title: "Certified Diamonds",
                              desc: "All solitaire centerpieces and diamond clusters come accompanied by internationally verified GIA, IGI, or HRD certificates."
                            },
                            {
                              num: "03",
                              title: "Government Approved gold",
                              desc: "We stand entirely behind our craft, guaranteeing fully authorized buybacks, exchanges, and verified valuation processes."
                            },
                            {
                              num: "04",
                              title: "Custom Jewellery Design",
                              desc: "Work live with our award-winning master designers to transform raw gems and concepts into bespoke hand-chiseled heirlooms."
                            },
                            {
                              num: "05",
                              title: "Private Viewing Lounges",
                              desc: "Book one of our VIP fitting suites at Bikaner or Jaipur, featuring private trousseau trials and champagne hospitality."
                            },
                            {
                              num: "06",
                              title: "Lifetime Support & Polishing",
                              desc: "Compulsory annual deep steam-cleaning, fitting adjustments, and complimentary gold polish checking to keep your lineage sparkling."
                            }
                          ].map((card, i) => (
                            <div
                              key={i}
                              className="group border border-gold/15 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-left space-y-4 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(212,175,55,0.06)] hover:border-gold/30 relative overflow-hidden"
                            >
                              {/* Decorative Gold Corner Glow */}
                              <div className="absolute top-0 right-0 w-8 h-8 bg-[#DDA0DD]/10 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform"></div>

                              <div className="flex justify-between items-center">
                                <span className="serif-luxury text-sm font-bold text-[#DDA0DD] tracking-widest">{card.num}</span>
                                <span className="text-gold group-hover:animate-pulse">✨</span>
                              </div>

                              <h3 className="serif-luxury text-lg font-bold group-hover:text-[#DDA0DD] transition-colors">
                                {card.title}
                              </h3>

                              <p className="text-xs sm:text-sm font-light leading-relaxed tracking-wide opacity-75 font-sans">
                                {card.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 04: CRAFTSMANSHIP SHOWCASE (ART CRAFTED BY MASTERS)
                ========================================== */}
                    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 select-none font-sans">
                      <div className="space-y-12 text-center">

                        {/* Heading */}
                        <div className="space-y-3 max-w-xl mx-auto">
                          <span className="text-[9px] font-bold tracking-[0.3em] text-[#DDA0DD] uppercase block">
                            JAIPUR ARTISTRY
                          </span>
                          <h2 className="serif-luxury text-3xl sm:text-5xl font-bold">
                            Art Crafted By Masters
                          </h2>
                          <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                          <p className="text-xs opacity-75 leading-relaxed mt-2 font-sans">
                            An inside glimpse of Johari handcrafting techniques refined across seven decades.
                          </p>
                        </div>

                        {/* 6 Grid Editorial Cards with Hover Zoom */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            {
                              name: "Polki Setting",
                              desc: "Raw, uncut syndicate flat-cut diamonds seated carefully inside 24K pure gold foil, reflecting an ancient Mughal royal aesthetic.",
                              img: emeraldBridalSuite
                            },
                            {
                              name: "Jaipur Kundan",
                              desc: "Refining molten 24K gold foil borders to envelope rubies, emeralds, or polki gems with dynamic glass-enamel backings.",
                              img: mayuraMangalsutra
                            },
                            {
                              name: "Nakshi Temple Carving",
                              desc: "Native chisels hand-beating solid high-carat sheet gold into heavy motifs of deities, royal peacocks, and temple architecture.",
                              img: citrineFloralSet
                            },
                            {
                              name: "Diamond Setting",
                              desc: "Utilizing Swiss-grade microscopes to arrange tiny brilliant-cut prongs and micro-pave solitaires into platinum bands.",
                              img: udaipurFiligreeSolitaire
                            },
                            {
                              name: "Bikaneri Hand Engraving",
                              desc: "The legacy of Bikaneri Meenakari, carving microscopic floral patterns and backing them with vibrant glass pigments.",
                              img: familySignet
                            },
                            {
                              name: "Bespoke Gold Casting",
                              desc: "Hand pouring customized molten alloys into single-use wax molds, creating unique structures that can never be replicated.",
                              img: goldKada
                            }
                          ].map((craft, i) => (
                            <div
                              key={i}
                              className="group relative overflow-hidden rounded-3xl aspect-[1.1] border border-gold/10 bg-[#F4ECF9] shadow-md"
                            >
                              {/* Image Zoom */}
                              <img
                                src={craft.img}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-50"
                                alt={craft.name}
                              />
                              {/* Luxury Editorial Vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#140920]/90 via-[#140920]/40 to-transparent"></div>

                              {/* Hover Info Overlay */}
                              <div className="absolute bottom-5 left-6 right-6 text-left space-y-1">
                                <span className="text-[#DDA0DD] text-[8px] uppercase tracking-[0.25em] font-extrabold block">MASTERPIECE TECHNIQUE</span>
                                <h3 className="serif-luxury text-lg font-bold text-white group-hover:text-[#DDA0DD] transition-colors">{craft.name}</h3>
                                <p className="text-[11px] text-white/70 font-light leading-relaxed tracking-wide line-clamp-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                                  {craft.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 05: OUR COLLECTIONS (PRE-NAVIGATION GALLERY)
                ========================================== */}
                    <section className={`py-20 select-none border-t border-b border-gold/10 ${isCatalogDark ? 'bg-[#140920]/45' : 'bg-[#4A126D]/5'}`}>
                      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">

                        {/* Heading */}
                        <div className="space-y-3 text-center max-w-xl mx-auto">
                          <span className="text-[9px] font-bold tracking-[0.3em] text-[#DDA0DD] uppercase block">
                            THE CURATED ARCHIVES
                          </span>
                          <h2 className="serif-luxury text-3xl sm:text-5xl font-bold">
                            Explore Our Collections
                          </h2>
                          <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                          <p className="text-xs opacity-75 mt-2 font-sans">
                            Click any curated category suite to browse specific master catalogue items directly.
                          </p>
                        </div>

                        {/* Collections Grid with Chime navigation */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 font-sans">
                          {[
                            {
                              name: "Bridal Collection",
                              count: "38 Masterpieces",
                              tag: "bridal",
                              img: emeraldBridalSuite
                            },
                            {
                              name: "Diamond Jewellery",
                              count: "64 Items",
                              tag: "diamond",
                              img: diamondEmeraldChoker
                            },
                            {
                              name: "Polki Sets",
                              count: "22 Heirloom Suites",
                              tag: "diamond",
                              img: sapphireHeritageSet
                            },
                            {
                              name: "Gold Collection",
                              count: "95 Certified Designs",
                              tag: "gold",
                              img: goldKada
                            },
                            {
                              name: "Silver Collection",
                              count: "110 Artifacts",
                              tag: "silver",
                              img: silverPoojaThali
                            },
                            {
                              name: "Men's Ornaments",
                              count: "18 Royal Kadas & Buttons",
                              tag: "gold",
                              img: familySignet
                            },
                            {
                              name: "Temple Jewels",
                              count: "30 Heavy Sets",
                              tag: "gold",
                              img: citrineFloralSet
                            },
                            {
                              name: "View Complete Catalog",
                              count: "350+ Centerpieces",
                              tag: "all",
                              img: royalIndianBride
                            }
                          ].map((col, i) => (
                            <button
                              key={i}
                              onClick={() => { triggerAudio('shimmer'); handleCategoryNav(col.tag); }}
                              className="group text-left focus:outline-none relative overflow-hidden rounded-3xl aspect-[0.9] border border-gold/10 shadow-md bg-[#4A126D] cursor-pointer"
                            >
                              <img
                                src={col.img}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                                alt={col.name}
                              />
                              {/* Spotlight Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#140920]/85 via-[#140920]/20 to-transparent"></div>

                              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 space-y-0.5">
                                <span className="text-[6.5px] text-[#DDA0DD] tracking-[0.3em] font-black block uppercase">LIMITED REVERIE</span>
                                <h3 className="serif-luxury text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-[#DDA0DD] transition-colors line-clamp-1">{col.name}</h3>
                                <div className="flex justify-between items-center text-[8.5px] sm:text-[9px] text-white/50 pt-1.5 sm:pt-2">
                                  <span>{col.count}</span>
                                  <span className="text-gold tracking-widest font-black transition-transform group-hover:translate-x-1">→</span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 06: SHOWROOM EXPERIENCE (HERITAGE LOUNGE SUITES)
                ========================================== */}
                    <section id="heritage-lounge-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 select-none">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side: Copy & Information Cards */}
                        <div className="lg:col-span-6 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
                          <div className="space-y-3 flex flex-col items-center lg:items-start w-full">
                            <span className="text-[9px] font-bold tracking-[0.3em] text-[#DDA0DD] uppercase block w-full text-center lg:text-left">
                              BY APPOINTMENT ONLY
                            </span>
                            <h2 className="serif-luxury text-3xl sm:text-5xl font-bold leading-tight w-full text-center lg:text-left">
                              Visit Our Heritage Lounge
                            </h2>
                            <div className="w-16 h-[1.5px] bg-[#DDA0DD] shadow-[0_0_8px_rgba(212,175,55,0.5)] mx-auto lg:mx-0"></div>
                            <p className="text-xs sm:text-sm font-light opacity-80 mt-4 leading-relaxed font-sans w-full text-center lg:text-left">
                              Register an exclusive private lounge suite at Bikaner J.N.V. Colony or Johari Bazaar in Jaipur for dedicated custom wedding consultations and physical fitting suites.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                            {[
                              { title: "Bridal Consultation", desc: "Private bridal suites dedicated to mapping grand royal trousseaus." },
                              { title: "Bespoke Custom Orders", desc: "Co-designing unique jewelry featuring custom CAD render reviews." },
                              { title: "Trousseau Styling", desc: "Dedicated jewel matchings guided by luxury fashion experts." },
                              { title: "Royal VIP Hospitality", desc: "Chauffeur pick-up and champagne catering for visiting families." }
                            ].map((info, idx) => (
                              <div key={idx} className={`border border-gold/10 p-5 rounded-2xl space-y-1 ${isCatalogDark ? 'bg-white/5' : 'bg-[#4A126D]/5'}`}>
                                <span className="text-[9px] font-bold text-[#DDA0DD] block">✦ SERVICE</span>
                                <h4 className="serif-luxury text-sm font-bold">{info.title}</h4>
                                <p className="text-[11px] font-light leading-relaxed opacity-75">{info.desc}</p>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => { triggerAudio('shimmer'); setConsultationModal(true); }}
                            className="px-6 py-3.5 rounded-full bg-[#E5C158] hover:bg-[#DDA0DD] text-black text-[10px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] cursor-pointer focus:outline-none block w-full text-center sm:w-auto font-sans"
                          >
                            Reserve Private Viewing Suite
                          </button>
                        </div>

                        {/* Right Side: Showcase Salon Visual */}
                        <div className="lg:col-span-6">
                          <div className="relative group overflow-hidden rounded-[2.5rem] border border-[#DDA0DD]/25 aspect-[1.3] shadow-xl">
                            <img
                              src={luxuryShowroom}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              alt="Heritage Fitting Salon"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#140920]/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-5 left-6 text-left">
                              <span className="text-[8px] tracking-[0.34em] font-black text-[#DDA0DD] block">FLAGSHIP SHOWROOM SUITE</span>
                              <span className="serif-luxury text-base text-white tracking-wide">J.N.V. Colony Lounge Bikaner</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 07: ACHIEVEMENTS (METRICS OF MAJESTY)
                ========================================== */}
                    <section className={`py-12 select-none border-t border-b border-gold/15 backdrop-blur-sm ${isCatalogDark ? 'bg-[#140920]/40' : 'bg-[#DDA0DD]/10'}`}>
                      <div className="max-w-7xl mx-auto px-6 sm:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
                          {[
                            { val: "74+", label: "Years of Heritage", desc: "Crafting since 1952" },
                            { val: "25k+", label: "Happy Patrons", desc: "Generations of trust" },
                            { val: "15k+", label: "Unique Designs", desc: "Hand-forged works" },
                            { val: "100%", label: "Certified Products", desc: "BIS Hallmark guarantee" }
                          ].map((met, i) => (
                            <div key={i} className="space-y-1 relative group font-sans">
                              {/* Vertical separator on wider screens */}
                              {i < 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gold/25"></div>}

                              <span className="serif-luxury text-3xl sm:text-5xl font-black text-[#DDA0DD] block tracking-normal drop-shadow-md">
                                {met.val}
                              </span>
                              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase block">
                                {met.label}
                              </span>
                              <span className="text-[8px] sm:text-[9px] font-light opacity-60 uppercase block">
                                {met.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* ==========================================
                SECTION 08: FOUNDER MESSAGE (EDITORIAL ATELIER BLOCK)
                ========================================== */}
                    <section className="py-20 sm:py-28 max-w-5xl mx-auto px-6 select-none">
                      <div className={`border border-gold/15 p-8 sm:p-12 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-lg relative overflow-hidden ${isCatalogDark ? 'bg-[#140920]/45 border-[#DDA0DD]/30' : 'bg-[#4A126D]/5'}`}>
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#DDA0DD]"></div>
                        <div className="absolute top-0 left-0 w-[1px] h-12 bg-[#DDA0DD]"></div>

                        {/* Left Portrait */}
                        <div className="md:col-span-4 text-center space-y-3">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto border-2 border-[#DDA0DD]/50 shadow-md">
                            <img
                              src={anilSoni}
                              className="w-full h-full object-cover object-top scale-110"
                              alt="Founder Portrait"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="serif-luxury text-sm font-bold tracking-wider text-[#DDA0DD]">Anil Soni</h4>
                            <span className={`text-[8px] uppercase tracking-widest font-black block font-sans ${isCatalogDark ? 'text-white/55' : 'text-[#4A126D]/70'}`}>MASTER ATELIER DESIGNER & SMITH</span>
                          </div>
                        </div>

                        {/* Right message & Quote card */}
                        <div className="md:col-span-8 text-center md:text-left flex flex-col items-center md:items-start space-y-6">
                          <span className="text-[9px] tracking-[0.3em] font-extrabold text-[#DDA0DD] uppercase block font-sans">
                            FOUNDER'S ADDRESS
                          </span>

                          <h3 className={`serif-luxury text-xl sm:text-2xl font-bold leading-snug text-center md:text-left ${isCatalogDark ? 'text-[#FCFAFF]' : 'text-[#4A126D]'}`}>
                            "We do not merely forge jewelry, we sculpt generations of Rajputana dynastic pride."
                          </h3>

                          <p className={`text-xs sm:text-sm font-light leading-relaxed tracking-wide font-sans text-center md:text-left ${isCatalogDark ? 'text-white/80' : 'text-[#4A126D]/90'}`}>
                            "Every ornament that leaves our ateliers represents an extension of Bikaneri heritage. We carefully weigh not just the gold and diamonds, but the trust that Rajput homes have invested in our name since 1952. We invite you to experience craftsmanship designed to stay beautiful forever."
                          </p>

                          <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="w-10 h-[1px] bg-gold/40"></div>
                            <span className="serif-luxury italic text-xs tracking-wider text-[#DDA0DD]">Anil Soni, Master Goldsmith & Founder</span>
                          </div>
                        </div>

                      </div>
                    </section>

                    {/* ==========================================
                SECTION 09: FOOTER CTA (TIMELESS ELEGANCE BANNER)
                ========================================== */}
                    <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-12 select-none">
                      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#DDA0DD]/35 p-12 sm:p-20 text-center bg-[#140920] shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
                        {/* Palace Arch Interior Background */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-all duration-[10000ms] scale-105 bg-no-repeat pointer-events-none opacity-20"
                          style={{ backgroundImage: `url(${heritageBg})` }}
                        />

                        {/* Spotlight glow behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] bg-[#DDA0DD]/15 rounded-full pointer-events-none z-0"></div>

                        {/* Floating Sparks */}
                        <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
                          <span className="absolute top-8 left-[20%] text-gold animate-float-gentle text-base">✦</span>
                          <span className="absolute bottom-8 right-[20%] text-gold animate-pulse-slow text-xs">✨</span>
                          <span className="absolute top-[40%] right-[10%] text-gold animate-float-gentle text-xs">✨</span>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                          <span className="text-[10px] tracking-[0.4em] font-extrabold text-[#DDA0DD] uppercase block">
                            MAJESTIC FINALE
                          </span>

                          <h2 className="serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
                            Discover Timeless Elegance
                          </h2>

                          <div className="w-16 h-[2px] bg-[#DDA0DD] mx-auto shadow-[0_0_8px_rgba(212,175,55,0.5)]"></div>

                          <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed tracking-widest max-w-lg mx-auto font-sans">
                            Let us guide you through our complete hand-crafted bridal suites, diamond solitaires, sterling silverware, and bespoke services.
                          </p>

                          <div className="flex flex-wrap justify-center gap-4 pt-6 font-sans">
                            <button
                              onClick={() => handleCategoryNav('all')}
                              className="px-6 py-3 rounded-full bg-[#E5C158] hover:bg-[#DDA0DD] text-black text-[10px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] cursor-pointer focus:outline-none"
                            >
                              Explore Collection
                            </button>
                            <button
                              onClick={() => { triggerAudio('click'); navigateTo('valuation'); }}
                              className="px-6 py-3 rounded-full border border-white/30 hover:border-[#DDA0DD] text-white hover:text-[#DDA0DD] text-[10px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 hover:bg-white/5 cursor-pointer focus:outline-none"
                            >
                              Visit Showroom
                            </button>
                            <button
                              onClick={() => { triggerAudio('shimmer'); setConsultationModal(true); }}
                              className="px-6 py-3 rounded-full border border-[#DDA0DD] text-[#DDA0DD] hover:bg-[#DDA0DD]/10 text-[10px] tracking-[0.2em] font-extrabold uppercase transition-all duration-300 cursor-pointer focus:outline-none"
                            >
                              Book Consultation
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>

                  </div>
                );
              })()}
            </div>
          )}

          {currentPage === 'valuation' && (
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
                      <div className="flex flex-col items-start space-y-2">
                        <div className="text-[#DDA0DD] mb-1">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#2C1A3A] tracking-wider uppercase font-sans">100% Transparent</span>
                        <span className="text-[9px] text-[#2C1A3A]/60 leading-relaxed font-light font-sans">No hidden costs</span>
                      </div>

                      <div className="flex flex-col items-start space-y-2">
                        <div className="text-[#DDA0DD] mb-1">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#2C1A3A] tracking-wider uppercase font-sans">MCX Certified Rates</span>
                        <span className="text-[9px] text-[#2C1A3A]/60 leading-relaxed font-light font-sans">Live market linked</span>
                      </div>

                      <div className="flex flex-col items-start space-y-2">
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
                            <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹10,245 <span className="text-[9px] font-normal text-white/60">/g</span></span>
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
                            <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹9,389 <span className="text-[9px] font-normal text-white/60">/g</span></span>
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
                            <span className="text-sm font-bold text-[#DDA0DD] font-sans">₹92.10 <span className="text-[9px] font-normal text-white/60">/g</span></span>
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
                          triggerAudio('shimmer');
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
                          onClick={() => { triggerAudio('click'); navigateTo('gold-coins'); }}
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
                          onClick={() => { triggerAudio('click'); setCalculatorModalOpen(true); setSelectedMetal('silver'); setSelectedPurity('999'); }}
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
                          onClick={() => { triggerAudio('click'); handleCategoryNav('all'); }}
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
                    <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#DDA0DD] uppercase block">ATELIER WORKSPACE</span>
                    <h2 className="serif-luxury text-3xl sm:text-4xl font-bold text-[#2C1A3A] font-serif">Interactive Valuation Simulator</h2>
                    <div className="w-16 h-[1px] bg-[#DDA0DD] mx-auto mt-3"></div>
                    <p className="text-[#2C1A3A]/70 text-xs sm:text-sm font-light max-w-xl mx-auto tracking-wide mt-2">
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
                              onClick={() => { triggerAudio('click'); setSelectedMetal('gold'); setSelectedPurity('22K'); }}
                              className={`flex-1 text-center font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${selectedMetal === 'gold'
                                ? 'bg-[#4B136A] text-white shadow-md'
                                : 'text-gray-500 hover:text-[#4B136A]'
                                }`}
                            >
                              Fine Gold
                            </button>
                            <button
                              onClick={() => { triggerAudio('click'); setSelectedMetal('silver'); setSelectedPurity('999'); }}
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
                                  onClick={() => { triggerAudio('click'); setSelectedPurity(pur.id); }}
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
                                  onClick={() => { triggerAudio('click'); setSelectedPurity(pur.id); }}
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
                                  triggerAudio('click');
                                  if (selectedMetal === 'gold') setGoldRate24k(prev => Math.max(5000, prev - 10));
                                  else setSilverRate(prev => Math.max(50, +(prev - 0.2).toFixed(2)));
                                }}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none"
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
                                    triggerAudio('click');
                                    if (selectedMetal === 'gold') setGoldRate24k(val);
                                    else setSilverRate(val);
                                  }}
                                  className="serif-luxury text-xl font-black text-center text-[#DDA0DD] w-28 bg-transparent border-b-2 border-dashed border-[#DDA0DD]/35 focus:border-[#DDA0DD] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                              </div>

                              <button
                                onClick={() => {
                                  triggerAudio('click');
                                  if (selectedMetal === 'gold') setGoldRate24k(prev => prev + 10);
                                  else setSilverRate(prev => +(prev + 0.2).toFixed(2));
                                }}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <span className="text-[8px] text-gray-400 leading-normal block text-center mt-2">Adjust live spot rates to preview custom jewelry estimates.</span>
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
                          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
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
                            <button onClick={() => setWeightInput(prev => Math.max(1, prev - 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                            <input
                              type="range"
                              min="1"
                              max="250"
                              value={weightInput}
                              onChange={(e) => setWeightInput(+e.target.value)}
                              className="flex-1 accent-[#4B136A] cursor-pointer"
                            />
                            <button onClick={() => setWeightInput(prev => Math.min(250, prev + 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
                          </div>
                        </div>

                        {/* Making & Wastage Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Making charges */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
                              <span>Making Charges</span>
                              <span className="text-[#DDA0DD] font-bold">{makingChargesInput}%</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button onClick={() => setMakingChargesInput(prev => Math.max(0, prev - 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                              <input
                                type="range"
                                min="0"
                                max="25"
                                value={makingChargesInput}
                                onChange={(e) => setMakingChargesInput(+e.target.value)}
                                className="flex-1 accent-[#4B136A] cursor-pointer"
                              />
                              <button onClick={() => setMakingChargesInput(prev => Math.min(25, prev + 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
                            </div>
                          </div>

                          {/* Wastage */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
                              <span>Wastage/Loss</span>
                              <span className="text-[#DDA0DD] font-bold">{wastageInput}%</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button onClick={() => setWastageInput(prev => Math.max(0, prev - 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                              <input
                                type="range"
                                min="0"
                                max="15"
                                step="0.5"
                                value={wastageInput}
                                onChange={(e) => setWastageInput(+e.target.value)}
                                className="flex-1 accent-[#4B136A] cursor-pointer"
                              />
                              <button onClick={() => setWastageInput(prev => Math.min(15, prev + 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
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
                            <span className="text-[8px] text-[#DDA0DD] tracking-[0.25em] font-extrabold block">LIVE ATELIER QUOTE</span>
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
                            onClick={() => { triggerAudio('shimmer'); setConsultationModal(true); }}
                            className="w-full py-3.5 rounded-[16px] bg-gradient-to-r from-[#DDA0DD] via-[#E7C86E] to-[#DDA0DD] hover:from-[#E7C86E] hover:to-[#DDA0DD] text-[#220033] font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer focus:outline-none"
                          >
                            Book Showroom Lock Rate
                          </button>
                          <button
                            onClick={() => {
                              triggerAudio('click');
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
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
                    <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Every 2 minutes</span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
                    <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">Secure &amp; Reliable</span>
                    <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Official rate source</span>
                  </div>

                  {/* Item 4 */}
                  <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
                    <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">Smart Calculator</span>
                    <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">Precise estimates</span>
                  </div>

                  {/* Item 5 */}
                  <div className="flex flex-col items-center justify-center gap-1.5 px-3 pt-4 md:pt-0">
                    <svg className="w-5 h-5 text-[#DDA0DD] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-[10px] sm:text-[11px] text-[#2C1A3A] font-bold tracking-widest uppercase font-sans">No Hidden Charges</span>
                    <span className="text-[8px] text-[#2C1A3A]/70 font-light font-sans uppercase tracking-wider">100% transparency</span>
                  </div>
                </div>
              </div>

              {/* 4. BOTTOM BOUNDARY WAVY CURVE */}
              <div className="relative w-full overflow-hidden -mt-1 bg-transparent select-none z-10">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
                  <path d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z" fill="#1C0D2A" />
                </svg>
                {/* Star placement in the center curve */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-[#DDA0DD] text-xl z-20 animate-pulse-slow">
                  ✦
                </div>
              </div>

              {/* 4. ATELIER VALUATION CALCULATOR MODAL */}
              {calculatorModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[#220033]/60 backdrop-blur-md transition-opacity" onClick={() => setCalculatorModalOpen(false)} />

                  <div className="relative w-full max-w-5xl bg-[#FCF9F5] border border-[#DDA0DD]/30 rounded-[24px] shadow-2xl p-6 sm:p-10 text-[#2C1A3A] animate-fade-in z-10 max-h-[90vh] overflow-y-auto font-sans">
                    <button
                      onClick={() => setCalculatorModalOpen(false)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-[#2C1A3A] text-xl font-bold p-1 focus:outline-none cursor-pointer"
                    >
                      ✕
                    </button>

                    <div className="text-center space-y-2 mb-8 select-none">
                      <span className="text-[9px] tracking-[0.25em] font-extrabold text-[#DDA0DD] uppercase block">ATELIER VALUATION SYSTEM</span>
                      <h3 className="serif-luxury text-2xl sm:text-3xl font-bold text-[#2C1A3A] font-serif">Interactive Valuation Simulator</h3>
                      <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left Column: Configuration & Simulators (lg:col-span-8) */}
                      <div className="lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Purity Config Card */}
                          <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-5 space-y-5 text-left select-none">
                            <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                              01. Purity Configuration
                            </span>

                            {/* Metal Selector Switch */}
                            <div className="flex rounded-full p-1 border border-[#DDA0DD]/20 bg-[#4B136A]/5">
                              <button
                                onClick={() => { triggerAudio('click'); setSelectedMetal('gold'); setSelectedPurity('22K'); }}
                                className={`flex-1 text-center font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${selectedMetal === 'gold'
                                  ? 'bg-[#4B136A] text-white shadow-md'
                                  : 'text-gray-500 hover:text-[#4B136A]'
                                  }`}
                              >
                                Fine Gold
                              </button>
                              <button
                                onClick={() => { triggerAudio('click'); setSelectedMetal('silver'); setSelectedPurity('999'); }}
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
                                    onClick={() => { triggerAudio('click'); setSelectedPurity(pur.id); }}
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
                                    onClick={() => { triggerAudio('click'); setSelectedPurity(pur.id); }}
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
                          <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-5 space-y-4 text-left flex flex-col justify-between select-none">
                            <div className="space-y-4">
                              <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                                02. Live Spot Rate (per 1g)
                              </span>
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    triggerAudio('click');
                                    if (selectedMetal === 'gold') setGoldRate24k(prev => Math.max(5000, prev - 10));
                                    else setSilverRate(prev => Math.max(50, +(prev - 0.2).toFixed(2)));
                                  }}
                                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none"
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
                                      triggerAudio('click');
                                      if (selectedMetal === 'gold') setGoldRate24k(val);
                                      else setSilverRate(val);
                                    }}
                                    className="serif-luxury text-xl font-black text-center text-[#DDA0DD] w-28 bg-transparent border-b-2 border-dashed border-[#DDA0DD]/35 focus:border-[#DDA0DD] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                </div>

                                <button
                                  onClick={() => {
                                    triggerAudio('click');
                                    if (selectedMetal === 'gold') setGoldRate24k(prev => prev + 10);
                                    else setSilverRate(prev => +(prev + 0.2).toFixed(2));
                                  }}
                                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs hover:bg-[#DDA0DD] hover:text-[#4B136A] transition-all cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <span className="text-[8px] text-gray-400 leading-normal block text-center mt-2">Adjust live spot rates to preview custom jewelry estimates.</span>
                          </div>
                        </div>

                        {/* Weight & Charges Slider Section */}
                        <div className="bg-white border border-[#DDA0DD]/20 rounded-[24px] p-6 space-y-6 text-left">
                          <span className="text-[10px] font-bold text-[#4B136A] tracking-wider uppercase font-sans block border-b border-gray-100 pb-2">
                            03. Simulated Ornament Specifications
                          </span>

                          {/* Weight Slider */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
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
                              <button onClick={() => setWeightInput(prev => Math.max(1, prev - 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                              <input
                                type="range"
                                min="1"
                                max="250"
                                value={weightInput}
                                onChange={(e) => setWeightInput(+e.target.value)}
                                className="flex-1 accent-[#4B136A] cursor-pointer"
                              />
                              <button onClick={() => setWeightInput(prev => Math.min(250, prev + 1))} className="w-8 h-8 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
                            </div>
                          </div>

                          {/* Making & Wastage Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Making charges */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
                                <span>Making Charges</span>
                                <span className="text-[#DDA0DD] font-bold">{makingChargesInput}%</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button onClick={() => setMakingChargesInput(prev => Math.max(0, prev - 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                                <input
                                  type="range"
                                  min="0"
                                  max="25"
                                  value={makingChargesInput}
                                  onChange={(e) => setMakingChargesInput(+e.target.value)}
                                  className="flex-1 accent-[#4B136A] cursor-pointer"
                                />
                                <button onClick={() => setMakingChargesInput(prev => Math.min(25, prev + 1))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
                              </div>
                            </div>

                            {/* Wastage */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#2C1A3A]">
                                <span>Wastage/Loss</span>
                                <span className="text-[#DDA0DD] font-bold">{wastageInput}%</span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button onClick={() => setWastageInput(prev => Math.max(0, prev - 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">-</button>
                                <input
                                  type="range"
                                  min="0"
                                  max="15"
                                  step="0.5"
                                  value={wastageInput}
                                  onChange={(e) => setWastageInput(+e.target.value)}
                                  className="flex-1 accent-[#4B136A] cursor-pointer"
                                />
                                <button onClick={() => setWastageInput(prev => Math.min(15, prev + 0.5))} className="w-6 h-6 border border-gray-200 hover:bg-gray-100 rounded-full cursor-pointer select-none">+</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Dynamic Quote Receipt (lg:col-span-4) */}
                      <div className="lg:col-span-4">
                        <div className="bg-gradient-to-br from-[#4B136A] via-[#220033] to-[#4B136A] border border-[#DDA0DD]/35 rounded-[24px] p-6 shadow-2xl space-y-6 text-left text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[#DDA0DD]/10 blur-xl rounded-full pointer-events-none"></div>

                          <div className="flex justify-between items-center border-b border-white/10 pb-4 select-none">
                            <div>
                              <span className="text-[8px] text-[#DDA0DD] tracking-[0.25em] font-extrabold block">LIVE ATELIER QUOTE</span>
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

                          <div className="bg-white/5 border border-white/10 rounded-2xl py-4 text-center space-y-1 select-none">
                            <span className="text-[8px] text-white/60 tracking-[0.2em] font-bold block uppercase">Estimated Final Value</span>
                            <span className="text-[#DDA0DD] font-black text-3xl block tracking-wide">
                              ₹{calculatedBullionCost.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[8px] text-white/40 font-mono block">ALL ESTIMATES INC. TAXES</span>
                          </div>

                          <div className="space-y-3 pt-2 select-none">
                            <button
                              onClick={() => { triggerAudio('shimmer'); setConsultationModal(true); setCalculatorModalOpen(false); }}
                              className="w-full py-3.5 rounded-[16px] bg-gradient-to-r from-[#DDA0DD] via-[#E7C86E] to-[#DDA0DD] hover:from-[#E7C86E] hover:to-[#DDA0DD] text-[#220033] font-extrabold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md cursor-pointer focus:outline-none"
                            >
                              Book Showroom Lock Rate
                            </button>
                            <button
                              onClick={() => {
                                triggerAudio('click');
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
                </div>
              )}
            </div>
          )}

          {/* ==========================================================
            E.2 GOLD COINS PAGE BLOCK
            ========================================== */}
          {currentPage === 'gold-coins' && (
            <div className={`transition-colors duration-500 min-h-screen pb-20 ${isCatalogDark ? 'bg-[#4A126D] text-[#FBF9FF]' : 'bg-[#FBF9FF] text-[#4A126D]'}`}>
              {/* 1. HERO BANNER */}
              <div className="relative overflow-hidden py-24 sm:py-32 select-none border-b border-gold/25" style={{ background: isCatalogDark ? 'radial-gradient(circle at 70% 30%, #161F38 0%, #0B0E17 100%)' : 'radial-gradient(circle at 70% 30%, #F4F0EB 0%, #FBF9FF 100%)' }}>
                {/* Background gold particles & spotlights */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                  <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-20 ${isCatalogDark ? 'bg-gold' : 'bg-gold/40'}`} />
                  {/* Custom drifting gold dust particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
                    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/45 animate-particle-1"></div>
                    <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#DDA0DD]/35 animate-particle-2"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full bg-[#DDA0DD]/50 animate-particle-3"></div>
                    <div className="absolute top-1/3 right-10 w-2 h-2 rounded-full bg-[#DDA0DD]/25 animate-particle-1"></div>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                  {/* Left content block */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.35em] text-[#DDA0DD] border border-[#DDA0DD]/35 px-5 py-2.5 rounded-full bg-[#4A126D]/80 backdrop-blur-xl shadow-2xl animate-fade-in gold-glow-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DDA0DD] animate-ping" />
                      <span>999 PURE GOLD</span>
                    </div>
                    <h1 className="serif-luxury text-4xl sm:text-6xl font-semibold leading-[1.1] tracking-wide">
                      Invest In <br />
                      <span className="bg-gradient-to-r from-gold via-[#E6C687] to-gold bg-clip-text text-transparent filter drop-shadow-sm font-bold">
                        Timeless Gold Coins
                      </span>
                    </h1>
                    <p className={`text-sm sm:text-base leading-relaxed tracking-wide font-light ${isCatalogDark ? 'text-[#FBF9FF]/80' : 'text-gray-600'}`}>
                      Discover certified gold coins crafted for gifting, investment and heritage value. Meticulously minted with auspicious traditional engravings, certified under strict BIS Hallmarks for absolute purity.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => {
                          triggerAudio('click');
                          const el = document.getElementById('coins-catalogue-anchor');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3.5 bg-gradient-to-r from-gold to-[#DDA0DD] hover:from-[#DDA0DD] hover:to-gold text-navy text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                      >
                        Explore Coins
                      </button>
                      <button
                        onClick={() => {
                          triggerAudio('click');
                          const el = document.getElementById('coins-catalogue-anchor');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-8 py-3.5 border text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${isCatalogDark ? 'border-gold/30 hover:border-gold text-gold bg-white/5' : 'border-gold/50 hover:border-gold text-navy bg-gold/5'}`}
                      >
                        View Purity
                      </button>
                    </div>
                  </div>

                  {/* Right side: 3D floating coin showcase with reflections & shadows (5-coin cascade) */}
                  <div className="lg:col-span-5 flex justify-center items-center relative min-h-[380px] w-full select-none pointer-events-auto">
                    {/* Outer glow aura */}
                    <div className="absolute w-[320px] h-[320px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

                    {/* Coin 1: Temple Coin (Center Main) */}
                    <div className="relative z-30 transform hover:scale-105 transition-transform duration-500 animate-float-gentle group cursor-pointer select-none" onClick={() => { triggerAudio('shimmer'); setCoinDetailOpen(GOLD_COINS_DATA[0]); setCoinDetailImg(0); }}>
                      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-[6px] border-gold/45 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-2xl relative overflow-hidden flex items-center justify-center p-2">
                        <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none" style={{ backgroundImage: `url(${laxmiGoldCoin})` }} />
                        <div className="absolute inset-3 border-2 border-gold/30 rounded-full flex flex-col items-center justify-center text-center p-4 bg-gold/10 backdrop-blur-[1px] select-none">
                          <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">🔱</span>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4A126D] mt-2 leading-none">HR JEWELLERS</span>
                          <span className="text-[7px] font-bold text-navy/70 tracking-widest mt-1">24K 999.9 PURE</span>
                          <span className="text-[8px] font-black text-[#4A126D] mt-2">10 GRAMS</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none" />
                      </div>
                      <div className="absolute -bottom-6 left-8 right-8 h-4 bg-[#4A126D]/30 rounded-full blur-lg" />
                    </div>

                    {/* Coin 2: 22K Coin (Floating Right-Top) */}
                    <div className="absolute right-[-15px] top-[5%] z-20 transform scale-[0.7] hover:scale-[0.75] transition-all duration-500 animate-float-gentle cursor-pointer select-none" style={{ animationDelay: '1.2s' }} onClick={() => { triggerAudio('shimmer'); setCoinDetailOpen(GOLD_COINS_DATA[6]); setCoinDetailImg(0); }}>
                      <div className="w-36 h-36 rounded-full border-[4px] border-gold/40 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-xl flex items-center justify-center p-2 relative overflow-hidden group">
                        <div className="absolute inset-1.5 border border-gold/30 rounded-full flex flex-col items-center justify-center text-center p-2">
                          <span className="text-xl">👑</span>
                          <span className="text-[7px] font-black tracking-wider text-navy mt-1">BIKANER MINT</span>
                          <span className="text-[8px] font-black text-navy mt-1">22K 916</span>
                          <span className="text-[7px] font-bold text-navy/70">8 GRAMS</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </div>
                      <div className="absolute -bottom-4 left-6 right-6 h-3 bg-[#4A126D]/20 rounded-full blur-md" />
                    </div>

                    {/* Coin 3: 24K Coin (Floating Left-Top) */}
                    <div className="absolute left-[-20px] top-[10%] z-15 transform scale-[0.75] hover:scale-[0.8] transition-all duration-500 animate-float-gentle cursor-pointer select-none" style={{ animationDelay: '2.4s' }} onClick={() => { triggerAudio('shimmer'); setCoinDetailOpen(GOLD_COINS_DATA[2]); setCoinDetailImg(0); }}>
                      <div className="w-40 h-40 rounded-full border-[4px] border-gold/40 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-xl flex items-center justify-center p-2 relative overflow-hidden group">
                        <div className="absolute inset-1.5 border border-gold/30 rounded-full flex flex-col items-center justify-center text-center p-2">
                          <span className="text-xl">🪙</span>
                          <span className="text-[7px] font-black tracking-wider text-navy mt-1">SOVEREIGN</span>
                          <span className="text-[8px] font-black text-navy mt-1">24K 999.9</span>
                          <span className="text-[7px] font-bold text-navy/70">20 GRAMS</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </div>
                      <div className="absolute -bottom-4 left-6 right-6 h-3 bg-[#4A126D]/20 rounded-full blur-md" />
                    </div>

                    {/* Coin 4: Lakshmi Coin (Floating Right-Bottom) */}
                    <div className="absolute right-[5%] bottom-[-5%] z-25 transform scale-[0.8] hover:scale-[0.85] transition-all duration-500 animate-float-gentle cursor-pointer select-none" style={{ animationDelay: '1.8s' }} onClick={() => { triggerAudio('shimmer'); setCoinDetailOpen(GOLD_COINS_DATA[1]); setCoinDetailImg(0); }}>
                      <div className="w-38 h-38 rounded-full border-[4.5px] border-gold/45 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-2xl flex items-center justify-center p-2 relative overflow-hidden group">
                        <div className="absolute inset-1.5 border border-gold/35 rounded-full flex flex-col items-center justify-center text-center p-2">
                          <span className="text-2xl filter drop-shadow-md">🪷</span>
                          <span className="text-[6.5px] font-black tracking-wider text-navy mt-1">LAXMI EMBLEM</span>
                          <span className="text-[7.5px] font-black text-navy mt-0.5">5 GRAMS</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </div>
                      <div className="absolute -bottom-4 left-6 right-6 h-3 bg-[#4A126D]/25 rounded-full blur-md" />
                    </div>

                    {/* Coin 5: Gift Coin (Floating Left-Bottom) */}
                    <div className="absolute left-[8%] bottom-[-8%] z-10 transform scale-[0.6] hover:scale-[0.65] transition-all duration-500 animate-float-gentle cursor-pointer select-none" style={{ animationDelay: '3.0s' }} onClick={() => { triggerAudio('shimmer'); setCoinDetailOpen(GOLD_COINS_DATA[5]); setCoinDetailImg(0); }}>
                      <div className="w-32 h-32 rounded-full border-[3px] border-gold/35 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-lg flex items-center justify-center p-1.5 relative overflow-hidden group">
                        <div className="absolute inset-1 border border-gold/20 rounded-full flex flex-col items-center justify-center text-center p-2">
                          <span className="text-lg">✨</span>
                          <span className="text-[6px] font-black tracking-wider text-navy">SHUBH LABH</span>
                          <span className="text-[7px] font-black text-navy mt-1">1 GRAM</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </div>
                      <div className="absolute -bottom-4 left-6 right-6 h-3 bg-[#4A126D]/15 rounded-full blur-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. STICKY PURITY & WEIGHT SELECTOR BAR */}
              <div id="coins-catalogue-anchor" className="sticky top-20 z-30 py-4 shadow-md backdrop-blur-xl border-b transition-colors duration-300 select-none bg-opacity-95" style={{ backgroundColor: isCatalogDark ? '#4A126DEE' : '#FCFAFFEE', borderColor: isCatalogDark ? '#DDA0DD30' : '#4A126D15' }}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Purity selector tabs */}
                  <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <span className="text-[10px] uppercase tracking-widest font-black mr-2 opacity-60 shrink-0">Purity:</span>
                    {[
                      { key: 'all', label: 'All Purity' },
                      { key: '24K', label: '24K (999.9 Purity)' },
                      { key: '22K', label: '22K (916 Purity)' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => { triggerAudio('click'); setCoinPurityTab(tab.key); }}
                        className={`px-4 py-2 text-[10px] uppercase font-bold tracking-wider rounded-lg border transition-all duration-305 cursor-pointer whitespace-nowrap ${coinPurityTab === tab.key
                          ? 'bg-gold border-gold text-[#4A126D] shadow-md'
                          : isCatalogDark
                            ? 'border-gold/20 hover:border-gold/50 text-[#FBF9FF]/80 hover:text-white bg-white/5'
                            : 'border-gray-200 hover:border-gold/50 text-gray-700 hover:text-navy bg-white'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Weight selector filters */}
                  <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <span className="text-[10px] uppercase tracking-widest font-black mr-2 opacity-60 shrink-0">Weight:</span>
                    {[
                      { key: 'all', label: 'All Weights' },
                      { key: '0.5', label: '0.5g' },
                      { key: '1', label: '1g' },
                      { key: '2', label: '2g' },
                      { key: '5', label: '5g' },
                      { key: '8', label: '8g' },
                      { key: '10', label: '10g' },
                      { key: '20', label: '20g' },
                      { key: '50', label: '50g' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => { triggerAudio('click'); setCoinWeightFilter(filter.key); }}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-305 cursor-pointer ${coinWeightFilter === filter.key
                          ? 'bg-gold border-gold text-[#4A126D] shadow-md'
                          : isCatalogDark
                            ? 'border-gold/10 hover:border-gold/30 text-[#FBF9FF]/75 hover:text-white bg-white/5'
                            : 'border-gray-200 hover:border-gold/30 text-gray-600 hover:text-navy bg-white'
                          }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>


                </div>
              </div>

              {/* 3. COIN CATALOGUE GRID */}
              <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 text-center">
                <div className="space-y-3 mb-12">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Patron Investment Guild</span>
                  <h2 className="serif-luxury text-3xl sm:text-4xl font-semibold">Available Gold Coins Catalogue</h2>
                  <div className="w-12 h-[1px] bg-gold mx-auto mt-2"></div>
                  <p className={`text-xs max-w-xl mx-auto font-light leading-relaxed ${isCatalogDark ? 'text-[#FBF9FF]/60' : 'text-gray-500'}`}>
                    Real-time transparent pricing recalculated live based on current 24K spot gold rate: <span className="font-bold text-gold">₹{goldRate24k}/10g</span>. All products are fully sealed and certified.
                  </p>
                </div>

                {/* Grid block */}
                {(() => {
                  const filteredCoins = GOLD_COINS_DATA.filter((coin) => {
                    const matchPurity = coinPurityTab === 'all' || coin.purity === coinPurityTab;
                    const matchWeight = coinWeightFilter === 'all' || coin.weightGm.toString() === coinWeightFilter;
                    return matchPurity && matchWeight;
                  });

                  if (filteredCoins.length === 0) {
                    return (
                      <div className="py-24 space-y-4 text-center">
                        <span className="text-4xl">🪙</span>
                        <h3 className="serif-luxury text-lg font-bold">No coins match selected filters</h3>
                        <p className="text-xs opacity-60">Try choosing "All Purity" or "All Weights" to browse the entire collection.</p>
                        <button onClick={() => { triggerAudio('click'); setCoinPurityTab('all'); setCoinWeightFilter('all'); }} className="px-6 py-2 bg-gold text-[#4A126D] text-[10px] uppercase font-bold tracking-widest rounded-lg cursor-pointer">Reset Filters</button>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {filteredCoins.map((coin) => {
                        const prices = calculateCoinPrice(coin, goldRate24k);
                        const isWishlisted = wishlistItems.some((w) => w.id === coin.id);

                        return (
                          <div
                            key={coin.id}
                            className={`group border rounded-3xl p-6 transition-all duration-500 flex flex-col relative overflow-hidden select-none hover:-translate-y-1.5 gold-glow-border ${isCatalogDark
                              ? 'glass-luxury-dark border-gold/15 hover:border-[#DDA0DD]/50 shadow-lg hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]'
                              : 'glass-luxury-light border-gold/10 hover:border-[#DDA0DD]/45 shadow-md hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]'
                              }`}
                          >
                            {/* Image & floating action layout */}
                            <div className={`relative aspect-square rounded-2xl flex items-center justify-center p-6 mb-5 overflow-hidden transition-colors ${isCatalogDark ? 'bg-[#4A126D]/40' : 'bg-[#FBF9FF]'}`}>
                              {/* Coin display with shimmer */}
                              <div className="relative w-40 h-40 rounded-full border-[4px] border-gold/30 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-xl flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-105 relative overflow-hidden">
                                {/* Coin background texture reflection */}
                                <div className="absolute inset-0 bg-cover bg-center opacity-25 select-none pointer-events-none" style={{ backgroundImage: `url('${coin.img}')` }} />

                                <div className="absolute inset-1 border border-gold/20 rounded-full flex flex-col items-center justify-center text-center p-2">
                                  <span className="text-xl filter drop-shadow">🪷</span>
                                  <span className="text-[7px] font-black tracking-wider text-navy mt-1 leading-none">{coin.category}</span>
                                  <span className="text-[8px] font-black text-[#4A126D] mt-1 leading-none">{coin.weightGm}g</span>
                                  <span className="text-[6px] font-bold text-navy/60 leading-none mt-1">{coin.purity} PURE</span>
                                </div>
                                {/* Glare reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              </div>

                              {/* Wishlist floating toggle */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWishlist({
                                    id: coin.id,
                                    name: coin.name,
                                    price: prices.total,
                                    img: coin.img,
                                    weight: `${coin.weightGm}g`,
                                    carat: `${coin.purity} Gold Coin`
                                  });
                                }}
                                className={`absolute top-3 right-3 p-2.5 rounded-full border transition-all duration-305 cursor-pointer ${isWishlisted
                                  ? 'bg-[#DDA0DD] border-[#DDA0DD] text-[#4A126D] scale-110'
                                  : isCatalogDark
                                    ? 'border-white/10 hover:border-gold/50 text-[#FBF9FF]/60 hover:text-gold bg-[#4A126D]/60'
                                    : 'border-gray-100 hover:border-gold/40 text-gray-400 hover:text-gold bg-white shadow-sm'
                                  }`}
                                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                              >
                                <svg className="w-3.5 h-3.5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                              </button>

                              {/* Purity hallmark tag */}
                              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-gold/10 border border-gold/30 text-[7px] font-bold text-gold tracking-widest uppercase">
                                BIS 999.9 Hallmarked
                              </span>
                            </div>

                            {/* Coin Info */}
                            <div className="text-left space-y-1.5 flex-grow">
                              <span className="text-[8px] uppercase tracking-widest text-gold font-bold">{coin.purity} • {coin.weightGm} Grams</span>
                              <h3 className="serif-luxury text-sm font-bold truncate tracking-wide leading-snug">{coin.name}</h3>
                              <p className={`text-[10px] font-light leading-normal line-clamp-2 ${isCatalogDark ? 'text-[#FBF9FF]/65' : 'text-gray-400'}`}>{coin.description}</p>

                              {/* Live Valuation Breakdown in popover detail */}
                              <div className={`mt-3 p-3 rounded-2xl space-y-1 ${isCatalogDark ? 'bg-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                                <div className="flex justify-between items-center text-[10px] opacity-70">
                                  <span>Metal Base Value:</span>
                                  <span className="font-sans">₹{prices.baseMetalValue.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] opacity-70">
                                  <span>Making Charges ({coin.makingChargePercent}%):</span>
                                  <span className="font-sans">₹{prices.makingCharges.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] opacity-70 border-b pb-1" style={{ borderColor: isCatalogDark ? '#FFFFFF10' : '#EAE6E1' }}>
                                  <span>GST (3%):</span>
                                  <span className="font-sans">₹{prices.gst.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-gold pt-1">
                                  <span>Live Price:</span>
                                  <span className="font-sans text-xs">₹{prices.total.toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            </div>

                            {/* Quick details / consultation buttons */}
                            <div className="mt-5 grid grid-cols-2 gap-2 pt-3 border-t" style={{ borderColor: isCatalogDark ? '#FFFFFF05' : '#FBF9FF' }}>
                              <button
                                onClick={() => {
                                  triggerAudio('click');
                                  setCoinDetailOpen(coin);
                                  setCoinDetailImg(0);
                                }}
                                className={`py-2 text-[8px] uppercase tracking-widest font-black rounded-lg border transition-all cursor-pointer ${isCatalogDark
                                  ? 'border-white/10 hover:border-gold/50 text-[#FBF9FF] hover:bg-white/5'
                                  : 'border-gray-200 hover:border-gold/50 text-[#4A126D] hover:bg-gray-50'
                                  }`}
                              >
                                🔍 View Specs
                              </button>

                              <button
                                onClick={() => {
                                  handleAddToCart({
                                    id: coin.id,
                                    name: coin.name,
                                    price: prices.total,
                                    img: coin.img,
                                    weight: `${coin.weightGm}g`,
                                    carat: `${coin.purity} Gold Coin`
                                  });
                                }}
                                className="py-2 text-[8px] uppercase tracking-widest font-black rounded-lg bg-gradient-to-r from-gold to-[#DDA0DD] hover:from-[#DDA0DD] hover:to-gold text-[#4A126D] transition-all transform hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                              >
                                🛍️ Add to Bag
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* 4. PRODUCT DETAIL MODAL FOR GOLD COIN */}
              {coinDetailOpen && (() => {
                const coin = coinDetailOpen;
                const prices = calculateCoinPrice(coin, goldRate24k);
                const isWishlisted = wishlistItems.some((w) => w.id === coin.id);

                return (
                  <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-md bg-[#4A126D]/75 flex justify-center items-center p-4">
                    <div className={`relative max-w-4xl w-full rounded-[2.5rem] border overflow-hidden p-6 sm:p-8 select-none ${isCatalogDark ? 'bg-[#4A126D] border-gold/30 text-[#FBF9FF]' : 'bg-[#FBF9FF] border-gold/20 text-[#4A126D]'}`}>
                      {/* Close button */}
                      <button
                        onClick={() => { triggerAudio('click'); setCoinDetailOpen(null); }}
                        className={`absolute top-5 right-5 p-2 rounded-full border transition-all cursor-pointer z-50 ${isCatalogDark ? 'border-white/10 text-white/60 hover:text-white bg-white/5' : 'border-gray-200 text-gray-600 hover:text-navy bg-white shadow'}`}
                      >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
                        {/* Left: Interactive coin gallery */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
                          <div className={`w-full aspect-square rounded-3xl flex items-center justify-center p-8 relative overflow-hidden mb-4 ${isCatalogDark ? 'bg-[#4A126D]/40 border border-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}>
                            {/* Main large display with micro glow */}
                            <div className="relative w-52 h-52 rounded-full border-[5px] border-gold/40 bg-gradient-to-br from-gold via-[#F2D8FF] to-[#DDA0DD] shadow-2xl flex items-center justify-center p-2 relative overflow-hidden transform hover:scale-105 transition-transform duration-500 group">
                              <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none" style={{ backgroundImage: `url('${coin.img}')` }} />
                              <div className="absolute inset-2 border-2 border-gold/20 rounded-full flex flex-col items-center justify-center text-center p-4">
                                <span className="text-3xl">🔱</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-navy mt-2 leading-none">HR JEWELLERS</span>
                                <span className="text-[7px] font-bold text-navy/70 tracking-widest mt-1">{coin.purity} PURE</span>
                                <span className="text-[9px] font-black text-navy mt-2">{coin.weightGm}g</span>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </div>
                          </div>

                          {/* Image gallery switcher tabs */}
                          <div className="flex gap-2 justify-center">
                            {[
                              { label: 'Obverse Face 🪙', idx: 0 },
                              { label: 'Cert Assay 📄', idx: 1 }
                            ].map((t) => (
                              <button
                                key={t.idx}
                                onClick={() => { triggerAudio('click'); setCoinDetailImg(t.idx); }}
                                className={`px-3 py-1.5 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${coinDetailImg === t.idx
                                  ? 'bg-gold border-gold text-[#4A126D]'
                                  : isCatalogDark
                                    ? 'border-white/10 text-white/70 hover:bg-white/5'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                                  }`}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right: Technical specifications list & transparent invoice */}
                        <div className="md:col-span-7 flex flex-col justify-between text-left space-y-5">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 rounded bg-gold/10 border border-gold/30 text-[8px] font-bold text-gold tracking-widest uppercase">
                                {coin.purity} Purity
                              </span>
                              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[8px] font-bold opacity-75 tracking-widest uppercase">
                                {coin.weightGm}g Weight
                              </span>
                            </div>
                            <h2 className="serif-luxury text-2xl font-semibold leading-tight tracking-wide">{coin.name}</h2>
                            <p className={`text-xs font-light leading-relaxed ${isCatalogDark ? 'text-[#FBF9FF]/75' : 'text-gray-500'}`}>{coin.description}</p>
                          </div>

                          {/* Technical specification details table */}
                          <div className={`p-4 rounded-2xl text-xs space-y-2.5 ${isCatalogDark ? 'bg-white/5 border border-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                            <h4 className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1.5">ATELIER SPEC SHEET:</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-[10px]">
                              <div className="opacity-60">Metal Material:</div>
                              <div className="font-bold">Fine Solid Gold ({coin.purity})</div>
                              <div className="opacity-60">Pure Gram Weight:</div>
                              <div className="font-bold">{coin.weightGm} Grams</div>
                              <div className="opacity-60">Fineness Factor:</div>
                              <div className="font-bold">{coin.purity === '24K' ? '999.9 (24 Carat)' : '916 (22 Carat)'}</div>
                              <div className="opacity-60">Refinery Certification:</div>
                              <div className="font-bold text-gold">{coin.certification}</div>
                              <div className="opacity-60">Refining Process:</div>
                              <div className="font-bold">Serialized High-Pressure Mint Cast</div>
                              <div className="opacity-60">Buyback Guarantee:</div>
                              <div className="font-bold text-gold">100% Lifetime Atelier Assured</div>
                            </div>
                          </div>

                          {/* Interactive invoice breakdown block */}
                          <div className={`p-4 rounded-2xl text-xs space-y-2 border ${isCatalogDark ? 'bg-[#4A126D]/60 border-gold/15' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#DDA0DD]">Transparent Dynamic Pricing Invoice</h4>
                            <div className="space-y-1.5 text-[10px]">
                              <div className="flex justify-between items-center">
                                <span className="opacity-75">Base Gold Rate (24K/10g):</span>
                                <span className="font-sans">₹{goldRate24k.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="opacity-75">Coin Base Value ({coin.weightGm}g of {coin.purity}):</span>
                                <span className="font-sans">₹{prices.baseMetalValue.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="opacity-75">Atelier Minting Charges ({coin.makingChargePercent}%):</span>
                                <span className="font-sans">₹{prices.makingCharges.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between items-center border-b pb-1.5" style={{ borderColor: isCatalogDark ? '#FFFFFF10' : '#EAE6E1' }}>
                                <span className="opacity-75">Government IGST (3%):</span>
                                <span className="font-sans">₹{prices.gst.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm font-bold text-gold pt-1">
                                <span>Grand Valuation Net Total:</span>
                                <span className="font-sans text-sm">₹{prices.total.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Transaction buy / wishlist buttons */}
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                toggleWishlist({
                                  id: coin.id,
                                  name: coin.name,
                                  price: prices.total,
                                  img: coin.img,
                                  weight: `${coin.weightGm}g`,
                                  carat: `${coin.purity} Gold Coin`
                                });
                              }}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${isWishlisted
                                ? 'bg-[#DDA0DD] border-[#DDA0DD] text-[#4A126D] scale-105'
                                : isCatalogDark
                                  ? 'border-white/10 hover:border-gold text-[#FBF9FF]/65 hover:text-gold bg-white/5'
                                  : 'border-gray-200 hover:border-gold text-gray-505 hover:text-gold bg-white'
                                }`}
                              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <svg className="w-4.5 h-4.5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                              </svg>
                            </button>

                            <button
                              onClick={() => {
                                handleAddToCart({
                                  id: coin.id,
                                  name: coin.name,
                                  price: prices.total,
                                  img: coin.img,
                                  weight: `${coin.weightGm}g`,
                                  carat: `${coin.purity} Gold Coin`
                                });
                                setCoinDetailOpen(null);
                              }}
                              className="flex-grow py-3.5 rounded-xl bg-gradient-to-r from-gold to-[#DDA0DD] hover:from-[#DDA0DD] hover:to-gold text-[#4A126D] text-xs uppercase font-bold tracking-widest transition-all transform hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                            >
                              🛍️ Add to Bag / Lock Rate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 5. EDITORIAL TRUST SECTION */}
              <div className={`py-20 select-none border-t ${isCatalogDark ? 'bg-[#4A126D] border-white/5' : 'bg-white border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Absolute Security Assured</span>
                    <h2 className="serif-luxury text-3xl sm:text-4xl font-semibold animate-fade-in">Atelier Minting Security & Trust Guarantees</h2>
                    <div className="w-12 h-[1px] bg-gold mx-auto mt-2"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {[
                      {
                        title: "NABL Certified Refinery",
                        icon: "🏭",
                        desc: "Every single gold coin is sourced from NABL accredited gold refineries, guaranteeing pure high-pressure minting standards."
                      },
                      {
                        title: "999.9 Sovereign Purity",
                        icon: "👑",
                        desc: "Our coins strictly carry 999.9 fineness on 24K and 916 hallmarks on 22K, backed by complete laboratory validation tags."
                      },
                      {
                        title: "Fully Insured Home Transit",
                        icon: "🚚",
                        desc: "All coin dispatches within Rajasthan are fully insured during transportation under strict lock-box security guidelines."
                      },
                      {
                        title: "Lifetime Buyback Guarantee",
                        icon: "🔄",
                        desc: "Get instant absolute liquidity with our 100% buyback guarantee valued at current spot metal rates without deductions."
                      },
                      {
                        title: "Safe Showroom Collection",
                        icon: "🏛️",
                        desc: "Prefer pick-up? Complete your buy online and collect in-person inside our Tilak Nagar Flagship Fitted Suites in absolute privacy."
                      },
                      {
                        title: "Master Goldsmith Verification",
                        icon: "✍️",
                        desc: "Every order carries a physical signature certificate of master smith Anil Soni, assuring authentic purity checks."
                      }
                    ].map((tr, idx) => (
                      <div
                        key={idx}
                        className={`group border rounded-3xl p-6 text-left space-y-4 hover:-translate-y-2 hover:z-10 gold-glow-border transition-all duration-500 relative overflow-hidden ${isCatalogDark
                          ? 'glass-luxury-dark border-gold/15 hover:border-[#DDA0DD]/50 shadow-lg hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]'
                          : 'glass-luxury-light border-gold/10 hover:border-[#DDA0DD]/45 shadow-md hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]'
                          }`}
                      >
                        {/* Ambient shine glaze */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                        <div className="flex justify-between items-center relative z-10">
                          <span className="serif-luxury text-gold font-extrabold text-sm tracking-widest">✦ 0{idx + 1}</span>
                          <span className="text-2xl group-hover:scale-125 transition-transform duration-300 filter drop-shadow-md">{tr.icon}</span>
                        </div>
                        <h4 className="serif-luxury text-base font-bold tracking-wide relative z-10">{tr.title}</h4>
                        <p className={`text-xs font-light leading-relaxed tracking-wide relative z-10 ${isCatalogDark ? 'text-white/70' : 'text-gray-500'}`}>{tr.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. EDITORIAL INVESTMENT BENEFITS */}
              <div className={`py-20 select-none border-t ${isCatalogDark ? 'bg-[#4A126D]/40 border-white/5' : 'bg-[#FBF9FF] border-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-12">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Generational Value Strategy</span>
                    <h2 className="serif-luxury text-3xl sm:text-4xl font-semibold">Why Invest In HR Gold Coins?</h2>
                    <div className="w-12 h-[1px] bg-gold mx-auto mt-2"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Ultimate Inflation Hedge",
                        icon: "📈",
                        desc: "Gold maintains purchasing power across decades. Safeguard your family financial safety net against inflation volatility with solid bullion."
                      },
                      {
                        title: "Absolute Liquidity Assets",
                        icon: "💧",
                        desc: "Gold coins are globally recognized liquid assets, accepted by banking systems, pawnshops, and goldsmiths anywhere instantly."
                      },
                      {
                        title: "Zero-Waste Pricing Value",
                        icon: "🍃",
                        desc: "Unlike intricate bridal jewellery, investment-grade coins carry extremely minimal making charges, retaining near 100% metal value."
                      },
                      {
                        title: "Intergenerational Heirloom Assets",
                        icon: "👨‍👩‍👧‍👦",
                        desc: "Easily transferable, lightweight physical assets that pass on generations of royal security from mothers to daughters."
                      },
                      {
                        title: "Auspicious Traditional Gifting",
                        icon: "🎁",
                        desc: "The ultimate representation of honor and blessings for weddings, newborns, Diwali, and corporate grand opening milestones."
                      },
                      {
                        title: "Melt & Remake Adaptability",
                        icon: "🔥",
                        desc: "Store pure metal bars in your locker today, and melt them later to forge beautiful custom-fit ornaments when the occasion demands."
                      }
                    ].map((tr, idx) => (
                      <div
                        key={idx}
                        className={`group border rounded-3xl p-6 text-left space-y-4 hover:-translate-y-1.5 transition-all duration-500 hover:shadow-lg relative overflow-hidden ${isCatalogDark
                          ? 'border-gold/10 bg-[#4A126D]/60 hover:bg-[#4A126D] hover:border-gold/30'
                          : 'border-gray-100 bg-white hover:bg-white shadow-sm hover:border-gold/20'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="serif-luxury text-gold font-black text-sm">✧ Phase 0{idx + 1}</span>
                          <span className="text-xl group-hover:scale-110 transition-transform">{tr.icon}</span>
                        </div>
                        <h4 className="serif-luxury text-base font-bold tracking-wide">{tr.title}</h4>
                        <p className={`text-xs font-light leading-relaxed tracking-wide ${isCatalogDark ? 'opacity-70' : 'text-gray-500'}`}>{tr.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
            F. CONTACT / Lounge Suites PAGE VIEW
            ========================================== */}
          {currentPage === 'showrooms' && (
            <div className="transition-colors duration-500 min-h-screen pb-8 bg-[#FCFAFF] text-[#4A126D]">
              <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12 animate-slide-up text-center">

                {/* Header */}
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-[#F3EEF5] border border-purple-200 px-4 py-1.5 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A126D] animate-pulse"></span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A126D] font-bold">
                      FLAGSHIP FITTING LOUNGE
                    </span>
                  </div>
                  <h1 className="serif-luxury text-4xl sm:text-5xl font-semibold text-[#4A126D] leading-tight">
                    Private Showroom Suite Appointments
                  </h1>
                  <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                </div>

                {/* Split contact forms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">

                  {/* Showroom metadata */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="serif-luxury text-xl text-[#4A126D] font-bold mb-4">Flagship Bikaner Showroom</h3>
                      <div className="space-y-4 text-xs font-light text-gray-600 leading-relaxed">
                        <p>📍 <strong>Atelier Address:</strong> 4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan (334001)</p>
                        <p>📞 <strong>Direct Atelier Phone:</strong> +91 97838 43978 / +91 76108 43978</p>
                        <p>✉️ <strong>Electronic Support:</strong> notifications@hrjewellers.com</p>
                        <p>⏰ <strong>Visiting Hours:</strong> Monday - Sunday (11:00 AM - 08:30 PM)</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 space-y-2 text-xs font-bold text-gray-800">
                      <p>✓ Secured private lounge suite key</p>
                      <p>✓ Personal master goldsmith adviser</p>
                      <p>✓ In-hand preview of complete catalog</p>
                    </div>
                  </div>

                  {/* Consultation Booking form */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-4">
                    <h3 className="serif-luxury text-lg text-[#4A126D] font-bold">Book Advisory Fitting Suite</h3>

                    {loungeSuccess ? (
                      <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4">
                        <h4 className="serif-luxury text-xl font-bold text-[#006361]">Appointment Suite Confirmed!</h4>
                        <p className="text-xs text-gray-600">Your private booking pass <strong>{consultationPassCode}</strong> has been logged and sent to our atelier masters.</p>
                        <div className="bg-white border border-gray-100 rounded-xl p-3 inline-block font-mono text-sm text-[#006361] font-bold">
                          {consultationPassCode}
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleLoungeBookingSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="lounge-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Patron Name</label>
                          <input
                            id="lounge-name"
                            type="text"
                            required
                            placeholder="e.g. Suryaveer Singh"
                            value={consultationForm.name}
                            onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                            className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="lounge-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp Phone</label>
                            <input
                              id="lounge-phone"
                              type="tel"
                              required
                              placeholder="e.g. 9783843978"
                              value={consultationForm.phone}
                              onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                              className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="lounge-date" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Select Date</label>
                            <input
                              id="lounge-date"
                              type="date"
                              required
                              value={consultationForm.date}
                              onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })}
                              className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md"
                        >
                          Authenticate Lounge Access
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ==========================================
            F. 11+1 WIZARD SAVINGS ENROLLMENT PAGE VIEW
            ========================================== */}
          {currentPage === 'savings-enroll' && (
            <div className="bg-[#FAF8F6] min-h-screen pb-16 font-sans text-gray-800">

              {/* Enrollment Header */}
              <header className="w-full bg-white border-b border-gray-200 py-4 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Logo */}
                <div onClick={() => navigateTo('home')} className="flex items-center space-x-2 font-serif text-lg font-bold text-[#031838] tracking-widest cursor-pointer">
                  <span>HR JEWELLER & SONS</span>
                </div>

                {/* Progress Bar (Matching BlueStone style) */}
                {savingsEnrollStep <= 3 && (
                  <div className="flex items-center space-x-4 text-xs font-semibold select-none">
                    <div className="flex flex-col items-center">
                      <span className={`${savingsEnrollStep === 1 ? 'text-[#031838]' : 'text-gray-400'}`}>Personal Details</span>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${savingsEnrollStep >= 1 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300'}`}>
                        {savingsEnrollStep > 1 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="w-12 h-[2px] bg-gray-200 mt-4" style={{ backgroundColor: savingsEnrollStep > 1 ? '#006361' : '#E5E7EB' }} />
                    <div className="flex flex-col items-center">
                      <span className={`${savingsEnrollStep === 2 ? 'text-[#031838]' : 'text-gray-400'}`}>Nominee Details</span>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${savingsEnrollStep >= 2 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
                        {savingsEnrollStep > 2 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className="w-12 h-[2px] bg-gray-200 mt-4" style={{ backgroundColor: savingsEnrollStep > 2 ? '#006361' : '#E5E7EB' }} />
                    <div className="flex flex-col items-center">
                      <span className={`${savingsEnrollStep === 3 ? 'text-[#031838]' : 'text-gray-400'}`}>Payment Details</span>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${savingsEnrollStep >= 3 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
                        {savingsEnrollStep > 3 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </div>
                )}

                {/* Secure Badge */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 tracking-wide select-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#006361]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-bold text-[#006361]">100% SECURE</span>
                </div>
              </header>

              {/* Main Content Layout */}
              <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-10">

                {savingsEnrollStep === 4 ? (
                  /* STEP 4: SUCCESS RECEIPT SCREEN */
                  <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 shadow-xl text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h2 className="serif-luxury text-3xl font-bold text-[#031838]">Enrollment Initiated Successfully!</h2>
                      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                        Your application for the 11+1 Gold Saving scheme is processed. An Atelier Specialist will contact you on WhatsApp to finalize direct bank mandate links.
                      </p>
                    </div>

                    <div className="border border-dashed border-gray-200 rounded-2xl p-6 text-left space-y-3 bg-[#FAF8F6]">
                      <div className="flex justify-between text-xs text-gray-600"><span className="font-bold">Subscriber Name</span><span>{savingsEnrollForm.name}</span></div>
                      <div className="flex justify-between text-xs text-gray-600"><span className="font-bold">Contact Phone</span><span>{savingsEnrollForm.mobile}</span></div>
                      <div className="flex justify-between text-xs text-gray-600"><span className="font-bold">Email Address</span><span>{savingsEnrollForm.email}</span></div>
                      <div className="flex justify-between text-xs text-gray-600"><span className="font-bold">Nominee Name</span><span>{savingsEnrollForm.nomineeName} ({savingsEnrollForm.nomineeRelationship})</span></div>
                      <div className="h-[1px] bg-gray-200 my-2" />
                      <div className="flex justify-between text-sm text-[#031838] font-bold"><span>Monthly Installment</span><span>₹ {monthlySavingsInput.toLocaleString('en-IN')}</span></div>
                      <div className="flex justify-between text-sm text-[#006361] font-bold"><span>12th Month Bonus (Atelier)</span><span>₹ {monthlySavingsInput.toLocaleString('en-IN')}</span></div>
                    </div>

                    <button onClick={() => navigateTo('home')} className="px-8 py-3.5 rounded-xl bg-[#031838] hover:bg-[#0c2b5c] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md">
                      Go back to Home
                    </button>
                  </div>
                ) : (
                  /* SPLIT LAYOUT FOR STEPS 1, 2, 3 */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT PANEL - FORMS */}
                    <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-md">

                      {savingsEnrollStep === 1 && (
                        /* STEP 1: PERSONAL DETAILS FORM */
                        <form onSubmit={(e) => { e.preventDefault(); setSavingsEnrollStep(2); }} className="space-y-6">
                          <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-[#031838] serif-luxury">Personal Details</h2>
                            <p className="text-xs text-gray-400 font-light">Kindly enter your personal details for the fields mentioned below</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email address */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2 bg-[#FAF8F6]">
                              <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Email Address</span>
                              <input
                                type="email"
                                required
                                value={savingsEnrollForm.email}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, email: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-700 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>

                            {/* Mobile number */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Mobile Number</span>
                              <input
                                type="tel"
                                required
                                placeholder="e.g. 9783843978"
                                value={savingsEnrollForm.mobile}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, mobile: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>
                          </div>

                          {/* Full Name */}
                          <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                            <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Your Full Name</span>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Suryaveer Singh"
                              value={savingsEnrollForm.name}
                              onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, name: e.target.value })}
                              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Pincode */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Pincode</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 334001"
                                value={savingsEnrollForm.pincode}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, pincode: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>

                            {/* Flat/House No. */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Apartment/House/Flat No.</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. 4-D-37"
                                value={savingsEnrollForm.address}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, address: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Street/Colony */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Street/Colony/Area Name</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. JNV Colony"
                                value={savingsEnrollForm.street}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, street: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>

                            {/* Locality */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Locality/Town</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Near Murti Circle"
                                value={savingsEnrollForm.locality}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, locality: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Landmark */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Landmark (Optional)</span>
                              <input
                                type="text"
                                placeholder="e.g. Opposite Park"
                                value={savingsEnrollForm.landmark}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, landmark: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>

                            {/* City */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">City/District</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Bikaner"
                                value={savingsEnrollForm.city}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, city: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>
                          </div>

                          {/* State Dropdown */}
                          <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                            <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">State</span>
                            <select
                              value={savingsEnrollForm.state}
                              onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, state: e.target.value })}
                              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 select-none cursor-pointer"
                            >
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Uttar Pradesh">Uttar Pradesh</option>
                            </select>
                          </div>

                          <div className="pt-2">
                            <p className="text-[10px] text-gray-400 font-light leading-relaxed font-sans">
                              By clicking Next, I hereby acknowledge that I am above 18 years old and I am resident of India.
                            </p>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="px-10 py-3.5 rounded-xl bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                            >
                              NEXT
                            </button>
                          </div>
                        </form>
                      )}

                      {savingsEnrollStep === 2 && (
                        /* STEP 2: NOMINEE DETAILS FORM */
                        <form onSubmit={(e) => { e.preventDefault(); setSavingsEnrollStep(3); }} className="space-y-6 animate-fade-in">
                          <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-[#031838] serif-luxury">Nominee Details</h2>
                            <p className="text-xs text-gray-400 font-light" style={{ lineHeight: '1.5' }}>Enter details of the person who can redeem the plan benefits in case of unforeseen circumstances</p>
                          </div>

                          {/* Nominee Name & Relationship - Side by Side */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Nominee's Full Name */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Nominee's Full Name</span>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Savitri Devi"
                                value={savingsEnrollForm.nomineeName}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, nomineeName: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0"
                              />
                            </div>

                            {/* Relationship Dropdown */}
                            <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                              <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Relationship</span>
                              <select
                                value={savingsEnrollForm.nomineeRelationship}
                                onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, nomineeRelationship: e.target.value })}
                                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer select-none"
                              >
                                <option value="Spouse">Spouse</option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                                <option value="Son">Son</option>
                                <option value="Daughter">Daughter</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>

                          {/* Nationality Dropdown */}
                          <div className="relative border border-gray-200 rounded-xl px-3 py-2">
                            <span className="text-[9px] uppercase tracking-wider text-[#031838] font-bold block">Nationality</span>
                            <select
                              value={savingsEnrollForm.nomineeNationality || 'Indian'}
                              onChange={(e) => setSavingsEnrollForm({ ...savingsEnrollForm, nomineeNationality: e.target.value })}
                              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer select-none"
                            >
                              <option value="Indian">Indian</option>
                              <option value="NRI">NRI (Non-Resident Indian)</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          {/* Disclaimer */}
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                            By clicking Next, I hereby acknowledge that nominee is above 18 years old
                          </p>

                          <div className="flex justify-between pt-4">
                            <button
                              type="button"
                              onClick={() => setSavingsEnrollStep(1)}
                              className="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-xs uppercase font-black tracking-widest transition-all hover:bg-gray-50 cursor-pointer"
                            >
                              BACK
                            </button>
                            <button
                              type="submit"
                              className="px-10 py-3.5 rounded-xl bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                            >
                              NEXT
                            </button>
                          </div>
                        </form>
                      )}

                      {savingsEnrollStep === 3 && (
                        /* STEP 3: PAYMENT DETAILS FORM */
                        <form onSubmit={handleSavingsEnrollWizardSubmit} className="space-y-6 animate-fade-in">
                          <div className="pb-4">
                            <h2 className="text-lg font-bold text-[#031838] serif-luxury">Choose a Payment Method</h2>
                          </div>

                          {/* Payment Layout: Vertical Tabs + Content */}
                          <div className="flex flex-col sm:flex-row gap-0">
                            {/* Vertical Tabs (Left) */}
                            <div className="flex flex-row sm:flex-col sm:min-w-[140px] border-b sm:border-b-0 sm:border-r border-gray-200">
                              {[
                                { id: 'card', name: 'Cards' },
                                { id: 'netbanking', name: 'Net Banking' },
                                { id: 'upi', name: 'UPI' }
                              ].map(m => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setSavingsEnrollForm({ ...savingsEnrollForm, paymentMethod: m.id })}
                                  className={`text-left px-4 py-3 text-xs font-semibold transition-all cursor-pointer relative ${savingsEnrollForm.paymentMethod === m.id
                                    ? 'text-[#031838] bg-white'
                                    : 'text-gray-400 hover:text-gray-600 bg-transparent'
                                    }`}
                                  style={savingsEnrollForm.paymentMethod === m.id ? {
                                    borderLeft: '3px solid #E84F35',
                                  } : {
                                    borderLeft: '3px solid transparent',
                                  }}
                                >
                                  {m.name}
                                </button>
                              ))}
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 px-4 sm:px-8 py-4 sm:py-2">
                              <h3 className="text-sm font-bold text-[#031838] mb-3">
                                Pay with {savingsEnrollForm.paymentMethod === 'card' ? 'Card' : savingsEnrollForm.paymentMethod === 'netbanking' ? 'Net Banking' : 'UPI'}, Net Banking or UPI
                              </h3>
                              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                You'll be securely redirected to enter your {savingsEnrollForm.paymentMethod === 'card' ? 'Card' : savingsEnrollForm.paymentMethod === 'netbanking' ? 'Net Banking' : 'UPI'}, Net Banking or UPI details, and complete your purchase.
                              </p>

                              {/* PROCEED TO PAY Button */}
                              <button
                                type="submit"
                                className="w-full sm:w-auto px-16 py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                              >
                                PROCEED TO PAY
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-start pt-4">
                            <button
                              type="button"
                              onClick={() => setSavingsEnrollStep(2)}
                              className="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-xs uppercase font-black tracking-widest transition-all hover:bg-gray-50 cursor-pointer"
                            >
                              BACK
                            </button>
                          </div>
                        </form>
                      )}

                    </div>

                    {/* RIGHT PANEL - SUBSCRIPTION SUMMARY */}
                    <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-md space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-base font-bold text-[#031838] serif-luxury">Subscription Summary</h3>
                        <p className="text-[10px] text-gray-400">Kindly check your monthly subscription amount.</p>
                      </div>

                      {/* Subscription amount card */}
                      <div className="border border-red-200 bg-red-50/20 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
                          <span>Subscription Amount (Monthly)</span>
                          <span className="text-[#031838] font-bold">₹ {monthlySavingsInput.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-[1px] bg-red-100" />
                        <div className="flex justify-between items-center text-sm font-bold text-[#031838]">
                          <span>You Pay</span>
                          <span className="text-[#c0392b] text-base font-sans">₹ {monthlySavingsInput.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400 font-light text-center">
                        Any Questions? Please call us at <strong className="text-[#031838]">+91 97838 43978</strong>
                      </p>
                    </div>

                  </div>
                )}

              </div>

              {/* Value Propositions Footer (similar to Bluestone) */}
              <div className="w-full bg-[#FAF8F6] border-t border-gray-200 mt-16 pt-10 pb-6 px-6 sm:px-12 select-none">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  {/* Props list */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Bikaner's Heritage Store</span>
                      <p className="text-[9px] text-gray-400 font-light">Established lineage since 1952</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Trusted by Patrons</span>
                      <p className="text-[9px] text-gray-400 font-light font-sans">Renowned for purity nationwide</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">100% Transparent Pricing</span>
                      <p className="text-[9px] text-gray-400 font-light">Guaranteed weight & value tracking</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Certified Hallmark</span>
                      <p className="text-[9px] text-gray-400 font-light">100% BIS Hallmarked Jewellery</p>
                    </div>
                  </div>

                  {/* Payment Icons */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider font-sans">
                    <span>Visa</span>
                    <span>•</span>
                    <span>Mastercard</span>
                    <span>•</span>
                    <span>RuPay</span>
                    <span>•</span>
                    <span>UPI</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==========================================
            G-CHECKOUT. FULL-PAGE CHECKOUT FLOW
            ========================================== */}
          {currentPage === 'checkout' && (
            <div className="bg-[#FAF8F6] min-h-screen pb-0 font-sans text-gray-800">

              {/* Checkout Header with Progress Bar */}
              <header className="w-full bg-white border-b border-gray-200 py-4 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Logo */}
                <div onClick={() => navigateTo('home')} className="flex items-center space-x-2 font-serif text-lg font-bold text-[#031838] tracking-widest cursor-pointer">
                  <span>HR JEWELLER & SONS</span>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center space-x-4 text-xs font-semibold select-none">
                  <div className="flex flex-col items-center">
                    <span className={`${checkoutFlowStep === 1 ? 'text-[#031838]' : 'text-gray-400'}`}>Cart</span>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 1 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
                      {checkoutFlowStep > 1 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="w-16 h-[2px]" style={{ backgroundColor: checkoutFlowStep > 1 ? '#006361' : '#E5E7EB' }} />
                  <div className="flex flex-col items-center">
                    <span className={`${checkoutFlowStep === 2 ? 'text-[#031838]' : 'text-gray-400'}`}>Delivery</span>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 2 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
                      {checkoutFlowStep > 2 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="w-16 h-[2px]" style={{ backgroundColor: checkoutFlowStep > 2 ? '#006361' : '#E5E7EB' }} />
                  <div className="flex flex-col items-center">
                    <span className={`${checkoutFlowStep === 3 ? 'text-[#031838]' : 'text-gray-400'}`}>Payment</span>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 3 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
                      {checkoutFlowStep > 3 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 tracking-wide select-none">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#006361]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="font-bold text-[#006361]">100% SECURE</span>
                </div>
              </header>

              {/* Main Content */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* ===== LEFT PANEL ===== */}
                  <div className="lg:col-span-8 space-y-6">

                    {/* ===== STEP 1: CART ===== */}
                    {checkoutFlowStep === 1 && (
                      <div className="animate-fade-in">
                        <h2 className="text-lg font-bold text-[#031838] mb-6">My Shopping Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)} Item{cartItems.reduce((a, c) => a + c.quantity, 0) !== 1 ? 's' : ''})</h2>

                        {cartItems.length === 0 ? (
                          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
                            <p className="text-gray-400 text-sm">Your cart is empty</p>
                            <button onClick={() => navigateTo('collections')} className="mt-4 px-6 py-2 bg-[#031838] text-white text-xs font-bold rounded-lg cursor-pointer">CONTINUE SHOPPING</button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {cartItems.map(item => (
                              <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative">
                                {/* Product Image */}
                                <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 space-y-2">
                                  <h3 className="text-sm font-bold text-[#031838]">{item.name}</h3>
                                  <p className="text-[10px] text-gray-400">Product Code: {item.id}</p>

                                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-gray-500 mt-2">
                                    {item.carat && <span><strong className="text-gray-600">Metal:</strong> {item.carat}</span>}
                                    {item.weight && <span><strong className="text-gray-600">Weight:</strong> {item.weight}</span>}
                                  </div>

                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-xs text-gray-500">Quantity</span>
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                      <button
                                        onClick={() => updateCartQuantity(item.id, -1)}
                                        className="w-7 h-7 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-sm"
                                      >−</button>
                                      <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                                      <button
                                        onClick={() => updateCartQuantity(item.id, 1)}
                                        className="w-7 h-7 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-sm"
                                      >+</button>
                                    </div>
                                  </div>

                                  <div className="flex gap-4 mt-3 text-[10px] uppercase font-bold tracking-wider">
                                    <button onClick={() => removeFromCart(item.id)} className="text-[#c0392b] hover:underline cursor-pointer">REMOVE</button>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0">
                                  <span className="text-base font-bold text-[#031838]">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                              </div>
                            ))}

                            {/* Trust Badges under cart */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap justify-center gap-6 text-[10px] text-gray-500">
                              <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 30-Day Returnable</span>
                              <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Eligible for Lifetime exchange & Buy back</span>
                              <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Free & Insured Delivery</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ===== STEP 2: DELIVERY ===== */}
                    {checkoutFlowStep === 2 && (
                      <div className="animate-fade-in space-y-6">
                        {/* Your Details Section */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-5">
                          <div>
                            <h2 className="text-lg font-bold text-[#031838]">Your Details</h2>
                            <p className="text-xs text-gray-400 mt-1">Required to Save Cart and Send Order Updates</p>
                          </div>

                          {/* Email & Mobile */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                              <div className="flex-1">
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Email address</span>
                                <input type="email" required placeholder="your@email.com" value={deliveryForm.email} onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0" />
                              </div>
                            </div>
                            <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                              <div className="flex-1">
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Mobile number</span>
                                <input type="tel" required placeholder="+91 XXXXX XXXXX" value={deliveryForm.mobile} onChange={(e) => setDeliveryForm({ ...deliveryForm, mobile: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0" />
                              </div>
                            </div>
                          </div>

                          {/* WhatsApp */}
                          <p className="text-xs text-gray-400">Would you like to receive notifications on WhatsApp?</p>
                          <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                            <div className="flex-1">
                              <span className="text-[9px] uppercase tracking-wider text-gray-400 block">WhatsApp Number (Optional)</span>
                              <input type="tel" placeholder="+91" value={deliveryForm.whatsapp} onChange={(e) => setDeliveryForm({ ...deliveryForm, whatsapp: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0" />
                            </div>
                          </div>
                        </div>

                        {/* Delivery Type */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4">
                          <div>
                            <h2 className="text-lg font-bold text-[#031838]">Delivery Type</h2>
                            <p className="text-xs text-gray-400 mt-1">Please choose preferred type of delivery.</p>
                          </div>

                          <label className={`flex items-center justify-between border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'home' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <span className="text-xs font-semibold text-[#031838]">Home Delivery</span>
                            <input type="radio" name="deliveryType" value="home" checked={deliveryType === 'home'} onChange={() => setDeliveryType('home')} className="accent-[#006361]" />
                          </label>

                          <label className={`flex flex-col border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'store' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold text-[#031838]">Pick up from store</span>
                                <p className="text-[10px] text-gray-400 mt-0.5">Buy now, pick up from our store at your convenience.</p>
                              </div>
                              <input type="radio" name="deliveryType" value="store" checked={deliveryType === 'store'} onChange={() => setDeliveryType('store')} className="accent-[#006361]" />
                            </div>

                            {/* Store Selection (shown when store is selected) */}
                            {deliveryType === 'store' && (
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2">
                                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">City</span>
                                  <select value={deliveryForm.storeCity} onChange={(e) => setDeliveryForm({ ...deliveryForm, storeCity: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer">
                                    <option value="">—</option>
                                    <option value="Bikaner">Bikaner</option>
                                    <option value="Jaipur">Jaipur</option>
                                    <option value="Jodhpur">Jodhpur</option>
                                  </select>
                                </div>
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2">
                                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store</span>
                                  <select value={deliveryForm.storeBranch} onChange={(e) => setDeliveryForm({ ...deliveryForm, storeBranch: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer">
                                    <option value="">—</option>
                                    <option value="Tilak Nagar Flagship, Bikaner">Tilak Nagar Flagship, Bikaner</option>
                                    <option value="Station Road, Bikaner">Station Road, Bikaner</option>
                                  </select>
                                </div>
                                {deliveryForm.storeBranch && (
                                  <div className="sm:col-span-2 relative border border-gray-200 rounded-lg px-3 py-2">
                                    <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store Address</span>
                                    <p className="text-xs text-gray-700 font-semibold mt-0.5">{deliveryForm.storeBranch}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </label>
                        </div>

                        {/* Delivery Details (Address Fields) */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4">
                          <div>
                            <h2 className="text-lg font-bold text-[#031838]">Delivery Details</h2>
                            <p className="text-xs text-gray-400 mt-1">We will deliver the order at the below address</p>
                          </div>

                          {/* Recipient Name */}
                          <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            <input type="text" required placeholder="Recipient's Name" value={deliveryForm.recipientName} onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientName: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Recipient Mobile */}
                            <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                              <div className="flex-1">
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Recipient's mobile (optional)</span>
                                <input type="tel" placeholder="+91" value={deliveryForm.recipientMobile} onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientMobile: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0" />
                              </div>
                            </div>
                            {/* Pincode */}
                            <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                              <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Enter Valid Pincode</span>
                              <input type="text" required placeholder="e.g. 334001" maxLength="6" value={deliveryForm.pincode} onChange={(e) => setDeliveryForm({ ...deliveryForm, pincode: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0" />
                            </div>
                          </div>

                          {deliveryType === 'home' && (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                                  <input type="text" required placeholder="Enter complete Apartment/House/Flat No." value={deliveryForm.apartment} onChange={(e) => setDeliveryForm({ ...deliveryForm, apartment: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                                </div>
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                                  <input type="text" required placeholder="Enter complete Street/Colony/Area Name" value={deliveryForm.street} onChange={(e) => setDeliveryForm({ ...deliveryForm, street: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                                  <input type="text" required placeholder="Enter complete Locality/Town Name" value={deliveryForm.locality} onChange={(e) => setDeliveryForm({ ...deliveryForm, locality: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                                </div>
                                <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                                  <input type="text" placeholder="Landmark (Optional)" value={deliveryForm.landmark} onChange={(e) => setDeliveryForm({ ...deliveryForm, landmark: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                                </div>
                              </div>
                            </>
                          )}

                          {/* GST Number */}
                          <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                            <input type="text" placeholder="GST Number (Optional)" value={deliveryForm.gstNumber} onChange={(e) => setDeliveryForm({ ...deliveryForm, gstNumber: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0" />
                          </div>

                          {/* Billing same as shipping */}
                          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                            <input type="checkbox" checked={deliveryForm.billingIsSameAsShipping} onChange={(e) => setDeliveryForm({ ...deliveryForm, billingIsSameAsShipping: e.target.checked })} className="accent-[#006361] rounded" />
                            <span>Billing address is <span className="text-[#006361] font-semibold">same as shipping address</span></span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* ===== STEP 3: PAYMENT ===== */}
                    {checkoutFlowStep === 3 && (
                      <div className="animate-fade-in">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
                          <h2 className="text-lg font-bold text-[#031838]">Choose a Payment Method</h2>

                          <div className="flex flex-col sm:flex-row gap-0">
                            {/* Vertical Tabs */}
                            <div className="flex flex-row sm:flex-col sm:min-w-[140px] border-b sm:border-b-0 sm:border-r border-gray-200">
                              {[
                                { id: 'card', name: 'Cards' },
                                { id: 'netbanking', name: 'Net Banking' },
                                { id: 'upi', name: 'UPI' },
                                { id: 'cod', name: 'Cash on Delivery' }
                              ].map(m => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setCheckoutForm({ ...checkoutForm, method: m.id })}
                                  className={`text-left px-4 py-3 text-xs font-semibold transition-all cursor-pointer ${checkoutForm.method === m.id ? 'text-[#031838] bg-white' : 'text-gray-400 hover:text-gray-600'}`}
                                  style={{ borderLeft: checkoutForm.method === m.id ? '3px solid #E84F35' : '3px solid transparent' }}
                                >
                                  {m.name}
                                </button>
                              ))}
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 px-4 sm:px-8 py-4 sm:py-2">
                              <h3 className="text-sm font-bold text-[#031838] mb-3">
                                Pay with {checkoutForm.method === 'cod' ? 'Cash on Showroom Delivery' : 'Card, Net Banking or UPI'}
                              </h3>
                              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                {checkoutForm.method === 'cod'
                                  ? 'Your order will be confirmed and you can pay at the showroom or upon delivery.'
                                  : "You'll be securely redirected to enter your payment details and complete your purchase via WhatsApp confirmation."
                                }
                              </p>

                              <button
                                onClick={handleCartCheckoutSubmit}
                                className="w-full sm:w-auto px-16 py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                              >
                                PROCEED TO PAY
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ===== RIGHT PANEL: ORDER SUMMARY ===== */}
                  <div className="lg:col-span-4 space-y-4">
                    {/* Delivery Check (Step 2+) */}
                    {checkoutFlowStep >= 2 && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#031838]">Delivery check</span>
                        <span className="text-xs text-[#E84F35] font-semibold cursor-pointer">{deliveryForm.pincode || 'Enter pincode'}</span>
                      </div>
                    )}

                    {/* Order Summary Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
                      <h3 className="text-sm font-bold text-[#031838] uppercase tracking-wider">Order Summary</h3>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} Item{cartItems.reduce((a, c) => a + c.quantity, 0) !== 1 ? 's' : ''})</span>
                          <span className="font-bold text-[#031838]">₹ {cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>GST</span>
                          <span className="font-bold text-[#031838]">₹ {Math.round(cartTotal * 0.03).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-[#031838]">Total Payable</span>
                        <span className="text-lg font-black text-[#031838]">₹ {(cartTotal + Math.round(cartTotal * 0.03)).toLocaleString('en-IN')}</span>
                      </div>

                      {/* Action Button */}
                      {checkoutFlowStep === 1 && (
                        <button
                          onClick={() => { if (cartItems.length > 0) setCheckoutFlowStep(2); }}
                          className="w-full py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                        >
                          PLACE ORDER
                        </button>
                      )}
                      {checkoutFlowStep === 2 && (
                        <button
                          onClick={() => {
                            if (deliveryForm.email && deliveryForm.mobile && deliveryForm.recipientName && deliveryForm.pincode) {
                              setCheckoutForm({
                                ...checkoutForm,
                                name: deliveryForm.recipientName,
                                phone: deliveryForm.mobile,
                                address: deliveryType === 'store'
                                  ? `Store Pickup: ${deliveryForm.storeBranch}`
                                  : `${deliveryForm.apartment}, ${deliveryForm.street}, ${deliveryForm.locality}, ${deliveryForm.landmark || ''}, PIN: ${deliveryForm.pincode}`
                              });
                              setCheckoutFlowStep(3);
                            } else {
                              alert('Please fill in Email, Mobile, Recipient Name, and Pincode.');
                            }
                          }}
                          className="w-full py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer"
                        >
                          PROCEED TO PAYMENT
                        </button>
                      )}

                      {/* Apply Voucher */}
                      {checkoutFlowStep === 1 && (
                        <p className="text-[11px] text-[#006361] font-semibold cursor-pointer">🏷️ Apply Voucher / Gift Card</p>
                      )}

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          Any Questions?<br />
                          Please call us at <strong className="text-[#031838]">+91 97838 43978</strong> or <span className="text-[#006361] font-semibold cursor-pointer">Chat with us</span>
                        </p>
                      </div>
                    </div>

                    {/* Back Button */}
                    {checkoutFlowStep > 1 && (
                      <button
                        onClick={() => setCheckoutFlowStep(checkoutFlowStep - 1)}
                        className="w-full py-3 text-xs text-gray-500 font-bold uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        ← BACK
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="w-full bg-[#FAF8F6] border-t border-gray-200 pt-10 pb-6 px-6 sm:px-12 select-none">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Bikaner's Heritage Store</span>
                      <p className="text-[9px] text-gray-400 font-light">Established lineage since 1952</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Trusted by Patrons</span>
                      <p className="text-[9px] text-gray-400 font-light">Renowned for purity nationwide</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Transparent Pricing</span>
                      <p className="text-[9px] text-gray-400 font-light">Guaranteed weight & value tracking</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">100% Certified Jewellery</span>
                      <p className="text-[9px] text-gray-400 font-light">BIS Hallmarked</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider font-sans">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-[8px]">CASH</span>
                    <span className="bg-[#1a1f71] text-white px-2 py-1 rounded text-[8px]">VISA</span>
                    <span className="bg-[#eb001b] text-white px-2 py-1 rounded text-[8px]">MC</span>
                    <span className="bg-[#006fcf] text-white px-2 py-1 rounded text-[8px]">AMEX</span>
                    <span className="bg-[#097A44] text-white px-2 py-1 rounded text-[8px]">RuPay</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==========================================
            G. TERMS & CONDITIONS PAGE VIEW
            ========================================== */}
          {currentPage === 'terms-and-conditions' && (
            <div className="transition-colors duration-500 min-h-screen pb-8 bg-[#FCFAFF] text-[#4A126D]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 space-y-10 animate-slide-up text-left">

                {/* Header */}
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center space-x-2 bg-[#F3EEF5] border border-purple-200 px-4 py-1.5 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A126D] animate-pulse"></span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A126D] font-bold">
                      OFFICIAL GUIDELINES & POLICIES
                    </span>
                  </div>
                  <h1 className="serif-luxury text-4xl sm:text-5xl font-semibold text-[#4A126D] leading-tight">
                    Terms &amp; Conditions
                  </h1>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Effective Date: June 2, 2026. Please read the official terms and conditions governing the use of HR Jeweller &amp; Sons platforms and services.
                  </p>
                  <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                </div>

                {/* Mobile Quick-Jump Selection Dropdown */}
                <div className="lg:hidden w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
                  <label className="block text-[9px] uppercase tracking-wider font-bold text-[#4A126D]/70 mb-2">
                    Quick Navigation List
                  </label>
                  <select
                    value={activeTcSection}
                    onChange={(e) => {
                      const val = e.target.value;
                      setActiveTcSection(val);
                      const el = document.getElementById(val);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="w-full bg-[#FCFAFF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-[#4A126D] font-semibold focus:outline-none focus:border-[#4A126D]"
                  >
                    {TERMS_DATA.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        Clause {sec.num}: {sec.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2-Column Desktop Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* Sticky Left Sidebar for Desktop */}
                  <div className="lg:col-span-4 sticky top-24 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hidden lg:block max-h-[calc(100vh-12rem)] overflow-y-auto pr-4 scrollbar-thin">
                    <h3 className="serif-luxury text-sm font-bold text-[#4A126D] mb-4 pb-2 border-b border-gray-100 uppercase tracking-wider">
                      Table of Clauses
                    </h3>
                    <nav className="space-y-1">
                      {TERMS_DATA.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setActiveTcSection(sec.id);
                            const el = document.getElementById(sec.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-[11px] transition-all duration-300 flex items-center justify-between group ${activeTcSection === sec.id
                            ? 'bg-[#F3EEF5] text-[#4A126D] font-bold border-l-4 border-[#DDA0DD]'
                            : 'text-gray-500 hover:text-[#4A126D] hover:bg-[#FCFAFF]'
                            }`}
                        >
                          <span className="truncate pr-2">{sec.num}. {sec.title}</span>
                          {activeTcSection === sec.id ? (
                            <span className="text-[#DDA0DD] text-xs">✦</span>
                          ) : (
                            <span className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Right Scrollable Content Pane */}
                  <div className="lg:col-span-8 space-y-6">
                    {TERMS_DATA.map((sec) => {
                      const isActive = activeTcSection === sec.id;
                      return (
                        <section
                          key={sec.id}
                          id={sec.id}
                          className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 ${isActive
                            ? 'border-[#DDA0DD]/50 shadow-md ring-1 ring-[#DDA0DD]/20 bg-gradient-to-br from-white to-[#FDFBFF]'
                            : 'border-gray-100 hover:border-[#DDA0DD]/20'
                            }`}
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-[10px] bg-[#F3EEF5] border border-purple-200 px-2.5 py-1 rounded-full text-[#4A126D] font-bold tracking-wider">
                              CLAUSE {sec.num}
                            </span>
                            {isActive && (
                              <span className="text-[10px] text-[#DDA0DD] font-semibold animate-pulse tracking-wide flex items-center space-x-1">
                                <span>✦</span> <span>Active View</span>
                              </span>
                            )}
                          </div>

                          <h3 className="serif-luxury text-lg text-[#4A126D] font-bold mb-4">
                            {sec.title}
                          </h3>

                          <div className="space-y-4 text-xs font-light text-gray-600 leading-relaxed">
                            {sec.paragraphs && sec.paragraphs.map((p, idx) => (
                              <p key={idx} className="font-sans font-light">{p}</p>
                            ))}

                            {sec.listItems && (
                              <ul className="list-disc pl-5 space-y-2.5 my-3 text-gray-600 font-sans font-light">
                                {sec.listItems.map((item, idx) => (
                                  <li key={idx}><strong>{item}</strong></li>
                                ))}
                              </ul>
                            )}

                            {sec.extraParagraphs && sec.extraParagraphs.map((p, idx) => (
                              <p key={idx} className="font-sans font-light mt-3">{p}</p>
                            ))}

                            {/* 11+1 GRP Scheme Rules Embedded in Section 3 (Promotional Offers) */}
                            {sec.hasSavingScheme && (
                              <div className="mt-6 border border-[#DDA0DD]/25 rounded-2xl p-5 bg-[#FCFAFF] space-y-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm">🪙</span>
                                  <h4 className="serif-luxury text-xs font-bold text-[#4A126D] tracking-wide uppercase">
                                    11+1 GRP Gold Mine Systematic Savings Rules
                                  </h4>
                                </div>
                                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                                  Patrons subscribing to the systematically structured <strong>11+1 GRP saving plan</strong> agree to consecutive 11-month deposits. Paying all 11 installments continuously grants a 12th-month mature value bonus completely funded by the boutique. Rate-locks allocate gold weight daily, insulating you from market swings.
                                </p>

                                <div className="overflow-x-auto pt-2">
                                  <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm border border-gray-150">
                                    <thead>
                                      <tr className="bg-[#4A126D] text-white text-[9px] uppercase tracking-wider font-bold">
                                        <th className="p-3">Installments Successfully Paid</th>
                                        <th className="p-3">Atelier GRP Bonus Earned</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-150 text-[10px] font-normal text-gray-700 bg-white">
                                      <tr>
                                        <td className="p-3 font-semibold text-gray-500">Less than 6 Months</td>
                                        <td className="p-3 text-red-600 font-bold">No Bonus (0%)</td>
                                      </tr>
                                      <tr>
                                        <td className="p-3 font-semibold text-gray-800">6 - 8 Months</td>
                                        <td className="p-3 text-[#4A126D] font-bold">25% of 1 Month's Installment</td>
                                      </tr>
                                      <tr>
                                        <td className="p-3 font-semibold text-gray-800">9 - 10 Months</td>
                                        <td className="p-3 text-[#4A126D] font-bold">50% of 1 Month's Installment</td>
                                      </tr>
                                      <tr className="bg-purple-50/50">
                                        <td className="p-3 font-semibold text-[#006361] bg-purple-50/20">11 Months (Full Tenure)</td>
                                        <td className="p-3 text-[#006361] font-bold bg-purple-50/20">100% of 1 Month's Installment (12th Month Free)</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Contact details embedded in Section 20 */}
                            {sec.contactInfo && (
                              <div className="mt-5 border border-gray-150 rounded-2xl p-5 bg-[#FCFAFF] space-y-3.5 text-xs text-gray-700">
                                <p className="font-bold text-[#4A126D] font-sans">{sec.contactInfo.brand}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-sans">
                                  <div className="space-y-1.5">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">📍 Registered Address</p>
                                    <p className="font-normal">{sec.contactInfo.address}</p>
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">📞 Phone Contacts</p>
                                    <p className="font-semibold text-[#4A126D]">{sec.contactInfo.phone}</p>
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">✉️ Electronic Email</p>
                                    <p className="font-medium text-[#4A126D]">{sec.contactInfo.email}</p>
                                    <p className="text-[10px] text-gray-400">CC: {sec.contactInfo.backupEmail}</p>
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">⏰ Operating Hours</p>
                                    <p className="font-normal">{sec.contactInfo.hours}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                </div>

                {/* Back CTA Button */}
                <div className="text-center pt-8 pb-4">
                  <button
                    onClick={() => { triggerAudio('click'); navigateTo('savings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center space-x-2 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 hover:shadow-lg duration-300"
                  >
                    <span>←</span> <span>Back to GRP Savings Scheme</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
            H. PRIVACY POLICY PAGE VIEW
            ========================================== */}
          {currentPage === 'privacy-policy' && (
            <div className="transition-colors duration-500 min-h-screen pb-8 bg-[#FCFAFF] text-[#4A126D]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-10 animate-slide-up text-left">

                {/* Header */}
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center space-x-2 bg-[#F3EEF5] border border-purple-200 px-4 py-1.5 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A126D] animate-pulse"></span>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A126D] font-bold">
                      HR JEWELLERS &amp; SONS
                    </span>
                  </div>
                  <h1 className="serif-luxury text-4xl sm:text-5xl font-semibold text-[#4A126D] leading-tight">
                    Privacy Policy
                  </h1>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Effective Date: June 2, 2026. We are committed to protecting your personal information and your right to privacy.
                  </p>
                  <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
                </div>

                {/* Policy Sections */}
                <div className="space-y-6">
                  {[
                    {
                      num: '01', title: 'Information We Collect',
                      content: 'HR Jewellers & Sons collects personal information you voluntarily provide when registering for our Gold Saving Scheme, booking showroom appointments, or contacting us. This includes your name, phone number, email address, Aadhaar details (for scheme enrollment), and city/location.',
                    },
                    {
                      num: '02', title: 'How We Use Your Information',
                      content: 'We use your information to process Gold Mine & Gold Reserve scheme enrollments, send order confirmations and updates via WhatsApp, manage GRP savings ledgers, personalize your jewellery recommendations, and book showroom consultations. We do not sell, trade, or rent your personal information to third parties.',
                    },
                    {
                      num: '03', title: 'Data Security',
                      content: 'Your data is stored securely on Firebase encrypted servers. We employ industry-standard SSL encryption for all data transmission. Access to customer data is restricted to authorized HR Jewellers & Sons personnel only.',
                    },
                    {
                      num: '04', title: 'Cookies & Analytics',
                      content: 'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser. Disabling cookies may affect some website features.',
                    },
                    {
                      num: '05', title: 'WhatsApp Communications',
                      content: 'By providing your phone number, you consent to receive order updates, savings scheme notifications, and promotional messages via WhatsApp. You may opt out at any time by messaging "STOP" to our WhatsApp number.',
                    },
                    {
                      num: '06', title: 'Your Rights',
                      content: 'You have the right to access, update, or delete your personal information held by us. To exercise these rights, contact us at hrjewellersbkn@gmail.com or call +91 76108 43978. We will respond to all requests within 7 business days.',
                    },
                    {
                      num: '07', title: 'Third-Party Links',
                      content: 'Our website may contain links to third-party websites (such as BlueStone). We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.',
                    },
                    {
                      num: '08', title: 'Changes to This Policy',
                      content: 'We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated effective date. Continued use of our services after changes constitutes acceptance of the updated policy.',
                    },
                    {
                      num: '09', title: 'Contact Us',
                      content: 'For any privacy-related questions or concerns, please contact us at: HR Jewellers & Sons, 4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan 334003. Email: hrjewellersbkn@gmail.com | Phone: +91 76108 43978 (Anil Soni) / +91 98281 31027 (Bhanwar Lal Soni).',
                    },
                  ].map((sec) => (
                    <section
                      key={sec.num}
                      className="bg-white border border-gray-100 hover:border-[#DDA0DD]/30 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-[10px] bg-[#F3EEF5] border border-purple-200 px-2.5 py-1 rounded-full text-[#4A126D] font-bold tracking-wider">
                          SECTION {sec.num}
                        </span>
                      </div>
                      <h3 className="serif-luxury text-lg text-[#4A126D] font-bold mb-3">
                        {sec.title}
                      </h3>
                      <p className="text-xs font-light text-gray-600 leading-relaxed font-sans">
                        {sec.content}
                      </p>
                    </section>
                  ))}
                </div>

                {/* Back CTA Button */}
                <div className="text-center pt-8 pb-4">
                  <button
                    onClick={() => { triggerAudio('click'); navigateTo('home'); }}
                    className="inline-flex items-center space-x-2 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
                  >
                    <span>←</span> <span>Back to Home</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>



        {/* Floating WhatsApp Quick Connect Button */}
        <div className="fixed bottom-16 sm:bottom-24 lg:bottom-8 right-3 sm:right-6 lg:right-8 z-40">
          <a
            href="https://wa.me/919783843978?text=Hello%20H.R.%20Jewellers,%20I%27d%20like%20to%20inquire%20about%20your%20signature%20collections."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => triggerAudio('shimmer')}
            className="relative w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-tr from-[#120422] to-[#4A126D] border-2 border-[#DDA0DD] rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_45px_rgba(212,175,55,0.45)] hover:scale-110 active:scale-95 transition-all duration-500 group cursor-pointer focus:outline-none"
            title="Connect on WhatsApp"
          >
            {/* Outer Pulsing Gold Rings */}
            <span className="absolute -inset-0.5 sm:-inset-1 rounded-full border border-[#DDA0DD] animate-ping opacity-25 group-hover:opacity-50" style={{ animationDuration: '2s' }} />
            <span className="absolute -inset-1 sm:-inset-2 rounded-full border border-[#DDA0DD]/60 animate-ping opacity-15 group-hover:opacity-30" style={{ animationDuration: '3s' }} />

            {/* Rotating Dotted Gold Monogram Accent Circle */}
            <svg className="absolute w-8 h-8 sm:w-12 sm:h-12 text-[#DDA0DD] opacity-40 group-hover:opacity-80 transition-opacity duration-300 animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
            </svg>

            {/* WhatsApp Gold Icon */}
            <svg className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 text-[#DDA0DD] group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_2px_5px_rgba(212,175,55,0.5)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.037L2 22l5.135-1.348a9.954 9.954 0 004.878 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.67-1.037-5.18-2.925-7.07C17.186 3.037 14.678 2 12.012 2zm5.727 14.153c-.313.882-1.554 1.61-2.148 1.666-.59.055-1.18.326-3.766-.694-2.585-1.02-4.237-3.663-4.364-3.834-.127-.171-1.03-1.374-1.03-2.623 0-1.25.654-1.862.887-2.102.233-.24.509-.3.678-.3.17 0 .34 0 .487.007.155.007.363-.058.567.442.204.5.7 1.713.76 1.838.06.126.1.272.017.438-.083.166-.124.272-.25.418-.125.146-.263.327-.375.44-.124.125-.253.26-.11.507.144.247.64 1.056 1.373 1.71.942.843 1.737 1.103 1.983 1.226.246.123.39.103.535-.062.145-.165.62-.72.787-.966.166-.247.33-.206.555-.124.225.083 1.427.674 1.674.8.247.124.412.185.472.289.06.103.06.6-.253 1.482z" />
            </svg>
          </a>
        </div>

        {/* ==========================================================
          3. PREMIUM LUXURY FOOTER SECTION
          ========================================================== */}
        <footer className="bg-[#12071B] text-white pt-16 pb-10 px-6 md:px-12 relative z-10 font-sans">

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_auto_0.8fr_auto_1fr_auto_1.1fr] gap-x-8 gap-y-12 items-start text-center md:text-left">

            {/* Brand Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#E6C687]/10 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={hrLogo}
                  alt="HR Jewellers & Sons Logo"
                  className="relative w-24 h-24 object-contain select-none mix-blend-screen filter drop-shadow-[0_2px_15px_rgba(230,198,135,0.4)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-1">
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
                {/* Horizontal divider with diamond */}
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
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => { triggerAudio('click'); item.action(); }}
                      className="hover:text-white hover:translate-x-1.5 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 cursor-pointer focus:outline-none"
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
                    className="hover:text-white hover:translate-x-1.5 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 font-semibold text-white cursor-pointer focus:outline-none"
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
                {/* Horizontal divider with diamond */}
                <div className="flex items-center gap-1.5 py-1">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E6C687]/30"></div>
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#E6C687]/40 bg-transparent flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-[#E6C687]"></div>
                  </div>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E6C687]/30"></div>
                </div>
              </div>

              <div className="space-y-5 text-xs text-white/75 font-sans font-light flex flex-col items-center md:items-start w-full">
                <a href="tel:+917610843978" className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-2.5 md:gap-3.5 group hover:text-white transition-colors">
                  <div className="w-9 h-9 rounded-full border border-[#E6C687]/30 group-hover:border-[#E6C687]/60 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-semibold tracking-wide font-sans">+91 7610843978</span>
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
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
                {/* Horizontal divider with diamond */}
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
                  href="https://wa.me/917610843978?text=Hello%20HR%20Jewellers,%20I%20am%20interested%20in%20your%20luxury%20collections."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
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
                  href="tel:+917610843978"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
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
                  href="https://maps.google.com/?q=4-D-37,+Near+Murti+Circle,+J.N.V.+Colony,+Bikaner,+Rajasthan+334003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-[#E6C687]/15 hover:border-[#E6C687]/40 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#E6C687]/30 flex items-center justify-center text-[#E6C687] bg-white/5 transition-all">
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

          {/* Divider above bottom credits */}
          <div className="max-w-[1400px] mx-auto h-[1px] bg-[#E6C687]/15 mt-16 mb-8 relative z-20" />

          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center text-white/50 text-[10px] tracking-widest uppercase font-sans font-medium gap-6 lg:gap-0">
            <div className="flex flex-col items-center lg:items-start gap-1 text-center lg:text-left">
              <span>© 2026 H.R. Jewellers &amp; Sons. All Rights Reserved.</span>
              <div className="w-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#E6C687]/40 to-transparent mx-auto lg:mx-0"></div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                  link: "https://instagram.com/hrjewellers"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  ),
                  link: "https://facebook.com/hrjewellers"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  ),
                  link: "https://pinterest.com/hrjewellers"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.037L2 22l5.135-1.348a9.954 9.954 0 004.878 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.67-1.037-5.18-2.925-7.07C17.186 3.037 14.678 2 12.012 2zm5.727 14.153c-.313.882-1.554 1.61-2.148 1.666-.59.055-1.18.326-3.766-.694-2.585-1.02-4.237-3.663-4.364-3.834-.127-.171-1.03-1.374-1.03-2.623 0-1.25.654-1.862.887-2.102.233-.24.509-.3.678-.3.17 0 .34 0 .487.007.155.007.363-.058.567.442.204.5.7 1.713.76 1.838.06.126.1.272.017.438-.083.166-.124.272-.25.418-.125.146-.263.327-.375.44-.124.125-.253.26-.11.507.144.247.64 1.056 1.373 1.71.942.843 1.737 1.103 1.983 1.226.246.123.39.103.535-.062.145-.165.62-.72.787-.966.166-.247.33-.206.555-.124.225.083 1.427.674 1.674.8.247.124.412.185.472.289.06.103.06.6-.253 1.482z" />
                    </svg>
                  ),
                  link: "https://wa.me/917610843978"
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#E6C687]/30 hover:border-[#E6C687]/60 flex items-center justify-center text-[#E6C687] bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 text-white/60">
              <button
                onClick={() => navigateTo('offers')}
                className="hover:text-[#E6C687] transition-colors duration-300 cursor-pointer focus:outline-none text-xs"
              >
                Offers &amp; Stores
              </button>
              <span className="text-[#E6C687]/40">|</span>
              <button
                onClick={() => navigateTo('privacy-policy')}
                className="hover:text-[#E6C687] transition-colors duration-300 cursor-pointer focus:outline-none text-xs"
              >
                Privacy Policy
              </button>
              <span className="text-[#E6C687]/40">|</span>
              <button
                onClick={() => navigateTo('terms-and-conditions')}
                className="hover:text-[#E6C687] transition-colors duration-300 cursor-pointer focus:outline-none text-xs"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </footer>

        {/* ==========================================================
          MODALS & FLYOUT DRAWERS
          ========================================================== */}

        {/* A. CART SIDEBAR FLYOUT DRAWER */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <div className="absolute inset-0 bg-[#4A126D]/45 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
            <div className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl flex flex-col justify-between p-6 animate-fade-in text-xs">
              <div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                  <h3 className="serif-luxury text-2xl font-bold text-[#4A126D] flex items-center gap-2">
                    <span>🛍️</span> Shopping Bag ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 focus:outline-none">✕</button>
                </div>

                {/* Items List */}
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 italic">
                      Your shopping bag is currently empty.
                    </div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className="bg-[#FBF9FF] border border-gray-200/50 rounded-2xl p-4 flex gap-4 items-center justify-between shadow-sm relative">
                        <div className="flex items-center space-x-3">
                          <img src={item.img} className="w-12 h-14 object-cover rounded-xl border border-gray-200 shrink-0" alt="" />
                          <div>
                            <h4 className="font-bold text-gray-900 leading-tight pr-4">{item.name}</h4>
                            <span className="text-[9px] text-[#DDA0DD] block mt-0.5">{item.carat || '22K Gold'}</span>
                            <span className="text-[#4A126D] font-black block mt-1">₹{formatPrice(item.price)}</span>
                            {item.desc && <span className="text-[8px] text-gray-400 italic block mt-0.5 truncate max-w-[150px]">{item.desc}</span>}
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between h-full space-y-4 shrink-0">
                          <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-400 hover:text-red-500 font-bold">✕</button>
                          <div className="flex items-center space-x-2 border border-gray-200 rounded-lg bg-white p-1">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="font-bold px-1.5 py-0.5 text-gray-500 hover:text-gray-800 focus:outline-none">-</button>
                            <span className="font-bold text-gray-800 px-1">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="font-bold px-1.5 py-0.5 text-gray-500 hover:text-gray-800 focus:outline-none">+</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Total & Checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-100 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                    <span>Bag Subtotal Amount</span>
                    <span className="text-[#4A126D] text-lg font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => { setCheckoutFlowStep(1); setCartOpen(false); navigateTo('checkout'); }}
                      className="flex-1 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase py-4 rounded-full tracking-widest text-center shadow-lg transition-all cursor-pointer"
                    >
                      Confirm Bag Checkout
                    </button>
                    <button
                      onClick={() => setCartItems([])}
                      className="border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 px-4 rounded-full cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* B. WISHLIST drawer */}
        {wishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <div className="absolute inset-0 bg-[#4A126D]/45 backdrop-blur-sm transition-opacity" onClick={() => setWishlistOpen(false)} />
            <div className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl flex flex-col justify-between p-6 animate-fade-in text-xs">
              <div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                  <h3 className="serif-luxury text-2xl font-bold text-[#4A126D] flex items-center gap-2">
                    <span>❤️</span> Wishlist Ornaments ({wishlistItems.length})
                  </h3>
                  <button onClick={() => setWishlistOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 focus:outline-none">✕</button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {wishlistItems.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 italic">
                      Your luxury wishlist is currently empty.
                    </div>
                  ) : (
                    wishlistItems.map(item => (
                      <div key={item.id} className="bg-[#FBF9FF] border border-gray-200/50 rounded-2xl p-4 flex gap-4 items-center justify-between shadow-sm relative">
                        <div className="flex items-center space-x-3">
                          <img src={item.img} className="w-11 h-14 object-cover rounded-xl border border-gray-200 shrink-0" alt="" />
                          <div>
                            <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                            <span className="text-[9px] text-[#DDA0DD] block mt-0.5">{item.carat}</span>
                            <span className="text-[#4A126D] font-black block mt-1">₹{formatPrice(item.price)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => { handleAddToCart(item); toggleWishlist(item); }}
                            className="bg-[#4A126D] hover:bg-[#2C133C] text-white text-[10px] uppercase font-bold px-3 py-2 rounded-xl transition-all"
                          >
                            Bag
                          </button>
                          <button onClick={() => toggleWishlist(item)} className="text-red-400 hover:text-red-500 font-bold p-1">✕</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* C. FITTING SUITE CONSULTATION BOOKING MODAL */}
        {consultationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#4A126D]/60 backdrop-blur-sm transition-opacity" onClick={() => setConsultationModal(false)} />
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 max-w-lg w-full relative z-10 shadow-2xl space-y-6 animate-fade-in text-xs">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#006361] font-bold">ATELIER PRIVILEGE SUITE</span>
                <h3 className="serif-luxury text-2xl font-bold text-[#4A126D]">Book Fitting Advisory Lounge</h3>
                <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
              </div>

              {loungeSuccess ? (
                <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4">
                  <h4 className="serif-luxury text-xl font-bold text-[#006361]">Lounge Suite Appointment Set!</h4>
                  <p className="text-xs text-gray-600">Your unique suite pass has been synced with WhatsApp atelier logs.</p>
                  <div className="bg-white border border-gray-100 rounded-xl p-3 inline-block font-mono text-sm text-[#006361] font-bold">
                    {consultationPassCode}
                  </div>
                  <button onClick={() => { setLoungeSuccess(false); setConsultationModal(false); }} className="w-full bg-[#006361] hover:bg-[#004e4c] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest">
                    Close Modal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoungeBookingSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-lounge-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Full Name</label>
                    <input
                      id="modal-lounge-name"
                      type="text"
                      required
                      placeholder="e.g. Suryaveer Singh"
                      value={consultationForm.name}
                      onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-lounge-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp Phone</label>
                      <input
                        id="modal-lounge-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9783843978"
                        value={consultationForm.phone}
                        onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-lounge-email" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Email Address</label>
                      <input
                        id="modal-lounge-email"
                        type="email"
                        required
                        placeholder="e.g. suryaveer@gmail.com"
                        value={consultationForm.email}
                        onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-lounge-date" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Schedule Date</label>
                      <input
                        id="modal-lounge-date"
                        type="date"
                        required
                        value={consultationForm.date}
                        onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-lounge-time" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Preferred Slot</label>
                      <select
                        id="modal-lounge-time"
                        value={consultationForm.time}
                        onChange={(e) => setConsultationForm({ ...consultationForm, time: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      >
                        <option value="11:30 AM">11:30 AM - Morning Slot</option>
                        <option value="02:30 PM">02:30 PM - Afternoon Slot</option>
                        <option value="05:30 PM">05:30 PM - Evening Slot</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md">
                    Secure Lounge Suite Key
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* D. Comfort Try-at-Home MODAL */}
        {tryHomeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#4A126D]/60 backdrop-blur-sm transition-opacity" onClick={() => setTryHomeModalOpen(false)} />
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-fade-in text-xs">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#006361] font-bold">VIP COMFORT Try-at-Home</span>
                <h3 className="serif-luxury text-2xl font-bold text-[#4A126D]">Request At-Home Try-On</h3>
                <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
              </div>

              {tryHomeSuccess ? (
                <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4">
                  <h4 className="serif-luxury text-xl font-bold text-[#006361]">Try-On Request Logged!</h4>
                  <p className="text-xs text-gray-600">A personal showroom specialist will call you shortly to confirm the scheduled date and selected ornament configurations.</p>
                  <button onClick={() => { setTryHomeSuccess(false); setTryHomeModalOpen(false); }} className="w-full bg-[#006361] hover:bg-[#004e4c] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest">
                    Close Console
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTryAtHomeSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="home-try-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Your Full Name</label>
                    <input
                      id="home-try-name"
                      type="text"
                      required
                      placeholder="e.g. Suryaveer Singh"
                      value={tryHomeForm.name}
                      onChange={(e) => setTryHomeForm({ ...tryHomeForm, name: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-try-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp phone</label>
                    <input
                      id="home-try-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9783843978"
                      value={tryHomeForm.phone}
                      onChange={(e) => setTryHomeForm({ ...tryHomeForm, phone: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-try-date" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Target Try-on Date</label>
                    <input
                      id="home-try-date"
                      type="date"
                      required
                      value={tryHomeForm.date}
                      onChange={(e) => setTryHomeForm({ ...tryHomeForm, date: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                    />
                  </div>

                  <div className="bg-[#FBF9FF] border border-gray-200/50 p-4 rounded-2xl">
                    <span className="text-[#4A126D]/75 text-[8px] uppercase font-bold block mb-1">Selected Ornament Piece</span>
                    <span className="text-[#4A126D] font-bold text-xs">{detailProduct?.name || 'Default Signature Piece'}</span>
                  </div>

                  <button type="submit" className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md">
                    Request Comfort Try-On
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* E. 11+1 Gold Mine SAVINGS SCHEME ENROLLMENT MODAL */}
        {savingsSchemeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#4A126D]/60 backdrop-blur-sm transition-opacity" onClick={() => setSavingsSchemeOpen(false)} />
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-fade-in text-xs max-h-[90vh] overflow-y-auto no-scrollbar">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#006361] font-bold">11+1 {savingsSchemeType.toUpperCase()} SCHEME</span>
                <h3 className="serif-luxury text-2xl font-bold text-[#4A126D]">Enroll &amp; Register Savings</h3>
                <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
              </div>

              {savingsSuccess ? (
                <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4">
                  <h4 className="serif-luxury text-xl font-bold text-[#006361]">Enrollment Request Sent!</h4>
                  <p className="text-xs text-gray-600">Your savings application has been compiled successfully. A GRP scheme manager will connect on WhatsApp to establish direct bank authorization hooks.</p>
                  <button onClick={() => { setSavingsSuccess(false); setSavingsSchemeOpen(false); }} className="w-full bg-[#006361] hover:bg-[#004e4c] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest">
                    Close Simulator
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSavingsEnrollSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="sav-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Your Full Name</label>
                    <input
                      id="sav-name"
                      type="text"
                      required
                      placeholder="e.g. Suryaveer Singh"
                      value={savingsForm.name}
                      onChange={(e) => setSavingsForm({ ...savingsForm, name: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sav-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp Phone</label>
                      <input
                        id="sav-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9783843978"
                        value={savingsForm.phone}
                        onChange={(e) => setSavingsForm({ ...savingsForm, phone: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="sav-email" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Email Address</label>
                      <input
                        id="sav-email"
                        type="email"
                        required
                        placeholder="e.g. patron@gmail.com"
                        value={savingsForm.email}
                        onChange={(e) => setSavingsForm({ ...savingsForm, email: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-[#F3EEF5] rounded-xl px-3 py-2.5 text-xs focus:outline-none text-gray-800 placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sav-city" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">City</label>
                      <input
                        id="sav-city"
                        type="text"
                        required
                        placeholder="e.g. Bikaner"
                        value={savingsForm.city}
                        onChange={(e) => setSavingsForm({ ...savingsForm, city: e.target.value })}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="sav-aadhaar" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">12-Digit Aadhaar</label>
                      <input
                        id="sav-aadhaar"
                        type="text"
                        required
                        pattern="\d{12}"
                        maxLength="12"
                        placeholder="e.g. 123456789012"
                        value={savingsForm.aadhaar}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setSavingsForm({ ...savingsForm, aadhaar: val });
                        }}
                        className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sav-branch" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Preferred Showroom Branch</label>
                    <select
                      id="sav-branch"
                      required
                      value={savingsForm.branch}
                      onChange={(e) => setSavingsForm({ ...savingsForm, branch: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-[#4A126D] font-semibold"
                    >
                      <option value="Tilak Nagar Bikaner Flagship">Tilak Nagar Bikaner Flagship</option>
                      <option value="Jaipur Central Showroom">Jaipur Central Showroom</option>
                      <option value="Jodhpur Royal Suite">Jodhpur Royal Suite</option>
                    </select>
                  </div>

                  <div className="bg-[#F3EEF5] border border-purple-200 p-4 rounded-2xl text-center space-y-1">
                    <span className="text-[#4A126D]/75 text-[8px] uppercase font-bold block">Selected GRP Plan</span>
                    <span className="text-[#4A126D] font-bold text-xs">11+1 {savingsSchemeType}</span>
                    <span className="text-[#4A126D] font-black text-sm block mt-0.5">₹{monthlySavingsInput.toLocaleString('en-IN')}/mo</span>
                    <p className="text-[9px] text-[#006361] font-semibold mt-1">
                      {savingsSchemeType === 'Gold Mine'
                        ? `HRJ Mature Benefit: ₹${(monthlySavingsInput * 11).toLocaleString('en-IN')} + FREE Month`
                        : `HRJ GRP Voucher: ${savingsVoucherType} (${savingsVoucherType === 'Diamond/Gemstone' ? '1.0x' : '0.5x'} Bonus)`
                      }
                    </p>
                  </div>

                  <button type="submit" className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md">
                    Authenticate GRP Application
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* F. QUICK SPEC SPECIMENS VIEW MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#4A126D]/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)} />
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-fade-in text-xs">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h3 className="serif-luxury text-xl font-bold text-[#4A126D]">Ornament Specifications</h3>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 focus:outline-none">✕</button>
              </div>

              <div className="flex gap-4 items-center bg-[#FBF9FF] border border-gray-200/50 p-4 rounded-2xl shadow-inner">
                <img src={selectedProduct.img} className="w-16 h-20 object-cover rounded-xl border border-gray-200" alt="" />
                <div>
                  <h4 className="serif-luxury text-lg font-bold text-gray-900 leading-tight">{selectedProduct.name}</h4>
                  <span className="text-[#4A126D] font-black text-sm block mt-1">₹{formatPrice(selectedProduct.price)}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-b border-gray-100 py-4 font-light text-gray-600">
                <p><strong>Carat Quality:</strong> {selectedProduct.carat}</p>
                <p><strong>Ornament Weight:</strong> {selectedProduct.weight}</p>
                <p><strong>Authenticity badge:</strong> {selectedProduct.purityInfo || 'BIS Hallmark Bureau Stamps'}</p>
                <p><strong>Atelier handcrafting:</strong> {selectedProduct.makingCharges || '₹380/gram setting charges included'}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  className="flex-1 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase py-3.5 rounded-xl transition-all shadow-md text-center"
                >
                  Add To Bag
                </button>
                <button
                  onClick={() => { navigateToPDP(selectedProduct); setSelectedProduct(null); }}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-3.5 rounded-xl text-center"
                >
                  Full PDP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* G. BESPOKE CUSTOM DESIGN MULTI-STEP MODAL */}
        {customDesignOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#4A126D]/60 backdrop-blur-sm transition-opacity" onClick={() => setCustomDesignOpen(false)} />
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 max-w-md w-full relative z-10 shadow-2xl space-y-6 animate-fade-in text-xs max-h-[90vh] overflow-y-auto no-scrollbar">

              {/* Header */}
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DDA0DD] font-bold">BESPOKE CUSTOM CREATIONS</span>
                <h3 className="serif-luxury text-2xl font-bold text-[#4A126D]">Jewellery Concierge</h3>
                <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
              </div>

              {/* Step indicators */}
              <div className="flex justify-between items-center px-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center space-x-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold ${customDesignStep === step
                      ? 'bg-[#4A126D] text-white border-[#4A126D]'
                      : customDesignStep > step
                        ? 'bg-[#006361] text-white border-[#006361]'
                        : 'bg-gray-50 text-gray-400 border-gray-200'
                      }`}>
                      {step}
                    </div>
                    <span className={`text-[9px] uppercase tracking-wider font-bold ${customDesignStep === step ? 'text-[#4A126D]' : 'text-gray-400'
                      }`}>
                      {step === 1 ? 'Patron' : step === 2 ? 'Specs' : 'Sketch'}
                    </span>
                  </div>
                ))}
              </div>

              {customDesignSuccess ? (
                <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4">
                  <h4 className="serif-luxury text-xl font-bold text-[#006361]">Design Ticket Submitted!</h4>
                  <p className="text-xs text-gray-600">
                    Your bespoke custom request has been registered in our registry. Our Senior Designer, <strong>Anil Soni</strong>, will contact you directly on WhatsApp with initial draft critiques.
                  </p>
                  <button
                    onClick={() => {
                      setCustomDesignSuccess(false);
                      setCustomDesignOpen(false);
                      setCustomDesignStep(1);
                      setCustomDesignForm({
                        name: '', phone: '', email: '', city: '',
                        jewelryType: 'Rings', material: '22K Gold', budget: '₹20,000 - ₹50,000',
                        description: '', fileName: '', fileData: '', referenceImageUrl: ''
                      });
                    }}
                    className="w-full bg-[#006361] hover:bg-[#004e4c] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest"
                  >
                    Close Concierge
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomDesignSubmit} className="space-y-4">

                  {/* STEP 1: CLIENT INFORMATION */}
                  {customDesignStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-bold text-gray-700 text-xs border-b border-gray-100 pb-1.5">Step 1: Patron Identification</h4>
                      <div>
                        <label htmlFor="cd-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Full Name</label>
                        <input
                          id="cd-name"
                          type="text"
                          required
                          placeholder="e.g. Suryaveer Singh"
                          value={customDesignForm.name}
                          onChange={(e) => setCustomDesignForm({ ...customDesignForm, name: e.target.value })}
                          className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400/80 focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="cd-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp Phone</label>
                        <input
                          id="cd-phone"
                          type="tel"
                          required
                          placeholder="e.g. 9783843978"
                          value={customDesignForm.phone}
                          onChange={(e) => setCustomDesignForm({ ...customDesignForm, phone: e.target.value })}
                          className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400/80 focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cd-email" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Email Address</label>
                          <input
                            id="cd-email"
                            type="email"
                            required
                            placeholder="e.g. patron@gmail.com"
                            value={customDesignForm.email}
                            onChange={(e) => setCustomDesignForm({ ...customDesignForm, email: e.target.value })}
                            className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400/80 focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="cd-city" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">City</label>
                          <input
                            id="cd-city"
                            type="text"
                            required
                            placeholder="e.g. Bikaner"
                            value={customDesignForm.city}
                            onChange={(e) => setCustomDesignForm({ ...customDesignForm, city: e.target.value })}
                            className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400/80 focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!customDesignForm.name || !customDesignForm.phone || !customDesignForm.email || !customDesignForm.city}
                        onClick={() => setCustomDesignStep(2)}
                        className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-center"
                      >
                        Proceed to Custom Specs →
                      </button>
                    </div>
                  )}

                  {/* STEP 2: CUSTOM SPECIFICATIONS */}
                  {customDesignStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-bold text-gray-700 text-xs border-b border-gray-100 pb-1.5">Step 2: Jewelry Parameters</h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cd-type" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Jewelry Type</label>
                          <select
                            id="cd-type"
                            value={customDesignForm.jewelryType}
                            onChange={(e) => setCustomDesignForm({ ...customDesignForm, jewelryType: e.target.value })}
                            className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-[#4A126D] font-semibold"
                          >
                            <option value="Rings">Rings</option>
                            <option value="Earrings">Earrings</option>
                            <option value="Necklace">Necklace</option>
                            <option value="Bracelets">Bracelets</option>
                            <option value="Bangles">Bangles</option>
                            <option value="Mangalsutra">Mangalsutra</option>
                            <option value="Pooja Silverware">Pooja Silverware</option>
                            <option value="Other Ornaments">Other Ornaments</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="cd-metal" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Metal Purity</label>
                          <select
                            id="cd-metal"
                            value={customDesignForm.material}
                            onChange={(e) => setCustomDesignForm({ ...customDesignForm, material: e.target.value })}
                            className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-[#4A126D] font-semibold"
                          >
                            <option value="24K Pure Gold">24K Pure Gold</option>
                            <option value="22K Solid Gold">22K Solid Gold</option>
                            <option value="18K Gold &amp; Diamond">18K Gold &amp; Diamond</option>
                            <option value="Sterling Silver 925">Sterling Silver 925</option>
                            <option value="PT 950 Platinum">PT 950 Platinum</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cd-budget" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Estimated Budget</label>
                        <select
                          id="cd-budget"
                          value={customDesignForm.budget}
                          onChange={(e) => setCustomDesignForm({ ...customDesignForm, budget: e.target.value })}
                          className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none text-[#4A126D] font-semibold"
                        >
                          <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000</option>
                          <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
                          <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000</option>
                          <option value="₹5,00,000+ Imperial">₹5,00,000+ Imperial Signature</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="cd-desc" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Design Vision &amp; Details</label>
                        <textarea
                          id="cd-desc"
                          required
                          rows="3"
                          placeholder="e.g. Traditional Bikaneri Chitai Kada with rubies embedded, customized for bridal wrist sizing of 2.4..."
                          value={customDesignForm.description}
                          onChange={(e) => setCustomDesignForm({ ...customDesignForm, description: e.target.value })}
                          className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl p-3 text-xs text-gray-800 placeholder-gray-400/80 focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/30 transition-all duration-300 focus:outline-none resize-none"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomDesignStep(1)}
                          className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl text-center"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          disabled={!customDesignForm.description}
                          onClick={() => setCustomDesignStep(3)}
                          className="flex-1 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold py-3.5 rounded-xl text-center disabled:opacity-50"
                        >
                          File Upload →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: FILE ATTACHMENT */}
                  {customDesignStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="font-bold text-gray-700 text-xs border-b border-gray-100 pb-1.5">Step 3: Attachment Reference Sketch</h4>

                      <div className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-2 transition-colors relative ${firebaseDiagnostics.checked && !firebaseDiagnostics.valid
                        ? 'border-rose-200 bg-rose-50/10'
                        : 'border-gray-200 hover:border-[#DDA0DD] bg-[#FBF9FF]'
                        }`}>
                        {firebaseDiagnostics.checked && !firebaseDiagnostics.valid ? (
                          <>
                            <span className="text-3xl block">⚠️</span>
                            <span className="font-serif text-rose-700 block text-xs tracking-wide">Firebase Storage is not configured correctly. Please contact administrator.</span>
                            <span className="text-[9px] text-gray-400 block leading-tight">Upload disabled due to configuration mismatch.</span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl block">📁</span>
                            <span className="font-bold text-gray-700 block text-[11px]">Upload Sketch or Reference</span>
                            <span className="text-[9px] text-gray-400 block leading-tight">Supports PNG, JPG, or PDF (Max 4MB)</span>
                          </>
                        )}

                        <input
                          type="file"
                          accept="image/*,.pdf"
                          disabled={firebaseDiagnostics.checked && !firebaseDiagnostics.valid}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              console.log("DEBUG [1/5]: File selection triggered. File selected:", file.name, "size:", file.size);
                              setCustomDesignUploadProgress("Optimizing sketch for fast transmission...");
                              setCustomDesignUploading(true);
                              try {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = (event) => {
                                  console.log("DEBUG: FileReader readAsDataURL completed successfully.");
                                  const img = new Image();
                                  img.src = event.target.result;
                                  img.onload = async () => {
                                    console.log("DEBUG: Image object loaded. original size:", img.width, "x", img.height);
                                    const canvas = document.createElement('canvas');
                                    const MAX_WIDTH = 600;
                                    const MAX_HEIGHT = 600;
                                    let width = img.width;
                                    let height = img.height;

                                    if (width > height) {
                                      if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                      }
                                    } else {
                                      if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                      }
                                    }

                                    canvas.width = width;
                                    canvas.height = height;
                                    const ctx = canvas.getContext('2d');
                                    ctx.drawImage(img, 0, 0, width, height);

                                    // Compressed base64 string
                                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                                    console.log("DEBUG: Image optimized and compressed on canvas.");

                                    setCustomDesignUploadProgress("Uploading reference image to secure server...");
                                    try {
                                      console.log("DEBUG: Layer 1 backend upload starting...");
                                      // LAYER 1: Try serverless backend upload (extremely fast, CORS-free, works on localhost via proxy!)
                                      const response = await fetch('/api/upload-image', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                          fileName: file.name,
                                          fileData: compressedDataUrl
                                        })
                                      });

                                      const resData = await response.json();
                                      console.log("DEBUG [2/5]: Layer 1 backend upload finished. status:", response.status, "success:", resData.success);

                                      if (response.ok && resData.success) {
                                        console.log("DEBUG [3/5]: Layer 1 getDownloadURL() returned:", resData.downloadURL);
                                        console.log("DEBUG [4/5]: Storing URL in customDesignForm state via functional updater.");
                                        setCustomDesignForm(prev => {
                                          const nextState = {
                                            ...prev,
                                            fileName: file.name,
                                            fileData: resData.downloadURL,
                                            referenceImageUrl: resData.downloadURL
                                          };
                                          console.log("AFTER UPLOAD", nextState);
                                          return nextState;
                                        });
                                        setCustomDesignUploadProgress("Sketch uploaded and linked successfully!");
                                        setCustomDesignUploading(false);
                                      } else {
                                        throw new Error(resData.error || 'Server upload failed');
                                      }
                                    } catch (apiErr) {
                                      console.warn("Backend upload failed, attempting direct storage upload...", apiErr);
                                      console.log("DEBUG: Layer 2 direct storage upload starting...");

                                      // LAYER 2: Direct storage upload with robust 15-second failsafe timeout
                                      const directUploadPromise = (async () => {
                                        // Ensure customer has authenticated session to write to Firebase Storage
                                        try {
                                          console.log("DEBUG: Signing in anonymously for Firebase Storage write permissions...");
                                          if (auth && !auth.currentUser) {
                                            await signInAnonymously(auth);
                                            console.log("DEBUG: Anonymous sign in successful.");
                                          }
                                        } catch (authErr) {
                                          console.warn("Anonymous auth failed, uploading anonymously anyway:", authErr);
                                        }

                                        const storageRef = ref(storage, `custom-designs/${Date.now()}_${file.name}`);

                                        // Robust synchronous base64 dataURL-to-blob conversion
                                        const parts = compressedDataUrl.split(',');
                                        const mime = parts[0].match(/:(.*?);/)[1];
                                        const bstr = atob(parts[1]);
                                        let n = bstr.length;
                                        const u8arr = new Uint8Array(n);
                                        while (n--) {
                                          u8arr[n] = bstr.charCodeAt(n);
                                        }
                                        const blobData = new Blob([u8arr], { type: mime });

                                        console.log("DEBUG: Uploading bytes direct to Firebase Storage...");
                                        await uploadBytes(storageRef, blobData);
                                        console.log("DEBUG [2/5]: Layer 2 Firebase upload completed successfully.");
                                        const downloadURL = await getDownloadURL(storageRef);
                                        console.log("DEBUG [3/5]: Layer 2 getDownloadURL() returned:", downloadURL);
                                        return downloadURL;
                                      })();

                                      const timeoutPromise = new Promise((_, reject) =>
                                        setTimeout(() => reject(new Error("Storage upload timed out after 15 seconds")), 15000)
                                      );

                                      try {
                                        const downloadURL = await Promise.race([directUploadPromise, timeoutPromise]);
                                        console.log("DEBUG [4/5]: Storing direct storage URL in state via functional updater.");
                                        setCustomDesignForm(prev => {
                                          const nextState = {
                                            ...prev,
                                            fileName: file.name,
                                            fileData: downloadURL,
                                            referenceImageUrl: downloadURL
                                          };
                                          console.log("AFTER UPLOAD", nextState);
                                          return nextState;
                                        });
                                        setCustomDesignUploadProgress("Sketch uploaded and linked successfully!");
                                        setCustomDesignUploading(false);
                                      } catch (directErr) {
                                        console.error("Direct storage upload failed or timed out:", directErr);
                                        console.log("DEBUG: Both serverless and direct Firebase uploads failed.");

                                        setCustomDesignForm(prev => {
                                          const nextState = {
                                            ...prev,
                                            fileName: '',
                                            fileData: '',
                                            referenceImageUrl: ''
                                          };
                                          console.log("AFTER UPLOAD FAILED", nextState);
                                          return nextState;
                                        });
                                        setCustomDesignUploadProgress("Image upload failed. Please try again.");
                                        setCustomDesignUploading(false);
                                      }
                                    }
                                  };
                                  img.onerror = (err) => {
                                    console.error("DEBUG: Image loading failed:", err);
                                    setCustomDesignForm(prev => {
                                      const nextState = {
                                        ...prev,
                                        fileName: '',
                                        fileData: '',
                                        referenceImageUrl: ''
                                      };
                                      console.log("AFTER UPLOAD", nextState);
                                      return nextState;
                                    });
                                    setCustomDesignUploadProgress("Image upload failed. Please try again.");
                                    setCustomDesignUploading(false);
                                  };
                                };
                                reader.onerror = (err) => {
                                  console.error("DEBUG: FileReader error:", err);
                                  setCustomDesignUploadProgress("File reading failed. Please try again.");
                                  setCustomDesignUploading(false);
                                };
                              } catch (err) {
                                console.error("Image optimization error:", err);
                                setCustomDesignUploadProgress("Optimization failed. Please try again.");
                                setCustomDesignUploading(false);
                              }
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>

                      {customDesignUploadProgress && (
                        <p className="text-[10px] text-[#DDA0DD] font-bold text-center mt-1">
                          {customDesignUploadProgress}
                        </p>
                      )}

                      {customDesignForm.fileName && (
                        <div className="bg-[#006361]/5 border border-[#006361]/15 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-[#006361] font-semibold">
                          <span className="truncate max-w-[80%]">📎 {customDesignForm.fileName}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomDesignForm(prev => ({
                                ...prev,
                                fileName: '',
                                fileData: '',
                                referenceImageUrl: ''
                              }));
                              setCustomDesignUploadProgress('');
                            }}
                            className="text-red-500 hover:text-red-700 text-[11px] font-bold focus:outline-none"
                          >
                            Remove
                          </button>
                        </div>
                      )}

                      {/* Development Diagnostics Panel */}
                      {import.meta.env.DEV && (
                        <div className="mt-4 p-4 rounded-xl bg-[#0F0A0A] border border-[#DDA0DD]/20 font-sans text-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-[#DDA0DD]/10 pb-2">
                            <span className="font-serif text-[#DDA0DD] tracking-wider text-[11px] font-semibold">ATELIER CORE DIAGNOSTICS</span>
                            <span className="px-2 py-0.5 rounded text-[8px] bg-[#DDA0DD]/10 text-[#DDA0DD] font-semibold">DEV MODE</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-left text-[10px]">
                            <div className="space-y-0.5">
                              <p className="text-gray-400">Project ID:</p>
                              <p className="font-mono text-[#F5E6C4]">{firebaseDiagnostics.projectId}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-gray-400">Active Bucket:</p>
                              <p className="font-mono text-[#F5E6C4] truncate" title={firebaseDiagnostics.bucketName}>{firebaseDiagnostics.bucketName}</p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-gray-400">Auth Status:</p>
                              <p className="font-medium text-[#F5E6C4] flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${firebaseDiagnostics.valid ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                {firebaseDiagnostics.authStatus}
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-gray-400">Storage Status:</p>
                              <p className="font-medium text-[#F5E6C4] flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${firebaseDiagnostics.valid ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                {firebaseDiagnostics.storageStatus}
                              </p>
                            </div>
                          </div>
                          {firebaseDiagnostics.error && (
                            <div className="p-2 rounded bg-rose-950/20 border border-rose-500/20 text-rose-300 leading-normal text-left text-[9px]">
                              <strong>Error details:</strong> {firebaseDiagnostics.error}
                              {(firebaseDiagnostics.error.includes("notFound") || firebaseDiagnostics.error.includes("does not exist") || firebaseDiagnostics.error.includes("No active storage buckets")) ? (
                                <p className="mt-1 text-rose-400 italic">
                                  💡 Tip: Open the <a href="https://console.firebase.google.com/project/hr-jewellery/storage" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#DDA0DD]">Firebase Storage Console</a> and click "Get Started" to initialize the bucket!
                                </p>
                              ) : null}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomDesignStep(2)}
                          className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl text-center"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={customDesignUploading}
                          className="flex-1 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {customDesignUploading
                            ? "Uploading Image... ⏳"
                            : "Submit Request ✨"}
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>
          </div>
        )}

        {/* H. LUXURY POLICY DOCUMENTS MODAL */}
        {policyModalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#1D092A]/85 backdrop-blur-md transition-opacity" onClick={() => setPolicyModalContent(null)} />
            <div className="bg-[#13071C] border-2 border-[#DDA0DD]/35 rounded-3xl p-8 max-w-2xl w-full relative z-10 shadow-[0_20px_50px_rgba(212,175,55,0.25)] space-y-6 animate-fade-in text-xs max-h-[85vh] overflow-y-auto no-scrollbar">

              <div className="flex justify-between items-center border-b border-[#DDA0DD]/20 pb-4">
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#DDA0DD] font-bold block mb-1">HR JEWELLERS & SONS POLICIES</span>
                  <h3 className="serif-luxury text-2xl font-semibold text-white tracking-wide">{policyModalContent}</h3>
                </div>
                <button
                  onClick={() => setPolicyModalContent(null)}
                  className="w-8 h-8 rounded-full border border-[#DDA0DD]/20 hover:border-[#DDA0DD] flex items-center justify-center text-[#DDA0DD] hover:text-white transition-all cursor-pointer focus:outline-none"
                >
                  ✕
                </button>
              </div>

              <div className="text-white/85 leading-relaxed space-y-4 font-light text-[11px] pr-2 text-left font-sans">
                {policyModalContent === 'Terms & Conditions' && (
                  <>
                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif">1. General Guidelines</p>
                    <p>HR Jewellers & Sons reserves the right to modify or discontinue services or prices based on live market gold tickers and craftsmanship schedules in Rajasthan.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">2. Product Integrity</p>
                    <p>All items on our platform are government-certified 100% BIS Hallmarked. Images represent high-fashion captures of actual showroom specimens; minor handcrafting variations reflect standard Rajputana heritage authenticity.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">3. Billing & Purity Assurances</p>
                    <p>Prices lock at order confirmation. Standard GST and local Rajasthani development commissions apply. Official physical certificates verify exact weights, diamond clarities, and metal purities.</p>
                  </>
                )}

                {policyModalContent === 'Privacy Policy' && (
                  <>
                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif">1. Secure Ledger Protection</p>
                    <p>HR Jewellers & Sons is dedicated to preserving your data integrity. Consultation credentials, phone entries, and savings registrations are encoded and secured within high-tier Firebase systems.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">2. Data Usage Restrictions</p>
                    <p>We strictly utilize contact details to sync order references, GRP savings vouchers, and book bespoke showroom suites. Your metadata is never traded or distributed.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">3. Cookies & Analytics</p>
                    <p>We deploy subtle cookies to personalize luxury collections, cache wishlists, and track custom sketches for our master goldsmiths.</p>
                  </>
                )}

                {policyModalContent === 'Shipping Policy' && (
                  <>
                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif">1. Fully Insured Courier Network</p>
                    <p>We coordinate secure door-to-door transit under active high-value insurance portfolios. All shipments carry signature verification seals.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">2. Delivery Timeframes</p>
                    <p>Next-day secure logistics operate within Bikaner, Jaipur, and general Rajasthan regions. Premium out-of-state shipments conclude within 3–5 working days.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">3. Security Auditing</p>
                    <p>Atelier dispatch logs physical tamper check signatures. We advice clients to refuse packets displaying seal discrepancies.</p>
                  </>
                )}

                {policyModalContent === 'Return & Refund Policy' && (
                  <>
                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif">1. 30-Day Money-Back Guarantee</p>
                    <p>Standard pieces qualify for complete return credits or full cash reversals within 30 days of confirmation, subject to lab purity verification checks.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">2. Lifetime Exchange Program</p>
                    <p>Artisanal gold and certified diamonds carry a lifetime 100% metal value assurance. Exchange weight counts are calculated against the prevailing daily bullion rates.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">3. Custom Design Exclusions</p>
                    <p>Personalized engravings, family seal signets, and bespoke bridal sets hand-forged by Anil Soni do not qualify for default returns.</p>
                  </>
                )}

                {policyModalContent === 'Gold Saving Scheme Terms' && (
                  <>
                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif">1. 11+1 GRP Scheme Rules</p>
                    <p>Enrollees commit to standard monthly payments for 11 consecutive months. HR Jewellers & Sons contributes the final 12th installment as a mature luxury gift bonus.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">2. Redemption Avenues</p>
                    <p>GRP holdings must redeem exclusively for physical ornaments. Cash buybacks are prohibited for mature bonus ledger balances.</p>

                    <p className="font-semibold text-[#DDA0DD] text-xs font-serif mt-3">3. Value Hedging</p>
                    <p>Ledger grams accrue instantly based on payment day gold rates, protecting your investment from market spikes.</p>
                  </>
                )}
              </div>

              <button
                onClick={() => setPolicyModalContent(null)}
                className="w-full bg-gradient-to-r from-[#DDA0DD] to-[#4A126D] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer text-center"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        )}

        {/* Scroll Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-gold via-[#E6C687] to-gold z-50 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Custom Luxury Cursor Effects */}
        <div
          className={`hidden md:block custom-cursor-dot ${cursorHovering ? 'cursor-hover-active' : ''}`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        />
        <div
          className={`hidden md:block custom-cursor-ring ${cursorHovering ? 'cursor-hover-active' : ''}`}
          style={{ left: `${cursorRingPos.x}px`, top: `${cursorRingPos.y}px` }}
        />

      </div>
    </ErrorBoundary>
  );
}
