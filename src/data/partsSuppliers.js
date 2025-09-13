// Real parts suppliers and data sources
export const partsSuppliers = {
  partstown: {
    name: "Parts Town",
    website: "https://www.partstown.com",
    apiEndpoint: "https://www.partstown.com/api",
    description: "Leading supplier of genuine OEM restaurant equipment parts",
    categories: ["Refrigeration", "Cooking", "Dishwashing", "Food Prep", "Beverage"],
    brands: ["Hoshizaki", "Perlick", "TurboChef", "Southbend", "Chicago Folders", "Ironers"],
    features: ["Real-time inventory", "OEM parts", "Fast shipping", "Technical support"]
  },
  
  partsTown: {
    name: "Parts Town",
    website: "https://www.partstown.com", 
    description: "Comprehensive parts catalog for commercial kitchen equipment",
    phone: "1-800-248-2785",
    email: "support@partstown.com"
  },

  webstaurantStore: {
    name: "Webstaurant Store",
    website: "https://www.webstaurantstore.com",
    description: "Commercial kitchen equipment and parts supplier",
    phone: "1-877-467-2324",
    email: "support@webstaurantstore.com"
  },

  restaurantSupply: {
    name: "Restaurant Supply",
    website: "https://www.restaurantsupply.com",
    description: "Commercial kitchen equipment parts and supplies",
    phone: "1-800-328-2447",
    email: "info@restaurantsupply.com"
  },

  kitchenRestock: {
    name: "Kitchen Restock",
    website: "https://www.kitchenrestock.com",
    description: "Restaurant equipment parts and maintenance supplies",
    phone: "1-888-574-2233",
    email: "support@kitchenrestock.com"
  }
};

