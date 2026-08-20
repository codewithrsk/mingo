import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaCalendarAlt,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const EditProfileModal = ({ user, onClose }) => {
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    photo: {
      url: "",
      publicId: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    setProfile({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dob: user?.dob ? user.dob.substring(0, 10) : "",
      gender: user?.gender || "",
      photo: {
        url: user?.photo?.url || "",
        publicId: user?.photo?.publicId || "",
      },
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getInitial = () => {
    return profile.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      /*
       * Connect your real update API here.
       *
       * Example:
       *
       * await api.put("/user/update-profile", {
       *   fullName: profile.fullName,
       *   email: profile.email,
       *   phone: profile.phone,
       *   dob: profile.dob,
       *   gender: profile.gender,
       * });
       */

      toast.success("Profile updated successfully!");

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          if (!saving) {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-base-300 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-xl font-bold">
              Edit Profile
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              Update your personal information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm"
            disabled={saving}
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-6 sm:px-6">
          {/* Profile Photo */}
          <div className="mb-7 flex flex-col items-center">
            <div className="relative">
              <div className="avatar">
                <div className="size-28 overflow-hidden rounded-full border-4 border-base-200 bg-base-200 shadow-lg">
                  {profile.photo?.url ? (
                    <img
                      src={profile.photo.url}
                      alt={profile.fullName || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
                      {getInitial()}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-circle btn-sm absolute bottom-0 right-0 border-4 border-base-100"
                title="Change profile photo"
              >
                <FaCamera className="text-xs" />
              </button>
            </div>

            <p className="mt-2 text-xs text-base-content/50">
              Profile photo
            </p>
          </div>

          {/* Form */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="label">
                <span className="label-text font-medium">
                  Full Name
                </span>
              </label>

              <label className="input input-bordered flex w-full items-center gap-3">
                <FaUser className="shrink-0 text-base-content/40" />

                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="grow"
                />
              </label>
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Email
                </span>
              </label>

              <label className="input input-bordered flex w-full items-center gap-3">
                <FaEnvelope className="shrink-0 text-base-content/40" />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="grow"
                />
              </label>
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Phone
                </span>
              </label>

              <label className="input input-bordered flex w-full items-center gap-3">
                <FaPhone className="shrink-0 text-base-content/40" />

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="grow"
                />
              </label>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Date of Birth
                </span>
              </label>

              <label className="input input-bordered flex w-full items-center gap-3">
                <FaCalendarAlt className="shrink-0 text-base-content/40" />

                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className="grow"
                />
              </label>
            </div>

            {/* Gender */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Gender
                </span>
              </label>

              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-base-300 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary gap-2"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;