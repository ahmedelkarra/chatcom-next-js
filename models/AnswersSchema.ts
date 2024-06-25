import mongoose from "mongoose";

interface IAnswers {
    title: string;
    likes: mongoose.Types.ObjectId[];
    dislike: mongoose.Types.ObjectId[];
    author: mongoose.Schema.Types.ObjectId;
    question: mongoose.Schema.Types.ObjectId;
    fName: string;
    lName: string;
}

const AnswersSchema = new mongoose.Schema<IAnswers>(
    {
        fName: { type: String, required: true, maxlength: 20, ref: 'User' },
        lName: { type: String, required: true, maxlength: 20, ref: 'User' },
        title: { type: String, required: true, maxlength: 2000 },
        likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
        dislike: { type: [mongoose.Schema.Types.ObjectId], default: [] },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        question: { type: mongoose.Schema.Types.ObjectId, ref: "Questions", required: true }
    },
    { timestamps: true }
);

export const Answers = mongoose.models.Answers || mongoose.model('Answers', AnswersSchema);
