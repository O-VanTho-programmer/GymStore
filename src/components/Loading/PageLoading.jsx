import React from 'react';
import Loading from './Loading';

const PageLoading = ({ text = 'Loading page...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loading size="xl" text={text} />
      </div>
    </div>
  );
};

export default PageLoading;
