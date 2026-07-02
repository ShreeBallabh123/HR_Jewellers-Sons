import { useMemo } from 'react';

export function useCalculator() {
  // Gold Reserve calculation
  const calculateGoldReserve = (amount, goldRate24k) => {
    const goldPricePerGram = goldRate24k / 10;
    const monthlyWeight = amount / goldPricePerGram;
    const totalInvested = amount * 11;
    const bonusWeight = monthlyWeight * 0.75; // 75% weight bonus on last installment
    const totalAccumulatedWeight = (monthlyWeight * 11) + bonusWeight;
    const currentValuationOfWeight = totalAccumulatedWeight * goldPricePerGram;
    const netReturnValuation = currentValuationOfWeight - totalInvested;

    return {
      monthlyWeight,
      totalInvested,
      bonusWeight,
      totalAccumulatedWeight,
      currentValuationOfWeight,
      netReturnValuation
    };
  };

  return {
    calculateGoldReserve
  };
}
export default useCalculator;
