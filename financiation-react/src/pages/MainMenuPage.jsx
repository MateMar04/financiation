import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/HomePage.css"
import {MenuCard} from "../components/MenuCard";

export const MainMenuPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={4}>
                    <MenuCard title="Visitas" button1="Ver Visitas" button2="Crear Visita"/>
                </Col>
                <Col lg={4}>
                    <MenuCard title="Grupos" button1="Ver Grupos" button2="Crear Grupo" link1="/group/"
                              link2="/group/add/"/>
                </Col>
                <Col lg={4}>
                    <MenuCard title="Asesores" button1="Ver Asesores" button2="Crear Asesor" link1=""
                              link2="/advisor/add/"/>
                </Col>
            </Row>


            <Row>
                <Col lg={4}>
                    <MenuCard title="Coordinadores" button1="Ver Coordinadores" button2="Crear Coordinador" link1=""
                              link2="/coordinator/add/"/>
                </Col>
                <Col lg={4}>
                </Col>
                <Col lg={4}>
                </Col>
            </Row>

        </Container>
    )
}
