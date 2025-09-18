import React from 'react';

export default function WaterQualityCard() {
  const limits = [
    { name: 'TDS (ppm)', limit: '< 500', note: 'Best < 300 for ice clarity' },
    { name: 'Hardness (gpg)', limit: '< 7', note: '2–4 gpg ideal with softener' },
    { name: 'Chlorine / Chloramine', limit: '< 0.5 ppm', note: 'Use carbon/chloramine filter' },
    { name: 'pH', limit: '6.5 – 8.5', note: 'Outside range corrodes or scales' },
    { name: 'Iron', limit: '< 0.3 ppm', note: 'Staining / fouling above' },
  ];

  const filters = [
    { sku: '3M HF60', use: 'High capacity carbon / scale' },
    { sku: 'Everpure 7FC-S', use: 'Chloramine + scale inhibitor' },
    { sku: 'Pentair GRO-75', use: 'RO for high TDS sites' },
  ];

  return (
    <div className="bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white light:text-gray-800 spooky:text-orange-300">Water Quality Requirements</h3>
        <a href="/calculators" className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Calculators</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm text-blue-200 light:text-gray-600 mb-2">Limits</h4>
          <ul className="space-y-2">
            {limits.map((l, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-400">✔</span>
                <div>
                  <div className="text-white light:text-gray-900 text-sm font-medium">{l.name}: {l.limit}</div>
                  <div className="text-xs text-blue-200 light:text-gray-600">{l.note}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm text-blue-200 light:text-gray-600 mb-2">Suggested Filters</h4>
          <ul className="space-y-2">
            {filters.map((f, idx) => (
              <li key={idx} className="text-white light:text-gray-900 text-sm">
                <span className="font-mono bg-black/20 light:bg-gray-100 px-2 py-0.5 rounded mr-2">{f.sku}</span>
                {f.use}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-xs text-blue-200 light:text-gray-600">Record TDS, hardness, and disinfectant level on the Commissioning checklist.</p>
    </div>
  );
}


