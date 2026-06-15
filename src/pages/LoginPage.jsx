import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GRADES = [5, 6, 7, 8];

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [grade, setGrade] = useState(5);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const redirect = (userData) => {
    onLogin(userData);
    navigate(userData.role === "teacher" ? "/dashboard" : "/home");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const mockLogin = () => {
    redirect({
      id: 1, email, password, role,
      firstName, lastName, birthday, avatar,
      grade: role === "student" ? grade : null,
      stars: 0,
    });
  };

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message);
      else redirect(data.user);
    } catch (err) {
      mockLogin();
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError(null);
    if (!email || !password || !firstName || !lastName) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email, password, role, firstName, lastName, birthday, avatar,
          grade: role === "student" ? grade : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message);
      else redirect(data.user);
    } catch (err) {
      mockLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-blue flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-pink/20 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <span className="text-brand-blue font-black text-xl">A</span>
          </div>
          <span className="text-white font-black text-2xl">Amaq</span>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Grades 5 – 8 Math Platform
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            The smarter way<br />to teach math.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Built for grades 5 through 8. Manage lessons, build quizzes, and track every student's growth — all in one place.
          </p>
          <div className="flex flex-col gap-3">
            {[
              "Publish YouTube lessons for any grade instantly",
              "Build quizzes and assign them by grade level",
              "Track every student's scores and star progress",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="text-white/90 font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/40 text-sm">© 2026 Amaq</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="text-brand-blue font-black text-xl">Amaq</span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-500 mb-8">
            {isLogin ? "Sign in to your Amaq account" : "Join Amaq — grades 5 through 8"}
          </p>

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${isLogin ? "bg-white text-brand-blue shadow-sm" : "text-gray-500"}`}
            >
              Log In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${!isLogin ? "bg-white text-brand-blue shadow-sm" : "text-gray-500"}`}
            >
              Sign Up
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            {/* Signup-only fields */}
            {!isLogin && (
              <>
                {/* Profile picture */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {avatar ? (
                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-brand-blue rounded-lg flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Upload a profile photo</p>
                </div>

                {/* First + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">First name</label>
                    <input
                      type="text"
                      placeholder="Lara"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last name</label>
                    <input
                      type="text"
                      placeholder="Zubaidi"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                {/* Birthday */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Birthday</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">

                    {["student", "teacher"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-3 rounded-xl border-2 text-sm font-bold capitalize transition-all duration-200 ${
                          role === r
                            ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {r === "student" ? "Student" : "Teacher"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grade picker — only for students */}
                {role === "student" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                      My Grade
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {GRADES.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGrade(g)}
                          className={`py-3 rounded-xl border-2 text-sm font-black transition-all duration-200 ${
                            grade === g
                              ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                              : "border-gray-200 text-gray-500 hover:border-brand-blue/40"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">You'll only see lessons and quizzes for your grade</p>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              onClick={isLogin ? handleLogin : handleSignup}
              disabled={loading}
              className="w-full bg-brand-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1 shadow-sm shadow-brand-blue/30"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); }}
              className="text-brand-blue font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>

          <p className="text-center mt-4">
            <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
