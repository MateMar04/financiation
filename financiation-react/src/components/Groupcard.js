import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../assets/styles/GroupCard.css"


function GroupCard() {
  return (
    <Container fluid className="background">
      <Container fluid>
        titulo
      </Container>



      <Card className="CartaGroupcard">
        <Container fluid>
          <Row xs={2} md={2} >

            <Col >Advisors</Col>
            <Col className='columnas'>Coordinadores</Col>
            </Row>
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

      


    </Card>
    </Container >
  );

}

export default GroupCard;

