import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import House from "@/models/house";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      console.log("Connected to MongoDB - deleteUser");

      const parsedUrl = new URL(req.url, "http://localhost:3000");
      const userId = parsedUrl.searchParams.get("userId");
      console.log("Deleting user:", userId);

      if (!userId) {
        return new NextResponse("User ID is required", {
          status: 400,
        });
      }

      // Delete all houses associated with the user ID
      const deleteHousesResult = await House.deleteMany({ userId });

      // Check if any houses were deleted
      if (deleteHousesResult.deletedCount === 0) {
        console.log("No houses found for user ID:", userId);
      } else {
        console.log(
          `${deleteHousesResult.deletedCount} houses deleted for user ID:`,
          userId
        );
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return new NextResponse("User not found", {
          status: 404,
        });
      }

      return new NextResponse("User deleted successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new NextResponse("Error deleting user", {
        status: 500,
      });
    }
  }

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
