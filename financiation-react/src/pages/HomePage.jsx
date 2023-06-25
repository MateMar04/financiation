import {Button, Card, Col, Container, Row} from "react-bootstrap";

export const HomePage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Header>Visitas</Card.Header>
                        <Card.Body>
                            <Row>
                                <Button>Ver Visitas</Button>
                            </Row>
                            <Row>
                                <Button>Crear Visita</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Header>Grupos</Card.Header>
                        <Card.Body>
                            <Row>
                                <Button>Ver Grupos</Button>
                            </Row>
                            <Row>
                                <Button>Crear Grupo</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Header>Asesores</Card.Header>
                        <Card.Body>
                            <Row>
                                <Button>Ver Asesores</Button>
                            </Row>
                            <Row>
                                <Button>Crear Asesor</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>



            <Row>
                <Col lg={4}>
                    <Card>
                        <Card.Header>Coordinadores</Card.Header>
                        <Card.Body>
                            <Row>
                                <Button>Ver Coordinadores</Button>
                            </Row>
                            <Row>
                                <Button>Crear Coordinador</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                </Col>
                <Col lg={4}>
                </Col>
            </Row>

        </Container>
    )
}
