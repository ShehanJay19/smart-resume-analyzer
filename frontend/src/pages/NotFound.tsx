import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[32px] border border-sand-200/70 bg-white/80 p-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
        404
      </p>
      <h2 className="font-display text-3xl text-ink-900">
        This page drifted off the resume.
      </h2>
      <p className="text-sm text-ink-600">
        Head back to the dashboard to continue refining your profile.
      </p>
      <Link
        to="/"
        className="rounded-full bg-ink-900 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5"
      >
        Back to dashboard
      </Link>
    </div>
  );
};
