import React from "react";

import {
  FiSearch,
  FiUser,
} from "react-icons/fi";

const ChatSidebar = ({
  users = [],
  selectedFriend,
  onSelectFriend,
  search = "",
  setSearch,
  loading,
}) => {
  // =====================================================
  // FILTER
  // =====================================================

  const filteredUsers = users.filter(
    (user) => {
      const name =
        user?.fullName || "";

      const email =
        user?.email || "";

      const query =
        search?.toLowerCase() || "";

      return (
        name
          .toLowerCase()
          .includes(query) ||
        email
          .toLowerCase()
          .includes(query)
      );
    }
  );

  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (user) => {
    const name =
      user?.fullName || "User";

    return name
      .split(" ")
      .filter(Boolean)
      .map(
        (word) => word[0]
      )
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

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-content">
            M
          </div>

          <div>
            <h1 className="text-xl font-bold">
              mingo
            </h1>

            <p className="text-xs text-base-content/50">
              Friends
            </p>
          </div>

        </div>

        {/* SEARCH */}

        <label className="input input-bordered flex w-full items-center gap-3 bg-base-200">

          <FiSearch
            size={18}
            className="shrink-0 text-base-content/50"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch?.(
                event.target.value
              )
            }
            placeholder="Search friends..."
            className="grow bg-transparent outline-none"
          />

        </label>

      </div>

      {/* =================================================
          FRIEND LIST
      ================================================= */}

      <div className="flex-1 overflow-y-auto p-2">

        {loading ? (

          <div className="flex h-40 items-center justify-center">

            <span className="loading loading-spinner loading-md text-primary" />

          </div>

        ) : filteredUsers.length ===
          0 ? (

          <div className="flex h-48 flex-col items-center justify-center text-center">

            <FiUser
              size={32}
              className="mb-3 text-base-content/40"
            />

            <p className="font-medium">
              No friends found
            </p>

            <p className="mt-1 text-xs text-base-content/50">
              Try another name or email
            </p>

          </div>

        ) : (

          filteredUsers.map(
            (friend) => {

              const isSelected =
                selectedFriend?._id ===
                friend?._id;

              const name =
                friend?.fullName ||
                "User";

              const email =
                friend?.email ||
                "";

              const photo =
                friend?.photo?.url;

              return (
                <button
                  key={
                    friend?._id ||
                    friend?.id
                  }
                  type="button"
                  onClick={() =>
                    onSelectFriend?.(
                      friend
                    )
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

                  {/* AVATAR */}

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
                        {getInitials(
                          friend
                        )}
                      </div>

                    )}

                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">
                      {name}
                    </h3>

                    <p className="mt-1 truncate text-sm text-base-content/50">
                      {email}
                    </p>

                  </div>

                </button>
              );
            }
          )

        )}

      </div>

    </aside>
  );
};

export default ChatSidebar;