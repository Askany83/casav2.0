import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GovUser from "@/models/govUser";

// Define the route handler function
export const GET = async (req: NextRequest) => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const session = await getServerSession(authOptions);

    // Assuming you have stored the user's email in session
    const userEmail = session?.user?.email;

    if (!userEmail) {
      // User email not found in session
      return NextResponse.json(
        { message: "User email not found in session" },
        { status: 400 }
      );
    }

    // Check if the user exists in the GovUser collection
    const govUser = await GovUser.findOne({ email: userEmail });

    const { municipality } = govUser;
    console.log("Municipality:", municipality);

    // Fetch houses based on the municipality (case-insensitive)
    const houses = await House.find({
      municipality: { $regex: new RegExp(`^${municipality}`, "i") },
    });

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
