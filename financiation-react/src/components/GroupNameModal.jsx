import '../assets/styles/RowWithCheck.css'
import { Form } from "react-bootstrap";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Container } from 'react-bootstrap';
import '../assets/styles/AddMayorPage.css';
import {message, Modal, Input} from 'antd';

export const GroupNameModal = (props) => {

    let {authTokens} = useContext(AuthContext)
    const [name, setName] = useState("");
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postGroup = async (e) => {
            let response = await fetch('/api/creategroup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "JWT " + String(authTokens.access),
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    "name": name,
                    "advisors":props.selectedAdvisors,
                    "coordinators":props.selectedCoordinators   
                })
            })
            if (response.status === 200) {

                message.success('Se ha creado el grupo exitosamente');
                props.onClose();
            } else {
                console.error("No se ha podido crear el grupo");
                props.onClose()
            }
        }

    
    return (
            <Modal className='modalcreate' open={props.show} title={'Crear grupo'} onCancel={props.onClose} onOk={postGroup}>
                <Container className="containermayor container-addmayor-modal">
                    <a>Introduzca el nombre del grupo</a>
                    <Form className='datos'>
                            <Form.Group>
                                <Input placeholder="Nombre del grupo" size={'large'} onChange={(e) => setName(e.target.value)} name='name'/>

                            </Form.Group>
                    </Form>
                </Container>
            </Modal>


    )
}

export default GroupNameModal