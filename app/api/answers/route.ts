import { connectDB } from "@/connectDB";
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Answers } from "@/models/AnswersSchema";
import { Questions } from "@/models/QuestionsSchema";


interface IAnswers {
    title: string;
    questionId: string;
}

interface IUser {
    _id: string;
    fName: string;
    lName: string;
}


export const GET = async () => {
    try {
        await connectDB()
        const answers = await Answers.find()
        return NextResponse.json({ message: answers }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something' }, { status: 400 })
    }
}

export const POST = async (req: NextRequest) => {
    const token = req.headers.get('Authorization') as string
    const { title, questionId } = await req.json() as IAnswers
    const { _id, fName, lName } = ((await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET))).payload).user as IUser
    if (title && questionId) {
        try {
            await connectDB()
            const question = await Questions.findById(questionId)
            if (question) {
                await Answers.create({ title, author: _id, question: questionId, fName, lName })
                return NextResponse.json({ message: 'Question has been created' }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 })
    }
}