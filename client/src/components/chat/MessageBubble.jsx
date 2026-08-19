import React from "react";

const MessageBubble = ({
  message,
  currentUserId,
}) => {
  // =====================================================
  // GET SENDER ID
  // =====================================================

  const senderId =
    message?.senderId?._id ||
    message?.senderId;

  // =====================================================
  // CHECK WHETHER MESSAGE IS MINE
  // =====================================================

  const isMine =
    String(senderId) ===
    String(currentUserId);

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const messageTime = message?.createdAt
    ? new Date(
        message.createdAt
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4
          py-3
          shadow-sm
          md:max-w-[65%]
          ${
            isMine
              ? "rounded-br-md bg-primary text-primary-content"
              : "rounded-bl-md bg-base-100"
          }
        `}
      >

        {/* Message */}

        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed md:text-[15px]">
          {message?.message}
        </p>

        {/* Time */}

        <div
          className={`
            mt-1
            flex
            items-center
            justify-end
            gap-1
            text-[10px]
            ${
              isMine
                ? "text-primary-content/60"
                : "text-base-content/40"
            }
          `}
        >

          <span>
            {messageTime}
          </span>

          {/* Sent check */}

          {isMine && (
            <span className="text-sm">
              ✓
            </span>
          )}

        </div>

      </div>

    </div>
  );
};

export default MessageBubble;