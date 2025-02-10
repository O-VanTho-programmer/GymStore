"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getCurrentUser from "@/utils/getCurrentUser";

const UserContext = createContext({ currentUser: null, setCurrentUser: () => { } }); 

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext) || { currentUser: null, setCurrentUser: () => { } };
};
