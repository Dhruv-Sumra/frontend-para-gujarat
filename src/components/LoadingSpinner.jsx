import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'accent' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    accent: 'border-[var(--accent)]',
    primary: 'border-[var(--primary)]',
    white: 'border-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-t-transparent ${colorClasses[color]} rounded-full animate-spin`}
        style={{ borderTopColor: 'transparent' }}
      />
    </div>
  );
};

export const LoadingCard = ({ className = '' }) => (
  <div className={`bg-gray-200 animate-pulse rounded-2xl ${className}`}>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);

export const LoadingSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
);

export default LoadingSpinner;