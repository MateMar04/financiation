import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";



const FormRequestPage=()=>{
    const [id_visit, setVisit] = useState('');
    const [id_advised, setAdvised] = useState('');
    const [id_advisor, setAdvisor] = useState('');
    const [id_ministry_department, setMinistryDepartment] = useState('');
    const [id_faq, setFaq] = useState('');
    const [id_status, setStatus] = useState('');


    const navigate = useNavigate;


    const AddFormInfo = async () => {
        let formField = new FormData()

        formField.append('id_visit',id_visit)
        formField.append('id_advised',id_advised)
        formField.append('id_advisor',id_advisor)
        formField.append('id_ministry_deparment',id_ministry_department)
        formField.append('id_faq',id_faq)
        formField.append('id_status',id_status)

        await fetch('http://localhost:8000/api', {
            method: 'POST',
            data: formField

        }).then((response) => {
            console.log(response.data);
            navigate.push('/')

        })
    };
    return( 
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
                <Button onClick={AddFormInfo}>Submit</Button>
            </Form.Group>
        </Container>
    );
};

export default FormRequestPage;