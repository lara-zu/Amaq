import { useState, useEffect } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import LessonCard from "../../components/student/lessons/LessonCard";
import API_URL from "../../api.js";

const StudentLessonsPage = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const grade = user?.grade ? `?grade=${user.grade}` : "";
      const result = await fetch(`${API_URL}/api/lessons${grade}`);
      if (!result.ok) throw new Error("Failed to fetch lessons.");
      const data = await result.json();
      setLessons(data);
    } catch (err) {
      setError("Failed to load lessons. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-ocean-deep">
      <StudentFrame tint="blue" />

      <div className="relative z-20">
        <StudentPageHeader
          title="Lessons"
          subtitle="Mission Control"
          backTo="/home"
          stars={user?.stars ?? 0}
          accentColor="#63B3ED"
        />

        <div className="px-10 pb-12">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              <p className="text-cyan-400/60 text-sm tracking-widest uppercase">Loading Lessons...</p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-center py-12 tracking-wide">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {lessons.map((lesson, index) => (
                <LessonCard key={index} lesson={lesson} />
              ))}
            </div>
          )}

          {!loading && !error && lessons.length === 0 && (
            <p className="text-white/30 text-center py-20 tracking-widest uppercase text-sm">No lessons yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLessonsPage;
