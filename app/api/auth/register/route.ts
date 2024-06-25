import { connectDB } from "@/connectDB";
import { User } from "@/models/UserSchema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'

interface IUser {
    fName: string;
    lName: string;
    email: string;
    username: string;
    pass: string;
    confirmPass: string;
}

interface IError {
    message: string;
}

export const POST = async (req: NextRequest) => {
    const { fName, lName, email, username, pass, confirmPass } = await req.json() as IUser
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ as RegExp
    const isEmail = emailPattern.test(email)
    if (fName && lName && isEmail && username && pass === confirmPass) {
        try {
            const hashPass = bcrypt.hashSync(pass, 12)
            await connectDB()
            await User.create({ fName: fName.trim().toLowerCase(), lName: lName.trim().toLowerCase(), email: email.trim().toLowerCase(), username: username.trim().toLowerCase(), pass: hashPass })
            return NextResponse.json({ message: 'User has been created' }, { status: 201 })
        } catch (error) {
            const { message } = error as IError
            if (message.includes('longer')) {
                return NextResponse.json({ message: 'Please check your inputs length' }, { status: 400 })
            } else if (message.includes('duplicate')) {
                const getErrorReason = message.split(':')[2].replace('_1 dup key', '')
                return NextResponse.json({ message: `The${getErrorReason} is already used` }, { status: 400 })
            }
        }
    } else {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 })
    }
}