import { useEffect, useState } from "react";
import api from "../lib/api";

type AtsScoreResponse = {
  ats_score: number;
  missing_sections: string[];
  missing_skills: string[];
  keyword_density: number;
  detail?: string;
};

export const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<AtsScoreResponse | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);

  const fetchScore = async () => {
    try {
      setScoreLoading(true);
      const response = await api.get<AtsScoreResponse>("/resumes/ats-score");
      setScore(response.data);
    } catch (error) {
      setScore({
        ats_score: 0,
        missing_sections: [],
        missing_skills: [],
        keyword_density: 0,
        detail: "Unable to load ATS score yet.",
      });
    } finally {
      setScoreLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please choose a resume file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus(null);
      await api.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("Resume uploaded successfully.");
      await fetchScore();
    } catch (error) {
      setStatus("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="surface-card p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Resume upload
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink-900">
          Drop your latest resume to unlock AI insights.
        </h2>
        <p className="mt-3 text-sm text-ink-600">
          PDF and DOCX formats work best. Once uploaded, you can run ATS matching,
          resume improvements, and interview prep.
        </p>
      </div>

      <div className="surface-layer border-dashed p-6 text-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="w-full text-sm text-ink-600 file:mr-4 file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-sand-50"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
        {status ? (
          <p className="mt-4 text-sm text-ink-600">{status}</p>
        ) : null}
      </div>

      <div className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
              ATS score
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink-900">
              {score?.ats_score !== undefined ? `${score.ats_score}%` : "--"}
            </h3>
          </div>
          <button
            onClick={fetchScore}
            disabled={scoreLoading}
            className="rounded-full border border-ink-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-600 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {scoreLoading ? "Refreshing..." : "Refresh score"}
          </button>
        </div>
        {score?.detail ? (
          <p className="mt-4 text-sm text-ink-600">{score.detail}</p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="surface-layer p-4">
              <p className="text-xs text-ink-500">Keyword density</p>
              <p className="mt-2 text-lg font-semibold text-ink-800">
                {score?.keyword_density ?? 0}%
              </p>
            </div>
            <div className="surface-layer p-4">
              <p className="text-xs text-ink-500">Missing sections</p>
              <p className="mt-2 text-sm text-ink-700">
                {score?.missing_sections?.length
                  ? score.missing_sections.join(", ")
                  : "None"}
              </p>
            </div>
            <div className="surface-layer p-4">
              <p className="text-xs text-ink-500">Missing skills</p>
              <p className="mt-2 text-sm text-ink-700">
                {score?.missing_skills?.length
                  ? score.missing_skills.join(", ")
                  : "None"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
