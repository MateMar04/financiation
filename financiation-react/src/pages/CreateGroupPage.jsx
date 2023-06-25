import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";
import {useNavigate} from 'react-router-dom'

export const CreateGroupPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    let history = useNavigate()

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

    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/group/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <Container fluid>
            <Form onSubmit={postGroup}>
                <Card className='create-group-card'>
                    <Row className='upper-row'>
                        <Col>
                            <h3>Nombre del Grupo</h3>
                            <Form.Control name="name" placeholder='Nombre' type='text'></Form.Control>
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
                    <Button type="submit">Crear</Button>
                </Card>
            </Form>
        </Container>
    )
}
