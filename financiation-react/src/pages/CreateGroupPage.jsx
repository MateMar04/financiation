import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../assets/styles/"
import {Button, Container, Form} from "react-bootstrap";

const navigate = useNavigate;

const CreateGroupPage = () => {
    const [name,setGroup]=useState("");

    CreateGroupInfo = async () => {
        let formField = new FormData()

        formField.append('name',name)
        
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
                        placeholder="Select name"
                        name="name"
                        value={name}
                        onChange={(e) => setGroup(e.target.value)}
                    />
                    
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={CreateGroupInfo}>Create</Button>
            </Form.Group>
        </Container>
    );

} 
export default CreateGroupPage;