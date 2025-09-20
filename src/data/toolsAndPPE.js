// Tools and PPE requirements for different procedures
export const toolsAndPPE = {
  electrical: {
    name: 'Electrical Work',
    tools: [
      { name: 'Multimeter', type: 'meter', range: '0-1000V AC/DC', required: true, description: 'Voltage, current, resistance measurements' },
      { name: 'Clamp Meter', type: 'meter', range: '0-1000A AC', required: true, description: 'Current measurements without breaking circuit' },
      { name: 'Insulation Tester', type: 'meter', range: '0-1000V DC', required: false, description: 'Insulation resistance testing' },
      { name: 'Screwdriver Set', type: 'hand', range: 'N/A', required: true, description: 'Phillips, flat, Torx drivers' },
      { name: 'Wire Strippers', type: 'hand', range: 'N/A', required: true, description: '12-24 AWG stripping capability' },
      { name: 'Crimping Tool', type: 'hand', range: 'N/A', required: true, description: 'Terminal crimping tool' },
      { name: 'Electrical Tape', type: 'consumable', range: 'N/A', required: true, description: 'Insulation and marking tape' },
      { name: 'Wire Nuts', type: 'consumable', range: 'N/A', required: true, description: 'Various sizes for connections' }
    ],
    ppe: [
      { name: 'Safety Glasses', required: true, description: 'ANSI Z87.1 approved' },
      { name: 'Insulated Gloves', required: true, description: 'Class 00 (500V) minimum' },
      { name: 'Voltage Tester', required: true, description: 'Non-contact voltage detector' },
      { name: 'Hard Hat', required: false, description: 'When working overhead' },
      { name: 'Arc Flash Suit', required: false, description: 'For high voltage work' }
    ]
  },
  refrigeration: {
    name: 'Refrigeration Work',
    tools: [
      { name: 'Manifold Gauge Set', type: 'meter', range: '0-500 PSI', required: true, description: 'High/low side pressure readings' },
      { name: 'Digital Thermometer', type: 'meter', range: '-40°F to 500°F', required: true, description: 'Temperature measurements' },
      { name: 'Refrigerant Scale', type: 'meter', range: '0-100 lbs', required: true, description: 'Precise refrigerant weighing' },
      { name: 'Leak Detector', type: 'meter', range: 'N/A', required: true, description: 'Electronic or ultrasonic leak detection' },
      { name: 'Vacuum Pump', type: 'power', range: 'N/A', required: true, description: 'System evacuation' },
      { name: 'Recovery Machine', type: 'power', range: 'N/A', required: true, description: 'Refrigerant recovery' },
      { name: 'Tubing Cutter', type: 'hand', range: 'N/A', required: true, description: 'Clean copper tube cuts' },
      { name: 'Flaring Tool', type: 'hand', range: 'N/A', required: true, description: 'Tube flaring for connections' },
      { name: 'Swaging Tool', type: 'hand', range: 'N/A', required: true, description: 'Tube swaging for connections' },
      { name: 'Torch Set', type: 'hand', range: 'N/A', required: true, description: 'Brazing and soldering' }
    ],
    ppe: [
      { name: 'Safety Glasses', required: true, description: 'ANSI Z87.1 approved' },
      { name: 'Work Gloves', required: true, description: 'Cut-resistant for handling tools' },
      { name: 'Respirator', required: true, description: 'N95 minimum for refrigerant work' },
      { name: 'Apron', required: false, description: 'Protection from oils and chemicals' },
      { name: 'Face Shield', required: false, description: 'When brazing or using torch' }
    ]
  },
  plumbing: {
    name: 'Plumbing Work',
    tools: [
      { name: 'Pressure Gauge', type: 'meter', range: '0-200 PSI', required: true, description: 'Water pressure measurements' },
      { name: 'Flow Meter', type: 'meter', range: '0-50 GPM', required: false, description: 'Water flow rate measurements' },
      { name: 'Pipe Wrench Set', type: 'hand', range: 'N/A', required: true, description: '8", 10", 12", 14" wrenches' },
      { name: 'Basin Wrench', type: 'hand', range: 'N/A', required: true, description: 'Faucet installation/removal' },
      { name: 'Pipe Cutter', type: 'hand', range: 'N/A', required: true, description: 'Clean pipe cuts' },
      { name: 'Tubing Bender', type: 'hand', range: 'N/A', required: true, description: 'Copper tube bending' },
      { name: 'Teflon Tape', type: 'consumable', range: 'N/A', required: true, description: 'Thread sealing tape' },
      { name: 'Pipe Dope', type: 'consumable', range: 'N/A', required: true, description: 'Thread compound' }
    ],
    ppe: [
      { name: 'Safety Glasses', required: true, description: 'ANSI Z87.1 approved' },
      { name: 'Work Gloves', required: true, description: 'Waterproof and cut-resistant' },
      { name: 'Knee Pads', required: true, description: 'Protection when working low' },
      { name: 'Waterproof Apron', required: false, description: 'Protection from water and chemicals' }
    ]
  },
  mechanical: {
    name: 'Mechanical Work',
    tools: [
      { name: 'Torque Wrench', type: 'hand', range: '10-200 ft-lbs', required: true, description: 'Precise torque application' },
      { name: 'Socket Set', type: 'hand', range: 'N/A', required: true, description: 'Metric and SAE sockets' },
      { name: 'Wrench Set', type: 'hand', range: 'N/A', required: true, description: 'Open-end and box-end wrenches' },
      { name: 'Allen Wrench Set', type: 'hand', range: 'N/A', required: true, description: 'Metric and SAE hex keys' },
      { name: 'Pry Bar Set', type: 'hand', range: 'N/A', required: true, description: 'Leverage and prying tools' },
      { name: 'Hammer Set', type: 'hand', range: 'N/A', required: true, description: 'Ball peen, dead blow, rubber' },
      { name: 'Punch Set', type: 'hand', range: 'N/A', required: true, description: 'Center, drift, pin punches' },
      { name: 'File Set', type: 'hand', range: 'N/A', required: true, description: 'Flat, round, half-round files' }
    ],
    ppe: [
      { name: 'Safety Glasses', required: true, description: 'ANSI Z87.1 approved' },
      { name: 'Work Gloves', required: true, description: 'Cut-resistant and impact protection' },
      { name: 'Steel Toe Boots', required: true, description: 'ANSI Z41 approved' },
      { name: 'Hard Hat', required: false, description: 'When working overhead' },
      { name: 'Hearing Protection', required: false, description: 'When using power tools' }
    ]
  },
  diagnostics: {
    name: 'Diagnostics & Testing',
    tools: [
      { name: 'Multimeter', type: 'meter', range: '0-1000V AC/DC', required: true, description: 'Voltage, current, resistance' },
      { name: 'Clamp Meter', type: 'meter', range: '0-1000A AC', required: true, description: 'Current measurements' },
      { name: 'Temperature Probe', type: 'meter', range: '-40°F to 500°F', required: true, description: 'Surface and air temperature' },
      { name: 'Pressure Gauge', type: 'meter', range: '0-500 PSI', required: true, description: 'Pressure measurements' },
      { name: 'Flow Meter', type: 'meter', range: '0-50 GPM', required: false, description: 'Flow rate measurements' },
      { name: 'Oscilloscope', type: 'meter', range: 'N/A', required: false, description: 'Signal analysis' },
      { name: 'Logic Probe', type: 'meter', range: 'N/A', required: false, description: 'Digital signal testing' },
      { name: 'Megohmmeter', type: 'meter', range: '0-1000V DC', required: false, description: 'Insulation resistance' }
    ],
    ppe: [
      { name: 'Safety Glasses', required: true, description: 'ANSI Z87.1 approved' },
      { name: 'Work Gloves', required: true, description: 'Protection during testing' },
      { name: 'Insulated Gloves', required: false, description: 'For electrical testing' },
      { name: 'Lab Coat', required: false, description: 'Protection from chemicals' }
    ]
  }
};

