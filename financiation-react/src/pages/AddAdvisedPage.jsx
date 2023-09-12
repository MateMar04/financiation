import {Button, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {SucceedModal} from "../components/SucceedModal"
import FailedModal from "../components/FailedModal";

export const AddAdvisedPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postAdvised = async (e) => {
        e.preventDefault()
        let response = await fetch(' /api/advisees', {
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
            toggleModalsucceed();
            await postAdvised()
        } else if (response.status == 500) {
            toggleModalfailed();
            await postAdvised()
        } else if (response.status == 401) {
            toggleModalfailed();
            await postAdvised()
        } else if (response.status == 400) {
            toggleModalfailed();
            await postAdvised()
        }
    }

    return (
        <Form onSubmit={postAdvised}>
            <SucceedModal message="la visita" show={showsuccess}/>
            <FailedModal message="la visita" show={showfail}/>
            <Form.Control placeholder='Nombre del Asesorado' name="first_name" type="text" required></Form.Control>
            <Form.Control placeholder='Apellido del Asesorado' name="last_name" type="text" required></Form.Control>
            <Form.Control placeholder='CUIL del Asesorado' name="ssn" type="number" required></Form.Control>
            <Button type="submit">Registrar</Button>
        </Form>
    )
}