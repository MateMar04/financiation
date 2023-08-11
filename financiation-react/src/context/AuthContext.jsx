import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import LoadingModal from "../components/LoadingModal";

const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {

    const [showfail, setShowfailture] = useState(false);
    const [showloading, setShowloading] = useState(false);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const toggleLoad = () => setShowloading(!showloading);
    const toggleLoadClose = () => setShowloading(false);

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)

    let history = useNavigate()

    let signIn = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": e.target.first_name.value,
                "last_name": e.target.last_name.value,
                "username": e.target.username.value,
                "ssn": e.target.ssn.value,
                "email": e.target.email.value,
                "phone_number": e.target.phone.value,
                "password": e.target.password.value,
                "re_password": e.target.re_password.value
            })
        })
        if (response.status === 201) {
            history('/')
            toggleLoad();
            await signIn()
        } else  if(response.status === 400) {
            toggleModalfailed();
            await signIn()
        }
    }


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
            history('/menu')
        } else {
            if (response.status === 401) {
                toggleModalfailed();
                await loginUser()
            } if (response.status === 400) {
                toggleModalfailed();
                await loginUser()            }
            else{
                
                toggleModalfailed();
                await loginUser()
            }
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        console.log('Update')
        let response = await fetch('/auth/jwt/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        signIn: signIn,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])


    return (

        <AuthContext.Provider value={contextData}>
                        <FailedModal message="la visita" show ={showfail}/>
                        <LoadingModal message="la visita" show ={showloading}/>

            {loading ? null : children}
        </AuthContext.Provider>
    );
};