import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../assets/styles/GroupCard.css"


function GroupCard() {
  return (
    <Container fluid className="background">
      <Container fluid>
        
      </Container>



      <Card className="CartaGroupcard">
      <Container fluid className='cont1'>
          <Row xs={3} md={2} className=''>
          
            <Col className='PrimeraColumna'>Grupo:1</Col>
            
            
            
            
            </Row>
        </Container>
        <Container fluid className='cont1'>
          <Row xs={2} md={2} className='rowgroupcard'>
          
            <Col className='colgroupcard'>Advisors</Col>
            
            
            <Col className='colgroupcard'>Coordinadores</Col>
            
            </Row>
        </Container>
        <Container fluid>
          <Row xs={2} md={2}className='rowgroupcard' >
          
            <Col className='colgroupcard'>Mateo</Col>
            
            
            <Col className='colgroupcard'>Laura</Col>
            
            </Row>
        </Container>
        <Container fluid>
          <Row xs={2} md={2}className='rowgroupcard' >
          
            <Col className='colgroupcard'>Josefina</Col>
            
            
            <Col className='colgroupcard'>Pablo</Col>
            
            </Row>
        </Container>
        <Container fluid>
          <Row xs={2} md={2} className='rowgroupcard'>
          
            <Col className='colgroupcard'>Ricardo</Col>
            
            
            <Col className='colgroupcard'>Maria</Col>
            
            </Row>
        </Container>
        <Container fluid>
          <Row xs={2} md={2} className='rowgroupcard'>
          
            <Col className='colgroupcard'>Jose</Col>
            
            
            <Col className='colgroupcard'>Pedro</Col>
            
            </Row>
        </Container>
        
        <Container fluid className='cont2'>
          <Row xs={1} md={1} >
          
            
            
            
            <Col className=''>Grupo asignado a la ciudad de Carlos Paz 
            <p></p>Estado: En progreso </Col>
            
            </Row>
        </Container>


        

        
    

      


    </Card>
    </Container >
  );

}

export default GroupCard;

