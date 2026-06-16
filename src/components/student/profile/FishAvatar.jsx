// Hat shapes drawn inside the fish SVG coordinate space (viewBox "0 0 220 120")
const HatInFish = ({ hatId }) => {
  if (hatId === "crown") return (
    <g>
      <rect x="8" y="21" width="52" height="13" rx="2" fill="#F1C40F" />
      <polygon points="8,21 16,7 24,21"  fill="#F1C40F" />
      <polygon points="27,21 34,4 41,21" fill="#F1C40F" />
      <polygon points="44,21 52,7 60,21" fill="#F1C40F" />
      <circle cx="16" cy="14" r="3.5" fill="#E74C3C" />
      <circle cx="34" cy="10" r="3.5" fill="#3498DB" />
      <circle cx="52" cy="14" r="3.5" fill="#2ECC71" />
      <rect x="8" y="31" width="52" height="3" rx="1.5" fill="#D4AC0D" />
    </g>
  );
  if (hatId === "tophat") return (
    <g>
      <ellipse cx="33" cy="33" rx="27" ry="6" fill="#1A252F" />
      <rect x="10" y="5"  width="46" height="30" rx="3" fill="#2C3E50" />
      <rect x="10" y="26" width="46" height="7"  fill="#C0392B" />
      <rect x="10" y="5"  width="46" height="5"  rx="2" fill="#17202A" />
    </g>
  );
  if (hatId === "cap") return (
    <g>
      <path d="M5,30 Q5,5 33,5 Q61,5 61,30 Z" fill="#2980B9" />
      <ellipse cx="33" cy="30" rx="28" ry="7" fill="#1A5276" />
      <rect x="27" y="5" width="12" height="6" rx="3" fill="#1A5276" />
      <circle cx="33" cy="8" r="2.5" fill="#5DADE2" />
      <path d="M5,30 Q-4,33 -2,37 Q4,33 5,30 Z" fill="#1A5276" />
    </g>
  );
  if (hatId === "pirate") return (
    <g>
      <ellipse cx="33" cy="33" rx="28" ry="7" fill="#1A1A2E" />
      <path d="M5,33 Q33,5 61,33 Z" fill="#2C2C54" />
      <circle cx="33" cy="21" r="6" fill="white" />
      <circle cx="31" cy="20" r="1.5" fill="#1A1A2E" />
      <circle cx="35" cy="20" r="1.5" fill="#1A1A2E" />
      <path d="M30,24 Q33,26 36,24" stroke="#1A1A2E" strokeWidth="1" fill="none" />
      <line x1="27" y1="28" x2="39" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="39" y1="28" x2="27" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
  if (hatId === "viking") return (
    <g>
      <ellipse cx="33" cy="30" rx="25" ry="6" fill="#7F8C8D" />
      <path d="M10,30 Q10,8 33,8 Q56,8 56,30 Z" fill="#95A5A6" />
      <rect x="30" y="24" width="6" height="12" rx="2" fill="#6C7A7D" />
      <circle cx="16" cy="20" r="2" fill="#BDC3C7" />
      <circle cx="33" cy="15" r="2" fill="#BDC3C7" />
      <circle cx="50" cy="20" r="2" fill="#BDC3C7" />
      <path d="M10,20 Q0,12 3,2 Q7,12 13,20 Z" fill="#F0E6D3" />
      <path d="M56,20 Q66,12 63,2 Q59,12 53,20 Z" fill="#F0E6D3" />
      <path d="M10,20 Q0,12 3,2" stroke="#D4C5AD" strokeWidth="1" fill="none" />
      <path d="M56,20 Q66,12 63,2" stroke="#D4C5AD" strokeWidth="1" fill="none" />
    </g>
  );
  if (hatId === "wizard") return (
    <g>
      <ellipse cx="33" cy="33" rx="28" ry="7" fill="#6B2FA0" />
      <path d="M33,0 L12,33 L54,33 Z" fill="#8E44AD" />
      <path d="M12,33 L54,33 L52,28 L14,28 Z" fill="#5B2187" />
      <circle cx="40" cy="16" r="2.5" fill="#FFD700" />
      <circle cx="28" cy="22" r="2"   fill="#FFD700" />
      <circle cx="44" cy="25" r="1.5" fill="#FFD700" />
      <path d="M24,11 Q29,8 29,14 Q24,12 24,11 Z" fill="#FFD700" />
    </g>
  );
  return null;
};

// Small hat preview icons for the shop list
export const HatPreview = ({ hatId }) => {
  if (!hatId) return <span className="text-white/30 text-lg font-black">—</span>;
  if (hatId === "crown")  return <svg width="36" height="22" viewBox="0 0 60 36"><rect x="4" y="20" width="52" height="14" rx="2" fill="#F1C40F"/><polygon points="4,20 14,6 22,20" fill="#F1C40F"/><polygon points="26,20 30,2 34,20" fill="#F1C40F"/><polygon points="38,20 48,6 56,20" fill="#F1C40F"/><circle cx="14" cy="13" r="4" fill="#E74C3C"/><circle cx="30" cy="9" r="4" fill="#3498DB"/><circle cx="46" cy="13" r="4" fill="#2ECC71"/></svg>;
  if (hatId === "tophat") return <svg width="30" height="34" viewBox="0 0 56 56"><ellipse cx="28" cy="48" rx="28" ry="8" fill="#1A252F"/><rect x="10" y="5" width="36" height="44" rx="3" fill="#2C3E50"/><rect x="10" y="37" width="36" height="8" fill="#C0392B"/></svg>;
  if (hatId === "cap")    return <svg width="36" height="22" viewBox="0 0 72 40"><path d="M6,34 Q6,6 36,6 Q66,6 66,34 Z" fill="#2980B9"/><ellipse cx="36" cy="34" rx="30" ry="7" fill="#1A5276"/></svg>;
  if (hatId === "pirate") return <svg width="36" height="22" viewBox="0 0 68 42"><ellipse cx="34" cy="36" rx="34" ry="8" fill="#1A1A2E"/><path d="M2,36 Q34,4 66,36 Z" fill="#2C2C54"/><circle cx="34" cy="22" r="7" fill="white"/><circle cx="31" cy="21" r="2" fill="#1A1A2E"/><circle cx="37" cy="21" r="2" fill="#1A1A2E"/></svg>;
  if (hatId === "viking") return <svg width="40" height="24" viewBox="0 0 72 44"><ellipse cx="36" cy="36" rx="28" ry="8" fill="#7F8C8D"/><path d="M10,36 Q10,10 36,10 Q62,10 62,36 Z" fill="#95A5A6"/><path d="M10,24 Q0,14 4,2 Q8,14 14,24 Z" fill="#F0E6D3"/><path d="M62,24 Q72,14 68,2 Q64,14 58,24 Z" fill="#F0E6D3"/></svg>;
  if (hatId === "wizard") return <svg width="32" height="28" viewBox="0 0 60 50"><ellipse cx="30" cy="44" rx="30" ry="8" fill="#6B2FA0"/><path d="M30,2 L8,44 L52,44 Z" fill="#8E44AD"/><circle cx="38" cy="24" r="3" fill="#FFD700"/><circle cx="25" cy="33" r="2" fill="#FFD700"/></svg>;
  return null;
};

// Fish avatar — hat rendered AFTER fish body so it appears on top
const FishAvatar = ({ c1, c2, hat }) => (
  <div className="relative flex items-center justify-center" style={{ width: 240, height: 150 }}>
    <svg width="240" height="130" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pgBodyGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
        <radialGradient id="pgEyeGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ddd" />
        </radialGradient>
      </defs>

      {/* Fish body — rendered before hat so hat appears on top */}
      <polygon points="170,60 210,20 210,100" fill={c1} opacity="0.85" />
      <polygon points="175,60 205,30 205,90"  fill={c2} opacity="0.5"  />
      <ellipse cx="100" cy="62" rx="85" ry="46" fill="url(#pgBodyGrad)" />
      <ellipse cx="90"  cy="75" rx="55" ry="22" fill={c2} opacity="0.3" />
      <path d="M 60 20 Q 90 4 120 18 L 110 36 Q 85 28 65 36 Z" fill={c1} opacity="0.9" />
      <ellipse cx="85" cy="62" rx="8" ry="40" fill="rgba(255,255,255,0.18)" />
      <circle cx="38" cy="52" r="14" fill="url(#pgEyeGrad)" />
      <circle cx="36" cy="51" r="8"  fill="#1a1a2e" />
      <circle cx="34" cy="49" r="3"  fill="#fff" />
      <path d="M 22 65 Q 30 72 38 65" stroke={c1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="55" rx="18" ry="12" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="130" cy="65" rx="15" ry="10" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="70"  cy="68" rx="15" ry="10" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.4" />
      <path d="M 80 106 Q 100 115 120 106 L 115 90 Q 100 98 85 90 Z" fill={c1} opacity="0.85" />

      {/* Hat rendered last so it sits on top of fish body */}
      {hat && <HatInFish hatId={hat} />}
    </svg>
  </div>
);

export default FishAvatar;
