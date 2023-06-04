import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import '../assets/styles/Successful.css';
import 'bootstrap/dist/js/bootstrap.min.js';


let Check = require('../assets/images/checked.png');


const Successful = () => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div className="text-center">
            <Button variant="primary" onClick={handleShow}>
                Click to Open Confirm Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="Titulo">Felicitaciones!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div id='a'>
                        <img src={Check} alt="CheckButton" id="CheckButton" class="mx-auto img-fluid" fluid/>

                    </div>
                    <p className="text-center">
                        Tu cuenta a sido verficada! chequea el mail para mas detalles!
                    </p>

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