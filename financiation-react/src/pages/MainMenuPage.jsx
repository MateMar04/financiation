import { Col, Container, Row} from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";
import { MenuCard } from "../components/MenuCard";
import visitas from "../assets/images/visitaspic.jpeg";
import grupos from "../assets/images/grupospic.jpeg";
import asesores from "../assets/images/asesorespic.jpeg";
import coordinadores from "../assets/images/coordinadorespic.jpeg";
import asesorados from "../assets/images/asesoradospic.jpeg";
import intendentes from "../assets/images/intendentespic.jpeg";

export const MainMenuPage = () => {
    return (

        <Container fluid className="menuback full-height">
           

            <Row className="justify-content-center">
                <Col lg={3} md={6} className="cardd">
                    <MenuCard
                        title="Visitas"
                        link1="/visits/"
                        link2="/visit/add/"
                        image={visitas}
                        customText="Proporciona una vista general de todas las visitas programadas y realizadas."
                        title1="Ver Visitas"
                        title2="Crear Visitas"
                    />
                </Col>
                <Col lg={4}>
                    <MenuCard title="Grupos" button1="Ver Grupos" button2="Crear Grupo" link1="/groups/"
                              link2="/groups/add/"/>
                </Col>

                <Col lg={3} md={6} className="cardd">
                    <MenuCard
                        title="Asesores"
                        link1="/advisors/"
                        link2="/advisor/add/"
                        image={asesores}
                        customText="Permite explorar la lista y acceder a detalles específicos de cada asesor."
                        title1="Ver Asesores"
                        title2="Crear Asesores"
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={3} md={6} className="cardd">
                    <MenuCard
                        title="Coordinadores"
                        link1="/coordinators/"
                        link2="/coordinator/add/"
                        image={coordinadores}
                        customText="Proporciona una lista completa de todos los coordinadores registrados en tu plataforma."
                        title1="Ver Coordinadores"
                        title2="Crear Coordinadores"
                    />
                </Col>
                <Col lg={3} md={6} className="cardd">
                    <MenuCard
                        title="Asesorados"
                        link1="/advised/"
                        link2="/advised/add/"
                        image={asesorados}
                        customText="Proporciona una lista completa de todas las personas que están siendo asesoradas en tu plataforma."
                        title1="Ver Asesorados"
                        title2="Crear Asesorados"
                    />
                </Col>
                <Col lg={3} md={6} className="cardd">
                    <MenuCard
                        title="Intendentes"
                        link1="/advised/"
                        link2="/advised/add/"
                        image={intendentes}
                        customText="Proporciona una lista completa de los Intendentes en cada localidad en tu sistema."
                        title1="Ver Intendentes"
                        title2="Crear Intendentes"
                    />
                </Col>
            </Row>
        </Container>
    )
}