import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const PageShell = () => {
  return (
    <div className="min-h-screen bg-sand-50 text-ink-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(244,214,177,0.7),_transparent_55%),radial-gradient(circle_at_30%_40%,_rgba(28,110,126,0.15),_transparent_50%)]" />
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
