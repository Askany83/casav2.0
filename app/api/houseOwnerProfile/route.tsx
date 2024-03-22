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
    await connectMongoDB();

    // Parse the URL to extract query parameters
    const { query } = parse(req.url || "", true);
    const email = (query.email as string) || "";

    // If email is not provided, return all users
    if (!email) {
      const users = await User.find();
      return new NextResponse(JSON.stringify(users), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // If email is provided, find the user with the matching email
    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

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
