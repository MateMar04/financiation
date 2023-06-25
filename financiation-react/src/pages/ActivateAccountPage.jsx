import React, {useState} from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import verifyimg from '../assets/images/verifyimg.gif';
import Check from "../assets/images/checked.gif";
import '../assets/styles/ActivateAccountPAge.css'
import {Link, useNavigate, useParams} from "react-router-dom";

const ActivateAccountPage = () => {
    const {uid, token} = useParams()
    let history = useNavigate()


    let uidToken = uid
    let activationToken = token
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let activateAccount = async () => {
        let response = await fetch('/auth/users/activation/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "uid": uidToken,
                "token": activationToken
            })
        })
        if (response.status === 204) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    let pressedVerifyButton = async () => {
        handleShow()
        await activateAccount()
    }

    return (

        <Container fluid className="fondo">
            <Container>
                <Card id="carta">
                    <Container>
                        <Row className='justify-content-center'>
                            <img src={verifyimg} className='imgVerify' alt=''/>
                            <h5>Verifique su cuenta</h5>
                            <div className='py-3'>
                                <Button onClick={pressedVerifyButton}>Verificar</Button>
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
                        <Link to={'/login'}>
                            <Button variant="success">
                                OK
                            </Button>
                        </Link>

                    </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    );
}

export default ActivateAccountPage