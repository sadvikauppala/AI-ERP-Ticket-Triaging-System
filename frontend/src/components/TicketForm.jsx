import { useState } from "react";

export default function TicketForm({ setResult, setLoading }) {
  const [ticket, setTicket] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/triage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket: ticket, // ✅ MUST match backend
          }),
        }
      );

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error("API Error:", error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold mb-4">
        Submit ERP Ticket
      </h2>

      <textarea
        value={ticket}
        onChange={(e) => setTicket(e.target.value)}
        placeholder="Describe your ERP issue..."
        className="w-full border p-3 rounded mb-4"
        rows={6}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Analyze Ticket
      </button>
    </form>
  );
}