const stats = [
  { value: "500+", label: "Active Students", icon: "🎓" },
  { value: "120+", label: "Lessons Published", icon: "🎬" },
  { value: "2,400+", label: "Quizzes Completed", icon: "📝" },
  { value: "18,000+", label: "Stars Earned", icon: "⭐" },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-brand-pink">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-black text-white mb-3">
            Students are already diving in 🌊
          </h2>
          <p className="text-white/75 text-lg">
            Join the growing Amaq community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${index + 1} text-center bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-8 hover:bg-white/25 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/75 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
