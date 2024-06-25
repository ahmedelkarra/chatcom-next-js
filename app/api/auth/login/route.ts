import { connectDB } from "@/connectDB";
import { User } from "@/models/UserSchema";
import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from "jose";
import bcrypt from 'bcrypt'

interface IUser {
    userOrEmail: string;
    pass: string;
}


export const POST = async (req: NextRequest) => {
    const { userOrEmail, pass } = await req.json() as IUser
    const secret = process.env.NEXT_PUBLIC_SECRET
    if (userOrEmail && pass) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ as RegExp
        const isEmail = emailPattern.test(userOrEmail)
        try {
            await connectDB()
            if (isEmail) {
                const user = await User.findOne({ email: userOrEmail }).select(['_id', 'fName', 'lName', 'email', 'username', 'createdAt', 'updatedAt', 'pass'])
                if (user) {
                    const checkPass = bcrypt.compareSync(pass, user.pass)
                    if (checkPass) {
                        user.pass = undefined
                        const token = await new SignJWT({ user }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(new TextEncoder().encode(secret))
                        return NextResponse.json({ message: `Welcome ${user.fName} ${user.lName}`, token: token })
                    } else {
                        return NextResponse.json({ message: 'wrong email or password' }, { status: 400 })
                    }
                } else {
                    return NextResponse.json({ message: 'wrong email or password' }, { status: 400 })
                }
            } else {
                const user = await User.findOne({ username: userOrEmail }).select(['_id', 'fName', 'lName', 'email', 'username', 'createdAt', 'updatedAt', 'pass'])
                if (user) {
                    const checkPass = bcrypt.compareSync(pass, user.pass)
                    if (checkPass) {
                        user.pass = undefined
                        const token = await new SignJWT({ user }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(new TextEncoder().encode(secret))
                        return NextResponse.json({ message: `Welcome ${user.fName} ${user.lName}`, token: token })
                    } else {
                        return NextResponse.json({ message: 'wrong username or password' }, { status: 400 })
                    }
                } else {
                    return NextResponse.json({ message: 'wrong username or password' }, { status: 400 })
                }
            }
        } catch (error) {
            return NextResponse.json({ message: error }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 })
    }
}