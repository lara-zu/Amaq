import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <span
            className={`font-black text-2xl tracking-tight transition-colors duration-300 ${
              scrolled ? "text-brand-blue" : "text-white"
            }`}
          >
            Amaq
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "For Teachers", "For Students"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className={`text-sm font-medium transition-colors duration-300 hover:text-brand-pink ${
                scrolled ? "text-gray-600" : "text-white/80"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 border-2 ${
              scrolled
                ? "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                : "border-white text-white hover:bg-white hover:text-brand-blue"
            }`}
          >
            Log In
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold px-5 py-2 rounded-full bg-brand-pink text-white hover:bg-pink-500 transition-all duration-300 shadow-md"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 ${scrolled ? "text-gray-800" : "text-white"}`}
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-xl px-6 pt-4 pb-6 flex flex-col gap-4">
          {["Features", "How It Works", "For Teachers", "For Students"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-gray-700 font-medium text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link to="/login" className="text-center py-2 rounded-full border-2 border-brand-blue text-brand-blue font-semibold text-sm">
            Log In
          </Link>
          <Link to="/login" className="text-center py-2 rounded-full bg-brand-pink text-white font-semibold text-sm">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
