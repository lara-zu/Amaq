const features = [
  {
    icon: "🎬",
    title: "Video Lessons",
    description:
      "Teachers add YouTube lessons in seconds. Students watch them right inside the app — no redirects, no distractions.",
    color: "bg-brand-blue/10 text-brand-blue",
    border: "border-brand-blue/20",
  },
  {
    icon: "📝",
    title: "Smart Quizzes",
    description:
      "Build quizzes with multiple choice questions. Students get instant feedback and earn stars for every correct answer.",
    color: "bg-brand-pink/10 text-brand-pink",
    border: "border-brand-pink/20",
  },
  {
    icon: "⭐",
    title: "Star Economy",
    description:
      "Students earn stars by completing quizzes. Spend them in the avatar shop to customize their underwater character.",
    color: "bg-yellow-100 text-yellow-600",
    border: "border-yellow-200",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description:
      "Students see their stats, quiz history, and improvement over time. Teachers monitor the whole class at a glance.",
    color: "bg-brand-green/10 text-brand-green",
    border: "border-brand-green/20",
  },
  {
    icon: "🎨",
    title: "Avatar Customization",
    description:
      "Spend stars to unlock new avatar outfits, accessories, and backgrounds. Your underwater character, your style.",
    color: "bg-purple-100 text-purple-600",
    border: "border-purple-200",
  },
  {
    icon: "🎓",
    title: "Grade-Based Content",
    description:
      "Lessons and quizzes are organized by grade — 5, 6, 7, and 8. Students only see content for their level. Teachers assign to exactly who needs it.",
    color: "bg-brand-cream text-amber-700",
    border: "border-amber-200",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <span className="inline-block text-brand-pink font-bold text-sm uppercase tracking-widest mb-4">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
            One platform. Two worlds.
            <br />
            <span className="text-brand-blue">Endless learning.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Built specifically for grades 5 through 8 — Amaq brings everything
            a math classroom needs into one beautifully designed app.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${(index % 4) + 1} group p-8 rounded-3xl border-2 ${feature.border} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white`}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-2xl mb-5 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
