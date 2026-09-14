/**
 * useGoldRate.js — Realtime hook for live gold rates
 * Subscribes to system_configs/metal_rates via Firestore onSnapshot.
 * Derives 22K/18K if admin only saved 24K rate.
 */
import { useState, useEffect, useMemo } from 'react';
import { goldRateService } from '../services/goldRateService';
import { deriveRates } from '../utils/pricing';

const DEFAULTS = {
  goldRate24k:      78500,
  goldRate22k:      71958,
  goldRate20k:      65417,
  goldRate18k:      58875,
  goldRate14k:      45788,
  silverRate:       92000,
  silverRate925:    85100,
  silverRateNormal: 82800,
  platinumRate:     3500,
  lastUpdated:      null,
  publishedAt:      null,
  updatedBy:        null,
  isPublished:      false,
};

export function useGoldRate() {
  const [rates, setRates]     = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const unsubscribe = goldRateService.subscribeToRates(
      (data) => {
        // Derive missing purity rates from 24K if not explicitly set
        const derived = deriveRates(data.goldRate24k || DEFAULTS.goldRate24k, data.purityPercentages || {});
        const baseSilver = data.silverRate || DEFAULTS.silverRate;
        setRates({
          ...DEFAULTS,
          ...data,
          goldRate22k:      data.goldRate22k || derived.goldRate22k,
          goldRate20k:      data.goldRate20k || derived.goldRate20k,
          goldRate18k:      data.goldRate18k || derived.goldRate18k,
          goldRate14k:      data.goldRate14k || derived.goldRate14k,
          silverRate:       baseSilver,
          silverRate925:    data.silverRate925 || Math.round(baseSilver * 0.925),
          silverRateNormal: data.silverRateNormal || Math.round(baseSilver * 0.90),
        });
        setLoading(false);
      },
      (err) => {
        console.error('[useGoldRate] Firestore error:', err);
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  // Derived convenience values (1g rates)
  const goldRate24kPerGram      = useMemo(() => rates.goldRate24k / 10, [rates.goldRate24k]);
  const goldRate22kPerGram      = useMemo(() => rates.goldRate22k / 10, [rates.goldRate22k]);
  const goldRate20kPerGram      = useMemo(() => rates.goldRate20k / 10, [rates.goldRate20k]);
  const goldRate18kPerGram      = useMemo(() => rates.goldRate18k / 10, [rates.goldRate18k]);
  const goldRate14kPerGram      = useMemo(() => rates.goldRate14k / 10, [rates.goldRate14k]);
  const silverRate1g            = useMemo(() => rates.silverRate / 1000, [rates.silverRate]);
  const silverRate925PerGram    = useMemo(() => (rates.silverRate925 || rates.silverRate * 0.925) / 1000, [rates.silverRate925, rates.silverRate]);
  const silverRateNormalPerGram = useMemo(() => (rates.silverRateNormal || rates.silverRate * 0.90) / 1000, [rates.silverRateNormal, rates.silverRate]);

  return {
    ...rates,
    goldRate24kPerGram,
    goldRate22kPerGram,
    goldRate20kPerGram,
    goldRate18kPerGram,
    goldRate14kPerGram,
    silverRate1g,
    silverRate925PerGram,
    silverRateNormalPerGram,
    loading,
    error,
  };
}

export default useGoldRate;

