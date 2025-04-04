export const END_POINT = {
  SIGN_UP: "/api/auth/sign-up",
  SIGN_IN: "/api/auth/sign-in",
  LOGOUT: "/api/auth/logout",
  USER: "/api/user",
  USER_UPDATE: "/api/user/update-user",
  GET_CHATS_BY_USER_ID: "/api/chat/by-user/", //:id
} as const;
