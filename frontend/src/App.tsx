import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PageShell } from "./components/PageShell";
import { RequireAuth } from "./components/RequireAuth";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Upload } from "./pages/Upload";
import { Match } from "./pages/Match";
import { Rewrite } from "./pages/Rewrite";
import { InterviewPrep } from "./pages/InterviewPrep";
import { CareerAgent } from "./pages/CareerAgent";
import { SupervisorAgent } from "./pages/SupervisorAgent";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            element={
              <RequireAuth>
                <PageShell />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/match" element={<Match />} />
            <Route path="/rewrite" element={<Rewrite />} />
            <Route path="/interview" element={<InterviewPrep />} />
            <Route path="/career-agent" element={<CareerAgent />} />
            <Route path="/supervisor-agent" element={<SupervisorAgent />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;