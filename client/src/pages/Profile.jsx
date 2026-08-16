import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: user?.fullName,
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setEditing(false);
      const req = toast.success("Profile updated successfully!");
    } catch (error) {}
  };

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      }

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">My Profile</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Manage your Mingo profile and account
            </p>
          </div>

          <button onClick={() => navigate("/")} className="btn btn-ghost">
            ← Back
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="card overflow-hidden bg-base-100 shadow-xl">
          {/* Cover */}
          <div className="relative h-44 bg-primary">
            <div className="absolute inset-0 bg-linear-to-r from-primary via-secondary to-accent opacity-80" />
          </div>

          {/* Profile Section */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="-mt-16 mb-4 flex items-end justify-between">
              <div className="avatar">
                <div className="w-32 rounded-full border-4 border-base-100 bg-base-200 shadow-lg">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt="Profile" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
                      {profile.fullName?.charAt(0)?.toUpperCase() || "R"}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setEditing(!editing)}
                className={`btn ${editing ? "btn-ghost" : "btn-primary"}`}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Name */}
            {!editing ? (
              <>
                <h2 className="text-2xl font-bold text-base-content">
                  {profile.fullName}
                </h2>

                <p className="text-base-content/60">@{profile.username}</p>

                <p className="mt-3 max-w-2xl text-base-content/80">
                  {profile.bio}
                </p>
              </>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Username</span>
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium">Bio</span>
                  </label>

                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button onClick={handleSave} className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-2xl font-bold text-primary">128</span>
              <span className="text-sm text-base-content/60">Friends</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-2xl font-bold text-secondary">24</span>
              <span className="text-sm text-base-content/60">Groups</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-2xl font-bold text-accent">1.2K</span>
              <span className="text-sm text-base-content/60">Messages</span>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body items-center text-center">
              <span className="text-2xl font-bold text-success">98%</span>
              <span className="text-sm text-base-content/60">Activity</span>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="mb-4 text-xl font-bold">Account Information</h3>

            <div className="divide-y divide-base-300">
              {/* Email */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-sm text-base-content/60">
                    {profile.email}
                  </p>
                </div>

                <span className="badge badge-success">Verified</span>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">Phone Number</p>
                  <p className="text-sm text-base-content/60">
                    {profile.phone}
                  </p>
                </div>

                <span className="badge badge-success">Verified</span>
              </div>

              {/* Username */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">Username</p>
                  <p className="text-sm text-base-content/60">
                    @{profile.username}
                  </p>
                </div>

                <button className="btn btn-sm btn-ghost">Change</button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-6 card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="mb-3 text-xl font-bold">Account Settings</h3>

            <div className="space-y-2">
              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center justify-between rounded-xl p-4 text-left transition hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-sm text-base-content/60">
                    Manage your Mingo preferences
                  </p>
                </div>

                <span className="text-xl">›</span>
              </button>

              <button
                onClick={() => navigate("/privacy")}
                className="flex w-full items-center justify-between rounded-xl p-4 text-left transition hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">Privacy & Security</p>
                  <p className="text-sm text-base-content/60">
                    Control your privacy and security
                  </p>
                </div>

                <span className="text-xl">›</span>
              </button>

              <button
                onClick={() => navigate("/notifications")}
                className="flex w-full items-center justify-between rounded-xl p-4 text-left transition hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-base-content/60">
                    Manage notification preferences
                  </p>
                </div>

                <span className="text-xl">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6 mb-10">
          <button
            onClick={handleLogout}
            className="btn btn-error btn-outline w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
