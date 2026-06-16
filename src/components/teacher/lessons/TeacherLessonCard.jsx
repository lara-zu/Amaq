const TeacherLessonCard = ({ lesson, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group">
    <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      {lesson.youtube_thumbnail ? (
        <img src={lesson.youtube_thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3368C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
        </div>
      )}
    </div>

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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View on YouTube
          </a>
        ) : <span />}
        <div className="flex items-center gap-3">
          <button onClick={onEdit} className="text-xs font-semibold text-brand-blue hover:underline transition-colors">
            Edit
          </button>
          <button onClick={onDelete} className="text-xs font-semibold text-gray-300 hover:text-red-500 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TeacherLessonCard;
