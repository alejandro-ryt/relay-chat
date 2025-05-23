import { REGEX } from "@/constants/regex";
import clsx from "clsx";
import CheckCircleSuccessIcon from "@/components/ui/icons/CheckCircleSuccessIcon";
import CircleErrorIcon from "@/components/ui/icons/CircleErrorIcon";
import { passwordMatch } from "@/utils";
import { motion } from "motion/react";
import SIGN_UP_DATA from "@/constants/signUp";
import { TPasswordCriteriaProps } from "@/types/form.types";

export const PasswordCriteria = ({
  password,
  confirmPassword,
}: TPasswordCriteriaProps) => {
  const validation = (password: string) => {
    return {
      hasLetter: () => {
        return clsx(
          "text-base-content flex items-center gap-2 my-2",
          REGEX.HAS_LETTER.test(password) ? "text-success" : "text-error"
        );
      },
      hasDigits: () => {
        return clsx(
          "text-base-content flex items-center gap-2 my-2",
          REGEX.HAS_DIGITS.test(password) ? "text-success" : "text-error"
        );
      },
      hasMinMAx: () => {
        return clsx(
          "text-base-content flex items-center gap-2 my-2",
          REGEX.HAS_MIN8_MAX20.test(password) ? "text-success" : "text-error"
        );
      },
      hasAllSecurity: () => {
        return clsx(
          "text-base-content flex items-center gap-2 my-2",
          REGEX.HAS_ALL_SECURITY.test(password) ? "text-success" : "text-error"
        );
      },
      equals: () => {
        return clsx(
          "text-base-content flex items-center gap-2 my-2",
          passwordMatch(password, confirmPassword)
            ? "text-success"
            : "text-error"
        );
      },
    };
  };

  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="border rounded-2xl shadow-2xl p-4"
    >
      <p className={validation(password).hasLetter()}>
        {REGEX.HAS_LETTER.test(password) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_MIN_LETTER}
      </p>
      <p className={validation(password).hasDigits()}>
        {REGEX.HAS_DIGITS.test(password) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_MIN_DIGITS}
      </p>
      <p className={validation(password).hasMinMAx()}>
        {REGEX.HAS_MIN8_MAX20.test(password) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_MIN_MAX}
      </p>
      <p className={validation(password).hasAllSecurity()}>
        {REGEX.HAS_ALL_SECURITY.test(password) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_ALL_SECURITY}
      </p>
      <p className={validation(password).equals()}>
        {passwordMatch(password, confirmPassword) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_PASSWORD_MATH}
      </p>
    </motion.section>
  );
};
