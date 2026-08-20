import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEye,
  FaLock,
  FaShieldAlt,
  FaUserSecret,
} from "react-icons/fa";

const Privacy = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    profileVisibility: true,
    onlineStatus: true,
    readReceipts: true,
  });

  const toggleSetting = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

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
            <h1 className="font-bold">
              Privacy & Security
            </h1>

            <p className="text-xs text-base-content/50">
              Control your privacy and security
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {/* Privacy */}
        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="px-5 py-4">
            <h2 className="font-bold">Privacy</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Control how other Mingo users interact with you.
            </p>
          </div>

          <div className="divide-y divide-base-300">
            {/* Profile Visibility */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaEye />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Profile Visibility
                </p>

                <p className="text-sm text-base-content/60">
                  Allow other users to view your profile.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.profileVisibility}
                onChange={() =>
                  toggleSetting("profileVisibility")
                }
              />
            </div>

            {/* Online Status */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                <FaUserSecret />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Online Status
                </p>

                <p className="text-sm text-base-content/60">
                  Allow others to see when you are online.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.onlineStatus}
                onChange={() =>
                  toggleSetting("onlineStatus")
                }
              />
            </div>

            {/* Read Receipts */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                <FaShieldAlt />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Read Receipts
                </p>

                <p className="text-sm text-base-content/60">
                  Let users know when you read their messages.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.readReceipts}
                onChange={() =>
                  toggleSetting("readReceipts")
                }
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="px-5 py-4">
            <h2 className="font-bold">Security</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Manage your account security.
            </p>
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-4 border-t border-base-300 px-5 py-4 text-left transition hover:bg-base-200"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <FaLock />
            </div>

            <div className="flex-1">
              <p className="font-semibold">
                Change Password
              </p>

              <p className="text-sm text-base-content/60">
                Update your account password.
              </p>
            </div>

            <span className="text-sm text-base-content/40">
              →
            </span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default Privacy;