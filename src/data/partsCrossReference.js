// OEM vs Aftermarket parts cross-reference with stocking priority
export const partsCrossReference = {
  hoshizaki: {
    name: 'Hoshizaki Ice Makers',
    parts: [
      {
        oemPartNumber: 'WF-001',
        oemName: 'Water Filter',
        oemPrice: '$45.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'WF-001-AM',
            name: 'Water Filter (Aftermarket)',
            supplier: 'Generic Parts Co',
            price: '$28.00',
            compatibility: '95%',
            quality: 'Good',
            availability: 'High',
            stockingPriority: 'Medium',
            notes: 'Compatible with all KM series models'
          },
          {
            partNumber: 'WF-001-PREMIUM',
            name: 'Premium Water Filter',
            supplier: 'FilterMax',
            price: '$35.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'Medium',
            stockingPriority: 'High',
            notes: 'Superior filtration, longer life'
          }
        ]
      },
      {
        oemPartNumber: 'HS-500',
        oemName: 'Harvest Switch',
        oemPrice: '$125.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'HS-500-AM',
            name: 'Harvest Switch (Aftermarket)',
            supplier: 'Switch Solutions',
            price: '$75.00',
            compatibility: '90%',
            quality: 'Good',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'May require minor wiring adjustment'
          }
        ]
      },
      {
        oemPartNumber: 'WIV-200',
        oemName: 'Water Inlet Valve',
        oemPrice: '$89.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'WIV-200-AM',
            name: 'Water Inlet Valve (Aftermarket)',
            supplier: 'ValveTech',
            price: '$55.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Direct replacement, same specifications'
          }
        ]
      }
    ]
  },
  turbochef: {
    name: 'TurboChef Ovens',
    parts: [
      {
        oemPartNumber: 'TS-100',
        oemName: 'Temperature Sensor',
        oemPrice: '$95.00',
        oemSupplier: 'TurboChef',
        aftermarket: [
          {
            partNumber: 'TS-100-AM',
            name: 'RTD Temperature Sensor',
            supplier: 'SensorPro',
            price: '$65.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Same specifications as OEM'
          },
          {
            partNumber: 'TS-100-ECON',
            name: 'Economy Temperature Sensor',
            supplier: 'Budget Parts',
            price: '$45.00',
            compatibility: '85%',
            quality: 'Fair',
            availability: 'Medium',
            stockingPriority: 'Low',
            notes: 'May have shorter lifespan'
          }
        ]
      },
      {
        oemPartNumber: 'AS-200',
        oemName: 'Airflow Sensor',
        oemPrice: '$120.00',
        oemSupplier: 'TurboChef',
        aftermarket: [
          {
            partNumber: 'AS-200-AM',
            name: 'Airflow Sensor (Aftermarket)',
            supplier: 'AirFlow Solutions',
            price: '$85.00',
            compatibility: '95%',
            quality: 'Good',
            availability: 'High',
            stockingPriority: 'Medium',
            notes: 'May require calibration'
          }
        ]
      }
    ]
  },
  perlick: {
    name: 'Perlick Glycol Chillers',
    parts: [
      {
        oemPartNumber: 'GP-300',
        oemName: 'Glycol Pump',
        oemPrice: '$450.00',
        oemSupplier: 'Perlick',
        aftermarket: [
          {
            partNumber: 'GP-300-AM',
            name: 'Glycol Pump (Aftermarket)',
            supplier: 'Pump Solutions',
            price: '$320.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Same specifications, 2-year warranty'
          }
        ]
      },
      {
        oemPartNumber: 'T-100',
        oemName: 'Thermostat',
        oemPrice: '$75.00',
        oemSupplier: 'Perlick',
        aftermarket: [
          {
            partNumber: 'T-100-AM',
            name: 'Digital Thermostat',
            supplier: 'Control Systems Inc',
            price: '$45.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Enhanced features, better accuracy'
          }
        ]
      }
    ]
  }
};

export const stockingPriorities = {
  'Critical': {
    color: 'red',
    description: 'Always stock - critical for operations',
    minQuantity: 3
  },
  'High': {
    color: 'orange',
    description: 'Stock regularly - high usage',
    minQuantity: 2
  },
  'Medium': {
    color: 'yellow',
    description: 'Stock occasionally - moderate usage',
    minQuantity: 1
  },
  'Low': {
    color: 'green',
    description: 'Order as needed - low usage',
    minQuantity: 0
  }
};

export const qualityLevels = {
  'Excellent': { color: 'green', description: 'Same or better than OEM' },
  'Good': { color: 'blue', description: 'Reliable, minor differences' },
  'Fair': { color: 'yellow', description: 'Functional but may have limitations' },
  'Poor': { color: 'red', description: 'Not recommended' }
};

export function getCrossReferenceByBrand(brandId) {
  return partsCrossReference[brandId] || null;
}

export function getAllBrands() {
  return Object.keys(partsCrossReference);
}

export function searchParts(query) {
  const results = [];
  Object.entries(partsCrossReference).forEach(([brandId, brand]) => {
    brand.parts.forEach(part => {
      // Search OEM parts
      if (part.oemName.toLowerCase().includes(query.toLowerCase()) ||
          part.oemPartNumber.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'OEM',
          brand: brandId,
          part: part,
          match: 'oem'
        });
      }
      
      // Search aftermarket parts
      part.aftermarket.forEach(aftermarket => {
        if (aftermarket.name.toLowerCase().includes(query.toLowerCase()) ||
            aftermarket.partNumber.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            type: 'Aftermarket',
            brand: brandId,
            part: part,
            aftermarket: aftermarket,
            match: 'aftermarket'
          });
        }
      });
    });
  });
  return results;
}
