import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import HelpRequest from "@/models/helpRequest";
import House from "@/models/house";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { houseOwnerId, receiver, houseId } = data;

    console.log("Help Request Data:", data);

    if (!houseOwnerId || !receiver || !houseId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Check if there's already a help request with the provided houseId
    const existingHelpRequest = await HelpRequest.findOne({ houseId });

    if (existingHelpRequest) {
      return NextResponse.json(
        { message: "There is already a help request for this house" },
        { status: 400 }
      );
    }

    if (houseId) {
      const houseState = "pedidoDeAjuda";
      const helpRequestState = "govUserReview";
      //change the houseState from
      const updateHouseState = await House.findByIdAndUpdate(
        houseId,
        { $set: { houseState, helpRequestState } },
        { new: true }
      );
    }
    // Create a new help request document
    await HelpRequest.create({
      houseOwnerId: data.houseOwnerId,
      receiver: data.receiver,
      houseId: data.houseId,
    });

    return NextResponse.json(
      { message: "Help request sent!" },
      { status: 201 }
    );
    // Return the created help request
  } catch (error) {
    return NextResponse.json(
      { message: "Error occurred while sending help request" },
      { status: 500 }
    );
  }
}
