import QuestionEditor from "./QuestionEditor";

const GRADES = [5, 6, 7, 8];
const emptyQuestion = { question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "a" };

const QuizForm = ({
  quizTitle, setQuizTitle,
  lessonId, setLessonId,
  quizGrade, setQuizGrade,
  questions, setQuestions,
  lessons,
  onSubmit, onCancel,
  submitting, editingId,
}) => {
  const addQuestion = () => setQuestions([...questions, { ...emptyQuestion }]);

  const updateQuestion = (index, field, value) => {
    setQuestions(questions.map((q, i) => i === index ? { ...q, [field]: value } : q));
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-5">
        {editingId ? "Edit Quiz" : "New Quiz"}
      </h2>

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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Question
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {questions.map((q, index) => (
            <QuestionEditor
              key={index}
              question={q}
              index={index}
              onChange={(field, value) => updateQuestion(index, field, value)}
              onRemove={() => removeQuestion(index)}
              canRemove={questions.length > 1}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-sm"
        >
          {submitting ? "Saving..." : editingId ? "Save Changes" : "Save Quiz"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-gray-500 px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
