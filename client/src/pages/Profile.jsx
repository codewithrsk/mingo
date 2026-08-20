import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  FaArrowLeft,
  FaBell,
  FaChevronRight,
  FaCog,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import EditProfileModal from "../components/profile/EditProfileModal";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      }

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-circle"
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-lg font-bold">My Profile</h1>

          <button
            type="button"
            onClick={() => setEditing(true)}
            className="btn btn-ghost btn-circle"
            aria-label="Edit profile"
          >
            <FaCog />
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-6 pb-12">
        {/* Profile Header */}
        <ProfileHeader
          user={user}
          onEdit={() => setEditing(true)}
        />

        {/* Profile Information */}
        <ProfileInfo user={user} />

        {/* Account */}
        <section className="mt-5 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
          <div className="px-5 py-4 sm:px-6">
            <h2 className="font-bold">Account</h2>

            <p className="mt-1 text-sm text-base-content/60">
              Manage your Mingo account
            </p>
          </div>

          <div className="divide-y divide-base-300">
            {/* Settings */}
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200 sm:px-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-200 transition group-hover:bg-primary/10 group-hover:text-primary">
                <FaCog />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold">Settings</p>

                <p className="text-sm text-base-content/60">
                  Manage your Mingo preferences
                </p>
              </div>

              <FaChevronRight className="text-sm text-base-content/40" />
            </button>

            {/* Privacy */}
            <button
              type="button"
              onClick={() => navigate("/privacy")}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200 sm:px-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-200 transition group-hover:bg-primary/10 group-hover:text-primary">
                <FaLock />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold">Privacy & Security</p>

                <p className="text-sm text-base-content/60">
                  Control your privacy and security
                </p>
              </div>

              <FaChevronRight className="text-sm text-base-content/40" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-base-200 sm:px-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-200 transition group-hover:bg-primary/10 group-hover:text-primary">
                <FaBell />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold">Notifications</p>

                <p className="text-sm text-base-content/60">
                  Manage notification preferences
                </p>
              </div>

              <FaChevronRight className="text-sm text-base-content/40" />
            </button>
          </div>
        </section>

        {/* Logout */}
        <section className="mt-5">
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-error btn-outline h-12 w-full gap-2 rounded-2xl"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </section>

        {/* Account Type */}
        <div className="mt-5 text-center">
          <span className="text-xs text-base-content/40">
            Mingo Account ·{" "}
            <span className="capitalize">
              {user?.userType || "user"}
            </span>
          </span>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {editing && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default Profile;