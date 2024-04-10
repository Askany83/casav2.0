import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import GovUser from "@/models/govUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    let houseStateData;
    try {
      houseStateData = await req.json();

      console.log("Received houseStateData:", houseStateData);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { houseId, houseState } = houseStateData;

    // Get the current user session
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

    const { role, _id } = govUser;
    const govUserId = _id.toString();

    console.log("govUserId: ", govUserId);

    if (!govUser) {
      return NextResponse.json(
        { message: "User is not a government user" },
        { status: 403 }
      );
    } else {
      // Check if the user has the intended role
      const intendedRole = "govUser";
      if (role !== intendedRole) {
        return new NextResponse("User does not have the intended role", {
          status: 403,
        });
      }
    }

    // Update the house state
    const fields = { houseState, govUserId };

    const updatedHouse = await House.findByIdAndUpdate(houseId, fields, {
      new: true,
    });

    if (!updatedHouse) {
      return NextResponse.json({ message: "House not found" }, { status: 404 });
    }

    // console.log("Updated house:", updatedHouse);

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
};
