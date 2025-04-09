import { InputField } from "@/components/form/InputField";
import { PasswordCriteria } from "@/components/form/PasswordCriteria";
import { CreateIcon } from "@/components/ui/icons/CreateIcon";
import SIGN_UP_DATA from "@/constants/signUp";
import { useAuth } from "@/hooks/useAuth";
import { signUpSchema, initialSignUpForm } from "@/schemas/signUp";
import { TSignUpForm } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { motion } from "motion/react";
import chatPeople from "@/assets/chat-people.png";

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
  const { sendSignUp, isSigningUp } = useAuth();

  return (
    <section className="grid min-h-[75dvh]">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
        layout
        className="grid flex-1 bg-base-100 h-full place-items-center shadow-2xl rounded-[1.5rem] grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 m-4"
      >
        <figure className="bg-[#f9f7f4] rounded-[1.5rem] size-full">
          <img
            className="object-contain size-full rounded-[1.5rem]"
            src={chatPeople}
          />
        </figure>
        <section className="xl:p-20 p-8 flex flex-col justify-center">
          <h1 className="text-4xl mb-4 text-primary">{SIGN_UP_DATA.TITLE}</h1>
          <p className="mb-10">
            {SIGN_UP_DATA.LOGIN_LINK_PREV}
            <Link to={"/"} className="btn btn-link">
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
                <CreateIcon />
              )}
              {SIGN_UP_DATA.CREATE_BTN}
            </button>
          </form>
        </section>
      </motion.section>
    </section>
  );
};
export default SignUp;
