import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/valitationUtils";
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("Name: ", name);
    // console.log("Email: ", email);
    // console.log("Password: ", hashedPassword);

    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while creating user" },
      { status: 500 }
    );
  }
}
