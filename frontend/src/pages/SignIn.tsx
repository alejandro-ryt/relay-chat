import { InputField } from "@/components/form/InputField";
import SignInIcon from "@/components/ui/icons/SignInIcon";
import CreateIcon from "@/components/ui/icons/CreateIcon";
import { ROUTES } from "@/constants/routes";
import SIGN_IN_DATA from "@/constants/signIn";
import { initialSignInForm, signInSchema } from "@/schemas/signIn";
import { TSignInForm } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { motion } from "motion/react";
import chatPeople from "@/assets/chat-people.png";
import { useSignInMutation } from "@/services/auth.service";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getApiError } from "@/utils";
import DOMPurify from "dompurify";
import DATA from "@/constants/notFound";
import { API } from "@/constants/api";
import { useAuthStore } from "@/store/useAuthStore";

const SignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: initialSignInForm,
  });
  const navigate = useNavigate();
  const { authenticate } = useAuthStore();
  const { mutate, error, data, isPending } = useSignInMutation();

  const sendSignIn = async (values: TSignInForm) => {
    const sanitizeData: TSignInForm = {
      email: DOMPurify.sanitize(values.email),
      password: DOMPurify.sanitize(values.password),
    };
    mutate(sanitizeData);
  };

  useEffect(() => {
    if (error) {
      toast.error(getApiError(error) ?? DATA.API_ERROR);
    }

    if (data) {
      authenticate(data);
      toast.success(`${API.WELCOME} ${data.username}`);
      navigate(ROUTES.CHAT);
    }
  }, [data, error]);

  return (
    <section className="grid h-full">
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
        className="grid bg-base-100 max-h-[100%] shadow-2xl rounded-[1.5rem] grid-cols-1 xl:grid-cols-2 grid-rows-1 gap-2 m-4 md:min-h-[80vh]"
      >
        <figure className="h-full bg-[#f9f7f4] rounded-[1.5rem] w-full">
          <img
            className="object-contain h-full w-full rounded-[1.5rem]"
            src={chatPeople}
          />
        </figure>
        <section className="xl:p-20 p-8 flex flex-col justify-center">
          <h1 className="text-4xl text-primary mb-4">{SIGN_IN_DATA.TITLE}</h1>
          <p className="mb-10">{SIGN_IN_DATA.SUB_TITLE}</p>
          <form className="grid space-y-5" onSubmit={handleSubmit(sendSignIn)}>
            <section className="grid gap-2 grid-cols-1">
              <InputField
                type="email"
                legend={SIGN_IN_DATA.EMAIL}
                placeholder={SIGN_IN_DATA.EMAIL_PLACEHOLDER}
                error={errors.email?.message}
                {...register("email")}
              />
              <InputField
                type="password"
                legend={SIGN_IN_DATA.PASSWORD}
                placeholder={SIGN_IN_DATA.PASSWORD_PLACEHOLDER}
                error={errors.password?.message}
                {...register("password")}
              />
            </section>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary mb-4"
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <SignInIcon />
              )}
              {SIGN_IN_DATA.BTN}
            </button>
          </form>
          <div className="divider">{SIGN_IN_DATA.DIVIDER}</div>
          <NavLink
            to={ROUTES.SIGN_UP}
            className="btn mt-4 btn-accent btn-outline"
          >
            <CreateIcon />
            {SIGN_IN_DATA.SIGN_UP_BTN}
          </NavLink>
        </section>
      </motion.section>
    </section>
  );
};
export default SignIn;
