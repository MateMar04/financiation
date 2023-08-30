import React, {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import FailedModal from "../components/FailedModal";
import LoadingModal from "../components/LoadingModal";
import {getUserById} from "../services/UserServices";


const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {


    const [showfail, setShowfailture] = useState(false);
    const [showloading, setShowloading] = useState(false);
    const toggleModalfailed = () => setShowfailture(!showfail);


    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    let [myUser, setMyUser] = useState({})


    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let signIn = async (e) => {
        e.preventDefault()
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
            setMyUser(getUserById(authTokens.access, user?.user_id).then(data => setMyUser(data)))
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/menu')
        } else {
            if (response.status === 401) {
                alert("Revisa las credenciales ingresadas")

            }
            if (response.status === 400) {
                alert("Ocurrio un error inesperado")
            } else {
                alert("Ocurrio un error inesperado")

            }
        }

    }

    let logoutUser = () => {
        setMyUser({})
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        setMyUser(getUserById(authTokens.access, user?.user_id).then(data => setMyUser(data)))
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
        myUser: myUser,
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

            <FailedModal message="la visita" show={showfail}/>
            <LoadingModal message="la visita" show={showloading}/>

            {loading ? null : children}
        </AuthContext.Provider>
    );
};