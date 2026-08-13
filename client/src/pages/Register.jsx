import React, { useRef, useState } from "react";
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
import toast from "react-hot-toast";

import logo from "../assets/logo2.png";
import api from "../config/Api.config";

const Register = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATES
  // =========================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const inputRefs = useRef({});

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove only the current field error
    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];

        return updatedErrors;
      });
    }

    setError("");
    setSuccess("");
  };

  // =========================================================
  // FOCUS FIRST ERROR
  // =========================================================

  const focusFirstError = (errorObject) => {
    const fieldOrder = [
      "fullName",
      "email",
      "phone",
      "dob",
      "gender",
      "password",
      "confirmPassword",
    ];

    const firstField = fieldOrder.find(
      (field) => errorObject[field]
    );

    if (
      firstField &&
      inputRefs.current[firstField]
    ) {
      inputRefs.current[firstField].focus();
    }
  };

  // =========================================================
  // VALIDATE FORM
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    // =======================================================
    // FULL NAME
    // =======================================================

    if (!fullName) {
      newErrors.fullName =
        "Full name is required.";
    } else if (fullName.length < 2) {
      newErrors.fullName =
        "Full name must contain at least 2 characters.";
    } else if (!/^[A-Za-z\s.'-]+$/.test(fullName)) {
      newErrors.fullName =
        "Please enter a valid full name.";
    }

    // =======================================================
    // EMAIL
    // =======================================================

    if (!email) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // =======================================================
    // PHONE
    // =======================================================

    if (!phone) {
      newErrors.phone =
        "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number.";
    }

    // =======================================================
    // DOB
    // =======================================================

    if (!formData.dob) {
      newErrors.dob =
        "Date of birth is required.";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();

      if (birthDate > today) {
        newErrors.dob =
          "Date of birth cannot be in the future.";
      } else {
        let age =
          today.getFullYear() -
          birthDate.getFullYear();

        const monthDifference =
          today.getMonth() -
          birthDate.getMonth();

        if (
          monthDifference < 0 ||
          (monthDifference === 0 &&
            today.getDate() <
              birthDate.getDate())
        ) {
          age--;
        }

        if (age < 13) {
          newErrors.dob =
            "You must be at least 13 years old.";
        }

        if (age > 120) {
          newErrors.dob =
            "Please enter a valid date of birth.";
        }
      }
    }

    // =======================================================
    // GENDER
    // =======================================================

    if (!formData.gender) {
      newErrors.gender =
        "Please select your gender.";
    }

    // =======================================================
    // PASSWORD
    // =======================================================

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    }

    // =======================================================
    // CONFIRM PASSWORD
    // =======================================================

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return newErrors;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate
    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length >
      0
    ) {
      setTimeout(() => {
        focusFirstError(validationErrors);
      }, 0);

      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // BACKEND DATA
      // =====================================================

      const data = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        gender: formData.gender,
        password: formData.password,
      };

      console.log("Register data:", data);

      // =====================================================
      // API REQUEST
      // =====================================================

      const response = await api.post(
        "/auth/register",
        data
      );

      console.log(
        "Register response:",
        response.data
      );

      setErrors({});

      setSuccess(
        response.data?.message ||
          "Account created successfully!"
      );
      toast.success(response.data?.message || "Account created successfully!");
      sessionStorage.setItem("mingo", JSON.stringify(response.data.data));


      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error(
        "Registration error:",
        err
      );

      const responseData =
        err.response?.data;

      // =====================================================
      // BACKEND FIELD ERRORS
      // =====================================================

      const backendErrors = {};

      if (responseData?.errors) {

        // Example:
        // errors: {
        //   email: "Email already exists"
        // }

        if (
          typeof responseData.errors ===
            "object" &&
          !Array.isArray(
            responseData.errors
          )
        ) {
          Object.entries(
            responseData.errors
          ).forEach(
            ([field, message]) => {
              backendErrors[field] =
                typeof message === "string"
                  ? message
                  : message?.message ||
                    "Invalid value.";
            }
          );
        }

        // Example:
        // errors: [
        //   {
        //     field: "email",
        //     message: "Email already exists"
        //   }
        // ]

        if (
          Array.isArray(
            responseData.errors
          )
        ) {
          responseData.errors.forEach(
            (item) => {
              if (item?.field) {
                backendErrors[item.field] =
                  item.message ||
                  "Invalid value.";
              }
            }
          );
        }
      }

      // =====================================================
      // HANDLE BACKEND FIELD ERRORS
      // =====================================================

      if (
        Object.keys(backendErrors).length >
        0
      ) {
        setErrors(backendErrors);

        setTimeout(() => {
          focusFirstError(
            backendErrors
          );
        }, 0);

        return;
      }

      // =====================================================
      // GENERAL BACKEND ERROR
      // =====================================================

      const message =
        responseData?.message ||
        responseData?.error ||
        "Registration failed. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INPUT CLASSES
  // =========================================================

  const inputClass = (field) => `
    input
    input-bordered
    input-sm
    w-full
    bg-base-100
    transition-all
    duration-200
    ${
      errors[field]
        ? "input-error border-error focus:border-error focus:outline-error"
        : ""
    }
  `;

  const selectClass = (field) => `
    select
    select-bordered
    select-sm
    w-full
    bg-base-100
    transition-all
    duration-200
    ${
      errors[field]
        ? "select-error border-error focus:border-error focus:outline-error"
        : ""
    }
  `;

  // =========================================================
  // UI
  // =========================================================

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

        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

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

          <div
            className="
              relative
              z-10
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
              Connect with your friends, share
              moments and enjoy conversations
              that matter.
            </p>

          </div>

          <div className="relative z-10 space-y-3">

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

          <p className="relative z-10 text-xs text-primary-content/60 mt-4">
            © {new Date().getFullYear()} Mingo. All rights reserved.
          </p>

        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

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
              py-4
              sm:px-8
              lg:px-8
              xl:px-10
            "
          >

            {/* Mobile Logo */}

            <div className="lg:hidden flex justify-center mb-2">
              <img
                src={logo}
                alt="Mingo"
                className="
                  w-11
                  h-11
                  object-contain
                  rounded-xl
                "
              />
            </div>

            {/* Header */}

            <div className="mb-3">

              <h2 className="text-2xl font-bold text-base-content">
                Create an account
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                Join Mingo and start connecting
                with people.
              </p>

            </div>

            {/* General Error */}

            {error && (
              <div
                role="alert"
                className="
                  alert
                  alert-error
                  py-2
                  px-3
                  mb-3
                  text-sm
                "
              >
                <span>{error}</span>
              </div>
            )}

            {/* Success */}

            {success && (
              <div
                role="alert"
                className="
                  alert
                  alert-success
                  py-2
                  px-3
                  mb-3
                  text-sm
                "
              >
                <span>{success}</span>
              </div>
            )}

            {/* Social */}

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

            {/* Divider */}

            <div className="divider text-[10px] text-base-content/40 my-2">
              OR CONTINUE WITH EMAIL
            </div>

            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-2"
            >

              {/* FULL NAME */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Full name
                  </span>
                </label>

                <input
                  ref={(el) => {
                    inputRefs.current.fullName = el;
                  }}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass("fullName")}
                />

                {errors.fullName && (
                  <p className="text-error text-[10px] mt-0.5">
                    {errors.fullName}
                  </p>
                )}

              </div>

              {/* EMAIL */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Email address
                  </span>
                </label>

                <input
                  ref={(el) => {
                    inputRefs.current.email = el;
                  }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />

                {errors.email && (
                  <p className="text-error text-[10px] mt-0.5">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PHONE + DOB */}

              <div className="grid grid-cols-2 gap-2">

                {/* PHONE */}

                <div>

                  <label className="label py-0.5">
                    <span className="label-text text-sm font-medium">
                      Phone number
                    </span>
                  </label>

                  <input
                    ref={(el) => {
                      inputRefs.current.phone = el;
                    }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    inputMode="numeric"
                    maxLength={10}
                    className={inputClass("phone")}
                  />

                  {errors.phone && (
                    <p className="text-error text-[10px] mt-0.5">
                      {errors.phone}
                    </p>
                  )}

                </div>

                {/* DOB */}

                <div>

                  <label className="label py-0.5">
                    <span className="label-text text-sm font-medium">
                      Date of birth
                    </span>
                  </label>

                  <input
                    ref={(el) => {
                      inputRefs.current.dob = el;
                    }}
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={inputClass("dob")}
                  />

                  {errors.dob && (
                    <p className="text-error text-[10px] mt-0.5">
                      {errors.dob}
                    </p>
                  )}

                </div>

              </div>

              {/* GENDER */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Gender
                  </span>
                </label>

                <select
                  ref={(el) => {
                    inputRefs.current.gender = el;
                  }}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={selectClass("gender")}
                >

                  <option value="" disabled>
                    Select your gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="other">
                    Other
                  </option>

                  <option value="prefer_not_to_say">
                    Prefer not to say
                  </option>

                </select>

                {errors.gender && (
                  <p className="text-error text-[10px] mt-0.5">
                    {errors.gender}
                  </p>
                )}

              </div>

              {/* PASSWORD */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Password
                  </span>
                </label>

                <div className="relative">

                  <input
                    ref={(el) => {
                      inputRefs.current.password = el;
                    }}
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`${inputClass(
                      "password"
                    )} pr-10`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
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
                    {showPassword ? (
                      <FaEyeSlash size={13} />
                    ) : (
                      <FaEye size={13} />
                    )}
                  </button>

                </div>

                {errors.password ? (
                  <p className="text-error text-[10px] mt-0.5">
                    {errors.password}
                  </p>
                ) : (
                  <p className="text-[10px] text-base-content/50 mt-0.5">
                    8+ chars, uppercase, lowercase
                    and number.
                  </p>
                )}

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="label py-0.5">
                  <span className="label-text text-sm font-medium">
                    Confirm password
                  </span>
                </label>

                <div className="relative">

                  <input
                    ref={(el) => {
                      inputRefs.current.confirmPassword =
                        el;
                    }}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`${inputClass(
                      "confirmPassword"
                    )} pr-10`}
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

                {errors.confirmPassword && (
                  <p className="text-error text-[10px] mt-0.5">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>

              {/* =================================================
                  TERMS
              ================================================== */}

              <div className="pt-1">

                <label
                  className={`
                    flex
                    items-start
                    gap-2
                    cursor-pointer
                    rounded-lg
                    p-1
                    ${
                      errors.terms
                        ? "bg-error/10"
                        : ""
                    }
                  `}
                >

                  <input
                    type="checkbox"
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

              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <button
                type="submit"
                disabled={loading}
                className="
                  btn
                  btn-primary
                  btn-sm
                  w-full
                  font-semibold
                  mt-1
                "
              >

                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}

              </button>

            </form>

            {/* LOGIN */}

            <div className="text-center mt-3">

              <p className="text-xs text-base-content/60">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
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