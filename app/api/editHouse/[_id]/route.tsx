/**
 * Updates a house by ID.
 *
 * Extracts the house ID from the request URL.
 * Parses the request body for updated fields.
 * Finds the house by ID and updates it with the new fields.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { validateFields } from "@/utils/validationFieldsApiRoute";
import xss from "xss";
import User from "@/models/user";

// Define a type for the updated fields, including the optional image field
type UpdatedFields = {
  typeOfHouse: string;
  housingConditions: string;
  selectedOption: string;
  selectedYear: string;
  area: string;
  streetName: string;
  locality: string;
  municipality: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  userId: string;
  image?: {
    data: string;
    contentType: string;
  };
};

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "PATCH") {
    try {
      await connectMongoDB();
      // console.log("Connected to MongoDB - patchHouse");

      // Extract houseId from the URL pathname
      const houseId = req.url.split("/").pop();

      // console.log("Updating house:", houseId);

      if (!houseId) {
        console.error("House ID is required");
        return new NextResponse("House ID is required", {
          status: 400,
        });
      }

      // Parse the request body as FormData
      const formData = await req.formData();

      // Fetch user by userId
      const userIdCheck = formData.get("userId") as string;
      const user = await User.findById(userIdCheck);

      console.log("user - patchHouse route", user);

      // Check if user exists
      if (!user) {
        console.error("User not found");
        return new NextResponse("User not found", {
          status: 404,
        });
      }

      // Check if the user has the intended role
      const intendedRole = "houseOwner";
      if (user.role !== intendedRole) {
        return new NextResponse("User does not have the intended role", {
          status: 403,
        });
      }

      // console.log("formData:", formData);
      //convert the FormDataEntryValue to a string using the .toString() method
      const typeOfHouseEntry = formData.get("typeOfHouse");
      const typeOfHouse =
        typeof typeOfHouseEntry === "string" ? typeOfHouseEntry : "";

      const housingConditionsEntry = formData.get("housingConditions");
      const housingConditions =
        typeof housingConditionsEntry === "string"
          ? housingConditionsEntry
          : "";

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
      const longitude =
        typeof longitudeEntry === "string" ? longitudeEntry : "";

      const userIdEntry = formData.get("userId");
      const userId = typeof userIdEntry === "string" ? userIdEntry : "";

      // console.log("userId - route - edit house: ", userId);

      const imageBase64Entry = formData.get("imageBase64");
      const imageBase64 =
        typeof imageBase64Entry === "string" ? imageBase64Entry : "";

      const imageTypeEntry = formData.get("imageType");
      const imageType =
        typeof imageTypeEntry === "string" ? imageTypeEntry : "";

      const validationResult = validateFields({
        typeOfHouse,
        housingConditions,
        selectedOption,
        selectedYear,
        area,
        streetName,
        locality,
        municipality,
        postalCode,
        latitude,
        longitude,
      });

      if (validationResult) {
        return validationResult;
      }

      // Sanitize input data
      const updatedFields: UpdatedFields = {
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
      };

      // Include image data only if provided
      if (imageBase64 && imageType) {
        updatedFields.image = {
          data: imageBase64,
          contentType: imageType,
        };
      }

      console.log("Sanitized data:", updatedFields);

      const updatedHouse = await House.findByIdAndUpdate(
        houseId,
        updatedFields,
        { new: true }
      );

      if (!updatedHouse) {
        console.error("House not found");
        return new NextResponse("House not found", {
          status: 404,
        });
      }

      // console.log("Updated house:", updatedHouse);

      return new NextResponse(
        JSON.stringify({ message: "House updated successfully" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error updating house:", error);

      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }

  console.error("Method not allowed");

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
