/**
 * Handles GET requests to the government user profile API route.
 *
 * Parses the request URL to extract the email query parameter.
 * If no email is provided, returns all government users.
 * If an email is provided, finds and returns that government user, or 404 if not found.
 */

import { connectMongoDB } from "@/lib/mongodb";
import GovUser from "@/models/govUser";
import { NextResponse, NextRequest } from "next/server";
import { parse } from "url";

export const GET = async (req: NextRequest) => {
  try {
    await connectMongoDB();

    // Parse the URL to extract query parameters
    const { query } = parse(req.url || "", true);
    const email = (query.email as string) || "";

    console.log("email - governmentUserProfile route", email);

    // If email is not provided, return all government users
    if (!email) {
      return new NextResponse("Email not found", {
        status: 404,
      });
    }

    // If email is provided, find the government user with the matching email
    const user = await GovUser.findOne({ email })
      .populate("image")
      .select("+image.data +image.contentType");

    console.log("user - governmentUserProfile route", GovUser);

    if (!user) {
      return new NextResponse("Government user not found", {
        status: 404,
      });
    }

    const { role } = user;
    console.log("role - govUserProfile route", role);
    // Check if the user has the intended role
    const intendedRole = "govUser";
    if (role !== intendedRole) {
      return new NextResponse("User does not have the intended role", {
        status: 403,
      });
    }

    const { image } = user;
    console.log("image - govUserProfile route", image);

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error fetching government user: " + error, {
      status: 500,
    });
  }
};
