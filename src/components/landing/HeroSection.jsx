import { Link } from "react-router-dom";

const Bubble = ({ style }) => (
  <div
    className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
    style={style}
  />
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-brand-blue overflow-hidden flex items-center">
      {/* Animated background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-pink/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      {/* Floating bubbles */}
      <Bubble style={{ width: 14, height: 14, top: "20%", left: "10%", animation: "float 5s ease-in-out infinite" }} />
      <Bubble style={{ width: 8, height: 8, top: "35%", left: "18%", animation: "float 7s ease-in-out infinite 1s" }} />
      <Bubble style={{ width: 20, height: 20, top: "60%", left: "8%", animation: "float 9s ease-in-out infinite 2s" }} />
      <Bubble style={{ width: 10, height: 10, top: "15%", right: "15%", animation: "float 6s ease-in-out infinite 0.5s" }} />
      <Bubble style={{ width: 16, height: 16, top: "45%", right: "10%", animation: "float 8s ease-in-out infinite 1.5s" }} />
      <Bubble style={{ width: 6, height: 6, top: "70%", right: "20%", animation: "float 5s ease-in-out infinite 3s" }} />
      <Bubble style={{ width: 24, height: 24, bottom: "25%", left: "50%", animation: "float 10s ease-in-out infinite 0.8s" }} />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          The Math Learning Platform Built for Students & Teachers
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          Where Learning{" "}
          <span className="relative inline-block">
            <span className="text-brand-cream">Feels Like</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 8 Q75 2 150 8 Q225 14 298 8"
                stroke="#DD6584"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>{" "}
          <br />
          <span className="text-brand-pink">An Adventure</span>
        </h1>

        {/* Subtext */}
        <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Amaq turns math into an immersive underwater journey for students — and gives teachers
          a powerful, simple dashboard to manage everything.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login"
            className="group flex items-center gap-3 bg-brand-pink text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <span>🐠</span>
            I'm a Student
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/login"
            className="group flex items-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-white hover:text-brand-blue hover:-translate-y-1 transition-all duration-300"
          >
            <span>📚</span>
            I'm a Teacher
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
