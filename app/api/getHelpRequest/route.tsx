import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import HelpRequest from "@/models/helpRequest";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const parsedUrl = new URL(req.url, "http://localhost:3000");
    const houseId = parsedUrl.searchParams.get("houseId");

    console.log("Fetching help request for house:", houseId);

    if (!houseId) {
      return new NextResponse("House ID is required", {
        status: 400,
      });
    }

    await connectMongoDB();

    const helpRequest = await HelpRequest.findOne({ houseId });

    if (!helpRequest) {
      return new NextResponse("No help request found for the given house", {
        status: 404,
      });
    }

    // If help request found, return the response with help request data
    return new NextResponse(JSON.stringify(helpRequest), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching help request:", error);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
};
