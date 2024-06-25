import { Dispatch, SetStateAction, createContext } from "react";

export interface IQuestions {
    _id: string;
    title: string;
    body: string;
    descriptions: [];
    likes: [];
    dislike: [];
    author: string;
    createdAt: Date,
    updatedAt: Date,
    fName: string;
    lName: string;
}

export const QuestionsInfo = createContext<{
    questionsInfo: IQuestions[],
    setQuestionsInfo: Dispatch<SetStateAction<IQuestions[]>>
} | undefined>(undefined)