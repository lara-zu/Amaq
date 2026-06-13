const StudentWorldSection = () => {
  return (
    <section id="for-students" className="py-28 bg-brand-blue overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal-left">
            <span className="inline-block text-brand-cream font-bold text-sm uppercase tracking-widest mb-5">
              For Students
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Learning that feels like{" "}
              <span className="text-brand-pink">playing</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Your classroom is an underwater world. Every lesson you complete, every quiz
              you ace — it earns you stars. Use those stars to build the most epic underwater
              character in your class.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🌊", text: "Explore your underwater home screen" },
                { icon: "⭐", text: "Earn stars for every quiz you crush" },
                { icon: "🎨", text: "Customize your avatar with unlockable items" },
                { icon: "📈", text: "Watch your stats grow lesson by lesson" },
              ].map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} flex items-center gap-4`}>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-white/85 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="reveal-right">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Mock underwater UI preview */}
              <div className="bg-gradient-to-b from-blue-900 to-blue-700 rounded-2xl p-6 mb-6 relative overflow-hidden" style={{ minHeight: 220 }}>
                {/* Animated elements */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-amber-200/40 rounded-b-2xl" />
                <div className="absolute bottom-8 left-6 text-3xl animate-bounce" style={{ animationDelay: "0s" }}>🌿</div>
                <div className="absolute bottom-8 right-8 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>🪸</div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-5xl animate-float">🐠</div>
                <div className="absolute top-4 right-6 text-2xl animate-float-slow">🪼</div>
                <div className="absolute top-10 left-8 text-xl animate-float-slower">🐟</div>
                {/* Bubbles */}
                {[
                  { size: 8, top: "60%", left: "30%", delay: "0s" },
                  { size: 6, top: "40%", left: "65%", delay: "1s" },
                  { size: 10, top: "75%", left: "55%", delay: "0.5s" },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/30 border border-white/50 animate-float"
                    style={{ width: b.size, height: b.size, top: b.top, left: b.left, animationDelay: b.delay }}
                  />
                ))}
              </div>

              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-yellow-400 text-xl font-black">⭐ 240</div>
                  <div className="text-white/60 text-xs mt-1">Stars</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-white text-xl font-black">12</div>
                  <div className="text-white/60 text-xs mt-1">Lessons Done</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-brand-pink text-xl font-black">88%</div>
                  <div className="text-white/60 text-xs mt-1">Avg Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentWorldSection;
