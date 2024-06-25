import { Dispatch, SetStateAction, createContext } from "react";


export interface IUser {
    _id: string;
    fName: string;
    lName: string;
    email: string;
    username: string;
}

export const UserInfo = createContext<{
    userInfo: IUser,
    setUserInfo: Dispatch<SetStateAction<IUser>>
} | undefined>(undefined)