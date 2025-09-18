import React, { useMemo, useState } from 'react';
import { errorCodes, brands } from '../data/errorCodes.js';

export default function ErrorCodeLookup() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return errorCodes.filter(ec => {
      const brandOk = brand === 'All' || ec.brand === brand;
      if (!q) return brandOk;
      return brandOk && (
        ec.code.toLowerCase().includes(q) ||
        ec.description.toLowerCase().includes(q) ||
        ec.fix.toLowerCase().includes(q)
      );
    });
  }, [query, brand]);

  return (
    <div className="max-w-4xl mx-auto bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white light:text-gray-800 spooky:text-orange-300">Error Codes</h3>
        <div className="flex items-center gap-2">
          <input className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Search code or description..." value={query} onChange={e => setQuery(e.target.value)} />
          <select className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white light:bg-white light:border-gray-300 light:text-gray-800" value={brand} onChange={e => setBrand(e.target.value)}>
            <option>All</option>
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-blue-200 light:text-gray-600">
              <th className="py-2 pr-2">Brand</th>
              <th className="py-2 pr-2">Code</th>
              <th className="py-2 pr-2">Description</th>
              <th className="py-2">Fix</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx} className="text-white light:text-gray-900 border-t border-white/10">
                <td className="py-2 pr-2">{r.brand}</td>
                <td className="py-2 pr-2 font-mono"><a className="text-blue-400 hover:underline" href={`${r.path}#errors`}>{r.code}</a></td>
                <td className="py-2 pr-2">{r.description}</td>
                <td className="py-2">{r.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


