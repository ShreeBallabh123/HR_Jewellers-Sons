import React, { createContext, useState, useEffect } from 'react';
import { ratesApi } from '../api/rates.api';

export const RatesContext = createContext();

const DEFAULTS = {
  goldRate24k:  78500,
  goldRate22k:  71958,
  goldRate18k:  58875,
  silverRate:   92000,
  silverRate1kg: 92000,
  platinumRate: 3500,
  lastUpdated:  null,
  publishedAt:  null,
  updatedBy:    null,
  isPublished:  false,
};

export function RatesProvider({ children }) {
  const [rates, setRates]     = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ratesApi.subscribeToRates(
      (data) => {
        setRates({
          ...DEFAULTS,
          ...data,
          // Backwards-compat alias: expose silverRate1kg alongside silverRate
          silverRate1kg: data.silverRate || data.silverRate1kg || DEFAULTS.silverRate1kg,
        });
        setLoading(false);
      },
      (err) => {
        console.error('Rates subscription error:', err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <RatesContext.Provider value={{ rates, loading }}>
      {children}
    </RatesContext.Provider>
  );
}
