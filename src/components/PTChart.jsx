import React, { useMemo, useState } from 'react';
import { refrigerants, ptTables, interpolatePsig, interpolateTempF } from '../data/ptData.js';

function toNumber(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export default function PTChart() {
  const [refrigerantId, setRefrigerantId] = useState('R410A');
  const [unit, setUnit] = useState({ temp: 'F', pressure: 'psig' });
  const [inputMode, setInputMode] = useState('temp'); // 'temp' or 'pressure'
  const [tempF, setTempF] = useState('40');
  const [psig, setPsig] = useState('120');
  const [stepF, setStepF] = useState(10); // quick table step size

  const table = ptTables[refrigerantId] || [];

  const denseTable = useMemo(() => {
    if (!table.length) return [];
    const start = table[0].tF;
    const end = table[table.length - 1].tF;
    const rows = [];
    for (let t = start; t <= end; t += stepF) {
      const p = interpolatePsig(refrigerantId, t);
      rows.push({ tF: Math.round(t), psig: p != null ? Math.round(p) : null });
    }
    return rows;
  }, [table, stepF, refrigerantId]);

  const computed = useMemo(() => {
    if (inputMode === 'temp') {
      const tF = toNumber(tempF);
      const p = interpolatePsig(refrigerantId, tF);
      return { tF, psig: p };
    } else {
      const p = toNumber(psig);
      const tF = interpolateTempF(refrigerantId, p);
      return { tF, psig: p };
    }
  }, [inputMode, tempF, psig, refrigerantId]);

  const displayTemp = unit.temp === 'F' ? computed.tF : ((computed.tF - 32) * 5) / 9;
  const displayPressure = unit.pressure === 'psig' ? computed.psig : (computed.psig != null ? (computed.psig + 14.7) * 6.89476 : null);

  const formatNumber = (n, digits = 1) => (n == null ? '-' : n.toFixed(digits));

  return (
    <div className="max-w-3xl mx-auto bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white light:text-gray-800 spooky:text-orange-300">Pressure-Temperature Chart</h3>
        <div className="flex flex-wrap gap-2">
          <select className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white light:bg-white light:border-gray-300 light:text-gray-800"
                  value={refrigerantId} onChange={e => setRefrigerantId(e.target.value)}>
            {refrigerants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <div className="flex items-center gap-1 text-white light:text-gray-800">
            <button className={`px-2 py-1 rounded ${unit.temp==='F'?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={() => setUnit(u => ({ ...u, temp: 'F' }))}>°F</button>
            <button className={`px-2 py-1 rounded ${unit.temp==='C'?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={() => setUnit(u => ({ ...u, temp: 'C' }))}>°C</button>
            <span className="mx-2">|</span>
            <button className={`px-2 py-1 rounded ${unit.pressure==='psig'?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={() => setUnit(u => ({ ...u, pressure: 'psig' }))}>psig</button>
            <button className={`px-2 py-1 rounded ${unit.pressure==='kPa'?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={() => setUnit(u => ({ ...u, pressure: 'kPa' }))}>kPa</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 p-4 rounded-lg bg-black/20 light:bg-gray-100 border border-white/10 light:border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <button className={`px-3 py-1 rounded ${inputMode==='temp'?'bg-emerald-600 text-white':'bg-white/10 border border-white/20 text-white'}`} onClick={() => setInputMode('temp')}>Input Temp</button>
            <button className={`px-3 py-1 rounded ${inputMode==='pressure'?'bg-emerald-600 text-white':'bg-white/10 border border-white/20 text-white'}`} onClick={() => setInputMode('pressure')}>Input Pressure</button>
          </div>
          {inputMode === 'temp' ? (
            <div>
              <label className="block text-sm text-blue-200 light:text-gray-600 mb-1">Temperature ({unit.temp})</label>
              <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white light:bg-white light:border-gray-300 light:text-gray-800" value={unit.temp==='F'?tempF:(((toNumber(tempF)-32)*5)/9).toFixed(1)} onChange={e => setTempF(unit.temp==='F'? e.target.value : (toNumber(e.target.value) * 9)/5 + 32)} placeholder={unit.temp==='F'?"e.g. 40":"e.g. 4.4"} />
            </div>
          ) : (
            <div>
              <label className="block text-sm text-blue-200 light:text-gray-600 mb-1">Pressure ({unit.pressure})</label>
              <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white light:bg-white light:border-gray-300 light:text-gray-800" value={unit.pressure==='psig'?psig:((toNumber(psig)+14.7)*6.89476).toFixed(0)} onChange={e => setPsig(unit.pressure==='psig'? e.target.value : (toNumber(e.target.value)/6.89476 - 14.7))} placeholder={unit.pressure==='psig'?"e.g. 120":"e.g. 930"} />
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-white/5">
              <div className="text-xs text-blue-200 light:text-gray-600">Saturation Temp</div>
              <div className="text-white light:text-gray-900 text-xl font-semibold">{formatNumber(displayTemp)} °{unit.temp}</div>
            </div>
            <div className="p-3 rounded bg-white/5">
              <div className="text-xs text-blue-200 light:text-gray-600">Saturation Pressure</div>
              <div className="text-white light:text-gray-900 text-xl font-semibold">{formatNumber(displayPressure, unit.pressure==='psig'?0:0)} {unit.pressure}</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-black/20 light:bg-gray-100 border border-white/10 light:border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-blue-200 light:text-gray-700">Quick Table ({refrigerants.find(r=>r.id===refrigerantId)?.name})</div>
            <div className="flex items-center gap-2 text-xs text-white light:text-gray-800">
              <span>Step:</span>
              <button className={`px-2 py-0.5 rounded ${stepF===20?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={()=>setStepF(20)}>20°F</button>
              <button className={`px-2 py-0.5 rounded ${stepF===10?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={()=>setStepF(10)}>10°F</button>
              <button className={`px-2 py-0.5 rounded ${stepF===5?'bg-blue-600 text-white':'bg-white/10 border border-white/20'}`} onClick={()=>setStepF(5)}>5°F</button>
            </div>
          </div>
          <div className="max-h-64 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-blue-200 light:text-gray-600">
                  <th className="py-1 pr-2">Temp (°F)</th>
                  <th className="py-1">Pressure (psig)</th>
                </tr>
              </thead>
              <tbody>
                {denseTable.map((row, idx) => (
                  <tr key={idx} className="text-white light:text-gray-900">
                    <td className="py-0.5 pr-2">{row.tF}</td>
                    <td className="py-0.5">{row.psig}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-blue-300 light:text-gray-600">Values approximated for MVP. Replace with validated tables.</div>
        </div>
      </div>
    </div>
  );
}


