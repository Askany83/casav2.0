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
} from "@/utils/valitationUtils";
import xss from "xss";

export async function POST(req: NextRequest) {
  try {
    const {
      typeOfHouse,
      housingConditions,
      selectedOption,
      selectedYear,
      area,
      streetName,
      locality,
      postalCode,
      latitude,
      longitude,
      email,
    } = await req.json();

    //verify

    if (
      !typeOfHouse ||
      !housingConditions ||
      !selectedOption ||
      !selectedYear ||
      !area ||
      !streetName ||
      !locality ||
      !postalCode ||
      !latitude ||
      !longitude ||
      !email ||
      !validateStreetName(streetName) ||
      !validateLocality(locality) ||
      !validatePostalCode(postalCode) ||
      !validateArea(area) ||
      !validateLatitude(latitude) ||
      !validateLongitude(longitude)
    ) {
      return NextResponse.json(
        { message: "Invalid input data" },
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
      postalCode: xss(postalCode.trim()),
      latitude: xss(latitude.trim()),
      longitude: xss(longitude.trim()),
      email: xss(email.trim()),
    };

    await connectMongoDB();
    await House.create(sanitizedData);

    return NextResponse.json({ message: "House created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
