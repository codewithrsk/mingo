import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
  FaComments,
  FaLock,
  FaBolt,
} from "react-icons/fa";
import logo from "../assets/logo2.png";

const Register = () => {
  const navigate = useNavigate();

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
    <main
      className="
        h-[91vh]
        w-full
        bg-base-200
        flex
        items-center
        justify-center
        px-3
        sm:px-4
        overflow-hidden
      "
    >
      {/* ================= REGISTER CARD ================= */}

      <div
        className="
          w-full
          max-w-5xl
          h-[88vh]
          max-h-[700px]
          grid
          lg:grid-cols-2
          overflow-hidden
          rounded-3xl
          bg-base-100
          border
          border-base-300
          shadow-2xl
        "
      >

        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div
          className="
            hidden
            lg:flex
            relative
            flex-col
            justify-between
            p-8
            xl:p-10
            bg-primary
            text-primary-content
            overflow-hidden
          "
        >

          {/* Decorative circles */}

          <div
            className="
              absolute
              -top-24
              -right-24
              w-64
              h-64
              rounded-full
              bg-primary-content/10
            "
          />

          <div
            className="
              absolute
              -bottom-28
              -left-20
              w-72
              h-72
              rounded-full
              bg-primary-content/10
            "
          />

          {/* ================= BRAND ================= */}

          <div
            className="
              
              flex
              flex-col
              items-center
              justify-center
              flex-1
              text-center
            "
          >

            <img
              src={logo}
              alt="Mingo"
              className="
                w-28
                h-28
                xl:w-32
                xl:h-32
                object-contain
                rounded-2xl
                p-0
              "
            />

            <h1 className="text-3xl xl:text-4xl font-bold mt-3">
              Welcome to Mingo
            </h1>

            <p
              className="
                mt-3
                text-primary-content/80
                text-sm
                xl:text-base
                leading-relaxed
                max-w-sm
              "
            >
              Connect with your friends, share moments and enjoy
              conversations that matter.
            </p>

          </div>

          {/* ================= FEATURES ================= */}

          <div className="relative z-10 space-y-3">

            {/* Messaging */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-primary-content/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <FaComments size={14} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Real-time messaging
                </h3>

                <p className="text-xs text-primary-content/70">
                  Chat instantly with your friends.
                </p>
              </div>

            </div>

            {/* Security */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-primary-content/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <FaLock size={14} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Private & secure
                </h3>

                <p className="text-xs text-primary-content/70">
                  Your conversations stay yours.
                </p>
              </div>

            </div>

            {/* Fast */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-primary-content/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <FaBolt size={14} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Fast & simple
                </h3>

                <p className="text-xs text-primary-content/70">
                  Everything you need in one place.
                </p>
              </div>

            </div>

          </div>

          {/* Copyright */}

          <p className="relative z-10 text-xs text-primary-content/60 mt-4">
            © {new Date().getFullYear()} Mingo. All rights reserved.
          </p>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className="
            h-full
            flex
            items-center
            justify-center
            bg-base-100
          "
        >

          <div
            className="
              w-full
              px-5
              py-5
              sm:px-8
              sm:py-6
              lg:px-8
              xl:px-10
            "
          >

            {/* ================= MOBILE LOGO ================= */}

            <div className="lg:hidden flex justify-center mb-3">

              <img
                src={logo}
                alt="Mingo"
                className="w-12 h-12 object-contain rounded-xl"
              />

            </div>

            {/* ================= HEADER ================= */}

            <div className="mb-3">

              <h2 className="text-2xl font-bold text-base-content">
                Create an account
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                Join Mingo and start connecting with people.
              </p>

            </div>

            {/* ================= SOCIAL ================= */}

            <div className="grid grid-cols-2 gap-2 mb-3">

              <button
                type="button"
                className="
                  btn
                  btn-outline
                  btn-sm
                  border-base-300
                  text-base-content
                  hover:bg-base-200
                  gap-2
                "
              >
                <FaGoogle size={14} />
                Google
              </button>

              <button
                type="button"
                className="
                  btn
                  btn-outline
                  btn-sm
                  border-base-300
                  text-base-content
                  hover:bg-base-200
                  gap-2
                "
              >
                <FaFacebookF size={14} />
                Facebook
              </button>

            </div>

            {/* ================= DIVIDER ================= */}

            <div className="divider text-[10px] text-base-content/40 my-2">
              OR CONTINUE WITH EMAIL
            </div>

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-2.5"
            >

              {/* Name */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Full name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="
                    input
                    input-bordered
                    input-sm
                    w-full
                    bg-base-100
                  "
                  required
                />

              </div>

              {/* Email */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Email address
                  </span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="
                    input
                    input-bordered
                    input-sm
                    w-full
                    bg-base-100
                  "
                  required
                />

              </div>

              {/* Password */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
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
                    className="
                      input
                      input-bordered
                      input-sm
                      w-full
                      pr-10
                      bg-base-100
                    "
                    required
                    minLength={8}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-1
                      top-1/2
                      -translate-y-1/2
                      btn
                      btn-ghost
                      btn-xs
                      btn-square
                      text-base-content/60
                    "
                  >
                    {showPassword ? (
                      <FaEyeSlash size={13} />
                    ) : (
                      <FaEye size={13} />
                    )}
                  </button>

                </div>

                <p className="text-[10px] text-base-content/50 mt-0.5">
                  Minimum 8 characters.
                </p>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Confirm password
                  </span>
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="
                      input
                      input-bordered
                      input-sm
                      w-full
                      pr-10
                      bg-base-100
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                      absolute
                      right-1
                      top-1/2
                      -translate-y-1/2
                      btn
                      btn-ghost
                      btn-xs
                      btn-square
                      text-base-content/60
                    "
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={13} />
                    ) : (
                      <FaEye size={13} />
                    )}
                  </button>

                </div>

              </div>

              {/* Terms */}

              <label className="flex items-start gap-2 cursor-pointer pt-1">

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="
                    checkbox
                    checkbox-primary
                    checkbox-sm
                    mt-0.5
                  "
                />

                <span className="text-xs text-base-content/70 leading-4">

                  I agree to the{" "}

                  <button
                    type="button"
                    className="link link-primary"
                  >
                    Terms & Conditions
                  </button>

                  {" "}and{" "}

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
                className="
                  btn
                  btn-primary
                  btn-sm
                  w-full
                  font-semibold
                  mt-1
                "
              >
                Create account
              </button>

            </form>

            {/* ================= LOGIN ================= */}

            <div className="text-center mt-3">

              <p className="text-xs text-base-content/60">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="
                    link
                    link-primary
                    font-semibold
                  "
                >
                  Sign in
                </button>

              </p>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Register;