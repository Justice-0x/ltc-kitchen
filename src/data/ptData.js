// Refrigerant PT data (condensed). Temps in °F, pressure in psig at sea level.
// Values sampled; interpolate linearly between points. Expand over time.

export const refrigerants = [
  { id: 'R22', name: 'R-22' },
  { id: 'R134a', name: 'R-134a' },
  { id: 'R404A', name: 'R-404A' },
  { id: 'R407C', name: 'R-407C' },
  { id: 'R410A', name: 'R-410A' },
  { id: 'R448A', name: 'R-448A' },
  { id: 'R449A', name: 'R-449A' },
  { id: 'R507A', name: 'R-507A' },
  { id: 'R32', name: 'R-32' },
  { id: 'R454B', name: 'R-454B' },
  { id: 'R290', name: 'R-290 (Propane)' },
  { id: 'R600a', name: 'R-600a (Isobutane)' },
  { id: 'R513A', name: 'R-513A' },
  { id: 'R452A', name: 'R-452A' },
  { id: 'R1234yf', name: 'R-1234yf' },
  { id: 'R1234ze', name: 'R-1234ze' },
  { id: 'R717', name: 'R-717 (Ammonia)' },
];

// Minimal tables for MVP. Each: array of { tF, psig }
// Data approximated for demo; replace with validated tables as needed.
export const ptTables = {
  R22: [
    { tF: -40, psig: 4 }, { tF: -20, psig: 16 }, { tF: 0, psig: 34 }, { tF: 20, psig: 57 }, { tF: 40, psig: 87 }, { tF: 60, psig: 126 }, { tF: 80, psig: 176 }, { tF: 100, psig: 240 } 
  ],
  R134a: [
    { tF: -40, psig: 0 }, { tF: -20, psig: 7 }, { tF: 0, psig: 14 }, { tF: 20, psig: 24 }, { tF: 40, psig: 35 }, { tF: 60, psig: 49 }, { tF: 80, psig: 68 }, { tF: 100, psig: 93 }
  ],
  R404A: [
    { tF: -40, psig: 6 }, { tF: -20, psig: 18 }, { tF: 0, psig: 33 }, { tF: 20, psig: 53 }, { tF: 40, psig: 79 }, { tF: 60, psig: 114 }, { tF: 80, psig: 159 }, { tF: 100, psig: 217 }
  ],
  R407C: [
    { tF: -40, psig: 2 }, { tF: -20, psig: 12 }, { tF: 0, psig: 28 }, { tF: 20, psig: 48 }, { tF: 40, psig: 74 }, { tF: 60, psig: 108 }, { tF: 80, psig: 152 }, { tF: 100, psig: 209 }
  ],
  R410A: [
    { tF: -40, psig: 13 }, { tF: -20, psig: 32 }, { tF: 0, psig: 65 }, { tF: 20, psig: 110 }, { tF: 40, psig: 172 }, { tF: 60, psig: 257 }, { tF: 80, psig: 370 }, { tF: 100, psig: 520 }
  ],
  R448A: [
    { tF: -40, psig: 8 }, { tF: -20, psig: 21 }, { tF: 0, psig: 38 }, { tF: 20, psig: 60 }, { tF: 40, psig: 90 }, { tF: 60, psig: 130 }, { tF: 80, psig: 183 }, { tF: 100, psig: 251 }
  ],
  R449A: [
    { tF: -40, psig: 7 }, { tF: -20, psig: 19 }, { tF: 0, psig: 35 }, { tF: 20, psig: 56 }, { tF: 40, psig: 85 }, { tF: 60, psig: 125 }, { tF: 80, psig: 176 }, { tF: 100, psig: 242 }
  ],
  R507A: [
    { tF: -40, psig: 10 }, { tF: -20, psig: 23 }, { tF: 0, psig: 40 }, { tF: 20, psig: 62 }, { tF: 40, psig: 92 }, { tF: 60, psig: 133 }, { tF: 80, psig: 187 }, { tF: 100, psig: 256 }
  ],
  R32: [
    { tF: -40, psig: 24 }, { tF: -20, psig: 50 }, { tF: 0, psig: 90 }, { tF: 20, psig: 145 }, { tF: 40, psig: 221 }, { tF: 60, psig: 323 }, { tF: 80, psig: 460 }, { tF: 100, psig: 640 }
  ],
  R454B: [
    { tF: -40, psig: 9 }, { tF: -20, psig: 27 }, { tF: 0, psig: 56 }, { tF: 20, psig: 98 }, { tF: 40, psig: 157 }, { tF: 60, psig: 238 }, { tF: 80, psig: 347 }, { tF: 100, psig: 493 }
  ],
  R290: [
    { tF: -40, psig: 2 }, { tF: -20, psig: 8 }, { tF: 0, psig: 18 }, { tF: 20, psig: 33 }, { tF: 40, psig: 54 }, { tF: 60, psig: 82 }, { tF: 80, psig: 120 }, { tF: 100, psig: 170 }
  ],
  R600a: [
    { tF: -40, psig: -2 }, { tF: -20, psig: 2 }, { tF: 0, psig: 7 }, { tF: 20, psig: 13 }, { tF: 40, psig: 21 }, { tF: 60, psig: 32 }, { tF: 80, psig: 47 }, { tF: 100, psig: 67 }
  ],
  R513A: [
    { tF: -40, psig: 1 }, { tF: -20, psig: 7 }, { tF: 0, psig: 16 }, { tF: 20, psig: 28 }, { tF: 40, psig: 44 }, { tF: 60, psig: 66 }, { tF: 80, psig: 95 }, { tF: 100, psig: 133 }
  ],
  R452A: [
    { tF: -40, psig: 8 }, { tF: -20, psig: 21 }, { tF: 0, psig: 38 }, { tF: 20, psig: 60 }, { tF: 40, psig: 90 }, { tF: 60, psig: 132 }, { tF: 80, psig: 186 }, { tF: 100, psig: 256 }
  ],
  R1234yf: [
    { tF: -40, psig: 0 }, { tF: -20, psig: 5 }, { tF: 0, psig: 11 }, { tF: 20, psig: 19 }, { tF: 40, psig: 29 }, { tF: 60, psig: 42 }, { tF: 80, psig: 59 }, { tF: 100, psig: 81 }
  ],
  R1234ze: [
    { tF: -40, psig: -3 }, { tF: -20, psig: 0 }, { tF: 0, psig: 3 }, { tF: 20, psig: 7 }, { tF: 40, psig: 12 }, { tF: 60, psig: 19 }, { tF: 80, psig: 28 }, { tF: 100, psig: 40 }
  ],
  R717: [
    { tF: -40, psig: -13 }, { tF: -20, psig: -6 }, { tF: 0, psig: 3 }, { tF: 20, psig: 15 }, { tF: 40, psig: 30 }, { tF: 60, psig: 49 }, { tF: 80, psig: 72 }, { tF: 100, psig: 100 }
  ],
};

export function interpolatePsig(refrigerantId, tF) {
  const table = ptTables[refrigerantId];
  if (!table || table.length === 0) return null;
  if (tF <= table[0].tF) return table[0].psig;
  if (tF >= table[table.length - 1].tF) return table[table.length - 1].psig;
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (tF >= a.tF && tF <= b.tF) {
      const ratio = (tF - a.tF) / (b.tF - a.tF);
      return a.psig + ratio * (b.psig - a.psig);
    }
  }
  return null;
}

export function interpolateTempF(refrigerantId, psig) {
  const table = ptTables[refrigerantId];
  if (!table || table.length === 0) return null;
  if (psig <= table[0].psig) return table[0].tF;
  if (psig >= table[table.length - 1].psig) return table[table.length - 1].tF;
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (psig >= a.psig && psig <= b.psig) {
      const ratio = (psig - a.psig) / (b.psig - a.psig);
      return a.tF + ratio * (b.tF - a.tF);
    }
  }
  return null;
}


