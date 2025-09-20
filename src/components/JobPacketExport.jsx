import React, { useState } from 'react';
import { equipmentData } from '../data/equipmentData.js';

export default function JobPacketExport() {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [includeChecklist, setIncludeChecklist] = useState(true);
  const [includeParts, setIncludeParts] = useState(true);
  const [includeManual, setIncludeManual] = useState(true);
  const [customNotes, setCustomNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const equipmentOptions = Object.entries(equipmentData).map(([id, data]) => ({
    id,
    name: data.name
  }));

  const selectedEquipmentData = equipmentData[selectedEquipment];

  const generateJobPacket = async () => {
    if (!selectedEquipment) {
      alert('Please select equipment first');
      return;
    }

    setIsGenerating(true);

    try {
      // Create a comprehensive job packet document
      const jobPacket = {
        equipment: selectedEquipmentData,
        model: selectedModel,
        timestamp: new Date().toISOString(),
        customNotes,
        includes: {
          checklist: includeChecklist,
          parts: includeParts,
          manual: includeManual
        }
      };

      // Generate HTML content for PDF
      const htmlContent = generateHTMLContent(jobPacket);
      
      // Create and download PDF
      await generatePDF(htmlContent, `job-packet-${selectedEquipment}-${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (error) {
      console.error('Error generating job packet:', error);
      alert('Error generating job packet. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHTMLContent = (jobPacket) => {
    const { equipment, model, timestamp, customNotes, includes } = jobPacket;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Job Packet - ${equipment.name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section h2 { color: #2c5aa0; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .section h3 { color: #444; margin-top: 20px; }
        .equipment-info { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        .checklist-item { margin: 10px 0; padding: 8px; border-left: 3px solid #2c5aa0; background: #f9f9f9; }
        .parts-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        .parts-table th, .parts-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .parts-table th { background: #f2f2f2; }
        .manual-info { background: #e8f4fd; padding: 15px; border-radius: 5px; }
        .notes { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; }
        .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔧 LTC Kitchen - Job Packet</h1>
        <p><strong>Generated:</strong> ${new Date(timestamp).toLocaleString()}</p>
        <p><strong>Equipment:</strong> ${equipment.name} ${model ? `- ${model}` : ''}</p>
    </div>

    <div class="section">
        <h2>📋 Equipment Information</h2>
        <div class="equipment-info">
            <p><strong>Manufacturer:</strong> ${equipment.manufacturer}</p>
            <p><strong>Support Phone:</strong> ${equipment.supportPhone}</p>
            <p><strong>Support Email:</strong> ${equipment.supportEmail}</p>
            ${equipment.specifications ? `
                <h3>Specifications:</h3>
                <ul>
                    ${Object.entries(equipment.specifications).map(([key, value]) => 
                        `<li><strong>${key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}</li>`
                    ).join('')}
                </ul>
            ` : ''}
        </div>
    </div>

    ${includes.checklist ? `
    <div class="section">
        <h2>✅ Commissioning Checklist</h2>
        <div class="checklist-item">
            <strong>Electrical: Line-to-line voltage within spec</strong><br>
            <em>Record L1-L2, L2-L3, L1-L3</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Electrical: Proper grounding verified</strong><br>
            <em>Bonding/ground continuity</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Water: Inlet pressure within spec</strong><br>
            <em>Record PSI</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Water: TDS/Hardness within spec</strong><br>
            <em>Record ppm / gpg</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Refrigeration: Operating pressures nominal</strong><br>
            <em>High/Low PSI</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Refrigeration: Superheat/Subcool within range</strong><br>
            <em>Record °F</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Controls: Sensors and switches test passed</strong><br>
            <em>Temp/level/pressure/flow</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Visual: No leaks (water/refrigerant/glycol)</strong><br>
            <em>Dry fittings, no oil residue</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Airflow/Condenser: Clean and unobstructed</strong><br>
            <em>Coils cleaned, clearances ok</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Run test: Startup/harvest/idle sequence verified</strong><br>
            <em>Record cycle time</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        <div class="checklist-item">
            <strong>Docs: Manual/labels accessible; QR tested</strong><br>
            <em>QR deep-link opens correct model</em><br>
            <input type="checkbox"> Completed | Reading: _______________
        </div>
        
        <h3>Technician Information</h3>
        <p><strong>Name:</strong> _________________________</p>
        <p><strong>Date:</strong> _________________________</p>
        <p><strong>Signature:</strong> _________________________</p>
    </div>
    ` : ''}

    ${includes.parts ? `
    <div class="section">
        <h2>🛠️ Parts Information</h2>
        <table class="parts-table">
            <thead>
                <tr>
                    <th>Part Name</th>
                    <th>Part Number</th>
                    <th>Price</th>
                    <th>In Stock</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${equipment.parts.map(part => `
                    <tr>
                        <td>${part.name}</td>
                        <td>${part.partNumber}</td>
                        <td>${part.price}</td>
                        <td>${part.inStock ? 'Yes' : 'No'}</td>
                        <td>${part.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <h3>Common Issues & Parts</h3>
        ${equipment.commonIssues.map(issue => `
            <div style="margin: 15px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <strong>${issue.issue}</strong><br>
                <em>Cause:</em> ${issue.cause}<br>
                <em>Solution:</em> ${issue.solution}<br>
                <em>Parts needed:</em> ${issue.parts.join(', ')}
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${includes.manual ? `
    <div class="section">
        <h2>📖 Manual Information</h2>
        <div class="manual-info">
            <h3>Available Manuals:</h3>
            ${equipment.manuals.map(manual => `
                <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 3px;">
                    <strong>${manual.title}</strong><br>
                    <em>Model:</em> ${manual.model}<br>
                    <em>Pages:</em> ${manual.pages}<br>
                    <em>Last Updated:</em> ${manual.lastUpdated}<br>
                    <em>Description:</em> ${manual.description}
                </div>
            `).join('')}
            
            <h3>Quick Reference Links:</h3>
            <ul>
                <li>Full Manual: <a href="${equipment.manuals[0]?.downloadUrl || '#'}">Download PDF</a></li>
                <li>Parts Catalog: <a href="/parts/${selectedEquipment}">View Online</a></li>
                <li>Troubleshooting: <a href="/troubleshooting">Interactive Guide</a></li>
            </ul>
        </div>
    </div>
    ` : ''}

    ${customNotes ? `
    <div class="section">
        <h2>📝 Custom Notes</h2>
        <div class="notes">
            ${customNotes.split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>
    </div>
    ` : ''}

    <div class="footer">
        <p>Generated by LTC Kitchen Equipment Portal | ${new Date().toLocaleDateString()}</p>
        <p>For technical support: ${equipment.supportPhone} | ${equipment.supportEmail}</p>
    </div>
</body>
</html>
    `;
  };

  const generatePDF = async (htmlContent, filename) => {
    // For now, we'll use the browser's print functionality
    // In a production environment, you'd use a library like jsPDF or Puppeteer
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
    };
    
    // Also provide a download option for the HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.pdf', '.html');
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Packet Export</h2>
      
      <div className="space-y-6">
        {/* Equipment Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Equipment</label>
          <select
            value={selectedEquipment}
            onChange={(e) => {
              setSelectedEquipment(e.target.value);
              setSelectedModel('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose equipment...</option>
            {equipmentOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        {selectedEquipmentData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model (Optional)</label>
            <input
              type="text"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., KM-500MAH"
            />
          </div>
        )}

        {/* Include Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Include in Job Packet</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeChecklist}
                onChange={(e) => setIncludeChecklist(e.target.checked)}
                className="mr-2"
              />
              Commissioning Checklist
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeParts}
                onChange={(e) => setIncludeParts(e.target.checked)}
                className="mr-2"
              />
              Parts Information & Common Issues
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeManual}
                onChange={(e) => setIncludeManual(e.target.checked)}
                className="mr-2"
              />
              Manual Information & Quick Links
            </label>
          </div>
        </div>

        {/* Custom Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Custom Notes (Optional)</label>
          <textarea
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Add any specific notes, special instructions, or additional information for this job packet..."
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={generateJobPacket}
            disabled={!selectedEquipment || isGenerating}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Job Packet'}
          </button>
        </div>

        {/* Preview Info */}
        {selectedEquipment && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Job Packet Preview</h4>
            <p className="text-blue-800 text-sm">
              This will generate a comprehensive job packet for <strong>{selectedEquipmentData?.name}</strong>
              {selectedModel && ` (${selectedModel})`} including:
            </p>
            <ul className="text-blue-800 text-sm mt-2 list-disc list-inside">
              {includeChecklist && <li>Commissioning checklist with readings</li>}
              {includeParts && <li>Parts catalog and common issues</li>}
              {includeManual && <li>Manual information and quick links</li>}
              {customNotes && <li>Your custom notes</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
