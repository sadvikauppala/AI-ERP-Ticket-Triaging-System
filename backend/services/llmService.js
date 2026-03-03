import axios from "axios";

export async function analyzeTicket(ticket) {
  const prompt = `
You are an AI ERP Ticket Triaging Assistant.

Analyze the ticket and return ONLY valid JSON.

Fields required:

{
  "business_category": "Finance | Inventory | Procurement | HR | IT | Other",
  "erp_module": "SAP | Oracle Fusion | Microsoft Dynamics | Unknown",
  "issue_type": "Issue | Change Request | Support Request | Information Request",
  "priority": "High | Medium | Low",
  "summary": "Short issue summary",
  "first_response": "Professional acknowledgement message"
}

Rules:
- Do NOT add explanations
- Do NOT add markdown
- Output ONLY JSON

Ticket:
${ticket}
`;


  try {
  const response = await axios.post(
  "http://localhost:11434/api/generate",
  {
    model: "llama3",
    prompt,
    stream: false,
    options: {
      temperature: 0.2,   // stable structured output
      num_predict: 300    // prevents long generation
    }
  },
  {
    timeout: 120000
  }
);
    const rawText = response.data.response;
    console.log("LLM RAW RESPONSE:\n", rawText);
    
    // remove markdown if present
    let cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    
    // ✅ AUTO JSON REPAIR
    // add missing closing brace if needed
    const openBraces = (cleaned.match(/{/g) || []).length;
    const closeBraces = (cleaned.match(/}/g) || []).length;
    
    if (openBraces > closeBraces) {
      cleaned += "}".repeat(openBraces - closeBraces);
    }
    
    // extract JSON safely
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }
    
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error("Ollama is not running. Please start Ollama on http://localhost:11434");
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error("Ollama request timed out. Please check if the model 'llama3' is pulled.");
    }
    throw error;
  }

 
}