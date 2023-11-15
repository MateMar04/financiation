import { Col, Container, Row } from "react-bootstrap";
import "../assets/styles/MainMenuPage.css";
import {Divider} from 'antd';

export const PersonRowMainMenu = ({ role, first_name, last_name }) => {
    return (
        <>
            <Row className="containerGroupsNames PersonRowMainMenu">
                <Col md={4} xs={5}>
                    <b>{role}:</b>
                </Col>
                <Col md={8} xs={7}>
                    <a>{first_name} {last_name}</a>
                </Col>
            </Row>
            
        </>


    )
}
