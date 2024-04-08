import { connectMongoDB } from "@/lib/mongodb";
import GovUser from "@/models/govUser";
import { NextResponse, NextRequest } from "next/server";
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
  validateMunicipality,
} from "@/utils/validationUtils";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    console.log("formData: ", formData);

    // Get the values of the name and email fields from the form data
    const name = formData.get("name") as string;
    const municipality = formData.get("municipality") as string;
    const email = formData.get("email") as string;
    // Get the values of the password and phone fields if they exist
    const password = formData.has("password")
      ? (formData.get("password") as string)
      : null;
    const phone = formData.has("phone")
      ? (formData.get("phone") as string)
      : null;

    // Use the retrieved values as needed
    console.log("Name:", name);
    console.log("Municipality:", municipality);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phone:", phone);

    // Validate name, email, and phone
    if (!validateName(name)) {
      return NextResponse.json(
        { message: "Invalid name format" },
        { status: 400 }
      );
    }

    if (!validateMunicipality(municipality)) {
      return NextResponse.json(
        { message: "Invalid municipality format" },
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

    const imageBase64 = formData.get("imageBase64");
    const imageType = formData.get("imageType");

    await connectMongoDB();

    // Find the user by email
    const user = await GovUser.findOne({ email }).select("+password");

    // Update user fields if user found
    if (user) {
      user.name = name;
      user.municipality = municipality;
      user.password = password || user.password; // Only update password if provided
      user.phone = phone || user.phone; // Only update phone if provided

      // Update image data if provided
      if (imageBase64 && imageType) {
        console.log("Image Base64:", imageBase64);
        console.log("Image Type:", imageType);

        // Check if the image type is WebP
        if (imageType !== "image/webp") {
          return NextResponse.json(
            { message: "Invalid image type. Only WebP images are supported" },
            { status: 400 }
          );
        }

        // Update user's image data
        user.image = {
          data: imageBase64,
          contentType: imageType,
        };
      }
      // Save the updated user
      await user.save();
      console.log("User updated!");
      return NextResponse.json({ message: "User updated!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
