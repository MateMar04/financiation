import '../assets/styles/RowWithCheck.css'
import {Col, Row, Container, Form} from "react-bootstrap";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import {getMayors} from '../services/MayorServices';
import {getMayorById} from '../services/MayorServices';
import {InputLabel, MenuItem, Select} from '@mui/material';
import {message, Button, Modal, Input, Popconfirm} from 'antd';

export const MayorModifyModal = (props) => {
    let { authTokens } = useContext(AuthContext);
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    let [mayors, setMayors] = useState([]);
    let [mayor, setMayor] = useState([]);
    const [editedMayor, setEditedMayor] = useState({});

    // Add this useEffect hook to reset the editedMayor state when the modal is opened
    useEffect(() => {
        setEditedMayor({});
    }, [props.show]);

    const handleMayorSelection = (e) => {
        const selectedMayorId = e.target.value;
        const selectedMayor = mayors.find((mayor) => mayor.id === parseInt(selectedMayorId, 10));
        setEditedMayor(selectedMayor);
    };

    useEffect(() => {
        getMayors(authTokens.access).then((data) => setMayors(data));
    }, []);

    const handleFormSubmitPut = (e) => {
        e.preventDefault();

        if (!editedMayor.first_name || !editedMayor.last_name) {
            message.error('Por favor, complete todos los campos.');
            return;
        }

        putMayor(editedMayor.id);
        setEditedMayor({}); // Reset the selected mayor
    };

    const handleFormSubmitDelete = (e) => {
        e.preventDefault();

        if (!editedMayor.first_name || !editedMayor.last_name) {
            message.error('Por favor, complete todos los campos.');
            return;
        }
        deleteMayor(editedMayor.id);
        setEditedMayor({}); // Reset the selected mayor
    };

    let putMayor = async (id) => {
        let response = await fetch(`/api/mayors/put/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + String(authTokens.access),
                Accept: 'application/json',
            },
            body: JSON.stringify({
                first_name: editedMayor.first_name,
                last_name: editedMayor.last_name,
            }),
        });

        if (response.status === 200) {
            props.onClose();
            message.success('Se actualizó al intendente exitosamente');
            props.setUpdateFlag((prevFlag) => !prevFlag);
            getMayors(authTokens.access)
                .then((data) => setMayors(data))
                .catch((error) => console.error(error));
        } else {
            props.onClose();
            message.error('No se se ha podido actualizar al intendente');
        }
    };

    let deleteMayor = async (id) => {
        let response = await fetch(`/api/mayors/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + String(authTokens.access),
                Accept: 'application/json',
            },
        });

        if (response.status === 200) {
            props.setUpdateFlag((prevFlag) => !prevFlag);
            getMayors(authTokens.access)
                .then((data) => {
                    setMayors(data);
                    toggleModalsucceed();
                    message.success('Se ha borrado el intendente exitosamente');
                    props.onClose();
                })
                .catch((error) => {
                    console.error(error);
                    toggleModalfailed();
                    message.error('No se ha podido actualizar la lista de intendentes');
                    props.onClose();
                });
        } else {
            toggleModalfailed();
            message.error('No se ha podido borrar el intendente');
        }
    };
    const cancel = (e) => {};

    return (
        <Modal
            title="Editar Intendente"
            open={props.show}
            onCancel={props.onClose}
            footer={[
                <Button onClick={props.onClose}>Cancelar</Button>,
                <Popconfirm
                    title="Eliminar intendente creado"
                    description="Esta seguro que desea eleminar al intendente?"
                    onConfirm={handleFormSubmitDelete}
                    onCancel={cancel}
                    okText="Si"
                    cancelText="No"
                >
                    <Button danger>Eliminar</Button>
                </Popconfirm>,
                <Button type="primary" key="submit" onClick={handleFormSubmitPut}>
                    Actualizar
                </Button>,
            ]}
        >
            <SucceedModal
                onClose={() => toggleModalsucceed()}
                message="El intendente se ha editado correctamente"
                show={showsuccess}
            />
            <FailedModal
                onClose={() => toggleModalfailed()}
                message="El intendente no se ha podido editar"
                show={showfail}
            />
            <Container>
                <a>Seleccione Intendente</a>

                <Select
                    className="InputModal"
                    id="standard-basic"
                    name="mayor"
                    onChange={handleMayorSelection}
                    placeholder={'Intendente'}
                >
                    {mayors?.map((mayor, i) => (
                        <MenuItem key={i} value={mayor.id}>
                            {mayor.first_name} {mayor.last_name}
                        </MenuItem>
                    ))}
                </Select>
                <br />
                <br />
                <a>Nombre</a>
                <Input
                    className="InputModal"
                    required
                    type="text"
                    value={editedMayor.first_name || ''}
                    placeholder={'Nombre'}
                    onChange={(e) => setEditedMayor({ ...editedMayor, first_name: e.target.value })}
                />
                <br />
                <br />
                <a>Apellido</a>
                <Input
                    className="InputModal"
                    required
                    type="text"
                    value={editedMayor.last_name || ''}
                    placeholder={'Apellido'}
                    onChange={(e) => setEditedMayor({ ...editedMayor, last_name: e.target.value })}
                />
            </Container>
        </Modal>
    );
};

export default MayorModifyModal;