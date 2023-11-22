import '../assets/styles/RowWithCheck.css'
import {Container} from "react-bootstrap";
import {Form} from "react-bootstrap";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import {message, Modal, Input,} from 'antd';

export const AgreementCreateModal = (props) => {

    let {authTokens} = useContext(AuthContext)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postAgreement = async () => {
        let response = await fetch('/api/agreements', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        });

        if (response.status === 200) {

            props.setUpdateFlag((prevFlag) => !prevFlag);
            message.success('Se agregó el acuerdo exitosamente');
            props.onClose();
        } else {

            console.error("No se pudo agregar el acuerdo");
            props.onClose()
        }
    }

    return (
        <Modal className='modalcreate' open={props.show} onCancel={props.onClose} onOk={postAgreement}
               title={'Crear Acuerdo'}>
            <Container className="containermayor container-addmayor-modal">

                <a>Nombre del acuerdo</a>
                <Form>
                    <Form.Group>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <a>Descripción</a>
                    <Form.Group style={{textAlign: 'center', marginRight: '10px'}}>
                        <Input
                            className="InputModal"
                            placeholder="Descripcion"
                            name='descripcion'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Container>
        </Modal>
    )
}

export default AgreementCreateModal