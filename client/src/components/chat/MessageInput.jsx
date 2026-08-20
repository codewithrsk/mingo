import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaPaperclip,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";

const MessageInput = ({
  onSend,
  sending,
}) => {
  const [message, setMessage] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const fileInputRef =
    useRef(null);

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setSelectedFile(file);

    if (
      file.type.startsWith(
        "image/"
      )
    ) {
      const preview =
        URL.createObjectURL(file);

      setImagePreview(preview);
    } else {
      setImagePreview(null);
    }

    event.target.value = "";
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const handleRemoveFile = () => {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImagePreview(null);
    setSelectedFile(null);
  };

  // =====================================================
  // SEND
  // =====================================================

  const handleSend = async () => {
    const text =
      message.trim();

    if (
      (!text && !selectedFile) ||
      sending
    ) {
      return;
    }

    /*
     * For now the confirmed backend API
     * sends text messages.
     */

    const success =
      await onSend(
        text,
        selectedFile
      );

    if (success) {
      setMessage("");

      if (imagePreview) {
        URL.revokeObjectURL(
          imagePreview
        );
      }

      setImagePreview(null);
      setSelectedFile(null);
    }
  };

  // =====================================================
  // ENTER
  // =====================================================

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  // =====================================================
  // SEND BUTTON
  // =====================================================

  const canSend =
    !sending &&
    (
      message.trim().length > 0 ||
      selectedFile !== null
    );

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="shrink-0 border-t border-base-300 bg-base-100 px-3 py-3 md:px-6">

      <div className="mx-auto max-w-4xl">

        {/* =================================================
            COMPOSER
        ================================================= */}

        <div className="flex items-end gap-2">

          {/* ATTACH */}

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={sending}
            className="btn btn-ghost btn-circle shrink-0"
            title="Attach file"
          >
            <FaPaperclip />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={
              handleFileChange
            }
          />

          {/* MESSAGE BOX */}

          <div className="relative flex-1">

            {/* IMAGE PREVIEW */}

            {imagePreview && (
              <div className="absolute bottom-full left-0 mb-2">

                <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-lg">

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="block max-h-40 max-w-[220px] object-cover"
                  />

                </div>

              </div>
            )}

            {/* TEXT */}

            <textarea
              rows="1"
              value={message}
              disabled={sending}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
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

            {/* EMOJI */}

            <button
              type="button"
              disabled={sending}
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
              <FaSmile />
            </button>

          </div>

          {/* SEND */}

          <button
            type="button"
            onClick={
              handleSend
            }
            disabled={!canSend}
            className={`btn btn-circle shrink-0 ${
              canSend
                ? "btn-primary"
                : "btn-disabled"
            }`}
            title="Send"
          >
            {sending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <FaPaperPlane />
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default MessageInput;