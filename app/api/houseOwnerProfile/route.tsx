/**
 * Handles GET requests to the house owner profile API route.
 *
 * Parses the request URL to extract the email query parameter.
 * If no email is provided, returns all users.
 * If an email is provided, finds and returns that user, or 404 if not found.
 */

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";
import { parse } from "url";

export const GET = async (req: NextRequest) => {
  try {
    console.log("Request object:", req);

    await connectMongoDB();

    // Parse the URL to extract query parameters
    const { query } = parse(req.url || "", true);
    const email = (query.email as string) || "";

    console.log("email - houseOwnerProfile route", email);

    // If email is not provided, return all users
    if (!email) {
      return new NextResponse("Email not found", {
        status: 404,
      });
    }

    // If email is provided, find the user with the matching email
    const user = await User.findOne({ email })
      .populate("image")
      .select("+image.data +image.contentType");

    console.log("user - houseOwnerProfile route", user);

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const { role } = user;
    console.log("role - houseOwnerProfile route", role);
    // Check if the user has the intended role
    const intendedRole = "houseOwner";
    if (role !== intendedRole) {
      return new NextResponse("User does not have the intended role", {
        status: 403,
      });
    }

    const { image } = user;
    console.log("image - houseOwnerProfile route", image);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching user: " + error, {
      status: 500,
    });
  }
};
