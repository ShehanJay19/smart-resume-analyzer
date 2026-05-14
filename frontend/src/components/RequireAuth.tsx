import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
