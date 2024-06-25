import { jwtVerify } from 'jose'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.headers.get('Authorization') as string
    if (token) {
        try {
            const secret = process.env.NEXT_PUBLIC_SECRET
            const userInfo = await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(secret))
            if (userInfo) {
                return NextResponse.next()
            } else {
                return NextResponse.json({ message: 'Token not valid' }, { status: 401 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Token not valid' }, { status: 401 })
        }
    } else {
        return NextResponse.json({}, { status: 200 })
    }
}

export const config = {
    matcher: ['/api/auth/me', '/api/questions']
}