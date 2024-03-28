/**
 * Schema for a house document in MongoDB.
 * Defines the shape of documents in the houses collection.
 */

import mongoose, { Schema, models } from "mongoose";

const houseSchema = new Schema(
  {
    typeOfHouse: {
      type: String,
      required: true,
    },
    housingConditions: {
      type: String,
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      data: {
        type: String,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const House = models.House || mongoose.model("House", houseSchema);

export default House;
