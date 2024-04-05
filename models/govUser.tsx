import mongoose, { Schema, models } from "mongoose";

const govUserSchema = new Schema(
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
      default: "govUser", // Default role for new govUsers
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GovUser = models.GovUser || mongoose.model("GovUser", govUserSchema);

export default GovUser;
