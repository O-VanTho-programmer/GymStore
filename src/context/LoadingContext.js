"use client";

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
  loadingText: '',
  setLoadingText: () => {}
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setIsLoading,
      loadingText,
      setLoadingText
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
