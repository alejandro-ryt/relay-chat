import { InputField } from "@/components/form/InputField";
import { PasswordCriteria } from "@/components/form/PasswordCriteria";
import { SparkIcon } from "@/components/ui/icons/SparkIcon";
import SIGN_UP_DATA from "@/constants/signUp";
import { useAuth } from "@/hooks/useAuth";
import { signUpSchema, initialSignUpForm } from "@/schemas/signUp";
import { useAuthStore } from "@/store/useAuthStore";
import { TSignUpForm } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { motion } from "motion/react";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<TSignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialSignUpForm,
  });
  const { sendSignUp } = useAuth();
  const { isSigningUp } = useAuthStore();

  return (
    <motion.section
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.2, ease: "easeIn" },
      }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.2, ease: "easeIn" },
      }}
      layout
      className="grid bg-base-100 shadow-2xl rounded-[1.5rem] grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 m-4"
    >
      <figure className="h-full bg-[#f9f7f4] rounded-[1.5rem] w-full">
        <img
          className="object-contain h-full w-full rounded-[1.5rem]"
          src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-5918-51f7-9f65-81f7067a5f80/raw?se=2025-04-03T18%3A39%3A58Z&sp=r&sv=2024-08-04&sr=b&scid=60cc0344-2f4e-5cb1-a45f-c1da559a821a&skoid=365eb242-95ba-4335-a618-2c9f8f766a86&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-03T15%3A06%3A28Z&ske=2025-04-04T15%3A06%3A28Z&sks=b&skv=2024-08-04&sig=Mfkp3YW0UzlbPkYaz1dFxM8pxYdyKukVipvjzDfBQjI%3D"
        />
      </figure>
      <section className="xl:p-20 p-8 flex flex-col justify-center">
        <h1 className="text-4xl mb-4 text-primary">{SIGN_UP_DATA.TITLE}</h1>
        <p className="mb-10">
          {SIGN_UP_DATA.LOGIN_LINK_PREV}
          <Link to={"/"} className="btn btn-link" viewTransition>
            {SIGN_UP_DATA.LOGIN_LINK}
          </Link>
        </p>
        <form className="grid space-y-4" onSubmit={handleSubmit(sendSignUp)}>
          <section className="grid gap-2 md:grid-cols-2 grid-cols-1">
            <InputField
              legend={SIGN_UP_DATA.USERNAME}
              placeholder={SIGN_UP_DATA.USERNAME_PLACEHOLDER}
              error={errors.username?.message}
              {...register("username")}
            />
            <InputField
              type="email"
              placeholder={SIGN_UP_DATA.EMAIL_PLACEHOLDER}
              legend={SIGN_UP_DATA.EMAIL}
              error={errors.email?.message}
              {...register("email")}
            />
          </section>
          <section className="grid gap-2 md:grid-cols-2 grid-cols-1">
            <InputField
              placeholder={SIGN_UP_DATA.USERNAME_PLACEHOLDER}
              legend={SIGN_UP_DATA.FIRST_NAME}
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <InputField
              placeholder={SIGN_UP_DATA.LAST_NAME_PLACEHOLDER}
              legend={SIGN_UP_DATA.LAST_NAME}
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </section>
          <section className="grid gap-2 md:grid-cols-2 grid-cols-1">
            <InputField
              type="password"
              placeholder={SIGN_UP_DATA.PASSWORD_PLACEHOLDER}
              legend={SIGN_UP_DATA.PASSWORD}
              error={errors.password?.message}
              {...register("password")}
            />
            <InputField
              type="password"
              placeholder={SIGN_UP_DATA.PASSWORD_PLACEHOLDER}
              legend={SIGN_UP_DATA.CONFIRM_PASSWORD}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </section>
          <div className="divider "></div>
          {watch("password").length > 0 ||
          watch("confirmPassword").length > 0 ? (
            <PasswordCriteria
              password={watch("password")}
              confirmPassword={watch("confirmPassword")}
            />
          ) : null}
          <section className="flex gap-4 mt-4 mb-6">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox checkbox-primary"
              {...register("agreement")}
            />
            <label htmlFor="checkbox" className="hover:cursor-pointer">
              {SIGN_UP_DATA.CHECK_AGREE}
              <NavLink
                to={"https://www.google.com"}
                className={"underline"}
                target="_blank"
              >
                {SIGN_UP_DATA.TERMS_CONDITION}
              </NavLink>
            </label>
          </section>
          {errors.agreement && (
            <p className="fieldset-label text-error">
              {errors.agreement.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSigningUp}
            role="button"
            className="btn btn-primary"
          >
            {isSigningUp ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <SparkIcon />
            )}
            {SIGN_UP_DATA.CREATE_BTN}
          </button>
        </form>
      </section>
    </motion.section>
  );
};
export default SignUp;
