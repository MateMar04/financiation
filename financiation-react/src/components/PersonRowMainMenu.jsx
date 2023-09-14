import {Col, Container, Row} from "react-bootstrap";

export const PersonRowMainMenu = ({role, first_name, last_name}) => {
    return (
        <Container fluid>
            <Row>
                <Col lg={6} className="fw-bold">{role}:</Col>
                <Col lg={6}>{first_name} {first_name}</Col>
            </Row>
        </Container>
    )
}
