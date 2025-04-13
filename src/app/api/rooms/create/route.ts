import { connectDB } from '@/app/lib/mongodb'
import Room from '@/app/models/Room'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return Response.json({ error: 'Not authorized' }, { status: 401 })

    const payload = jwt.verify(token, JWT_SECRET) as { id: string }
    const { room } = await req.json()

    await connectDB()

    const newRoom = await Room.create({
        name: room,
        creatorId: payload.id,
        lastActivity: new Date(),
    })

    return Response.json({ room: newRoom })
}
