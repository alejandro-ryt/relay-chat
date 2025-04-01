import { REGEX } from "@/constants/regex";
import clsx from "clsx";
import { CheckCircleSuccessIcon } from "@/components/ui/icons/CheckCircleSuccessIcon";
import { CircleErrorIcon } from "@/components/ui/icons/CircleErrorIcon";
import { passwordMatch } from "@/utils/security";
import SIGN_UP_DATA from "@/constants/signUp";

type CriteriaProps = {
  password: string;
  confirmPassword: string;
};

export const PasswordCriteria = ({
  password,
  confirmPassword,
}: CriteriaProps) => {
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
    <div className="border rounded-2xl shadow-2xl p-4 fade">
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
      <p className={validation(password).equals()}>
        {passwordMatch(password, confirmPassword) ? (
          <CheckCircleSuccessIcon />
        ) : (
          <CircleErrorIcon />
        )}
        {SIGN_UP_DATA.ERR_PASSWORD_MATH}
      </p>
    </div>
  );
};
