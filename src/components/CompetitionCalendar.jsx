import React from "react";

const events = [
  { name: "District Championships", start: "2024-09-01", end: "2024-09-30", color: "#2563eb" },
  { name: "Gujarat Para Games", start: "2025-01-15", end: "2025-01-21", color: "#f59e42" },
  { name: "PCI Nationals", start: "2025-03-10", end: "2025-03-24", color: "#10b981" },
];

function getDaysBetween(start, end) {
  return (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
}

const minDate = new Date("2024-09-01");
const maxDate = new Date("2025-03-24");
const totalDays = getDaysBetween(minDate, maxDate);

export default function CompetitionCalendar() {
  return (
    <div className="w-full max-w-2xl mx-auto overflow-x-auto" aria-label="Competition calendar">
      <div className="flex flex-col gap-4 min-w-[400px]">
        {events.map((event) => {
          const left = ((new Date(event.start) - minDate) / (1000 * 60 * 60 * 24)) / totalDays * 100;
          const width = (getDaysBetween(event.start, event.end) / totalDays) * 100;
          return (
            <div key={event.name} className="flex items-center gap-3">
              <span className="w-40 text-sm text-gray-700">{event.name}</span>
              <div className="relative flex-1 h-5 bg-gray-100 rounded">
                <div
                  className="absolute h-5 rounded shadow-md border border-white"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    background: event.color,
                  }}
                />
              </div>
              <span className="w-24 text-xs text-gray-500 text-right">
                {event.start} – {event.end}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 