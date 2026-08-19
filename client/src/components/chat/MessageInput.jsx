import React, { useState } from "react";

const MessageInput = ({
  onSend,
  sending,
}) => {
  const [message, setMessage] =
    useState("");

  // =====================================================
  // SEND
  // =====================================================

  const handleSend = async () => {
    const text = message.trim();

    if (!text || sending) {
      return;
    }

    const success =
      await onSend(text);

    if (success) {
      setMessage("");
    }
  };

  // =====================================================
  // ENTER TO SEND
  // =====================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="shrink-0 border-t border-base-300 bg-base-100 px-3 py-3 md:px-6">

      <div className="mx-auto flex max-w-4xl items-end gap-2">

        {/* =================================================
            ATTACHMENT
        ================================================= */}

        <button
          type="button"
          className="btn btn-ghost btn-circle shrink-0"
          title="Attach"
        >
          📎
        </button>

        {/* =================================================
            MESSAGE INPUT
        ================================================= */}

        <div className="relative flex-1">

          <textarea
            rows="1"
            value={message}
            disabled={sending}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="
              textarea
              textarea-bordered
              min-h-[48px]
              max-h-32
              w-full
              resize-none
              rounded-2xl
              bg-base-200
              pr-12
              focus:border-primary
              focus:outline-none
            "
          />

          {/* Emoji */}

          <button
            type="button"
            className="
              btn
              btn-ghost
              btn-circle
              btn-sm
              absolute
              bottom-2
              right-2
            "
            title="Emoji"
          >
            😊
          </button>

        </div>

        {/* =================================================
            SEND BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleSend}
          disabled={
            sending ||
            !message.trim()
          }
          className="btn btn-primary btn-circle shrink-0"
          title="Send"
        >
          {sending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "➤"
          )}
        </button>

      </div>

    </div>
  );
};

export default MessageInput;