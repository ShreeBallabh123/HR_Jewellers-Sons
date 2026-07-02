import React, { createContext, useState, useEffect } from 'react';
import { ratesApi } from '../api/rates.api';

export const RatesContext = createContext();

export function RatesProvider({ children }) {
  const [rates, setRates] = useState({
    goldRate24k: 78500,
    silverRate1kg: 92000,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ratesApi.subscribeToRates(
      (data) => {
        setRates(data);
        setLoading(false);
      },
      (err) => {
        console.error("Rates subscription error:", err);
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
