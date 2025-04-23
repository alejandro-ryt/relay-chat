import { useUser } from "@/hooks/useUser";
import SearchInput from "../chat/SearchInput";
import toast, { ErrorIcon } from "react-hot-toast";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { generateAvatar, getApiError } from "@/utils";
import AddContactIcon from "../ui/icons/AddContactIcon";
import { CONTACT_DATA } from "@/constants/contact";
import { BadgeOnlineOffline } from "./BadgeOnlineOffline";
import ContactSkeleton from "./ContactSkeleton";
import {
  useAddContactMutation,
  useContactQuery,
} from "@/services/contact.service";
import { useAuthStore } from "@/store/useAuthStore";
import DATA from "@/constants/notFound";
import { API } from "@/constants/api";

export const AddContact = () => {
  const {
    toggleShowAddModal,
    handleFilterSearchUser,
    searchQuery,
    isShowAddModal,
  } = useUser();
  const { authUser } = useAuthStore();
  const { users, setUsers } = useUserStore();
  const addContact = useAddContactMutation();

  const debouncedSearchTerm = useDebounce(searchQuery, 300);
  const contactQuery = useContactQuery(searchQuery);

  useEffect(() => {
    if (isShowAddModal) {
      contactQuery.refetch();
    }
  }, [isShowAddModal, debouncedSearchTerm]);

  useEffect(() => {
    if (addContact.error) {
      toast.error(getApiError(addContact.error) ?? DATA.API_ERROR);
    }

    if (addContact.data) {
      toast.success(API.CONTACT_ADDED);
    }

    if (contactQuery.data && contactQuery.data.users.length > 0 && authUser) {
      setUsers(
        contactQuery.data.users.filter((user) => user._id !== authUser.userId)
      );
    }
  }, [contactQuery.data, addContact.error, addContact.data]);

  return (
    <>
      <button onClick={toggleShowAddModal} className="btn btn-primary">
        <AddContactIcon />
        {CONTACT_DATA.ADD_CONTACT_BTN}
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
            <AddContactIcon />
            {CONTACT_DATA.ADD_CONTACT_BTN}
          </h3>
          <p id="modal-description" className="py-6">
            {CONTACT_DATA.ADD_CONTACT_SUB_TITLE}
          </p>
          <section className="grid">
            <SearchInput
              value={searchQuery}
              handleOnchange={handleFilterSearchUser}
            />
            {!contactQuery.isFetching ? (
              <>
                {users.length > 0 ? (
                  <ul className="list bg-base-100 rounded-box shadow-md mt-2">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                      {CONTACT_DATA.ALL_CONTACTS}
                    </li>
                    <section className="max-h-[60dvh] overflow-y-auto">
                      {users.map((user, index) => (
                        <div
                          role="group"
                          key={`your-contact-id-${user._id}-index-${index}`}
                        >
                          <li className="list-row">
                            <section className="relative">
                              <figure>
                                <img
                                  className="size-10 mask mask-squircle"
                                  loading="lazy"
                                  alt={`profile photo ${user.username}`}
                                  src={
                                    user.profilePic
                                      ? user.profilePic
                                      : generateAvatar(
                                          user.firstName,
                                          user.lastName
                                        )
                                  }
                                />
                              </figure>
                              <BadgeOnlineOffline
                                isOnline={Boolean(user.socketId)}
                              />
                            </section>
                            <section className="flex flex-col h-full">
                              <p>
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs uppercase font-semibold opacity-60">
                                {user.socketId ? "Online" : "Offline"}
                              </p>
                            </section>
                            <button
                              onClick={() =>
                                addContact.mutate({
                                  contactId: user._id,
                                  userId: authUser!.userId,
                                })
                              }
                              className="btn btn-primary"
                            >
                              {CONTACT_DATA.ADD_CONTACT_BTN}
                            </button>
                          </li>
                        </div>
                      ))}
                    </section>
                  </ul>
                ) : (
                  <p className="py-6">{CONTACT_DATA.CONTACT_NOT_FOUND}</p>
                )}
              </>
            ) : (
              <ContactSkeleton length={2} />
            )}
          </section>
        </div>
      </dialog>
    </>
  );
};
export default AddContact;
