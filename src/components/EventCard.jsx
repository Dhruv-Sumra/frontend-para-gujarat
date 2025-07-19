import React from "react";

const medalColors = [
  "text-[#FFD700]", // Gold
  "text-[#C0C0C0]", // Silver
  "text-[#FF9933]", // Bronze
];

const EventCard = ({ title, medals, description, achievements, image }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-[#FF9933]/20 p-6 flex flex-col items-center max-w-md w-full mx-auto">
    {image && (
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-xl mb-4 border border-[#FF9933]/30" />
    )}
    <h4 className="text-xl font-bold text-[#FF9933] mb-2 text-center">{title}</h4>
    <div className="flex gap-4 mb-2 justify-center">
      {medals.map((count, i) => (
        <span key={i} className={`flex items-center gap-1 font-bold text-lg ${medalColors[i]}`}>
          {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"} {count}
        </span>
      ))}
    </div>
    {achievements ? (
      <ul className="text-gray-700 text-center text-sm mb-2 space-y-1">
        {achievements.map((a, i) => (
          <li key={i}>
            <span className="font-bold">{a.name}</span>{a.detail && <span> {a.detail}</span>}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-700 text-center text-sm mb-2">{description}</p>
    )}
  </div>
);

export default EventCard; 