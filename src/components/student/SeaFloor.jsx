const SEAWEED_POSITIONS = [4, 11, 18, 77, 85, 93];

const ROCKS = [
  { l: "5%",  w: 45, h: 22, rx: "45% 55% 50% 60%" },
  { l: "29%", w: 32, h: 16, rx: "55% 45% 60% 50%" },
  { l: "48%", w: 55, h: 26, rx: "50% 60% 45% 55%" },
  { l: "60%", w: 28, h: 14, rx: "60% 40% 55% 45%" },
  { l: "72%", w: 40, h: 19, rx: "45% 55% 60% 50%" },
  { l: "90%", w: 36, h: 17, rx: "55% 50% 45% 60%" },
];

const SeaFloor = () => (
  <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
    {/* Sandy floor */}
    <div className="absolute bottom-0 left-0 right-0 h-40"
      style={{ background: "linear-gradient(to top, #1e1408 0%, #2d1e0a 40%, #3d2e1a 70%, transparent 100%)" }} />

    {/* Sand ripples */}
    {[10, 28, 48, 66, 82].map((l, i) => (
      <div key={i} className="absolute bottom-8 h-2 rounded-full pointer-events-none"
        style={{ left: `${l}%`, width: `${6 + i * 2}%`, background: "rgba(230,190,120,0.08)", borderRadius: 999 }} />
    ))}

    {/* Seaweed */}
    {SEAWEED_POSITIONS.map((left, i) => (
      <div key={i} className="absolute bottom-14"
        style={{ left: `${left}%`, animation: `sway ${3 + (i % 3) * 0.8}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
        <svg width="26" height={60 + (i % 3) * 35} viewBox={`0 0 26 ${60 + (i % 3) * 35}`}>
          <path
            d={`M13 ${60 + (i % 3) * 35} C8 ${44 + (i % 3) * 25} 18 ${28 + (i % 3) * 16} 13 10 C8 ${18 + (i % 3) * 8} 18 4 13 0`}
            stroke={i % 2 === 0 ? "#689931" : "#4a7022"}
            strokeWidth={i % 3 === 0 ? 6 : 4.5}
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {i % 2 === 0 && (
            <path
              d={`M13 ${45 + (i % 3) * 22} C3 ${35 + (i % 3) * 15} 1 ${22 + (i % 3) * 9} 7 ${14 + (i % 3) * 5}`}
              stroke="#3a5c1a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55"
            />
          )}
        </svg>
      </div>
    ))}

    {/* Pink coral */}
    <div className="absolute bottom-14 left-[23%]">
      <svg width="75" height="85" viewBox="0 0 75 85" fill="none">
        <path d="M37 82 C37 60 22 46 24 24 C26 9 37 2 37 2 C37 2 48 9 50 24 C52 46 37 60 37 82" fill="#DD6584" opacity="0.88" />
        <path d="M37 60 C37 44 17 30 20 10" stroke="#f093a8" strokeWidth="5.5" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M37 60 C37 44 57 30 54 10" stroke="#f093a8" strokeWidth="5.5" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M37 38 C37 28 10 18 14 4" stroke="#f093a8" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <circle cx="20" cy="9" r="5" fill="#DD6584" opacity="0.95" style={{ filter: "drop-shadow(0 0 4px #DD6584)" }} />
        <circle cx="54" cy="9" r="5" fill="#DD6584" opacity="0.95" style={{ filter: "drop-shadow(0 0 4px #DD6584)" }} />
        <circle cx="37" cy="2" r="6" fill="#f093a8" opacity="0.95" style={{ filter: "drop-shadow(0 0 6px #DD6584)" }} />
        <circle cx="14" cy="3" r="4" fill="#f093a8" opacity="0.8" />
      </svg>
    </div>

    {/* Purple coral */}
    <div className="absolute bottom-14 right-[21%]">
      <svg width="64" height="74" viewBox="0 0 64 74" fill="none">
        <path d="M32 71 C32 52 20 40 22 20 C24 8 32 2 32 2 C32 2 40 8 42 20 C44 40 32 52 32 71" fill="#8e44ad" opacity="0.82" />
        <path d="M32 52 C32 36 14 24 17 7" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.72" />
        <path d="M32 52 C32 36 50 24 47 7" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.72" />
        <circle cx="17" cy="6" r="4" fill="#c084fc" opacity="0.9" />
        <circle cx="47" cy="6" r="4" fill="#c084fc" opacity="0.9" />
        <circle cx="32" cy="2" r="5" fill="#d8b4fe" opacity="0.9" />
      </svg>
    </div>

    {/* Green bushy plant left */}
    <div className="absolute bottom-28 left-[38%]">
      <svg width="55" height="50" viewBox="0 0 55 50" fill="none">
        <ellipse cx="27" cy="35" rx="22" ry="12" fill="#1a4a10" opacity="0.7" />
        <ellipse cx="27" cy="28" rx="18" ry="14" fill="#689931" opacity="0.85" />
        <ellipse cx="15" cy="24" rx="12" ry="10" fill="#689931" opacity="0.8" />
        <ellipse cx="38" cy="22" rx="13" ry="11" fill="#4a7022" opacity="0.8" />
        <ellipse cx="27" cy="18" rx="10" ry="8" fill="#7ab535" opacity="0.9" />
      </svg>
    </div>

    {/* Green bushy plant right */}
    <div className="absolute bottom-28 right-[36%]">
      <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
        <ellipse cx="24" cy="32" rx="18" ry="10" fill="#1a4a10" opacity="0.65" />
        <ellipse cx="24" cy="25" rx="15" ry="12" fill="#4a7022" opacity="0.85" />
        <ellipse cx="14" cy="21" rx="11" ry="9" fill="#689931" opacity="0.8" />
        <ellipse cx="34" cy="19" rx="10" ry="9" fill="#689931" opacity="0.75" />
        <ellipse cx="24" cy="15" rx="9" ry="7" fill="#7ab535" opacity="0.9" />
      </svg>
    </div>

    {/* Rocks */}
    {ROCKS.map((r, i) => (
      <div key={i} className="absolute bottom-12"
        style={{ left: r.l, width: r.w, height: r.h,
          background: `radial-gradient(circle at 38% 32%, ${i % 2 === 0 ? "#5a5040" : "#4a4535"}, #2a2515)`,
          borderRadius: r.rx, opacity: 0.75 }} />
    ))}

    {/* Starfish */}
    <div className="absolute bottom-14 left-[56%] opacity-70">
      <svg width="28" height="28" viewBox="0 0 28 28">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i} cx="14" cy="14" rx="2.5" ry="10"
            fill="#E7D4B0" opacity="0.9" transform={`rotate(${deg} 14 14)`} />
        ))}
        <circle cx="14" cy="14" r="4" fill="#c9a96e" />
      </svg>
    </div>
  </div>
);

export default SeaFloor;
