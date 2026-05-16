import { useState } from "react";
import api from "../lib/api";

type AgentResponse = {
  detail?: string;
  [key: string]: unknown;
};

export const CareerAgent = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AgentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!jobDescription.trim()) {
      setResult({ detail: "Paste a job description to run the career agent." });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<AgentResponse>("/resumes/career-agent", {
        job_description: jobDescription,
      });
      setResult(response.data);
    } catch (error) {
      setResult({ detail: "Unable to run the career agent. Upload a resume." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="surface-card p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Career agent
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">
          Get career guidance tailored to a role.
        </h2>
        <p className="mt-3 text-sm text-ink-600">
          The agent analyzes your resume alongside a target job description and
          gives a structured career plan.
        </p>
        <label className="float-field mt-6">
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            rows={12}
            className="float-input"
            placeholder=" "
          />
          <span className="float-label">Job description</span>
        </label>
        <button
          onClick={handleRun}
          disabled={loading}
          className="mt-5 rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Running..." : "Run Career Agent"}
        </button>
      </div>
      <div className="surface-card p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Agent output
        </p>
        <div className="mt-4 text-sm text-ink-700">
          {result?.detail ? (
            <p>{result.detail}</p>
          ) : result ? (
            <pre className="whitespace-pre-wrap rounded-2xl border border-sand-200/70 bg-sand-50/80 p-4 text-xs text-ink-700">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p className="text-ink-500">
              Run the career agent to see guidance here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
