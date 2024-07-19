import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
     id: string;
     name: string;
     email: string;
}

interface UserProviderProps {
     children: ReactNode;
     initialUser?: User;
}

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children, initialUser }: UserProviderProps) => {
     const [user, setUser] = useState<User | undefined>(initialUser);

     useEffect(() => {
          if (!initialUser) {
               fetch(`${process.env.API_URL}/accounts/me`)
                    .then((res) => res.json())
                    .then((data: User) => setUser(data));
          }
     }, [initialUser]);

     return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User | undefined => useContext(UserContext);
