const GRADES = [5, 6, 7, 8];

const LessonForm = ({ formData, onChange, onSubmit, onCancel, submitting, editingId }) => (
  <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
    <h2 className="text-base font-bold text-gray-900 mb-5">
      {editingId ? "Edit Lesson" : "New Lesson"}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="md:col-span-2">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Lesson Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Introduction to Fractions"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
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
          onChange={(e) => onChange("youtube_url", e.target.value)}
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
              onClick={() => onChange("grade", g)}
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
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
        <textarea
          placeholder="What will students learn in this lesson?"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
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
        {submitting ? "Saving..." : editingId ? "Save Changes" : "Publish Lesson"}
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

export default LessonForm;
