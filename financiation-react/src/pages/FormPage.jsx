import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/FormPage.css";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import Check from "../assets/images/checked.gif";
import {Link, useNavigate} from "react-router-dom";
import {getVisits} from "../services/VisitServices";
import getAdvisees from "../services/AdvisedServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import getFaqs from "../services/FaqServices";
import {getMinistryDepartments} from "../services/MinistryDepartmentServices";


const FormPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const selectStyle = {
        padding: '15px',
    };

    let {authTokens} = useContext(AuthContext)
    let [ministryDepartments, setMinistryDepartments] = useState([])
    let [faqs, setFaqs] = useState([])
    let [advisors, setAdvisors] = useState([])
    let [advised, setAdvised] = useState([])
    let [visits, setVisits] = useState([])
    let history = useNavigate()
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        getMinistryDepartments(authTokens.access).then(data => setMinistryDepartments(data))
        getFaqs(authTokens.access).then(data => setFaqs(data))
        getAdvisees(authTokens.access).then(data => setAdvised(data))
        getVisits(authTokens.access).then(data => setVisits(data))
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
    }, [])

    let postRequest = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/request/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "id_visit": e.target.visit.value,
                "id_advised": e.target.advised.value,
                "id_advisor": e.target.advisor.value,
                "id_ministry_department": e.target.ministryDepartment.value,
                "id_faq": e.target.faq.value,
                "id_status": 1
            })
        })
        if (response.status === 200) {
            handleShow()
            await postRequest()
        } else {
            alert('Something went wrong')
        }
    }


    return (
        <div>
            <Form onSubmit={postRequest}>
                <Container>
                    <Container>
                        <Container>
                            <Row>
                                <Col>
                                    <select
                                        placeholder="Localidad"
                                        className='form-select'
                                        name="visit">

                                        {visits?.map((visit) => (
                                            <option value={visit.id}>{visit.name}</option>
                                        ))}

                                    </select>
                                </Col>
                                <Col>
                                    <select
                                        placeholder="Localidad"
                                        className='form-select'
                                        name="advisor">
                                        {advisors?.map((advisor) => (
                                            <option value={advisor.id}>{advisor.first_name} {advisor.last_name}</option>
                                        ))}
                                    </select>
                                </Col>
                                <Col>
                                    <input type="date" className='input-group-text' name="date"></input>
                                </Col>
                            </Row>
                        </Container>
                        <div className="py-3">
                            <Row className='justify-content-md-center'>
                                <Col xs={12} md={10}>
                                    <select
                                        placeholder="Area"
                                        className='form-select'
                                        style={selectStyle}
                                        name="advised">


                                        {advised?.map((advi) => (
                                            <option value={advi.id}>{advi.first_name} {advi.last_name}</option>
                                        ))}

                                    </select>
                                </Col>
                            </Row>
                            <Row className='justify-content-md-center'>
                                <Col xs={12} md={10}>
                                    <select
                                        placeholder="Area"
                                        className='form-select'
                                        style={selectStyle}
                                        name="ministryDepartment">

                                        {ministryDepartments?.map((ministryDepartment) => (
                                            <option value={ministryDepartment.id}>{ministryDepartment.name}</option>
                                        ))}

                                    </select>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <Container>

                        <Row className='justify-content-md-center'>
                            <Col xs={12} md={10}>
                                <select
                                    placeholder="Por que vino?"
                                    className='form-select'
                                    style={selectStyle}
                                    name="faq">

                                    {faqs?.map((faq) => (
                                        <option value={faq.id}>{faq.name}</option>
                                    ))}

                                </select>
                                <div className="py-3">
                                    <Row className='justify-content-md-center'>
                                        <Col xs={3} md={2}>
                                            <Button type='submit' variant="primary" size="md"
                                                    className='buttonconsulta'>Enviar
                                                Consulta</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Container className='justify-content-center'>
                        <Row className='justify-content-center'>
                            <Col md={5}>
                                <img src={Check} alt="CheckButton" className="mx-auto img-fluid"/>
                                <p className="text-center">¡Se a registrado el asesor correctamente!</p>
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
        </div>

    );
};


export default FormPage;

