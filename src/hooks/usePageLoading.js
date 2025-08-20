'use client';

import { useState, useEffect } from 'react';

export const usePageLoading = (delay = 1000) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsPageLoading(false);
    };
  }, [delay]);

  return isPageLoading;
};
