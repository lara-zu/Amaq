const ArchivePortal = () => (
  <svg width="110" height="100" viewBox="0 0 110 100" fill="none">
    <defs>
      <linearGradient id="archRock" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3020" />
        <stop offset="100%" stopColor="#2a2010" />
      </linearGradient>
      <radialGradient id="archInner" cx="50%" cy="60%" r="60%">
        <stop offset="0%" stopColor="rgba(56,178,172,0.1)" />
        <stop offset="100%" stopColor="rgba(10,30,40,0.95)" />
      </radialGradient>
    </defs>

    <ellipse cx="55" cy="96" rx="40" ry="4" fill="rgba(0,0,0,0.3)" />
    <path d="M5 95 Q5 20 55 18 Q105 20 105 95" fill="url(#archRock)" />
    <path d="M22 95 Q22 35 55 33 Q88 35 88 95" fill="url(#archInner)" />

    <ellipse cx="55" cy="72" rx="28" ry="22" fill="rgba(56,178,172,0.15)" />
    <ellipse cx="55" cy="72" rx="18" ry="14" fill="rgba(56,178,172,0.2)" />
    <ellipse cx="55" cy="72" rx="10" ry="8" fill="rgba(56,178,172,0.4)"
      style={{ filter: "drop-shadow(0 0 12px rgba(56,178,172,0.8))" }} />

    {[12, 8, 18, 10, 15].map((y, i) => (
      <circle key={i} cx={15 + i * 18} cy={y + 15} r="3" fill="rgba(0,0,0,0.2)" />
    ))}

    <ellipse cx="20" cy="60" rx="8" ry="4" fill="#689931" opacity="0.5" />
    <ellipse cx="90" cy="55" rx="7" ry="3" fill="#689931" opacity="0.4" />
  </svg>
);

export default ArchivePortal;
