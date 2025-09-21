import { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

const QRUnlock = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  // Check if already unlocked from localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem('bills-bitch-unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
      // Initialize with welcome message
      setMessages([{
        role: 'assistant',
        content: "👋 **Kitchen Assistant here** — your professional equipment support system. I'm here to help with repairs, maintenance, and troubleshooting.\n\n**Quick Links:**\n• `/parts/hoshizaki` → Ice maker parts\n• `/manuals/perlick.pdf` → Glycol chiller manual\n• `/diagrams/turbochef.png` → Oven wiring\n\n**What equipment needs attention today?**"
      }]);
    }
  }, []);

  // AI Chat function
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          systemPrompt: `You are the Kitchen Assistant, the professional equipment support system for LTC Kitchen. 
You exist ONLY to help technicians and staff with kitchen equipment, manuals, troubleshooting, and parts. 
You DO NOT answer unrelated questions — if asked, politely redirect back to equipment support.

Your core responsibilities:
1. 📖 Manuals → Guide users to the correct PDF/manual in /public/manuals/{id}.pdf.
2. 🛠 Troubleshooting → Provide step-by-step solutions for common failures:
   - Perlick Glycol Chiller → low charge, differential, glycol %, pump mode.
   - TurboChef Ovens → E05 sensor, E18 airflow, E32 door switch.
   - Frosty Machine → daily clean, weekly teardown.
   - Hoshizaki Ice Maker → no ice, no harvest, thin ice.
   - Southbend Range → ignition, pilot, thermocouple.
   - Chicago Folders → misfeed, air pressure, alignment.
   - Ironers → wrinkles, roller pressure, speed mismatch.
   - Laundry → drain error, clogged filter, pump fail.
3. 🔌 Wiring Diagrams → Link /public/diagrams/{id}.png.
4. ⚡ Quick Actions → Direct links:
   - /parts/{id} → Parts page
   - /manuals/{id}.pdf → Manual
   - /diagrams/{id}.png → Diagram
   - /equipment/{id} → Equipment page
5. 🤖 Chat → Always act like a pro kitchen tech assistant. Friendly but blunt, focused, no fluff.

Rules:
- Stay in character as the Kitchen Assistant at all times.
- If user strays off-topic (finance, personal, random chat), say:
  👉 "Not my job — I'm here to fix kitchen gear. Let's get back to Perlick, TurboChef, Hoshizaki, Frosty, Southbend, Laundry, Ironers, or Chicago Folders."
- Always assume they're in the middle of a repair and need the fastest path.
- Use checklists, numbered steps, and concise directions.
- Be the top gun kitchen assistant: fast, reliable, equipment-focused, nothing else.
- If you cannot help with a specific issue, always end with:
  "For further assistance, please speak with our AI technical support team or contact our service department at 1-800-LTC-HELP."`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: "🔧 **System Error** — Chat temporarily offline. Use direct links:\n• [Equipment Directory](/equipment)\n• [Parts Catalog](/parts/hoshizaki)\n• [Manuals](/manuals/perlick.pdf)" 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startScanning = async () => {
    setIsScanning(true);
    setError('');

    try {
      // Check if camera is available
      if (!QrScanner.hasCamera()) {
        setError('No camera found. Please use a device with a camera or try the access code option below.');
        setIsScanning(false);
        return;
      }

      // Create a video element for scanning
      const video = document.createElement('video');
      video.style.width = '100%';
      video.style.height = '200px';
      video.style.border = '2px solid #8b5cf6';
      video.style.borderRadius = '8px';

      // Replace the scanner area with the video
      const scannerArea = document.querySelector('.qr-scanner-area');
      if (scannerArea) {
        scannerArea.innerHTML = '';
        scannerArea.appendChild(video);
      }

      const qrScanner = new QrScanner(video, result => {
        console.log('QR Code detected:', result);
        qrScanner.stop();
        setIsScanning(false);

        // Extract the actual text content from the result
        const qrText = result.data || result.text || result.toString() || JSON.stringify(result);
        console.log('QR Text extracted:', qrText);

        // More flexible validation - check for any of these patterns
        const isValid = qrText && (qrText.includes('myguy.dev') || 
                      qrText.includes('bills-bitch') || 
                      qrText.includes('BILLS_BITCH') ||
                      qrText.includes('myguy') ||
                      qrText.includes('bill') ||
                      qrText.toLowerCase().includes('bills') ||
                      qrText.toLowerCase().includes('bitch') ||
                      qrText.includes('qrco.de') ||
                      qrText.includes('bglkX3'));
        
        if (isValid) {
          setIsUnlocked(true);
          localStorage.setItem('bills-bitch-unlocked', 'true');
          setError('');
        } else {
          setError('Invalid QR code. Please scan the QR code from myguy.dev. Detected: ' + qrText);
        }
      }, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      qrScanner.start().catch(err => {
        console.error('QR Scanner error:', err);
        setError('QR Scanner error: ' + err.message);
        setIsScanning(false);
      });

    } catch (err) {
      setError('QR scanning failed. Please try again.');
      setIsScanning(false);
    }
  };

  const lockAgain = () => {
    setIsUnlocked(false);
    localStorage.removeItem('bills-bitch-unlocked');
  };

  const handleAccessCode = () => {
    // Your secret access code - change this to something only you know
    const validCodes = ['BILLS_BITCH_2025', 'MYGUY_ACCESS', 'KITCHEN_MASTER'];
    
    if (validCodes.includes(accessCode.toUpperCase())) {
      setIsUnlocked(true);
      localStorage.setItem('bills-bitch-unlocked', 'true');
      setError('');
      setAccessCode('');
      setShowAccessCode(false);
    } else {
      setError('Invalid access code. Please try again or scan QR code.');
    }
  };

  if (isUnlocked) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-green-600 text-2xl mr-3">🔓</span>
              <div>
                <h3 className="text-green-900 font-bold">Bill's Bitch - AI Assistant</h3>
                <p className="text-green-700">Kitchen equipment support & troubleshooting</p>
              </div>
            </div>
            <button
              onClick={lockAgain}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              🔒 Lock
            </button>
          </div>
        </div>

        {/* AI Chat Interface */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <h3 className="text-white font-bold">Bill's Bitch</h3>
                <p className="text-purple-100 text-sm">Kitchen Equipment Assistant</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about equipment issues, parts, or manuals..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '⏳' : '🚀'}
              </button>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setInputMessage('Hoshizaki ice maker not making ice')}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                🧊 Ice Maker Issue
              </button>
              <button
                onClick={() => setInputMessage('TurboChef oven error E05')}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                🔥 Oven Error
              </button>
              <button
                onClick={() => setInputMessage('Perlick glycol chiller low pressure')}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                🍺 Glycol Issue
              </button>
              <button
                onClick={() => setInputMessage('Show me parts for Southbend range')}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors"
              >
                🛠 Need Parts
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="/equipment" className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <div className="text-2xl mb-1">📋</div>
            <div className="text-sm font-medium text-blue-900">Equipment</div>
          </a>
          <a href="/docs" className="p-3 bg-green-50 border border-green-200 rounded-lg text-center hover:bg-green-100 transition-colors">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-sm font-medium text-green-900">Docs</div>
          </a>
          <a href="/parts/hoshizaki" className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <div className="text-2xl mb-1">🛠</div>
            <div className="text-sm font-medium text-purple-900">Parts</div>
          </a>
          <a href="/manuals/perlick.pdf" target="_blank" className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center hover:bg-orange-100 transition-colors">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-sm font-medium text-orange-900">Manuals</div>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          This is Bill's private AI assistant. Scan the QR code from myguy.dev to unlock access.
        </p>
        
        <div className="mb-6">
          <div className="qr-scanner-area bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-2">📱</div>
            <p className="text-sm text-gray-500">QR Code Scanner Area</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={startScanning}
          disabled={isScanning}
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
        >
          {isScanning ? '🔄 Scanning...' : '📸 Scan QR Code'}
        </button>

        {/* Access Code Option */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setShowAccessCode(!showAccessCode)}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showAccessCode ? 'Hide' : 'Show'} Access Code Option
          </button>
          
          {showAccessCode && (
            <div className="mt-4 space-y-3">
              <div className="text-xs text-gray-500 text-center">
                <p>If you don't have a phone, use one of these access codes:</p>
                <p className="mt-1 font-mono bg-gray-100 px-2 py-1 rounded">BILLS_BITCH_2025</p>
                <p className="mt-1 font-mono bg-gray-100 px-2 py-1 rounded">MYGUY_ACCESS</p>
                <p className="mt-1 font-mono bg-gray-100 px-2 py-1 rounded">KITCHEN_MASTER</p>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAccessCode()}
                />
                <button
                  onClick={handleAccessCode}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Unlock
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Scan the QR code from myguy.dev to access</p>
        </div>
      </div>
    </div>
  );
};

export default QRUnlock;