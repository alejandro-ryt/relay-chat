import { REGEX } from "@/constants/regex";

export const passwordMatch = (password: string, confirmPassword: string) => {
  if (!password || !confirmPassword) {
    return false;
  }

  return (
    password === confirmPassword &&
    REGEX.HAS_ALL_SECURITY.test(password) &&
    REGEX.HAS_ALL_SECURITY.test(confirmPassword)
  );
};
