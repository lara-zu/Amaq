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
import ProfilePage from "./pages/teacher/ProfilePage";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentLessonsPage from "./pages/student/StudentLessonsPage";
import StudentLessonDetailPage from "./pages/student/StudentLessonDetailPage";
import StudentQuizzesPage from "./pages/student/StudentQuizzesPage";
import StudentQuizSessionPage from "./pages/student/StudentQuizSessionPage";
import StudentStatsPage from "./pages/student/StudentStatsPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";

function App() {
  const [user, setUser] = useState(null);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

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
        <Route path="/dashboard" element={
          <ProtectedRoute user={user} requiredRole="teacher">
            <TeacherLayout user={user} onLogout={handleLogout}>
              <DashboardPage user={user} />
            </TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/students" element={
          <ProtectedRoute user={user} requiredRole="teacher">
            <TeacherLayout user={user} onLogout={handleLogout}>
              <StudentsPage user={user} />
            </TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/lessons" element={
          <ProtectedRoute user={user} requiredRole="teacher">
            <TeacherLayout user={user} onLogout={handleLogout}>
              <LessonsPage user={user} />
            </TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/quizzes" element={
          <ProtectedRoute user={user} requiredRole="teacher">
            <TeacherLayout user={user} onLogout={handleLogout}>
              <QuizzesPage user={user} />
            </TeacherLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute user={user} requiredRole="teacher">
            <TeacherLayout user={user} onLogout={handleLogout}>
              <ProfilePage user={user} onUpdateUser={handleUpdateUser} />
            </TeacherLayout>
          </ProtectedRoute>
        } />

        {/* Student routes */}
        <Route path="/home" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentHomePage user={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/lessons" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentLessonsPage user={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/lessons/:id" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentLessonDetailPage user={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/quizzes" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentQuizzesPage user={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/quizzes/:id" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentQuizSessionPage user={user} onUpdateUser={handleUpdateUser} />
          </ProtectedRoute>
        } />
        <Route path="/student/stats" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentStatsPage user={user} />
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute user={user} requiredRole="student">
            <StudentProfilePage user={user} onUpdateUser={handleUpdateUser} />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
