import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { MenuItem, Select } from '@mui/material';
import { getLocations } from '../services/LocationServices';
import { Modal, Input, message } from 'antd';

export const MayorCreateModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [selectedLocalidad, setSelectedLocalidad] = useState('');
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    let [locations, setLocations] = useState([])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);

    useEffect(() => {
        getLocations(authTokens.access).then(data => setLocations(data))
    }, [])

    let postMayor = async () => {
        console.log('aaa')
        let response = await fetch('/api/mayors', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": first_name,
                "last_name": last_name,
                "location": selectedLocalidad
            })
        });

        if (response.status === 200) {
            message.success('El intendente se ha creado exitosamente, recarga la pagina para verlo');
            props.onClose();
        } else {
            message.error('El intendente no se ha creado');
        }
    }

    return (
        <Modal className='modalcreate' title={'Ingresar Intendente'} open={props.show} onOk={postMayor} onCancel={props.onClose}>
            <div className="containermayor container-addmayor-modal">
                <form className='datos'>
                    <div>
                        <label htmlFor='first_name'>Nombre</label>
                        <Input
                            className="InputModal"
                            placeholder="Nombre"
                            name='first_name'
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='last_name'>Apellido</label>
                        <Input
                            className="InputModal"
                            name='last_name'
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Apellido"
                            size="large"
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='selectedLocalidad'>Seleccione localidad</label>
                        <Select
                            label="Localidad"
                            value={selectedLocalidad}
                            onChange={(e) => setSelectedLocalidad(e.target.value)}
                            variant="outlined"
                            className='InputModal'
                            required
                        >
                            {locations?.map((location, i) => (
                                <MenuItem key={i} value={location.id}>{location.name}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default MayorCreateModal;
