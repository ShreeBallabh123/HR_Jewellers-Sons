import React, { useState, useEffect } from 'react';
import AppProviders from './contexts/AppProviders';
import { useAuth } from './hooks/useAuth';
import { useRates } from './hooks/useRates';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useWishlist } from './hooks/useWishlist';

import Admin from './Admin';
import ErrorBoundary from './ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import Loader from './components/Loader';

// Web Audio API dynamic Sound Synth
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

const Home = React.lazy(() => import('./pages/Home'));
const Collections = React.lazy(() => import('./pages/Collections'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const GoldReserve = React.lazy(() => import('./pages/GoldReserve'));
const Offers = React.lazy(() => import('./pages/Offers'));
const GoldCoins = React.lazy(() => import('./pages/GoldCoins'));
const Heritage = React.lazy(() => import('./pages/Heritage'));
const Valuation = React.lazy(() => import('./pages/Valuation'));
const Savings = React.lazy(() => import('./pages/Savings'));
const SavingsEnroll = React.lazy(() => import('./pages/SavingsEnroll'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Showrooms = React.lazy(() => import('./pages/Showrooms'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

import { StorageService } from './services/StorageService';

function AppContent() {
  const getInitialPage = () => {
    try {
      if (typeof window === 'undefined') return 'home';
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const targetPage = pageParam || path;
      const validPages = [
        'admin', 'savings', 'gold-reserve', 'offers', 'gold-coins', 'heritage', 
        'valuation', 'collections', 'showrooms', 'terms-and-conditions', 
        'privacy-policy', 'product-detail', 'savings-enroll', 'checkout'
      ];
      if (validPages.includes(targetPage)) {
        return targetPage;
      }
    } catch (e) {
      console.warn("Routing initialization failed:", e);
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [soundEnabled, setSoundEnabled] = useState(() => StorageService.get('hrj_sound_enabled', true));

  // Catalog page states & filters
  const [activeCategoryTab, setActiveCategoryTab] = useState('Collections');
  const [metalFilter, setMetalFilter] = useState('all');
  const [purityFilter, setPurityFilter] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000000);
  const [coinPurityTab, setCoinPurityTab] = useState('24K');
  const [coinWeightFilter, setCoinWeightFilter] = useState('all');

  const { products, loading: productsLoading } = useProducts();
  const { rates, loading: ratesLoading } = useRates();
  const { currentUser, loginAnonymously, loading: authLoading } = useAuth();
  const { wishlistItems, setWishlistOpen } = useWishlist();
  const { cartItems, setCartOpen } = useCart();

  const [detailProduct, setDetailProduct] = useState(null);

  // LuxurySynth instance — singleton for this component lifecycle
  const synth = React.useRef(new LuxurySynth()).current;

  // Sound triggering helper — uses Web Audio API synth, no file imports needed
  const triggerAudio = (type) => {
    if (!soundEnabled) return;
    try {
      if (type === 'shimmer') {
        synth.playShimmer();
      } else {
        synth.playClick();
      }
    } catch (e) {
      // Audio context errors are non-fatal, silently ignored
    }
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    StorageService.set('hrj_sound_enabled', nextVal);
  };

  // Browser Routing coordinates
  const navigateTo = (page) => {
    triggerAudio('click');
    setCurrentPage(page);
    window.history.pushState(null, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPDP = (prod) => {
    setDetailProduct(prod);
    navigateTo('product-detail');
  };

  // Check popstate updates
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        const validPages = [
          'admin', 'savings', 'gold-reserve', 'offers', 'gold-coins', 'heritage', 
          'valuation', 'collections', 'showrooms', 'terms-and-conditions', 
          'privacy-policy', 'product-detail', 'savings-enroll', 'checkout'
        ];
        if (validPages.includes(path)) {
          setCurrentPage(path);
          return;
        }
      } catch (e) {
        console.warn("Popstate sync failed:", e);
      }
      setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // One time anonymous login for visitors
  useEffect(() => {
    if (!currentUser) {
      loginAnonymously();
    }
  }, [currentUser]);

  // Sync title and SEO meta descriptions tags dynamically
  useEffect(() => {
    let title = 'HR Jewellers & Sons — Luxury Storefront';
    let desc = 'Finalized light-themed modern storefront replica of HR Jewellers & Sons. Explore certified diamond solitaires, GRP savings calculators, and Bikaneri ornaments.';
    
    switch (currentPage) {
      case 'collections':
        title = 'Premium Storefront Catalog — HR Jewellers & Sons';
        desc = 'Browse our modern interactive catalog of certified gold, platinum, uncut diamonds, and pooja silverwares.';
        break;
      case 'heritage':
        title = 'Legacy and Royal Showroom — HR Jewellers';
        desc = 'Discover the legacy and certified royal lineage of our master goldsmiths working in Bikaner since 1924.';
        break;
      case 'valuation':
        title = 'Live Daily Bullion Rates Estimator — HR Jewellers & Sons';
        desc = 'Calculate jewelry rates instantly according to active Indian bullion indexes and 916 hallmark metrics.';
        break;
      case 'showrooms':
        title = 'Flagship Fitting Showroom Bikaner — HR Jewellers & Sons';
        desc = 'Book a private lounge suite at Tilak Nagar in Bikaner. Register appointments for bespoke custom fittings.';
        break;
      case 'product-detail':
        title = `${detailProduct?.name || 'Exclusive Ornaments'} — HR Jewellers & Sons`;
        desc = `Details, carat purity specs, dynamic pricing breakdown, EMI calculator and zip code delivery checker.`;
        break;
      case 'savings':
        title = `11+1 Gold Saving Scheme — HR Jewellers & Sons`;
        desc = `Simulate GRP monthly savings inputs for our 11+1 Gold Saving Scheme, get the 12th Month completely FREE as a 100% Bonus Month.`;
        break;
      case 'gold-reserve':
        title = `Gold Reserve Option Plan — HR Jewellers & Sons`;
        desc = `Simulate monthly savings inputs for our Gold Reserve Option Plan, receive gold units at live values.`;
        break;
      case 'gold-coins':
        title = 'Invest in Pure Gold Coins — HR Jewellers & Sons';
        desc = 'Discover certified 24K and 22K gold coins crafted for gifting, investment, and heritage value.';
        break;
      case 'offers':
        title = `Exclusive Offers & Stores — HR Jewellers & Sons`;
        desc = `Explore exclusive discounts, GRP monthly savings options, certified diamond offers, and check nearest boutique store pincodes.`;
        break;
      case 'checkout':
        title = `Checkout — HR Jewellers & Sons`;
        desc = `Complete your order securely with HR Jewellers & Sons. Choose delivery or store pickup.`;
        break;
    }
    
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
  }, [currentPage, detailProduct]);

  // Loading Screen Indicator
  const appLoading = productsLoading || ratesLoading || authLoading;
  if (appLoading && currentPage !== 'admin') {
    return <Loader />;
  }

  // Render Admin View directly (Admin handles its own internal layout wraps)
  if (currentPage === 'admin') {
    return (
      <ErrorBoundary>
        <Admin />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <MainLayout
        currentPage={currentPage}
        navigateTo={navigateTo}
        changeCategoryTab={(tab) => {
          setActiveCategoryTab(tab);
          setMetalFilter('all');
        }}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        triggerAudio={triggerAudio}
        setCoinPurityTab={setCoinPurityTab}
        setCoinWeightFilter={setCoinWeightFilter}
        setMetalFilter={setMetalFilter}
        setMaxPriceFilter={setMaxPriceFilter}
        navigateToPDP={navigateToPDP}
      >
        {/* Suspense Wrapper for Page Components Lazy Loading */}
        <React.Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-bold text-xs uppercase tracking-widest text-[#4A126D]">Loading Boutique Workspace...</div>}>
          
          {currentPage === 'home' && (
            <Home 
              navigateTo={navigateTo} 
              navigateToPDP={navigateToPDP}
              changeCategoryTab={setActiveCategoryTab}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'collections' && (
            <Collections
              activeCategoryTab={activeCategoryTab}
              setActiveCategoryTab={setActiveCategoryTab}
              metalFilter={metalFilter}
              setMetalFilter={setMetalFilter}
              purityFilter={purityFilter}
              setPurityFilter={setPurityFilter}
              maxPriceFilter={maxPriceFilter}
              setMaxPriceFilter={setMaxPriceFilter}
              navigateToPDP={navigateToPDP}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'product-detail' && (
            <ProductDetail
              detailProduct={detailProduct}
              setDetailProduct={setDetailProduct}
              navigateTo={navigateTo}
              navigateToPDP={navigateToPDP}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'savings' && (
            <Savings
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'savings-enroll' && (
            <SavingsEnroll
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'gold-reserve' && (
            <GoldReserve
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'gold-coins' && (
            <GoldCoins
              coinPurityTab={coinPurityTab}
              setCoinPurityTab={setCoinPurityTab}
              coinWeightFilter={coinWeightFilter}
              setCoinWeightFilter={setCoinWeightFilter}
              navigateTo={navigateTo}
              navigateToPDP={navigateToPDP}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'offers' && (
            <Offers
              navigateTo={navigateTo}
              setMetalFilter={setMetalFilter}
              setMaxPriceFilter={setMaxPriceFilter}
              changeCategoryTab={setActiveCategoryTab}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'heritage' && (
            <Heritage
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'valuation' && (
            <Valuation
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'checkout' && (
            <Checkout
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'showrooms' && (
            <Showrooms
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'terms-and-conditions' && (
            <TermsAndConditions
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

          {currentPage === 'privacy-policy' && (
            <PrivacyPolicy
              navigateTo={navigateTo}
              triggerAudio={triggerAudio}
            />
          )}

        </React.Suspense>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}
