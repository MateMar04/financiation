import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/FormPage.css";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import {UserOption} from "../components/UserOption";
import {useNavigate} from "react-router-dom";


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


    useEffect(() => {
        getMinistryDepartments()
        getFaqs()
        getAdvisors()
        getAdvised()
        getVisits()
    }, [])


    let getMinistryDepartments = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/ministry-department/', {headers: headers})
        let data = await response.json()
        setMinistryDepartments(data)
    };

    let getFaqs = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/faq/', {headers: headers})
        let data = await response.json()
        setFaqs(data)
    };

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
            history('/')
        }
    }

    let getAdvised = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/advised/', {headers: headers})
        let data = await response.json()
        setAdvised(data)
    };

    let getVisits = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/visit/', {headers: headers})
        let data = await response.json()
        setVisits(data)
    };

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
                                            <option value={visit.id}>{visit.title}</option>
                                        ))}

                                    </select>
                                </Col>
                                <Col>
                                    <select
                                        placeholder="Localidad"
                                        className='form-select'
                                        name="advisor"
                                    >
                                        {advisors?.map((advisor) => (
                                            <UserOption userId={advisor.id_user} advisorValue={advisor.id}/>
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
        </div>

    );
};


export default FormPage;

