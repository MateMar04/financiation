import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {VisitCard} from "../components/VisitCard";

export const VisitsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [visits, setVisits] = useState([])


    useEffect(() => {
        getVisits()
    }, [])

    let getVisits = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/visit/', {headers: headers})
        let data = await response.json()
        setVisits(data)
    };

    return (
        <Container fluid>
            {visits?.map((visit) => (
                <VisitCard visit={visit}/>
            ))}
        </Container>
    )
}
