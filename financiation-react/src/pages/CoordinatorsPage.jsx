import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Container} from "react-bootstrap";
import {UserParagraph} from "../components/UserParagraph";

export const CoordinatorsPage = () => {
    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getCoordinators()
    }, [])

    let getCoordinators = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/api/coordinator`, {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };
    return (
        <Container fluid>
            {coordinators?.map((coordinator) => (
                <UserParagraph userId={coordinator.id_user}/>
            ))}
        </Container>


    )
}
