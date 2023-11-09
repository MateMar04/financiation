import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";

export const PersonRowMainMenu = ({role, first_name, last_name}) => {
    return (
       
            <Row className="containerGroupsNames">
                <Col md={4}>
                <b>{role}:</b>
                </Col>
                <Col md={8}>
                <a>{first_name} {last_name}</a>
                </Col>
            </Row>
       
    )
}
