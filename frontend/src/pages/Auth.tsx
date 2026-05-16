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
    <div className="min-h-screen bg-sand-50 text-ink-600">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,38,39,0.2),_transparent_55%),radial-gradient(circle_at_20%_40%,_rgba(0,107,95,0.2),_transparent_50%),radial-gradient(circle_at_85%_20%,_rgba(237,134,30,0.22),_transparent_45%)]" />
      <div className="absolute inset-0 -z-10 grain-overlay" />
      <div className="absolute left-6 top-20 h-28 w-28 rounded-full bg-sand-100/70 blur-2xl md:left-20 md:top-28 md:h-44 md:w-44 float-slow" />
      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-accent-300/18 blur-2xl md:h-44 md:w-44 float-slow" />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="hero-panel p-9 reveal-up">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-50 text-sm font-semibold uppercase tracking-[0.2em] text-ink-900">
                SRA
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sand-200">
                  Smart resume analayzer
                </p>
                <p className="text-sm text-sand-200">
                  Executive-grade resume intelligence
                </p>
              </div>
            </div>
            <h1 className="mt-8 font-display text-4xl text-sand-50">
              {mode === "login"
                ? "Welcome back to your private career studio."
                : "Create a private career studio."}
            </h1>
            <p className="mt-4 text-sm text-sand-200">
              AI-guided clarity for high-stakes roles. Analyze, refine, and
              align your resume with decision-level confidence.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "ATS Precision", value: "92%" },
                { title: "Story Alignment", value: "88%" },
                { title: "Impact Clarity", value: "76%" },
                { title: "Role Fit", value: "84%" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sand-400/20 bg-black/20 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-sand-300">
                    {item.title}
                  </p>
                  <p className="mt-3 font-display text-3xl text-sand-50">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-sand-300">
              <span className="rounded-full border border-sand-400/20 px-3 py-1">
                Private feedback
              </span>
              <span className="rounded-full border border-sand-400/20 px-3 py-1">
                Executive tone
              </span>
              <span className="rounded-full border border-sand-400/20 px-3 py-1">
                Recruiter ready
              </span>
            </div>
          </div>
          <div className="surface-card p-8 backdrop-blur reveal-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
                  Access
                </p>
                <h2 className="mt-3 font-display text-3xl text-ink-900">
                  {mode === "login" ? "Sign in" : "Create account"}
                </h2>
              </div>
              <div className="rounded-full border border-sand-200 bg-sand-50/80 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ink-500">
                Secure
              </div>
            </div>
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
              <label className="float-field">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="float-input"
                  placeholder=" "
                />
                <span className="float-label">Email</span>
              </label>
              {mode === "register" ? (
                <label className="float-field">
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="float-input"
                    placeholder=" "
                  />
                  <span className="float-label">Username</span>
                </label>
              ) : null}
              <label className="float-field">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="float-input"
                  placeholder=" "
                />
                <span className="float-label">Password</span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign in"
                  : "Create account"}
              </button>
              <button className="btn-secondary w-full">
                Continue as guest
              </button>
              {error ? (
                <p className="text-sm text-ink-600">{error}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
