import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import RowWithCheck from "../components/RowWithCheck";
import RowWithRadio from "../components/RowWithRadio";
import AuthContext from "../context/AuthContext";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";

export const CreateGroupPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])

    useEffect(() => {
        getAdvisors()
        getCoordinators()
    }, [])

    let getAdvisors = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/advisor/', {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };

    let getCoordinators = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/coordinator/', {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };


    return (
        <Container fluid>
            <Card className='create-group-card'>
                <Row className='upper-row'>
                    <Col>
                        <h3>Nombre del Grupo</h3>
                        <Form.Control placeholder='Nombre' type='text'></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='create-group-column'>
                        <h3>Coordinador</h3>
                        <Container className='create-group-card-scroll'>
                            {coordinators?.map((coordinator) => (
                                <UserRowWithRadio userId={coordinator.id_user}/>
                            ))}
                        </Container>
                    </Col>
                    <Col lg={6} className='create-group-column'>
                        <h3>Asesores</h3>
                        <Container className='create-group-card-scroll'>
                            {advisors?.map((advisor) => (
                                <UserRowWithCheck userId={advisor.id_user}></UserRowWithCheck>
                            ))}
                        </Container>
                    </Col>
                </Row>
                <Button>Crear</Button>
            </Card>
        </Container>
    )
}