export const procedures = [
  {
    id: 'hoshizaki-commissioning',
    name: 'Hoshizaki Ice Maker Commissioning',
    category: 'refrigeration',
    tools: ['multimeter', 'manifold-gauge', 'digital-thermometer', 'pressure-gauge', 'leak-detector'],
    ppe: ['safety-glasses', 'work-gloves', 'respirator'],
    estimatedTime: '2-3 hours',
    difficulty: 'intermediate'
  },
  {
    id: 'turbochef-sensor-replacement',
    name: 'TurboChef Temperature Sensor Replacement',
    category: 'electrical',
    tools: ['multimeter', 'screwdriver-set', 'wire-strippers', 'crimping-tool'],
    ppe: ['safety-glasses', 'insulated-gloves'],
    estimatedTime: '1-2 hours',
    difficulty: 'beginner'
  },
  {
    id: 'perlick-glycol-service',
    name: 'Perlick Glycol System Service',
    category: 'refrigeration',
    tools: ['manifold-gauge', 'digital-thermometer', 'pressure-gauge', 'vacuum-pump', 'recovery-machine'],
    ppe: ['safety-glasses', 'work-gloves', 'respirator', 'apron'],
    estimatedTime: '3-4 hours',
    difficulty: 'advanced'
  },
  {
    id: 'water-line-installation',
    name: 'Water Line Installation',
    category: 'plumbing',
    tools: ['pressure-gauge', 'pipe-wrench-set', 'pipe-cutter', 'tubing-bender'],
    ppe: ['safety-glasses', 'work-gloves', 'knee-pads'],
    estimatedTime: '2-3 hours',
    difficulty: 'intermediate'
  },
  {
    id: 'compressor-replacement',
    name: 'Compressor Replacement',
    category: 'mechanical',
    tools: ['torque-wrench', 'socket-set', 'wrench-set', 'pry-bar-set', 'manifold-gauge'],
    ppe: ['safety-glasses', 'work-gloves', 'steel-toe-boots', 'hard-hat'],
    estimatedTime: '4-6 hours',
    difficulty: 'advanced'
  }
];

export function getToolsByCategory(category) {
  return toolsAndPPE[category] || null;
}

export function getProcedureById(procedureId) {
  return procedures.find(p => p.id === procedureId) || null;
}

export function getAllProcedures() {
  return procedures;
}
