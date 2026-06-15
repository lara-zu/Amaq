import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MOCK_LESSONS = [
  { id: 1, title: "Introduction to Algebra", subject: "Algebra", youtube_url: "https://www.youtube.com/watch?v=NybHckSEQBI", youtube_thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/hqdefault.jpg", description: "Learn the basics of algebraic expressions and equations.", quiz_id: 1 },
  { id: 2, title: "Pythagorean Theorem", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", youtube_thumbnail: "https://img.youtube.com/vi/AA6RfgP-AHU/hqdefault.jpg", description: "Discover the relationship between sides of a right triangle.", quiz_id: 2 },
  { id: 3, title: "Fractions & Decimals", subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=3minq9_ob-k", youtube_thumbnail: "https://img.youtube.com/vi/3minq9_ob-k/hqdefault.jpg", description: "Master converting and computing with fractions and decimals.", quiz_id: null },
  { id: 4, title: "Linear Equations", subject: "Algebra", youtube_url: "https://www.youtube.com/watch?v=9IUEk9fn2Vs", youtube_thumbnail: "https://img.youtube.com/vi/9IUEk9fn2Vs/hqdefault.jpg", description: "Solve for x and understand the slope-intercept form.", quiz_id: 3 },
  { id: 5, title: "Area & Perimeter", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=AAB0WhKWkmo", youtube_thumbnail: "https://img.youtube.com/vi/AAB0WhKWkmo/hqdefault.jpg", description: "Calculate areas and perimeters of common 2D shapes.", quiz_id: null },
  { id: 6, title: "Probability Basics", subject: "Statistics", youtube_url: "https://www.youtube.com/watch?v=KzfWUEJjG18", youtube_thumbnail: "https://img.youtube.com/vi/KzfWUEJjG18/hqdefault.jpg", description: "Understand chance, outcomes, and basic probability rules.", quiz_id: null },
  { id: 7, title: "Multiplication & Division", subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=mvOkMYCygps", youtube_thumbnail: "https://img.youtube.com/vi/mvOkMYCygps/hqdefault.jpg", description: "Strengthen your multiplication tables and long division skills.", quiz_id: null },
  { id: 8, title: "Angles & Triangles", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=mLeNaZD2sMQ", youtube_thumbnail: "https://img.youtube.com/vi/mLeNaZD2sMQ/hqdefault.jpg", description: "Explore types of angles and triangle classification.", quiz_id: null },
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
  const { id }                  = useParams();
  const navigate                = useNavigate();
  const [lesson, setLesson]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

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

  const color = lesson ? (SUBJECT_COLORS[lesson.subject] || "#63B3ED") : "#63B3ED";
  const videoId = lesson ? getYouTubeId(lesson.youtube_url) : null;

  if (loading) return (
    <div className="w-full min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #020a18, #051e45)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
        <p className="text-cyan-400/60 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="w-full min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #020a18, #051e45)" }}>
      <p className="text-red-400 text-center tracking-wide">{error}</p>
    </div>
  );

  if (!lesson) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #020a18 0%, #03152e 15%, #051e45 40%, #083560 100%)" }}>

      {/* Light rays */}
      {[10, 40, 70, 90].map((left, i) => (
        <div key={i} className="absolute top-0 pointer-events-none"
          style={{ left: `${left}%`, width: 50, height: "40%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 3 + 2)}deg)`,
            transformOrigin: "top center" }} />
      ))}

      {/* Frame vignette */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 12px #080f1e, inset 0 0 0 16px #111e30, inset 0 0 100px 50px rgba(0,4,12,0.8)" }} />

      {/* Frame bolts */}
      {["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 rounded-full pointer-events-none z-20`}
          style={{ background: "radial-gradient(circle at 35% 30%, #8896a8, #3a4555)", border: "1.5px solid #5a6575" }} />
      ))}

      <div className="relative z-20 max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <button onClick={() => navigate("/student/lessons")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl mb-8 transition-all hover:-translate-x-1"
          style={{ background: "rgba(8,16,32,0.8)", border: "1px solid rgba(99,179,237,0.2)", color: "#63B3ED" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-xs font-bold tracking-widest uppercase">Back to Lessons</span>
        </button>

        {/* Subject badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase"
            style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}>
            {lesson.subject}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white font-black text-3xl uppercase tracking-wide mb-6"
          style={{ textShadow: `0 0 30px ${color}55` }}>
          {lesson.title}
        </h1>

        {/* Video player */}
        {videoId && (
          <div className="relative w-full rounded-2xl overflow-hidden mb-6"
            style={{ paddingBottom: "56.25%", border: `1.5px solid ${color}33`,
              boxShadow: `0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)` }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Description */}
        <div className="rounded-xl p-5 mb-6"
          style={{ background: "rgba(8,16,32,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-white/60 text-sm leading-relaxed tracking-wide">{lesson.description}</p>
        </div>

        {/* Go to quiz button */}
        {lesson.quiz_id && (
          <button
            onClick={() => navigate(`/student/quizzes/${lesson.quiz_id}`)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #f6c90e, #e0a800)",
              boxShadow: "0 4px 24px rgba(246,201,14,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
              color: "#1a1200" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Take the Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentLessonDetailPage;
