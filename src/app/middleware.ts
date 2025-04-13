import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secred'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) return NextResponse.redirect(new URL('/', req.url))

        try {
            jwt.verify(token, JWT_SECRET)
            return NextResponse.next()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            return NextResponse.redirect(new URL('/', req.url))
            
        }
}   

export const config = {
    matcher: ['/dashboard', '/chat:id']
}
