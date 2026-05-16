import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Upload Resume", to: "/upload" },
  { label: "JD Match", to: "/match" },
  { label: "AI Rewrite", to: "/rewrite" },
  { label: "Resume Chatbot", to: "/interview" },
  { label: "Career Agent", to: "/career-agent" },
  { label: "Supervisor Agent", to: "/supervisor-agent" },
];

export const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 md:shrink-0">
      <div className="mx-4 mt-4 surface-panel">
        <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-900 text-lg font-semibold text-sand-50">
            SR
          </div>
          <div>
            <p className="font-display text-lg text-ink-900">Smart Resume</p>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">
              Analyzer Suite
            </p>
          </div>
        </div>
        </div>
        <nav className="px-4 pb-8">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "relative flex items-center justify-between rounded-xl border border-transparent px-4 py-3 pl-5 text-sm font-medium transition",
                    isActive
                      ? "border-accent-300 bg-sand-100 text-ink-900 shadow-soft"
                      : "text-ink-600 hover:border-sand-200 hover:bg-sand-100",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-2 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-accent-300 transition ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="flex items-center gap-3">
                      {item.label}
                    </span>
                    {item.label === "AI Rewrite" ? (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent-300">
                        Pro
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-ink-300/70 bg-sand-100/70 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-500">
              Tip of the day
            </p>
            <p className="mt-2 text-sm text-ink-700">
              Highlight measurable impact in every role to boost ATS scoring.
            </p>
          </div>
        </nav>
      </div>
    </aside>
  );
};
