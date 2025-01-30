import React, { createContext, useContext, useState } from 'react';

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

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInterface | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);