/**
 * Updates a house by ID.
 *
 * Extracts the house ID from the request URL.
 * Parses the request body for updated fields.
 * Finds the house by ID and updates it with the new fields.
 */

import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "PATCH") {
    try {
      await connectMongoDB();
      console.log("Connected to MongoDB - patchHouse");

      // Extract houseId from the URL pathname
      const houseId = req.url.split("/").pop();
      console.log("Updating house:", houseId);

      if (!houseId) {
        console.error("House ID is required");
        return new NextResponse("House ID is required", {
          status: 400,
        });
      }

      // Parse the request body as JSON
      const requestBody = await req.json();

      console.log("Request body:", requestBody);

      // Assuming the request body contains the fields to be updated
      const updatedFields = { ...requestBody };

      const updatedHouse = await House.findByIdAndUpdate(
        houseId,
        updatedFields,
        { new: true }
      );

      if (!updatedHouse) {
        console.error("House not found");
        return new NextResponse("House not found", {
          status: 404,
        });
      }

      console.log("Updated house:", updatedHouse);

      return new NextResponse(
        JSON.stringify({ message: "House updated successfully" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error updating house:", error);

      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }

  console.error("Method not allowed");

  return new NextResponse("Method not allowed", {
    status: 405,
  });
};
