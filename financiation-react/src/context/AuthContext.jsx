import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const AuthContext = createContext();

export default AuthContext
export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)

    let history = useNavigate()
    /* 1
    let signin = async (e, dispatch) => {
        e.preventDefault()
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let body = JSON.stringify({'first_name': e.target.first_name.value,
                                'last_name': e.target.last_name.value, 
                                'username': e.target.username.value, 
                                'ssn': e.target.ssn.value,
                                'email': e.target.email.value,
                                'phone': e.target.phone.value,
                                'password': e.target.password.value,
                                're_password': e.target.re_password.value})
        
        try {
            let res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
            dispatch({
                payload: res.data
            });
            history('/login')
    
        } 
        catch (err){
            alert('No se pudo registrar')
        }
    }
    */
    /*
    let signin = async (e) => {
        e.preventDefault()
        let response = await fetch('./auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value, 
            'username': e.target.username.value, 
            'ssn': e.target.ssn.value,
            'email': e.target.email.value,
            'phone': e.target.phone.value,
            'password': e.target.password.value,
            're_password': e.target.re_password.value})
        })
        if (response.status === 200) {
            history('/login')
        } else {
            alert('Something went wrong')
        }
    }
    */
   /*
    let signin = async (e) => {
        e.preventDefault()
        let response = await fetch('/auth/jwt/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            ({'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value, 
            'username': e.target.username.value, 
            'ssn': e.target.ssn.value,
            'email': e.target.email.value,
            'phone': e.target.phone.value,
            'password': e.target.password.value,
            're_password': e.target.re_password.value})
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
    */
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

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/')
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
        signin: signin,
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
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
