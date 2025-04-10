export const ERROR = {
  // User Error messages
  ERROR_FETCHING_USERS: "Error fetching users",
  ERROR_FETCHING_USER_BY_ID: "Error fetching user by ID",
  USER_NOT_FOUND: "User not found",
  CONTACT_NOT_FOUND: "Contact not found",
  ERROR_CONTACT_ALREADY_ADDED: "Contact already added",
  USER_NOT_EXIST_SOCKET:
    "User not found. You must be registered to join a chat.",
  ERROR_CREATING_USER: "Error creating user",
  ERROR_UPDATING_USER: "Error updating user",
  ERROR_DELETING_USER: "Error deleting user by ID",
  // Authentication Error messages
  ERROR_USER_NOT_EXIST: "We couldn't find any user with the email provided",
  ERROR_WRONG_CREDENTIALS: "Invalid credentials",
  ERROR_INVALID_JWT_KE: "JWT Secret key was not provided",
  ERROR_TOKEN_NOT_FOUND: "Unauthorized: No token found",
  ERROR_TOKEN_INVALID: "Unauthorized: Invalid token",
  ERROR_EMAIL_FORMAT: "Invalid email format",
  ERROR_PASSWORD_FORMAT: "Invalid password format",
  // Chat Error messages
  ERROR_CHAT_NOT_FOUND: "Chat not found",
  ERROR_SOCKET_INSTANCE_NOT_FOUND:
    "We could find the socket instance based on the socket id you provided",
  ERROR_SOCKET_ID_NOT_FOUND:
    "The user does not have a valid socket instance right now.",
  // General Error messages
  ERROR_EMAIL_PASSWORD_MISSING: "Either the Password or Email wasn't provided",
  ERROR_ID_REQUIRED: "ID was not provided",
  INTERNAL_SERVICE_ERROR:
    "HTTP Error: 500 - Something went wrong in our server. Please try again later.",
} as const;
