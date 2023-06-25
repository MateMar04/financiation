import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";

export const UserParagraph = ({userId}) => {
    let {authTokens} = useContext(AuthContext)
    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/auth/users/${userId}/`, {headers: headers})
        let data = await response.json()
        setUser(data)
    };


    return (
        <p>{user.first_name} {user.last_name}</p>
    )
}
