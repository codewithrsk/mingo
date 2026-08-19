import React, { useEffect, useRef, useState } from "react";

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

  // =====================================================
  // REFS - ONLY FOR CHAT SCROLL
  // =====================================================

  const messagesContainerRef = useRef(null);

  const messagesEndRef = useRef(null);

  // =====================================================
  // CURRENT USER
  // =====================================================

  const currentUserId = user?._id;

  // =====================================================
  // GET ALL USERS
  // =====================================================

  const getAllUsers = async () => {
    try {
      setLoadingUsers(true);

      const response = await api.get("/user/allUsers");

      const usersData =
        response.data?.users || response.data?.data || response.data;

      if (Array.isArray(usersData)) {
        const friends = usersData.filter(
          (item) => String(item._id) !== String(currentUserId),
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
  // CHECK IF USER IS NEAR BOTTOM
  // =====================================================

  const isNearBottom = () => {
    const container = messagesContainerRef.current;

    if (!container) {
      return true;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    return distanceFromBottom < 150;
  };

  // =====================================================
  // SCROLL TO BOTTOM
  // =====================================================

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({
      behavior,
      block: "end",
    });
  };

  // =====================================================
  // GET MESSAGES
  // ONLY FUNCTION THAT CALLS GET-MESSAGES API
  // =====================================================

  const fetchChatData = async () => {
    if (!selectedFriend?._id) {
      return;
    }

    try {
      const shouldScroll = isNearBottom();

      const friendId = selectedFriend._id;

      const response = await api.get(`/user/get-messages/${friendId}`);

      const messagesData =
        response.data?.messages || response.data?.data || response.data;

      if (Array.isArray(messagesData)) {
        setMessages(messagesData);

        // Don't disturb the user if they are
        // reading old messages.
        if (shouldScroll) {
          setTimeout(() => {
            scrollToBottom("smooth");
          }, 50);
        }
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // =====================================================
  // GET USERS WHEN PAGE LOADS
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

    // Remove previous friend's messages
    setMessages([]);

    // Mobile
    setShowSidebar(false);
  };

  // =====================================================
  // FETCH MESSAGES WHEN FRIEND CHANGES
  // =====================================================

  useEffect(() => {
    if (!selectedFriend?._id) {
      return;
    }

    setLoadingMessages(true);

    // Fetch immediately
    fetchChatData().finally(() => {
      setLoadingMessages(false);

      // When opening a friend, always show
      // the latest message.
      setTimeout(() => {
        scrollToBottom("auto");
      }, 100);
    });

    // Continue fetching every 2 seconds
    const interval = setInterval(() => {
      fetchChatData();
    }, 2000);

    // Clear old interval when friend changes
    // or component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [selectedFriend]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (message) => {
    if (!selectedFriend?._id || !message.trim() || sending) {
      return false;
    }

    try {
      setSending(true);

      await api.post("/user/send-message", {
        receiverID: selectedFriend._id,

        message: message.trim(),
      });

      // Get updated messages
      await fetchChatData();

      // Always go to latest message
      setTimeout(() => {
        scrollToBottom("smooth");
      }, 100);

      return true;
    } catch (error) {
      console.error("Error sending message:", error);

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
            ${showSidebar ? "flex" : "hidden"}
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
            ${showSidebar ? "hidden md:flex" : "flex"}
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

                <h1 className="text-2xl font-bold">Welcome to Mingo</h1>

                <p className="mx-auto mt-2 max-w-md text-base-content/50">
                  Select a friend from the sidebar to start chatting.
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
                  MESSAGES
              ================================================= */}

              <div
                ref={messagesContainerRef}
                className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8"
              >
                {loadingMessages ? (
                  <div className="flex h-full items-center justify-center">
                    <span className="loading loading-spinner loading-lg text-primary" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl">
                      👋
                    </div>

                    <h2 className="text-xl font-bold">Start a conversation</h2>

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
                    <div className="mb-6 flex justify-center">
                      <span className="rounded-full bg-base-100 px-4 py-1.5 text-xs text-base-content/50 shadow-sm">
                        Today
                      </span>
                    </div>

                    <div className="mx-auto max-w-4xl space-y-3">
                      {messages.map((message, index) => (
                        <MessageBubble
                          key={message._id || index}
                          message={message}
                          currentUserId={currentUserId}
                        />
                      ))}

                      {/* Bottom of messages */}

                      <div ref={messagesEndRef} />
                    </div>
                  </>
                )}
              </div>

              {/* =================================================
                  MESSAGE INPUT
              ================================================= */}

              <MessageInput onSend={handleSendMessage} sending={sending} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chat;
