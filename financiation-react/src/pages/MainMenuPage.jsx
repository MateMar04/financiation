import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/MainMenuPage.css"
import {MenuCard} from "../components/MenuCard";

export const MainMenuPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col lg={3}>
                <h1 className="tit">Main Menu </h1>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <MenuCard title="Visitas" button1="Ver Visitas" button2="Crear Visita" link1="/visits/"
                              link2="/visit/add/"/>
                </Col>
            
            
                <Col lg={6}>
                    <MenuCard title="Grupos" button1="Ver Grupos" button2="Crear Grupo" link1="/group/"
                              link2="/group/add/"/>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <MenuCard title="Asesores" button1="Ver Asesores" button2="Crear Asesor" link1="/advisors/"
                              link2="/advisor/add/"/>
                </Col>
          
                <Col lg={6}>
                    <MenuCard title="Coordinadores" button1="Ver Coordinadores" button2="Crear Coordinador"
                              link1="/coordinators/"
                              link2="/coordinator/add/"/>
                </Col>
<<<<<<< HEAD
=======
                <Col lg={4}>
                    <MenuCard title="Asesorados" button1="Ver Asesorados" button2="Crear Asesorado" link1="/advised/"
                              link2="/advised/add/"/>
                </Col>
                <Col lg={4}>
                </Col>
                <Col lg={4}>
                </Col>
>>>>>>> e95ec53a64d20bbbe5b4305fbecfa43c70adc4cf
            </Row>

        </Container>
    )
}
