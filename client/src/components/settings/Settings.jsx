import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaChevronRight,
  FaLock,
  FaUser,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="font-bold">Settings</h1>

            <p className="text-xs text-base-content/50">
              Manage your Mingo account
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="px-5 py-4">
            <h2 className="font-bold">Account Settings</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Manage your account preferences
            </p>
          </div>

          <div className="divide-y divide-base-300">
            {/* Profile */}
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-base-200">
                <FaUser />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Profile</p>

                <p className="text-sm text-base-content/60">
                  Manage your profile information
                </p>
              </div>

              <FaChevronRight className="text-base-content/40" />
            </button>

            {/* Privacy */}
            <button
              type="button"
              onClick={() => navigate("/privacy")}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-base-200">
                <FaLock />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Privacy & Security
                </p>

                <p className="text-sm text-base-content/60">
                  Manage privacy and security
                </p>
              </div>

              <FaChevronRight className="text-base-content/40" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-base-200">
                <FaBell />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Notifications
                </p>

                <p className="text-sm text-base-content/60">
                  Manage notification preferences
                </p>
              </div>

              <FaChevronRight className="text-base-content/40" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;