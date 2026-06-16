import { useState, useEffect } from "react";
import TeacherPageHeader from "../../components/teacher/shared/TeacherPageHeader";
import QuizForm from "../../components/teacher/quizzes/QuizForm";
import TeacherQuizItem from "../../components/teacher/quizzes/TeacherQuizItem";
import API_URL from "../../api.js";

const emptyQuestion = { question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "a" };

const QuizzesPage = ({ user }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [quizGrade, setQuizGrade] = useState(5);
  const [questions, setQuestions] = useState([{ ...emptyQuestion }]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [quizDetails, setQuizDetails] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchQuizDetails = async (quizId) => {
    if (quizDetails[quizId]) return;
    try {
      const res = await fetch(`${API_URL}/api/quizzes/${quizId}`);
      const data = await res.json();
      setQuizDetails((prev) => ({ ...prev, [quizId]: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/quizzes`);
      const data = await res.json();
      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await fetch(`${API_URL}/api/lessons`);
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchQuizzes(); fetchLessons(); }, []);

  const handleEdit = async (quiz) => {
    setEditingId(quiz.id);
    setQuizTitle(quiz.title);
    setLessonId(quiz.lesson_id || "");
    setQuizGrade(quiz.grade || 5);
    let qs = [{ ...emptyQuestion }];
    try {
      const res = await fetch(`${API_URL}/api/quizzes/${quiz.id}`);
      const data = await res.json();
      if (data.questions?.length > 0) qs = data.questions;
      setQuizDetails((prev) => ({ ...prev, [quiz.id]: data }));
    } catch (err) { console.log(err); }
    setQuestions(qs);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setQuizTitle("");
    setLessonId("");
    setQuestions([{ ...emptyQuestion }]);
  };

  const handleHeaderButton = () => {
    if (showForm) {
      handleCancel();
    } else {
      setEditingId(null);
      setQuizTitle("");
      setLessonId("");
      setQuestions([{ ...emptyQuestion }]);
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizTitle) { alert("Quiz title is required."); return; }
    if (!lessonId) { alert("Please select a lesson."); return; }
    setSubmitting(true);
    try {
      if (editingId) {
        await fetch(`${API_URL}/api/quizzes/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "x-role": user.role },
          body: JSON.stringify({ title: quizTitle, lesson_id: lessonId, grade: quizGrade, questions }),
        });
      } else {
        await fetch(`${API_URL}/api/quizzes`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-role": user.role },
          body: JSON.stringify({ title: quizTitle, lesson_id: lessonId, grade: quizGrade, questions, teacher_id: user.id }),
        });
      }
      handleCancel();
      fetchQuizzes();
    } catch (err) {
      alert("Failed to save quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    await fetch(`${API_URL}/api/quizzes/${id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
    fetchQuizzes();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <TeacherPageHeader
        title="Quizzes"
        count={quizzes.length}
        countLabel="quizzes created"
        buttonLabel="Create Quiz"
        onButtonClick={handleHeaderButton}
        showForm={showForm}
      />

      {showForm && (
        <QuizForm
          quizTitle={quizTitle} setQuizTitle={setQuizTitle}
          lessonId={lessonId} setLessonId={setLessonId}
          quizGrade={quizGrade} setQuizGrade={setQuizGrade}
          questions={questions} setQuestions={setQuestions}
          lessons={lessons}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitting={submitting}
          editingId={editingId}
        />
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {quizzes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <p className="font-bold text-gray-500 mb-1">No quizzes yet</p>
          <p className="text-gray-400 text-sm">Click "Create Quiz" to build your first one</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz, index) => (
            <TeacherQuizItem
              key={index}
              quiz={quiz}
              isExpanded={expandedQuiz === quiz.id}
              onToggle={() => {
                const next = expandedQuiz === quiz.id ? null : quiz.id;
                setExpandedQuiz(next);
                if (next) fetchQuizDetails(next);
              }}
              onEdit={() => handleEdit(quiz)}
              onDelete={() => deleteQuiz(quiz.id)}
              quizDetails={quizDetails[quiz.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
