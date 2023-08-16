import React, {useContext, useEffect, useState} from "react";
import ListAdvised from "../components/ListAdvised";
import AuthContext from "../context/AuthContext";
import getAdvised from "../services/AdviseeServices";

const AdvisedListPage = () => {

    let [advised, setAdvised] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getAdvised(authTokens.access).then(data => setAdvised(data))
    }, [])


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