import { Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProtectedRoute({ children }) {
  const session = useSession();
  if (session === undefined) return null; // یا اسکلتی لودینگ
  return session ? children : <Navigate to="/login" replace />;
}
