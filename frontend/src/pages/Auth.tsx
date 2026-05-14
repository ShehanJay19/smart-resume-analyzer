import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Auth = () => {
  const { token, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, username, password);
      }
    } catch (err) {
      setError("Unable to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 text-ink-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(244,214,177,0.7),_transparent_55%),radial-gradient(circle_at_80%_30%,_rgba(31,122,140,0.2),_transparent_50%)]" />
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-sand-200/70 bg-white/80 p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
              Smart Resume Analyzer
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink-900">
              {mode === "login" ? "Welcome back." : "Create your account."}
            </h1>
            <p className="mt-4 text-sm text-ink-600">
              Analyze your resume, refine your story, and align to your dream
              role.
            </p>
            <div className="mt-6 flex gap-2 rounded-full bg-sand-100 p-1 text-xs uppercase tracking-[0.2em] text-ink-500">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  mode === "login"
                    ? "bg-ink-900 text-sand-50"
                    : "text-ink-500"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  mode === "register"
                    ? "bg-ink-900 text-sand-50"
                    : "text-ink-500"
                }`}
              >
                Sign up
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <label className="text-xs uppercase tracking-[0.2em] text-ink-400">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-sand-200/80 bg-sand-50/70 px-4 py-3 text-sm text-ink-700 outline-none focus:border-ink-300"
                  placeholder="you@example.com"
                />
              </label>
              {mode === "register" ? (
                <label className="text-xs uppercase tracking-[0.2em] text-ink-400">
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-sand-200/80 bg-sand-50/70 px-4 py-3 text-sm text-ink-700 outline-none focus:border-ink-300"
                    placeholder="resumehero"
                  />
                </label>
              ) : null}
              <label className="text-xs uppercase tracking-[0.2em] text-ink-400">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-sand-200/80 bg-sand-50/70 px-4 py-3 text-sm text-ink-700 outline-none focus:border-ink-300"
                  placeholder="••••••••"
                />
              </label>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-full bg-ink-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-sand-50 transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign in"
                  : "Create account"}
              </button>
              {error ? (
                <p className="text-sm text-ink-600">{error}</p>
              ) : null}
            </div>
          </div>
          <div className="rounded-[32px] border border-sand-200/70 bg-ink-900 p-8 text-sand-50 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-sand-300">
              What you get
            </p>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="rounded-2xl border border-sand-400/20 bg-ink-800/60 p-4">
                ATS-ready resume checks with skill gap highlights.
              </li>
              <li className="rounded-2xl border border-sand-400/20 bg-ink-800/60 p-4">
                Tailored rewrite suggestions that sound like you.
              </li>
              <li className="rounded-2xl border border-sand-400/20 bg-ink-800/60 p-4">
                Interview coaching with structured response frameworks.
              </li>
              <li className="rounded-2xl border border-sand-400/20 bg-ink-800/60 p-4">
                Smart job recommendations based on your profile.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
