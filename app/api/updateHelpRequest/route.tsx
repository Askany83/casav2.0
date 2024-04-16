import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";
import User from "@/models/user";
import HelpRequest from "@/models/helpRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Message {
  content: string;
  sender: string;
}
export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectMongoDB();
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
    const { houseId, houseState, messages, apoios } = houseStateData as {
      houseId: string;
      houseState: string;
      messages: Message[]; // Annotate the type of messages as Message[]
      apoios: { apoio1: boolean; apoio2: boolean; apoio3: boolean };
    };

    console.log("houseStateData: ", houseStateData);

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
    const houseOwner = await User.findOne({ email: userEmail });

    const { role, _id } = houseOwner;
    const govUserId = _id.toString();

    console.log("govUserId: ", govUserId);

    if (!houseOwner) {
      return NextResponse.json(
        { message: "User is not a house owner" },
        { status: 403 }
      );
    } else {
      // Check if the user has the intended role
      const intendedRole = "houseOwner";
      if (role !== intendedRole) {
        return new NextResponse("User does not have the intended role", {
          status: 403,
        });
      }
    }

    // Update the house state
    // const fields = { houseState, govUserId };

    // const updatedHouse = await House.findByIdAndUpdate(houseId, fields, {
    //   new: true,
    // });

    // if (!updatedHouse) {
    //   return NextResponse.json({ message: "House not found" }, { status: 404 });
    // }

    // console.log("Updated house:", updatedHouse);

    // Find the HelpRequest by houseId
    const helpRequest = await HelpRequest.findOne({ houseId });

    if (!helpRequest) {
      return NextResponse.json(
        { message: "Help request not found" },
        { status: 404 }
      );
    }

    // Update the HelpRequest with new messages and apoios
    for (const newMessage of messages) {
      const existingMessageIndex = helpRequest.messages.findIndex(
        (message: Message) =>
          message.content === newMessage.content &&
          message.sender === newMessage.sender
      );
      if (existingMessageIndex !== -1) {
        // Update existing message
        helpRequest.messages[existingMessageIndex].updatedAt = new Date();
      } else {
        // Add new message
        helpRequest.messages.push(newMessage);
      }
    }
    helpRequest.apoios = apoios;
    await helpRequest.save();

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
