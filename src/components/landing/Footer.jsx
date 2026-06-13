const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <span className="font-black text-2xl">Amaq</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              A gamified math learning platform that turns lessons into adventures
              and makes teachers feel like superheroes.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#for-teachers" className="hover:text-white transition-colors">For Teachers</a></li>
              <li><a href="#for-students" className="hover:text-white transition-colors">For Students</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-white mb-4">Account</h4>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li><a href="/login" className="hover:text-white transition-colors">Log In</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Sign Up</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 Amaq. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <span className="text-brand-pink">♥</span>
            <span>for math learners everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
