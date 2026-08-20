import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaComments,
  FaEnvelope,
  FaUserPlus,
} from "react-icons/fa";

const Notifications = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    messages: true,
    email: true,
    friendRequests: true,
    mentions: true,
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
            <h1 className="font-bold">Notifications</h1>

            <p className="text-xs text-base-content/50">
              Manage your notification preferences
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="px-5 py-4">
            <h2 className="font-bold">
              Notification Preferences
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              Choose what notifications you want to receive.
            </p>
          </div>

          <div className="divide-y divide-base-300">
            {/* Messages */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FaComments />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Messages</p>

                <p className="text-sm text-base-content/60">
                  Get notified when someone sends you a message.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.messages}
                onChange={() => toggleSetting("messages")}
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <FaEnvelope />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Email Notifications
                </p>

                <p className="text-sm text-base-content/60">
                  Receive important updates through email.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.email}
                onChange={() => toggleSetting("email")}
              />
            </div>

            {/* Friend Requests */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FaUserPlus />
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  Friend Requests
                </p>

                <p className="text-sm text-base-content/60">
                  Get notified about new connection requests.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.friendRequests}
                onChange={() =>
                  toggleSetting("friendRequests")
                }
              />
            </div>

            {/* Mentions */}
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                <FaBell />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Mentions</p>

                <p className="text-sm text-base-content/60">
                  Get notified when someone mentions you.
                </p>
              </div>

              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.mentions}
                onChange={() => toggleSetting("mentions")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Notifications;