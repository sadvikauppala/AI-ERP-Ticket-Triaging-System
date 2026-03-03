import { useState } from "react";
import Header from "./components/Header";
import TicketForm from "./components/TicketForm";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";

export default function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-8">

        <TicketForm
          setResult={setResult}
          setLoading={setLoading}
        />

        {loading && <Loader />}
        {!loading && result && <ResultCard result={result} />}

      </div>

    </div>
  );
}