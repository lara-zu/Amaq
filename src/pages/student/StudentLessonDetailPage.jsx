import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";

const MOCK_LESSONS = [
  { id: 1, title: "Introduction to Algebra",   subject: "Algebra",    youtube_url: "https://www.youtube.com/watch?v=NybHckSEQBI", description: "Learn the basics of algebraic expressions and equations.", quiz_id: 1 },
  { id: 2, title: "Pythagorean Theorem",        subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", description: "Discover the relationship between sides of a right triangle.", quiz_id: 2 },
  { id: 3, title: "Fractions & Decimals",       subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=3minq9_ob-k", description: "Master converting and computing with fractions and decimals.", quiz_id: null },
  { id: 4, title: "Linear Equations",           subject: "Algebra",    youtube_url: "https://www.youtube.com/watch?v=9IUEk9fn2Vs", description: "Solve for x and understand the slope-intercept form.", quiz_id: 3 },
  { id: 5, title: "Area & Perimeter",           subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=AAB0WhKWkmo", description: "Calculate areas and perimeters of common 2D shapes.", quiz_id: null },
  { id: 6, title: "Probability Basics",         subject: "Statistics", youtube_url: "https://www.youtube.com/watch?v=KzfWUEJjG18", description: "Understand chance, outcomes, and basic probability rules.", quiz_id: null },
  { id: 7, title: "Multiplication & Division",  subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=mvOkMYCygps", description: "Strengthen your multiplication tables and long division skills.", quiz_id: null },
  { id: 8, title: "Angles & Triangles",         subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=mLeNaZD2sMQ", description: "Explore types of angles and triangle classification.", quiz_id: null },
];

const SUBJECT_COLORS = {
  Algebra:    "#63B3ED",
  Geometry:   "#F6AD55",
  Arithmetic: "#68D391",
  Statistics: "#FC8181",
};

const getYouTubeId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const StudentLessonDetailPage = ({ user }) => {
  const { id }                = useParams();
  const navigate              = useNavigate();
  const [lesson, setLesson]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchLesson = async () => {
    setLoading(true);
    try {
      const result = await fetch(`http://localhost:5000/api/lessons/${id}`);
      if (!result.ok) throw new Error("Not found");
      const data = await result.json();
      setLesson(data);
    } catch (err) {
      const found = MOCK_LESSONS.find((l) => l.id === parseInt(id));
      if (found) setLesson(found);
      else setError("Lesson not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [id]);

  if (loading) return (
    <div className="w-full min-h-screen flex items-center justify-center bg-ocean-dark">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="w-full min-h-screen flex items-center justify-center bg-ocean-dark">
      <p className="text-red-400">{error}</p>
    </div>
  );

  if (!lesson) return null;

  const color   = SUBJECT_COLORS[lesson.subject] || "#63B3ED";
  const videoId = getYouTubeId(lesson.youtube_url);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-ocean-dark">
      <StudentFrame tint="blue" />

      <div className="relative z-20">
        <StudentPageHeader
          title={lesson.title}
          subtitle={lesson.subject}
          backTo="/student/lessons"
          stars={user?.stars ?? 0}
          accentColor={color}
        />

        <div className="px-10 pb-12 max-w-4xl mx-auto">
          {videoId && (
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-6"
              style={{
                paddingBottom: "56.25%",
                border: `1.5px solid ${color}33`,
                boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
              }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="rounded-xl px-5 py-4 mb-6 glass-panel">
            <p className="text-white/60 text-sm leading-relaxed">{lesson.description}</p>
          </div>

          {lesson.quiz_id && (
            <button
              onClick={() => navigate(`/student/quizzes/${lesson.quiz_id}`)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #f6c90e, #e0a800)",
                boxShadow: "0 4px 24px rgba(246,201,14,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                color: "#1a1200",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Take the Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLessonDetailPage;
