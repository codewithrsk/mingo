import React from "react";

const Header = () => {  
  const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-xl leading-none">💬</span>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                mingo<span className="text-violet-400">.</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>

              <a
                href="#preview"
                className="hover:text-white transition-colors"
              >
                Preview
              </a>

              <a
                href="#about"
                className="hover:text-white transition-colors"
              >
                About
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition">
                Log in
              </button>

              <button className="px-5 py-2.5 rounded-xl bg-white text-slate-950 text-sm font-semibold hover:bg-slate-200 transition">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 text-xl"
              aria-label="Toggle menu"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10 py-5 space-y-4">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="block text-slate-300 hover:text-white"
              >
                Features
              </a>

              <a
                href="#preview"
                onClick={() => setMenuOpen(false)}
                className="block text-slate-300 hover:text-white"
              >
                Preview
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="block text-slate-300 hover:text-white"
              >
                About
              </a>

              <div className="pt-3 border-t border-white/10 flex gap-3">
                <button className="flex-1 py-2.5 text-sm rounded-xl border border-white/10">
                  Log in
                </button>

                <button className="flex-1 py-2.5 text-sm rounded-xl bg-white text-black font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
        </>
    )
}

export default Header;