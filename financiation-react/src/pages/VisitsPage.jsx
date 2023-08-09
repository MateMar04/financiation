import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {VisitCard} from "../components/VisitCard";
import getVisits from "../services/VisitServices";

export const VisitsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [visits, setVisits] = useState([])


    useEffect(() => {
        getVisits(authTokens.access).then(r => setVisits(r))
    }, [])

    return (
        <Container fluid>
            {visits?.map((visit) => (
                <VisitCard visit={visit}/>
            ))}
        </Container>
    )
}
