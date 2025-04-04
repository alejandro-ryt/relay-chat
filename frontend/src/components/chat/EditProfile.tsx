import { userEditSchema } from "@/schemas/user";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "../form/InputField";
import SIGN_UP_DATA from "@/constants/signUp";
import { UserIcon } from "../ui/icons/UserIcon";
import { useUser } from "@/hooks/useUser";
import { USER } from "@/constants/user";
import { TEditUserForm } from "@/types/user.types";

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
    <dialog id="modal_edit_profile" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{USER.EDIT_TITLE}</h3>
        <p className="py-4">{USER.SUB_TITLE}</p>
        <form className="space-y-5" onSubmit={handleSubmit(updateProfile)}>
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
          <button disabled={isUpdating} className="btn btn-block btn-accent">
            {isUpdating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <UserIcon />
            )}
            {USER.UPDATE_BTN}
          </button>
        </form>
      </div>
    </dialog>
  );
};
export default EditProfile;
