/**
 * Retrieves houses for a user based on their email.
 *
 * Checks for user authorization and validates user email.
 * Queries MongoDB for houses with matching email.
 * Returns houses JSON or error response.
 */

import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    // Retrieve email from the request headers or query parameters
    const userId = req.headers.get("Authorization");

    // If email is not provided or if user is not authenticated, return a 401 Unauthorized response
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //check if user has the required role to register a house
    const user = await User.findOne({ _id: userId });

    console.log("user - housesInRecord route", user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { role } = user;

    if (role !== "houseOwner") {
      return NextResponse.json(
        { message: "Only houseOwner can create houses" },
        { status: 403 }
      );
    }

    // Query houses based on the user's email
    const houses = await House.find({ userId: userId });

    return new NextResponse(JSON.stringify(houses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching houses: " + error, {
      status: 500,
    });
  }
};
