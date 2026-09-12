/**
 * useGoldRate.js — Realtime hook for live gold rates
 * Subscribes to system_configs/metal_rates via Firestore onSnapshot.
 * Derives 22K/18K if admin only saved 24K rate.
 */
import { useState, useEffect, useMemo } from 'react';
import { goldRateService } from '../services/goldRateService';
import { deriveRates } from '../utils/pricing';

const DEFAULTS = {
  goldRate24k:  78500,
  goldRate22k:  71958,
  goldRate20k:  65417,
  goldRate18k:  58875,
  goldRate14k:  45788,
  silverRate:   92000,
  platinumRate: 3500,
  lastUpdated:  null,
  publishedAt:  null,
  updatedBy:    null,
  isPublished:  false,
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
        setRates({
          ...DEFAULTS,
          ...data,
          goldRate22k: data.goldRate22k || derived.goldRate22k,
          goldRate20k: data.goldRate20k || derived.goldRate20k,
          goldRate18k: data.goldRate18k || derived.goldRate18k,
          goldRate14k: data.goldRate14k || derived.goldRate14k,
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

  // Derived convenience values
  const goldRate24kPerGram = useMemo(() => rates.goldRate24k / 10, [rates.goldRate24k]);
  const goldRate22kPerGram = useMemo(() => rates.goldRate22k / 10, [rates.goldRate22k]);
  const goldRate20kPerGram = useMemo(() => rates.goldRate20k / 10, [rates.goldRate20k]);
  const goldRate18kPerGram = useMemo(() => rates.goldRate18k / 10, [rates.goldRate18k]);
  const goldRate14kPerGram = useMemo(() => rates.goldRate14k / 10, [rates.goldRate14k]);
  const silverRate1g       = useMemo(() => rates.silverRate / 1000, [rates.silverRate]);

  return {
    ...rates,
    goldRate24kPerGram,
    goldRate22kPerGram,
    goldRate20kPerGram,
    goldRate18kPerGram,
    goldRate14kPerGram,
    silverRate1g,
    loading,
    error,
  };
}

export default useGoldRate;
