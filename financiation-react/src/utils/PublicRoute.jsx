import React from "react";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";

export const PublicRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    return (
        !user ? children : <Navigate to='/reports'/>
    )
}
