export function generateExplanation(ticket, result) {

  let score = 0.5; // base confidence
  let reasons = [];

  const text = ticket.toLowerCase();

  // ✅ ERP detection confidence
  if (text.includes("sap") || result.erp_module === "SAP") {
    score += 0.15;
    reasons.push("ERP keyword detected (SAP)");
  }

  if (text.includes("oracle")) {
    score += 0.15;
    reasons.push("ERP keyword detected (Oracle)");
  }

  if (text.includes("dynamics")) {
    score += 0.15;
    reasons.push("ERP keyword detected (Dynamics)");
  }

  // ✅ Business category confidence
  const financeWords = ["invoice", "payment", "finance", "billing"];
  if (financeWords.some(w => text.includes(w))) {
    score += 0.1;
    reasons.push("Finance-related keywords detected");
  }

  const hrWords = ["employee", "payroll", "leave"];
  if (hrWords.some(w => text.includes(w))) {
    score += 0.1;
    reasons.push("HR-related keywords detected");
  }

  // ✅ Priority reasoning
  if (result.priority === "High") {
    score += 0.1;
    reasons.push("High urgency indicators present");
  }

  // cap confidence
  score = Math.min(score, 0.95);

  return {
    confidence_score: Number(score.toFixed(2)),
    ai_reasoning: reasons
  };
}