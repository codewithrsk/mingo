import React from "react";

const MessageBubble = ({ message }) => {
  const isMine = message.sender === "me";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
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
        {/* Text */}
        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed md:text-[15px]">
          {message.text}
        </p>

        {/* Time + Read Status */}
        <div
          className={`
            mt-1
            flex
            items-center
            justify-end
            gap-1
            text-[10px]
            ${isMine ? "text-primary-content/60" : "text-base-content/40"}
          `}
        >
          <span>{message.time}</span>

          {isMine && (
            <span className="text-sm">{message.seen ? "✓✓" : "✓"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
