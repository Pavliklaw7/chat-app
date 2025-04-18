import { connectDB } from '@/app/lib/mongodb'
import User from '@/app/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'secred'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  })

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return Response.json({message: 'Auth success!'})
}
