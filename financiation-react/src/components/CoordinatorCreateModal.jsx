import '../assets/styles/RowWithCheck.css'
import {Form} from "react-bootstrap";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../context/AuthContext";
import '../assets/styles/AddMayorPage.css';
import FailedModal from "./FailedModal";
import SucceedModal from "./SucceedModal";
import {getUsers} from "../services/UserServices";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {message, Button, Modal} from 'antd';

export const CoordinatorCreateModal = (props) => {

    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const [users, setUsers] = React.useState();
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        getUsers(authTokens.access).then(data => setUsers(data));
    }, []);

    let postCoordinator = async () => {
        if (selectedUserId) {
            let response = await fetch('/api/coordinators', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "JWT " + String(authTokens.access),
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "user_id": selectedUserId,
                    "group_id": props.group.id
                })
            })
            if (response.status === 200) {
                // toggleModalsucceed();
                props.setUpdateFlag((prevFlag) => !prevFlag);
                message.success('Se agregó el coordinador correctamente');
                props.onClose();
            } else {
                // toggleModalfailed();
                message.error('No se pudo crear el coordinador');
                props.onClose();
            }
        } else {
            // toggleModalfailed()
            message.error('No se pudo crear el coordinador');
            props.onClose();
        }
    }

    return (
        <Modal
            open={props.show}
            title="Agregar Coordinador"
            onCancel={props.onClose}
            footer={[
                <Button key="back" onClick={props.onClose}>
                    Cancelar
                </Button>,
                <Button
                    onClick={postCoordinator}
                    type="primary"
                >
                    Agregar
                </Button>
            ]}
        >
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess}/>
            <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail}/>

            <Form>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Nombre de la persona</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nombre de la persona"
                        value={selectedUserId}
                        onChange={(event) => {
                            setSelectedUserId(event.target.value);
                        }}
                    >
                        {users?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.first_name} {user.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Form>
        </Modal>
    )
}

export default CoordinatorCreateModal