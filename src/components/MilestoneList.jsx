import React from "react";

// Accessible checkmark SVG icon for clarity, not emoji
const CheckIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="w-6 h-6 text-[#FF9933] flex-shrink-0 mt-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx={12} cy={12} r={11} stroke="#FFF3E6" strokeWidth={2} fill="#FFF3E6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13.5l3 3.5 6-7" />
  </svg>
);

const MilestoneList = ({ milestones }) => (
  <ul className="flex flex-col gap-4 max-w-2xl w-full mx-auto px-2">
    {milestones.map((item, i) => (
      <li
        key={`${item}-${i}`}
        className="flex items-start gap-4 bg-white/90 rounded-2xl shadow-md border border-[#FF9933]/25 px-6 py-4 hover:shadow-lg transition-shadow group"
        tabIndex={0} // Keyboard accessibility
        aria-label={`Milestone ${i + 1}: ${item}`}
      >
        <span className="transition-transform group-hover:scale-110">
          <CheckIcon />
        </span>
        <span className="text-gray-900 text-base font-semibold leading-snug">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

export default MilestoneList;
