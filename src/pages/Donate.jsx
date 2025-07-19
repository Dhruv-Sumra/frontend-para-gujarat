import React from 'react';

export default function Donate() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-lg w-full bg-[var(--card)] rounded-xl shadow-lg p-10 flex flex-col items-center border border-[var(--card-border)]">
        <span className="text-6xl mb-4" role="img" aria-label="Construction">🚧</span>
        <h1 className="text-3xl font-bold text-[var(--primary)] mb-2 text-center">Page under construction</h1>
        <p className="text-lg text-[var(--text)] text-center">The Donate page is coming soon! Please check back later.</p>
      </div>
    </main>
  );
} 