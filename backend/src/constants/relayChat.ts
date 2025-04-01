export const ERROR = {
    // User Error messages
    ERROR_FETCHING_USERS: "Error fetching users",
    ERROR_FETCHING_USER_BY_ID: "Error fetching user by ID",
    USER_NOT_FOUND: "User not found",
    ERROR_CREATING_USER: "Error creating user",
    ERROR_UPDATING_USER: "Error updating user",
    ERROR_DELETING_USER: "Error deleting user by ID",
    // Authentication Error messages
    ERROR_USER_NOT_EXIST:"We could't find any user with the email provided",
    ERROR_WRONG_CREDENTIALS: "Invalid credentials",
    ERROR_INVALID_JWT_KE: "JWT Secret key was not provided",
    ERROR_TOKEN_NOT_FOUND: "Unauthorized: No token found",
    ERROR_TOKEN_INVALID: "Unauthorized: Invalid token",
    ERROR_EMAIL_FORMAT: "Invalid email format",
    ERROR_PASSWORD_FORMAT: "Invalid password format",
    // General Error messages
    ERROR_EMAIL_PASSWORD_MISSING: "Either the Password or Email wasn't provided",
    ERROR_ID_REQUIRED: "ID was not provided",
    INTERNAL_SERVICE_ERROR: "HTTP Error: 500 - Something went wrong in our server. Please try again later."
} as const;
