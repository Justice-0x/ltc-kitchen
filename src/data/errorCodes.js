// Aggregated error codes across brands. Extend as needed.
export const errorCodes = [
  // TurboChef
  { brand: 'TurboChef', code: 'E05', description: 'Temperature sensor issue', fix: 'Check probe & fan', path: '/turbochef' },
  { brand: 'TurboChef', code: 'E18', description: 'Restricted airflow', fix: 'Clean filters', path: '/turbochef' },
  { brand: 'TurboChef', code: 'E32', description: 'Door switch problem', fix: 'Adjust latch', path: '/turbochef' },
  { brand: 'TurboChef', code: 'E40', description: 'Heating element fault', fix: 'Check element continuity', path: '/turbochef' },
  { brand: 'TurboChef', code: 'E55', description: 'Control board error', fix: 'Reset or replace board', path: '/turbochef' },
  // Hoshizaki (examples)
  { brand: 'Hoshizaki', code: 'E1', description: 'High temperature alarm', fix: 'Clean condenser; check airflow', path: '/hoshizaki' },
  { brand: 'Hoshizaki', code: 'E2', description: 'Long harvest', fix: 'Check water supply, hot gas valve', path: '/hoshizaki' },
  // Perlick (examples)
  { brand: 'Perlick', code: 'LP', description: 'Low pressure', fix: 'Check charge; leaks; coil cleanliness', path: '/perlick' },
  { brand: 'Perlick', code: 'HP', description: 'High pressure', fix: 'Clean condenser; fans; ambient', path: '/perlick' },
  // Southbend (examples)
  { brand: 'Southbend', code: 'IGN', description: 'Ignition failure', fix: 'Pilot, thermocouple, gas pressure', path: '/southbend' },
  
  // KE2 Therm Controls
  { brand: 'KE2 Therm', code: 'E01', description: 'Temperature sensor fault', fix: 'Check sensor wiring, replace if needed', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E02', description: 'Communication error', fix: 'Check RS-485 wiring, verify connections', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E03', description: 'Defrost timer fault', fix: 'Reset timer, check programming', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E04', description: 'Display error', fix: 'Check power supply, replace display board', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E05', description: 'Network connectivity lost', fix: 'Check antenna, verify SIM card', path: '/ke2-therm-monitoring' },
  { brand: 'KE2 Therm', code: 'E06', description: 'Calibration required', fix: 'Perform sensor calibration procedure', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E07', description: 'Heater element fault', fix: 'Check heater continuity, replace element', path: '/ke2-therm-controls' },
  { brand: 'KE2 Therm', code: 'E08', description: 'Power supply low', fix: 'Check 24V supply, verify transformer', path: '/ke2-therm-controls' },
  
  // Resort Refrigeration
  { brand: 'Resort Refrigeration', code: 'R01', description: 'Door ajar alarm', fix: 'Check door seal, verify closure', path: '/resort-refrigeration' },
  { brand: 'Resort Refrigeration', code: 'R02', description: 'High temperature alarm', fix: 'Check compressor, verify refrigerant', path: '/resort-refrigeration' },
  { brand: 'Resort Refrigeration', code: 'R03', description: 'Low temperature alarm', fix: 'Check defrost cycle, verify sensor', path: '/resort-refrigeration' },
  { brand: 'Resort Refrigeration', code: 'R04', description: 'Energy consumption high', fix: 'Check defrost settings, clean coils', path: '/resort-refrigeration' },
  { brand: 'Resort Refrigeration', code: 'R05', description: 'Guest area temperature fluctuation', fix: 'Check insulation, door seals', path: '/resort-refrigeration' },
  { brand: 'Resort Refrigeration', code: 'R06', description: 'Compressor short cycle', fix: 'Check pressure switches, refrigerant level', path: '/resort-refrigeration' },
  
  // Laundry Equipment
  { brand: 'Laundry', code: 'L01', description: 'Machine not spinning', fix: 'Check belt tension, motor operation', path: '/laundry' },
  { brand: 'Laundry', code: 'L02', description: 'Water not draining', fix: 'Check pump, drain valve operation', path: '/laundry' },
  { brand: 'Laundry', code: 'L03', description: 'Door lock fault', fix: 'Check door switch, lock mechanism', path: '/laundry' },
  { brand: 'Laundry', code: 'L04', description: 'Water level sensor error', fix: 'Clean sensor, check wiring', path: '/laundry' },
  
  // Walk-in Coolers
  { brand: 'Walk-in Coolers', code: 'W01', description: 'Temperature not maintaining', fix: 'Check refrigerant, compressor operation', path: '/walk-ins' },
  { brand: 'Walk-in Coolers', code: 'W02', description: 'Door not sealing', fix: 'Check gasket, hinge alignment', path: '/walk-ins' },
  { brand: 'Walk-in Coolers', code: 'W03', description: 'Condenser fan fault', fix: 'Check fan motor, wiring', path: '/walk-ins' },
  { brand: 'Walk-in Coolers', code: 'W04', description: 'Defrost cycle failure', fix: 'Check timer, heater elements', path: '/walk-ins' },
  
  // Dishwashers
  { brand: 'Dishwashers', code: 'D01', description: 'Dishes not clean', fix: 'Check water temp, spray arms', path: '/dishwashers' },
  { brand: 'Dishwashers', code: 'D02', description: 'Not draining', fix: 'Clean filters, check drain pump', path: '/dishwashers' },
  { brand: 'Dishwashers', code: 'D03', description: 'Detergent not dispensing', fix: 'Check detergent pump, dispenser', path: '/dishwashers' },
  { brand: 'Dishwashers', code: 'D04', description: 'Water heater fault', fix: 'Check heater element, thermostat', path: '/dishwashers' }
];

export const brands = ['TurboChef', 'Hoshizaki', 'Perlick', 'Southbend', 'KE2 Therm', 'Resort Refrigeration', 'Laundry', 'Walk-in Coolers', 'Dishwashers'];


