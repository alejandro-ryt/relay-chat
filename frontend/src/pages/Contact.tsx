import SearchInput from "@/components/chat/SearchInput";
import Avatar from "@/components/ui/Avatar";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/useUserStore";
import clsx from "clsx";

export const Contact = () => {
  const { users } = useUserStore();
  const { contactAction } = useUser();

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 w-full min-h-auto p-2">
      <div className="bg-base-100 rounded-[1.5rem] flex flex-col px-2 xl:px-4 py-2">
        <div className="grid grid-cols-2 justify-center items-center">
          <SearchInput />
          <button className="btn btn-primary">Add Contact</button>
        </div>
        {users.length > 0 ? (
          <div className="grid gap-4 xl:mx-5 scroll-auto overflow-y-auto max-h-screen">
            {users.map((user) => (
              <div key={user._id}>
                <div className="h-full w-full shadow p-2 gap-4 justify-between bg-base-200 flex items-center rounded-[1.5rem]">
                  <section className="flex items-center gap-2">
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
      <div className="bg-base-100 rounded-[1.5rem] px-4 py-2">
        <p>page 2</p>
      </div>
    </section>
  );
};
