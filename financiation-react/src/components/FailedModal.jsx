import React from "react";
import '../assets/styles/RowWithCheck.css'
import Fail from "../assets/images/failed.gif";
import {Link} from "react-router-dom";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";


export const FailedModal = (props, {message}) => {

    if (!props.show) {
        return null
    }
    return (
        <Modal>
            <Modal.Body>
                <Container className='justify-content-center'>
                    <Row className='justify-content-center'>
                        <Col md={5}>
                            <img src={Fail} alt="CheckButton" className="mx-auto img-fluid"/>
                            <p className="text-center">¡No se a registrado {message} correctamente!</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Link to={''}>
                    <Button onClick={props.onClose} variant="failed">
                        OK
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default FailedModal