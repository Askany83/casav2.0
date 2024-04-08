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
    //convert the FormDataEntryValue to a string using the .toString() method
    const typeOfHouseEntry = formData.get("typeOfHouse");
    const typeOfHouse =
      typeof typeOfHouseEntry === "string" ? typeOfHouseEntry : "";

    const housingConditionsEntry = formData.get("housingConditions");
    const housingConditions =
      typeof housingConditionsEntry === "string" ? housingConditionsEntry : "";

    const selectedOptionEntry = formData.get("selectedOption");
    const selectedOption =
      typeof selectedOptionEntry === "string" ? selectedOptionEntry : "";

    const selectedYearEntry = formData.get("selectedYear");
    const selectedYear =
      typeof selectedYearEntry === "string" ? selectedYearEntry : "";

    const areaEntry = formData.get("area");
    const area = typeof areaEntry === "string" ? areaEntry : "";

    const streetNameEntry = formData.get("streetName");
    const streetName =
      typeof streetNameEntry === "string" ? streetNameEntry : "";

    const localityEntry = formData.get("locality");
    const locality = typeof localityEntry === "string" ? localityEntry : "";

    const municipalityEntry = formData.get("municipality");
    const municipality =
      typeof municipalityEntry === "string" ? municipalityEntry : "";

    const postalCodeEntry = formData.get("postalCode");
    const postalCode =
      typeof postalCodeEntry === "string" ? postalCodeEntry : "";

    const latitudeEntry = formData.get("latitude");
    const latitude = typeof latitudeEntry === "string" ? latitudeEntry : "";

    const longitudeEntry = formData.get("longitude");
    const longitude = typeof longitudeEntry === "string" ? longitudeEntry : "";

    const userIdEntry = formData.get("userId");
    const userId = typeof userIdEntry === "string" ? userIdEntry : "";

    // console.log("userId - registerHouse route: ", userId);

    const imageBase64 = formData.get("imageBase64");
    const imageType = formData.get("imageType");

    // Validate imageBase64 and imageType
    if (!imageBase64 || !imageType) {
      return NextResponse.json(
        { message: "Image data is missing" },
        { status: 400 }
      );
    }

    // Check if the image type is WebP
    if (imageType !== "image/webp") {
      return NextResponse.json(
        { message: "Invalid image type. Only WebP images are supported" },
        { status: 400 }
      );
    }

    // Check if each field is empty or undefined, and return separate error messages for each condition
    if (!typeOfHouse) {
      return NextResponse.json(
        { message: "Type of house is missing" },
        { status: 400 }
      );
    }

    if (!housingConditions) {
      return NextResponse.json(
        { message: "Housing conditions are missing" },
        { status: 400 }
      );
    }

    if (!selectedOption) {
      return NextResponse.json(
        { message: "Selected option is missing" },
        { status: 400 }
      );
    }

    if (!selectedYear) {
      return NextResponse.json(
        { message: "Selected year is missing" },
        { status: 400 }
      );
    }

    if (!area) {
      return NextResponse.json({ message: "Area is missing" }, { status: 400 });
    }

    if (!streetName) {
      return NextResponse.json(
        { message: "Street name is missing" },
        { status: 400 }
      );
    }

    if (!locality) {
      return NextResponse.json(
        { message: "Locality is missing" },
        { status: 400 }
      );
    }

    if (!municipality) {
      return NextResponse.json(
        { message: "Municipality is missing" },
        { status: 400 }
      );
    }

    if (!postalCode) {
      return NextResponse.json(
        { message: "Postal code is missing" },
        { status: 400 }
      );
    }

    if (!latitude) {
      return NextResponse.json(
        { message: "Latitude is missing" },
        { status: 400 }
      );
    }

    if (!longitude) {
      return NextResponse.json(
        { message: "Longitude is missing" },
        { status: 400 }
      );
    }

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
