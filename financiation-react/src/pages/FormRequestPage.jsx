import React, {useContext, useEffect} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";


const FormRequestPage = () => {

    let {authTokens, logoutUser} = useContext(AuthContext)

    return (
        <Container className="scrolling">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Select id_visit"
                        name="id_visit"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_advised"
                        name="id_advised"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_advisor"
                        name="id_advisor"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_ministry_department"
                        name="id_ministry_department"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_faq"
                        name="id_faq"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Select id_status"
                        name="id_status"
                    />
                </Form.Group>

                <Form.Group>
                    <Button type="submit">Enviar</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default FormRequestPage;