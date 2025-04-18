import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/', '/login', '/register'];

export function middleware(req: NextRequest) {
    const isTokenExists = req.cookies.get('token')?.value
    const { pathname } = req.nextUrl
    const isPublicPath = PUBLIC_PATHS.includes(pathname)
    const isLoggedIn = !!isTokenExists

    if (!isLoggedIn && !isPublicPath) return NextResponse.redirect(new URL('/', req.url))

    return NextResponse.next()
}   

export const config = {
    matcher: ['/', '/dashboard', '/chat/:path*', '/((?!api|_next|.*\\..*).*)'],
};
