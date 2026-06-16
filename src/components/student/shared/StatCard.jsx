const StatCard = ({ label, value, icon, color }) => (
  <div className="stat-card flex flex-col items-center gap-2 px-6 py-5 rounded-2xl" style={{ border: `1px solid ${color}33` }}>
    <span className="text-3xl">{icon}</span>
    <span className="text-3xl font-black text-white" style={{ textShadow: `0 0 20px ${color}66` }}>{value}</span>
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: `${color}99` }}>{label}</span>
  </div>
);

export default StatCard;
