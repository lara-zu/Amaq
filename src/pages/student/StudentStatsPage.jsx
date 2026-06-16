import { useState, useEffect } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import StatCard from "../../components/student/shared/StatCard";
import API_URL from "../../api.js";

const SUBJECT_COLORS = {
  Algebra:    "#63B3ED",
  Geometry:   "#F6AD55",
  Arithmetic: "#68D391",
  Statistics: "#FC8181",
};

const StudentStatsPage = ({ user }) => {
  const [attempts, setAttempts] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetchAttempts = async () => {
    setLoading(true);
    try {
      const result = await fetch(`${API_URL}/api/attempts/${user?.id}`);
      if (!result.ok) throw new Error("Failed to fetch attempts.");
      const data = await result.json();
      setAttempts(data);
    } catch (err) {
      setError("Failed to load stats. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  const totalStars   = user?.stars ?? 0;
  const quizzesTaken = attempts.length;
  const avgScore     = attempts.length > 0
    ? Math.round(attempts.reduce((s, a) => s + (a.score / a.total_questions) * 100, 0) / attempts.length)
    : 0;

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-ocean-dark">
      <StudentFrame tint="purple" />

      <div className="relative z-20">
        <StudentPageHeader
          title="My Stats"
          subtitle="Mission Logs"
          backTo="/home"
          stars={totalStars}
          accentColor="#a78bfa"
        />

        <div className="px-10 pb-12 max-w-2xl mx-auto">
          <p className="text-white/30 text-center text-sm tracking-wide mb-8">
            Explorer <span className="text-white/60 font-bold">{user?.firstName || user?.email?.split("@")[0] || "Student"}</span>
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <StatCard label="Total Stars"   value={totalStars.toLocaleString()} icon="⭐" color="#FBD25A" />
            <StatCard label="Quizzes Taken" value={quizzesTaken}                icon="📋" color="#63B3ED" />
            <StatCard label="Avg Score"     value={`${avgScore}%`}              icon="🎯" color="#68D391" />
          </div>

          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-bold mb-4">Recent Attempts</p>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin" />
            </div>
          )}

          {error && (
            <p className="text-red-400 text-center py-12">{error}</p>
          )}

          {!loading && !error && attempts.length === 0 && (
            <div className="text-center py-12 rounded-2xl glass-panel">
              <p className="text-white/25 tracking-widest uppercase text-sm">No quizzes taken yet.</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {attempts.map((attempt, index) => {
              const pct   = Math.round((attempt.score / attempt.total_questions) * 100);
              const color = SUBJECT_COLORS[attempt.subject] || "#63B3ED";
              return (
                <div key={index} className="attempt-row flex items-center gap-4 px-5 py-4 rounded-2xl">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{attempt.quiz_title}</p>
                    <p className="text-white/35 text-xs mt-0.5">{formatDate(attempt.attempted_at)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-white font-black text-sm">{attempt.score}/{attempt.total_questions}</span>
                    <div className="w-24 h-1.5 progress-bar-track">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-yellow-300 font-black text-sm">+{attempt.stars_earned}</span>
                    <span className="text-base">⭐</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatsPage;
