import React, {useContext, useEffect, useState} from "react";
import ListAdvised from "../components/ListAdvised";
import AuthContext from "../context/AuthContext";

const AdvisedListPage = () => {

    let [advised, setAdvised] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getAdvised()
    }, [])

    let getAdvised = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access), //add JWT access token
            "Accept": "application/json"
        }
        let response = await fetch('/api/advised/', {headers: headers})
        let data = await response.json()
        setAdvised(data)
    };

    return (
        <div>
            <div className='advised-list'>
                {advised.map((advised, index) => (
                    <ListAdvised key={index} advised={advised}/>
                ))}
            </div>
        </div>
    )
}

export default AdvisedListPage;