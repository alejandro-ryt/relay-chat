import { userEditSchema } from "@/schemas/user";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/InputField";
import SIGN_UP_DATA from "@/constants/signUp";
import { UserIcon } from "@/components/ui/icons/UserIcon";
import { useUser } from "@/hooks/useUser";
import { USER } from "@/constants/user";
import { TEditUserForm } from "@/types/user.types";
import { ErrorIcon } from "react-hot-toast";

export const EditProfile = () => {
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditUserForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      profilePic: user?.profilePic,
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  const { closeModal, updateProfile, isUpdating } = useUser();

  return (
    <dialog
      id="modal_edit_profile"
      className="modal"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-box" role="group" aria-label="Edit Profile">
        <form method="dialog">
          <button
            type="button"
            onClick={closeModal}
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
              src={user?.profilePic}
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
              <span className="loading loading-spinner" aria-busy="true"></span>
            ) : (
              <UserIcon aria-hidden="true" />
            )}
            {USER.UPDATE_BTN}
          </button>
        </form>
      </div>
    </dialog>
  );
};
export default EditProfile;
