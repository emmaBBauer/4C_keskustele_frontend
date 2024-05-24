import React, {createContext, useContext, useState} from 'react';
import {IUser} from "../models/IUser";

interface UserContextProps {
    user: IUser|undefined
    setUser: (user:IUser|undefined) => void
}


const UserContext = createContext<UserContextProps>(
    {
        user: undefined,
        setUser: () => {},
    }
);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context)
    {
        throw new Error("Context must be used within a Provider");
    }

    return context;
}

interface UserProviderProps{
    children: React.ReactNode
}



const UserContextProvider: React.FC<UserProviderProps> = ({children}) => {
    const [user, setUser] = useState<IUser>();

    const handleSetUser = (newUser: IUser|undefined) => {
        setUser(newUser);
    };

    return <UserContext.Provider value={{user, setUser:handleSetUser}}>
        {children}
    </UserContext.Provider>
}




export default UserContextProvider;