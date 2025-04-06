import { useUser } from "@/hooks/useUser";
import SearchInput from "../chat/SearchInput";
import { ErrorIcon } from "react-hot-toast";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export const AddContact = () => {
  const {
    toggleShowAddModal,
    addContact,
    getContacts,
    isSearching,
    isShowAddModal,
  } = useUser();
  const { users } = useUserStore();

  useEffect(() => {
    if (isShowAddModal) {
      getContacts();
    }
  }, [isShowAddModal]);

  return (
    <>
      <button onClick={toggleShowAddModal} className="btn btn-primary">
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
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        Add Contact
      </button>

      <dialog
        className="modal"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isShowAddModal}
      >
        <div className="modal-box" role="group" aria-label="Add Contact">
          <form method="dialog">
            <button
              type="button"
              onClick={toggleShowAddModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close Edit Profile Modal"
            >
              <ErrorIcon aria-hidden="true" />
            </button>
          </form>
          <h3
            id="modal-title"
            className="font-bold text-lg flex gap-2 items-center"
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Add Contact
          </h3>
          <p id="modal-description" className="py-6">
            We display suggestions but you can search a specific user.
          </p>
          <section className="grid">
            <SearchInput />
            {!isSearching ? (
              <div className="gap-4 flex-grow max-h-[60dvh] flex flex-col py-4 overflow-y-auto">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div key={`contact-${user._id}`}>
                      <div className="h-full w-full shadow p-2 flex-col md:flex-row gap-4 justify-between bg-base-200 flex items-center rounded-[1.5rem]">
                        <section className="flex items-center w-full gap-2">
                          <div className="avatar avatar-online">
                            <figure className="w-16 mask mask-squircle">
                              <img
                                loading="lazy"
                                alt="profile photo"
                                src={
                                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                              />
                            </figure>
                          </div>
                          <section className="flex-row flex flex-1 gap-2">
                            <p className="capitalize">{user.firstName}</p>
                            <p className="capitalize">{user.lastName}</p>
                          </section>
                        </section>
                        <button
                          onClick={() => addContact(user._id)}
                          className="btn btn-primary btn-circle btn-ghost"
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
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Contact Not Found</p>
                )}
              </div>
            ) : (
              <div className="flex w-52 flex-col gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-36"></div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </dialog>
    </>
  );
};
export default AddContact;
