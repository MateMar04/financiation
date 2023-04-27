import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../assets/styles/succesfull.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BsSteam} from "react-icons/bs";
import { BiArrowBack } from 'react-icons/bi';
import { BsFillCheckCircleFill } from 'react-icons/bs';
let Check = require('../assets/images/checked.png');





    function MyModal() {
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
            <img src={Check} alt="CheckButton" id="CheckButton" class="mx-auto img-fluid" fluid />
            
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
    
    export default MyModal;