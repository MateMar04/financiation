import React, {useContext} from "react";
import {Button, Container, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const CreateAdvisorPage = () => {
    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()

    let postAdvisor = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/advisor/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "id_user": e.target.id_user.value,
                "id_group": e.target.id_group.value
            })
        })
        if (response.status === 200) {
            history('/')
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
                        name="id_user"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter group id"
                        name="id_group"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default CreateAdvisorPage;