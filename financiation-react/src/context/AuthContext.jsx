import {createContext, useState} from "react";

const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState();
    let [user, setUser] = useState();

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/jwt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        console.log('data', data)
        console.log('response', response)
    }

    let contextData = {
        loginUser:loginUser
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
