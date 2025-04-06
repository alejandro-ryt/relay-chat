import SearchInput from "@/components/chat/SearchInput";
import AddContact from "@/components/contact/AddContact";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import clsx from "clsx";

export const Contact = () => {
  const { authUserDetails } = useAuthStore();
  const { contactAction, addUsers, removeAddUser, deleteContact } = useUser();

  return (
    <section className="grid col-span-2 grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 p-2 size-full h-full">
      <div className="bg-base-100 rounded-[1.5rem] flex flex-col px-2 py-2 h-full">
        <div className="grid md:grid-cols-2 justify-center gap-4 items-center">
          <SearchInput />
          <AddContact />
        </div>
        {authUserDetails && authUserDetails.contacts.length > 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md mt-2">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              All your contacts
            </li>
            <div className="max-h-[70dvh] overflow-y-auto">
              {/* <div className="gap-4 flex-grow max-h-[70dvh] flex flex-col py-4 overflow-y-auto"> */}
              {authUserDetails.contacts.map((user, index) => (
                <div key={`your-contact-id-${user.contact._id}-index-${index}`}>
                  <li className="list-row">
                    <div>
                      <img
                        className="size-10 rounded-box"
                        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                      />
                    </div>
                    <div>
                      <div>Dio Lupa</div>
                      <div className="text-xs uppercase font-semibold opacity-60">
                        Remaining Reason
                      </div>
                    </div>
                    <div className="dropdown dropdown-left">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-ghost"
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
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <a
                            onClick={() =>
                              contactAction(user.contact._id, "add")
                            }
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
                            Add Chat
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() =>
                              contactAction(user.contact._id, "block")
                            }
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
                            Block User
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteContact(user.contact._id)}>
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
                            Delete User
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* <section className="flex items-center w-full gap-2">
                    <div
                      className={clsx(
                        "avatar",
                        user.contact.socketId === null
                          ? "avatar-offline"
                          : "avatar-online"
                      )}
                    >
                      <figure className="w-16 mask mask-squircle">
                        <img
                          loading="lazy"
                          alt="profile photo"
                          src={user.contact.profilePic}
                        />
                      </figure>
                    </div>
                    <section className="flex-row flex flex-1 gap-2">
                      <p className="capitalize">{user.contact.firstName}</p>
                      <p className="capitalize">{user.contact.lastName}</p>
                    </section>
                  </section>
                  <section className="flex gap-2">
                    <div className="dropdown dropdown-left">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-circle btn-primary m-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <a
                            onClick={() =>
                              contactAction(user.contact._id, "add")
                            }
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
                            Add Chat
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() =>
                              contactAction(user.contact._id, "block")
                            }
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
                            Block User
                          </a>
                        </li>
                        <li>
                          <a onClick={() => deleteContact(user.contact._id)}>
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
                            Delete User
                          </a>
                        </li>
                      </ul>
                    </div>
                  </section> */}
                </div>
              ))}
            </div>
          </ul>
        ) : (
          <div className="hero bg-base-200 flex-1 items-center justify-center">
            <div className="hero-content text-center">
              <div className="max-w-md flex items-center flex-col">
                <h2 className="text-5xl text-center font-bold">
                  Empty Contacts
                </h2>
                <p className="py-6">Add contacts to start chat.</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
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
