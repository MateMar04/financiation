import {Button, Card, Col, Container, Row} from "react-bootstrap";
import "../assets/styles/HomePage.css"
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={4}>
                    <Card className="menu-card">
                        <Card.Header>Visitas</Card.Header>
                        <Card.Body className="menu-card-body">
                            <Row>
                                <Link>
                                    <Button>Ver Visitas</Button>
                                </Link>
                            </Row>
                            <Row>
                                <Link to="/visit/add/">
                                    <Button>Crear Visita</Button>
                                </Link>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="menu-card">
                        <Card.Header>Grupos</Card.Header>
                        <Card.Body className="menu-card-body">
                            <Row>
                                <Link to="/group/">
                                    <Button>Ver Grupos</Button>
                                </Link>
                            </Row>
                            <Row>
                                <Link to="/group/add/">
                                    <Button>Crear Grupo</Button>
                                </Link>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="menu-card">
                        <Card.Header>Asesores</Card.Header>
                        <Card.Body className="menu-card-body">
                            <Row>
                                <Link>
                                    <Button>Ver Asesores</Button>
                                </Link>
                            </Row>
                            <Row>
                                <Link>
                                    <Button>Crear Asesor</Button>
                                </Link>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col lg={4}>
                    <Card className="menu-card">
                        <Card.Header>Coordinadores</Card.Header>
                        <Card.Body className="menu-card-body">
                            <Row>
                                <Link>
                                    <Button>Ver Coordinadores</Button>
                                </Link>
                            </Row>
                            <Row>
                                <Link>
                                    <Button>Crear Coordinador</Button>
                                </Link>
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
