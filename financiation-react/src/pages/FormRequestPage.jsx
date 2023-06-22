import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";


const FormRequestPage = () => {
    const [id_visit, setVisit] = useState('');
    const [id_advised, setAdvised] = useState('');
    const [id_advisor, setAdvisor] = useState('');
    const [id_ministry_department, setMinistryDepartment] = useState('');
    const [id_faq, setFaq] = useState('');
    const [id_status, setStatus] = useState('');

    let [request, setRequest] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setRequest()
    })

    let postRequest = async () => {
        fetch(' /api/request/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify(request)
        })
    }

    return (
        <Container className="scrolling">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Select id_visit"
                        name="id_visit"
                        value={id_visit}
                        onChange={(e) => setVisit(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_advised"
                        name="id_advised"
                        value={id_advised}
                        onChange={(e) => setAdvised(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_advisor"
                        name="id_advisor"
                        value={id_advisor}
                        onChange={(e) => setAdvisor(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_ministry_department"
                        name="id_ministry_department"
                        value={id_ministry_department}
                        onChange={(e) => setMinistryDepartment(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_faq"
                        name="id_faq"
                        value={id_faq}
                        onChange={(e) => setFaq(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_status"
                        name="id_status"
                        value={id_status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={postRequest}>Submit</Button>
            </Form.Group>
        </Container>
    );
};

export default FormRequestPage;