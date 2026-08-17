import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
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
                  src={logo2}
                  alt="Mingo"
                  className="
                                h-full
                                w-auto
                                max-w-32
                                object-contain
                              "
                />
              </div>
            </Link>

            {/* Description */}
            <p className="mt-5 text-sm leading-6 text-base-content/70 max-w-xs">
              Connect with your friends, share moments and enjoy conversations
              that matter.
            </p>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="flex items-center gap-2 mt-6">
              {/* Facebook */}
              <Link
                to="#"
                aria-label="Facebook"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaFacebookF size={17} />
              </Link>

              {/* Instagram */}
              <Link
                to="#"
                aria-label="Instagram"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaInstagram size={18} />
              </Link>

              {/* X */}
              <Link
                to="#"
                aria-label="X"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaXTwitter size={17} />
              </Link>

              {/* GitHub */}
              <Link
                to="#"
                aria-label="GitHub"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaGithub size={18} />
              </Link>

              {/* Discord */}
              <Link
                to="#"
                aria-label="Discord"
                className="btn btn-circle btn-active !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaDiscord size={19} />
              </Link>
            </div>
          </div>

          {/* ================= PRODUCT ================= */}
          <div>
            <h3 className="font-semibold text-base-content text-base mb-5">
              Product
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Messaging
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Groups
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COMPANY ================= */}
          <div>
            <h3 className="font-semibold text-base-content text-base mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= LEGAL ================= */}
          <div>
            <h3 className="font-semibold text-base-content text-base mb-5">
              Legal
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="divider my-8" />

        {/* ================= BOTTOM FOOTER ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-base-content/60 text-center md:text-left">
            © {currentYear} Mingo. All rights reserved.
          </p>

          {/* Made With */}
          <p className="text-sm text-base-content/60 text-center">
            Made with <span className="text-error text-base">♥</span> for better
            conversations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
