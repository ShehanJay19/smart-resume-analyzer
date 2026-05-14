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
    <aside className="w-full md:w-72 md:shrink-0 md:border-r border-sand-200/70 bg-sand-50/80 backdrop-blur">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-ink-900 text-sand-50 flex items-center justify-center font-display text-lg">
            SR
          </div>
          <div>
            <p className="font-display text-lg text-ink-900">Smart Resume</p>
            <p className="text-xs text-ink-500">Analyzer Suite</p>
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
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-ink-900 text-sand-50 shadow-soft"
                    : "text-ink-600 hover:bg-sand-100",
                ].join(" ")
              }
            >
              <span>{item.label}</span>
              {item.label === "AI Rewrite" ? (
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink-400">
                  Pro
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-dashed border-ink-200/70 bg-sand-100/80 px-4 py-4">
          <p className="text-xs text-ink-500">Tip of the day</p>
          <p className="mt-2 text-sm text-ink-800">
            Highlight measurable impact in every role to boost ATS scoring.
          </p>
        </div>
      </nav>
    </aside>
  );
};
