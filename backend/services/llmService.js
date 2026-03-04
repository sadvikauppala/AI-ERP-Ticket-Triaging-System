import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeTicket(ticket) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
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
    console.error("Gemini Error:", error);
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }
    throw error;
  }
}
