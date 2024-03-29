/**
 * Handles POST request to check if a user exists.
 * Connects to MongoDB, finds user by email,
 * and returns user object if found.
 */

import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");

    // console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log("Error: ", error);
  }
}
