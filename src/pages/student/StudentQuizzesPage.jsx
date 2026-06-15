import { useState, useEffect } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import QuizCard from "../../components/student/quizzes/QuizCard";

const MOCK_QUIZZES = [
  { id: 1, title: "Algebra Fundamentals", subject: "Algebra",    questions_count: 5,  stars_reward: 5  },
  { id: 2, title: "Pythagorean Theorem",  subject: "Geometry",   questions_count: 6,  stars_reward: 6  },
  { id: 3, title: "Linear Equations",     subject: "Algebra",    questions_count: 8,  stars_reward: 8  },
  { id: 4, title: "Circle Theorems",      subject: "Geometry",   questions_count: 5,  stars_reward: 5  },
  { id: 5, title: "Fractions Sprint",     subject: "Arithmetic", questions_count: 10, stars_reward: 10 },
  { id: 6, title: "Probability Basics",   subject: "Statistics", questions_count: 6,  stars_reward: 6  },
  { id: 7, title: "Coordinate Geometry",  subject: "Geometry",   questions_count: 7,  stars_reward: 7  },
  { id: 8, title: "Number Patterns",      subject: "Arithmetic", questions_count: 5,  stars_reward: 5  },
];

const StudentQuizzesPage = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const result = await fetch("http://localhost:5000/api/quizzes");
      if (!result.ok) throw new Error("Failed to fetch");
      const data = await result.json();
      setQuizzes(data);
    } catch (err) {
      setQuizzes(MOCK_QUIZZES);
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
            <p className="text-red-400 text-center py-12 tracking-wide">Error: {error}</p>
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
