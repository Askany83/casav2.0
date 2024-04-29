/**
 * Handles POST request to check if a user exists.
 * Connects to MongoDB, finds user by email,
 * and returns user object if found.
 */

import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import GovUser from "@/models/govUser";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();

    // Check if the user exists in the User collection
    const user = await User.findOne({ email }).select("_id");

    // Check if the user exists in the GovUser collection
    const govUser = await GovUser.findOne({ email }).select("_id");

    if (user || govUser) {
      // User or GovUser found, return the user object
      return NextResponse.json({ user: user || govUser });
    } else {
      // Neither user nor govUser found
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.error();
  }
}
