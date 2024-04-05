import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { NextRequest, NextResponse } from "next/server";

// Define the route handler function
export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all houses from the database
    const houses = await House.find();

    // Return the houses as a JSON response
    return new NextResponse(JSON.stringify(houses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle errors
    return new NextResponse("Error fetching houses: " + error, {
      status: 500,
    });
  }
};
