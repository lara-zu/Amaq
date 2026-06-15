import { useNavigate } from "react-router-dom";

const StudentPageHeader = ({ title, subtitle, backTo, stars, accentColor = "#63B3ED" }) => {
  const navigate = useNavigate();

  return (
    <div className="relative z-20 pt-7 pb-5 px-10 flex items-center justify-between">
      <button
        onClick={() => navigate(backTo)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-x-1 hud-panel"
        style={{ border: `1px solid ${accentColor}33`, color: accentColor, minWidth: 90 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="text-xs font-bold tracking-widest uppercase">Back</span>
      </button>

      <div className="text-center">
        {subtitle && (
          <p className="text-[9px] tracking-[0.4em] uppercase font-bold mb-1"
            style={{ color: `${accentColor}66` }}>
            {subtitle}
          </p>
        )}
        <h1
          className="text-white font-black text-2xl tracking-widest uppercase"
          style={{ textShadow: `0 0 30px ${accentColor}55` }}
        >
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-xl hud-stars" style={{ minWidth: 90, justifyContent: "center" }}>
        <span className="text-2xl leading-none" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }}>⭐</span>
        <span className="text-white font-black text-lg leading-none">{(stars ?? 0).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default StudentPageHeader;
