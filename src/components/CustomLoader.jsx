import React, { useState, useEffect } from 'react';

const CustomLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Empowering Abilities, Inspiring Excellence...",
    "Your gateway to Gujarat's Para Sports journey is loading.",
    "Together, towards a more inclusive future of sporting brilliance.",
    "Please wait a moment while we prepare your experience."
  ];

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete && onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#004E92] to-[#0066CC] flex items-center justify-center z-50">
      <div className="text-center text-white max-w-md px-6">
        {/* Animated Sports Icons */}
        <div className="relative mb-8">
          <div className="flex justify-center items-center space-x-4 mb-6">
            {/* Wheelchair Icon */}
            <div className="w-12 h-12 border-4 border-[#FF6F00] rounded-full animate-spin">
              <div className="w-2 h-2 bg-[#FF6F00] rounded-full mt-1 ml-1"></div>
            </div>
            
            {/* Running Blade */}
            <div className="w-8 h-12 bg-[#00C853] rounded-t-full animate-bounce delay-300"></div>
            
            {/* Archery Target */}
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 border-4 border-[#FFD600] rounded-full animate-pulse"></div>
              <div className="absolute inset-2 w-8 h-8 border-2 border-[#FFD600] rounded-full"></div>
              <div className="absolute inset-4 w-4 h-4 bg-[#FFD600] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <p className="text-lg font-medium leading-relaxed transition-all duration-500 opacity-100">
            {messages[messageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF6F00] to-[#FFD600] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Progress Text */}
        <p className="text-sm opacity-80">
          {Math.round(Math.min(progress, 100))}% Complete
        </p>

        {/* PSAG Logo/Text */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#FF6F00]">
            Para Sports Association of Gujarat
          </h3>
          <p className="text-sm opacity-70 mt-1">
            Where Every Ability is a Strength
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;