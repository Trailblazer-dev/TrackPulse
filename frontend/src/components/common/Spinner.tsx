import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="mt-4 text-gray-600 text-center">Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;
