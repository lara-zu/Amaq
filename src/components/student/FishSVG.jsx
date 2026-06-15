const FishSVG = ({ c1, c2, size }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 60 30" fill="none">
    <polygon points="5,15 0,6 0,24" fill={c1} opacity="0.95" />
    <ellipse cx="30" cy="15" rx="23" ry="10" fill={c1} opacity="0.95" />
    <ellipse cx="26" cy="13" rx="15" ry="5.5" fill={c2} opacity="0.45" />
    <ellipse cx="21" cy="10" rx="8" ry="3.5" fill={c2} opacity="0.35" transform="rotate(-15 21 10)" />
    <circle cx="45" cy="13" r="3.2" fill="white" />
    <circle cx="46" cy="13" r="1.6" fill="#1a1a2e" />
    <line x1="30" y1="6" x2="30" y2="24" stroke="white" strokeWidth="1.2" opacity="0.25" />
    <line x1="22" y1="7" x2="22" y2="23" stroke="white" strokeWidth="0.8" opacity="0.18" />
  </svg>
);

export default FishSVG;
