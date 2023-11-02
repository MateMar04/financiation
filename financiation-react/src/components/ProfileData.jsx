import {Col, Container, Row} from "react-bootstrap";
import '../assets/styles/ProfileData.css'
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";

export const ProfileData = ({username, firstName, lastName, email, ssn, phone_number}) => {
    return (
        <Container fluid className="profile-data-container">
            <Container className="profile-data">
                <h1 className="username-text">{firstName} {lastName}</h1>
                <h2 className="name-text">{username}</h2>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <h5 className="mini-title">Correo electrónico:</h5>
                        <p className="data">{email}</p>
                    </Col>
                    <Col md={6}>
                        <h5 className="mini-title">CUIL:</h5>
                        <p className="data">{ssn}</p>
                    </Col>
                </Row>  
                <Row>
                    <Col md={6}>
                        <h5 className="mini-title">Número de Teléfono:</h5>
                        <p className="data">{phone_number}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default ProfileData
