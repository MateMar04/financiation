import React, { useState, useEffect } from "react";
import ListAdvised from "../components/ListAdvised";

const AdvisedListPage = () => {

    let [advised, setAdvised] = useState([])

    useEffect(() => {
        getAdvised()
    }, [])

    let getAdvised = async () => {
        let response = await fetch('/api/advised/')
        let data = await response.json()
        setAdvised(data)
    };

    return(
        <div>
            <div className='advised-list'>
                { advised.map((advised, index) => (
                    <ListAdvised key={index} advised={advised}/>
                ))}
            </div>
        </div>
    )
}

export default AdvisedListPage;