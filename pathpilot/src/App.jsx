import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPro from "./pages/DashboardPro.jsx";
import LearningPaths from "./pages/LearningPaths";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CalendarPro from "./pages/CalendarPro.jsx";
import MessagesPro from "./pages/MessagePro.jsx";
import ReportsPro from "./pages/ReportsPro.jsx";
import ProfilePro from "./pages/ProfilePro.jsx";
import SettingsPro from "./pages/SettingsPro.jsx";
import AchievementsPro from "./pages/AchievementsPro.jsx";
import ResourcesPro from "./pages/ResourcesPro.jsx";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <AchievementsPro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <ResourcesPro />
          </ProtectedRoute>
        }
      />

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
