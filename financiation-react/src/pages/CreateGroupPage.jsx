import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container, Form} from "react-bootstrap";

const navigate = useNavigate;

const CreateGroupPage = () => {
    const [name, setName] = useState("");

    const CreateGroupInfo = async () => {
        let formField = new FormData()

        formField.append('name', name)
       

        await fetch('http://localhost:8000/api', {
            method: 'POST',
            data: formField

        }).then((response) => {
            console.log(response.data);
            navigate.push('/')

        })
    };
    return (

        <Container className="scrolling">
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={CreateGroupInfo}>Submit</Button>
            </Form.Group>
        </Container>
    );

};
export default CreateGroupPage;
