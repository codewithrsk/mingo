import React from "react";
import logo from "../assets/logo.png";
import mingo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import api from "../config/Api.config";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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

  const { isLogin, user, logout, setIsLogin, setUser, setRole } = useAuth();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [themeOpen, setThemeOpen] = React.useState(false);

  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem("mingo-theme") || "dark";
  });

  // ============================================================
  // APPLY THEME
  // ============================================================

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mingo-theme", theme);
  }, [theme]);

  // ============================================================
  // CLOSE MENU
  // ============================================================

  const closeMenu = () => {
    setMenuOpen(false);
    setThemeOpen(false);
  };

  // ============================================================
  // THEME
  // ============================================================

  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme);
    setThemeOpen(false);
  };

  // ============================================================
  // NAVIGATION
  // ============================================================

  const handleLogin = () => {
    closeMenu();
    navigate("/login");
  };

  const handleRegister = () => {
    closeMenu();
    navigate("/register");
  };

  const handleProfile = () => {
    closeMenu();
    navigate("/profile");
  };

  const handleHome = async () => {
    closeMenu();

    try {
      await api.get("/");
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);

      sessionStorage.removeItem("mingo");

      setUser(null);

      setIsLogin(false);

      setRole(null);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during Logout. Please try again.",
      );
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     closeMenu();

  //     await logout();

  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  // ============================================================
  // USER DATA
  // ============================================================

  const userName = user?.fullName ;

  const userEmail = user?.email || "";

  const userInitials = userName?.split(" ").filter(Boolean).map((name) => name.charAt(0)).join("").slice(0, 2).toUpperCase();

  // ============================================================
  // SELECTED THEME
  // ============================================================

  const selectedTheme =
    themes.find((item) => item.value === theme) || themes[1];

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
      {/* Reduced X padding */}
      <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* =====================================================
              LOGO
          ====================================================== */}

          <button
            type="button"
            onClick={handleHome}
            className="
              flex
              items-center
              gap-2
              h-full
              cursor-pointer
              shrink-0
            "
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

            {/* Mingo Text */}

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
                  max-w-28
                  object-contain
                "
              />
            </div>
          </button>

          {/* =====================================================
              DESKTOP NAV
          ====================================================== */}

          <div className="hidden md:flex items-center gap-0.5">
            <a
              href="#features"
              className="
                px-3
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
              "
            >
              Features
            </a>

            <a
              href="#preview"
              className="
                px-3
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
              "
            >
              Preview
            </a>

            <a
              href="#about"
              className="
                px-3
                py-2
                rounded-lg
                text-base-content
                font-medium
                hover:bg-base-content/10
                transition-all
              "
            >
              About
            </a>
          </div>

          {/* =====================================================
              DESKTOP ACTIONS
          ====================================================== */}

          <div className="hidden md:flex items-center gap-1.5">
            {/* =================================================
                THEME DROPDOWN
            ================================================== */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeOpen(!themeOpen)}
                className="
                  flex
                  items-center
                  gap-2
                  h-9
                  px-2.5
                  min-w-40
                  rounded-lg
                  border
                  border-primary
                  bg-base-100
                  text-base-content
                  font-semibold
                  hover:bg-base-content/5
                  transition-all
                "
              >
                <span className="text-base">
                  {selectedTheme.label.split(" ")[0]}
                </span>

                <span className="flex-1 text-left truncate text-sm">
                  {selectedTheme.label.substring(2)}
                </span>

                <span
                  className={`
                    text-[10px]
                    transition-transform
                    duration-200
                    ${themeOpen ? "rotate-180" : ""}
                  `}
                >
                  ▼
                </span>
              </button>

              {/* Theme Menu */}

              {themeOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-11
                    z-[100]
                    w-56
                    max-h-80
                    overflow-y-auto
                    rounded-xl
                    border
                    border-base-content/10
                    bg-base-100
                    text-base-content
                    shadow-2xl
                    p-2
                  "
                >
                  {themes.map((item) => {
                    const isSelected = theme === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleChangeTheme(item.value)}
                        className={`
                          w-full
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2
                          rounded-lg
                          text-left
                          transition-all
                          ${
                            isSelected
                              ? "bg-primary text-primary-content"
                              : "hover:bg-base-content/10"
                          }
                        `}
                      >
                        <span className="text-base">
                          {item.label.split(" ")[0]}
                        </span>

                        <span className="flex-1 font-medium text-sm">
                          {item.label.substring(2)}
                        </span>

                        {isSelected && <span className="font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =================================================
                LOGGED IN USER
            ================================================== */}

            {isLogin ? (
              <>
                {/* User Profile */}

                <button
                  type="button"
                  onClick={handleProfile}
                  className="
                    flex
                    items-center
                    gap-2
                    px-2
                    py-1
                    rounded-lg
                    bg-base-content/5
                    border
                    border-base-content/10
                    hover:bg-base-content/10
                    transition-all
                  "
                >
                  {/* Avatar */}

                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-primary
                      text-primary-content
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-xs
                      uppercase
                      shrink-0
                    "
                  >
                    {userInitials}
                  </div>

                  {/* User Details */}

                  <div className="text-left max-w-28">
                    <p className="font-semibold text-sm truncate">{userName}</p>

                    {userEmail && (
                      <p className="text-[10px] opacity-60 truncate">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </button>

                {/* =================================================
                    LOGOUT BUTTON
                ================================================== */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    btn
                    btn-sm
                    h-9
                    min-h-9
                    px-3
                    rounded-lg
                    bg-error/10
                    text-error
                    border
                    border-error/20
                    hover:bg-error
                    hover:text-error-content
                    transition-all
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* =================================================
                    LOGIN
                ================================================== */}

                <button
                  type="button"
                  onClick={handleLogin}
                  className="
                    btn
                    btn-sm
                    h-9
                    min-h-9
                    px-3
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

                {/* =================================================
                    GET STARTED
                ================================================== */}

                <button
                  type="button"
                  onClick={handleRegister}
                  className="
                    btn
                    btn-primary
                    btn-sm
                    h-9
                    min-h-9
                    rounded-lg
                    px-4
                    font-semibold
                    shadow-lg
                    shadow-primary/20
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}

          <button
            type="button"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setThemeOpen(false);
            }}
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
              <span className="text-3xl leading-none">×</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

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
            <div className="px-3 sm:px-4 py-4">
              {/* =================================================
                  MOBILE LINKS
              ================================================== */}

              <div className="flex flex-col gap-1">
                <a
                  href="#features"
                  onClick={closeMenu}
                  className="
                    px-3
                    py-2.5
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
                    px-3
                    py-2.5
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
                    px-3
                    py-2.5
                    rounded-lg
                    text-base-content
                    font-medium
                    hover:bg-base-content/10
                  "
                >
                  About
                </a>
              </div>

              <div className="divider opacity-20 my-2"></div>

              {/* =================================================
                  MOBILE THEME
              ================================================== */}

              <div className="mb-4">
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-base-content
                  "
                >
                  Choose Theme
                </label>

                <div className="grid grid-cols-2 gap-1.5">
                  {themes.map((item) => {
                    const isSelected = theme === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setTheme(item.value)}
                        className={`
                          flex
                          items-center
                          gap-2
                          px-2.5
                          py-2
                          rounded-lg
                          border
                          transition-all
                          text-left
                          ${
                            isSelected
                              ? "bg-primary text-primary-content border-primary"
                              : "bg-base-100 text-base-content border-base-content/10 hover:bg-base-content/10"
                          }
                        `}
                      >
                        <span className="text-base">
                          {item.label.split(" ")[0]}
                        </span>

                        <span className="text-xs font-medium truncate">
                          {item.label.substring(2)}
                        </span>

                        {isSelected && (
                          <span className="ml-auto font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =================================================
                  MOBILE USER
              ================================================== */}

              {isLogin ? (
                <div className="flex flex-col gap-2">
                  {/* User */}

                  <button
                    type="button"
                    onClick={handleProfile}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      bg-base-content/5
                      border
                      border-base-content/10
                      hover:bg-base-content/10
                    "
                  >
                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-primary
                        text-primary-content
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-lg
                        shrink-0
                      "
                    >
                      {userInitials}
                    </div>

                    <div className="text-left flex-1 min-w-0">
                      <p className="font-semibold truncate">{userName}</p>

                      {userEmail && (
                        <p className="text-sm opacity-60 truncate">
                          {userEmail}
                        </p>
                      )}
                    </div>

                    <span className="text-xl opacity-60">›</span>
                  </button>

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      btn
                      w-full
                      bg-error/10
                      text-error
                      border
                      border-error/20
                      hover:bg-error
                      hover:text-error-content
                    "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
