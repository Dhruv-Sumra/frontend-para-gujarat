import React from "react";

const MilestoneList = ({ milestones }) => (
  <ul className="space-y-3 max-w-2xl w-full mx-auto">
    {milestones.map((item, i) => (
      <li key={i} className="flex items-start gap-3 bg-white rounded-xl shadow border border-[#FF9933]/20 px-4 py-3">
        <span className="text-2xl mt-0.5 text-[#FF9933]">✔️</span>
        <span className="text-gray-800 text-sm font-medium">{item}</span>
      </li>
    ))}
  </ul>
);

export default MilestoneList; 