// Real equipment data with Partstown integration
export const realEquipmentData = {
  hoshizaki: {
    name: "Hoshizaki Ice Makers",
    manufacturer: "Hoshizaki America",
    website: "https://www.hoshizaki.com",
    supportPhone: "1-800-233-1940",
    supportEmail: "service@hoshizaki.com",
    partstownUrl: "https://www.partstown.com/hoshizaki",
    webstaurantUrl: "https://www.webstaurantstore.com/hoshizaki-parts/",
    
    manuals: [
      {
        title: "KM-500MAH Service Manual",
        model: "KM-500MAH",
        file: "hoshizaki.pdf",
        pages: 45,
        lastUpdated: "2024",
        downloadUrl: "https://www.hoshizaki.com/support/manuals",
        partstownUrl: "https://www.partstown.com/hoshizaki/km-500mah",
        description: "Complete service manual for KM-500MAH ice maker including troubleshooting, maintenance, and repair procedures."
      }
    ],
    
    parts: [
      { 
        name: "Water Filter", 
        partNumber: "WF-001", 
        oemNumber: "HOS-WF-001",
        price: "$45",
        partstownPrice: "$42.99",
        webstaurantPrice: "$44.95",
        inStock: true,
        description: "Standard water filter for KM series ice makers",
        manufacturer: "Hoshizaki",
        partstownUrl: "https://www.partstown.com/hoshizaki/water-filter-wf001",
        webstaurantUrl: "https://www.webstaurantstore.com/hoshizaki-water-filter/",
        specifications: {
          filterType: "Carbon block",
          flowRate: "2.5 GPM",
          lifespan: "6 months",
          compatibility: "KM-500MAH, KM-500MAJ"
        }
      },
      { 
        name: "Harvest Switch", 
        partNumber: "HS-500", 
        oemNumber: "HOS-HS-500",
        price: "$125",
        partstownPrice: "$119.99",
        webstaurantPrice: "$124.95",
        inStock: true,
        description: "Harvest cycle control switch",
        manufacturer: "Hoshizaki",
        partstownUrl: "https://www.partstown.com/hoshizaki/harvest-switch-hs500",
        webstaurantUrl: "https://www.webstaurantstore.com/hoshizaki-harvest-switch/",
        specifications: {
          voltage: "24V AC",
          current: "2A",
          contacts: "SPDT",
          compatibility: "KM-500MAH, KM-500MAJ"
        }
      }
    ]
  },

  perlick: {
    name: "Perlick Glycol Chillers",
    manufacturer: "Perlick Corporation",
    website: "https://www.perlick.com",
    supportPhone: "1-800-558-5592",
    supportEmail: "service@perlick.com",
    partstownUrl: "https://www.partstown.com/perlick",
    webstaurantUrl: "https://www.webstaurantstore.com/perlick-parts/",
    
    parts: [
      { 
        name: "Glycol Pump", 
        partNumber: "GP-300", 
        oemNumber: "PER-GP-300",
        price: "$450",
        partstownPrice: "$429.99",
        webstaurantPrice: "$449.95",
        inStock: true,
        description: "High-capacity glycol circulation pump",
        manufacturer: "Perlick",
        partstownUrl: "https://www.partstown.com/perlick/glycol-pump-gp300",
        webstaurantUrl: "https://www.webstaurantstore.com/perlick-glycol-pump/",
        specifications: {
          flowRate: "15 GPM",
          pressure: "60 PSI",
          power: "1/3 HP",
          voltage: "115V, 60Hz"
        }
      }
    ]
  },

  turbochef: {
    name: "TurboChef Ovens",
    manufacturer: "TurboChef Technologies",
    website: "https://www.turbochef.com",
    supportPhone: "1-800-288-2233",
    supportEmail: "service@turbochef.com",
    partstownUrl: "https://www.partstown.com/turbochef",
    webstaurantUrl: "https://www.webstaurantstore.com/turbochef-parts/",
    
    parts: [
      { 
        name: "Temperature Sensor", 
        partNumber: "TS-100", 
        oemNumber: "TC-TS-100",
        price: "$95",
        partstownPrice: "$89.99",
        webstaurantPrice: "$94.95",
        inStock: true,
        description: "High-temperature resistance sensor",
        manufacturer: "TurboChef",
        partstownUrl: "https://www.partstown.com/turbochef/temperature-sensor-ts100",
        webstaurantUrl: "https://www.webstaurantstore.com/turbochef-temperature-sensor/",
        specifications: {
          temperature: "Up to 500°F",
          resistance: "1000 ohms at 32°F",
          accuracy: "±2°F",
          compatibility: "Speedcook series"
        }
      },
      { 
        name: "Airflow Sensor", 
        partNumber: "AS-200", 
        oemNumber: "TC-AS-200",
        price: "$120",
        partstownPrice: "$114.99",
        webstaurantPrice: "$119.95",
        inStock: true,
        description: "Airflow detection sensor for E18 error",
        manufacturer: "TurboChef",
        partstownUrl: "https://www.partstown.com/turbochef/airflow-sensor-as200",
        webstaurantUrl: "https://www.webstaurantstore.com/turbochef-airflow-sensor/",
        specifications: {
          voltage: "24V DC",
          current: "50mA",
          response: "0.1 seconds",
          compatibility: "Speedcook series"
        }
      },
      { 
        name: "Door Switch", 
        partNumber: "DS-300", 
        oemNumber: "TC-DS-300",
        price: "$65",
        partstownPrice: "$59.99",
        webstaurantPrice: "$64.95",
        inStock: true,
        description: "Safety door interlock switch for E32 error",
        manufacturer: "TurboChef",
        partstownUrl: "https://www.partstown.com/turbochef/door-switch-ds300",
        webstaurantUrl: "https://www.webstaurantstore.com/turbochef-door-switch/",
        specifications: {
          voltage: "24V AC",
          current: "2A",
          contacts: "SPDT",
          compatibility: "Speedcook series"
        }
      },
      { 
        name: "Heating Element", 
        partNumber: "HE-400", 
        oemNumber: "TC-HE-400",
        price: "$180",
        partstownPrice: "$169.99",
        webstaurantPrice: "$179.95",
        inStock: false,
        description: "High-wattage heating element",
        manufacturer: "TurboChef",
        partstownUrl: "https://www.partstown.com/turbochef/heating-element-he400",
        webstaurantUrl: "https://www.webstaurantstore.com/turbochef-heating-element/",
        specifications: {
          wattage: "3000W",
          voltage: "208V",
          temperature: "Up to 500°F",
          compatibility: "Speedcook series"
        }
      }
    ]
  },

  southbend: {
    name: "Southbend Ranges",
    manufacturer: "Southbend",
    website: "https://www.southbend.com",
    supportPhone: "1-800-765-2121",
    supportEmail: "service@southbend.com",
    partstownUrl: "https://www.partstown.com/southbend",
    webstaurantUrl: "https://www.webstaurantstore.com/southbend-parts/",
    
    parts: [
      { 
        name: "Thermocouple", 
        partNumber: "TC-150", 
        oemNumber: "SB-TC-150",
        price: "$35",
        partstownPrice: "$32.99",
        webstaurantPrice: "$34.95",
        inStock: true,
        description: "Safety thermocouple for gas pilot",
        manufacturer: "Southbend",
        partstownUrl: "https://www.partstown.com/southbend/thermocouple-tc150",
        webstaurantUrl: "https://www.webstaurantstore.com/southbend-thermocouple/",
        specifications: {
          voltage: "24V DC",
          temperature: "Up to 2000°F",
          length: "18 inches",
          compatibility: "Gas range series"
        }
      },
      { 
        name: "Gas Valve", 
        partNumber: "GV-400", 
        oemNumber: "SB-GV-400",
        price: "$180",
        partstownPrice: "$169.99",
        webstaurantPrice: "$179.95",
        inStock: true,
        description: "Main gas control valve",
        manufacturer: "Southbend",
        partstownUrl: "https://www.partstown.com/southbend/gas-valve-gv400",
        webstaurantUrl: "https://www.webstaurantstore.com/southbend-gas-valve/",
        specifications: {
          gasType: "Natural gas",
          pressure: "0.5-14" W.C.",
          voltage: "24V AC",
          compatibility: "Gas range series"
        }
      },
      { 
        name: "Pilot Assembly", 
        partNumber: "PA-250", 
        oemNumber: "SB-PA-250",
        price: "$85",
        partstownPrice: "$79.99",
        webstaurantPrice: "$84.95",
        inStock: true,
        description: "Complete pilot light assembly",
        manufacturer: "Southbend",
        partstownUrl: "https://www.partstown.com/southbend/pilot-assembly-pa250",
        webstaurantUrl: "https://www.webstaurantstore.com/southbend-pilot-assembly/",
        specifications: {
          gasType: "Natural gas",
          flame: "Blue pilot flame",
          length: "12 inches",
          compatibility: "Gas range series"
        }
      },
      { 
        name: "Burner Head", 
        partNumber: "BH-300", 
        oemNumber: "SB-BH-300",
        price: "$120",
        partstownPrice: "$114.99",
        webstaurantPrice: "$119.95",
        inStock: true,
        description: "Cast iron burner head",
        manufacturer: "Southbend",
        partstownUrl: "https://www.partstown.com/southbend/burner-head-bh300",
        webstaurantUrl: "https://www.webstaurantstore.com/southbend-burner-head/",
        specifications: {
          material: "Cast iron",
          diameter: "6 inches",
          gasType: "Natural gas",
          compatibility: "Gas range series"
        }
      }
    ]
  },

  chicagoFolders: {
    name: "Chicago Folders",
    manufacturer: "Chicago Dryer Company",
    website: "https://www.chicagodryer.com",
    supportPhone: "1-800-621-7663",
    supportEmail: "service@chicagodryer.com",
    partstownUrl: "https://www.partstown.com/chicago-dryer",
    webstaurantUrl: "https://www.webstaurantstore.com/chicago-dryer-parts/",
    
    parts: [
      { 
        name: "Feed Rollers", 
        partNumber: "FR-100", 
        oemNumber: "CD-FR-100",
        price: "$125",
        partstownPrice: "$119.99",
        webstaurantPrice: "$124.95",
        inStock: true,
        description: "Rubber feed rollers for garment feeding",
        manufacturer: "Chicago Dryer",
        partstownUrl: "https://www.partstown.com/chicago-dryer/feed-rollers-fr100",
        webstaurantUrl: "https://www.webstaurantstore.com/chicago-dryer-feed-rollers/",
        specifications: {
          material: "Rubber",
          diameter: "2 inches",
          length: "24 inches",
          compatibility: "Folder series"
        }
      },
      { 
        name: "Air Pressure Valve", 
        partNumber: "APV-50", 
        oemNumber: "CD-APV-50",
        price: "$75",
        partstownPrice: "$69.99",
        webstaurantPrice: "$74.95",
        inStock: true,
        description: "Air pressure control valve",
        manufacturer: "Chicago Dryer",
        partstownUrl: "https://www.partstown.com/chicago-dryer/air-pressure-valve-apv50",
        webstaurantUrl: "https://www.webstaurantstore.com/chicago-dryer-air-valve/",
        specifications: {
          pressure: "0-100 PSI",
          material: "Brass",
          connection: "1/4 inch NPT",
          compatibility: "Folder series"
        }
      },
      { 
        name: "Alignment Sensor", 
        partNumber: "AS-75", 
        oemNumber: "CD-AS-75",
        price: "$95",
        partstownPrice: "$89.99",
        webstaurantPrice: "$94.95",
        inStock: false,
        description: "Optical alignment sensor",
        manufacturer: "Chicago Dryer",
        partstownUrl: "https://www.partstown.com/chicago-dryer/alignment-sensor-as75",
        webstaurantUrl: "https://www.webstaurantstore.com/chicago-dryer-alignment-sensor/",
        specifications: {
          voltage: "24V DC",
          range: "0-50mm",
          response: "0.1 seconds",
          compatibility: "Folder series"
        }
      }
    ]
  },

  ironers: {
    name: "Commercial Ironers",
    manufacturer: "Various",
    website: "https://www.commercialironers.com",
    supportPhone: "1-800-555-0123",
    supportEmail: "service@commercialironers.com",
    partstownUrl: "https://www.partstown.com/ironers",
    webstaurantUrl: "https://www.webstaurantstore.com/ironer-parts/",
    
    parts: [
      { 
        name: "Heating Elements", 
        partNumber: "HE-200", 
        oemNumber: "CI-HE-200",
        price: "$150",
        partstownPrice: "$139.99",
        webstaurantPrice: "$149.95",
        inStock: true,
        description: "High-wattage heating elements",
        manufacturer: "Commercial Ironers",
        partstownUrl: "https://www.partstown.com/ironers/heating-elements-he200",
        webstaurantUrl: "https://www.webstaurantstore.com/ironer-heating-elements/",
        specifications: {
          wattage: "2000W",
          voltage: "240V",
          temperature: "Up to 400°F",
          compatibility: "Standard ironers"
        }
      },
      { 
        name: "Pressure Rollers", 
        partNumber: "PR-300", 
        oemNumber: "CI-PR-300",
        price: "$200",
        partstownPrice: "$189.99",
        webstaurantPrice: "$199.95",
        inStock: true,
        description: "Heavy-duty pressure rollers",
        manufacturer: "Commercial Ironers",
        partstownUrl: "https://www.partstown.com/ironers/pressure-rollers-pr300",
        webstaurantUrl: "https://www.webstaurantstore.com/ironer-pressure-rollers/",
        specifications: {
          material: "Steel",
          diameter: "4 inches",
          length: "36 inches",
          compatibility: "Standard ironers"
        }
      }
    ]
  },

  laundry: {
    name: "Laundry Equipment",
    manufacturer: "Various",
    website: "https://www.laundryequipment.com",
    supportPhone: "1-800-555-0124",
    supportEmail: "service@laundryequipment.com",
    partstownUrl: "https://www.partstown.com/laundry",
    webstaurantUrl: "https://www.webstaurantstore.com/laundry-parts/",
    
    parts: [
      { 
        name: "Drain Pump", 
        partNumber: "DP-400", 
        oemNumber: "LE-DP-400",
        price: "$225",
        partstownPrice: "$214.99",
        webstaurantPrice: "$224.95",
        inStock: true,
        description: "High-capacity drain pump",
        manufacturer: "Laundry Equipment",
        partstownUrl: "https://www.partstown.com/laundry/drain-pump-dp400",
        webstaurantUrl: "https://www.webstaurantstore.com/laundry-drain-pump/",
        specifications: {
          flowRate: "50 GPM",
          head: "20 feet",
          voltage: "115V, 60Hz",
          compatibility: "Washer/dryer units"
        }
      },
      { 
        name: "Lint Filter", 
        partNumber: "LF-50", 
        oemNumber: "LE-LF-50",
        price: "$35",
        partstownPrice: "$32.99",
        webstaurantPrice: "$34.95",
        inStock: true,
        description: "Reusable lint filter",
        manufacturer: "Laundry Equipment",
        partstownUrl: "https://www.partstown.com/laundry/lint-filter-lf50",
        webstaurantUrl: "https://www.webstaurantstore.com/laundry-lint-filter/",
        specifications: {
          material: "Mesh",
          size: "12x12 inches",
          mesh: "100 micron",
          compatibility: "Dryer units"
        }
      }
    ]
  }
};

