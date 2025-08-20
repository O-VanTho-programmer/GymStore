import React from 'react';
import { useLoading } from '@/context/LoadingContext';

const GlobalLoadingBar = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div className="h-full bg-blue-500 animate-pulse transition-all duration-300 ease-out"></div>
    </div>
  );
};

export default GlobalLoadingBar;
