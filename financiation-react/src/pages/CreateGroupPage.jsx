import React, {useContext, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"

export const CreateGroupPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

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
            toggleModalsucceed();
            await postGroup()
        } else if(response.status == 500){
            toggleModalfailed(); 
            await postGroup() 
        } else if(response.status == 401){
            toggleModalfailed();
            await postGroup() 
        } else if(response.status == 400){
            toggleModalfailed();
            await postGroup() 
        }
    }

    return (
        <Container fluid>
            <SucceedModal message="el coordinador" show ={showsuccess}/>
            <FailedModal message="el coordinador" show ={showfail}/>
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
                                    
        </Container>
    )
}
