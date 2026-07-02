import { useContext } from 'react';
import { RatesContext } from '../contexts/RatesContext';
import { RateService } from '../services/RateService';

export function useRates() {
  const context = useContext(RatesContext);
  if (!context) {
    throw new Error('useRates must be used within a RatesProvider');
  }

  const {
    goldRate24k  = 78500,
    goldRate22k  = 71958,
    goldRate18k  = 58875,
    silverRate   = 92000,
    silverRate1kg = 92000,
    platinumRate = 3500,
    lastUpdated  = null,
    publishedAt  = null,
    updatedBy    = null,
    isPublished  = false,
  } = context.rates || {};

  // Derived helpers (1g rates)
  const goldRate22kPerGram = goldRate22k / 10;
  const goldRate24kPerGram = goldRate24k / 10;
  const silverRate1g       = RateService.convertKgToGramSilver(silverRate1kg || silverRate);

  // Helper: calculate full price for a product using live rates
  const calculatePrice = (product) => {
    return RateService.calculateProductPrice(product, goldRate24k, silverRate1kg || silverRate);
  };

  const formatPrice = (amount) => {
    return RateService.formatINR(amount);
  };

  return {
    ...context,
    // Raw rates
    goldRate24k,
    goldRate22k,
    goldRate18k,
    silverRate,
    silverRate1kg,
    platinumRate,
    // Metadata
    lastUpdated,
    publishedAt,
    updatedBy,
    isPublished,
    // Derived
    goldRate22kPerGram,
    goldRate24kPerGram,
    silverRate1g,
    // Helpers
    calculatePrice,
    formatPrice,
  };
}

export default useRates;
