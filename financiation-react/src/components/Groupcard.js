import React from 'react';
import { Container, Row, Col, Card,Button } from 'react-bootstrap';
import "../assets/styles/GroupCard.css"


function GroupCard() {
  return (
    <Container fluid className="background">
        <Container fluid>
            
        </Container>
        <Card className="CartaGroupcard">
            
            <Row xs={2} md={2} > 
            <Container fluid className='cont1'>
        <Col >Advisors</Col>
        
        </Container>
        

        <Container fluid className='cont1'>
        <Col >Coordinadores</Col>
        </Container>
        
        <Container fluid>
        <Col >Ricardo</Col>
        <Col >Juan</Col>
        <Col >Pedro</Col>
        </Container>
        <Container fluid>
        <Col>Ricardito</Col>
        <Col>Jose</Col>
        <Col>Pepito</Col>
        </Container>
        
      </Row>
    

        </Card>
    </Container>
  );
  
}

export default GroupCard;

