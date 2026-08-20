import React from "react";

import {
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";

const MessageBubble = ({
  message,
  currentUserId,
}) => {
  // =====================================================
  // MESSAGE ID
  // =====================================================

  const senderId =
    message?.senderId?._id ||
    message?.senderId ||
    message?.sender?._id ||
    message?.sender?.id ||
    message?.sender ||
    "";

  const normalizedCurrentUserId =
    currentUserId?.toString();

  const normalizedSenderId =
    senderId?.toString();

  const isMine =
    normalizedSenderId ===
    normalizedCurrentUserId;

  // =====================================================
  // MESSAGE TEXT
  // =====================================================

  const text =
    message?.message ||
    message?.text ||
    message?.content ||
    "";

  // =====================================================
  // TIME
  // =====================================================

  const messageDate =
    message?.createdAt ||
    message?.timestamp;

  const formattedTime = messageDate
    ? new Date(
        messageDate
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "";

  // =====================================================
  // STATUS
  // =====================================================

  const isRead =
    message?.isRead ||
    message?.read ||
    message?.seen;

  return (
    <div
      className={`flex w-full ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-2.5
          shadow-sm
          ${
            isMine
              ? "rounded-br-md bg-primary text-primary-content"
              : "rounded-bl-md bg-base-100 text-base-content border border-base-300"
          }
        `}
      >

        {/* MESSAGE */}

        {text && (
          <p className="whitespace-pre-wrap break-words text-sm">
            {text}
          </p>
        )}

        {/* TIME */}

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
                ? "text-primary-content/70"
                : "text-base-content/40"
            }
          `}
        >
          <span>
            {formattedTime}
          </span>

          {isMine &&
            (isRead ? (
              <FaCheckDouble />
            ) : (
              <FaCheck />
            ))}
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;