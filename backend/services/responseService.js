export function generateSupportResponse(result) {

  // create simple ticket id
  const ticketId = "AI-" + Math.floor(Math.random() * 100000);

  const message = `
Subject: Ticket Received - ${result.business_category} Issue

Dear User,

Thank you for contacting ERP Support.

We have received your request regarding:
"${result.summary}"

Ticket Details:
--------------------------------
Ticket ID: ${ticketId}
ERP Module: ${result.erp_module}
Issue Type: ${result.issue_type}
Priority: ${result.priority}
Assigned Team: ${result.business_category} Support
--------------------------------

Our team is currently reviewing your issue and will provide updates shortly.

Regards,
ERP Support Team
`;

  return {
    ticket_id: ticketId,
    support_message: message.trim()
  };
}