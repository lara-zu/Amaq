import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-28 bg-brand-green relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="reveal">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Ready to make math{" "}
            <span className="underline decoration-brand-pink decoration-4">unforgettable?</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Join Amaq today — whether you're a teacher building the future or
            a student ready to dive in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-brand-green font-black px-10 py-4 rounded-2xl text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="bg-white/15 border-2 border-white/50 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:bg-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
