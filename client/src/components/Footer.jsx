import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
            <a
              href="/"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl font-bold text-primary-content">
                  M
                </span>
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Mingo
              </span>
            </a>

            {/* Description */}
            <p className="mt-5 text-sm leading-6 text-base-content/70 max-w-xs">
              Connect with your friends, share moments and enjoy
              conversations that matter.
            </p>

            {/* ================= SOCIAL ICONS ================= */}
            <div className="flex items-center gap-2 mt-6">

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaFacebookF size={17} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaInstagram size={18} />
              </a>

              {/* X */}
              <a
                href="#"
                aria-label="X"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaXTwitter size={17} />
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="btn btn-circle btn-ghost !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>

              {/* Discord */}
              <a
                href="#"
                aria-label="Discord"
                className="btn btn-circle btn-active !text-primary-content hover:!bg-primary hover:!text-primary-content transition-all duration-200"
              >
                <FaDiscord size={19} />
              </a>

            </div>
          </div>

          {/* ================= PRODUCT ================= */}
          <div>
            <h3 className="font-semibold text-base-content text-base mb-5">
              Product
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Messaging
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Groups
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Notifications
                </a>
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
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Blog
                </a>
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
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  Security
                </a>
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
            Made with{" "}
            <span className="text-error text-base">♥</span>{" "}
            for better conversations
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;