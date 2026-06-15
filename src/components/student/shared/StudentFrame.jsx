const RAY_POSITIONS = [8, 25, 50, 75, 92];

const TINT_RAY_CLASS = {
  blue:   "light-ray",
  gold:   "light-ray-gold",
  purple: "light-ray-purple",
  pink:   "light-ray-pink",
};

const TINT_VIGNETTE_CLASS = {
  blue:   "student-vignette",
  gold:   "student-vignette-gold",
  purple: "student-vignette",
  pink:   "student-vignette",
};

const TINT_BOLT_CLASS = {
  blue:   "frame-bolt",
  gold:   "frame-bolt-gold",
  purple: "frame-bolt",
  pink:   "frame-bolt",
};

const BOLT_POSITIONS = ["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"];

const RAY_ROTATIONS = [3, -5, 7, -3, 9];

const StudentFrame = ({ tint = "blue" }) => {
  const rayClass     = TINT_RAY_CLASS[tint]     || "light-ray";
  const vignetteClass= TINT_VIGNETTE_CLASS[tint] || "student-vignette";
  const boltClass    = TINT_BOLT_CLASS[tint]     || "frame-bolt";

  return (
    <>
      {RAY_POSITIONS.map((left, i) => (
        <div
          key={i}
          className={`absolute top-0 pointer-events-none ${rayClass}`}
          style={{
            left: `${left}%`,
            width: 60,
            height: "50%",
            transform: `rotate(${RAY_ROTATIONS[i]}deg)`,
            animationDelay: `${i * 0.9}s`,
          }}
        />
      ))}

      <div className={`absolute inset-0 pointer-events-none z-10 ${vignetteClass}`} />

      {BOLT_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-4 h-4 rounded-full pointer-events-none z-20 ${boltClass}`}
        />
      ))}
    </>
  );
};

export default StudentFrame;
