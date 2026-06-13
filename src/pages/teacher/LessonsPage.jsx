import { useState, useEffect } from "react";

const GRADES = [5, 6, 7, 8];
const emptyForm = { title: "", description: "", youtube_url: "", grade: 5 };

const LessonsPage = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/lessons");
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLessons(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.youtube_url) {
      alert("Title and YouTube URL are required.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("http://localhost:5000/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify(formData),
      });
      setFormData(emptyForm);
      setShowForm(false);
      fetchLessons();
    } catch (err) {
      alert("Failed to create lesson.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteLesson = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;
    await fetch(`http://localhost:5000/api/lessons/${id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
    fetchLessons();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lessons</h1>
          <p className="text-gray-400 text-sm mt-1">{lessons.length} lessons published</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150 ${
            showForm
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-brand-blue text-white hover:bg-blue-700 shadow-sm shadow-brand-blue/30"
          }`}
        >
          {showForm ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Lesson
            </>
          )}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-5">New Lesson</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Lesson Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Introduction to Fractions"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                YouTube URL <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtube_url}
                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Grade Level <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, grade: g })}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-black transition-all duration-150 ${
                      formData.grade === g
                        ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                        : "border-gray-200 text-gray-400 hover:border-brand-blue/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                placeholder="What will students learn in this lesson?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-sm"
            >
              {submitting ? "Publishing..." : "Publish Lesson"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setFormData(emptyForm); }}
              className="text-sm font-semibold text-gray-500 px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Lessons grid */}
      {lessons.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          </div>
          <p className="font-bold text-gray-500 mb-1">No lessons yet</p>
          <p className="text-gray-400 text-sm">Click "Add Lesson" to publish your first video</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group"
            >
              {/* Thumbnail */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {lesson.youtube_thumbnail ? (
                  <img src={lesson.youtube_thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3368C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                    </div>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-all duration-200" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{lesson.title}</h3>
                  {lesson.grade && (
                    <span className="flex-shrink-0 text-xs font-black text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-lg">
                      Grade {lesson.grade}
                    </span>
                  )}
                </div>
                {lesson.description && (
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">{lesson.description}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  {lesson.youtube_url ? (
                    <a
                      href={lesson.youtube_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-brand-blue font-semibold hover:underline"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View on YouTube
                    </a>
                  ) : <span />}
                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="text-xs font-semibold text-gray-300 hover:text-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
