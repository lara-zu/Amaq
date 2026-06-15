import { useState, useEffect } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import LessonCard from "../../components/student/lessons/LessonCard";

const MOCK_LESSONS = [
  { id: 1, title: "Introduction to Algebra",   subject: "Algebra",    youtube_url: "https://www.youtube.com/watch?v=NybHckSEQBI", youtube_thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/hqdefault.jpg"  },
  { id: 2, title: "Pythagorean Theorem",        subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=AA6RfgP-AHU", youtube_thumbnail: "https://img.youtube.com/vi/AA6RfgP-AHU/hqdefault.jpg"  },
  { id: 3, title: "Fractions & Decimals",       subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=3minq9_ob-k", youtube_thumbnail: "https://img.youtube.com/vi/3minq9_ob-k/hqdefault.jpg"  },
  { id: 4, title: "Linear Equations",           subject: "Algebra",    youtube_url: "https://www.youtube.com/watch?v=9IUEk9fn2Vs", youtube_thumbnail: "https://img.youtube.com/vi/9IUEk9fn2Vs/hqdefault.jpg"  },
  { id: 5, title: "Area & Perimeter",           subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=AAB0WhKWkmo", youtube_thumbnail: "https://img.youtube.com/vi/AAB0WhKWkmo/hqdefault.jpg"  },
  { id: 6, title: "Probability Basics",         subject: "Statistics", youtube_url: "https://www.youtube.com/watch?v=KzfWUEJjG18", youtube_thumbnail: "https://img.youtube.com/vi/KzfWUEJjG18/hqdefault.jpg"  },
  { id: 7, title: "Multiplication & Division",  subject: "Arithmetic", youtube_url: "https://www.youtube.com/watch?v=mvOkMYCygps", youtube_thumbnail: "https://img.youtube.com/vi/mvOkMYCygps/hqdefault.jpg"  },
  { id: 8, title: "Angles & Triangles",         subject: "Geometry",   youtube_url: "https://www.youtube.com/watch?v=mLeNaZD2sMQ", youtube_thumbnail: "https://img.youtube.com/vi/mLeNaZD2sMQ/hqdefault.jpg"  },
];

const StudentLessonsPage = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const result = await fetch("http://localhost:5000/api/lessons");
      if (!result.ok) throw new Error("Failed to fetch");
      const data = await result.json();
      setLessons(data);
    } catch (err) {
      setLessons(MOCK_LESSONS);
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
            <p className="text-red-400 text-center py-12 tracking-wide">Error: {error}</p>
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
