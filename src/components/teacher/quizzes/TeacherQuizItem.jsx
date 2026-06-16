const TeacherQuizItem = ({ quiz, isExpanded, onToggle, onEdit, onDelete, quizDetails }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/20 transition-all duration-200">
    <div
      className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3368C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{quiz.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-400">{quiz.question_count || 0} questions</span>
            {quiz.lesson_title && (
              <span className="text-xs text-brand-blue font-medium">· {quiz.lesson_title}</span>
            )}
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
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="text-xs font-semibold text-brand-blue hover:bg-brand-blue/5 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-xs font-semibold text-gray-300 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          Delete
        </button>
        <div className={`text-gray-300 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </div>

    {isExpanded && (
      <div className="px-6 pb-5 border-t border-gray-100 pt-4">
        {quizDetails?.questions?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {quizDetails.questions.map((q, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">{i + 1}. {q.question_text}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {["a", "b", "c", "d"].map((opt) => (
                    <p
                      key={opt}
                      className={`text-xs px-3 py-1.5 rounded-lg ${
                        q.correct_option === opt ? "bg-green-100 text-green-700 font-bold" : "text-gray-500"
                      }`}
                    >
                      {opt.toUpperCase()}. {q[`option_${opt}`]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No questions found.</p>
        )}
      </div>
    )}
  </div>
);

export default TeacherQuizItem;