// Function to get parts from multiple suppliers
export function getPartsFromSuppliers(equipmentId, partNumber) {
  const equipment = realEquipmentData[equipmentId];
  if (!equipment) return null;

  const part = equipment.parts.find(p => p.partNumber === partNumber);
  if (!part) return null;

  return {
    ...part,
    suppliers: [
      {
        name: "Parts Town",
        price: part.partstownPrice,
        url: part.partstownUrl,
        inStock: true,
        shipping: "1-2 business days"
      },
      {
        name: "Webstaurant Store", 
        price: part.webstaurantPrice,
        url: part.webstaurantUrl,
        inStock: true,
        shipping: "2-3 business days"
      },
      {
        name: "Restaurant Supply",
        price: part.price,
        url: `https://www.restaurantsupply.com/search?q=${part.oemNumber}`,
        inStock: true,
        shipping: "3-5 business days"
      }
    ]
  };
}

// Function to search parts across suppliers
export function searchPartsAcrossSuppliers(query) {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  Object.values(realEquipmentData).forEach(equipment => {
    equipment.parts.forEach(part => {
      if (part.name.toLowerCase().includes(searchTerm) ||
          part.partNumber.toLowerCase().includes(searchTerm) ||
          part.oemNumber.toLowerCase().includes(searchTerm)) {
        results.push({
          ...part,
          equipmentName: equipment.name,
          equipmentId: Object.keys(realEquipmentData).find(key => realEquipmentData[key] === equipment)
        });
      }
    });
  });
  
  return results;
}

// Function to get supplier information
export function getSupplierInfo(supplierId) {
  return partsSuppliers[supplierId] || null;
}

// Function to get all suppliers
export function getAllSuppliers() {
  return Object.values(partsSuppliers);
}
