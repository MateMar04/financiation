import '../assets/styles/RowWithCheck.css'
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Card } from 'react-bootstrap';
import '../assets/styles/AddMayorPage.css';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import {getMayors } from '../services/MayorServices';
import {getMayorById} from '../services/MayorServices';

export const MayorModifyModal = (props) => {

    let { authTokens } = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    let [mayors, setMayors] = useState([])
    let [mayor, setMayor] = useState([])

    useEffect(() => {
        getMayors(authTokens.access).then(data => setMayors(data))
    }, [])

    let postMayor = async (e) => {
        e.preventDefault();

        let response = await fetch('/api/mayors', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName
            })
        });

        if (response.status === 200) {
            toggleModalsucceed();
        } else if (response.status === 500) {
            toggleModalfailed();
        } else if (response.status === 401) {
            toggleModalfailed();
        } else if (response.status === 400) {
            toggleModalfailed();
        }
    }
    let deleteMayor = async (id) => {
        let response = await fetch(`/api/mayors/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
        });
        if (response.status === 200) {
            toggleModalsucceed();
        } else if (response.status === 500) {
            toggleModalfailed();
        } else if (response.status === 401) {
            toggleModalfailed();
        } else if (response.status === 400) {
            toggleModalfailed();
        }
    }

    return (
        <Modal show={props.show} >
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail} />
            <Container className="containermayor container-addmayor-modal">

                <Form onSubmit={postMayor}>
                    <h3 className={'h3LoginPage'}>Seleccione Intendente</h3>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <select className='select' id="standard-basic" variant="standard" name='mayor' onChange={(e) => getMayorById(authTokens.access, e.target.value).then(data => setMayor(data))}>
                                <option selected disabled hidden></option>
                                {mayors?.map((mayor) => (
                                    <option value={mayor.id}>{mayor.first_name} {mayor.last_name}</option>
                                ))}
                            </select> 
                    </div>
                    <div className='display'>
                        <p>
                            <a className='displayitem'>Nombre:</a><a>{mayor.first_name}</a>
                        </p>
                        <p>
                            <a className='displayitem'>Apellido:</a><a>{mayor.last_name}</a> 
                        </p>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button className='BtnIniciarSesionLogin' type="submit">Actualizar</Button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button className='BtnBorrar' onClick={() => deleteMayor(mayor.id)}>Eliminar</Button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" onClick={props.onClose}>
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Container>
        </Modal>


    )
}

export default MayorModifyModal