import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaComments,
  FaFile,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import api from "../config/Api.config";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";

const Chat = () => {
  const { user } = useAuth();
  const { friendId } = useParams();

  const messagesEndRef = useRef(null);

  // =====================================================
  // STATE
  // =====================================================

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);

      const response = await api.get("/user/allUsers");

      const data = response?.data;

      const userList =
        data?.users ||
        data?.data ||
        data ||
        [];

      setUsers(
        Array.isArray(userList)
          ? userList
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching users:",
        error
      );

      toast.error("Unable to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // =====================================================
  // SELECT USER FROM URL
  // =====================================================

  useEffect(() => {
    if (!users.length) {
      return;
    }

    if (friendId) {
      const foundUser = users.find(
        (item) =>
          item?._id === friendId ||
          item?.id === friendId
      );

      if (foundUser) {
        setSelectedUser(foundUser);
      }

      return;
    }

    // Select first user when no friendId exists
    if (!selectedUser) {
      const firstUser = users.find(
        (item) =>
          item?._id !== user?._id &&
          item?.id !== user?.id
      );

      if (firstUser) {
        setSelectedUser(firstUser);
      }
    }
  }, [
    users,
    friendId,
    selectedUser,
    user?._id,
    user?.id,
  ]);

  // =====================================================
  // FETCH MESSAGES
  // =====================================================

  const fetchChatData = useCallback(async () => {
    const currentFriendId =
      friendId ||
      selectedUser?._id ||
      selectedUser?.id;

    if (!currentFriendId) {
      setMessages([]);
      return;
    }

    try {
      setLoadingMessages(true);

      const response = await api.get(
        `/user/get-messages/${currentFriendId}`
      );

      const data = response?.data;

      const messageList =
        data?.messages ||
        data?.data ||
        data ||
        [];

      setMessages(
        Array.isArray(messageList)
          ? messageList
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error
      );
    } finally {
      setLoadingMessages(false);
    }
  }, [
    friendId,
    selectedUser?._id,
    selectedUser?.id,
  ]);

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =====================================================
  // FETCH CHAT + POLLING
  // =====================================================

  useEffect(() => {
    fetchChatData();

    const interval = setInterval(() => {
      fetchChatData();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchChatData]);

  // =====================================================
  // SCROLL TO BOTTOM
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================================
  // SELECT FRIEND
  // =====================================================

  const handleSelectFriend = (friend) => {
    setSelectedUser(friend);
    setMessages([]);
    setSelectedFile(null);
  };

  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileSelect = (file) => {
    if (!file) {
      return;
    }

    setSelectedFile(file);
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (text) => {
    const currentFriendId =
      friendId ||
      selectedUser?._id ||
      selectedUser?.id;

    if (!text?.trim()) {
      return false;
    }

    if (!currentFriendId) {
      toast.error("Please select a user");
      return false;
    }

    if (sending) {
      return false;
    }

    try {
      setSending(true);

      await api.post(
        "/user/send-message",
        {
          receiverId: currentFriendId,
          message: text.trim(),
        }
      );

      await fetchChatData();

      setSelectedFile(null);

      return true;
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to send message"
      );

      return false;
    } finally {
      setSending(false);
    }
  };

  // =====================================================
  // CURRENT USER ID
  // =====================================================

  const currentUserId =
    user?._id ||
    user?.id;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-[91vh] overflow-hidden bg-base-200">
      <div className="mx-auto flex h-full max-w-[1600px] overflow-hidden border-x border-base-300 bg-base-100">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <ChatSidebar
          users={users}
          selectedFriend={selectedUser}
          onSelectFriend={handleSelectFriend}
          search={search}
          setSearch={setSearch}
          loading={loadingUsers}
        />

        {/* =================================================
            CHAT AREA
        ================================================= */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* =================================================
              NO USER SELECTED
          ================================================= */}

          {!selectedUser ? (
            <div className="flex flex-1 items-center justify-center bg-base-100 px-6">
              <div className="max-w-sm text-center">

                <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaComments className="text-3xl" />
                </div>

                <h2 className="text-xl font-bold">
                  Welcome to Mingo
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Select a conversation to start
                  chatting.
                </p>

              </div>
            </div>
          ) : (
            <>
              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <ChatHeader
                user={selectedUser}
              />

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-y-auto bg-base-200/40 px-3 py-4 md:px-6">
                <div className="mx-auto flex max-w-4xl flex-col gap-2">

                  {loadingMessages &&
                  messages.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                      <span className="loading loading-spinner loading-md text-primary" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="text-center">

                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FaComments className="text-2xl" />
                        </div>

                        <h3 className="font-semibold">
                          No messages yet
                        </h3>

                        <p className="mt-1 text-sm text-base-content/60">
                          Start the conversation with{" "}
                          {selectedUser?.fullName ||
                            "this user"}
                          .
                        </p>

                      </div>
                    </div>
                  ) : (
                    messages.map(
                      (message, index) => (
                        <MessageBubble
                          key={
                            message?._id ||
                            message?.id ||
                            index
                          }
                          message={message}
                          currentUserId={
                            currentUserId
                          }
                          user={user}
                        />
                      )
                    )
                  )}

                  <div ref={messagesEndRef} />

                </div>
              </div>

              {/* =================================================
                  SELECTED FILE
              ================================================= */}

              {selectedFile && (
                <div className="border-t border-base-300 bg-base-100 px-3 pt-2 md:px-6">
                  <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-xl border border-base-300 bg-base-200 px-3 py-2">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FaFile />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {selectedFile.name}
                      </p>

                      <p className="text-xs text-base-content/50">
                        {(
                          selectedFile.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={
                        handleRemoveFile
                      }
                      className="btn btn-ghost btn-circle btn-sm"
                      title="Remove file"
                    >
                      <FaTimes />
                    </button>

                  </div>
                </div>
              )}

              {/* =================================================
                  MESSAGE INPUT
              ================================================= */}

              <MessageInput
                onSend={handleSendMessage}
                sending={sending}
                onFileSelect={
                  handleFileSelect
                }
              />

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;