const Jellyfish = ({ left, top, dur, delay, scale, color }) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left,
      top,
      transform: `scale(${scale})`,
      transformOrigin: "top center",
      animation: `float ${dur}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      opacity: 0.75,
    }}
  >
    <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
      <defs>
        <radialGradient id={`jg${color}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={`rgba(${color},0.5)`} />
          <stop offset="100%" stopColor={`rgba(${color},0.1)`} />
        </radialGradient>
      </defs>
      <ellipse cx="26" cy="20" rx="24" ry="19" fill={`url(#jg${color})`} />
      <ellipse cx="26" cy="17" rx="18" ry="12" fill={`rgba(${color},0.15)`} />
      <ellipse cx="20" cy="13" rx="8" ry="5" fill="rgba(255,255,255,0.1)" transform="rotate(-20 20 13)" />
      {[8, 14, 20, 26, 32, 38, 44].map((x, i) => (
        <path
          key={i}
          d={`M${x} 36 Q${x + (i % 2 === 0 ? -4 : 4)} ${46 + i} ${x + (i % 2 === 0 ? 2 : -2)} ${58 + i * 0.5}`}
          stroke={`rgba(${color},0.55)`}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  </div>
);

export default Jellyfish;
