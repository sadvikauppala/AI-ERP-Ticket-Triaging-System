export default function ResultCard({ result }) {

  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">

      <h2 className="text-xl font-bold text-slate-800">
        AI Ticket Analysis
      </h2>

      {/* Summary */}
      <div>
        <p className="text-sm text-gray-500">Summary</p>
        <p className="font-medium">{result.summary}</p>
      </div>

      {/* Grid Info */}
      <div className="grid grid-cols-2 gap-4">

        <Info label="Business Category" value={result.business_category} />
        <Info label="ERP Module" value={result.erp_module} />
        <Info label="Issue Type" value={result.issue_type} />

        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <span className={`text-white px-3 py-1 rounded-full text-sm ${priorityColor[result.priority]}`}>
            {result.priority}
          </span>
        </div>

      </div>

      {/* Confidence */}
      <div>
        <p className="text-sm text-gray-500 mb-1">
          AI Confidence ({Math.round(result.confidence_score * 100)}%)
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${result.confidence_score * 100}%` }}
          />
        </div>
      </div>

      {/* Support Message */}
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">
          Generated First Response
        </p>
        <pre className="whitespace-pre-wrap text-sm">
          {result.support_message}
        </pre>
      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}