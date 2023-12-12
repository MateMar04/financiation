import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmDeleteModal = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>No se pudo borrar el grupo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Este grupo tiene una visita asignada.
                Si desea borrar el grupo, primero borre la visita.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;