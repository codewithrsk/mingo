import React from "react";
import logo from "../assets/logo.png";
import mingo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";

const themes = [
  { value: "light", label: "☀️ Light" },
  { value: "dark", label: "🌙 Dark" },
  { value: "black", label: "🖤 Black" },
  { value: "claude", label: "🤎 Claude" },
  { value: "corporate", label: "🏢 Corporate" },
  { value: "ghibli", label: "🌿 Ghibli" },
  { value: "gourmet", label: "🍽️ Gourmet" },
  { value: "luxury", label: "💎 Luxury" },
  { value: "mintlify", label: "🌱 Mintlify" },
  { value: "pastel", label: "🎨 Pastel" },
  { value: "perplexity", label: "🔮 Perplexity" },
  { value: "shadcn", label: "⚫ Shadcn" },
  { value: "slack", label: "💬 Slack" },
  { value: "soft", label: "☁️ Soft" },
  { value: "spotify", label: "🎵 Spotify" },
  { value: "valorant", label: "🎮 Valorant" },
  { value: "vscode", label: "💻 VS Code" },
];

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = React.useState(false);

  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("mingo-theme") || "dark";
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mingo-theme", theme);
  }, [theme]);

  const handleChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogin = () => {
    closeMenu();
    navigate("/login");
  };

  const handleRegister = () => {
    closeMenu();
    navigate("/register");
  };

  const handleHome = () => {
    closeMenu();
    navigate("/");
  };

  return (
    <nav
      className="
        sticky
        top-0
        left-0
        right-0
        z-50
        h-[9vh]
        min-h-16
        border-b
        border-base-content/10
        bg-base-100
        text-base-content
      "
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 h-full">

        <div className="flex items-center justify-between h-full">

          {/* ================= LOGO ================= */}

          <button
            type="button"
            onClick={handleHome}
            className="flex items-center gap-2 sm:gap-3 h-full cursor-pointer"
          >
            {/* Logo Icon */}
            <div
              className="
                flex
                items-center
                justify-center
                h-[6vh]
                w-[6vh]
                min-h-9
                min-w-9
                max-h-12
                max-w-12
                rounded-xl
                bg-primary
                shadow-lg
                shadow-primary/30
                transition-transform
                duration-200
                hover:scale-105
              "
            >
              <img
                src={logo}
                alt="Mingo Logo"
                className="
                  w-[70%]
                  h-[70%]
                  object-contain
                "
              />
            </div>

            {/* Mingo Text Logo */}
            <div
              className="
                h-[5vh]
                max-h-10
                flex
                items-center
              "
            >
              <img
                src={mingo}
                alt="Mingo"
                className="
                  h-full
                  w-auto
                  max-w-32
                  object-contain
                "
              />
            </div>
          </button>

          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden md:flex items-center gap-1">

            <a
              href="#features"
              className="
                px-4
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
                duration-200
              "
            >
              Features
            </a>

            <a
              href="#preview"
              className="
                px-4
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
                duration-200
              "
            >
              Preview
            </a>

            <a
              href="#about"
              className="
                px-4
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
                duration-200
              "
            >
              About
            </a>

          </div>

          {/* ================= DESKTOP ACTIONS ================= */}

          <div className="hidden md:flex items-center gap-2">

            {/* Theme Selector */}
            <div
              className="
                relative
                flex
                items-center
                rounded-xl
                border
                border-primary
                bg-base-100
                overflow-hidden
              "
            >
              <select
                value={theme}
                onChange={handleChangeTheme}
                aria-label="Select theme"
                className="
                  select
                  select-sm
                  w-48
                  bg-transparent
                  text-base-content
                  font-semibold
                  border-none
                  outline-none
                  focus:outline-none
                  cursor-pointer
                "
              >
                {themes.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ================= LOGIN ================= */}

            <button
              type="button"
              onClick={handleLogin}
              className="
                btn
                btn-sm
                min-w-20
                bg-base-content/10
                text-base-content
                border
                border-base-content/10
                font-semibold
                hover:bg-base-content/20
                hover:border-base-content/20
                transition-all
              "
            >
              Log in
            </button>

            {/* ================= REGISTER ================= */}

            <button
              type="button"
              onClick={handleRegister}
              className="
                btn
                btn-primary
                btn-sm
                rounded-xl
                px-5
                font-semibold
                shadow-lg
                shadow-primary/20
                hover:scale-[1.02]
                transition-all
              "
            >
              Get Started
            </button>

          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              btn
              btn-square
              btn-ghost
              md:hidden
              text-base-content
              hover:bg-base-content/10
            "
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-3xl leading-none">
                ×
              </span>
            ) : (
              <span className="text-2xl leading-none">
                ☰
              </span>
            )}
          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div
            className="
              md:hidden
              absolute
              top-[9vh]
              left-0
              right-0
              bg-base-100
              border-b
              border-base-content/10
              shadow-2xl
            "
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5">

              {/* Mobile Links */}

              <div className="flex flex-col gap-1">

                <a
                  href="#features"
                  onClick={closeMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base-content
                    font-medium
                    hover:bg-base-content/10
                  "
                >
                  Features
                </a>

                <a
                  href="#preview"
                  onClick={closeMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base-content
                    font-medium
                    hover:bg-base-content/10
                  "
                >
                  Preview
                </a>

                <a
                  href="#about"
                  onClick={closeMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base-content
                    font-medium
                    hover:bg-base-content/10
                  "
                >
                  About
                </a>

              </div>

              <div className="divider opacity-20"></div>

              {/* ================= MOBILE THEME ================= */}

              <div className="mb-4">

                <label
                  htmlFor="mobile-theme"
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-base-content
                  "
                >
                  Theme
                </label>

                <select
                  id="mobile-theme"
                  value={theme}
                  onChange={handleChangeTheme}
                  className="
                    select
                    w-full
                    bg-base-100
                    text-base-content
                    font-semibold
                    border
                    border-primary
                    rounded-xl
                    focus:border-primary
                    focus:outline-none
                  "
                >
                  {themes.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>

              </div>

              {/* ================= MOBILE ACTIONS ================= */}

              <div className="flex flex-col sm:flex-row gap-2">

                {/* Login */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="
                    btn
                    flex-1
                    bg-base-content/10
                    text-base-content
                    border
                    border-base-content/10
                    font-semibold
                    hover:bg-base-content/20
                  "
                >
                  Log in
                </button>

                {/* Register */}
                <button
                  type="button"
                  onClick={handleRegister}
                  className="
                    btn
                    btn-primary
                    flex-1
                    rounded-xl
                    font-semibold
                  "
                >
                  Get Started
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Header;