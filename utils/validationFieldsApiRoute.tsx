import { NextResponse } from "next/server";
import {
  validateStreetName,
  validateLocality,
  validatePostalCode,
  validateArea,
  validateLatitude,
  validateLongitude,
  validateName,
  validateEmail,
  validatePhone,
} from "@/utils/validationUtils";

export function validationFields({
  streetName,
  locality,
  municipality,
  postalCode,
  area,
  latitude,
  longitude,
}: {
  streetName: string;
  locality: string;
  municipality: string;
  postalCode: string;
  area: string;
  latitude: string;
  longitude: string;
}): NextResponse | undefined {
  if (!validateStreetName(streetName)) {
    return NextResponse.json(
      { message: "Invalid street name" },
      { status: 400 }
    );
  }

  if (!validateLocality(locality)) {
    return NextResponse.json({ message: "Invalid locality" }, { status: 400 });
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
    return NextResponse.json({ message: "Invalid latitude" }, { status: 400 });
  }

  if (!validateLongitude(longitude)) {
    return NextResponse.json({ message: "Invalid longitude" }, { status: 400 });
  }

  return undefined; // No validation errors
}

export function validateUserData({
  name,
  email,
  phone,
  surname,
}: {
  name: string;
  email: string;
  phone: string | null;
  surname: string;
}): NextResponse | undefined {
  if (!validateName(name)) {
    return NextResponse.json(
      { message: "Invalid name format" },
      { status: 400 }
    );
  }

  if (!validateName(surname)) {
    return NextResponse.json(
      { message: "Invalid surname format" },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  if (phone && !validatePhone(phone)) {
    return NextResponse.json(
      { message: "Invalid phone number format" },
      { status: 400 }
    );
  }

  return undefined; // No validation errors
}

export const validateFields = (fields: any): NextResponse | undefined => {
  const {
    typeOfHouse,
    housingConditions,
    selectedOption,
    selectedYear,
    area,
    streetName,
    locality,
    civilParish,
    municipality,
    postalCode,
    latitude,
    longitude,
  } = fields;

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

  if (!civilParish) {
    return NextResponse.json(
      { message: "Civil parish is missing" },
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
    return NextResponse.json({ message: "Invalid locality" }, { status: 400 });
  }

  if (!validateLocality(civilParish)) {
    return NextResponse.json(
      { message: "Invalid civil parish" },
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
    return NextResponse.json({ message: "Invalid latitude" }, { status: 400 });
  }

  if (!validateLongitude(longitude)) {
    return NextResponse.json({ message: "Invalid longitude" }, { status: 400 });
  }

  return undefined;
};
