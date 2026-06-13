import { useState, useEffect } from "react";

const GRADES = [5, 6, 7, 8];
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

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/quizzes");
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
      const res = await fetch("http://localhost:5000/api/lessons");
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchQuizzes(); fetchLessons(); }, []);

  const addQuestion = () => setQuestions([...questions, { ...emptyQuestion }]);

  const updateQuestion = (index, field, value) => {
    setQuestions(questions.map((q, i) => i === index ? { ...q, [field]: value } : q));
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizTitle) { alert("Quiz title is required."); return; }
    if (!lessonId) { alert("Please select a lesson."); return; }
    setSubmitting(true);
    try {
      await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify({ title: quizTitle, lesson_id: lessonId, grade: quizGrade, questions }),
      });
      setQuizTitle("");
      setLessonId("");
      setQuestions([{ ...emptyQuestion }]);
      setShowForm(false);
      fetchQuizzes();
    } catch (err) {
      alert("Failed to create quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    await fetch(`http://localhost:5000/api/quizzes/${id}`, {
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
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quizzes</h1>
          <p className="text-gray-400 text-sm mt-1">{quizzes.length} quizzes created</p>
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
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Create Quiz</>
          )}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-5">New Quiz</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Quiz Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Fractions Quiz #1"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
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
                    onClick={() => setQuizGrade(g)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-black transition-all duration-150 ${
                      quizGrade === g
                        ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                        : "border-gray-200 text-gray-400 hover:border-brand-blue/40"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Attach to Lesson <span className="text-red-400">*</span>
              </label>
              <select
                value={lessonId}
                onChange={(e) => setLessonId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all bg-white"
              >
                <option value="">Select a lesson...</option>
                {lessons.map((lesson, index) => (
                  <option key={index} value={lesson.id}>{lesson.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Questions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Questions</h3>
                <p className="text-xs text-gray-400">{questions.length} question{questions.length !== 1 ? "s" : ""} added</p>
              </div>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:bg-brand-blue/5 px-3 py-1.5 rounded-lg transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Question
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {questions.map((q, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-blue text-white flex items-center justify-center text-xs font-black">
                        {index + 1}
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Question</span>
                    </div>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Enter your question here..."
                    value={q.question_text}
                    onChange={(e) => updateQuestion(index, "question_text", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all bg-white"
                  />

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {["a", "b", "c", "d"].map((opt) => (
                      <div key={opt} className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-gray-300 uppercase">{opt}</span>
                        <input
                          type="text"
                          placeholder={`Option ${opt.toUpperCase()}`}
                          value={q[`option_${opt}`]}
                          onChange={(e) => updateQuestion(index, `option_${opt}`, e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all bg-white"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Correct answer:</label>
                    <div className="flex gap-2">
                      {["a", "b", "c", "d"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateQuestion(index, "correct_option", opt)}
                          className={`w-8 h-8 rounded-lg text-xs font-black uppercase transition-all duration-150 ${
                            q.correct_option === opt
                              ? "bg-brand-blue text-white shadow-sm"
                              : "bg-white border border-gray-200 text-gray-400 hover:border-brand-blue"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-sm"
            >
              {submitting ? "Saving..." : "Save Quiz"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm font-semibold text-gray-500 px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Quizzes list */}
      {quizzes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <p className="font-bold text-gray-500 mb-1">No quizzes yet</p>
          <p className="text-gray-400 text-sm">Click "Create Quiz" to build your first one</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/20 transition-all duration-200">
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/8 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3368C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{quiz.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{quiz.question_count || 0} questions</span>
                      {quiz.lesson_title && <span className="text-xs text-brand-blue font-medium">· {quiz.lesson_title}</span>}
                      {quiz.grade && (
                        <span className="text-xs font-black text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md">
                          Grade {quiz.grade}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteQuiz(quiz.id); }}
                    className="text-xs font-semibold text-gray-300 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-150"
                  >
                    Delete
                  </button>
                  <div className={`text-gray-300 transition-transform duration-200 ${expandedQuiz === quiz.id ? "rotate-180" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
              {expandedQuiz === quiz.id && (
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400">
                    Expand view will show questions once the backend is connected.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
