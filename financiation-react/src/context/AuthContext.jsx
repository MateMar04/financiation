import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import LoadingModal from "../components/LoadingModal";
import {getUserById} from "../services/UserServices";
import FailedModal from "../components/FailedModal";

const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {


    const [showfail, setShowfailture] = useState(false);
    const [showloading, setShowloading] = useState(false);
    const toggleModalfailed = () => setShowfailture(!showfail);


    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    

    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let signIn = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const re_email = e.target.re_email.value;
        setShowloading(true)
        let response = await fetch('/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": e.target.first_name.value,
                "last_name": e.target.last_name.value,
                "ssn": e.target.ssn.value,
                "email": e.target.email.value,
                "re_email":e.targer.email.value,
                "phone_number": e.target.phone_number.value,
                "password": e.target.password.value,
                "re_password": e.target.re_password.value
            })
        })
        setShowloading(false)
        if (response.status === 201) {
            history('/')

        } else if (response.status === 400) {
            toggleModalfailed();
        }
        else {
            console.log(error.response);
        }
    
    }
    

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/jwt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ssn': e.target.ssn.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/menu')
        } else {
            if (response.status === 401) {
                toggleModalfailed()
                
            }
            else {
                console.log(error.response);

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

            <FailedModal onClose={() => toggleModalfailed()} message={"Revisa las Credenciales"} show={showfail}/>

            <LoadingModal message="Sign in" show={showloading}/>

            {loading ? null : children}
        </AuthContext.Provider>
    );
};