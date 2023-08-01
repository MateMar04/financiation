import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {UserParagraph} from "../components/UserParagraph";
import {getCoordinators} from "../services/CoordinatorServices";

export const CoordinatorsPage = () => {
    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinators(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <Container fluid>
            {coordinators?.map((coordinator) => (
                <UserParagraph userId={coordinator.id_user}/>
            ))}
        </Container>


    )
}
