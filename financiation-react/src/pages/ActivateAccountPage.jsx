import React from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import verifyimg from '../assets/images/verifyimg.gif';
import Check from "../assets/images/checked.gif";

const ActivateAccountPage = () => {

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='container mt-5'>

            <Container fluid>
                <Row className='justify-content-center'>
                    <Col md='6'>
                        <Card>
                            <Card.Body>
                                <Container fluid>
                                    <img src={verifyimg} alt="" className='verifyimg'/>
                                </Container>
                                <Row>
                                    <h3>Verifique su cuenta</h3>
                                </Row>
                                <div className='py-2'>
                                    <Row>
                                        <Col>
                                            <Button onClick={handleShow}>Verificar</Button>
                                        </Col>
                                    </Row>
                                </div>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title id="Titulo">Verificacion de cuenta</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <img src={Check} alt="CheckButton" id="CheckButton" className="mx-auto img-fluid"/>
                                        <p className="text-center">¡Su cuenta ha sido verficada!</p>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="success" onClick={handleClose}>
                                            OK
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ActivateAccountPage