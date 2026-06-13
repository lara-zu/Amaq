const TeacherSection = () => {
  return (
    <section id="for-teachers" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Mock dashboard preview */}
          <div className="reveal-left order-2 md:order-1">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 shadow-sm">
              {/* Fake top bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white rounded-lg h-7 ml-3 border border-gray-200 flex items-center px-3">
                  <span className="text-gray-400 text-xs">amaq.app/dashboard</span>
                </div>
              </div>

              {/* Sidebar + content mock */}
              <div className="flex gap-4">
                {/* Sidebar */}
                <div className="w-36 bg-white rounded-2xl p-3 border border-gray-100 flex flex-col gap-2 shrink-0">
                  {["Dashboard", "Students", "Lessons", "Quizzes"].map((item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold ${
                        i === 0
                          ? "bg-brand-blue text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main area */}
                <div className="flex-1 flex flex-col gap-3">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Students", value: "24", color: "text-brand-blue" },
                      { label: "Lessons", value: "8", color: "text-brand-green" },
                      { label: "Quizzes", value: "12", color: "text-brand-pink" },
                      { label: "Avg Score", value: "84%", color: "text-purple-600" },
                    ].map((card) => (
                      <div key={card.label} className="bg-white rounded-xl p-3 border border-gray-100">
                        <div className={`text-xl font-black ${card.color}`}>{card.value}</div>
                        <div className="text-gray-400 text-xs">{card.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Table preview */}
                  <div className="bg-white rounded-xl border border-gray-100 p-3">
                    <div className="text-xs font-bold text-gray-700 mb-2">Recent Students</div>
                    {["Sara M.", "Ali H.", "Nour K."].map((name, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-brand-blue/20 text-brand-blue text-xs flex items-center justify-center font-bold">
                            {name[0]}
                          </div>
                          <span className="text-xs text-gray-600">{name}</span>
                        </div>
                        <span className="text-xs text-brand-green font-semibold">⭐ {80 + i * 20}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="reveal-right order-1 md:order-2">
            <span className="inline-block text-brand-blue font-bold text-sm uppercase tracking-widest mb-5">
              For Teachers
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              Your classroom.
              <br />
              <span className="text-brand-blue">Under control.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A clean, minimal dashboard that puts everything at your fingertips.
              No clutter. No confusion. Just powerful tools for teaching.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "👥", text: "Manage your full student roster in one view" },
                { icon: "🎬", text: "Publish lessons from YouTube in under a minute" },
                { icon: "✏️", text: "Build quizzes with a simple form builder" },
                { icon: "📊", text: "See every student's scores and progress" },
              ].map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} flex items-center gap-4`}>
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-gray-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;
