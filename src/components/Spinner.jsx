import React from 'react';

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-[#FF6F00]/30 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#FF6F00] rounded-full"></div>
        </div>
        
        {/* Inner dot */}
        <div className="absolute inset-4 w-8 h-8 bg-[#004E92] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Spinner;