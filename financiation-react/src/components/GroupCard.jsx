import React from 'react';
import "../assets/styles/GroupCard.css"
import {Accordion, Card, Col, Container, Row} from 'react-bootstrap';


const GroupCard = () => {
    return (
        <div className='GeneralGroupCard'>
            <Container fluid className="background">
                <Card className="CartaGroupcard">
                    <Container fluid className='cont1'>
                        <Row xs={3} md={2} className=''>

                            <Col className='PrimeraColumna'>Lista Grupos</Col>
                        </Row>
                    </Container>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Grupo Numero 1</Accordion.Header>
                            <Accordion.Body>
                                <Container fluid className='cont1'>
                                    <Row xs={3} md={2} className=''>

                                        <Col xs={12} md={12} className='PrimeraColumna'>Carlos Paz</Col>


                                    </Row>
                                </Container>
                                <Container fluid className='cont1'>
                                    <Row xs={6} md={6} className='rowgroupcard'>

                                        <Col xs={12} md={12} lg={12} className='colgroupcard'>Advisors</Col>


                                        <Col xs={12} md={12} className='colgroupcard'>Coordinadores</Col>

                                    </Row>
                                </Container>
                                <Container fluid>
                                    <Row xs={2} md={2} className='rowgroupcard'>

                                        <Col className='colgroupcard'>Mateo</Col>


                                        <Col className='colgroupcard'>Laura</Col>

                                    </Row>
                                </Container>
                                <Container fluid>
                                    <Row xs={2} md={2} className='rowgroupcard'>

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

                                <Container fluid className='ContDescripcion'>
                                    <Row xs={1} md={1} className='RowDescripcion'>


                                        <Col className='ColDescripcion'>Grupo asignado a la ciudad de Carlos Paz
                                            <p></p>Estado: En progreso </Col>

                                    </Row>
                                </Container>

                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Grupo Numero 2</Accordion.Header>
                            <Accordion.Body>
                                <Container fluid className='cont1'>
                                    <Row xs={3} md={2} className=''>

                                        <Col xs={12} md={12} className='PrimeraColumna'>Santa Maria</Col>


                                    </Row>
                                </Container>
                                <Container fluid className='cont1'>
                                    <Row xs={2} md={2} className='rowgroupcard'>

                                        <Col className='colgroupcard'>Advisors</Col>


                                        <Col className='colgroupcard'>Coordinadores</Col>

                                    </Row>
                                </Container>
                                <Container fluid>
                                    <Row xs={2} md={2} className='rowgroupcard'>

                                        <Col className='colgroupcard'>Hagamos de cuenta que son otros nombres</Col>


                                        <Col className='colgroupcard'>Laura</Col>

                                    </Row>
                                </Container>
                                <Container fluid>
                                    <Row xs={2} md={2} className='rowgroupcard'>

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

                                <Container fluid className='ContDescripcion'>

                                    <Row xs={1} md={1}>


                                        <Col>Grupo asignado a la ciudad de santa maria
                                            <p></p>Estado: Fallido, A fallecido una cordinadora</Col>

                                    </Row>
                                </Container>


                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>

                </Card>

            </Container>
        </div>
    );

}

export default GroupCard
