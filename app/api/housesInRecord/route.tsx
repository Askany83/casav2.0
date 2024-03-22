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

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    // Retrieve email from the request headers or query parameters
    const userEmail = req.headers.get("Authorization"); // or however you pass the email in the request

    // If email is not provided or if user is not authenticated, return a 401 Unauthorized response
    if (!userEmail) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Query houses based on the user's email
    const houses = await House.find({ email: userEmail });

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
