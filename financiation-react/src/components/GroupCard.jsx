import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import {UserParagraph} from "./UserParagraph";
import AuthContext from "../context/AuthContext";
import {getGroupAdvisorUsers, getGroupCoordinatorUsers} from "../services/UserServices";


export const GroupCard = ({group}) => {

    let {authTokens} = useContext(AuthContext)
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])


    useEffect(() => {
        getGroupAdvisorUsers(authTokens.access, group.id).then(data => setAdvisors(data))
        getGroupCoordinatorUsers(authTokens.access, group.id).then(data => setCoordinators(data))
    }, [])


    return (
        <Container fluid className='CompletlyContainer'>
            <Card className='groupcard'>
                <Container fluid className='ContainerNameGroup'>
                    <h2 className='b'>{group.name}</h2>
                </Container>
                <Row className='Columna1'>

                    <Col>
                        <Container>
                            <h3 className='a'>Asesores</h3>
                            {advisors?.map((advisor) => (
                                <p>{advisor.first_name} {advisor.last_name}</p>
                            ))}
                        </Container>

                    </Col>
                    <Col>
                        <Container>
                            <h3 className='a'>Coordinadores</h3>
                            {coordinators?.map((coordinator) => (
                                <p>{coordinator.first_name} {coordinator.last_name}</p>
                            ))}
                        </Container>

                    </Col>
                </Row>
            </Card>

        </Container>

    )
}

export default GroupCard;