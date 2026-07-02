import { useContext } from 'react';
import { RatesContext } from '../contexts/RatesContext';
import { RateService } from '../services/RateService';

export function useRates() {
  const context = useContext(RatesContext);
  if (!context) {
    throw new Error('useRates must be used within a RatesProvider');
  }

  const { goldRate24k = 78500, silverRate1kg = 92000 } = context.rates || {};

  const goldRate22k = RateService.convert24kTo22k(goldRate24k);
  const silverRate1g = RateService.convertKgToGramSilver(silverRate1kg);

  // Return helper methods for calculations
  const calculatePrice = (product) => {
    return RateService.calculateProductPrice(product, goldRate24k, silverRate1kg);
  };

  const formatPrice = (amount) => {
    return RateService.formatINR(amount);
  };

  return {
    ...context,
    goldRate24k,
    goldRate22k,
    silverRate1kg,
    silverRate1g,
    calculatePrice,
    formatPrice
  };
}
export default useRates;
