import { Dispatch, SetStateAction, createContext } from "react";


export const IsLogin = createContext<{
    isLogin: boolean,
    setIsLogin: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)