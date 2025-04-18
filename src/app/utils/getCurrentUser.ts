/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!

export async function getCurrentUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value
  if (!token) return null

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string, name: string, email: string }
    return payload
  } catch (err: unknown) {
    return null
  }
}
