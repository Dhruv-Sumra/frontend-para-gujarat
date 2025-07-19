import React, { useState, useEffect, useRef } from 'react';
import mapData from '../gujaratCities.json';
import athleteData from '../gujaratAthletes.json';

const baseColor = '#fdba74'; // Lighter orange
const hoverColor = '#fb923c'; // Medium orange
const highlightColor = '#FF9933'; // Saffron/orange for highlight
const TOOLTIP_BG = '#e0f2fe'; // Light blue // eslint-disable-line no-unused-vars

function GujaratMap({ highlightedDistrict, attachedDistricts = [] }) {
  const [hovered, setHovered] = useState(null);
  const [isInView, setIsInView] = useState(false); // eslint-disable-line no-unused-vars
  const [animatedDistricts, setAnimatedDistricts] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const mapRef = useRef(null);
  const districts = Object.values(mapData);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          // Animate districts one by one with faster staggered delays
          districts.forEach((district, index) => {
            setTimeout(() => {
              setAnimatedDistricts(prev => {
                if (!prev.includes(district.id)) {
                  return [...prev, district.id];
                }
                return prev;
              });
            }, index * 5); 
          });
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    const currentMapRef = mapRef.current;
    if (currentMapRef) {
      observer.observe(currentMapRef);
    }
    return () => {
      if (currentMapRef) {
        observer.unobserve(currentMapRef);
      }
    };
  }, [districts, hasAnimated]);

  // If nothing is attached or highlighted, show all as attached (for default view)
  const nothingAttached = (!highlightedDistrict && (!attachedDistricts || attachedDistricts.length === 0));

  // Calculate left-to-right order for color sweep
  const getDistrictX = (district) => {
    // Find the first x coordinate in the path string
    const match = district.path.match(/([0-9]+\.?[0-9]*)/);
    return match ? parseFloat(match[1]) : 0;
  };
  const sortedDistricts = [...districts].sort((a, b) => getDistrictX(a) - getDistrictX(b));

  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg
        ref={mapRef}
        viewBox="0 0 800 600"
        className="w-full scale-150 md:scale-105 max-w-7xl h-[320px] sm:h-[480px] md:h-[600px] lg:h-[700px] xl:h-[800px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {sortedDistricts.map((district, index) => {
          const isHighlighted =
            highlightedDistrict &&
            (district.id === highlightedDistrict ||
              district.name?.toLowerCase() === highlightedDistrict?.toLowerCase());
          const isAnimated = animatedDistricts.includes(district.id);
          const isAttached = nothingAttached || isAnimated || attachedDistricts.includes(district.district || district.name) || isHighlighted;
          // Calculate stagger based on x-position order
          const stagger = index * 0.03;
          return (
            <g key={district.id}>
              <path
                d={district.path}
                style={{
                  ...{
                    cursor: 'pointer',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: isHighlighted
                      ? 'url(#glow) drop-shadow(0 0 20px #FF9933aa)'
                      : isAttached
                      ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))'
                      : 'blur(2px)',
                    transform: `scale(${isAttached ? 1 : 0.92}) translateY(${isAttached ? 0 : 18}px)` + (isAnimated ? '' : ''),
                    transformOrigin: 'center',
                    animation: isAnimated ? `colorSweep 0.7s cubic-bezier(.4,2,.6,1) ${stagger}s both` : 'none',
                    fill: isHighlighted
                      ? highlightColor
                      : hovered === district.id
                      ? hoverColor
                      : isAttached
                      ? baseColor
                      : '#e5e7eb',
                  }
                }}
                stroke={isHighlighted ? highlightColor : "#fff7ed"}
                strokeWidth={isHighlighted || hovered === district.id ? 2.5 : 1.2}
                opacity={isAttached ? 1 : 0.15}
                onMouseEnter={() => setHovered(district.id)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Pulse animation for highlighted district */}
              {isHighlighted && (
                <path
                  d={district.path}
                  fill="none"
                  stroke={highlightColor}
                  strokeWidth="2"
                  opacity="0.6"
                  style={{
                    animation: 'pulse 2s ease-in-out infinite',
                    transformOrigin: 'center'
                  }}
                />
              )}
            </g>
          );
        })}
        {/* Tooltip */}
        {hovered && (() => {
          const d = districts.find(d => d.id === hovered);
          if (!d) return null;
          const athlete = athleteData.find(a => a.district.toLowerCase() === d.name.toLowerCase());
          const match = d.path.match(/([0-9]+\.?[0-9]*) ([0-9]+\.?[0-9]*)/);
          let x = match ? parseFloat(match[1]) : 400;
          let y = match ? parseFloat(match[2]) - 120 : 180;
          const tooltipWidth = 150;
          const tooltipHeight = 150;
          if (x - tooltipWidth/2 < 0) x = tooltipWidth/2;
          if (x + tooltipWidth/2 > 800) x = 800 - tooltipWidth/2;
          if (y < 0) y = 10;
          if (y + tooltipHeight > 600) y = 600 - tooltipHeight - 10;
          return (
            <foreignObject x={x-tooltipWidth/2} y={y} width={tooltipWidth} height={tooltipHeight} pointerEvents="none">
              <div
                className="rounded-xl shadow-lg border px-4 py-3 flex flex-col items-center min-w-[120px] min-h-[80px] pointer-events-none font-sans animate-fadeIn text-xs"
                style={{
                  background: 'var(--card)',
                  color: 'var(--text)',
                  borderColor: 'var(--card-border)',
                  boxShadow: '0 2px 12px 0 rgba(30,58,138,0.10)'
                }}
              >
                <div className="font-bold text-sm mb-1 tracking-wide drop-shadow-sm uppercase text-center whitespace-nowrap overflow-hidden text-ellipsis w-full" style={{color: 'var(--card-title)'}}>{d.name}</div>
                <div className="w-full border-t my-1" style={{borderColor: 'var(--card-border)'}}></div>
                {athlete && (
                  <div className="flex flex-col gap-0.5 mt-0.5 w-full items-center">
                    <div className="font-semibold text-xs tracking-wide" style={{color: 'var(--text)'}}>Male: <span className="font-bold" style={{color: 'var(--text)'}}>{athlete.male}</span></div>
                    <div className="font-semibold text-xs tracking-wide" style={{color: 'var(--text)'}}>Female: <span className="font-bold" style={{color: 'var(--text)'}}>{athlete.female}</span></div>
                  </div>
                )}
              </div>
            </foreignObject>
          );
        })()}
        <style>{`
          @keyframes colorSweep {
            0% {
              opacity: 0.1;
              transform: scale(0.85);
              filter: blur(2px);
            }
            60% {
              opacity: 1;
              transform: scale(1.08);
              filter: drop-shadow(0 0 16px #FF9933aa);
            }
            100% {
              opacity: 1;
              transform: scale(1);
              filter: none;
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.3;
            }
          }
        `}</style>
      </svg>
    </div>
  );
}

export default GujaratMap; 