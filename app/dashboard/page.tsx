"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Dashboard() {
  // 1. State for job role and level
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 3. Function to call POST /api/generate
  const generateQuestions = async () => {
    if (!role || !level) return alert("Please fill in all fields");

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, level }),
      });

      const data = await response.json();
      
      // If the API returns a single string, we split it into an array 
      // (or just store it if you prefer a single block of text)
      if (data.questions) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-6 p-24">
      <h1 className="text-3xl font-bold">Interview Prep Dashboard</h1>

      {/* Input for job role */}
      <input
        type="text"
        placeholder="Enter Job Role (e.g. Frontend Developer)"
        className="border p-2 rounded w-full max-w-md text-black"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      {/* 2. Dropdown for level */}
      <select
        className="border p-2 rounded w-full max-w-md text-black"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option value="Junior">Junior</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        onClick={generateQuestions}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {/* 4. Display area for results */}
      <div className="mt-4 w-full max-w-md p-4 border rounded bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-2 text-black">Generated Interview Questions:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <li key={index} className="text-sm">
                <ReactMarkdown>{q}</ReactMarkdown>
              </li>
            ))
          ) : (
            <p className="text-gray-400 italic">No questions generated yet.</p>
          )}
        </ul>
      </div>
    </main>
  );
}