// app/api/rooms/route.ts
import { connectDB } from '@/app/lib/mongodb'
import Room from '@/app/models/Room'

export async function GET() {
  await connectDB()
  const rooms = await Room.find().sort({ updatedAt: -1 })
  return Response.json({ rooms })
}
