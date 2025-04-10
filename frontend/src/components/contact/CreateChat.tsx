import { CONTACT_DATA } from "@/constants/contact";
import { createChatSchema, TCreateChatForm } from "@/schemas/create";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TCreateChat } from "@/types/form.types";
import MultiChatIcon from "@/components/ui/icons/MultiChatIcon";
import SingleChatIcon from "@/components/ui/icons/SingleChatIcon";

export const CreateChat = ({
  handleOnSubmit,
  contactQuantity,
}: TCreateChat) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCreateChatForm>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      chatName: "individual",
    },
  });

  useEffect(() => {
    if (contactQuantity > 1) {
      setValue("chatName", "");
    }
  }, [contactQuantity]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <input
        type="text"
        placeholder="Chat Name"
        className={clsx(
          "input input-neutral w-full",
          (contactQuantity === 0 || contactQuantity === 1) && "hidden"
        )}
        {...register("chatName")}
      />
      {errors.chatName ? (
        <p className="fieldset-label text-error">{errors.chatName?.message}</p>
      ) : null}
      <button
        disabled={contactQuantity === 0}
        className="btn btn-primary btn-block mt-4"
      >
        {contactQuantity > 1 ? <MultiChatIcon /> : <SingleChatIcon />}
        {contactQuantity > 1
          ? CONTACT_DATA.START_GROUP_BTN
          : CONTACT_DATA.START_CHAT_BTN}
      </button>
    </form>
  );
};
