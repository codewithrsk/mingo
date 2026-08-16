import React from "react";

const ChatHeader = ({ chat, onBack }) => {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-base-300 bg-base-100 px-4 md:px-6">
      {/* Left */}
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
        <div className="relative shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-content">
            {chat.avatar}
          </div>

          {chat.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-success" />
          )}
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h2 className="truncate font-bold">{chat.name}</h2>

          <p className="text-xs text-base-content/50">
            {chat.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Actions */}
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

        <button type="button" className="btn btn-ghost btn-circle" title="More">
          ⋮
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
