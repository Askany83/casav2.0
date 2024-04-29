/**
 * Deletes a house by ID.
 *
 * Requires the house ID as a query parameter.
 * Connects to MongoDB.
 * Finds and deletes the house by ID.
 * Returns success/error responses.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import User from "@/models/user";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "DELETE") {
    try {
      await connectMongoDB();

      // console.log("Connected to MongoDB - deleteHouse");

      const parsedUrl = new URL(req.url, "http://localhost:3000");
      const houseId = parsedUrl.searchParams.get("houseId");

      // console.log("Deleting house:", houseId);

      if (!houseId) {
        return new NextResponse("House ID is required", {
          status: 400,
        });
      }

      // Find the house by ID to retrieve the user ID
      const house = await House.findById(houseId);
      if (!house) {
        return new NextResponse("House not found", {
          status: 404,
        });
      }

      // Check if the user is authorized to delete the house - role: houseOwner
      const { userId } = house;
      console.log("userId - deleteHouse route", userId);

      const user = await User.findById(userId);
      const { role } = user;

      if (role !== "houseOwner") {
        return new NextResponse("Only houseOwner can delete houses", {
          status: 403,
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
