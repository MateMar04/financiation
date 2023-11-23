import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { message, Modal, Input } from 'antd';

export const ContactedReferrerCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    let postContactedReferrer = async () => {
        // Validation logic
        if (!first_name || !last_name || !position) {
            message.error('Por favor, complete todos los campos obligatorios.');
            return;
        }

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
            <div className="containermayor container-addmayor-modal">

                <form>
                    <div>
                        <label htmlFor='first_name'>Nombre</label>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='first_name'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='last_name'>Apellido</label>
                        <Input
                            className="InputModal"
                            name='last_name'
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={'Apellido'}
                        />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='position'>Puesto de trabajo</label>
                        <Input
                            className="InputModal"
                            name='position'
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder={'Puesto de trabajo'}
                        />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ContactedReferrerCreateModal;
