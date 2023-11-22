import '../assets/styles/RowWithCheck.css'
import {Container} from "react-bootstrap";
import {Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import {message, Modal, Input} from 'antd';

export const ContactedReferrerCreateModal = (props) => {

    let {authTokens} = useContext(AuthContext)
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postContactedReferrer = async () => {
        let response = await fetch('/api/contacted-referrers', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "position": position
            })
        });

        if (response.status === 200) {
            props.setUpdateFlag((prevFlag) => !prevFlag);
            message.success('Se agregó el referente contactado exitosamente');
            props.onClose();
        } else {
            console.error("No se pudo agregar el referente contactado");
            props.onClose()
        }
    }

    return (
        <Modal className='modalcreate' open={props.show} onCancel={props.onClose} onOk={postContactedReferrer}
               title={'Agregar referente contactado'}>
            <Container className="containermayor container-addmayor-modal">

                <Form>
                    <Form.Group>
                        <a>Nombre</a>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='first_name'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br/>
                    <a>Apellido</a>
                    <Form.Group style={{textAlign: 'center', marginRight: '10px'}}>
                        <Input
                            className="InputModal"
                            name='last_name'
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={'Apellido'}
                            required
                        />
                    </Form.Group>
                    <br/>
                    <a>Puesto de trabajo</a>
                    <Form.Group>
                        <Input
                            className="InputModal"
                            name='position'
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder={'Puesto de trabajo'}
                            required
                        />
                    </Form.Group>


                </Form>
            </Container>
        </Modal>
    )
}

export default ContactedReferrerCreateModal