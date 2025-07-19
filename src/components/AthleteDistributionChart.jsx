import React from "react";

const data = [
  { label: "Ahmedabad", value: 412, color: "#2563eb", percentage: 13.2 },
  { label: "Surat", value: 387, color: "#f59e42", percentage: 12.4 },
  { label: "Vadodara", value: 298, color: "#10b981", percentage: 9.6 },
  { label: "Other Districts", value: 2015, color: "#64748b", percentage: 64.8 },
];

export default function AthleteDistributionChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  // Calculate SVG arc paths
  const arcs = data.map((d) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = 60 + 50 * Math.cos(startAngle - Math.PI / 2);
    const y1 = 60 + 50 * Math.sin(startAngle - Math.PI / 2);
    const x2 = 60 + 50 * Math.cos(endAngle - Math.PI / 2);
    const y2 = 60 + 50 * Math.sin(endAngle - Math.PI / 2);
    return (
      <path
        key={d.label}
        d={`M60,60 L${x1},${y1} A50,50 0 ${largeArc} 1 ${x2},${y2} Z`}
        fill={d.color}
        opacity={0.9}
        className="hover:opacity-100 transition-opacity cursor-pointer"
      />
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-center" style={{ color: 'var(--primary)' }}>
        Athlete Distribution by District
      </h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <svg
            width="140"
            height="140"
            viewBox="0 0 120 120"
            className="mb-2"
            role="img"
            aria-label="Athlete distribution by district"
          >
            <title>Athlete Distribution by District</title>
            {arcs}
            <circle cx={60} cy={60} r={35} fill="white" />
            <text x={60} y={60} textAnchor="middle" className="font-bold text-lg fill-gray-700">
              {total.toLocaleString()}
            </text>
            <text x={60} y={75} textAnchor="middle" className="text-xs fill-gray-500">
              Athletes
            </text>
          </svg>
        </div>

        {/* Detailed Legend */}
        <div className="flex-1 space-y-3">
          {data.map((d) => (
            <div
              key={d.label}
              className="flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{ 
                borderColor: d.color,
                backgroundColor: `${d.color}08`
              }}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="inline-block w-4 h-4 rounded-full shadow-sm" 
                  style={{ background: d.color }} 
                />
                <div>
                  <span className="font-semibold text-gray-800">{d.label}</span>
                  <div className="text-xs text-gray-500">
                    {d.percentage}% of total
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg" style={{ color: d.color }}>
                  {d.value.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">athletes</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Total Registered Athletes</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
            {total.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Across 33 districts in Gujarat
          </div>
        </div>
      </div>
    </div>
  );
} 