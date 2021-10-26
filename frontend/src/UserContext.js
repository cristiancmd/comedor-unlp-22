import React, { createContext, useState } from 'react';


export const UserContext = createContext();

const UserProvider = ({ children }) => {

    
    const [user, setUser] = useState(() => {
        try{
            const val = JSON.parse(localStorage.getItem("user"));
            return val;
        }catch {
            console.log('error parseando user')
            return null;
         }
        
    });

    const value = {
        user,
        loginUser: (value) => {
            setUser(value);
            window.localStorage.setItem("user", value)
        }
    }


    return (
	<UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

