const MissionControl = () => (
  <svg width="160" height="110" viewBox="0 0 160 110" fill="none">
    <defs>
      <linearGradient id="mcBase" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a3f5f" />
        <stop offset="100%" stopColor="#1a2840" />
      </linearGradient>
      <linearGradient id="mcDome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(51,104,198,0.25)" />
        <stop offset="100%" stopColor="rgba(51,104,198,0.05)" />
      </linearGradient>
    </defs>

    <ellipse cx="80" cy="105" rx="65" ry="5" fill="rgba(0,0,0,0.4)" />
    <rect x="20" y="70" width="120" height="30" rx="6" fill="url(#mcBase)" />
    <rect x="30" y="65" width="100" height="12" rx="4" fill="#2d4060" />

    {[38, 60, 82, 104].map((x, i) => (
      <rect key={i} x={x} y="73" width="12" height="8" rx="2"
        fill={i % 2 === 0 ? "#3368C6" : "#63b3ed"} opacity="0.8" />
    ))}

    <ellipse cx="80" cy="65" rx="48" ry="8" fill="#1e3050" />
    <path d="M32 65 Q32 20 80 20 Q128 20 128 65" fill="url(#mcDome)" />
    <path d="M42 65 Q42 28 80 28 Q118 28 118 65" fill="rgba(100,160,255,0.08)" />
    <path d="M48 55 Q55 30 72 26" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />

    <line x1="60" y1="20" x2="55" y2="5" stroke="#4a6080" strokeWidth="2.5" />
    <ellipse cx="51" cy="4" rx="10" ry="6" fill="none" stroke="#5a7090" strokeWidth="2" transform="rotate(-30 51 4)" />
    <circle cx="51" cy="4" r="2" fill="#3368C6" opacity="0.8" />

    <line x1="100" y1="20" x2="108" y2="6" stroke="#4a6080" strokeWidth="2" />
    <ellipse cx="112" cy="5" rx="8" ry="5" fill="none" stroke="#5a7090" strokeWidth="1.8" transform="rotate(25 112 5)" />
    <circle cx="112" cy="5" r="1.5" fill="#63b3ed" opacity="0.8" />

    <line x1="80" y1="20" x2="80" y2="6" stroke="#5a7090" strokeWidth="1.5" />
    <circle cx="80" cy="5" r="3" fill="#DD6584" opacity="0.9"
      style={{ filter: "drop-shadow(0 0 4px #DD6584)" }} />

    {[35, 75, 115].map((x, i) => (
      <circle key={i} cx={x} cy="92" r="3"
        fill={i === 1 ? "#689931" : "#3368C6"} opacity="0.9"
        style={{ filter: `drop-shadow(0 0 4px ${i === 1 ? "#689931" : "#3368C6"})` }} />
    ))}
  </svg>
);

export default MissionControl;
