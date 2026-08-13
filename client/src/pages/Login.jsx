import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import mingo from "../assets/logo2.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Add your API login logic here
    // After successful login:
    // navigate("/");

    navigate("/");
  };

  return (
    <div className="min-h-[91vh] flex items-center justify-center px-4 py-8 bg-base-200">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-3"
          >
            <img
              src={logo}
              alt="Mingo Logo"
              className="w-11 h-11 object-contain"
            />

            <img
              src={mingo}
              alt="Mingo"
              className="h-9 w-auto object-contain"
            />
          </button>

          <h1 className="text-2xl font-bold text-base-content">
            Welcome back!
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Sign in to continue to Mingo
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 border border-base-300 shadow-xl">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="label text-sm font-medium"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="label text-sm font-medium"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="input input-bordered w-full pr-20 focus:outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary hover:underline"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="checkbox checkbox-sm checkbox-primary"
                />

                <span className="text-sm text-base-content/70">
                  Remember me
                </span>
              </label>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-xs text-base-content/40">
              OR
            </div>

            {/* Register */}
            <p className="text-center text-sm text-base-content/60">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/50 mt-6">
          By continuing, you agree to Mingo's{" "}
          <Link
            to="/terms"
            className="hover:text-primary hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="hover:text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;