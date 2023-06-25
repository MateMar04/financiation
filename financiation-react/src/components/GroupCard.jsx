import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import "../assets/styles/GroupCard.css"


export const GroupCard = ({group, advisors, coordinators}) => {
    return (
        <Container fluid className='CompletlyContainer'>
            <Card className='groupcard'>
            <Container fluid className='ContainerNameGroup'>
                <h2 className='b'>Grupo numero {group.name}</h2>
                </Container>
                <Row className='Columna1'>

                    <Col >
                    <Container>
                        <h3 className='a'>Asesores</h3>
                        </Container>
                        {advisors?.map((advisor) => (
                          <p>{advisor.id_user}</p>
                        ))}
                    </Col>
                    <Col>
                    
                    <Container>
                        <h3 className='a'>Coordinadores</h3>
                        </Container>
                        {coordinators?.map  ((coordinator) => (
                          <p>{coordinator.id_user}</p>
                        ))}
                    </Col>
                </Row>
            </Card>

        </Container>
        
    )
}

export default GroupCard;