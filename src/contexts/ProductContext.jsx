import React, { createContext, useState, useEffect } from 'react';
import { productsApi } from '../api/products.api';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  useEffect(() => {
    // Live listener for products collection
    const unsubscribeProducts = productsApi.subscribeToProducts(
      (data) => {
        setProducts(data);
        setLoading(false);
      },
      (err) => {
        console.error("Products subscription error:", err);
        setLoading(false);
      }
    );

    // Live listener for categories collection
    const unsubscribeCategories = productsApi.subscribeToCategories(
      (data) => {
        setCategories(data);
        setCategoriesLoaded(true);
      },
      (err) => {
        console.error("Categories subscription error:", err);
      }
    );

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories, loading, categoriesLoaded }}>
      {children}
    </ProductContext.Provider>
  );
}
