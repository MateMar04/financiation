import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {getUserById} from "../services/UserServices";

export const UserOption = ({userId, advisorValue}) => {

    let {authTokens} = useContext(AuthContext)
    let [user, setUser] = useState([])

    useEffect(() => {
        getUserById(authTokens.access, userId).then(data => setUser(data))
    }, [])

    return (
        <option key={user.id} value={advisorValue}>{user.ssn}</option>
    )
}
