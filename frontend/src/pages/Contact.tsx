import SearchInput from "@/components/chat/SearchInput";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import clsx from "clsx";

export const Contact = () => {
  const { users } = useUserStore();
  const { contactAction, addUsers, removeAddUser } = useUser();

  return (
    <section className="grid col-span-2 grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 p-2 h-full">
      <div className="bg-base-100 rounded-[1.5rem] flex flex-col px-2 py-2 h-full">
        <div className="grid md:grid-cols-2 justify-center gap-4 items-center">
          <SearchInput />
          <button className="btn btn-primary">Add Contact</button>
        </div>
        {users.length > 0 ? (
          <div className="gap-4 flex-grow max-h-[300px] md:max-h-[600px] xl:max-h-[700px] flex flex-col py-4 overflow-y-auto">
            {users.map((user) => (
              <div key={`your-contact-${user._id}`}>
                <div className="h-full w-full shadow p-2 flex-col md:flex-row gap-4 justify-between bg-base-200 flex items-center rounded-[1.5rem]">
                  <section className="flex items-center w-full gap-2">
                    <div
                      className={clsx(
                        "avatar",
                        user.socketId === null
                          ? "avatar-offline"
                          : "avatar-online"
                      )}
                    >
                      <figure className="w-16 mask mask-squircle">
                        <img
                          loading="lazy"
                          alt="profile photo"
                          src={user.profilePic}
                        />
                      </figure>
                    </div>
                    <section className="flex-row flex flex-1 gap-2">
                      <p className="capitalize">{user.firstName}</p>
                      <p className="capitalize">{user.lastName}</p>
                    </section>
                  </section>
                  <section className="flex gap-2">
                    <button
                      onClick={() => contactAction(user._id, "add")}
                      name="Ale"
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => contactAction(user._id, "block")}
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-base-content"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => contactAction(user._id, "delete")}
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-error"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </section>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bg-base-100 rounded-[1.5rem] flex flex-col gap-4 px-4 py-2 h-full">
        <div className="flex-1 max-h-[300px] md:max-h-[600px] xl:max-h-[700px] overflow-y-auto">
          <div className="flex gap-4 flex-col">
            {addUsers.length > 0 ? (
              addUsers.map((user) => (
                <div key={`start-chat-${user._id}`}>
                  <div className="h-full w-full shadow p-2 flex-col md:flex-row gap-4 justify-between bg-base-200 flex items-center rounded-[1.5rem]">
                    <section className="flex items-center w-full gap-2">
                      <div
                        className={clsx(
                          "avatar",
                          user.socketId === null
                            ? "avatar-offline"
                            : "avatar-online"
                        )}
                      >
                        <figure className="w-16 mask mask-squircle">
                          <img
                            loading="lazy"
                            alt="profile photo"
                            src={user.profilePic}
                          />
                        </figure>
                      </div>
                      <section className="flex-row flex flex-1 gap-2">
                        <p className="capitalize">{user.firstName}</p>
                        <p className="capitalize">{user.lastName}</p>
                      </section>
                    </section>
                    <button
                      onClick={() => removeAddUser(user._id)}
                      className="btn btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-error"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="hero bg-base-200 flex-1">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Start Chat</h1>
                    <p className="py-6">
                      Start a chat with one or many new friends.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          disabled={addUsers.length === 0}
          className="btn btn-primary btn-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
          {addUsers.length > 1 ? "Start Group" : "Start Chat"}
        </button>
      </div>
    </section>
  );
};
