export const END_POINT = {
  SIGN_UP: "/api/auth/sign-up",
  SIGN_IN: "/api/auth/sign-in",
  LOGOUT: "/api/auth/logout",
  USER: "/api/user",
  SEARCH: "/api/user/search",
  USER_UPDATE: "/api/user/update-user",
  ADD_CONTACT: "/api/contact/add",
  REMOVE_CONTACT: "/api/contact/remove",
  BLOCK_CONTACT: "/api/contact/block-contact",
  GET_CHATS_BY_USER_ID: "/api/chat/by-user/", //:id
} as const;
