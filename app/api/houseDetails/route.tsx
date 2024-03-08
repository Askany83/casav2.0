import { NextApiRequest, NextApiResponse } from "next";
import { connectMongoDB } from "@/lib/mongodb";
import House from "@/models/house";

connectMongoDB(); // Connect to the MongoDB database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Invalid house ID" });
    }

    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    return res.status(200).json(house);
  } catch (error) {
    console.error("Error fetching house details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
