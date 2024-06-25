import { Dispatch, SetStateAction, createContext } from "react";

export const IsChanged = createContext<{
    isChanged: boolean,
    setIsChanged: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)