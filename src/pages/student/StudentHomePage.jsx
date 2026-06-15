import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FishSVG from "../../components/student/FishSVG";
import Jellyfish from "../../components/student/Jellyfish";
import MissionControl from "../../components/student/MissionControl";
import QuizSanctuary from "../../components/student/QuizSanctuary";
import ArchivePortal from "../../components/student/ArchivePortal";
import SeaFloor from "../../components/student/SeaFloor";

const BUBBLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 4 + (i * 3.7) % 14,
  left: 3 + (i * 17.3) % 90,
  delay: (i * 1.3) % 9,
  duration: 7 + (i * 1.1) % 7,
}));

const FISH = [
  { id: 0, c1: "#FF8C42", c2: "#FFD4A0", size: 62, top: "20%", dur: 19, delay: 0,  dir: 1  },
  { id: 1, c1: "#3498db", c2: "#AED6F1", size: 40, top: "36%", dur: 26, delay: 6,  dir: -1 },
  { id: 2, c1: "#DD6584", c2: "#F9C8D6", size: 30, top: "54%", dur: 21, delay: 11, dir: 1  },
  { id: 3, c1: "#f1c40f", c2: "#FEF3C7", size: 24, top: "28%", dur: 32, delay: 4,  dir: -1 },
  { id: 4, c1: "#689931", c2: "#C6E6A0", size: 46, top: "44%", dur: 23, delay: 15, dir: 1  },
  { id: 5, c1: "#9b59b6", c2: "#D7BDE2", size: 20, top: "62%", dur: 28, delay: 8,  dir: -1 },
];

const JELLYFISH = [
  { id: 0, left: "12%", top: "28%", dur: 7,  delay: 0, scale: 1,    color: "221,101,132" },
  { id: 1, left: "78%", top: "10%", dur: 9,  delay: 2, scale: 0.65, color: "147,112,219" },
  { id: 2, left: "55%", top: "6%",  dur: 11, delay: 5, scale: 0.5,  color: "100,180,200" },
  { id: 3, left: "88%", top: "38%", dur: 8,  delay: 3, scale: 0.6,  color: "221,101,132" },
  { id: 4, left: "32%", top: "12%", dur: 13, delay: 7, scale: 0.45, color: "56,178,172"  },
];

const FRAME_BOLTS = [
  "top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3",
  "top-3 left-1/4", "top-3 right-1/4", "bottom-3 left-1/4", "bottom-3 right-1/4",
];

const FAR_FISH = [
  { top: "18%", dur: 40, delay: 0,  dir: 1,  size: 16, color: "rgba(100,180,255,0.3)"  },
  { top: "32%", dur: 50, delay: 12, dir: -1, size: 12, color: "rgba(200,150,255,0.25)" },
  { top: "50%", dur: 45, delay: 7,  dir: 1,  size: 14, color: "rgba(100,220,200,0.25)" },
];

const LIGHT_RAYS = [8, 22, 42, 62, 80];

