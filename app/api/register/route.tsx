/**
 * Handles user registration.
 *
 * Validates user input data, hashes password,
 * creates new user document in MongoDB,
 * and returns response.
 */

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/validationUtils";
import xss from "xss";

export async function POST(req: NextRequest) {
  try {
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { name, surname, email, password, role } = data;
    console.log("Received data:", { name, surname, email, password, role });

    // validate inputs ****************************************************************************************************************************
    if (!name || !surname || !email || !password) {
      return NextResponse.json(
        { message: "Invalid input data" },
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
    const userRole = validRoles.includes(role) ? role : "houseOwner";

    // hash password ****************************************************************************************************************************
    const hashedPassword = await bcrypt.hash(password, 10);

    const sanitizedData = {
      name: xss(name.trim()),
      surname: xss(surname.trim()),
      email: xss(email.trim()),
      password: hashedPassword,
      role: userRole,
    };

    // console.log("Name: ", name);
    // console.log("Email: ", email);
    // console.log("Password: ", hashedPassword);

    await connectMongoDB();
    // create user in MongoDB ****************************************************************************************************************************
    await User.create(sanitizedData);

    return NextResponse.json({ message: "User created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while creating user" },
      { status: 500 }
    );
  }
}
