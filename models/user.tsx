/**
 * User schema for mongoose.
 * Defines the fields and their types for a User document.
 */

import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      data: {
        type: String,
        required: false,
        select: false,
      },
      contentType: {
        type: String,
        required: false,
        select: false,
      },
    },
    role: {
      type: String,
      enum: ["houseOwner", "govUser", "admin"],
      default: "houseOwner", // Default role for new users
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
