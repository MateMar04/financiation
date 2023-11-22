import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { message, Modal, Input } from 'antd';

export const AgreementCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    let postAgreement = async () => {
        if (!name || !description) {
            message.error('Por favor, complete todos los campos obligatorios.');
            return;
        }

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
            <div className="containermayor container-addmayor-modal">
                <form>
                    <div>
                        <label htmlFor='name'>Nombre del acuerdo</label>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='description'>Descripción</label>
                        <Input
                            className="InputModal"
                            placeholder="Descripción"
                            name='description'
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AgreementCreateModal;
