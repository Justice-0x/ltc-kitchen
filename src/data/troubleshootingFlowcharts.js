// Troubleshooting flowcharts with expected readings
export const troubleshootingFlowcharts = {
  hoshizaki: {
    name: 'Hoshizaki Ice Maker',
    flowcharts: [
      {
        id: 'no-ice-production',
        title: 'No Ice Production',
        steps: [
          {
            id: 'step-1',
            type: 'check',
            question: 'Is power ON and display lit?',
            expected: 'Display should show "ICE" or current temp',
            yes: 'step-2',
            no: 'step-power'
          },
          {
            id: 'step-2',
            type: 'check',
            question: 'Is water supply valve open?',
            expected: 'Water pressure 20-80 PSI',
            yes: 'step-3',
            no: 'step-water'
          },
          {
            id: 'step-3',
            type: 'measure',
            question: 'Check water inlet temperature',
            expected: '50-100°F ambient',
            reading: '°F',
            yes: 'step-4',
            no: 'step-temp'
          },
          {
            id: 'step-4',
            type: 'check',
            question: 'Is bin switch activated?',
            expected: 'Switch should be depressed',
            yes: 'step-5',
            no: 'step-bin'
          },
          {
            id: 'step-5',
            type: 'measure',
            question: 'Check evaporator temperature',
            expected: 'Should cycle between 20-40°F',
            reading: '°F',
            yes: 'step-6',
            no: 'step-refrigerant'
          },
          {
            id: 'step-6',
            type: 'check',
            question: 'Is harvest cycle working?',
            expected: 'Hot gas valve energizes every 15-20 min',
            yes: 'step-success',
            no: 'step-harvest'
          },
          {
            id: 'step-power',
            type: 'action',
            title: 'Power Issue',
            actions: [
              'Check circuit breaker',
              'Verify 115V power supply',
              'Test power cord continuity'
            ],
            parts: ['Power cord', 'Control board']
          },
          {
            id: 'step-water',
            type: 'action',
            title: 'Water Supply Issue',
            actions: [
              'Open water supply valve',
              'Check for kinks in supply line',
              'Verify water pressure (20-80 PSI)'
            ],
            parts: ['Water inlet valve', 'Supply line']
          },
          {
            id: 'step-temp',
            type: 'action',
            title: 'Temperature Issue',
            actions: [
              'Move unit to cooler location',
              'Check condenser airflow',
              'Clean condenser coils'
            ],
            parts: ['Condenser fan', 'Thermostat']
          },
          {
            id: 'step-bin',
            type: 'action',
            title: 'Bin Switch Issue',
            actions: [
              'Check bin switch alignment',
              'Test switch continuity',
              'Adjust switch position'
            ],
            parts: ['Bin switch', 'Bin assembly']
          },
          {
            id: 'step-refrigerant',
            type: 'action',
            title: 'Refrigerant Issue',
            actions: [
              'Check for refrigerant leaks',
              'Verify charge level',
              'Test compressor operation'
            ],
            parts: ['Refrigerant', 'Compressor', 'TXV valve']
          },
          {
            id: 'step-harvest',
            type: 'action',
            title: 'Harvest Cycle Issue',
            actions: [
              'Test hot gas valve operation',
              'Check harvest timer',
              'Verify water pump operation'
            ],
            parts: ['Hot gas valve', 'Harvest timer', 'Water pump']
          },
          {
            id: 'step-success',
            type: 'success',
            title: 'System Operating Normally',
            message: 'Ice maker is functioning correctly. Monitor for 24 hours.'
          }
        ]
      }
    ]
  },
  turbochef: {
    name: 'TurboChef Oven',
    flowcharts: [
      {
        id: 'e05-error',
        title: 'E05 Error - Temperature Sensor',
        steps: [
          {
            id: 'step-1',
            type: 'check',
            question: 'Is oven door closed?',
            expected: 'Door should be fully closed',
            yes: 'step-2',
            no: 'step-door'
          },
          {
            id: 'step-2',
            type: 'measure',
            question: 'Check RTD sensor resistance',
            expected: '~1000Ω at room temperature',
            reading: 'Ω',
            yes: 'step-3',
            no: 'step-sensor'
          },
          {
            id: 'step-3',
            type: 'check',
            question: 'Are sensor connections tight?',
            expected: 'All connections secure',
            yes: 'step-4',
            no: 'step-connections'
          },
          {
            id: 'step-4',
            type: 'measure',
            question: 'Check sensor voltage',
            expected: '5V DC at sensor terminals',
            reading: 'V',
            yes: 'step-5',
            no: 'step-control'
          },
          {
            id: 'step-5',
            type: 'test',
            question: 'Run sensor calibration',
            expected: 'Calibration completes without error',
            yes: 'step-success',
            no: 'step-replace'
          },
          {
            id: 'step-door',
            type: 'action',
            title: 'Door Issue',
            actions: [
              'Check door latch mechanism',
              'Verify door switch operation',
              'Clean door seal'
            ],
            parts: ['Door latch', 'Door switch']
          },
          {
            id: 'step-sensor',
            type: 'action',
            title: 'Sensor Replacement',
            actions: [
              'Disconnect power',
              'Remove old RTD sensor',
              'Install new sensor (TC-101765)',
              'Reconnect wiring'
            ],
            parts: ['RTD Sensor TC-101765', 'Sensor cable']
          },
          {
            id: 'step-connections',
            type: 'action',
            title: 'Connection Issue',
            actions: [
              'Tighten all sensor connections',
              'Check for corrosion',
              'Clean terminals'
            ],
            parts: ['Terminal connectors']
          },
          {
            id: 'step-control',
            type: 'action',
            title: 'Control Board Issue',
            actions: [
              'Check control board power',
              'Test voltage regulator',
              'Replace control board if needed'
            ],
            parts: ['Control board', 'Voltage regulator']
          },
          {
            id: 'step-replace',
            type: 'action',
            title: 'Sensor Replacement Required',
            actions: [
              'Order RTD sensor TC-101765',
              'Schedule replacement',
              'Update maintenance log'
            ],
            parts: ['RTD Sensor TC-101765']
          },
          {
            id: 'step-success',
            type: 'success',
            title: 'E05 Error Resolved',
            message: 'Temperature sensor is functioning correctly. Monitor for 24 hours.'
          }
        ]
      }
    ]
  }
};

export function getFlowchartByBrand(brandId) {
  return troubleshootingFlowcharts[brandId] || null;
}

export function getFlowchartById(brandId, flowchartId) {
  const brand = troubleshootingFlowcharts[brandId];
  if (!brand) return null;
  return brand.flowcharts.find(f => f.id === flowchartId) || null;
}
