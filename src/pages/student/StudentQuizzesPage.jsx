import { useState, useEffect } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import QuizCard from "../../components/student/quizzes/QuizCard";
import API_URL from "../../api.js";

const StudentQuizzesPage = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const grade = user?.grade ? `?grade=${user.grade}` : "";
      const result = await fetch(`${API_URL}/api/quizzes${grade}`);
      if (!result.ok) throw new Error("Failed to fetch quizzes.");
      const data = await result.json();
      setQuizzes(data);
    } catch (err) {
      setError("Failed to load quizzes. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-ocean-quiz">
      <StudentFrame tint="gold" />

      <div className="relative z-20">
        <StudentPageHeader
          title="Quizzes"
          subtitle="Quiz Sanctuary"
          backTo="/home"
          stars={user?.stars ?? 0}
          accentColor="#F6AD55"
        />

        <div className="px-10 pb-12">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin" />
              <p className="text-yellow-400/60 text-sm tracking-widest uppercase">Loading Quizzes...</p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-center py-12 tracking-wide">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {quizzes.map((quiz, index) => (
                <QuizCard key={index} quiz={quiz} />
              ))}
            </div>
          )}

          {!loading && !error && quizzes.length === 0 && (
            <p className="text-white/30 text-center py-20 tracking-widest uppercase text-sm">No quizzes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzesPage;
