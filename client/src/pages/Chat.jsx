import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaComments } from "react-icons/fa";

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

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);

      const response = await api.get("/user/allUsers");

      console.log("USERS RESPONSE:", response.data);

      const data = response.data;

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
        "FETCH USERS ERROR:",
        error?.response?.data || error
      );

      toast.error("Unable to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // =====================================================
  // SELECT USER
  // =====================================================

  useEffect(() => {
    if (!users.length) {
      return;
    }

    // If friendId exists in URL
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

    // Otherwise select first user except current user
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

      /*
       * IMPORTANT:
       * This is the GET endpoint used for loading
       * messages of the selected friend.
       */
      const response = await api.get(
        `/user/get-messages/${currentFriendId}`
      );

      console.log(
        "MESSAGE RESPONSE:",
        response.data
      );

      const data = response.data;

      /*
       * Supports common response structures:
       *
       * {
       *   messages: [...]
       * }
       *
       * {
       *   data: [...]
       * }
       *
       * [...]
       */

      let messageList = [];

      if (Array.isArray(data)) {
        messageList = data;
      } else if (
        Array.isArray(data?.messages)
      ) {
        messageList = data.messages;
      } else if (
        Array.isArray(data?.data)
      ) {
        messageList = data.data;
      }

      console.log(
        "MESSAGE LIST:",
        messageList
      );

      setMessages(messageList);
    } catch (error) {
      console.error(
        "FETCH MESSAGE ERROR:",
        error?.response?.data || error
      );

      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, [
    friendId,
    selectedUser?._id,
    selectedUser?.id,
  ]);

  // =====================================================
  // INITIAL USERS
  // =====================================================

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =====================================================
  // FETCH MESSAGES
  // =====================================================

  useEffect(() => {
    if (!selectedUser && !friendId) {
      return;
    }

    fetchChatData();

    const interval = setInterval(() => {
      fetchChatData();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [
    fetchChatData,
    selectedUser,
    friendId,
  ]);

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

    // Immediately clear old conversation
    setMessages([]);
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (text, file) => {
    const currentFriendId =
      friendId ||
      selectedUser?._id ||
      selectedUser?.id;

    /*
     * Don't send empty message.
     */
    if (!text?.trim() && !file) {
      return false;
    }

    if (!currentFriendId) {
      toast.error("Please select a friend");
      return false;
    }

    if (sending) {
      return false;
    }

    try {
      setSending(true);

      /*
       * CURRENT BACKEND API
       *
       * POST /user/send-message
       */

      if (text?.trim()) {
        await api.post(
          "/user/send-message",
          {
            receiverId: currentFriendId,
            message: text.trim(),
          }
        );
      }

      /*
       * File upload is intentionally not sent here yet.
       *
       * Your current confirmed API is the text-message
       * endpoint above. Once your backend file endpoint
       * is available, it can be connected here.
       */

      // Immediately fetch latest messages
      await fetchChatData();

      return true;
    } catch (error) {
      console.error(
        "SEND MESSAGE ERROR:",
        error?.response?.data || error
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
            CHAT
        ================================================= */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* =================================================
              NO FRIEND SELECTED
          ================================================= */}

          {!selectedUser ? (
            <div className="flex flex-1 items-center justify-center bg-base-100">
              <div className="text-center">

                <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaComments className="text-3xl" />
                </div>

                <h2 className="text-xl font-bold">
                  Welcome to Mingo
                </h2>

                <p className="mt-2 text-sm text-base-content/60">
                  Select a friend to start chatting.
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
                  MESSAGE AREA
              ================================================= */}

              <div className="min-h-0 flex-1 overflow-y-auto bg-base-200/40 px-3 py-4 md:px-6">

                <div className="mx-auto flex max-w-4xl flex-col gap-2">

                  {/* LOADING */}

                  {loadingMessages &&
                  messages.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                      <span className="loading loading-spinner loading-md text-primary" />
                    </div>
                  ) : messages.length === 0 ? (

                    /* EMPTY */

                    <div className="flex items-center justify-center py-20">
                      <div className="text-center">

                        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FaComments className="text-2xl" />
                        </div>

                        <h3 className="font-semibold">
                          No messages yet
                        </h3>

                        <p className="mt-1 text-sm text-base-content/60">
                          Send a message to{" "}
                          {selectedUser?.fullName ||
                            "your friend"}.
                        </p>

                      </div>
                    </div>

                  ) : (

                    /* MESSAGES */

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
                            user?._id ||
                            user?.id
                          }
                          user={user}
                        />
                      )
                    )

                  )}

                  <div
                    ref={messagesEndRef}
                  />

                </div>
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
        </div>
      </div>
    </div>
  );
};

export default Chat;