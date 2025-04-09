import { userEditSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/InputField";
import SIGN_UP_DATA from "@/constants/signUp";
import UserIcon from "@/components/ui/icons/UserIcon";
import { useUser } from "@/hooks/useUser";
import { USER } from "@/constants/user";
import { TEditUserForm } from "@/types/user.types";
import { ErrorIcon } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Avatar from "@/components/ui/Avatar";

export const EditProfile = () => {
  const { authUserDetails } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditUserForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      profilePic: authUserDetails?.profilePic,
      firstName: authUserDetails?.firstName,
      lastName: authUserDetails?.lastName,
    },
  });

  const { toggleShowEditModal, updateProfile, isUpdating, isShowEditModal } =
    useUser();

  return (
    <>
      <header className="dropdown dropdown-start md:h-14 md:m-2">
        <div
          tabIndex={0}
          role="button"
          className="btn block mask h-full w-full mask-squircle"
        >
          <Avatar pic={authUserDetails?.profilePic} sizeClass="w-12" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <button onClick={toggleShowEditModal}>{USER.EDIT_TITLE}</button>
          </li>
        </ul>
      </header>
      <dialog
        id="modal_edit_profile"
        className="modal"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isShowEditModal}
      >
        <main className="modal-box" aria-label="Edit Profile">
          <form method="dialog">
            <button
              type="button"
              onClick={toggleShowEditModal}
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
            <figure aria-hidden="true">
              <img
                className="mask mask-squircle w-8 h-8"
                loading="lazy"
                src={authUserDetails?.profilePic}
                alt="user profile avatar"
              />
            </figure>
            {USER.EDIT_TITLE}
          </h3>
          <p id="modal-description" className="py-6">
            {USER.SUB_TITLE}
          </p>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(updateProfile)}
            aria-label="Edit Profile Form"
          >
            <section className="grid gap-2 grid-cols-1">
              <InputField
                legend={USER.PROFILE_PIC}
                placeholder={USER.PROFILE_PIC_PLACEHOLDER}
                error={errors.profilePic?.message}
                {...register("profilePic")}
              />
              <InputField
                legend={SIGN_UP_DATA.FIRST_NAME}
                placeholder={SIGN_UP_DATA.FIRST_NAME_PLACEHOLDER}
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <InputField
                legend={SIGN_UP_DATA.LAST_NAME}
                placeholder={SIGN_UP_DATA.LAST_NAME_PLACEHOLDER}
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </section>
            <button
              disabled={isUpdating}
              aria-label={USER.UPDATE_BTN}
              className="btn btn-block btn-primary"
            >
              {isUpdating ? (
                <span
                  className="loading loading-spinner"
                  aria-busy="true"
                ></span>
              ) : (
                <UserIcon aria-hidden="true" />
              )}
              {USER.UPDATE_BTN}
            </button>
          </form>
        </main>
      </dialog>
    </>
  );
};
export default EditProfile;
