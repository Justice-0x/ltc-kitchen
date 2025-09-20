import React from 'react';

export default function FloatingActions() {
  const items = [
    { href: '/docs', label: 'Manuals', emoji: '📚' },
    { href: '/parts-order', label: 'Order', emoji: '📦' },
    { href: '/calculators', label: 'Calc', emoji: '🧮' },
    { href: '/contact', label: 'Support', emoji: '📞' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden">
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-800/80 backdrop-blur border border-white/10 shadow-xl">
        {items.map((i) => (
          <a key={i.href} href={i.href} className="flex items-center gap-1 px-3 py-2 rounded-xl text-white hover:bg-slate-700/80">
            <span>{i.emoji}</span>
            <span className="text-sm">{i.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// NOTE: This file intentionally exports a single default component to avoid duplicate symbol errors.
