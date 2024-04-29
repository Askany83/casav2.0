import mongoose, { Schema, models } from "mongoose";
import User from "@/models/user";
import GovUser from "@/models/govUser";
import House from "@/models/house";

const helpRequestSchema = new Schema(
  {
    houseOwnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: String,

      required: true,
    },
    houseId: {
      type: Schema.Types.ObjectId,
      ref: "House",
      required: true,
    },
    govUserId: {
      type: Schema.Types.ObjectId,
      ref: "GovUser",
      required: false,
    },
    messages: [
      {
        content: {
          type: String,
          required: false,
        },
        sender: {
          type: String,
          enum: ["houseOwner", "govUser"],
          required: false,
        },
      },
    ],
    apoios: {
      apoio1: {
        type: Boolean,
        default: false,
        required: false,
      },
      apoio2: {
        type: Boolean,
        default: false,
        required: false,
      },
      apoio3: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
  },

  { timestamps: true }
);

const HelpRequest =
  models.HelpRequest || mongoose.model("HelpRequest", helpRequestSchema);

export default HelpRequest;
