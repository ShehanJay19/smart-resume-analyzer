import { useState } from "react";
import api from "../lib/api";

type ImproveResponse = {
  ai_feedback: string;
  detail?: string;
};

export const Rewrite = () => {
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ImproveResponse>("/resumes/improve");
      setFeedback(response.data.ai_feedback ?? "");
    } catch (err) {
      setError("Unable to generate feedback. Upload a resume first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          AI rewrite
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">
          Get targeted resume improvements in seconds.
        </h2>
        <p className="mt-3 text-sm text-ink-600">
          The AI will review structure, clarity, and impact. Apply the
          suggestions directly to your resume.
        </p>
        <button
          onClick={handleImprove}
          disabled={loading}
          className="mt-5 rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Feedback"}
        </button>
      </div>
      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Recommendations
        </p>
        {error ? (
          <p className="mt-4 text-sm text-ink-600">{error}</p>
        ) : feedback ? (
          <div className="mt-4 whitespace-pre-wrap text-sm text-ink-700">
            {feedback}
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink-500">
            Run the AI feedback to see guidance here.
          </p>
        )}
      </div>
    </div>
  );
};
