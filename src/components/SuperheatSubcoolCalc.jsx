import React, { useMemo, useState } from 'react';

function toNumber(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export default function SuperheatSubcoolCalc() {
  const [inputs, setInputs] = useState({
    suctionLineTempF: '',
    evapSaturationTempF: '',
    liquidLineTempF: '',
    condenseSaturationTempF: '',
  });

  const superheat = useMemo(() => {
    const t1 = toNumber(inputs.suctionLineTempF);
    const t2 = toNumber(inputs.evapSaturationTempF);
    return t1 && t2 ? (t1 - t2) : 0;
  }, [inputs]);

  const subcool = useMemo(() => {
    const t1 = toNumber(inputs.condenseSaturationTempF);
    const t2 = toNumber(inputs.liquidLineTempF);
    return t1 && t2 ? (t1 - t2) : 0;
  }, [inputs]);

  const reset = () => setInputs({ suctionLineTempF: '', evapSaturationTempF: '', liquidLineTempF: '', condenseSaturationTempF: '' });

  const badge = (value, low, high) => {
    if (!Number.isFinite(value)) return null;
    if (value < low) return <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs">Low</span>;
    if (value > high) return <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs">High</span>;
    return <span className="ml-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-xs">OK</span>;
  };

  return (
    <div className="max-w-xl mx-auto bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white light:text-gray-800 spooky:text-orange-300 mb-4">Superheat / Subcool Calculator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-blue-200 light:text-gray-600">Suction Line Temperature (°F)</label>
          <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-800" value={inputs.suctionLineTempF} onChange={e => setInputs({ ...inputs, suctionLineTempF: e.target.value })} placeholder="e.g. 55" />
        </div>
        <div>
          <label className="text-sm text-blue-200 light:text-gray-600">Evaporator Saturation Temp (°F)</label>
          <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-800" value={inputs.evapSaturationTempF} onChange={e => setInputs({ ...inputs, evapSaturationTempF: e.target.value })} placeholder="e.g. 40" />
        </div>
        <div>
          <label className="text-sm text-blue-200 light:text-gray-600">Liquid Line Temperature (°F)</label>
          <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-800" value={inputs.liquidLineTempF} onChange={e => setInputs({ ...inputs, liquidLineTempF: e.target.value })} placeholder="e.g. 95" />
        </div>
        <div>
          <label className="text-sm text-blue-200 light:text-gray-600">Condensing Saturation Temp (°F)</label>
          <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-800" value={inputs.condenseSaturationTempF} onChange={e => setInputs({ ...inputs, condenseSaturationTempF: e.target.value })} placeholder="e.g. 110" />
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg bg-black/20 light:bg-gray-100 border border-white/10 light:border-gray-200">
        <div className="text-white light:text-gray-900">Superheat: <span className="font-semibold">{superheat.toFixed(1)}°F</span> {badge(superheat, 8, 14)}</div>
        <div className="text-white light:text-gray-900">Subcool: <span className="font-semibold">{subcool.toFixed(1)}°F</span> {badge(subcool, 8, 14)}</div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={reset} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">Reset</button>
      </div>
    </div>
  );
}


