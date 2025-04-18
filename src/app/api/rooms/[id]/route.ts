import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Room from "@/app/models/Room";
import Message from "@/app/models/Message";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const { id } = await params;

  try {
    const room = await Room.findById(id);
    const messages = await Message.find({roomId: id}).sort({timestamp: 1})

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ room, messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({ message: "Error fetching room" }, { status: 500 });
  }
}
