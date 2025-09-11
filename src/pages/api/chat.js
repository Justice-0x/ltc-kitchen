export async function POST({ request }) {
  try {
    const { message, systemPrompt } = await request.json();

    // For now, return a mock response that follows the Bill's Bitch personality
    // You can replace this with actual Gemini API integration
    const mockResponses = {
      'hoshizaki ice maker not making ice': `🧊 **Hoshizaki Ice Maker - No Ice Production**

**Quick Checklist:**
1. ✅ Power ON? Check breaker & display
2. 🚰 Water supply ON? Check inlet valve
3. 🌡️ Ambient temp under 100°F?
4. 🔧 Bin switch activated?

**Step-by-step:**
1. Check water inlet valve - should be 24V
2. Inspect float switch in bin
3. Test harvest cycle manually
4. Check refrigerant levels

**Need parts?** → [Hoshizaki Parts](/parts/hoshizaki)
**Manual:** → [KM-500MAH Manual](/manuals/hoshizaki.pdf)`,

      'turbochef oven error e05': `🔥 **TurboChef E05 Error - Temperature Sensor**

**E05 = RTD Temperature Probe Failure**

**Fix Steps:**
1. 🔌 Check probe connections (behind control panel)
2. 🧪 Test resistance: Should be ~1000Ω at room temp
3. 🔄 Swap probes to isolate bad one
4. 🔧 Replace faulty RTD probe

**Part needed:** RTD Probe TC-101765 ($85)
**Order:** → [TurboChef Parts](/parts/turbochef)
**Wiring:** → [Diagram](/diagrams/turbochef.png)`,

      'perlick glycol chiller low pressure': `🍺 **Perlick Glycol Chiller - Low Pressure**

**Low Pressure Causes:**
1. 🧊 Refrigerant leak (most common)
2. 🌡️ Low ambient temperature
3. 🔧 TXV stuck open
4. 💨 Dirty condenser coils

**Troubleshoot:**
1. Check sight glass for bubbles
2. Test superheat/subcooling
3. Inspect glycol concentration (25-30%)
4. Clean condenser coils

**Quick fix:** Add R-404A if low, clean coils
**Parts:** → [Perlick Parts](/parts/perlick)`,

      'show me parts for southbend range': `🍳 **Southbend Range Parts Available:**

**Top Parts:**
• Gas Valve SB-1175004 - $145.00
• Pilot Assembly SB-1175089 - $65.50  
• Thermostat SB-1175156 - $95.75
• Door Gasket SB-1175201 - $35.25

**View all parts:** → [Southbend Parts](/parts/southbend)
**Need manual?** → [SRG-36 Manual](/manuals/southbend.pdf)

**What specific part you need?**`
    };

    // Check for exact matches first
    let responseContent = mockResponses[message.toLowerCase()];
    
    if (!responseContent) {
      // Generate contextual responses based on keywords
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hoshizaki') || lowerMessage.includes('ice')) {
        responseContent = `🧊 **Hoshizaki Issue Detected**

Common problems:
• No ice production → Check water & power
• Thin ice → Adjust cube thickness control  
• No harvest → Test hot gas valve

**What's the exact symptom?**
[View Hoshizaki Parts](/parts/hoshizaki) | [Manual](/manuals/hoshizaki.pdf)`;
      } else if (lowerMessage.includes('turbochef') || lowerMessage.includes('oven')) {
        responseContent = `🔥 **TurboChef Oven Support**

Common errors:
• E05 → RTD temperature probe
• E18 → Airflow sensor  
• E32 → Door switch failure

**What error code are you seeing?**
[TurboChef Parts](/parts/turbochef) | [Manual](/manuals/turbochef.pdf)`;
      } else if (lowerMessage.includes('perlick') || lowerMessage.includes('glycol')) {
        responseContent = `🍺 **Perlick Glycol Chiller**

Check these first:
• Glycol concentration (25-30%)
• Refrigerant charge level
• Pump operation mode
• Temperature differential

**What's the issue?**
[Perlick Parts](/parts/perlick) | [Manual](/manuals/perlick.pdf)`;
      } else if (lowerMessage.includes('frosty') || lowerMessage.includes('soft serve')) {
        responseContent = `🍦 **Frosty Soft-Serve Machine**

Daily tasks:
• Clean mix circuit
• Check viscosity settings
• Inspect door seals
• Weekly teardown required

**What problem are you having?**
[Frosty Parts](/parts/frosty) | [Manual](/manuals/frosty.pdf)`;
      } else if (lowerMessage.includes('southbend') || lowerMessage.includes('range')) {
        responseContent = `🍳 **Southbend Range Issues**

Common fixes:
• No ignition → Check pilot & thermocouple
• Uneven heating → Calibrate thermostat
• Gas smell → Inspect connections

**What's not working?**
[Southbend Parts](/parts/southbend) | [Manual](/manuals/southbend.pdf)`;
      } else if (lowerMessage.includes('parts') || lowerMessage.includes('part')) {
        responseContent = `🛠 **Parts Catalog**

**Quick Links:**
• [Hoshizaki Parts](/parts/hoshizaki) - Ice maker components
• [TurboChef Parts](/parts/turbochef) - Oven parts & magnetrons  
• [Perlick Parts](/parts/perlick) - Glycol system parts
• [Frosty Parts](/parts/frosty) - Soft-serve components
• [Southbend Parts](/parts/southbend) - Range & oven parts

**What equipment do you need parts for?**`;
      } else if (lowerMessage.includes('manual') || lowerMessage.includes('documentation')) {
        responseContent = `📖 **Technical Manuals**

**Available Manuals:**
• [Hoshizaki KM-500MAH](/manuals/hoshizaki.pdf)
• [TurboChef Tornado 2](/manuals/turbochef.pdf)
• [Perlick 4420-2](/manuals/perlick.pdf)
• [Frosty F-2000](/manuals/frosty.pdf)
• [Southbend SRG-36](/manuals/southbend.pdf)

**Which manual do you need?**`;
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        responseContent = `👋 **Bill's Bitch here** — ready to fix kitchen gear.

**Quick start:**
• Got an error code? Tell me the equipment + code
• Need parts? Say the equipment name
• Want a manual? Ask for specific equipment docs

**What's broken today?** I don't do small talk — let's fix something! 🔧`;
      } else if (!lowerMessage.includes('hoshizaki') && !lowerMessage.includes('turbochef') && !lowerMessage.includes('perlick') && !lowerMessage.includes('frosty') && !lowerMessage.includes('southbend') && !lowerMessage.includes('equipment')) {
        responseContent = `👉 **Not my job** — I'm here to fix kitchen gear. Let's get back to Perlick, TurboChef, Hoshizaki, Frosty, Southbend, Laundry, Ironers, or Chicago Folders.

**Try asking:**
• "Hoshizaki ice maker not working"
• "TurboChef error E05"  
• "Need Perlick parts"
• "Southbend range manual"

**What equipment needs fixing?** 🔧`;
      } else {
        responseContent = `🔧 **Bill's Bitch - Equipment Assistant**

I help with:
• **Troubleshooting** → Step-by-step fixes
• **Parts** → SKUs, prices, ordering  
• **Manuals** → Technical documentation
• **Wiring** → Electrical diagrams

**Tell me the equipment and problem:**
Example: "Hoshizaki ice maker not making ice"

**What's the issue?**`;
      }
    }

    return new Response(JSON.stringify({ 
      message: responseContent 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ 
      message: "🔧 **System Error** — Chat temporarily offline. Use direct links:\n• [Equipment Directory](/equipment)\n• [Parts Catalog](/parts/hoshizaki)\n• [Manuals](/manuals/perlick.pdf)" 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
