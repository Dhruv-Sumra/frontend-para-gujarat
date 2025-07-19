import React from "react";

const steps = [
  { year: 2016, label: "District Debut" },
  { year: 2018, label: "State Medal" },
  { year: 2020, label: "Tokyo Paralympics" },
  { year: 2023, label: "International Debut" },
  { year: 2025, label: "World Para Grand Prix" },
];

export default function AthleteCareerTimeline() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-6 text-center" style={{ color: 'var(--primary)' }}>
        Athlete Career Journey
      </h3>
      
      <div className="relative">
        {/* Steps: vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-0 px-2 sm:px-0 relative z-10">
          {steps.map((step, idx) => (
            <div key={step.year} className="flex flex-row sm:flex-col items-center relative w-full sm:w-auto">
              {/* Step Circle */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer bg-[var(--primary)] z-10"
                style={{ 
                  background: idx === steps.length - 1 ? 'var(--accent)' : 'var(--primary)',
                  border: '3px solid white',
                  marginTop: '-8px',
                  position: 'relative',
                  top: '0px'
                }}
                tabIndex={0}
                aria-label={`${step.year}: ${step.label}`}
              >
                {step.year}
              </div>
              {/* Step Label */}
              <div className="ml-4 sm:ml-0 mt-0 sm:mt-6 text-center" style={{ width: '100px' }}>
                <div className="font-semibold text-sm text-gray-800 leading-tight">
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-600 mb-1">Career Progression</div>
        <div className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
          District → State → International → World Class
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Typical 9+ year journey to elite level
        </div>
      </div>
    </div>
  );
} 