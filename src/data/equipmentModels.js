// Equipment models with brand-specific overrides
export const equipmentModels = {
  hoshizaki: {
    name: 'Hoshizaki Ice Makers',
    models: [
      {
        id: 'KM-500MAH',
        name: 'KM-500MAH',
        description: '500 lb/day ice production',
        specs: {
          capacity: '500 lbs/day',
          power: '115V, 60Hz, 2.5A',
          waterPressure: '20-80 PSI',
          temperature: '50-100°F ambient',
          dimensions: '24" W x 30" D x 33" H'
        },
        wiring: {
        },
        parts: [
          { name: 'Water Filter', partNumber: 'WF-001', price: '$45' },
          { name: 'Harvest Switch', partNumber: 'HS-500', price: '$125' },
          { name: 'Water Inlet Valve', partNumber: 'WIV-200', price: '$89' }
        ]
      },
      {
        id: 'KM-300MAH',
        name: 'KM-300MAH',
        description: '300 lb/day ice production',
        specs: {
          capacity: '300 lbs/day',
          power: '115V, 60Hz, 2.0A',
          waterPressure: '20-80 PSI',
          temperature: '50-100°F ambient',
          dimensions: '20" W x 28" D x 31" H'
        },
        parts: [
          { name: 'Water Filter', partNumber: 'WF-001', price: '$45' },
          { name: 'Harvest Switch', partNumber: 'HS-300', price: '$95' },
          { name: 'Water Inlet Valve', partNumber: 'WIV-150', price: '$75' }
        ]
      }
    ]
  },
  turbochef: {
    name: 'TurboChef Ovens',
    models: [
      {
        id: 'Tornado-2',
        name: 'Tornado 2',
        description: 'High-speed convection oven',
        specs: {
          power: '208V, 60Hz, 20A',
          temperature: 'Up to 500°F',
          cookTime: '90 seconds average',
          capacity: '12-15 sandwiches per hour',
          dimensions: '24" W x 30" D x 36" H'
        },
        parts: [
          { name: 'Temperature Sensor', partNumber: 'TS-100', price: '$95' },
          { name: 'Airflow Sensor', partNumber: 'AS-200', price: '$120' },
          { name: 'Door Switch', partNumber: 'DS-300', price: '$65' }
        ]
      },
      {
        id: 'Tornado-3',
        name: 'Tornado 3',
        description: 'Enhanced speed oven',
        specs: {
          power: '208V, 60Hz, 25A',
          temperature: 'Up to 550°F',
          cookTime: '75 seconds average',
          capacity: '15-18 sandwiches per hour',
          dimensions: '26" W x 32" D x 38" H'
        },
        parts: [
          { name: 'Temperature Sensor', partNumber: 'TS-200', price: '$110' },
          { name: 'Airflow Sensor', partNumber: 'AS-300', price: '$135' },
          { name: 'Door Switch', partNumber: 'DS-400', price: '$75' }
        ]
      }
    ]
  },
  perlick: {
    name: 'Perlick Glycol Chillers',
    models: [
      {
        id: 'PC-2000',
        name: 'PC-2000',
        description: '2000 BTU cooling capacity',
        specs: {
          capacity: '2000 BTU cooling capacity',
          power: '115V, 60Hz, 8A',
          glycolType: 'Food-grade propylene glycol',
          temperature: '32-40°F output',
          dimensions: '18" W x 24" D x 30" H'
        },
        parts: [
          { name: 'Glycol Pump', partNumber: 'GP-300', price: '$450' },
          { name: 'Thermostat', partNumber: 'T-100', price: '$75' },
          { name: 'Glycol Lines', partNumber: 'GL-500', price: '$25/ft' }
        ]
      }
    ]
  }
};

export function getModelsByBrand(brandId) {
  return equipmentModels[brandId]?.models || [];
}

export function getModelById(brandId, modelId) {
  const brand = equipmentModels[brandId];
  if (!brand) return null;
  return brand.models.find(m => m.id === modelId) || null;
}
