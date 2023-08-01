import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {UserParagraph} from "../components/UserParagraph";
import {getAdvisors} from "../services/AdvisorServices";

export const AdvisorsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])

    useEffect(() => {
        getAdvisors(authTokens.access).then(data => setAdvisors(data))
    }, [])

    return (
        <Container fluid>
            {advisors?.map((advisor) => (
                <UserParagraph userId={advisor.id_user}/>
            ))}
        </Container>

    )
}
