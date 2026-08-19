import React from "react";

const ChatHeader = ({
  friend,
  onBack,
}) => {
  const name =
    friend?.fullName || "User";

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = () => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-base-300 bg-base-100 px-4 md:px-6">

      {/* =================================================
          FRIEND INFORMATION
      ================================================= */}

      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Back */}

        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost btn-circle md:hidden"
          title="Back"
        >
          ←
        </button>

        {/* Avatar */}

        <div className="shrink-0">

          {friend?.photo?.url ? (
            <img
              src={friend.photo.url}
              alt={name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-content">
              {getInitials()}
            </div>
          )}

        </div>

        {/* Name */}

        <div className="min-w-0">

          <h2 className="truncate font-bold">
            {name}
          </h2>

          <p className="text-xs text-base-content/50">
            Mingo user
          </p>

        </div>

      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="flex items-center gap-1">

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="Search"
        >
          🔍
        </button>

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="Voice call"
        >
          📞
        </button>

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="Video call"
        >
          📹
        </button>

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          title="More"
        >
          ⋮
        </button>

      </div>

    </header>
  );
};

export default ChatHeader;