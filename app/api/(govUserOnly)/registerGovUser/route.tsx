/**
 * Handles govUser registration.
 *
 * Validates user input data, hashes password,
 * creates new govUser document in MongoDB,
 * and returns response.
 */

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import {
  validateMunicipality,
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validationUtils";
import GovUser from "@/models/govUser";

export async function POST(req: NextRequest) {
  try {
    const { municipality, name, surname, email, password, role } =
      await req.json();

    // validate inputs ****************************************************************************************************************************
    if (!municipality || !name || !surname || !email || !password) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    if (!validateMunicipality(municipality)) {
      return NextResponse.json(
        { message: "Invalid municipality format" },
        { status: 400 }
      );
    }

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

    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
        },
        { status: 400 }
      );
    }

    // Validate the role
    const validRoles = ["houseOwner", "govUser", "admin"];
    const userRole = validRoles.includes(role) ? role : "govUser";

    // hash password ****************************************************************************************************************************
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Name: ", name);
    // console.log("Email: ", email);
    // console.log("Password: ", hashedPassword);

    await connectMongoDB();
    // create govUser in MongoDB ****************************************************************************************************************************
    await GovUser.create({
      municipality,
      name,
      surname,
      email,
      password: hashedPassword,
      role: userRole,
    });

    return NextResponse.json({ message: "User created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while creating user" },
      { status: 500 }
    );
  }
}
