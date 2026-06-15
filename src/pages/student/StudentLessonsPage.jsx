import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_LESSONS = [
  { id: 1, title: "Introduction to Algebra", subject: "Algebra", youtube_url: "https://www.youtube.com/watch?v=NybHckSEQBI", youtube_thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/hqdefault.jpg", description: "Learn the basics of algebraic expressions and equations." },
  { id: 2, title: "Pythagorean Theorem", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", youtube_thumbnail: "https://img.youtube.com/vi/AA6RfgP-AHU/hqdefault.jpg", description: "Discover the relationship between sides of a right triangle." },
  { id: 3, title: "Fractions & Decimals", subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=3minq9_ob-k", youtube_thumbnail: "https://img.youtube.com/vi/3minq9_ob-k/hqdefault.jpg", description: "Master converting and computing with fractions and decimals." },
  { id: 4, title: "Linear Equations", subject: "Algebra", youtube_url: "https://www.youtube.com/watch?v=9IUEk9fn2Vs", youtube_thumbnail: "https://img.youtube.com/vi/9IUEk9fn2Vs/hqdefault.jpg", description: "Solve for x and understand the slope-intercept form." },
  { id: 5, title: "Area & Perimeter", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=AAB0WhKWkmo", youtube_thumbnail: "https://img.youtube.com/vi/AAB0WhKWkmo/hqdefault.jpg", description: "Calculate areas and perimeters of common 2D shapes." },
  { id: 6, title: "Probability Basics", subject: "Statistics", youtube_url: "https://www.youtube.com/watch?v=KzfWUEJjG18", youtube_thumbnail: "https://img.youtube.com/vi/KzfWUEJjG18/hqdefault.jpg", description: "Understand chance, outcomes, and basic probability rules." },
  { id: 7, title: "Multiplication & Division", subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=mvOkMYCygps", youtube_thumbnail: "https://img.youtube.com/vi/mvOkMYCygps/hqdefault.jpg", description: "Strengthen your multiplication tables and long division skills." },
  { id: 8, title: "Angles & Triangles", subject: "Geometry", youtube_url: "https://www.youtube.com/watch?v=mLeNaZD2sMQ", youtube_thumbnail: "https://img.youtube.com/vi/mLeNaZD2sMQ/hqdefault.jpg", description: "Explore types of angles and triangle classification." },
];

const SUBJECT_COLORS = {
  Algebra:    { label: "#63B3ED", glow: "rgba(99,179,237,0.6)",  bg: "rgba(99,179,237,0.15)"  },
  Geometry:   { label: "#F6AD55", glow: "rgba(246,173,85,0.6)",  bg: "rgba(246,173,85,0.15)"  },
  Arithmetic: { label: "#68D391", glow: "rgba(104,211,145,0.6)", bg: "rgba(104,211,145,0.15)" },
  Statistics: { label: "#FC8181", glow: "rgba(252,129,129,0.6)", bg: "rgba(252,129,129,0.15)" },
};

const BOLTS = ["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"];

const LessonCard = ({ lesson, onSelect }) => {
  const color = SUBJECT_COLORS[lesson.subject] || SUBJECT_COLORS["Algebra"];

  return (
    <div
      onClick={() => onSelect(lesson)}
      className="relative cursor-pointer group"
      style={{ borderRadius: 12 }}
    >
      {/* Card frame */}
      <div
        className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2"
        style={{
          background: "linear-gradient(145deg, #0d1f3c, #0a1628)",
          border: `1.5px solid ${color.label}55`,
          borderRadius: 12,
          boxShadow: `0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
      >
        {/* Corner bolts */}
        {BOLTS.map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2.5 h-2.5 rounded-full z-10`}
            style={{ background: "radial-gradient(circle at 35% 30%, #8896a8, #3a4555)", border: "1px solid #5a6575" }} />
        ))}

        {/* Subject label bar */}
        <div className="relative px-3 py-1.5 flex items-center justify-between"
          style={{ background: color.bg, borderBottom: `1px solid ${color.label}33` }}>
          <span className="text-[9px] font-black tracking-[0.25em] uppercase" style={{ color: color.label }}>
            Lesson Card: {lesson.subject}
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color.label, boxShadow: `0 0 6px ${color.glow}` }} />
        </div>

        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ height: 130 }}>
          <img
            src={lesson.youtube_thumbnail}
            alt={lesson.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Scan line overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)" }} />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: color.label, boxShadow: `0 0 24px ${color.glow}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a1628">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-3 py-3">
          <p className="text-white font-black text-sm leading-tight uppercase tracking-wide text-center"
            style={{ textShadow: `0 0 12px ${color.glow}` }}>
            {lesson.title}
          </p>
        </div>
      </div>
    </div>
  );
};

