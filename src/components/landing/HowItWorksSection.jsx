const teacherSteps = [
  { step: "01", title: "Create an Account", desc: "Sign up as a teacher in seconds. No credit card needed." },
  { step: "02", title: "Add Your Lessons", desc: "Paste a YouTube URL and Amaq automatically pulls the title and thumbnail." },
  { step: "03", title: "Build a Quiz", desc: "Create multiple-choice questions attached to any lesson, or upload a document." },
  { step: "04", title: "Watch Students Grow", desc: "Track scores, progress, and star earnings from your dashboard." },
];

const studentSteps = [
  { step: "01", title: "Dive In", desc: "Log in and enter your underwater world. Your dashboard shows today's lessons." },
  { step: "02", title: "Watch & Learn", desc: "Stream lessons without leaving the app. Take notes, rewind, replay." },
  { step: "03", title: "Take the Quiz", desc: "Answer questions, get instant feedback, and see your score." },
  { step: "04", title: "Earn & Customize", desc: "Stars hit your account. Head to the shop and deck out your character." },
];

const StepCard = ({ step, title, desc, accent, delay }) => (
  <div className={`reveal reveal-delay-${delay} flex gap-5 items-start`}>
    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${accent} flex items-center justify-center font-black text-sm`}>
      {step}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-lg mb-1">{title}</h4>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <span className="inline-block text-brand-green font-bold text-sm uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Simple for teachers.
            <br />
            <span className="text-brand-pink">Magical for students.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Teacher side */}
          <div className="reveal-left bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xl">📚</div>
              <h3 className="text-2xl font-black text-gray-900">For Teachers</h3>
            </div>
            <div className="flex flex-col gap-8">
              {teacherSteps.map((s, i) => (
                <StepCard key={i} {...s} accent="bg-brand-blue/10 text-brand-blue" delay={i + 1} />
              ))}
            </div>
          </div>

          {/* Student side */}
          <div className="reveal-right bg-brand-blue rounded-3xl p-10 shadow-xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center text-xl">🐠</div>
              <h3 className="text-2xl font-black text-white">For Students</h3>
            </div>
            <div className="flex flex-col gap-8">
              {studentSteps.map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} flex gap-5 items-start`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-black text-sm">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{s.title}</h4>
                    <p className="text-white/70 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
