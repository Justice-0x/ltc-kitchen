import React, { useMemo, useState } from 'react';

const defaultChecks = [
  { id: 'elec_voltage', label: 'Electrical: Line-to-line voltage within spec', note: 'Record L1-L2, L2-L3, L1-L3' },
  { id: 'elec_ground', label: 'Electrical: Proper grounding verified', note: 'Bonding/ground continuity' },
  { id: 'water_pressure', label: 'Water: Inlet pressure within spec', note: 'Record PSI' },
  { id: 'water_quality', label: 'Water: TDS/Hardness within spec', note: 'Record ppm / gpg' },
  { id: 'refrig_pressures', label: 'Refrigeration: Operating pressures nominal', note: 'High/Low PSI' },
  { id: 'superheat_subcool', label: 'Refrigeration: Superheat/Subcool within range', note: 'Record °F' },
  { id: 'sensors', label: 'Controls: Sensors and switches test passed', note: 'Temp/level/pressure/flow' },
  { id: 'leaks', label: 'Visual: No leaks (water/refrigerant/glycol)', note: 'Dry fittings, no oil residue' },
  { id: 'airflow', label: 'Airflow/Condenser: Clean and unobstructed', note: 'Coils cleaned, clearances ok' },
  { id: 'commission_run', label: 'Run test: Startup/harvest/idle sequence verified', note: 'Record cycle time' },
  { id: 'docs', label: 'Docs: Manual/labels accessible; QR tested', note: 'QR deep-link opens correct model' },
];

export default function CommissioningChecklist() {
  const [checks, setChecks] = useState(() => defaultChecks.map(c => ({ ...c, ok: false, value: '' })));
  const [meta, setMeta] = useState({ site: '', unitModel: '', unitSerial: '', tech: '', date: new Date().toISOString().slice(0, 10) });

  const completed = useMemo(() => checks.filter(c => c.ok).length, [checks]);

  const handleCheck = (id) => {
    setChecks(prev => prev.map(c => (c.id === id ? { ...c, ok: !c.ok } : c)));
  };

  const handleValue = (id, v) => {
    setChecks(prev => prev.map(c => (c.id === id ? { ...c, value: v } : c)));
  };

  const handlePrint = () => {
    window.print();
  };

  const exportJSON = () => {
    const payload = { meta, checks, completedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commissioning-${meta.unitModel || 'unit'}-${meta.unitSerial || 'serial'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 dark:bg-white/10 light:bg-white/80 spooky:bg-gray-800/80 backdrop-blur-md border border-white/20 light:border-gray-200/50 spooky:border-orange-500/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white light:text-gray-800 spooky:text-orange-300">Commissioning Checklist</h2>
        <div className="text-sm text-blue-200 light:text-gray-600">{completed}/{checks.length} complete</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Site / Location" value={meta.site} onChange={e => setMeta({ ...meta, site: e.target.value })} />
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Unit Model" value={meta.unitModel} onChange={e => setMeta({ ...meta, unitModel: e.target.value })} />
        <input className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Unit Serial" value={meta.unitSerial} onChange={e => setMeta({ ...meta, unitSerial: e.target.value })} />
        <div className="flex gap-2">
          <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Technician" value={meta.tech} onChange={e => setMeta({ ...meta, tech: e.target.value })} />
          <input type="date" className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-300 light:bg-white light:border-gray-300 light:text-gray-800" value={meta.date} onChange={e => setMeta({ ...meta, date: e.target.value })} />
        </div>
      </div>

      <div className="space-y-3">
        {checks.map(item => (
          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/10 light:border-gray-200/60 bg-white/5 light:bg-white">
            <input type="checkbox" className="mt-1 w-5 h-5 accent-emerald-500" checked={item.ok} onChange={() => handleCheck(item.id)} />
            <div className="flex-1">
              <div className="text-white light:text-gray-900 font-medium">{item.label}</div>
              <div className="text-xs text-blue-200 light:text-gray-600">{item.note}</div>
              <input className="mt-2 w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 light:bg-white light:border-gray-300 light:text-gray-800" placeholder="Notes / readings" value={item.value} onChange={e => handleValue(item.id, e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">🖨️ Print</button>
        <button onClick={exportJSON} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white">💾 Export JSON</button>
      </div>
    </div>
  );
}


