import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";


export const CreateGroupPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
    }, [])

    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/group/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            handleShow()
            await postGroup()
        } else if (response.status === 500) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Hay un campo vacio)')
        } else if (response.status === 401) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Desautorizado)')
        } else if (response.status === 400) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Bad request)')
        }
    }

    return (
        <Container fluid>
            <Form onSubmit={postGroup}>
                <Card className='create-group-card'>
                    <Row className='upper-row'>
                        <Col>
                            <h3>Nombre del Grupo</h3>
                            <Form.Control name="name" placeholder='Nombre' type='text' required></Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className='create-group-column'>
                            <h3>Coordinador</h3>
                            <Container className='create-group-card-scroll'>
                                {coordinators?.map((coordinator) => (
                                    <UserRowWithRadio user={coordinator}/>
                                ))}
                            </Container>
                        </Col>
                        <Col lg={6} className='create-group-column'>
                            <h3>Asesores</h3>
                            <Container className='create-group-card-scroll'>
                                {advisors?.map((advisor) => (
                                    <UserRowWithCheck user={advisor}></UserRowWithCheck>
                                ))}
                            </Container>
                        </Col>
                    </Row>
                    <Button type="submit">Crear</Button>
                </Card>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container className='justify-content-center'>
                        <Row className='justify-content-center'>
                            <Col md={5}>
                                <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                <p className="text-center">¡Se a registrado el grupo correctamente!</p>
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
    )
}
