import React, { useEffect, useRef } from "react";

function useCountUp(end, duration = 1200) {
  const ref = useRef();
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    let current = start;
    const node = ref.current;
    if (!node) return;
    node.textContent = "0";
    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        node.textContent = `${end}`;
        clearInterval(interval);
      } else {
        node.textContent = `${current}`;
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end, duration]);
  return ref;
}

const medals = [
  {
    label: "Gold",
    icon: "🥇",
    color: "#FFD700",
    text: "text-[#FFD700]",
    bg: "bg-[#FFD700]/10",
  },
  {
    label: "Silver",
    icon: "🥈",
    color: "#C0C0C0",
    text: "text-[#C0C0C0]",
    bg: "bg-[#C0C0C0]/10",
  },
  {
    label: "Bronze",
    icon: "🥉",
    color: "#FF9933",
    text: "text-[#FF9933]",
    bg: "bg-[#FF9933]/10",
  },
];

const MedalCounter = ({ gold, silver, bronze, goldName, silverName, bronzeName }) => {
  const goldRef = useCountUp(gold);
  const silverRef = useCountUp(silver);
  const bronzeRef = useCountUp(bronze);
  const refs = [goldRef, silverRef, bronzeRef];
  const values = [gold, silver, bronze]; // eslint-disable-line no-unused-vars

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 px-0 py-0 mb-8 max-w-2xl w-full items-center bg-transparent border-none shadow-none">
        {/* Gold */}
        <div className={`flex flex-col items-center min-w-[90px] ${medals[0].bg} rounded-xl py-3 px-2`} style={{ boxShadow: '0 2px 8px 0 #FFD70022' }}>
          <span className="text-3xl mb-1" role="img" aria-label={medals[0].label}>{medals[0].icon}</span>
          <span ref={goldRef} className={`text-2xl font-extrabold ${medals[0].text} mb-1`} />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1E3A8A]">{medals[0].label}</span>
          {goldName && <span className="text-xs text-gray-600 mt-1 text-center">{goldName}</span>}
        </div>
        {/* Silver */}
        <div className={`flex flex-col items-center min-w-[90px] ${medals[1].bg} rounded-xl py-3 px-2`} style={{ boxShadow: '0 2px 8px 0 #C0C0C022' }}>
          <span className="text-3xl mb-1" role="img" aria-label={medals[1].label}>{medals[1].icon}</span>
          <span ref={silverRef} className={`text-2xl font-extrabold ${medals[1].text} mb-1`} />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1E3A8A]">{medals[1].label}</span>
          {silverName && <span className="text-xs text-gray-600 mt-1 text-center">{silverName}</span>}
        </div>
        {/* Bronze (spans both columns on mobile, normal on sm+) */}
        <div className={`flex flex-col items-center min-w-[90px] ${medals[2].bg} rounded-xl py-3 px-2 col-span-2 sm:col-span-1`} style={{ boxShadow: '0 2px 8px 0 #FF993322' }}>
          <span className="text-3xl mb-1" role="img" aria-label={medals[2].label}>{medals[2].icon}</span>
          <span ref={bronzeRef} className={`text-2xl font-extrabold ${medals[2].text} mb-1`} />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#1E3A8A]">{medals[2].label}</span>
          {bronzeName && <span className="text-xs text-gray-600 mt-1 text-center">{bronzeName}</span>}
        </div>
      </div>
    </div>
  );
};

export default MedalCounter;