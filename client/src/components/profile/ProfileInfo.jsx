import React from "react";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaMars,
  FaPhone,
  FaVenus,
  FaVenusMars,
} from "react-icons/fa";

const ProfileInfo = ({ user }) => {
  const formatDate = (date) => {
    if (!date) {
      return "Not provided";
    }

    const formatted = new Date(date);

    if (Number.isNaN(formatted.getTime())) {
      return "Not provided";
    }

    return formatted.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getGenderIcon = () => {
    const gender = user?.gender?.toLowerCase();

    if (gender === "male") {
      return <FaMars />;
    }

    if (gender === "female") {
      return <FaVenus />;
    }

    return <FaVenusMars />;
  };

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
      <div className="border-b border-base-300 px-5 py-4 sm:px-6">
        <h2 className="font-bold">Personal Information</h2>

        <p className="mt-1 text-sm text-base-content/60">
          Your basic account information
        </p>
      </div>

      <div className="grid gap-px bg-base-300 sm:grid-cols-2">
        {/* Email */}
        <div className="bg-base-100 p-5">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FaEnvelope />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                Email
              </p>

              <p className="mt-1 break-all font-medium">
                {user?.email || "Not provided"}
              </p>

              {user?.email && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success">
                  <FaCheckCircle />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-base-100 p-5">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <FaPhone />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                Phone
              </p>

              <p className="mt-1 font-medium">
                {user?.phone || "Not provided"}
              </p>

              {user?.phone && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success">
                  <FaCheckCircle />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DOB */}
        <div className="bg-base-100 p-5">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FaCalendarAlt />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                Date of Birth
              </p>

              <p className="mt-1 font-medium">
                {formatDate(user?.dob)}
              </p>
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="bg-base-100 p-5">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
              {getGenderIcon()}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-base-content/50">
                Gender
              </p>

              <p className="mt-1 font-medium capitalize">
                {user?.gender || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;