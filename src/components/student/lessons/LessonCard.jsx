import { useNavigate } from "react-router-dom";

const SUBJECT_COLORS = {
  Algebra:    { label: "#63B3ED", glow: "rgba(99,179,237,0.6)",  bg: "rgba(99,179,237,0.12)"  },
  Geometry:   { label: "#F6AD55", glow: "rgba(246,173,85,0.6)",  bg: "rgba(246,173,85,0.12)"  },
  Arithmetic: { label: "#68D391", glow: "rgba(104,211,145,0.6)", bg: "rgba(104,211,145,0.12)" },
  Statistics: { label: "#FC8181", glow: "rgba(252,129,129,0.6)", bg: "rgba(252,129,129,0.12)" },
};

const BOLT_POSITIONS = ["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"];

const LessonCard = ({ lesson }) => {
  const navigate = useNavigate();
  const color    = SUBJECT_COLORS[lesson.subject] || SUBJECT_COLORS["Algebra"];

  return (
    <div
      onClick={() => navigate(`/student/lessons/${lesson.id}`)}
      className="relative cursor-pointer group"
    >
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:-translate-y-2 ocean-card"
        style={{ border: `1.5px solid ${color.label}44` }}
      >
        {BOLT_POSITIONS.map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 rounded-full z-10 card-bolt`} />
        ))}

        <div
          className="px-3 py-1.5 flex items-center justify-between"
          style={{ background: color.bg, borderBottom: `1px solid ${color.label}22` }}
        >
          <span className="text-[9px] font-black tracking-[0.2em] uppercase" style={{ color: color.label }}>
            Lesson · {lesson.subject}
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color.label, boxShadow: `0 0 6px ${color.glow}` }} />
        </div>

        <div className="relative overflow-hidden" style={{ height: 120 }}>
          <img
            src={lesson.youtube_thumbnail}
            alt={lesson.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 pointer-events-none scanline" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.35)" }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: color.label, boxShadow: `0 0 20px ${color.glow}` }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a1628">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="px-3 py-3">
          <p
            className="text-white font-black text-xs leading-snug uppercase tracking-wide text-center"
            style={{ textShadow: `0 0 10px ${color.glow}` }}
          >
            {lesson.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
