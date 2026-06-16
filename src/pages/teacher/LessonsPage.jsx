import { useState, useEffect } from "react";
import axios from "axios";
import TeacherPageHeader from "../../components/teacher/shared/TeacherPageHeader";
import TeacherLessonCard from "../../components/teacher/lessons/TeacherLessonCard";
import LessonForm from "../../components/teacher/lessons/LessonForm";
import API_URL from "../../api.js";

const emptyForm = { title: "", description: "", youtube_url: "", grade: 5 };

const extractVideoId = (url) => {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
};

const LessonsPage = ({ user }) => {
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/lessons`);
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLessons(); }, []);

  const handleEdit = (lesson) => {
    setEditingId(lesson.id);
    setFormData({ title: lesson.title, description: lesson.description || "", youtube_url: lesson.youtube_url || "", grade: lesson.grade || 5 });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleHeaderButton = () => {
    if (showForm) {
      handleCancel();
    } else {
      setEditingId(null);
      setFormData(emptyForm);
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.youtube_url) {
      alert("Title and YouTube URL are required.");
      return;
    }
    setSubmitting(true);
    try {
      const videoId = extractVideoId(formData.youtube_url);
      let youtube_thumbnail = "";
      let youtube_title = "";

      if (videoId) {
        const ytRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const snippet = ytRes.data.items[0]?.snippet;
        if (snippet) {
          youtube_title = snippet.title;
          youtube_thumbnail = snippet.thumbnails?.high?.url || "";
        }
      }

      if (editingId) {
        await fetch(`${API_URL}/api/lessons/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "x-role": user.role },
          body: JSON.stringify({ ...formData, youtube_thumbnail, youtube_title }),
        });
      } else {
        await fetch(`${API_URL}/api/lessons`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-role": user.role },
          body: JSON.stringify({ ...formData, youtube_thumbnail, youtube_title, teacher_id: user.id }),
        });
      }

      setFormData(emptyForm);
      setShowForm(false);
      setEditingId(null);
      fetchLessons();
    } catch (err) {
      console.log(err);
      alert("Failed to save lesson.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteLesson = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;
    await fetch(`${API_URL}/api/lessons/${id}`, {
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
      <TeacherPageHeader
        title="Lessons"
        count={lessons.length}
        countLabel="lessons published"
        buttonLabel="Add Lesson"
        onButtonClick={handleHeaderButton}
        showForm={showForm}
      />

      {showForm && (
        <LessonForm
          formData={formData}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitting={submitting}
          editingId={editingId}
        />
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {lessons.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <p className="font-bold text-gray-500 mb-1">No lessons yet</p>
          <p className="text-gray-400 text-sm">Click "Add Lesson" to publish your first video</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, index) => (
            <TeacherLessonCard
              key={index}
              lesson={lesson}
              onEdit={() => handleEdit(lesson)}
              onDelete={() => deleteLesson(lesson.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
