/**
 * Schema for a house document in MongoDB.
 * Defines the shape of documents in the houses collection.
 */

import mongoose, { Schema, models } from "mongoose";
import GovUser from "./govUser";

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
    municipality: {
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
    houseState: {
      type: String,
      enum: [
        "registoInicial",
        "pedidoDeAjuda",
        "avaliacaoMunicipio",
        "parecerIHRU",
        "aprovadoRequalificar",
        "naoAprovadoRequalificar",
        "obraIniciada",
        "obraFinalizada",
        "avaliacaoFinal",
      ],
      default: "registoInicial",
      required: true,
    },
    govUserId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "GovUser",
    },
  },
  { timestamps: true }
);

const House = models.House || mongoose.model("House", houseSchema);

export default House;
