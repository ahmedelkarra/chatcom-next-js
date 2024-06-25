import { connectDB } from "@/connectDB";
import { Questions } from "@/models/QuestionsSchema";
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";


interface IQuestions {
    title: string;
    body: string;
    descriptions: [];
}

interface IUser {
    _id: string;
    fName: string;
    lName: string;
}

export const GET = async () => {
    try {
        await connectDB()
        const answers = await Questions.find()
        return NextResponse.json({ message: answers }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something' }, { status: 400 })
    }
}

export const POST = async (req: NextRequest) => {
    const token = req.headers.get('Authorization') as string
    const { title, descriptions, body } = await req.json() as IQuestions
    const { _id, fName, lName } = ((await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET))).payload).user as IUser
    if (title && descriptions && body) {
        try {
            await connectDB()
            const question = await Questions.create({ title, descriptions, author: _id, body, fName, lName })
            console.log(question)
            return NextResponse.json({ message: 'Question has been created' }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: error }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 })
    }
}
