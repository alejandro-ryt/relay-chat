import { InputField } from "@/components/form/InputField";
import { PasswordCriteria } from "@/components/form/PasswordCriteria";
import SIGN_UP_DATA from "@/constants/signUp";
import { useSignUp } from "@/hooks/useSignUp";
import { schema, initialSignUpForm } from "@/schemas/signUp";
import { SignUpForm } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { Link } from "react-router";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
    defaultValues: initialSignUpForm,
  });

  const { handleOnSubmit } = useSignUp();

  return (
    <section className="grid bg-base-100 rounded-[1.5rem] grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 m-4">
      <figure className="h-full w-full">
        <img
          className="object-cover h-full w-full rounded-[1.5rem]"
          src="https://img.freepik.com/free-vector/posts-concept-illustration_114360-204.jpg?t=st=1743457267~exp=1743460867~hmac=c7543514273f7c94f342efb54c7df07c458ea94e2ffce029a8867d4a108ebb3c&w=1380"
        />
      </figure>
      <section className="xl:p-20 p-8">
        <h1 className="text-3xl mb-4 text-primary">{SIGN_UP_DATA.TITLE}</h1>
        <p className="mb-4">
          {SIGN_UP_DATA.LOGIN_LINK_PREV}
          <Link to={"/"} className="underline link-info">
            {SIGN_UP_DATA.LOGIN_LINK}
          </Link>
        </p>
        <form
          className="grid space-y-4"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
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
          <button type="submit" role="button" className="btn btn-primary">
            {SIGN_UP_DATA.CREATE_BTN}
          </button>
        </form>
      </section>
    </section>
  );
};
export default SignUp;
