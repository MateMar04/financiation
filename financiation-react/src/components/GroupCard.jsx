import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"
import {UserParagraph} from "./UserParagraph";


export const GroupCard = ({group, advisors, coordinators}) => {
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
                        </Container>
                        {advisors?.map((advisor) => (
                            <UserParagraph userId={advisor.id_user}/>
                        ))}

                    </Col>
                    <Col>
                        <Container>
                            <h3 className='a'>Coordinadores</h3>
                        </Container>
                        {coordinators?.map((coordinator) => (
                            <UserParagraph userId={coordinator.id_user}/>
                        ))}
                    </Col>
                </Row>
            </Card>

        </Container>

    )
}

export default GroupCard;