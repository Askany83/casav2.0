import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();
      console.log("Connected to MongoDB - deleteHouse");

      const parsedUrl = new URL(req.url, "http://localhost:3000");
      const houseId = parsedUrl.searchParams.get("houseId");
      console.log("Deleting house:", houseId);

      if (!houseId) {
        return new NextResponse("House ID is required", {
          status: 400,
        });
      }

      const deletedHouse = await House.findByIdAndDelete(houseId);

      if (!deletedHouse) {
        return new NextResponse("House not found", {
          status: 404,
        });
      }

      return new NextResponse("House deleted successfully", {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting house:", error);
      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
