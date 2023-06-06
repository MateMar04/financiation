import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import '../assets/styles/Successful.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Check from '../assets/images/checked.gif';


const Successful = () => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="text-center">
            <Button variant="primary" onClick={handleShow}>
                Verificar cuenta
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="Titulo">Verificacion de cuenta</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img src={Check} alt="CheckButton" id="CheckButton" class="mx-auto img-fluid"/>
                    <p className="text-center">¡Su cuenta ha sido verficada!</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Successful;