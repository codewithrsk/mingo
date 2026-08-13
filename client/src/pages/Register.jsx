import React, { useState } from "react";
import logo from "../assets/logo2.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    console.log("Registration Data:", formData);
  };

  return (
    <div className="min-h-[91vh] bg-base-200 flex items-center justify-center px-4 py-20 ">
      <div className="w-full max-w-6xl  grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-base-100 shadow-2xl border border-base-300">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex relative flex-col justify-between p-10 bg-primary text-primary-content overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-content/10" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-primary-content/10" />

          {/* Logo */}
          <div className=" flex relative z-10 justify-center flex-col items-center text-center">
            <img
              src={logo}
              alt="Mingo"
              className="w-40 h-40 object-contain rounded-2xl"
            />

            <h1 className="text-4xl font-bold mt-4">
              Welcome to Mingo
            </h1>

            <p className="mt-4 text-primary-content/80 text-lg leading-relaxed max-w-md">
              Connect with your friends, share moments and enjoy
              conversations that matter.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-content/10 flex items-center justify-center">
                💬
              </div>
              <div>
                <h3 className="font-semibold">Real-time messaging</h3>
                <p className="text-sm text-primary-content/70">
                  Chat instantly with your friends.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-content/10 flex items-center justify-center">
                🔒
              </div>
              <div>
                <h3 className="font-semibold">Private & secure</h3>
                <p className="text-sm text-primary-content/70">
                  Your conversations stay yours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-primary-content/10 flex items-center justify-center">
                ⚡
              </div>
              <div>
                <h3 className="font-semibold">Fast & simple</h3>
                <p className="text-sm text-primary-content/70">
                  Everything you need in one place.
                </p>
              </div>
            </div>

          </div>

          <p className="relative z-10 text-sm text-primary-content/60">
            © 2026 Mingo. All rights reserved.
          </p>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <img
              src={logo}
              alt="Mingo"
              className="w-16 h-16 object-contain rounded-2xl"
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-base-content">
              Create an account
            </h2>

            <p className="mt-2 text-base-content/60">
              Join Mingo and start connecting with people.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              type="button"
              className="btn btn-outline border-base-300 hover:bg-base-200"
            >
              <span className="text-lg font-bold">G</span>
              Google
            </button>

            <button
              type="button"
              className="btn btn-outline border-base-300 hover:bg-base-200"
            >
              <span className="text-lg font-bold">f</span>
              Facebook
            </button>

          </div>

          {/* Divider */}
          <div className="divider text-base-content/40">
            OR CONTINUE WITH EMAIL
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Full name
                </span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email address
                </span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="input input-bordered w-full pr-12"
                  required
                  minLength={8}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <p className="text-xs text-base-content/50 mt-2">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Confirm password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input input-bordered w-full pr-12"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="checkbox checkbox-primary mt-0.5"
              />

              <span className="text-sm text-base-content/70">
                I agree to the{" "}
                <button
                  type="button"
                  className="link link-primary"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="link link-primary"
                >
                  Privacy Policy
                </button>
                .
              </span>

            </label>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full text-base"
            >
              Create account
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-7">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <button
                type="button"
                className="link link-primary font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;