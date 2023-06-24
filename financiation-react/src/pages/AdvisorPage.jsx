import React, {useContext, useEffect, useState} from "react";
import {Button,Container, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";

const AdvisorPage = () => {
    let [setadvisor] = useState(null)
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        setadvisor()
    })

    let postAdvisor = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/advisor/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"id_user": e.target.id_user.value,
                                  "id_user": e.target.id_user.value})
        })
        if (response.status === 200) {
            alert('cheto mal')
        } else {
            alert('Something went wrong')
        }
    }
    return (

        <Container className="scrolling">
            <Form onSubmit={postAdvisor}>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter user id"
                        name="user_id"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter group id"
                        name="group_id"
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button type="submit">Submit</Button>
            </Form.Group>
        </Container>
    );
}

export default AdvisorPage;