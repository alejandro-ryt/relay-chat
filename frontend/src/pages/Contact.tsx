import clsx from "clsx";
import { useEffect, useState } from "react";
import SearchInput from "@/components/chat/SearchInput";
import AddContact from "@/components/contact/AddContact";
import { BadgeOnlineOffline } from "@/components/contact/BadgeOnlineOffline";
import { CreateChat } from "@/components/contact/CreateChat";
import EmptyContact from "@/components/contact/EmptyContact";
import StartChatEmpty from "@/components/contact/StartChatEmpty";
import { CONTACT_DATA } from "@/constants/contact";
import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import { generateAvatar } from "@/utils";

export const Contact = () => {
  const { authUserDetails, filterContacts } = useAuthStore();
  const {
    addUsers,
    searchTerm,
    debouncedSearchContactTerm,
    addStartChat,
    removeAddUser,
    deleteContact,
    blockContact,
    startChat,
    handleFilterContact,
  } = useUser();
  const [contacts, setContacts] = useState(authUserDetails?.contacts);

  useEffect(() => {
    const filtered = filterContacts(searchTerm);
    setContacts(filtered.length > 0 ? filtered : authUserDetails?.contacts);
  }, [debouncedSearchContactTerm, authUserDetails]);

  return (
    <section className="grid col-span-2 grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 p-2 h-full">
      <section className="bg-base-100 rounded-[1.5rem] flex flex-col px-2 py-2 h-full">
        <header className="grid grid-cols-1 p-2 md:grid-cols-2 justify-center gap-4 items-center">
          <SearchInput
            value={searchTerm}
            handleOnchange={handleFilterContact}
          />
          <AddContact />
        </header>
        {contacts && contacts.length === 0 ? (
          <ul className="list bg-base-100 rounded-box shadow-md mt-2">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              {CONTACT_DATA.ALL_CONTACTS}
            </li>
            <section className="max-h-[70dvh] overflow-y-auto">
              {contacts.map((user, index) => (
                <section
                  key={`your-contact-id-${user.contact._id}-index-${index}`}
                >
                  <li className="list-row">
                    <section className="relative">
                      <figure role="img">
                        <img
                          className="size-10 mask mask-squircle"
                          loading="lazy"
                          src={
                            user.contact.profilePic
                              ? user.contact.profilePic
                              : generateAvatar(
                                  user.contact.firstName,
                                  user.contact.lastName
                                )
                          }
                        />
                      </figure>
                      <BadgeOnlineOffline
                        isOnline={Boolean(user.contact.socketId)}
                      />
                    </section>
                    <div role="group" className="flex flex-col h-full">
                      <p>
                        {user.contact.firstName} {user.contact.lastName}
                      </p>
                      <p className="text-xs uppercase font-semibold opacity-60">
                        {user.contact.socketId ? "Online" : "Offline"}
                      </p>
                    </div>
                    <div role="group" className="flex gap-2">
                      <button
                        type="button"
                        disabled={user.isBlocked}
                        onClick={() => addStartChat(user.contact._id)}
                        className="btn btn-ghost"
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
                      <button
                        type="button"
                        disabled={user.isBlocked}
                        onClick={() => blockContact(user.contact._id)}
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
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteContact(user.contact._id)}
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                </section>
              ))}
            </section>
          </ul>
        ) : (
          <EmptyContact />
        )}
      </section>
      <div className="bg-base-100 rounded-[1.5rem] flex flex-col gap-4 p-4 h-full">
        <div className="flex-1 max-h-[300px] md:max-h-[600px] xl:max-h-[700px] overflow-y-auto">
          {addUsers.length === 0 ? <StartChatEmpty /> : null}
          <div className="flex flex-1 gap-4 flex-col">
            {addUsers.length > 0
              ? addUsers.map((user) => (
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
                        type="button"
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
              : null}
          </div>
        </div>
        <CreateChat
          contactQuantity={addUsers.length}
          handleOnSubmit={startChat}
        />
      </div>
    </section>
  );
};
