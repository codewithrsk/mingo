import React from "react";

const ChatSidebar = ({
  chats,
  selectedChat,
  onSelectChat,
  search,
  setSearch,
  onNewChat,
}) => {
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside className="flex h-full w-full flex-col border-r border-base-300 bg-base-100 md:w-85 lg:w-95">
      {/* Header */}
      <div className="border-b border-base-300 p-4">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-content">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold">mingo</h1>
              <p className="text-xs text-base-content/50">Messages</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNewChat}
            className="btn btn-ghost btn-circle hover:text-primary"
            title="New chat"
          >
            <span className="text-2xl">+</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              input
              input-bordered
              w-full
              bg-base-200
              pl-11
              focus:border-primary
              focus:outline-none
            "
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        <button type="button" className="btn btn-primary btn-sm rounded-full">
          All
        </button>

        <button type="button" className="btn btn-ghost btn-sm rounded-full">
          Unread
        </button>

        <button type="button" className="btn btn-ghost btn-sm rounded-full">
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filteredChats.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center text-center">
            <div className="mb-2 text-3xl">🔍</div>

            <p className="font-medium">No conversations found</p>

            <p className="mt-1 text-xs text-base-content/50">
              Try searching for another person
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectChat(chat.id)}
              className={`
                mb-1
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                p-3
                text-left
                transition-all
                ${
                  selectedChat === chat.id
                    ? "bg-primary/10"
                    : "hover:bg-base-200"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    font-semibold
                    ${
                      selectedChat === chat.id
                        ? "bg-primary text-primary-content"
                        : "bg-base-300"
                    }
                  `}
                >
                  {chat.avatar}
                </div>

                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-base-100 bg-success" />
                )}
              </div>

              {/* Chat Information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate font-semibold">{chat.name}</h3>

                  <span className="whitespace-nowrap text-[11px] text-base-content/40">
                    {chat.time}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-base-content/50">
                    {chat.lastMessage}
                  </p>

                  {chat.unread > 0 && (
                    <span className="badge badge-primary badge-sm">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Current User */}
      <div className="border-t border-base-300 p-3">
        <div className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-base-200">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-bold text-secondary-content">
              RK
            </div>

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-success" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate font-semibold">Ravi Kumar</h4>

            <p className="text-xs text-success">Online</p>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle"
            title="More"
          >
            ⋮
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
