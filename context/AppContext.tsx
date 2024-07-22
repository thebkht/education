import { getLocalStorage, setLocalStorage } from "@/helpers/localStorage";
import { User } from "@/interfaces/auth";
import { AuthServices } from "@/services/auth";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AppContextProps = {
     user: User | null;
     handleAuth: (data?: User) => void;
}

const AppContext = createContext({} as AppContextProps);

export default function AppContextProvider({ children, ...props }: PropsWithChildren<AppContextProps>) {
     const [user, setUser] = useState<User | null>(getLocalStorage("user"));

     const handleAuth = (data?: User) => {
          if (data) {
               setUser(data);
          } else {
               setUser(null);
               localStorage.removeItem("user");
          }
     };

     useEffect(() => {
          AuthServices.session().then((res) => {
               const user: User | null = getLocalStorage("user");
               handleAuth({
                    fullName: res.fullName ?? user?.fullName ?? "user",
               });
               setLocalStorage({
                    fullName: res.fullName ?? user?.fullName ?? "user",
               })
          })
     }, []);

     return (
          <AppContext.Provider value={{ ...props, user, handleAuth }}>
               {children}
          </AppContext.Provider>
     )
}

export const useAppContext = () => {
     return useContext(AppContext);
}