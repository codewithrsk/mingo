import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="shrink-0 border-t border-base-300 bg-base-100 px-3 py-3 md:px-6">
      <div className="mx-auto flex max-w-4xl items-center gap-9 justify-center md:justify-between">
        {/* Attachment */}
        <label
          htmlFor="file-input"
          className="btn btn-ghost btn-circle shrink-0"
          title="Attach file"
        >
          📎
        </label>
        <input type="file" id="file-input" className="hidden" />

        {/* Input */}
        <div className="relative flex-1 justify-center items-center">
          <textarea
            rows="1"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="
              textarea
              textarea-bordered
              min-h-12
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
              bottom-3
              right-2
            "
            title="Emoji"
          >
            😊
          </button>
        </div>

        {/* Send / Voice */}
        {message.trim() ? (
          <button
            type="button"
            onClick={sendMessage}
            className="btn btn-primary btn-circle shrink-0"
            title="Send message"
          >
            ➤
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-circle shrink-0"
            title="Voice message"
          >
            🎤
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
