import React, { useEffect, useState,useRef } from "react";
import { useAuth } from "../context/AuthContext";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";

import api from "../config/Api.config";

const Chat = () => {
  const { user } = useAuth();

  // =====================================================
  // STATES
  // =====================================================

  const [users, setUsers] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const [showSidebar, setShowSidebar] = useState(true);

  const messagesEndRef = useRef(null);

  // Current logged-in user ID
  const currentUserId = user?._id;

  // =====================================================
  // GET ALL USERS
  // =====================================================

  const getAllUsers = async () => {
    try {
      setLoadingUsers(true);

      const response = await api.get("/user/allUsers");

      console.log("All Users:", response.data);

      const usersData =
        response.data?.users ||
        response.data?.data ||
        response.data;

      if (Array.isArray(usersData)) {
        // Remove logged-in user
        const friends = usersData.filter(
          (item) =>
            String(item._id) !== String(currentUserId)
        );

        setUsers(friends);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  // =====================================================
  // FETCH CHAT DATA
  // =====================================================

  const fetchChatData = async () => {
    if (!selectedFriend?._id) {
      return;
    }

    try {
      const friendId = selectedFriend._id;

      const response = await api.get(
        `/user/get-messages/${friendId}`
      );

      console.log("Chat Data:", response.data);

      const messagesData =
        response.data?.messages ||
        response.data?.data ||
        response.data;

      if (Array.isArray(messagesData)) {
        setMessages(messagesData);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  // =====================================================
  // GET USERS WHEN CHAT PAGE LOADS
  // =====================================================

  useEffect(() => {
    if (!currentUserId) {
      return;
    }

    getAllUsers();
  }, [currentUserId]);

  // =====================================================
  // SELECT FRIEND
  // =====================================================

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);

    // Clear previous friend's messages immediately
    setMessages([]);

    // Mobile: hide sidebar
    setShowSidebar(false);
  };

  // =====================================================
  // FETCH MESSAGES WHENEVER FRIEND CHANGES
  // =====================================================

  useEffect(() => {
    if (!selectedFriend?._id) {
      return;
    }

    // Initial loading state
    setLoadingMessages(true);

    // ===================================================
    // FIRST FETCH
    // ===================================================

    const loadInitialMessages = async () => {
      try {
        const friendId = selectedFriend._id;

        const response = await api.get(
          `/user/get-messages/${friendId}`
        );

        console.log(
          "Initial Messages:",
          response.data
        );

        const messagesData =
          response.data?.messages ||
          response.data?.data ||
          response.data;

        if (Array.isArray(messagesData)) {
          setMessages(messagesData);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error(
          "Error fetching initial messages:",
          error
        );

        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    loadInitialMessages();

    // ===================================================
    // FETCH EVERY 2 SECONDS
    // ===================================================

    const interval = setInterval(() => {
      fetchChatData();
    }, 2000);

    // ===================================================
    // CLEANUP OLD INTERVAL
    // ===================================================

    return () => {
      clearInterval(interval);
    };
  }, [selectedFriend]);

  // is selected, scroll to the bottom.
  useEffect(() => {
    if (!selectedFriend?._id) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (message) => {
    if (
      !selectedFriend?._id ||
      !message.trim() ||
      sending
    ) {
      return false;
    }

    try {
      setSending(true);

      const response = await api.post(
        "/user/send-message",
        {
          receiverID: selectedFriend._id,
          message: message.trim(),
        }
      );

      console.log(
        "Message sent:",
        response.data
      );

      // Refresh immediately
      await fetchChatData();

      return true;
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );

      return false;
    } finally {
      setSending(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-[91vh] w-full overflow-hidden bg-base-200 text-base-content">
      <div className="flex h-full">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <div
          className={`
            h-full
            w-full
            ${
              showSidebar
                ? "flex"
                : "hidden"
            }
            md:flex
            md:w-auto
          `}
        >
          <ChatSidebar
            users={users}
            selectedFriend={selectedFriend}
            onSelectFriend={handleSelectFriend}
            search={search}
            setSearch={setSearch}
            loading={loadingUsers}
          />
        </div>

        {/* =================================================
            CHAT AREA
        ================================================= */}

        <main
          className={`
            h-full
            min-w-0
            flex-1
            flex-col
            ${
              showSidebar
                ? "hidden md:flex"
                : "flex"
            }
          `}
        >

          {/* =================================================
              NO FRIEND SELECTED
          ================================================= */}

          {!selectedFriend ? (
            <div className="flex h-full flex-1 items-center justify-center bg-base-200">

              <div className="px-6 text-center">

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-4xl font-bold text-primary-content shadow-lg">
                  M
                </div>

                <h1 className="text-2xl font-bold">
                  Welcome to Mingo
                </h1>

                <p className="mx-auto mt-2 max-w-md text-base-content/50">
                  Select a friend from the sidebar
                  to start chatting.
                </p>

              </div>

            </div>
          ) : (
            <>
              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <ChatHeader
                friend={selectedFriend}
                onBack={() => setShowSidebar(true)}
              />

              {/* =================================================
                  MESSAGE AREA
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8">

                {loadingMessages ? (
                  <div className="flex h-full items-center justify-center">

                    <span className="loading loading-spinner loading-lg text-primary" />

                  </div>
                ) : messages.length === 0 ? (
                  /* ===============================================
                     NO MESSAGES
                  =============================================== */

                  <div className="flex h-full flex-col items-center justify-center text-center">

                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl">
                      👋
                    </div>

                    <h2 className="text-xl font-bold">
                      Start a conversation
                    </h2>

                    <p className="mt-2 max-w-sm text-sm text-base-content/50">
                      No messages yet with{" "}

                      <span className="font-semibold text-base-content">
                        {selectedFriend.fullName}
                      </span>
                      .
                    </p>

                  </div>
                ) : (
                  <>
                    {/* Date */}

                    <div className="mb-6 flex justify-center">

                      <span className="rounded-full bg-base-100 px-4 py-1.5 text-xs text-base-content/50 shadow-sm">
                        Today
                      </span>

                    </div>

                    {/* Messages */}

                    <div className="mx-auto max-w-4xl space-y-3">

                      {messages.map(
                        (message, index) => (
                          <MessageBubble
                            key={
                              message._id ||
                              index
                            }
                            message={message}
                            currentUserId={
                              currentUserId
                            }
                          />
                        )
                      )}

                    </div>
                    <div ref={messagesEndRef}></div>
                    
                  </>
                )}

              </div>

              {/* =================================================
                  MESSAGE INPUT
              ================================================= */}

              <MessageInput
                onSend={handleSendMessage}
                sending={sending}
              />
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default Chat;