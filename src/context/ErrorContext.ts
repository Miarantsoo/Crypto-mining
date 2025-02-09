import { createContext, useContext } from "react";

interface ErrorContextType {
    error: string,
    type: string,
    setType: (value: string) => void,
    setError: (value: string) => void
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export function useErrorContext(){
    const error = useContext(ErrorContext);
    
    if (error === undefined) {
        throw new Error("ErrorContext mila tsy undef tompoko o")
    }

    return error;
}