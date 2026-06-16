const QuestionEditor = ({ question, index, onChange, onRemove, canRemove }) => (
  <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-brand-blue text-white flex items-center justify-center text-xs font-black">
          {index + 1}
        </div>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Question</span>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors"
        >
          Remove
        </button>
      )}
    </div>

    <input
      type="text"
      placeholder="Enter your question here..."
      value={question.question_text}
      onChange={(e) => onChange("question_text", e.target.value)}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all bg-white"
    />

    <div className="grid grid-cols-2 gap-2 mb-4">
      {["a", "b", "c", "d"].map((opt) => (
        <div key={opt} className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-gray-300 uppercase">{opt}</span>
          <input
            type="text"
            placeholder={`Option ${opt.toUpperCase()}`}
            value={question[`option_${opt}`]}
            onChange={(e) => onChange(`option_${opt}`, e.target.value)}
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
            onClick={() => onChange("correct_option", opt)}
            className={`w-8 h-8 rounded-lg text-xs font-black uppercase transition-all duration-150 ${
              question.correct_option === opt
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
);

export default QuestionEditor;
