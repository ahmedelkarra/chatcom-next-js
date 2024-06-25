import { Dispatch, SetStateAction, createContext } from "react";


export interface IAnswers {
    _id: string;
    fName: string;
    lName: string;
    title: string;
    likes: [];
    dislike: [];
    author: string;
    question: string;
    createdAt: Date,
    updatedAt: Date,
}

export const AnswersInfo = createContext<{
    answersInfo: IAnswers[],
    setAnswersInfo: Dispatch<SetStateAction<IAnswers[]>>
} | undefined>(undefined)