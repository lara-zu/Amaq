const QuizSanctuary = () => (
  <svg width="130" height="120" viewBox="0 0 130 120" fill="none">
    <defs>
      <linearGradient id="qsPlat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a3e1b" />
        <stop offset="100%" stopColor="#3d2a10" />
      </linearGradient>
      <radialGradient id="qsDome" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="rgba(251,211,141,0.18)" />
        <stop offset="70%" stopColor="rgba(251,191,36,0.06)" />
        <stop offset="100%" stopColor="rgba(180,100,0,0.04)" />
      </radialGradient>
    </defs>

    <ellipse cx="65" cy="115" rx="50" ry="5" fill="rgba(0,0,0,0.35)" />
    <rect x="15" y="90" width="100" height="20" rx="5" fill="url(#qsPlat)" />
    <rect x="25" y="85" width="80" height="10" rx="3" fill="#3d2a10" />

    <ellipse cx="65" cy="90" rx="45" ry="7" fill="#4a3010" />
    <path d="M20 90 Q20 30 65 30 Q110 30 110 90" fill="url(#qsDome)" />
    <path d="M30 90 Q30 40 65 40 Q100 40 100 90" fill="rgba(251,191,36,0.06)" />
    <path d="M35 75 Q42 42 60 35" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />

    <circle cx="65" cy="68" r="18" fill="rgba(251,191,36,0.12)"
      style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }} />
    <circle cx="65" cy="68" r="10" fill="rgba(251,191,36,0.2)" />
    <circle cx="65" cy="68" r="5" fill="rgba(251,191,36,0.6)"
      style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.9))" }} />
    <text x="61" y="72" fontSize="10" fill="white" fontWeight="bold" opacity="0.9">?</text>

    {[28, 55, 82, 108].map((x, i) => (
      <rect key={i} x={x} y="93" width="10" height="6" rx="2"
        fill={i % 2 === 0 ? "#f59e0b" : "#92400e"} opacity="0.7" />
    ))}
  </svg>
);

export default QuizSanctuary;
