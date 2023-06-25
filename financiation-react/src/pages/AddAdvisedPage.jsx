import {Button, Form} from "react-bootstrap";
import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
export const AddAdvisedPage = () => {

    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()
    let postAdvised = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/advised/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": e.target.first_name.value,
                "last_name": e.target.last_name.value,
                "ssn": e.target.ssn.value
            })
        })
        if (response.status === 200) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (
        <Form onSubmit={postAdvised}>
            <Form.Control placeholder='Nombre del Asesorado' name="first_name" type="text"></Form.Control>
            <Form.Control placeholder='Apellido del Asesorado' name="last_name" type="text"></Form.Control>
            <Form.Control placeholder='CUIL del Asesorado' name="ssn" type="number"></Form.Control>
            <Button type="submit">Registrar</Button>
        </Form>
    )
}
