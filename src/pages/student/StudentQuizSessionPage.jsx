import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentFrame from "../../components/student/shared/StudentFrame";
import API_URL from "../../api.js";

const OPTION_COLORS = [
  { normal: "rgba(99,179,237,0.15)",  border: "#63B3ED" },
  { normal: "rgba(246,173,85,0.15)",  border: "#F6AD55" },
  { normal: "rgba(252,129,129,0.15)", border: "#FC8181" },
  { normal: "rgba(104,211,145,0.15)", border: "#68D391" },
];
const OPTION_LABELS = ["A", "B", "C", "D"];
const OPTION_KEYS   = ["a", "b", "c", "d"];
const TIME_PER_QUESTION = 15;

const StudentQuizSessionPage = ({ user, onUpdateUser }) => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [quiz, setQuiz]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [phase, setPhase]       = useState("loading");
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore]       = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [showFlash, setShowFlash] = useState(null);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const result = await fetch(`${API_URL}/api/quizzes/${id}`);
      if (!result.ok) throw new Error("Quiz not found.");
      const data = await result.json();
      setQuiz(data);
      setPhase("playing");
    } catch (err) {
      setError("Quiz not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (phase !== "playing" || answered) return;
    if (timeLeft <= 0) { handleAnswer(null); return; }
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, answered]);

  const handleAnswer = (key) => {
    if (answered) return;
    setAnswered(true);
    setSelected(key);
    const q = quiz.questions[current];
    const isCorrect = key === q.correct_option;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowFlash("correct");
    } else {
      setShowFlash("wrong");
    }
    setTimeout(() => {
      setShowFlash(null);
      if (current + 1 >= quiz.questions.length) {
        setPhase("result");
      } else {
        setCurrent((prev) => prev + 1);
        setAnswered(false);
        setSelected(null);
        setTimeLeft(TIME_PER_QUESTION);
      }
    }, 1200);
  };

  const handleCollect = async () => {
    try {
      const res = await fetch(`${API_URL}/api/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          quiz_id: id,
          score: score,
          total_questions: quiz.questions.length,
        }),
      });
      const data = await res.json();
      if (data.user && onUpdateUser) {
        onUpdateUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
    navigate("/student/quizzes");
  };

  if (loading || phase === "loading") return (
    <div className="w-full min-h-screen flex items-center justify-center bg-ocean-dark">
      <div className="w-10 h-10 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin" />
    </div>
  );

  if (error || !quiz) return (
    <div className="w-full min-h-screen flex items-center justify-center bg-ocean-dark">
      <p className="text-red-400">{error || "Quiz not found."}</p>
    </div>
  );

  // ── RESULT SCREEN ──────────────────────────────────────────────
  if (phase === "result") {
    const total = quiz.questions.length;
    const pct   = Math.round((score / total) * 100);
    const grade = pct >= 80 ? "Amazing!" : pct >= 50 ? "Good Job!" : "Keep Trying!";
    const gradeColor = pct >= 80 ? "#68D391" : pct >= 50 ? "#F6AD55" : "#FC8181";

    return (
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-ocean-dark">
        <StudentFrame tint="blue" />
        <div className="relative z-20 flex flex-col items-center gap-6 px-8 text-center max-w-md">
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-bold">Quiz Complete</p>
          <h2 className="text-5xl font-black" style={{ color: gradeColor, textShadow: `0 0 40px ${gradeColor}88` }}>
            {grade}
          </h2>

          <div
            className="w-36 h-36 rounded-full flex flex-col items-center justify-center quiz-result-ring"
            style={{ border: `3px solid ${gradeColor}`, boxShadow: `0 0 40px ${gradeColor}44` }}
          >
            <span className="text-4xl font-black text-white">{score}/{total}</span>
            <span className="text-xs text-white/40 tracking-widest uppercase mt-1">{pct}%</span>
          </div>

          <div className="flex flex-col items-center gap-1 px-8 py-4 rounded-2xl quiz-stars-box">
            <span className="text-4xl" style={{ filter: "drop-shadow(0 0 12px rgba(251,191,36,0.9))" }}>⭐</span>
            <span className="text-yellow-300 font-black text-2xl">+{score} Stars</span>
            <span className="text-white/40 text-xs tracking-wider">Added to your total</span>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => navigate("/student/quizzes")}
              className="flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 text-white/60 border border-white/10"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              All Quizzes
            </button>
            <button
              onClick={handleCollect}
              className="flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-1 text-yellow-900"
              style={{ background: "linear-gradient(135deg, #f6c90e, #e0a800)", boxShadow: "0 4px 20px rgba(246,201,14,0.5)" }}
            >
              Collect Stars
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING ────────────────────────────────────────────────────
  const q       = quiz.questions[current];
  const total   = quiz.questions.length;
  const options = OPTION_KEYS.map((key, i) => ({ key, text: q[`option_${key}`], color: OPTION_COLORS[i] }));
  const timerPct  = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor= timeLeft > 8 ? "#68D391" : timeLeft > 4 ? "#F6AD55" : "#FC8181";

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-ocean-dark">
      <StudentFrame tint="blue" />

      {showFlash && (
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{ background: showFlash === "correct" ? "rgba(104,211,145,0.15)" : "rgba(252,129,129,0.15)" }}
        />
      )}

      {/* HUD */}
      <div className="relative z-20 pt-6 px-10 flex items-center gap-4">
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold">
              Question {current + 1} of {total}
            </span>
            <span className="text-white/40 text-[10px] tracking-widest uppercase font-bold">Score: {score}</span>
          </div>
          <div className="h-1.5 progress-bar-track">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${(current / total) * 100}%`, background: "linear-gradient(to right, #63B3ED, #68D391)" }}
            />
          </div>
        </div>

        {/* Countdown ring */}
        <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
          <svg className="absolute inset-0 -rotate-90" width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct / 100)}`}
              style={{ transition: "stroke-dashoffset 0.9s linear", filter: `drop-shadow(0 0 6px ${timerColor})` }}
            />
          </svg>
          <span className="font-black text-lg" style={{ color: timerColor }}>{timeLeft}</span>
        </div>
      </div>

      {/* Question + options */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-10 py-8 gap-8">
        <div className="w-full max-w-xl px-8 py-6 rounded-2xl text-center quiz-question-box">
          <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-bold mb-3">{quiz.title}</p>
          <p className="text-white font-black text-xl leading-snug">{q.question_text}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
          {options.map((opt, index) => {
            const isSelected  = selected === opt.key;
            const isCorrect   = opt.key === q.correct_option;
            const showCorrect = answered && isCorrect;
            const showWrong   = answered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(opt.key)}
                disabled={answered}
                className="relative px-5 py-4 rounded-2xl font-black text-base text-left text-white transition-all duration-200 disabled:cursor-default"
                style={{
                  background: showCorrect ? "rgba(104,211,145,0.3)" : showWrong ? "rgba(252,129,129,0.3)" : opt.color.normal,
                  border: `2px solid ${showCorrect ? "#68D391" : showWrong ? "#FC8181" : opt.color.border}`,
                  boxShadow: showCorrect ? "0 0 24px rgba(104,211,145,0.5)" : showWrong ? "0 0 24px rgba(252,129,129,0.5)" : "none",
                  transform: isSelected && answered ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span className="text-xs font-black mr-2 opacity-60">{OPTION_LABELS[index]}</span>
                {opt.text}
                {showCorrect && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">✓</span>}
                {showWrong   && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl">✗</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizSessionPage;
