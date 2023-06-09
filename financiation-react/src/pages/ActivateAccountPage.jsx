import React from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import verifyimg from '../assets/images/verifyimg.gif';
import Check from "../assets/images/checked.gif";
import '../assets/styles/ActivateAccountPAge.css'

const ActivateAccountPage = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <Container fluid className="fondo">
            <Container>
                        <Card id="carta">
                            <Container>
                                <Row className='justify-content-center'>
                                <img src={verifyimg} className='imgVerify' alt=''/>
                                <h5>Verifique su cuenta</h5>
                                <div className='py-3'>
                                <Button onClick={handleShow}>Verificar</Button>
                                </div>
                                </Row>
                            </Container>

                        </Card>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <Container className='justify-content-center'>
                                <Row className='justify-content-center'>
                            <Col md={5}>
                            <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                            <p className="text-center">¡Su cuenta ha sido verficada!</p>
                            </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </Container>
        </Container>
    );
}

export default ActivateAccountPage