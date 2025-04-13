import { connectDB } from '@/app/lib/mongodb'
import User from '@/app/models/User'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()
  await connectDB()

  const userExists = await User.findOne({ email })
  if (userExists) {
    return Response.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashedPassword })

  return Response.json({ message: 'User registered', user })
}
