import mongoose from "mongoose";

interface IQuestions {
    title: string;
    body: string;
    descriptions: string[];
    author: mongoose.Schema.Types.ObjectId;
    fName: string;
    lName: string;
    likes: mongoose.Schema.Types.ObjectId[];
    dislike: mongoose.Schema.Types.ObjectId[];
}

const QuestionsSchema = new mongoose.Schema<IQuestions>(
    {
        title: { type: String, required: true, maxlength: 50 },
        body: { type: String, required: true, maxlength: 2000 },
        descriptions: { type: [String], required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fName: { type: String, required: true, maxlength: 20, ref: 'User' },
        lName: { type: String, required: true, maxlength: 20, ref: 'User' },
        likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
        dislike: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    },
    { timestamps: true }
);

export const Questions = mongoose.models.Questions || mongoose.model('Questions', QuestionsSchema);
