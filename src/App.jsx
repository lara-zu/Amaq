import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import TeacherLayout from "./components/teacher/TeacherLayout";
import DashboardPage from "./pages/teacher/DashboardPage";
import StudentsPage from "./pages/teacher/StudentsPage";
import LessonsPage from "./pages/teacher/LessonsPage";
import QuizzesPage from "./pages/teacher/QuizzesPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Teacher routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <TeacherLayout user={user} onLogout={handleLogout}>
                <DashboardPage user={user} />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <TeacherLayout user={user} onLogout={handleLogout}>
                <StudentsPage user={user} />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <TeacherLayout user={user} onLogout={handleLogout}>
                <LessonsPage user={user} />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <TeacherLayout user={user} onLogout={handleLogout}>
                <QuizzesPage user={user} />
              </TeacherLayout>
            </ProtectedRoute>
          }
        />

        {/* Student routes — coming soon */}
        <Route path="/home" element={<p className="p-10">Student home coming soon</p>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
