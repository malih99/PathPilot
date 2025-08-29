import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPro from "./pages/DashboardPro.jsx";
import LearningPaths from "./pages/LearningPaths";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPro />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paths"
        element={
          <ProtectedRoute>
            <LearningPaths />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
