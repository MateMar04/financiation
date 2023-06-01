import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {verify} from "../actions/auth";
import '../assets/styles/login.css'
import {Navigate, useParams} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Card} from "react-bootstrap";
import verifyimg from '../assets/images/verifyimg.gif';



const Activate = ({verify}) => {
    const {uid} = useParams();
    const {token} = useParams();
    const [verified, setVerified] = useState(false)
    const verify_account = e => {
        verify(uid, token);
        setVerified(true)
    };



    if (verified) {
        return<Navigate to='/'/>
    }

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
                                        <Button onClick={verify_account}>Verificar</Button>
                                    </Col>
                                </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

    </div>
    )
};


export default connect(null, {verify})(Activate);