import React, { useState } from "react";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "RS",
      online: true,
      lastMessage: "Bro, are you coming today?",
      time: "10:42 PM",
      unread: 2,

      messages: [
        {
          id: 1,
          sender: "other",
          text: "Hey bro! 👋",
          time: "10:38 PM",
        },
        {
          id: 2,
          sender: "me",
          text: "Hey! What's up?",
          time: "10:39 PM",
          seen: true,
        },
        {
          id: 3,
          sender: "other",
          text: "Bro, are you coming today?",
          time: "10:42 PM",
        },
      ],
    },

    {
      id: 2,
      name: "Priya Singh",
      avatar: "PS",
      online: true,
      lastMessage: "Okay, see you tomorrow!",
      time: "9:30 PM",
      unread: 0,

      messages: [
        {
          id: 1,
          sender: "other",
          text: "Did you complete the project?",
          time: "9:25 PM",
        },
        {
          id: 2,
          sender: "me",
          text: "Yes, almost completed.",
          time: "9:27 PM",
          seen: true,
        },
        {
          id: 3,
          sender: "other",
          text: "Okay, see you tomorrow!",
          time: "9:30 PM",
        },
      ],
    },

    {
      id: 3,
      name: "Mingo Team",
      avatar: "MT",
      online: false,
      lastMessage: "New update is available 🚀",
      time: "8:15 PM",
      unread: 5,

      messages: [
        {
          id: 1,
          sender: "other",
          text: "Welcome to the Mingo team!",
          time: "8:10 PM",
        },
        {
          id: 2,
          sender: "other",
          text: "New update is available 🚀",
          time: "8:15 PM",
        },
      ],
    },

    {
      id: 4,
      name: "Aman Verma",
      avatar: "AV",
      online: false,
      lastMessage: "Thanks bro 👍",
      time: "Yesterday",
      unread: 0,

      messages: [
        {
          id: 1,
          sender: "me",
          text: "I'll send you the files.",
          time: "Yesterday",
          seen: true,
        },
        {
          id: 2,
          sender: "other",
          text: "Thanks bro 👍",
          time: "Yesterday",
        },
      ],
    },
  ]);

  const currentChat =
    chats.find((chat) => chat.id === selectedChat) || chats[0];

  // Select chat
  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setShowSidebar(false);

    // Clear unread count
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              unread: 0,
            }
          : chat,
      ),
    );
  };

  // Send message
  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      seen: false,
    };

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: text,
              time: "Now",
            }
          : chat,
      ),
    );
  };

  // New chat
  const handleNewChat = () => {
    alert("New chat feature will be connected to your backend.");
  };
  return (
    <div className="h-[91vh] w-full overflow-hidden bg-base-200 text-base-content">
      <div className="flex h-full">
        {/* Sidebar */}
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
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            search={search}
            setSearch={setSearch}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Chat Area */}
        <main
          className={`
          h-full
          min-w-0
          flex-1
          flex-col
          ${showSidebar ? "hidden md:flex" : "flex"}
        `}
        >
          <ChatHeader chat={currentChat} onBack={() => setShowSidebar(true)} />

          {/* Only messages scroll */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="mb-6 flex justify-center">
              <span className="rounded-full bg-base-100 px-4 py-1.5 text-xs text-base-content/50 shadow-sm">
                Today
              </span>
            </div>

            <div className="mx-auto max-w-4xl space-y-3">
              {currentChat.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {currentChat.online && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-base-100 px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-base-content/30" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-base-content/30 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-base-content/30 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <MessageInput onSend={handleSendMessage} />
        </main>
      </div>
    </div>
  );
};

export default Chat;
