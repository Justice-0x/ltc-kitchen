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
];

export const brands = ['TurboChef', 'Hoshizaki', 'Perlick', 'Southbend'];


