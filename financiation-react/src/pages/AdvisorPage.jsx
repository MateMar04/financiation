import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {VisitCard} from "../components/VisitCard";
import {Container} from "react-bootstrap";
import {UserParagraph} from "../components/UserParagraph";

export const AdvisorPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisors()
    }, [])

    let getAdvisors = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/advisor`, {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };
    return (
        <Container fluid>
            {advisors?.map((advisor) => (
                <UserParagraph userId={advisor.id_user}/>
            ))}
        </Container>

    )
}
