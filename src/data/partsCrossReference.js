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
      },
      {
        oemPartNumber: 'CFM-100',
        oemName: 'Condenser Fan Motor',
        oemPrice: '$165.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'CFM-100-AM',
            name: 'Condenser Fan Motor (Aftermarket)',
            supplier: 'Motor Solutions',
            price: '$95.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: '115V 1/8HP, direct replacement'
          }
        ]
      },
      {
        oemPartNumber: 'WP-300',
        oemName: 'Water Pump',
        oemPrice: '$245.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'WP-300-AM',
            name: 'Recirculating Water Pump',
            supplier: 'PumpTech',
            price: '$180.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Same flow rate and pressure specs'
          }
        ]
      },
      {
        oemPartNumber: 'EVAP-500',
        oemName: 'Evaporator Assembly',
        oemPrice: '$875.00',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'EVAP-500-AM',
            name: 'Evaporator Assembly (Aftermarket)',
            supplier: 'Refrigeration Parts Co',
            price: '$650.00',
            compatibility: '95%',
            quality: 'Good',
            availability: 'Medium',
            stockingPriority: 'Medium',
            notes: 'May require minor modifications'
          }
        ]
      },
      {
        oemPartNumber: 'CTL-400',
        oemName: 'Cube Thickness Control',
        oemPrice: '$195.75',
        oemSupplier: 'Hoshizaki',
        aftermarket: [
          {
            partNumber: 'CTL-400-AM',
            name: 'Electronic Thickness Sensor',
            supplier: 'Sensor Solutions',
            price: '$125.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Enhanced accuracy, digital display'
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
      },
      {
        oemPartNumber: 'DS-300',
        oemName: 'Door Switch',
        oemPrice: '$65.00',
        oemSupplier: 'TurboChef',
        aftermarket: [
          {
            partNumber: 'DS-300-AM',
            name: 'Safety Door Switch',
            supplier: 'Switch Solutions',
            price: '$45.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Direct replacement for E32 error'
          }
        ]
      },
      {
        oemPartNumber: 'HE-400',
        oemName: 'Heating Element',
        oemPrice: '$180.00',
        oemSupplier: 'TurboChef',
        aftermarket: [
          {
            partNumber: 'HE-400-AM',
            name: 'High-Wattage Heating Element',
            supplier: 'Heating Solutions',
            price: '$135.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: '3000W, 208V, same specifications'
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
      },
      {
        oemPartNumber: 'GL-500',
        oemName: 'Glycol Lines',
        oemPrice: '$25.00/ft',
        oemSupplier: 'Perlick',
        aftermarket: [
          {
            partNumber: 'GL-500-AM',
            name: 'Food-Grade Glycol Lines',
            supplier: 'Line Solutions',
            price: '$18.00/ft',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Same specifications, food-grade material'
          }
        ]
      },
      {
        oemPartNumber: 'PS-150',
        oemName: 'Pressure Switch',
        oemPrice: '$95.00',
        oemSupplier: 'Perlick',
        aftermarket: [
          {
            partNumber: 'PS-150-AM',
            name: 'Pressure Switch (Aftermarket)',
            supplier: 'Pressure Solutions',
            price: '$65.00',
            compatibility: '100%',
            quality: 'Excellent',
            availability: 'High',
            stockingPriority: 'High',
            notes: 'Same pressure range, direct replacement'
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
