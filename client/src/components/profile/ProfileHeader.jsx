import React from "react";
import {
  FaEdit,
  FaUser,
  FaUserShield,
} from "react-icons/fa";

const ProfileHeader = ({ user, onEdit }) => {
  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      {/* Cover */}
      <div className="relative h-32 overflow-hidden bg-primary sm:h-40">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent" />

        <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Profile Content */}
      <div className="relative px-5 pb-6 sm:px-7">
        {/* Avatar */}
        <div className="-mt-16 flex items-end justify-between sm:-mt-20">
          <div className="relative">
            <div className="avatar">
              <div className="size-28 overflow-hidden rounded-full border-4 border-base-100 bg-base-200 shadow-xl sm:size-32">
                {user?.photo?.url ? (
                  <img
                    src={user.photo.url}
                    alt={user?.fullName || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
                    {getInitial()}
                  </div>
                )}
              </div>
            </div>

            {/* Online Indicator */}
            <span className="absolute bottom-2 right-2 size-5 rounded-full border-4 border-base-100 bg-success" />
          </div>

          {/* Desktop Edit */}
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-primary btn-sm hidden gap-2 sm:flex"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* Mobile Edit */}
        <div className="mt-4 sm:hidden">
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-primary btn-sm w-full gap-2"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* Name */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {user?.fullName || "User"}
            </h2>

            {user?.userType === "admin" && (
              <span className="badge badge-primary gap-1">
                <FaUserShield className="text-xs" />
                Admin
              </span>
            )}
          </div>

          <p className="mt-1 flex items-center gap-2 text-sm text-base-content/60">
            <FaUser className="text-xs" />
            Mingo User
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;