/**
 * Validates the uploaded image from the user is a WebP image before saving.
 * Returns early with an error response if the image is an invalid type.
 */

import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { NextResponse, NextRequest } from "next/server";
import {
  validateStreetName,
  validateLocality,
  validatePostalCode,
  validateArea,
  validateLatitude,
  validateLongitude,
} from "@/utils/validationUtils";
import xss from "xss";
import User from "@/models/user";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();

    // console.log("formData:", formData);
    const formFields = [
      "typeOfHouse",
      "housingConditions",
      "selectedOption",
      "selectedYear",
      "area",
      "streetName",
      "locality",
      "municipality",
      "postalCode",
      "latitude",
      "longitude",
    ];

    for (const field of formFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { message: `${field} is missing` },
          { status: 400 }
        );
      }
    }

    const typeOfHouse = formData.get("typeOfHouse")?.toString() || "";
    const housingConditions =
      formData.get("housingConditions")?.toString() || "";
    const selectedOption = formData.get("selectedOption")?.toString() || "";
    const selectedYear = formData.get("selectedYear")?.toString() || "";
    const area = formData.get("area")?.toString() || "";
    const streetName = formData.get("streetName")?.toString() || "";
    const locality = formData.get("locality")?.toString() || "";
    const municipality = formData.get("municipality")?.toString() || "";
    const postalCode = formData.get("postalCode")?.toString() || "";
    const latitude = formData.get("latitude")?.toString() || "";
    const longitude = formData.get("longitude")?.toString() || "";
    const userId = formData.get("userId")?.toString() || "";

    // console.log("userId - registerHouse route: ", userId);

    const imageBase64 = formData.get("imageBase64");
    const imageType = formData.get("imageType");

    // Validate each field using respective validation functions and return separate error messages if validation fails
    if (!validateStreetName(streetName)) {
      return NextResponse.json(
        { message: "Invalid street name" },
        { status: 400 }
      );
    }

    if (!validateLocality(locality)) {
      return NextResponse.json(
        { message: "Invalid locality" },
        { status: 400 }
      );
    }

    if (!validateLocality(municipality)) {
      return NextResponse.json(
        { message: "Invalid municipality" },
        { status: 400 }
      );
    }

    if (!validatePostalCode(postalCode)) {
      return NextResponse.json(
        { message: "Invalid postal code" },
        { status: 400 }
      );
    }

    if (!validateArea(area)) {
      return NextResponse.json({ message: "Invalid area" }, { status: 400 });
    }

    if (!validateLatitude(latitude)) {
      return NextResponse.json(
        { message: "Invalid latitude" },
        { status: 400 }
      );
    }

    if (!validateLongitude(longitude)) {
      return NextResponse.json(
        { message: "Invalid longitude" },
        { status: 400 }
      );
    }

    // Sanitize input data
    const sanitizedData = {
      typeOfHouse: xss(typeOfHouse.trim()),
      housingConditions: xss(housingConditions.trim()),
      selectedOption: xss(selectedOption.trim()),
      selectedYear: xss(selectedYear.trim()),
      area: xss(area.trim()),
      streetName: xss(streetName.trim()),
      locality: xss(locality.trim()),
      municipality: xss(municipality.trim()),
      postalCode: xss(postalCode.trim()),
      latitude: xss(latitude.trim()),
      longitude: xss(longitude.trim()),
      userId: xss(userId.trim()),
      image: {
        // New: Save image data and content type
        data: imageBase64,
        contentType: imageType,
      },
    };

    // console.log("Sanitized data:", sanitizedData);

    await connectMongoDB();

    //check if user has the required role to register a house
    const user = await User.findOne({ _id: userId });

    console.log("user - registerHouse route", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { role } = user;

    if (role !== "houseOwner") {
      return NextResponse.json(
        { message: "Only houseOwner can create houses" },
        { status: 403 }
      );
    }

    await House.create(sanitizedData);

    // console.log("House created!");

    return NextResponse.json({ message: "House created!" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
