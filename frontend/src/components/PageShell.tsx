import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const PageShell = () => {
  return (
    <div className="min-h-screen bg-sand-50 text-ink-600">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,38,39,0.16),_transparent_55%),radial-gradient(circle_at_25%_35%,_rgba(0,107,95,0.18),_transparent_50%),radial-gradient(circle_at_85%_15%,_rgba(237,134,30,0.2),_transparent_45%)]" />
      <div className="absolute inset-0 -z-10 grain-overlay" />
      <div className="relative flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-6 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