const StudentLessonsPage = ({ user }) => {
  const [lessons, setLessons]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [filter, setFilter]     = useState("All");
  const navigate = useNavigate();

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const result = await fetch("http://localhost:5000/api/lessons");
      if (!result.ok) throw new Error("Failed to fetch");
      const data = await result.json();
      setLessons(data);
    } catch (err) {
      // Fall back to mock data while backend isn't ready
      setLessons(MOCK_LESSONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const subjects = ["All", ...Array.from(new Set(lessons.map((l) => l.subject)))];
  const visible  = filter === "All" ? lessons : lessons.filter((l) => l.subject === filter);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #020a18 0%, #03152e 15%, #051e45 40%, #083560 70%, #0a3d55 100%)" }}
    >
      {/* Light rays */}
      {[8, 25, 50, 75, 92].map((left, i) => (
        <div key={i} className="absolute top-0 pointer-events-none"
          style={{ left: `${left}%`, width: 60, height: "50%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 2 + 3)}deg)`,
            transformOrigin: "top center" }} />
      ))}

      {/* Viewport frame vignette */}
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 12px #080f1e, inset 0 0 0 16px #111e30, inset 0 0 120px 60px rgba(0,4,12,0.85)" }} />

      {/* Frame bolts */}
      {["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 rounded-full pointer-events-none z-20`}
          style={{ background: "radial-gradient(circle at 35% 30%, #8896a8, #3a4555)", border: "1.5px solid #5a6575", boxShadow: "0 2px 6px rgba(0,0,0,0.7)" }} />
      ))}

      {/* Header */}
      <div className="relative z-20 pt-8 pb-4 px-8 flex items-center justify-between">
        {/* Back button */}
        <button onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:-translate-x-1"
          style={{ background: "rgba(8,16,32,0.8)", border: "1px solid rgba(99,179,237,0.2)", color: "#63B3ED" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-xs font-bold tracking-widest uppercase">Back</span>
        </button>

        {/* Title */}
        <div className="text-center">
          <p className="text-cyan-400/50 text-[9px] tracking-[0.4em] uppercase font-bold mb-1">Mission Control</p>
          <h1 className="text-white font-black text-2xl tracking-widest uppercase"
            style={{ textShadow: "0 0 30px rgba(99,179,237,0.5)" }}>
            Lessons
          </h1>
        </div>

        {/* Stars HUD */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ background: "rgba(8,16,32,0.8)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <span className="text-2xl" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}>⭐</span>
          <span className="text-white font-black text-lg">{(user?.stars ?? 0).toLocaleString()}</span>
        </div>
      </div>

      {/* Subject filter tabs */}
      <div className="relative z-20 px-8 pb-6 flex gap-2 flex-wrap">
        {subjects.map((sub, index) => {
          const color = sub === "All" ? { label: "#a0aec0", bg: "rgba(160,174,192,0.12)" } : (SUBJECT_COLORS[sub] || SUBJECT_COLORS["Algebra"]);
          const active = filter === sub;
          return (
            <button key={index} onClick={() => setFilter(sub)}
              className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
              style={{
                background: active ? color.bg : "rgba(255,255,255,0.04)",
                border: `1px solid ${active ? color.label : "rgba(255,255,255,0.1)"}`,
                color: active ? color.label : "rgba(255,255,255,0.4)",
                boxShadow: active ? `0 0 12px ${color.label}44` : "none",
              }}>
              {sub}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-20 px-8 pb-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
            <p className="text-cyan-400/60 text-sm tracking-widest uppercase">Loading Lessons...</p>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-center py-12 tracking-wide">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {visible.map((lesson, index) => (
              <LessonCard
                key={index}
                lesson={lesson}
                onSelect={(l) => navigate(`/student/lessons/${l.id}`)}
              />
            ))}
          </div>
        )}

        {!loading && !error && visible.length === 0 && (
          <p className="text-white/30 text-center py-20 tracking-widest uppercase text-sm">No lessons found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentLessonsPage;
