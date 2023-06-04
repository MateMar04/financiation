import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AdvisedPage = () => {

    const {id} = useParams()

    let advisedId = id
    let [advised, setAdvised] = useState(null)
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getAdvised()
    }, [advisedId])

    let getAdvised = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/advised/${advisedId}/`, {headers: headers})
        let data = await response.json()
        setAdvised(data)
    }

    return (
        <div>
            <h1>{advised?.first_name} {advised?.last_name}</h1>
        </div>
    )
}

export default AdvisedPage;