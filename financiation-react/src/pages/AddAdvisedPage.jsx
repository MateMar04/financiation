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
        } else if (response.status == 500) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Hay un campo vacio)')
        } else if (response.status == 401) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Desautorizado)')
        } else if (response.status == 400) {
            //handleShow()
            //<SucceedModal message="la visita" onclose = {setShow(false)} show ={show}/>
            //await postVisit()
            alert('no se a registrado la visita (Bad request)')
        }
    }

    return (
        <Form onSubmit={postAdvised}>
            <Form.Control placeholder='Nombre del Asesorado' name="first_name" type="text" required></Form.Control>
            <Form.Control placeholder='Apellido del Asesorado' name="last_name" type="text" required></Form.Control>
            <Form.Control placeholder='CUIL del Asesorado' name="ssn" type="number" required></Form.Control>
            <Button type="submit">Registrar</Button>
        </Form>
    )
}
