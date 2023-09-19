import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import '../assets/styles/ActivateAccountPAge.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/images/PRUEBA.PNG";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ActivateAccountPage = () => {
    const { uid, token } = useParams()
    let history = useNavigate()


    let uidToken = uid
    let activationToken = token
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let activateAccount = async () => {
        let response = await fetch('/auth/users/activation/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "uid": uidToken,
                "token": activationToken
            })
        })
        if (response.status === 204) {
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    let pressedVerifyButton = async () => {
        handleShow()
        await activateAccount()
    }

    return (

        <Container fluid className="fondo">
            <Container>
                <Container className="cardactivate">

                    <Row className={'justify-content-center text-center'}>
                        <img src={Logo} className="logoactivate" alt="Logo ministerio de finanzas" />
                    </Row>
                    <Row className={'justify-content-center text-center'}>
                        <h4 className="titacti1">Solo un paso mas...</h4>
                    </Row>
                    <Row className={'justify-content-center text-center'}>
                        <h7 className="titacti1">Presiona el boton debajo para activar tu cuenta</h7>
                    </Row>
                    <Row className={'justify-content-center text-center'}>
                        <Col>                        
                        <Button className="botonactivate" type="submit" onClick={pressedVerifyButton}>Activar Cuenta</Button>
                        </Col>

                    </Row>


                </Container>

                <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                ¡Su cuenta ha sido verficada!
                </Alert>
            </Snackbar>
            </Container>
        </Container>
    );
}

export default ActivateAccountPage