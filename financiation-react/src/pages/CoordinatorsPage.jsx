import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {UserParagraph} from "../components/UserParagraph";
import {getCoordinators, getCoordinatorUsers} from "../services/CoordinatorServices";

export const CoordinatorsPage = () => {
    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    return (
        <Container fluid>
            {coordinators?.map((coordinator) => (
                <UserParagraph user={coordinator}/>
            ))}
        </Container>


    )
}
