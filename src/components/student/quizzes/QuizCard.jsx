import { useNavigate } from "react-router-dom";

const CARD_COLORS = [
  { accent: "#63B3ED", dark: "#1a3a5c", glow: "rgba(99,179,237,0.5)"   },
  { accent: "#F6AD55", dark: "#5c3d1a", glow: "rgba(246,173,85,0.5)"   },
  { accent: "#68D391", dark: "#1a4a2a", glow: "rgba(104,211,145,0.5)"  },
  { accent: "#FC8181", dark: "#5c1a1a", glow: "rgba(252,129,129,0.5)"  },
  { accent: "#B794F4", dark: "#3d1a5c", glow: "rgba(183,148,244,0.5)"  },
  { accent: "#76E4F7", dark: "#1a4a5c", glow: "rgba(118,228,247,0.5)"  },
];

const BOLT_POSITIONS = ["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"];

const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();
  const color    = CARD_COLORS[quiz.id % CARD_COLORS.length];

  return (
    <div
      onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
      className="relative cursor-pointer group"
    >
      <div
        className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover:-translate-y-2"
        style={{
          background: `linear-gradient(145deg, ${color.dark}cc, #0a1628ee)`,
          border: `1.5px solid ${color.accent}44`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
        }}
      >
        {BOLT_POSITIONS.map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 rounded-full z-10 card-bolt`} />
        ))}

        <div
          className="px-3 py-1.5 flex items-center justify-between"
          style={{ background: `${color.accent}15`, borderBottom: `1px solid ${color.accent}22` }}
        >
          <span className="text-[9px] font-black tracking-[0.2em] uppercase" style={{ color: color.accent }}>
            Quiz · {quiz.subject}
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: color.accent, boxShadow: `0 0 6px ${color.glow}` }}
          />
        </div>

        <div className="px-4 py-5 flex flex-col items-center gap-3">
          <p
            className="text-white font-black text-xs uppercase tracking-wide text-center leading-snug"
            style={{ textShadow: `0 0 14px ${color.glow}` }}
          >
            {quiz.title}
          </p>

          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide text-white/45 border border-white/10"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              {quiz.questions_count} Qs
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide flex items-center gap-1 text-yellow-300"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.18)" }}>
              ⭐ {quiz.stars_reward}
            </span>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div
            className="flex items-center justify-center gap-2 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase text-white transition-all group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${color.accent}, ${color.dark}bb)`, boxShadow: `0 3px 14px ${color.glow}` }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Quiz
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
