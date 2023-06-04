import {createContext, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState();
    let [user, setUser] = useState();

    let history = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/jwt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/advised')
        } else {
            alert('Something went wrong')
        }
    }

    let contextData = {
        user:user,
        loginUser: loginUser
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
