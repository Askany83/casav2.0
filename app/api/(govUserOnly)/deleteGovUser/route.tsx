import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import GovUser from "@/models/govUser";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      const parsedUrl = new URL(req.url, "http://localhost:3000");
      const userId = parsedUrl.searchParams.get("userId");
      console.log("Deleting user:", userId);

      if (!userId) {
        return new NextResponse("User ID is required", {
          status: 400,
        });
      }

      const deletedGovUser = await GovUser.findByIdAndDelete(userId);

      if (!deletedGovUser) {
        return new NextResponse("Government user not found", {
          status: 404,
        });
      }

      return new NextResponse("Government user deleted successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting government user:", error);
      return new NextResponse("Error deleting government user", {
        status: 500,
      });
    }
  }

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
