/**
 * Validates the uploaded image from the user is a WebP image before saving.
 * Returns early with an error response if the image is an invalid type.
 */

import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { NextResponse, NextRequest } from "next/server";
import xss from "xss";
import User from "@/models/user";
import { validationFields } from "@/utils/validationFieldsApiRoute";

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
      "civilParish",
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
    const civilParish = formData.get("civilParish")?.toString() || "";
    const municipality = formData.get("municipality")?.toString() || "";
    const postalCode = formData.get("postalCode")?.toString() || "";
    const latitude = formData.get("latitude")?.toString() || "";
    const longitude = formData.get("longitude")?.toString() || "";
    const userId = formData.get("userId")?.toString() || "";

    // console.log("userId - registerHouse route: ", userId);

    const imageBase64 = formData.get("imageBase64");
    const imageType = formData.get("imageType");

    const validationResult = validationFields({
      streetName,
      locality,
      municipality,
      postalCode,
      area,
      latitude,
      longitude,
    });

    if (validationResult) {
      return validationResult;
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
      civilParish: xss(civilParish.trim()),
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
      houseState: "registoInicial",
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
