import { useUser } from "@/hooks/useUser";
import SearchInput from "../chat/SearchInput";
import { ErrorIcon } from "react-hot-toast";
import { useUserStore } from "@/store/useUserStore";
import { SyntheticEvent, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";

export const AddContact = () => {
  const {
    toggleShowAddModal,
    addContact,
    getContacts,
    setSearchQuery,
    generateAvatar,
    searchQuery,
    isSearching,
    isShowAddModal,
  } = useUser();
  const { users } = useUserStore();
  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (isShowAddModal) {
      getContacts();
    }
  }, [isShowAddModal, debouncedSearchTerm]);

  const handleInputChange = (
    event: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchQuery(value);
  };

  return (
    <>
      <button onClick={toggleShowAddModal} className="btn btn-primary">
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
            <SearchInput
              value={searchQuery}
              handleOnchange={handleInputChange}
            />
            {!isSearching ? (
              <div>
                {users.length > 0 ? (
                  <ul className="list bg-base-100 rounded-box shadow-md mt-2">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                      All contacts
                    </li>
                    <div className="max-h-[60dvh] overflow-y-auto">
                      {users.map((user, index) => (
                        <div key={`your-contact-id-${user._id}-index-${index}`}>
                          <li className="list-row">
                            <div className="relative">
                              <img
                                className="size-10 mask mask-squircle"
                                loading="lazy"
                                src={
                                  user.profilePic
                                    ? user.profilePic
                                    : generateAvatar(
                                        user.firstName,
                                        user.lastName
                                      )
                                }
                              />
                              {user.socketId ? (
                                <div className="bg-success border border-success w-3 h-3 rounded-full absolute top-0 right-0 -mr-1 -mt-1"></div>
                              ) : (
                                <div className="bg-base-100 border border-neutral w-3 h-3 rounded-full absolute top-0 right-0 -mr-1 -mt-1"></div>
                              )}
                            </div>
                            <div className="flex flex-col h-full">
                              <div>
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs uppercase font-semibold opacity-60">
                                {user.socketId ? "Online" : "Offline"}
                              </div>
                            </div>
                            <button
                              onClick={() => addContact(user._id)}
                              className="btn btn-circle btn-ghost"
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
                          </li>
                        </div>
                      ))}
                    </div>
                  </ul>
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
