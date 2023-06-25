import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/FormPage.css";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import {UserOption} from "../components/UserOption";


const FormPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const selectStyle = {
        padding: '15px',
    };

    let {authTokens} = useContext(AuthContext)
    let [localities, setLocalities] = useState([])
    let [ministryDepartments, setMinistryDepartments] = useState([])
    let [faqs, setFaqs] = useState([])
    let [advisors, setAdvisors] = useState([])


    useEffect(() => {
        getLocalities()
        getMinistryDepartments()
        getFaqs()
        getAdvisors()
    }, [])

    let getLocalities = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/locality/', {headers: headers})
        let data = await response.json()
        setLocalities(data)
    };

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
                "id_visit": 1,
                "id_advised": 1,
                "id_advisor": 1,
                "id_ministry_department": 1,
                "id_faq": 1,
                "id_status": 1
            })
        })
        if (response.status === 200) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }


    return (
        <div>
            <Form onSubmit={}>
                <Container>
                    <Container>
                        <Container>
                            <Row>
                                <Col>
                                    <select
                                        placeholder="Localidad"
                                        className='form-select'>

                                        {localities?.map((locality) => (
                                            <option value={locality.id}>{locality.name}</option>
                                        ))}

                                    </select>
                                </Col>
                                <Col>
                                    <select
                                        placeholder="Localidad"
                                        className='form-select'
                                    >
                                        {advisors?.map((advisor) => (
                                            <UserOption userId={advisor.id_user}/>
                                        ))}
                                    </select>
                                </Col>
                                <Col>
                                    <input type="date" className='input-group-text'></input>
                                </Col>
                            </Row>
                        </Container>
                        <div className="py-3">
                            <Row className='justify-content-md-center'>
                                <Col xs={12} md={10}>
                                    <select
                                        value={selectedOption}
                                        onChange={handleDropdownChange}
                                        placeholder="Area"
                                        className='form-select'
                                        style={selectStyle}>

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
                                    style={selectStyle}>

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

