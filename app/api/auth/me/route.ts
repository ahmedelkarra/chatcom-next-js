import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { User } from "@/models/UserSchema";
import { connectDB } from "@/connectDB";
import bcrypt from 'bcrypt';

interface IUser {
    fName: string;
    lName: string;
    email: string;
    username: string;
    pass: string;
    newPass?: string;
    confirmNewPass?: string;
}

interface IGetUserInfo {
    email: string;
    username: string;
    _id: string;
}

const verifyToken = async (token: string, secret: string) => {
    const userInfo = await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(secret));
    return userInfo.payload.user as IGetUserInfo;
};


export const GET = async (req: NextRequest) => {
    const token = req.headers.get('Authorization') as string;
    if (!token) {
        return NextResponse.json({}, { status: 200 });
    }

    try {
        connectDB();
        const secret = process.env.NEXT_PUBLIC_SECRET as string;
        const { email, username } = await verifyToken(token, secret);
        const user = await User.findOne({ email, username }).select(['_id', 'fName', 'lName', 'email', 'username', 'createdAt', 'updatedAt']);

        if (user) {
            return NextResponse.json({ message: user }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Token not valid' }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ message: 'Token not valid' }, { status: 401 });
    }
};

export const PUT = async (req: NextRequest) => {
    const { fName, lName, email, username, pass, newPass, confirmNewPass } = await req.json() as IUser;
    const token = req.headers.get('Authorization') as string;
    const secret = process.env.NEXT_PUBLIC_SECRET as string;
    const { _id } = ((await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(secret))).payload).user as IGetUserInfo
    const updateFields: Partial<IUser> = { fName, lName, email, username };

    if (updateFields) {
        try {
            await connectDB()
            const userinfo = await User.findById(_id)
            if (userinfo) {
                const checkPass = bcrypt.compareSync(pass, userinfo.pass)
                if (checkPass) {
                    if (newPass && newPass === confirmNewPass) {
                        const hashPass = bcrypt.hashSync(newPass as string, 12)
                        await User.findByIdAndUpdate(_id, { updateFields, pass: hashPass })
                        return NextResponse.json({ message: 'User has been updated' }, { status: 200 });
                    } else {
                        await User.findByIdAndUpdate(_id, updateFields)
                        return NextResponse.json({ message: 'User has been updated' }, { status: 200 });
                    }
                } else {
                    return NextResponse.json({ message: 'Your password is wrong' }, { status: 401 });
                }
            } else {
                return NextResponse.json({ message: 'User not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Username or Email is already used' }, { status: 403 });
        }
    } else {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 });
    }
};

export const DELETE = async (req: NextRequest) => {
    const { pass } = await req.json() as IUser;
    const secret = process.env.NEXT_PUBLIC_SECRET as string;
    const token = req.headers.get('Authorization') as string;
    const { _id } = ((await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(secret))).payload).user as IGetUserInfo
    await connectDB()
    const userinfo = await User.findById(_id)
    if (userinfo) {
        const checkPass = bcrypt.compareSync(pass, userinfo.pass)
        if (checkPass) {
            await User.findByIdAndDelete(_id)
            return NextResponse.json({ message: 'User has been deleted' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Your password is wrong' }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
};
