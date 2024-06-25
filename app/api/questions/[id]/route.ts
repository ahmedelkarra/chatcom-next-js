import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { connectDB } from '@/connectDB';
import { Questions } from '@/models/QuestionsSchema';

interface IParams {
    id: string;
}

interface ILikeAction {
    likeAction: 'plus' | 'minus';
}

interface IUser {
    _id: string;
}

export const PUT = async (req: NextRequest, { params }: { params: IParams }) => {
    const token = req.headers.get('Authorization') as string;
    const { likeAction } = await req.json() as ILikeAction;
    const { _id } = ((await jwtVerify(new TextEncoder().encode(token), new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET))).payload).user as IUser;
    const id = params.id;

    if (!likeAction) {
        return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 });
    }

    try {
        await connectDB();
        const question = await Questions.findById(id);

        if (!question) {
            return NextResponse.json({ message: 'Question not found' }, { status: 404 });
        }

        if (likeAction === 'plus') {
            if (question.likes.includes(_id)) {
                return NextResponse.json({ message: 'You have already liked this question' }, { status: 400 });
            }

            if (question.dislike.includes(_id)) {
                return NextResponse.json({ message: 'You cannot like a question you have already disliked' }, { status: 400 });
            }

            await Questions.findByIdAndUpdate(id, { $push: { likes: _id }, $pull: { dislike: _id } });
            return NextResponse.json({ message: 'Liked successfully' }, { status: 200 });

        } else if (likeAction === 'minus') {
            if (question.dislike.includes(_id)) {
                return NextResponse.json({ message: 'You have already disliked this question' }, { status: 400 });
            }

            if (question.likes.includes(_id)) {
                return NextResponse.json({ message: 'You cannot dislike a question you have already liked' }, { status: 400 });
            }

            await Questions.findByIdAndUpdate(id, { $push: { dislike: _id }, $pull: { likes: _id } });
            return NextResponse.json({ message: 'Disliked successfully' }, { status: 200 });

        } else {
            return NextResponse.json({ message: 'Please check your inputs' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
    }
}
