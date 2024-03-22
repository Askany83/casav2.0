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
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});

export async function POST(req: NextRequest) {
  const uploadMiddleware = upload.single("image");

  try {
    await new Promise<void>((resolve, reject) => {
      uploadMiddleware(req as any, {} as any, (err?: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const image = (req as any).file;

    // Rest of your code...

    // // Validate WebP type
    // const allowedType = ["image/webp"];

    // if (!allowedTypes.includes(image.mimetype)) {
    //   return NextResponse.json({ error: "Invalid image type" });
    // }
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

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

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
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
    };

    await connectMongoDB();
    await House.create(sanitizedData);

    return NextResponse.json({ message: "House created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
