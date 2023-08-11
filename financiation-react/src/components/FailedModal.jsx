import React from "react";
import '../assets/styles/RowWithCheck.css'
import Fail from "../assets/images/failed.gif";
import {Link} from "react-router-dom";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";

const refresh = () => window.location.reload(true)


export const FailedModal = (props, {message}) => {
    return (
        <Modal show={props.show}>
            <Modal.Body>
                <Container className='justify-content-center'>
                    <Row className='justify-content-center'>
                        <Col ls={5}>
                            <img src={Fail} alt="CheckButton" className="mx-auto img-fluid"/>
                            <p className="text-center">¡No se a registrado! {message}</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Link to={''}>
                    <Button onClick={refresh} variant="failed">
                        OK
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}

export default FailedModal