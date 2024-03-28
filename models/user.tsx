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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      data: {
        type: String,
        required: false,
      },
      contentType: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
