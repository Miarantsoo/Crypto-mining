import {createContext, ReactNode, useContext, } from 'react';

export interface UserInterface {
    id: number;
    nom: string;
    prenom: string;
    genre: number;
    mail: string;
    dateNaissance: string;
}

interface UserContextType {
    user: UserInterface | null;
    setUser: (user: UserInterface | null) => void;
}

// Contexte initialisé avec une valeur par défaut
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ value, children }: { value: UserContextType; children: ReactNode }) => {
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};