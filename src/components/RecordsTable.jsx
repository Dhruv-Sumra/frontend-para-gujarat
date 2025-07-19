import React from "react";

const RecordsTable = ({ data, columns, theme = 'theme-light' }) => {
  // Theme-based colors
  const bg = theme === 'theme-dark' ? '#233A5E' : theme === 'theme-orange' ? '#FFF3E0' : theme === 'theme-blue' ? '#E3F2FD' : '#fff';
  const border = theme === 'theme-dark' ? '#FF9933' : theme === 'theme-blue' ? '#90CAF9' : '#FF9933';
  const thText = theme === 'theme-dark' ? '#FF9933' : theme === 'theme-blue' ? '#0D47A1' : '#FF9933';
  const tdAthlete = theme === 'theme-dark' ? '#fff' : theme === 'theme-blue' ? '#0D47A1' : '#1E3A8A';
  const tdEvent = theme === 'theme-dark' ? '#e0e0e0' : theme === 'theme-blue' ? '#1976D2' : '#444';
  // Use accent color for record column
  const tdRecord = theme === 'theme-blue' ? '#0D47A1' : '#FF9933';
  const evenBg = theme === 'theme-dark' ? '#FF9933' + '11' : theme === 'theme-blue' ? '#90CAF9' + '22' : '#FF9933' + '0D';
  const theadBg = theme === 'theme-dark' ? '#FF9933' + '22' : theme === 'theme-blue' ? '#90CAF9' + '22' : '#FF9933' + '1A';
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg max-w-2xl w-full mx-auto" style={{ background: bg, border: `1px solid ${border}` }}>
      <table className="min-w-[320px] w-full">
        <thead className="sticky top-0 z-10" style={{ background: theadBg }}>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col}
                className={`px-4 py-3 text-left font-bold text-sm uppercase tracking-wide`}
                style={{ color: i === 2 ? tdRecord : thText }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 1 ? evenBg : 'transparent' }}>
              <td className="px-4 py-2 font-medium" style={{ color: tdAthlete }}>{row.athlete}</td>
              <td className="px-4 py-2" style={{ color: tdEvent }}>{row.event}</td>
              <td className="px-4 py-2 font-semibold" style={{ color: tdRecord }}>{row.record}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable; 