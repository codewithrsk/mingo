import React from "react";

const ChatSidebar = ({
  users,
  selectedFriend,
  onSelectFriend,
  search,
  setSearch,
  loading,
}) => {
  // =====================================================
  // SEARCH USERS
  // =====================================================

  const filteredUsers = users.filter((user) => {
    const name = user.fullName || "";
    const email = user.email || "";

    return (
      name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      email
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (user) => {
    const name = user?.fullName || "User";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-base-300 bg-base-100 md:w-[340px] lg:w-[380px]">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-base-300 p-4">

        <div className="mb-5 flex items-center gap-3">

          {/* Logo */}

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-content">
            M
          </div>

          {/* Title */}

          <div>
            <h1 className="text-xl font-bold">
              mingo
            </h1>

            <p className="text-xs text-base-content/50">
              Friends
            </p>
          </div>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search friends..."
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

      {/* =================================================
          FRIEND LIST
      ================================================= */}

      <div className="flex-1 overflow-y-auto p-2">

        {/* Loading */}

        {loading ? (
          <div className="flex h-40 items-center justify-center">

            <span className="loading loading-spinner loading-md text-primary" />

          </div>
        ) : filteredUsers.length === 0 ? (

          /* No users */

          <div className="flex h-48 flex-col items-center justify-center text-center">

            <div className="mb-3 text-3xl">
              👤
            </div>

            <p className="font-medium">
              No friends found
            </p>

            <p className="mt-1 text-xs text-base-content/50">
              Try another name or email
            </p>

          </div>
        ) : (

          /* Users */

          filteredUsers.map((friend) => {

            const isSelected =
              selectedFriend?._id ===
              friend._id;

            const name =
              friend.fullName || "User";

            const photo =
              friend.photo?.url;

            return (
              <button
                key={friend._id}
                type="button"
                onClick={() =>
                  onSelectFriend(friend)
                }
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
                    isSelected
                      ? "bg-primary/10"
                      : "hover:bg-base-200"
                  }
                `}
              >

                {/* Avatar */}

                <div className="shrink-0">

                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
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
                          isSelected
                            ? "bg-primary text-primary-content"
                            : "bg-base-300"
                        }
                      `}
                    >
                      {getInitials(friend)}
                    </div>
                  )}

                </div>

                {/* Friend information */}

                <div className="min-w-0 flex-1">

                  <h3 className="truncate font-semibold">
                    {name}
                  </h3>

                  <p className="mt-1 truncate text-sm text-base-content/50">
                    {friend.email}
                  </p>

                </div>

              </button>
            );
          })
        )}

      </div>

    </aside>
  );
};

export default ChatSidebar;