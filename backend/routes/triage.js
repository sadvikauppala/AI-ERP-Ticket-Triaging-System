import express from "express";
import { analyzeTicket } from "../services/llmService.js";
import { validateTriage } from "../services/validationService.js";
import { generateExplanation } from "../services/explainService.js";
import { generateSupportResponse } from "../services/responseService.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { ticket } = req.body;

    // ✅ validation check
    if (!ticket) {
      return res.status(400).json({
        error: "Ticket description is required"
      });
    }

    console.log("Incoming ticket:", ticket);

    const aiResult = await analyzeTicket(ticket);

    const validatedResult = validateTriage(aiResult);

    const explanation = generateExplanation(
      ticket,
      validatedResult
    );

    const supportResponse =
      generateSupportResponse(validatedResult);

    const finalResponse = {
      ...validatedResult,
      ...explanation,
      ...supportResponse
    };

    res.json(finalResponse);

  } catch (error) {
    console.error("Triage Error:", error);
    res.status(500).json({
      error: "Triage failed",
      details: error.message
    });
  }
});
export default router;