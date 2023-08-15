import React from "react";
import '../assets/styles/RowWithCheck.css'
import Load from "../assets/images/Loading.gif";
import {Link} from "react-router-dom";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";


export const LoadingModal = (props, {message}) => {
    return (
        <Modal show={props.show}>
            <Modal.Body>
                <Container className='justify-content-center'>
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <img src={Load} alt="CheckButton" className="mx-auto img-fluid"/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                    <Link to={'/'}>
                    </Link>
            </Modal.Footer>
        </Modal>
)
            
    
}

export default LoadingModal
