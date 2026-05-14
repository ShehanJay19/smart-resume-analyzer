import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

type JobRecommendationResponse = {
  ids?: string[][];
  documents?: string[][];
  metadatas?: Array<Array<{ title?: string }>>;
  distances?: number[][];
  detail?: string;
};

export const Dashboard = () => {
  const [jobs, setJobs] = useState<JobRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await api.get<JobRecommendationResponse>(
          "/resumes/job-recommendations"
        );
        setJobs(response.data);
      } catch (error) {
        setJobs({ detail: "Unable to load recommendations." });
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const recommendations = jobs?.metadatas?.[0] ?? [];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            Resume command center
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink-900">
            Keep your resume sharp, aligned, and recruiter-ready.
          </h2>
          <p className="mt-4 text-sm text-ink-600">
            Upload a fresh resume, run an ATS match against a target job
            description, and ask the AI coach for bold rewrites.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/upload"
              className="rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5"
            >
              Upload Resume
            </Link>
            <Link
              to="/match"
              className="rounded-full border border-ink-200 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-700 transition hover:-translate-y-0.5"
            >
              Run JD Match
            </Link>
          </div>
        </div>
        <div className="rounded-[32px] border border-sand-200/70 bg-white/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            Momentum
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "Resume freshness",
                value: "82%",
                detail: "Update any roles older than 18 months.",
              },
              {
                title: "Skill alignment",
                value: "74%",
                detail: "Highlight top 5 skills from the JD.",
              },
              {
                title: "Story clarity",
                value: "90%",
                detail: "Action + impact structure is strong.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-sand-200/70 bg-sand-50/80 p-4"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-600">{item.title}</span>
                  <span className="font-display text-lg text-ink-900">
                    {item.value}
                  </span>
                </div>
                <p className="mt-2 text-xs text-ink-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.6fr_1fr]">
        <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
            Quick actions
          </p>
          <div className="mt-5 grid gap-4">
            {[
              {
                title: "AI Rewrite",
                desc: "Get targeted bullet upgrades.",
                to: "/rewrite",
              },
              {
                title: "Interview Prep",
                desc: "Ask role-specific questions.",
                to: "/interview",
              },
              {
                title: "JD Match",
                desc: "Compare resume to a posting.",
                to: "/match",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="rounded-2xl border border-ink-200/70 bg-sand-50/60 p-4 transition hover:-translate-y-0.5"
              >
                <p className="font-display text-lg text-ink-900">
                  {item.title}
                </p>
                <p className="text-xs text-ink-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
              Job recommendations
            </p>
            <span className="rounded-full border border-sand-200 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-500">
              Based on your resume
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {loading ? (
              <p className="text-sm text-ink-500">Loading recommendations...</p>
            ) : jobs?.detail ? (
              <div className="rounded-2xl border border-dashed border-ink-200/70 bg-sand-50/80 p-4 text-sm text-ink-600">
                {jobs.detail}
              </div>
            ) : (
              recommendations.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-2xl border border-sand-200/70 bg-sand-50/70 p-4"
                >
                  <p className="font-display text-lg text-ink-900">
                    {item.title ?? "Role Recommendation"}
                  </p>
                  <p className="mt-2 text-xs text-ink-500">
                    {jobs?.documents?.[0]?.[index] ??
                      "A role aligned with your experience."}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
