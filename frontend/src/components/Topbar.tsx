import { useAuth } from "../context/AuthContext";

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-sand-200/70 px-6 py-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
          Smart Resume Analyzer
        </p>
        <h1 className="font-display text-2xl text-ink-900">
          Welcome back{user ? `, ${user.username}` : ""}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-sand-200 bg-sand-50/80 px-4 py-2 text-xs text-ink-500">
          {user?.email ?? "Loading account"}
        </div>
        <button
          className="rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5"
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
