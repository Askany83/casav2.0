import { NextResponse, NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import GovUser from "@/models/govUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // Get the user's session
    const session = await getServerSession(authOptions);

    // Assuming you have stored the user's email in session
    const userEmail = session?.user?.email;

    // console.log("User email - role api route:", userEmail);

    if (!userEmail) {
      // User email not found in session
      return NextResponse.json(
        { message: "User email not found in session" },
        { status: 400 }
      );
    }

    // Check if the user exists in the User collection
    const user = await User.findOne({ email: userEmail });

    // Check if the user exists in the GovUser collection
    const govUser = await GovUser.findOne({ email: userEmail });

    if (user) {
      // User found, return the user's role
      return NextResponse.json({ role: user.role });
    } else if (govUser) {
      // GovUser found, return the user's role
      return NextResponse.json({ role: govUser.role });
    } else {
      // Neither user nor govUser found

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
