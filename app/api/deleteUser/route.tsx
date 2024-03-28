import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

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

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return new NextResponse("User not found", {
          status: 404,
        });
      }

      return new NextResponse("User deleted successfully", {
        status: 200,
      });
    } catch (error) {}
  }

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
