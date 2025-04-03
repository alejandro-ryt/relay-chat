import mongoose, { Schema, CallbackError } from "mongoose";
import { IUserDocument } from "@/interfaces/user";
import { hashPassword } from "@/utils/protectPassword";
import {
  validateEmailFormat,
  validatePasswordFormat,
} from "@/utils/inputValidations";

const userSchema = new Schema<IUserDocument>(
  {
    profilePic: {
      type: String,
      required: false,
      default:
        "https://wallpapers.com/images/high/default-avatar-placeholder-672pawlg85u1erwp.png",
    },
    firstName: { type: String, required: [true, "User first name required"] },
    lastName: { type: String, required: [true, "User last name required"] },
    username: {
      type: String,
      required: [true, "User username required"],
      unique: true,
    }, // Set as unique to create index on this field
    email: {
      type: String,
      validate: {
        validator: function (v: string) {
          return validateEmailFormat(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
      required: [true, "User email required"],
      unique: true, // Set as unique to create index on this field
    },
    password: {
      type: String,
      validate: {
        validator: function (v: string) {
          return validatePasswordFormat(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid password!`,
      },
      required: [true, "User password required"],
    },
    socketId: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next: (err?: CallbackError) => void) {
  // Ensure that password is hashed only if it is new or modified
  if (this.isModified("password") || this.isNew) {
    try {
      // Hash the password before saving it
      this.password = await hashPassword(this.password); // Assuming hashPassword is a function that returns a hashed password
      next(); // Proceed with save
    } catch (error) {
      // Cast error as CallbackError or just pass to next
      next(error as CallbackError); // Pass error to next middleware if hashing fails
    }
  } else {
    next(); // Proceed without hashing if password hasn't changed
  }
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