const StudentHomePage = ({ user }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth  - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stars = user?.stars ?? 1240;
  const name  = user?.firstName || user?.email?.split("@")[0] || "Explorer";

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "linear-gradient(to bottom, #020a18 0%, #03152e 12%, #051e45 28%, #083560 45%, #0a4878 62%, #0c5070 80%, #163d30 100%)" }}
    >
      {/* Light rays */}
      {LIGHT_RAYS.map((left, i) => (
        <div key={i} className="absolute top-0 pointer-events-none"
          style={{ left: `${left}%`, width: 70, height: "65%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i * 2 + 3)}deg)`,
            transformOrigin: "top center",
            animation: `lightRay ${5 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.9}s` }} />
      ))}

      {/* Far background fish — tiny, slow, faded */}
      {FAR_FISH.map((f, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{ top: f.top,
            animation: `${f.dir === 1 ? "swimAcross" : "swimLeft"} ${f.dur}s linear infinite`,
            animationDelay: `${f.delay}s` }}>
          <div style={{ width: f.size, height: f.size * 0.5, background: f.color,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }} />
        </div>
      ))}

      {/* Jellyfish */}
      {JELLYFISH.map((j) => <Jellyfish key={j.id} {...j} />)}

      {/* Parallax layer 1 — sea floor (mid-distance) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ transform: `translate(${-mouse.x * 28}px, ${-mouse.y * 12}px)`, transition: "transform 0.18s ease-out" }}>
        <SeaFloor />
      </div>

      {/* Parallax layer 2 — sanctuaries (closer) */}
      <div className="absolute inset-0"
        style={{ transform: `translate(${-mouse.x * 48}px, ${-mouse.y * 20}px)`, transition: "transform 0.14s ease-out" }}>

        <Link to="/student/lessons"
          className="absolute bottom-[22%] left-[10%] flex flex-col items-center group cursor-pointer">
          <div className="group-hover:-translate-y-3 transition-transform duration-300"
            style={{ filter: "drop-shadow(0 8px 24px rgba(51,104,198,0.3))" }}>
            <MissionControl />
          </div>
          <span className="text-cyan-300 font-black text-[11px] tracking-[0.22em] uppercase mt-1"
            style={{ textShadow: "0 0 12px rgba(99,179,237,0.8)" }}>Mission Control</span>
          <span className="text-white/35 text-[9px] tracking-widest mt-0.5">LESSONS</span>
        </Link>

        <Link to="/student/quizzes"
          className="absolute bottom-[30%] left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer">
          <div className="group-hover:-translate-y-3 transition-transform duration-300"
            style={{ filter: "drop-shadow(0 8px 28px rgba(251,191,36,0.35))" }}>
            <QuizSanctuary />
          </div>
          <span className="text-yellow-300 font-black text-[11px] tracking-[0.22em] uppercase mt-1"
            style={{ textShadow: "0 0 12px rgba(251,191,36,0.8)" }}>Quiz Sanctuary</span>
          <span className="text-white/35 text-[9px] tracking-widest mt-0.5">QUIZZES</span>
        </Link>

        <div className="absolute bottom-[22%] right-[10%] flex flex-col items-center opacity-80">
          <div style={{ filter: "drop-shadow(0 8px 20px rgba(56,178,172,0.3))" }}>
            <ArchivePortal />
          </div>
          <span className="text-teal-300 font-black text-[11px] tracking-[0.22em] uppercase mt-1"
            style={{ textShadow: "0 0 12px rgba(56,178,172,0.7)" }}>Exploration</span>
          <span className="text-white/30 text-[9px] tracking-widest mt-0.5">ARCHIVES</span>
        </div>
      </div>

      {/* Swimming fish */}
      {FISH.map((f) => (
        <div key={f.id} className="absolute pointer-events-none"
          style={{ top: f.top,
            animation: `${f.dir === 1 ? "swimAcross" : "swimLeft"} ${f.dur}s linear infinite`,
            animationDelay: `${f.delay}s` }}>
          <div style={{ transform: f.dir === -1 ? "scaleX(-1)" : undefined }}>
            <FishSVG c1={f.c1} c2={f.c2} size={f.size} />
          </div>
        </div>
      ))}

      {/* Bubbles */}
      {BUBBLES.map((b) => (
        <div key={b.id} className="absolute rounded-full pointer-events-none"
          style={{ width: b.size, height: b.size, left: `${b.left}%`, bottom: "14%",
            background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.45), rgba(255,255,255,0.04))",
            border: "1px solid rgba(255,255,255,0.18)",
            animation: `riseUp ${b.duration}s ease-in infinite`,
            animationDelay: `${b.delay}s` }} />
      ))}

      {/* Submarine viewport frame */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 14px #0a1020, inset 0 0 0 18px #131e30, inset 0 0 100px 60px rgba(0,4,12,0.92), inset 0 0 260px 120px rgba(0,4,12,0.55)" }} />

      {/* Frame bolts */}
      {FRAME_BOLTS.map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 rounded-full pointer-events-none z-30`}
          style={{ background: "radial-gradient(circle at 35% 30%, #8896a8, #3a4555)",
            border: "1.5px solid #5a6575", boxShadow: "0 2px 6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)" }} />
      ))}

      {/* Top + bottom frame bars */}
      <div className="absolute top-0 left-0 right-0 h-14 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #08101e, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, #08101e, transparent)" }} />

      {/* Star counter HUD */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
        <div className="relative flex items-center gap-3 px-6 py-3 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(8,16,32,0.97), rgba(15,28,55,0.95))",
            border: "1px solid rgba(99,179,237,0.2)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)" }}>
          {["top-1.5 left-1.5", "top-1.5 right-1.5", "bottom-1.5 left-1.5", "bottom-1.5 right-1.5"].map((p, i) => (
            <div key={i} className={`absolute ${p} w-2 h-2 rounded-full`}
              style={{ background: "radial-gradient(circle at 35% 30%, #6a7a8a, #3a4555)", border: "1px solid #4a5565" }} />
          ))}
          <div>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em]">Star Count</p>
            <p className="text-white font-black text-2xl leading-none tracking-tight"
              style={{ textShadow: "0 0 20px rgba(251,191,36,0.4)" }}>
              {stars.toLocaleString()}
            </p>
          </div>
          <span className="text-4xl leading-none" style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.9))" }}>⭐</span>
        </div>
      </div>

      {/* Welcome tag */}
      <div className="absolute top-6 left-7 z-30">
        <p className="text-white/35 text-xs font-semibold tracking-wide">
          Hey, <span className="text-white/65">{name}</span>
        </p>
      </div>

      {/* Bottom control panel */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(6,12,24,0.94), rgba(10,20,40,0.92))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

          <Link to="/student/stats"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(76,29,149,0.9))",
              boxShadow: "0 2px 12px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">My Stats</span>
          </Link>

          <div className="w-1 h-1 rounded-full bg-white/20 mx-1" />

          <Link to="/student/lessons"
            className="flex items-center gap-3 px-7 py-3 rounded-xl transition-all duration-200 hover:-translate-y-1 group"
            style={{ background: "linear-gradient(135deg, #3368C6, #1a4fa8)",
              boxShadow: "0 4px 20px rgba(51,104,198,0.6), 0 0 0 1px rgba(99,179,237,0.25), inset 0 1px 0 rgba(255,255,255,0.18)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span className="text-sm font-black text-white uppercase tracking-widest">Continue</span>
          </Link>

          <div className="w-1 h-1 rounded-full bg-white/20 mx-1" />

          <Link to="/student/profile"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
            style={{ background: "linear-gradient(135deg, rgba(221,101,132,0.85), rgba(184,48,96,0.9))",
              boxShadow: "0 2px 12px rgba(221,101,132,0.4), inset 0 1px 0 rgba(255,255,255,0.12)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">My Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
