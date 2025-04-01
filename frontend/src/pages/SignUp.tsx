import { InputField } from "@/components/form/InputField";
import { InputPassword } from "@/components/form/InputPassword";
import { PasswordCriteria } from "@/components/form/PasswordCriteria";
import SIGN_UP_DATA from "@/constants/signUp";
import { useSignUp } from "@/hooks/useSignUp";
import { SignUpForm, schema, initialSignUpForm } from "@/schemas/signUp";
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
      <section className="xl:p-20 md:p-10 p-5">
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
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {SIGN_UP_DATA.USERNAME}
              </legend>
              <InputField
                placeholder={SIGN_UP_DATA.USERNAME_PLACEHOLDER}
                {...register("username")}
              />
              <p className="fieldset-label text-error">
                {errors.username?.message}
              </p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{SIGN_UP_DATA.EMAIL}</legend>
              <InputField
                type="email"
                placeholder={SIGN_UP_DATA.EMAIL_PLACEHOLDER}
                {...register("email")}
              />
              <p className="fieldset-label text-error">
                {errors.email?.message}
              </p>
            </fieldset>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {SIGN_UP_DATA.FIRST_NAME}
              </legend>
              <InputField
                placeholder={SIGN_UP_DATA.FIRST_NAME_PLACEHOLDER}
                {...register("firstName")}
              />
              <p className="fieldset-label text-error">
                {errors.firstName?.message}
              </p>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {SIGN_UP_DATA.LAST_NAME}
              </legend>
              <InputField
                placeholder={SIGN_UP_DATA.LAST_NAME_PLACEHOLDER}
                {...register("lastName")}
              />
              <p className="fieldset-label text-error">
                {errors.lastName?.message}
              </p>
            </fieldset>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {SIGN_UP_DATA.PASSWORD}
              </legend>
              <InputPassword
                placeholder={SIGN_UP_DATA.PASSWORD_PLACEHOLDER}
                {...register("password")}
              />
              <p className="fieldset-label text-error">
                {errors.password?.message}
              </p>
            </fieldset>
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">
                {SIGN_UP_DATA.CONFIRM_PASSWORD}
              </legend>
              <InputPassword
                placeholder={SIGN_UP_DATA.PASSWORD_PLACEHOLDER}
                {...register("confirmPassword")}
              />
              <p className="fieldset-label text-error">
                {errors.confirmPassword?.message}
              </p>
            </fieldset>
          </div>
          <div className="divider "></div>
          {watch("password").length > 0 ||
          watch("confirmPassword").length > 0 ? (
            <PasswordCriteria
              password={watch("password")}
              confirmPassword={watch("confirmPassword")}
            />
          ) : null}
          <div className="flex gap-4 mt-4 mb-6">
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
          </div>
          {errors.agreement && (
            <p className="fieldset-label text-error">
              {errors.agreement.message}
            </p>
          )}
          <button type="submit" className="btn btn-primary">
            {SIGN_UP_DATA.CREATE_BTN}
          </button>
        </form>
      </section>
    </section>
  );
};
export default SignUp;
