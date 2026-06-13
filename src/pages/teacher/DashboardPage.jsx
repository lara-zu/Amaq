import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const trendUp = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const arrowRight = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const StatCard = ({ label, value, sub, gradient, icon }) => (
  <div className={`relative rounded-2xl p-6 overflow-hidden ${gradient} text-white`}>
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
    <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full bg-white/10 translate-y-6" />
    <div className="relative">
      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-3xl font-black mb-1">{value}</p>
      <p className="text-white/80 text-sm font-medium">{label}</p>
      {sub && (
        <div className="flex items-center gap-1 mt-3 text-white/70 text-xs font-semibold">
          {trendUp}
          {sub}
        </div>
      )}
    </div>
  </div>
);

const DashboardPage = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [sRes, lRes, qRes] = await Promise.all([
        fetch("http://localhost:5000/api/users"),
        fetch("http://localhost:5000/api/lessons"),
        fetch("http://localhost:5000/api/quizzes"),
      ]);
      const [sData, lData, qData] = await Promise.all([sRes.json(), lRes.json(), qRes.json()]);
      setStudents(Array.isArray(sData) ? sData.filter((u) => u.role === "student") : []);
      setLessons(Array.isArray(lData) ? lData : []);
      setQuizzes(Array.isArray(qData) ? qData : []);
    } catch (err) {
      setError("Could not load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const recentStudents = students.slice(0, 6);
  const totalStars = students.reduce((acc, s) => acc + (s.stars || 0), 0);

  const statsData = [
    {
      label: "Total Students",
      value: students.length,
      sub: "enrolled in class",
      gradient: "bg-gradient-to-br from-brand-blue to-blue-400",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      label: "Lessons Published",
      value: lessons.length,
      sub: "video lessons live",
      gradient: "bg-gradient-to-br from-slate-700 to-slate-500",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    },
    {
      label: "Quizzes Created",
      value: quizzes.length,
      sub: "across all lessons",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-400",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    },
    {
      label: "Stars Awarded",
      value: totalStars,
      sub: "earned by students",
      gradient: "bg-gradient-to-br from-brand-pink to-rose-400",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Students table */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Recent Students</h2>
              <p className="text-xs text-gray-400 mt-0.5">Latest enrollments</p>
            </div>
            <Link
              to="/students"
              className="flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:gap-2.5 transition-all"
            >
              View all {arrowRight}
            </Link>
          </div>
          <div>
            {recentStudents.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <p className="text-sm font-semibold text-gray-400">No students yet</p>
              </div>
            ) : (
              recentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue/20 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-blue text-xs font-black">
                        {student.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{student.email?.split("@")[0]}</p>
                      <p className="text-xs text-gray-400">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-brand-pink/10 text-brand-pink text-xs font-bold px-2.5 py-1 rounded-lg">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {student.stars || 0}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick actions + recent lessons */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm">Quick Actions</h2>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {[
                { to: "/lessons", label: "Add a Lesson", desc: "Publish a new video", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> },
                { to: "/quizzes", label: "Create a Quiz", desc: "Build a new assessment", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> },
                { to: "/students", label: "View Students", desc: "Manage your class roster", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
              ].map((action, index) => (
                <Link
                  key={index}
                  to={action.to}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/8 text-brand-blue flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all duration-200">
                    {action.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{action.label}</p>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent lessons */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex-1">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm">Latest Lessons</h2>
              <Link to="/lessons" className="flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:gap-2.5 transition-all">
                See all {arrowRight}
              </Link>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {lessons.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">No lessons published yet</p>
              ) : (
                lessons.slice(0, 3).map((lesson, index) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <div className="w-2 h-2 rounded-full bg-brand-blue flex-shrink-0" />
                    <p className="text-sm text-gray-700 font-medium truncate">{lesson.title}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
