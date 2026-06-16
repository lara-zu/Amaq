const TeacherPageHeader = ({ title, count, countLabel, buttonLabel, onButtonClick, showForm }) => (
  <div className="flex items-start justify-between mb-8">
    <div>
      <h1 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h1>
      <p className="text-gray-400 text-sm mt-1">{count} {countLabel}</p>
    </div>
    <button
      onClick={onButtonClick}
      className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-150 ${
        showForm
          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
          : "bg-brand-blue text-white hover:bg-blue-700 shadow-sm shadow-brand-blue/30"
      }`}
    >
      {showForm ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          Cancel
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {buttonLabel}
        </>
      )}
    </button>
  </div>
);

export default TeacherPageHeader;
