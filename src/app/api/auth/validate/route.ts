import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url)) // <-- ВОТ ЭТО
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET)
        return Response.json({user: decode})
    } catch {
        return new Response('Invalid token', {status: 401})
    }
}
