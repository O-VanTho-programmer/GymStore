'use client';

import React from 'react';
import { usePageLoading } from '@/hooks/usePageLoading';
import PageLoading from './PageLoading';

const LoadingWrapper = ({ children, loadingText = 'Loading page...', delay = 1000 }) => {
  const isPageLoading = usePageLoading(delay);

  // Show page loading while the page is loading
  if (isPageLoading) {
    return <PageLoading text={loadingText} />;
  }

  return children;
};

export default LoadingWrapper;
