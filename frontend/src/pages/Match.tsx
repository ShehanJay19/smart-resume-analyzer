import { useState } from "react";
import api from "../lib/api";

type MatchResponse = {
  match_score: number;
  missing_skills: string[];
  detail?: string;
};

export const Match = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<MatchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      setResult({
        match_score: 0,
        missing_skills: [],
        detail: "Paste a job description to analyze match quality.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<MatchResponse>("/resumes/match", {
        job_description: jobDescription,
      });
      setResult(response.data);
    } catch (error) {
      setResult({
        match_score: 0,
        missing_skills: [],
        detail: "Unable to analyze match. Upload a resume first.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          JD Match
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">
          Compare your resume to a job description.
        </h2>
        <p className="mt-3 text-sm text-ink-600">
          Paste the role description to generate a similarity score and a list of
          missing skills to add to your resume.
        </p>
        <textarea
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          rows={12}
          className="mt-6 w-full rounded-3xl border border-sand-200/80 bg-sand-50/70 p-4 text-sm text-ink-700 outline-none focus:border-ink-300"
          placeholder="Paste the job description here..."
        />
        <button
          onClick={handleMatch}
          disabled={loading}
          className="mt-5 rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </div>
      <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Results
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-sand-200/70 bg-sand-50/70 p-4">
            <p className="text-xs text-ink-500">Match score</p>
            <p className="mt-2 font-display text-4xl text-ink-900">
              {result?.match_score ? `${result.match_score}%` : "--"}
            </p>
          </div>
          <div className="rounded-2xl border border-sand-200/70 bg-sand-50/70 p-4">
            <p className="text-xs text-ink-500">Missing skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result?.missing_skills?.length ? (
                result.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-600"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-ink-600">
                  {result?.detail ?? "No missing skills detected yet."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
