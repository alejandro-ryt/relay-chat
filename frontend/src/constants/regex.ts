export const REGEX = {
  HAS_LETTER_NUMBER: new RegExp(/^[a-zA-Z0-9]+$/),
  HAS_LETTER: new RegExp(/[a-zA-Z]/),
  HAS_DIGITS: new RegExp(/\d/),
  HAS_MIN8_MAX20: new RegExp(/^.{8,20}$/),
  HAS_ALL_SECURITY: new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"<>,.?/-]).{8,20}$/
  ),
} as const;
