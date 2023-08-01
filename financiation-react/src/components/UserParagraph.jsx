import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {getUserById} from "../services/UserServices";

export const UserParagraph = ({userId}) => {
    let {authTokens} = useContext(AuthContext)
    let [user, setUser] = useState([])

    useEffect(() => {
        getUserById(authTokens.access, userId).then(data => setUser(data))
    }, [])




    return (
        <p>{user.first_name} {user.last_name}</p>
    )
}
