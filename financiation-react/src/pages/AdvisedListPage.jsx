import React, {useContext, useEffect, useState} from "react";
import ListAdvised from "../components/ListAdvised";

const AdvisedListPage = () => {

    let [advised, setAdvised] = useState([])

    useEffect(() => {
        getAdvised()
    }, [])

    let getAdvised = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT ", //add JWT access token
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