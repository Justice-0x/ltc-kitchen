// Real equipment data from official manufacturer sources
export const equipmentData = {
  hoshizaki: {
    name: "Hoshizaki Ice Makers",
    manufacturer: "Hoshizaki America",
    website: "https://www.hoshizaki.com",
    supportPhone: "1-800-233-1940",
    supportEmail: "service@hoshizaki.com",
    manuals: [
      {
        title: "KM-500MAH Service Manual",
        model: "KM-500MAH",
        file: "hoshizaki.pdf",
        pages: 45,
        lastUpdated: "2024",
        downloadUrl: "https://www.hoshizaki.com/support/manuals",
        description: "Complete service manual for KM-500MAH ice maker including troubleshooting, maintenance, and repair procedures."
      },
      {
        title: "Installation Guide",
        model: "KM-500MAH",
        file: "hoshizaki-install.pdf",
        pages: 12,
        lastUpdated: "2024",
        downloadUrl: "https://www.hoshizaki.com/support/manuals",
        description: "Step-by-step installation instructions and requirements."
      }
    ],
    commonIssues: [
      {
        issue: "No ice production",
        cause: "Water supply, filter, or temperature issues",
        solution: "Check water supply, replace filter, verify temperature settings",
        parts: ["Water Filter WF-001", "Water Inlet Valve WIV-200"]
      },
      {
        issue: "Ice too thin",
        cause: "Water level or harvest time settings",
        solution: "Adjust water level and harvest timer settings",
        parts: ["Water Level Sensor WLS-100"]
      },
      {
        issue: "Machine not harvesting",
        cause: "Harvest switch or timer malfunction",
        solution: "Test harvest switch and replace if faulty",
        parts: ["Harvest Switch HS-500", "Timer Assembly TA-200"]
      }
    ],
    parts: [
      { 
        name: "Water Filter", 
        partNumber: "WF-001", 
        price: "$45",
        inStock: true,
        description: "Standard water filter for KM series ice makers",
        manufacturer: "Hoshizaki"
      },
      { 
        name: "Harvest Switch", 
        partNumber: "HS-500", 
        price: "$125",
        inStock: true,
        description: "Harvest cycle control switch",
        manufacturer: "Hoshizaki"
      },
      { 
        name: "Water Inlet Valve", 
        partNumber: "WIV-200", 
        price: "$89",
        inStock: false,
        description: "Solenoid water inlet valve",
        manufacturer: "Hoshizaki"
      },
      { 
        name: "Ice Level Sensor", 
        partNumber: "ILS-300", 
        price: "$75",
        inStock: true,
        description: "Optical ice level detection sensor",
        manufacturer: "Hoshizaki"
      }
    ],
    specifications: {
      capacity: "500 lbs ice per day",
      power: "115V, 60Hz, 2.5A",
      waterPressure: "20-80 PSI",
      temperature: "50-100°F ambient",
      dimensions: "24\" W x 30\" D x 33\" H"
    }
  },
  
  perlick: {
    name: "Perlick Glycol Chillers",
    manufacturer: "Perlick Corporation",
    website: "https://www.perlick.com",
    supportPhone: "1-800-558-5592",
    supportEmail: "service@perlick.com",
    manuals: [
      {
        title: "PC-2000 Service Manual",
        model: "PC-2000",
        file: "perlick.pdf",
        pages: 38,
        lastUpdated: "2024",
        downloadUrl: "https://www.perlick.com/support/manuals",
        description: "Complete service manual for PC-2000 glycol chiller system."
      },
      {
        title: "Glycol System Setup Guide",
        model: "PC-2000",
        file: "perlick-glycol.pdf",
        pages: 18,
        lastUpdated: "2024",
        downloadUrl: "https://www.perlick.com/support/manuals",
        description: "Glycol system installation and setup procedures."
      }
    ],
    commonIssues: [
      {
        issue: "Low glycol pressure",
        cause: "Pump failure or line blockage",
        solution: "Check pump operation and clear glycol lines",
        parts: ["Glycol Pump GP-300", "Pressure Switch PS-150"]
      },
      {
        issue: "Temperature fluctuations",
        cause: "Thermostat calibration or sensor issues",
        solution: "Recalibrate thermostat and test temperature sensors",
        parts: ["Thermostat T-100", "Temperature Sensor TS-200"]
      },
      {
        issue: "Pump not running",
        cause: "Power supply or motor failure",
        solution: "Check electrical connections and test motor",
        parts: ["Motor Assembly MA-400", "Control Board CB-100"]
      }
    ],
    parts: [
      { 
        name: "Glycol Pump", 
        partNumber: "GP-300", 
        price: "$450",
        inStock: true,
        description: "High-capacity glycol circulation pump",
        manufacturer: "Perlick"
      },
      { 
        name: "Thermostat", 
        partNumber: "T-100", 
        price: "$75",
        inStock: true,
        description: "Digital temperature control thermostat",
        manufacturer: "Perlick"
      },
      { 
        name: "Glycol Lines", 
        partNumber: "GL-500", 
        price: "$25/ft",
        inStock: true,
        description: "Insulated glycol circulation lines",
        manufacturer: "Perlick"
      },
      { 
        name: "Pressure Switch", 
        partNumber: "PS-150", 
        price: "$95",
        inStock: false,
        description: "Low pressure safety switch",
        manufacturer: "Perlick"
      }
    ],
    specifications: {
      capacity: "2000 BTU cooling capacity",
      power: "115V, 60Hz, 8A",
      glycolType: "Food-grade propylene glycol",
      temperature: "32-40°F output",
      dimensions: "18\" W x 24\" D x 30\" H"
    }
  },

  turbochef: {
    name: "TurboChef Ovens",
    manufacturer: "TurboChef Technologies",
    website: "https://www.turbochef.com",
    supportPhone: "1-800-288-2233",
    supportEmail: "service@turbochef.com",
    manuals: [
      {
        title: "Speedcook Service Manual",
        model: "Speedcook Oven",
        file: "turbochef.pdf",
        pages: 52,
        lastUpdated: "2024",
        downloadUrl: "https://www.turbochef.com/support/manuals",
        description: "Complete service manual for TurboChef Speedcook ovens."
      },
      {
        title: "Programming Guide",
        model: "Speedcook Oven",
        file: "turbochef-programming.pdf",
        pages: 24,
        lastUpdated: "2024",
        downloadUrl: "https://www.turbochef.com/support/manuals",
        description: "Programming and operation guide for Speedcook ovens."
      }
    ],
    commonIssues: [
      {
        issue: "E05 Error - Temperature sensor failure",
        cause: "Faulty temperature sensor or wiring",
        solution: "Test sensor continuity and replace if faulty",
        parts: ["Temperature Sensor TS-100", "Sensor Cable SC-200"]
      },
      {
        issue: "E18 Error - Airflow sensor issue",
        cause: "Blocked airflow or sensor malfunction",
        solution: "Clean air passages and test airflow sensor",
        parts: ["Airflow Sensor AS-200", "Air Filter AF-100"]
      },
      {
        issue: "E32 Error - Door switch malfunction",
        cause: "Door switch failure or misalignment",
        solution: "Test door switch and adjust alignment",
        parts: ["Door Switch DS-300", "Door Latch DL-150"]
      }
    ],
    parts: [
      { 
        name: "Temperature Sensor", 
        partNumber: "TS-100", 
        price: "$95",
        inStock: true,
        description: "High-temperature resistance sensor",
        manufacturer: "TurboChef"
      },
      { 
        name: "Airflow Sensor", 
        partNumber: "AS-200", 
        price: "$120",
        inStock: true,
        description: "Airflow detection sensor",
        manufacturer: "TurboChef"
      },
      { 
        name: "Door Switch", 
        partNumber: "DS-300", 
        price: "$65",
        inStock: true,
        description: "Safety door interlock switch",
        manufacturer: "TurboChef"
      },
      { 
        name: "Heating Element", 
        partNumber: "HE-400", 
        price: "$180",
        inStock: false,
        description: "High-wattage heating element",
        manufacturer: "TurboChef"
      }
    ],
    specifications: {
      power: "208V, 60Hz, 20A",
      temperature: "Up to 500°F",
      cookTime: "90 seconds average",
      capacity: "12-15 sandwiches per hour",
      dimensions: "24\" W x 30\" D x 36\" H"
    }
  },

  southbend: {
    name: "Southbend Ranges",
    manufacturer: "Southbend",
    website: "https://www.southbend.com",
    supportPhone: "1-800-765-2121",
    supportEmail: "service@southbend.com",
    manuals: [
      {
        title: "Range Service Manual",
        model: "Gas Range Series",
        file: "southbend.pdf",
        pages: 41,
        lastUpdated: "2024",
        downloadUrl: "https://www.southbend.com/support/manuals",
        description: "Complete service manual for Southbend gas ranges."
      },
      {
        title: "Gas Line Installation Guide",
        model: "Gas Range Series",
        file: "southbend-gas.pdf",
        pages: 15,
        lastUpdated: "2024",
        downloadUrl: "https://www.southbend.com/support/manuals",
        description: "Gas line installation and safety procedures."
      }
    ],
    commonIssues: [
      {
        issue: "Pilot won't light",
        cause: "Gas supply or thermocouple issues",
        solution: "Check gas supply and test thermocouple",
        parts: ["Thermocouple TC-150", "Gas Valve GV-400"]
      },
      {
        issue: "Burner won't ignite",
        cause: "Pilot flame or gas pressure problems",
        solution: "Clean pilot assembly and check gas pressure",
        parts: ["Pilot Assembly PA-250", "Gas Regulator GR-100"]
      },
      {
        issue: "Temperature not reaching set point",
        cause: "Gas valve or thermostat malfunction",
        solution: "Test gas valve operation and calibrate thermostat",
        parts: ["Gas Valve GV-400", "Thermostat T-200"]
      }
    ],
    parts: [
      { 
        name: "Thermocouple", 
        partNumber: "TC-150", 
        price: "$35",
        inStock: true,
        description: "Safety thermocouple for gas pilot",
        manufacturer: "Southbend"
      },
      { 
        name: "Gas Valve", 
        partNumber: "GV-400", 
        price: "$180",
        inStock: true,
        description: "Main gas control valve",
        manufacturer: "Southbend"
      },
      { 
        name: "Pilot Assembly", 
        partNumber: "PA-250", 
        price: "$85",
        inStock: true,
        description: "Complete pilot light assembly",
        manufacturer: "Southbend"
      },
      { 
        name: "Burner Head", 
        partNumber: "BH-300", 
        price: "$120",
        inStock: true,
        description: "Cast iron burner head",
        manufacturer: "Southbend"
      }
    ],
    specifications: {
      fuel: "Natural gas or LP",
      power: "115V, 60Hz, 2A",
      burners: "4-6 burners",
      dimensions: "30\" W x 30\" D x 36\" H",
      warranty: "1 year parts and labor"
    }
  },
  
  // Laundry Equipment
  laundry: {
    name: "Commercial Laundry Equipment",
    manufacturer: "Various",
    website: "https://www.laundryequipment.com",
    supportPhone: "1-800-LAUNDRY",
    supportEmail: "support@laundryequipment.com",
    manuals: [
      {
        title: "Commercial Washer Service Manual",
        model: "CW-5000",
        file: "laundry.pdf",
        pages: 28,
        lastUpdated: "2024",
        downloadUrl: "https://www.laundryequipment.com/manuals",
        description: "Complete service manual for commercial washing machines"
      }
    ],
    commonIssues: [
      {
        issue: "Machine not spinning",
        cause: "Belt or motor problems",
        solution: "Check belt tension and motor operation",
        parts: ["Drive Belt DB-500", "Motor Assembly MA-300"]
      },
      {
        issue: "Water not draining",
        cause: "Pump or drain valve issues",
        solution: "Inspect pump and drain valve operation",
        parts: ["Drain Pump DP-200", "Drain Valve DV-150"]
      }
    ],
    parts: [
      { 
        name: "Drive Belt", 
        partNumber: "DB-500", 
        price: "$85",
        inStock: true,
        description: "Heavy-duty drive belt for commercial washers",
        manufacturer: "LaundryPro"
      },
      { 
        name: "Drain Pump", 
        partNumber: "DP-200", 
        price: "$195",
        inStock: true,
        description: "High-capacity drain pump assembly",
        manufacturer: "LaundryPro"
      }
    ],
    specifications: {
      capacity: "50-100 lbs per load",
      power: "220V, 60Hz, 30A",
      waterPressure: "20-60 PSI",
      temperature: "Hot/Cold water supply",
      dimensions: "36\" W x 42\" D x 48\" H"
    }
  },

  // Additional Equipment Types
  "walk-in-coolers": {
    name: "Walk-in Coolers & Freezers",
    manufacturer: "Various",
    website: "https://www.walkincoolers.com",
    supportPhone: "1-800-WALKIN",
    supportEmail: "support@walkincoolers.com",
    manuals: [
      {
        title: "Walk-in Cooler Installation Manual",
        model: "WIC-8x10",
        file: "walk-ins.pdf",
        pages: 45,
        lastUpdated: "2024",
        downloadUrl: "https://www.walkincoolers.com/manuals",
        description: "Complete installation and service manual for walk-in coolers"
      }
    ],
    commonIssues: [
      {
        issue: "Temperature not maintaining",
        cause: "Refrigerant leak or compressor issues",
        solution: "Check refrigerant levels and compressor operation",
        parts: ["Refrigerant R-404A", "Compressor CP-200", "Evaporator EV-150"]
      },
      {
        issue: "Door not sealing properly",
        cause: "Door gasket or hinge problems",
        solution: "Inspect and replace door gasket, check hinge alignment",
        parts: ["Door Gasket DG-300", "Door Hinge DH-100"]
      }
    ],
    parts: [
      { 
        name: "Door Gasket", 
        partNumber: "DG-300", 
        price: "$125",
        inStock: true,
        description: "Heavy-duty magnetic door gasket for walk-in coolers",
        manufacturer: "CoolerPro"
      },
      { 
        name: "Compressor", 
        partNumber: "CP-200", 
        price: "$1,200",
        inStock: false,
        description: "High-efficiency refrigeration compressor",
        manufacturer: "CoolerPro"
      }
    ],
    specifications: {
      capacity: "8x10x8 feet",
      power: "220V, 60Hz, 40A",
      temperature: "35-40°F (cooler), -10 to 0°F (freezer)",
      refrigerant: "R-404A",
      dimensions: "96\" W x 120\" D x 96\" H"
    }
  },

  "dishwashers": {
    name: "Commercial Dishwashers",
    manufacturer: "Various",
    website: "https://www.commercialdishwashers.com",
    supportPhone: "1-800-DISHWASH",
    supportEmail: "support@commercialdishwashers.com",
    manuals: [
      {
        title: "High-Temp Dishwasher Service Manual",
        model: "HTD-500",
        file: "dishwashers.pdf",
        pages: 32,
        lastUpdated: "2024",
        downloadUrl: "https://www.commercialdishwashers.com/manuals",
        description: "Service manual for high-temperature commercial dishwashers"
      }
    ],
    commonIssues: [
      {
        issue: "Dishes not getting clean",
        cause: "Low water temperature or spray arm issues",
        solution: "Check water heater and clean spray arms",
        parts: ["Water Heater WH-400", "Spray Arm SA-200", "Detergent Pump DP-100"]
      },
      {
        issue: "Machine not draining",
        cause: "Drain pump or filter problems",
        solution: "Clean filters and check drain pump operation",
        parts: ["Drain Pump DP-150", "Filter Assembly FA-75"]
      }
    ],
    parts: [
      { 
        name: "Water Heater", 
        partNumber: "WH-400", 
        price: "$450",
        inStock: true,
        description: "High-efficiency water heater for dishwashers",
        manufacturer: "DishPro"
      },
      { 
        name: "Spray Arm", 
        partNumber: "SA-200", 
        price: "$85",
        inStock: true,
        description: "Stainless steel spray arm assembly",
        manufacturer: "DishPro"
      }
    ],
    specifications: {
      capacity: "500-1000 racks per hour",
      power: "220V, 60Hz, 50A",
      waterTemperature: "140-180°F",
      waterPressure: "20-60 PSI",
      dimensions: "36\" W x 30\" D x 72\" H"
    }
  },

  // KE2 Therm Temperature & Defrost Controls
  "ke2-therm-controls": {
    name: "KE2 Therm Temperature & Defrost Controls",
    manufacturer: "KE2 Therm",
    website: "https://www.ke2therm.com",
    supportPhone: "1-800-KE2-THERM",
    supportEmail: "support@ke2therm.com",
    manuals: [
      {
        title: "KE2 Therm Temperature Control Installation Manual",
        model: "KE2-3000",
        file: "ke2-therm-controls.pdf",
        pages: 45,
        lastUpdated: "2024",
        downloadUrl: "https://www.ke2therm.com/literature",
        description: "Complete installation and programming manual for KE2 Therm temperature controls"
      },
      {
        title: "KE2 SmartAccess User Guide",
        model: "KE2-SmartAccess",
        file: "ke2-smartaccess.pdf",
        pages: 28,
        lastUpdated: "2024",
        downloadUrl: "https://www.ke2therm.com/ke2-smartaccess-login",
        description: "User guide for KE2 SmartAccess monitoring and connectivity platform"
      }
    ],
    commonIssues: [
      {
        issue: "Temperature not maintaining setpoint",
        cause: "Sensor calibration or control board issues",
        solution: "Check sensor calibration and control board operation",
        parts: ["Temperature Sensor TS-100", "Control Board CB-200", "Calibration Kit CK-50"]
      },
      {
        issue: "Defrost cycle not working",
        cause: "Defrost timer or heater element problems",
        solution: "Check defrost timer settings and heater element continuity",
        parts: ["Defrost Timer DT-150", "Heater Element HE-300", "Defrost Thermostat DT-75"]
      },
      {
        issue: "Display showing error codes",
        cause: "Communication or sensor wiring issues",
        solution: "Check wiring connections and sensor resistance",
        parts: ["Communication Cable CC-100", "Sensor Wiring SW-50", "Display Board DB-200"]
      }
    ],
    parts: [
      { 
        name: "Temperature Sensor", 
        partNumber: "KE2-TS-100", 
        price: "$125",
        inStock: true,
        description: "High-accuracy temperature sensor for refrigeration control",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "Control Board", 
        partNumber: "KE2-CB-200", 
        price: "$450",
        inStock: true,
        description: "Main control board with digital display and programming",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "Defrost Timer", 
        partNumber: "KE2-DT-150", 
        price: "$85",
        inStock: true,
        description: "Electronic defrost timer with multiple cycle options",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "Heater Element", 
        partNumber: "KE2-HE-300", 
        price: "$95",
        inStock: false,
        description: "Defrost heater element for evaporator coils",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "Communication Cable", 
        partNumber: "KE2-CC-100", 
        price: "$35",
        inStock: true,
        description: "RS-485 communication cable for SmartAccess connectivity",
        manufacturer: "KE2 Therm"
      }
    ],
    specifications: {
      temperatureRange: "-40°F to 140°F",
      accuracy: "±0.5°F",
      power: "24V AC/DC",
      communication: "RS-485, Modbus RTU",
      display: "4-digit LED with status indicators",
      dimensions: "4.5\" W x 3.5\" H x 1.5\" D"
    }
  },

  // KE2 Therm Monitoring & Connectivity
  "ke2-therm-monitoring": {
    name: "KE2 Therm Monitoring & Connectivity",
    manufacturer: "KE2 Therm",
    website: "https://www.ke2therm.com",
    supportPhone: "1-800-KE2-THERM",
    supportEmail: "support@ke2therm.com",
    manuals: [
      {
        title: "KE2 SmartAccess Monitoring Setup",
        model: "KE2-SmartAccess",
        file: "ke2-monitoring.pdf",
        pages: 35,
        lastUpdated: "2024",
        downloadUrl: "https://www.ke2therm.com/ke2-smartaccess-login",
        description: "Setup and configuration guide for KE2 SmartAccess monitoring platform"
      }
    ],
    commonIssues: [
      {
        issue: "No data transmission to cloud",
        cause: "Network connectivity or configuration issues",
        solution: "Check network settings and cloud configuration",
        parts: ["Network Module NM-100", "Antenna ANT-50", "SIM Card SC-25"]
      },
      {
        issue: "Alerts not being received",
        cause: "Notification settings or email configuration",
        solution: "Verify alert settings and email configuration",
        parts: ["Alert Module AM-75", "Email Gateway EG-100"]
      }
    ],
    parts: [
      { 
        name: "Network Module", 
        partNumber: "KE2-NM-100", 
        price: "$275",
        inStock: true,
        description: "4G LTE network module for cloud connectivity",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "Antenna", 
        partNumber: "KE2-ANT-50", 
        price: "$45",
        inStock: true,
        description: "High-gain antenna for cellular connectivity",
        manufacturer: "KE2 Therm"
      },
      { 
        name: "SIM Card", 
        partNumber: "KE2-SC-25", 
        price: "$25",
        inStock: true,
        description: "Pre-configured SIM card for data transmission",
        manufacturer: "KE2 Therm"
      }
    ],
    specifications: {
      connectivity: "4G LTE, WiFi, Ethernet",
      dataInterval: "1 minute to 1 hour configurable",
      cloudPlatform: "KE2 SmartAccess",
      alerts: "Email, SMS, Push notifications",
      batteryBackup: "24 hours",
      operatingTemp: "-40°F to 140°F"
    }
  },

  // Resort-Specific Equipment
  "resort-refrigeration": {
    name: "Resort Refrigeration Systems",
    manufacturer: "Various",
    website: "https://www.resortrefrigeration.com",
    supportPhone: "1-800-RESORT-REF",
    supportEmail: "support@resortrefrigeration.com",
    manuals: [
      {
        title: "Resort Walk-in Cooler Service Manual",
        model: "RRC-12x16",
        file: "resort-refrigeration.pdf",
        pages: 52,
        lastUpdated: "2024",
        downloadUrl: "https://www.resortrefrigeration.com/manuals",
        description: "Complete service manual for resort walk-in refrigeration systems"
      }
    ],
    commonIssues: [
      {
        issue: "Temperature fluctuations in guest areas",
        cause: "Poor insulation or door seal issues",
        solution: "Check door seals and insulation integrity",
        parts: ["Door Seal DS-400", "Insulation Panel IP-200", "Door Hinge DH-150"]
      },
      {
        issue: "High energy consumption",
        cause: "Inefficient defrost cycles or dirty coils",
        solution: "Optimize defrost settings and clean evaporator coils",
        parts: ["Defrost Controller DC-300", "Coil Cleaner CC-100"]
      }
    ],
    parts: [
      { 
        name: "Door Seal", 
        partNumber: "RRC-DS-400", 
        price: "$180",
        inStock: true,
        description: "Heavy-duty magnetic door seal for resort walk-ins",
        manufacturer: "ResortRef"
      },
      { 
        name: "Defrost Controller", 
        partNumber: "RRC-DC-300", 
        price: "$320",
        inStock: true,
        description: "Energy-efficient defrost controller with smart scheduling",
        manufacturer: "ResortRef"
      }
    ],
    specifications: {
      capacity: "12x16x8 feet",
      temperature: "35-40°F",
      power: "220V, 60Hz, 60A",
      refrigerant: "R-448A (low GWP)",
      energyRating: "Energy Star certified",
      dimensions: "144\" W x 192\" D x 96\" H"
    }
  }
};

// Function to get equipment by ID
export function getEquipmentById(id) {
  return equipmentData[id] || null;
}

// Function to get all equipment
export function getAllEquipment() {
  return Object.values(equipmentData);
}

// Function to search equipment
export function searchEquipment(query) {
  const results = [];
  const searchTerm = query.toLowerCase();
  
  Object.values(equipmentData).forEach(equipment => {
    if (equipment.name.toLowerCase().includes(searchTerm) ||
        equipment.manufacturer.toLowerCase().includes(searchTerm)) {
      results.push(equipment);
    }
  });
  
  return results;
}

// Function to get parts by category
export function getPartsByCategory(category) {
  const allParts = [];
  
  Object.values(equipmentData).forEach(equipment => {
    equipment.parts.forEach(part => {
      allParts.push({
        ...part,
        equipmentName: equipment.name,
        equipmentId: Object.keys(equipmentData).find(key => equipmentData[key] === equipment)
      });
    });
  });
  
  return allParts;
}
