export function validateTriage(aiResult) {

  let result = { ...aiResult };

  // ✅ Rule 1 — Force High Priority for critical keywords
  const criticalWords = [
    "down",
    "cannot login",
    "payment failure",
    "data loss",
    "system crash",
    "production issue"
  ];

  const summaryText = result.summary.toLowerCase();

  if (criticalWords.some(word => summaryText.includes(word))) {
    result.priority = "High";
    result.priority_reason = "Critical keyword detected";
  }

  // ✅ Rule 2 — Unknown ERP fallback
  if (!result.erp_module || result.erp_module === "Unknown") {
    result.erp_module = "Manual Review Needed";
  }

  // ✅ Rule 3 — Ensure all fields exist
  const requiredFields = [
    "business_category",
    "erp_module",
    "issue_type",
    "priority",
    "summary",
    "first_response"
  ];

  requiredFields.forEach(field => {
    if (!result[field]) {
      result[field] = "Not identified";
    }
  });

  // ✅ Add system metadata
  result.triaged_by = "AI Assistant";
  result.timestamp = new Date().toISOString();

  return result;
}